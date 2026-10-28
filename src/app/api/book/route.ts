import { NextRequest, NextResponse } from "next/server";
import { priceFor, priceForSevenYdByMaterial } from "@kanai/pricing";
import { sendLeadToHolo } from "@/lib/holo-lead";

const DISPATCH_API_BASE = "https://kanai-dispatch.vercel.app";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { serviceType, date, timeSlot, name, phone, email, address, description, stopType, dumpsterSize, rentalDuration, materialType, estimatedPrice, estimatedFraction } = body;

    const missing: string[] = [];
    if (!serviceType) missing.push("serviceType");
    if (!date) missing.push("date");
    if (!timeSlot) missing.push("timeSlot");
    if (!name) missing.push("name");
    if (!phone) missing.push("phone");

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    const bookingId = crypto.randomUUID();

    console.log("[BOOKING]", {
      bookingId,
      serviceType,
      date,
      timeSlot,
      name,
      phone,
      dumpsterSize: dumpsterSize || null,
      rentalDuration: rentalDuration || null,
      materialType: materialType || null,
    });

    // For dumpster rentals, create a dispatch task and generate a payment link
    let taskId: string | null = null;
    let paymentUrl: string | null = null;

    if (serviceType === "dumpster-rental" && dumpsterSize && address) {
      try {
        // Check availability first
        const sizeKey = dumpsterSize + "yd";
        try {
          const availRes = await fetch(`${DISPATCH_API_BASE}/api/assets?size=${sizeKey}&status=yard`);
          if (availRes.ok) {
            const availData = await availRes.json();
            const available = (availData.assets || []).length;
            if (available === 0) {
              return NextResponse.json({
                success: false,
                error: `Sorry, no ${sizeKey} dumpsters are available right now. Please call (808) 201-2668 to check availability.`,
                bookingId,
              }, { status: 409 });
            }
          }
        } catch { /* availability check failed — proceed anyway */ }

        // Geocode the address via Google Places API for GPS coordinates
        let gpsLat: number | null = null;
        let gpsLng: number | null = null;
        const gKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        if (gKey && address) {
          try {
            // Use Places Autocomplete to get place ID, then fetch location
            const searchRes = await fetch("https://places.googleapis.com/v1/places:autocomplete", {
              method: "POST",
              headers: { "Content-Type": "application/json", "X-Goog-Api-Key": gKey },
              body: JSON.stringify({
                input: address,
                locationBias: { circle: { center: { latitude: 21.3069, longitude: -157.8583 }, radius: 50000 } },
                includedRegionCodes: ["us"],
              }),
            });
            if (searchRes.ok) {
              const searchData = await searchRes.json();
              const placeId = searchData.suggestions?.[0]?.placePrediction?.placeId;
              if (placeId) {
                const detailRes = await fetch(
                  `https://places.googleapis.com/v1/places/${placeId}?fields=location`,
                  { headers: { "X-Goog-Api-Key": gKey, "X-Goog-FieldMask": "location" } }
                );
                if (detailRes.ok) {
                  const place = await detailRes.json();
                  gpsLat = place.location?.latitude || null;
                  gpsLng = place.location?.longitude || null;
                }
              }
            }
          } catch { /* geocoding failed — proceed without GPS */ }
        }

        // Calculate rental price — public booking flow uses residential
        // rates by default. 7yd is priced by material (concrete/dirt
        // /roofing); other materials fall back to the 7yd default.
        // All rate tables now live in @kanai/pricing — never inline
        // pricing tables in this file (or any other file) again.
        const dur = rentalDuration === "3-5" ? "long" : "short";
        let rentalPrice: number;
        if (sizeKey === "7yd") {
          rentalPrice = priceForSevenYdByMaterial(materialType);
        } else {
          rentalPrice = priceFor(sizeKey, dur, "residential") ?? 850;
        }

        // Create dispatch task
        const taskRes = await fetch(`${DISPATCH_API_BASE}/api/tasks`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            task_type: stopType === "exchange" ? "swap" : "drop_off",
            customer_name: name,
            customer_phone: phone,
            customer_email: email || undefined,
            customer_type: "residential",
            job_address: address,
            gps_lat: gpsLat,
            gps_lng: gpsLng,
            asset_size: sizeKey,
            scheduled_date: date,
            rental_duration: dur,
            rental_price: rentalPrice,
            payment_type: "prepaid",
            material_type: materialType || undefined,
            notes: description || undefined,
            created_by: "website",
          }),
        });

        if (taskRes.ok) {
          const taskData = await taskRes.json();
          taskId = taskData.task?.id || null;

          // Generate payment link
          if (taskId) {
            try {
              const paymentRes = await fetch(`${DISPATCH_API_BASE}/api/payments/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ task_id: taskId, mode: "checkout_session" }),
              });

              if (paymentRes.ok) {
                const paymentData = await paymentRes.json();
                paymentUrl = paymentData.checkout_url || paymentData.payment_url || null;
              } else {
                console.error("[DISPATCH] Payment link creation failed:", paymentRes.status, await paymentRes.text());
              }
            } catch (payErr) {
              console.error("[DISPATCH] Payment link error:", payErr);
            }
          }
        } else {
          console.error("[DISPATCH] Task creation failed:", taskRes.status, await taskRes.text());
        }
      } catch (dispatchErr) {
        console.error("[DISPATCH] Task creation error:", dispatchErr);
        // Don't fail the booking — it goes to Holo as a lead below
      }
    }

    // No Holo task was created (junk removal, or the dumpster task failed) —
    // send the request to Holo as a lead so the office calls to confirm it.
    if (!taskId) {
      const isDR = serviceType === "dumpster-rental";
      const stopLabel = stopType === "exchange" ? "Exchange" : "Drop Off";
      const lead = await sendLeadToHolo({
        "Form Name": isDR ? "Website Booking - Dumpster Rental" : "Website Booking - Junk Removal",
        Name: name,
        Phone: phone,
        Email: email,
        Address: address,
        Service: isDR ? `Dumpster Rental - ${stopLabel}` : "Junk Removal",
        Message: [
          `Online booking request for ${date} (${timeSlot})`,
          estimatedPrice ? `Estimated starting price: $${estimatedPrice}${estimatedFraction ? ` (${estimatedFraction})` : ""}` : null,
          description || null,
        ].filter(Boolean).join("\n"),
        "Preferred Date": date,
        "Preferred Time": timeSlot,
        "Dumpster Size": isDR && dumpsterSize ? `${dumpsterSize}-yard` : null,
        "Rental Duration": isDR && rentalDuration ? `${rentalDuration} days` : null,
        "Material Type": isDR ? materialType : null,
        "Booking ID": bookingId,
        "Page URL": request.headers.get("referer"),
      });

      if (!lead.ok) {
        return NextResponse.json({
          success: false,
          error: "We couldn't submit your booking request. Please call (808) 201-2668 and we'll get you scheduled.",
          bookingId,
        }, { status: lead.reason === "no_contact" ? 400 : 502 });
      }
    }

    return NextResponse.json({ success: true, bookingId, taskId, paymentUrl });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

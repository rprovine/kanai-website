import { NextRequest, NextResponse } from "next/server";

const GHL_API_BASE = "https://services.leadconnectorhq.com";
const DISPATCH_API_BASE = "https://kanai-dispatch.vercel.app";

async function createGhlContact(data: {
  name: string;
  phone: string;
  email?: string;
  address?: string;
  serviceType: string;
  description: string;
  date: string;
  timeSlot: string;
  stopType?: string;
  dumpsterSize?: string;
  rentalDuration?: string;
  materialType?: string;
}) {
  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!apiKey || !locationId) return null;

  const nameParts = data.name.trim().split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  const isDR = data.serviceType === "dumpster-rental";
  const stopLabel = data.stopType === "exchange" ? "Exchange" : "Drop Off";

  // Build tags
  const tags: string[] = ["Website Lead", "Online Booking"];
  if (isDR) {
    tags.push("Dumpster Rental");
    tags.push(`Dumpster ${stopLabel}`);
    if (data.dumpsterSize) tags.push(`${data.dumpsterSize}yd Dumpster`);
  } else {
    tags.push("Junk Removal");
  }

  // Build notes for CSR
  const noteLines = [
    `Online Booking Request via Website`,
    `Service: ${isDR ? `Dumpster Rental — ${stopLabel}` : "Junk Removal"}`,
    isDR && data.dumpsterSize ? `Dumpster Size: ${data.dumpsterSize}-yard` : null,
    isDR && data.rentalDuration ? `Rental Duration: ${data.rentalDuration} days` : null,
    isDR && data.materialType ? `Material Type: ${data.materialType}` : null,
    `Preferred Date: ${data.date}`,
    `Preferred Time: ${data.timeSlot}`,
    data.address ? `Address: ${data.address}` : null,
    ``,
    `Description:`,
    data.description || "(No description provided)",
    ``,
    isDR ? `ACTION: Auto-booked in Dispatch System` : `ACTION: Create job in Workiz`,
  ].filter(Boolean).join("\n");

  try {
    const res = await fetch(`${GHL_API_BASE}/contacts/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Version: "2021-07-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        locationId,
        firstName,
        lastName,
        phone: data.phone,
        email: data.email || undefined,
        address1: data.address || undefined,
        source: isDR ? "Website - Dumpster Rental" : "Website - Junk Removal",
        tags,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[GHL] Contact creation failed:", res.status, err);
      return null;
    }

    const result = await res.json();
    const contactId = result.contact?.id;

    // Add note to the contact
    if (contactId) {
      await fetch(`${GHL_API_BASE}/contacts/${contactId}/notes/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Version: "2021-07-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: noteLines }),
      }).catch((err) => console.error("[GHL] Note creation failed:", err));
    }

    // Add to pipeline as New Lead
    if (contactId) {
      const pipelineId = process.env.GHL_PIPELINE_ID;
      if (pipelineId) {
        try {
          // Get New Lead stage
          const pipeResp = await fetch(
            `${GHL_API_BASE}/opportunities/pipelines?locationId=${locationId}`,
            { headers: { Authorization: `Bearer ${apiKey}`, Version: "2021-07-28" } }
          );
          if (pipeResp.ok) {
            const pipeData = await pipeResp.json();
            let stageId: string | null = null;
            for (const p of pipeData.pipelines || []) {
              if (p.id === pipelineId) {
                for (const s of p.stages || []) {
                  if (s.name.toLowerCase().includes("new lead")) { stageId = s.id; break; }
                }
              }
            }
            if (stageId) {
              const isDR = data.serviceType === "dumpster-rental";
              await fetch(`${GHL_API_BASE}/opportunities/`, {
                method: "POST",
                headers: { Authorization: `Bearer ${apiKey}`, Version: "2021-07-28", "Content-Type": "application/json" },
                body: JSON.stringify({
                  pipelineId, locationId, pipelineStageId: stageId, contactId,
                  name: `Website Booking - ${data.name}`,
                  source: isDR ? "Website - Dumpster Rental" : "Website - Junk Removal",
                  status: "open",
                }),
              });
            }
          }
        } catch (pipeErr) {
          console.error("[GHL] Pipeline creation error:", pipeErr);
        }
      }
    }

    return contactId;
  } catch (err) {
    console.error("[GHL] Contact creation error:", err);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { serviceType, date, timeSlot, name, phone, email, address, description, stopType, dumpsterSize, rentalDuration, materialType } = body;

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

    const ghlContactId = await createGhlContact({
      name, phone, email, address,
      serviceType, description: description || "",
      date, timeSlot, stopType,
      dumpsterSize, rentalDuration, materialType,
    });

    console.log("[BOOKING]", {
      bookingId,
      ghlContactId,
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
            asset_size: dumpsterSize + "yd",
            scheduled_date: date,
            rental_duration: rentalDuration === "3-5" ? "long" : "short",
            payment_type: "prepaid",
            material_type: materialType || undefined,
            notes: description || undefined,
            ghl_contact_id: ghlContactId || undefined,
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
                body: JSON.stringify({ task_id: taskId, mode: "payment_link" }),
              });

              if (paymentRes.ok) {
                const paymentData = await paymentRes.json();
                paymentUrl = paymentData.payment_url || null;
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
        // Don't fail the booking — GHL lead was still created
      }
    }

    return NextResponse.json({ success: true, bookingId, ghlContactId, taskId, paymentUrl });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

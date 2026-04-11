"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Truck,
  Container,
  ChevronLeft,
  ChevronRight,
  Check,
  Phone,
  Camera,
  ClipboardList,
  CreditCard,
} from "lucide-react";

// Wrap in Suspense for useSearchParams SSG compatibility
export default function BookPageWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-dark" />}>
      <BookPage />
    </Suspense>
  );
}

const DUMPSTER_SIZES = [
  { value: "7", label: "7-yard", price: "From $400", tons: "By material", desc: "Concrete, aggregate, stone, dirt ONLY", restricted: true },
  { value: "15", label: "15-yard", price: "$800", tons: "2 tons", desc: "Garage cleanouts, small renovations", restricted: false },
  { value: "20", label: "20-yard", price: "$850", tons: "3 tons", desc: "Home remodels, medium projects", restricted: false },
  { value: "25", label: "25-yard", price: "$850", tons: "3 tons", desc: "Large renovations, roofing", restricted: false },
  { value: "30", label: "30-yard", price: "$950", tons: "5 tons", desc: "Commercial, full estate cleanouts", restricted: false },
];

const RENTAL_DURATIONS = [
  { value: "1-2", label: "1-2 Days" },
  { value: "3-5", label: "3-5 Days (+$50)" },
  { value: "week", label: "1 Week (+$150)" },
];

const STOP_TYPES = [
  { value: "drop", label: "Drop Off", desc: "We deliver a dumpster to your location" },
  { value: "exchange", label: "Exchange", desc: "Swap your full dumpster for an empty one" },
];

const MATERIAL_TYPES = [
  { value: "household", label: "General / Household" },
  { value: "construction", label: "Construction & Renovation" },
  { value: "roofing", label: "Roofing" },
  { value: "green_waste", label: "Green Waste" },
  { value: "concrete", label: "Concrete / Aggregate" },
  { value: "dirt", label: "Dirt / Fill" },
  { value: "metals", label: "Metals" },
  { value: "mixed", label: "Mixed Materials (+$150)" },
];

function BookPage() {
  const searchParams = useSearchParams();

  // Check for URL params from estimator/quote flow
  const paramService = searchParams.get("service") as "junk-removal" | "dumpster-rental" | null;
  const paramPrice = searchParams.get("price");
  const paramItems = searchParams.get("items");
  const paramFraction = searchParams.get("fraction");
  const paramSize = searchParams.get("size");

  const hasJREstimate = paramService === "junk-removal" && paramPrice;

  const [step, setStep] = useState(1);
  const [serviceType, setServiceType] = useState<"junk-removal" | "dumpster-rental" | "">("");

  // JR-specific
  const [jrDescription, setJrDescription] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState("");
  const [estimatedFraction, setEstimatedFraction] = useState("");

  // DR-specific
  const [stopType, setStopType] = useState("");
  const [dumpsterSize, setDumpsterSize] = useState("");
  const [rentalDuration, setRentalDuration] = useState("");
  const [materialType, setMaterialType] = useState("");
  const [drDescription, setDrDescription] = useState("");

  // Shared
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [timeSlot, setTimeSlot] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [taskId, setTaskId] = useState("");
  const [paymentUrl, setPaymentUrl] = useState("");

  // If coming from estimator/quote with JR params, skip to step 2 (date picker)
  useEffect(() => {
    if (hasJREstimate) {
      setServiceType("junk-removal");
      setEstimatedPrice(paramPrice || "");
      setEstimatedFraction(paramFraction || "");
      setJrDescription(paramItems ? decodeURIComponent(paramItems) : "");
      setStep(2);
    } else if (paramService === "dumpster-rental") {
      setServiceType("dumpster-rental");
      if (paramSize) setDumpsterSize(paramSize);
      setStep(2);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isDR = serviceType === "dumpster-rental";

  // Steps differ based on path:
  // JR with estimate: 2=Date/Time, 3=Your Info, 4=Confirmed (skip service & details — already have estimate)
  // JR without estimate: 1=Service, then redirect to get estimate
  // DR: 1=Service, 2=Dumpster Details, 3=Date/Time, 4=Your Info, 5=Confirmed
  const getStepLabels = () => {
    if (hasJREstimate || (serviceType === "junk-removal" && estimatedPrice)) {
      return ["Date & Time", "Your Info", "Confirmed"];
    }
    if (isDR) {
      return ["Service", "Dumpster Details", "Date & Time", "Your Info", "Confirmed"];
    }
    return ["Service", "Get Estimate", "Date & Time", "Your Info", "Confirmed"];
  };

  const stepLabels = getStepLabels();
  const totalSteps = stepLabels.length;
  const confirmStep = hasJREstimate ? 4 : (isDR ? 5 : 5);
  const infoStep = hasJREstimate ? 3 : 4;
  const dateStep = hasJREstimate ? 2 : 3;

  const canProceed = () => {
    if (hasJREstimate || (serviceType === "junk-removal" && estimatedPrice)) {
      switch (step) {
        case 2: return selectedDate !== null && timeSlot !== "";
        case 3: return name.trim() !== "" && phone.trim() !== "" && address.trim() !== "";
        default: return false;
      }
    }
    switch (step) {
      case 1: return serviceType !== "";
      case 2: return isDR ? (stopType !== "" && dumpsterSize !== "" && (stopType === "exchange" || rentalDuration !== "")) : false;
      case 3: return selectedDate !== null && timeSlot !== "";
      case 4: return name.trim() !== "" && phone.trim() !== "" && address.trim() !== "";
      default: return false;
    }
  };

  async function handleSubmit() {
    if (!canProceed()) return;
    setSubmitting(true);

    const stopLabel = stopType === "exchange" ? "Exchange" : "Drop Off";
    const description = isDR
      ? `Dumpster ${stopLabel}: ${DUMPSTER_SIZES.find(s => s.value === dumpsterSize)?.label || dumpsterSize}${rentalDuration ? ` | Duration: ${rentalDuration}` : ""}${drDescription ? `\n${drDescription}` : ""}`
      : jrDescription;

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceType,
          date: selectedDate?.toISOString().split("T")[0],
          timeSlot,
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim() || undefined,
          address: address.trim(),
          description,
          estimatedPrice: estimatedPrice || undefined,
          estimatedFraction: estimatedFraction || undefined,
          stopType: isDR ? stopType : undefined,
          dumpsterSize: isDR ? dumpsterSize : undefined,
          rentalDuration: isDR && rentalDuration ? rentalDuration : undefined,
          materialType: isDR && materialType ? materialType : undefined,
        }),
      });

      const data = await res.json();
      if (!data.success && data.error) {
        alert(data.error);
        setSubmitting(false);
        return;
      }
      if (data.success) {
        setBookingId(data.bookingId);
        if (data.taskId) setTaskId(data.taskId);
        if (data.paymentUrl) setPaymentUrl(data.paymentUrl);

        // Dumpster rentals: redirect straight to Stripe payment
        if (isDR && data.paymentUrl) {
          window.location.href = data.paymentUrl;
          return; // Don't show confirmation — they'll land on Stripe
        }

        setStep(confirmStep);
      }
    } catch {
      alert("Something went wrong. Please try again or call (808) 201-2668.");
    } finally {
      setSubmitting(false);
    }
  }

  function next() {
    // JR without estimate — redirect to get one
    if (step === 1 && serviceType === "junk-removal" && !estimatedPrice) {
      return; // Button won't show, they'll click estimate/quote links
    }
    if (step === infoStep) handleSubmit();
    else if (canProceed()) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  const serviceLabel = isDR ? "Dumpster Rental" : "Junk Removal";
  const TIME_LABELS: Record<string, string> = {
    "8-10": "8:00 – 10:00 AM",
    "10-12": "10:00 AM – 12:00 PM",
    "12-2": "12:00 – 2:00 PM",
    "2-4": "2:00 – 4:00 PM",
    "4-6": "4:00 – 6:00 PM",
    "early-morning": "Early Morning (as early as possible)",
    "anytime": "Anytime (flexible)",
  };
  const timeLabel = TIME_LABELS[timeSlot] || timeSlot;

  // Figure out visible step number for indicator
  const displaySteps = stepLabels.length;
  const displayCurrentStep = hasJREstimate ? step - 1 : step;

  return (
    <main>
      <section className="bg-brand-dark py-12 md:py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-brand-cream mb-4">
            Book Online
          </h1>
          <p className="text-lg text-brand-cream/70 max-w-xl mx-auto">
            {hasJREstimate
              ? `Your estimated starting price: $${estimatedPrice}${estimatedFraction ? ` (${estimatedFraction})` : ""}. Pick a date and we'll get you on the schedule.`
              : "Schedule your junk removal or dumpster rental in minutes."}
          </p>
        </div>
      </section>

      {/* Step Indicator */}
      <section className="bg-brand-dark pb-4">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: displaySteps }, (_, i) => i + 1).map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`size-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                  s === displayCurrentStep ? "bg-brand-amber text-brand-dark"
                    : s < displayCurrentStep ? "bg-brand-amber/30 text-brand-amber"
                    : "bg-[#2A2A27] text-brand-cream/40"
                }`}>
                  {s < displayCurrentStep ? <Check className="size-3.5" /> : s}
                </div>
                {s < displaySteps && <div className={`w-5 md:w-8 h-0.5 ${s < displayCurrentStep ? "bg-brand-amber/30" : "bg-[#2A2A27]"}`} />}
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-brand-cream/50 mt-2">{stepLabels[displayCurrentStep - 1]}</p>
        </div>
      </section>

      {/* Form Content */}
      <section className="bg-brand-dark py-8 md:py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-[#1A1A18] border border-[#2A2A27] rounded-xl p-6 md:p-8">

            {/* Step 1: Service Type */}
            {step === 1 && (
              <div>
                <h2 className="font-heading text-2xl font-bold text-brand-cream mb-6">What do you need?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button type="button" onClick={() => { setServiceType("junk-removal"); setDumpsterSize(""); setRentalDuration(""); }}
                    className={`p-6 rounded-xl border-2 text-left transition-all ${serviceType === "junk-removal" ? "border-brand-amber bg-brand-amber/5" : "border-[#2A2A27] hover:border-brand-cream/20"}`}>
                    <div className="size-12 rounded-lg bg-brand-amber/10 flex items-center justify-center mb-3">
                      <Truck className="size-6 text-brand-amber" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-brand-cream mb-1">Junk Removal</h3>
                    <p className="text-sm text-brand-cream/50 mb-3">We come to you, load it up, and haul it away. Same-day service available.</p>
                    <p className="text-brand-amber font-semibold text-sm">Starting at $187</p>
                  </button>

                  <button type="button" onClick={() => { setServiceType("dumpster-rental"); setJrDescription(""); }}
                    className={`p-6 rounded-xl border-2 text-left transition-all ${serviceType === "dumpster-rental" ? "border-brand-amber bg-brand-amber/5" : "border-[#2A2A27] hover:border-brand-cream/20"}`}>
                    <div className="size-12 rounded-lg bg-brand-amber/10 flex items-center justify-center mb-3">
                      <Container className="size-6 text-brand-amber" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-brand-cream mb-1">Dumpster Rental</h3>
                    <p className="text-sm text-brand-cream/50 mb-3">Roll-off dumpsters delivered to your location. Fill at your pace, we pick up.</p>
                    <p className="text-brand-amber font-semibold text-sm">Starting at $400</p>
                  </button>
                </div>

                {/* JR selected — must get estimate first */}
                {serviceType === "junk-removal" && (
                  <div className="mt-6 p-5 bg-brand-dark rounded-xl border border-brand-amber/20">
                    <p className="text-sm text-brand-cream/70 mb-4">
                      Before booking, let&apos;s get you an estimated starting price. Choose how:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Link href="/estimate"
                        className="flex items-center gap-3 p-4 rounded-lg border border-[#2A2A27] hover:border-brand-amber/40 transition-colors">
                        <Camera className="size-8 text-brand-amber shrink-0" />
                        <div>
                          <p className="font-heading font-semibold text-brand-cream text-sm">Photo Estimate</p>
                          <p className="text-xs text-brand-cream/40">Snap a photo, get a price in seconds</p>
                        </div>
                      </Link>
                      <Link href="/quote"
                        className="flex items-center gap-3 p-4 rounded-lg border border-[#2A2A27] hover:border-brand-amber/40 transition-colors">
                        <ClipboardList className="size-8 text-brand-amber shrink-0" />
                        <div>
                          <p className="font-heading font-semibold text-brand-cream text-sm">Quick Quote</p>
                          <p className="text-xs text-brand-cream/40">Pick items from a list, see your price</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 2 (DR): Dumpster Details */}
            {step === 2 && isDR && (
              <div>
                <h2 className="font-heading text-2xl font-bold text-brand-cream mb-6">Dumpster Details</h2>

                {/* Stop Type */}
                <h3 className="font-heading text-sm font-semibold text-brand-cream/70 uppercase tracking-wider mb-3">What do you need?</h3>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {STOP_TYPES.map((t) => (
                    <button key={t.value} type="button" onClick={() => { setStopType(t.value); if (t.value === "exchange") setRentalDuration(""); }}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${stopType === t.value ? "border-brand-amber bg-brand-amber/5" : "border-[#2A2A27] hover:border-brand-cream/20"}`}>
                      <p className="font-heading font-semibold text-brand-cream text-sm">{t.label}</p>
                      <p className="text-xs text-brand-cream/40 mt-1">{t.desc}</p>
                    </button>
                  ))}
                </div>

                {/* Size */}
                <h3 className="font-heading text-sm font-semibold text-brand-cream/70 uppercase tracking-wider mb-3">Select a Size</h3>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  {DUMPSTER_SIZES.map((s) => (
                    <button key={s.value} type="button" onClick={() => { setDumpsterSize(s.value); if (s.value === "7") { if (materialType !== "concrete" && materialType !== "dirt") setMaterialType("concrete"); } else if (materialType === "concrete" || materialType === "dirt") setMaterialType(""); }}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${dumpsterSize === s.value ? "border-brand-amber bg-brand-amber/5" : "border-[#2A2A27] hover:border-brand-cream/20"} ${s.restricted ? "col-span-2 sm:col-span-1" : ""}`}>
                      <div className="flex items-center gap-2">
                        <p className="font-heading font-bold text-brand-cream">{s.label}</p>
                        {s.restricted && <span className="text-[10px] font-bold bg-brand-amber/20 text-brand-amber px-1.5 py-0.5 rounded">HEAVY MATERIAL ONLY</span>}
                      </div>
                      <p className="text-brand-amber font-semibold text-sm mt-1">{s.price}</p>
                      <p className="text-xs text-brand-cream/40 mt-1">Includes {s.tons} &middot; $160/ton overage</p>
                      <p className="text-xs text-brand-cream/30 mt-1">{s.desc}</p>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-brand-cream/30 mb-6">
                  Concrete, aggregate, stone, and dirt must go in a 7-yard dumpster and cannot be mixed with other debris types.
                </p>

                {/* Duration — only for new drops, not exchanges */}
                {stopType === "drop" && (
                  <>
                    <h3 className="font-heading text-sm font-semibold text-brand-cream/70 uppercase tracking-wider mb-3">Rental Duration</h3>
                    <div className="grid grid-cols-3 gap-3 mb-3">
                      {RENTAL_DURATIONS.map((d) => (
                        <button key={d.value} type="button" onClick={() => setRentalDuration(d.value)}
                          className={`p-3 rounded-xl border-2 text-center transition-all ${rentalDuration === d.value ? "border-brand-amber bg-brand-amber/5" : "border-[#2A2A27] hover:border-brand-cream/20"}`}>
                          <p className="font-heading font-semibold text-brand-cream text-sm">{d.label}</p>
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-brand-cream/30 mb-6">
                      Pickup is scheduled at the end of your rental period. Need it picked up earlier? Just let us know when it&apos;s full.
                    </p>
                  </>
                )}

                {/* Material Type */}
                <h3 className="font-heading text-sm font-semibold text-brand-cream/70 uppercase tracking-wider mb-3">Material Type</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
                  {MATERIAL_TYPES
                    .filter((m) => dumpsterSize === "7" ? (m.value === "concrete" || m.value === "dirt") : (m.value !== "concrete" && m.value !== "dirt"))
                    .map((m) => (
                    <button key={m.value} type="button" onClick={() => setMaterialType(m.value)}
                      className={`p-3 rounded-xl border-2 text-center transition-all ${materialType === m.value ? "border-brand-amber bg-brand-amber/5" : "border-[#2A2A27] hover:border-brand-cream/20"}`}>
                      <p className="font-heading font-semibold text-brand-cream text-sm">{m.label}</p>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-brand-cream/30 mb-6">
                  Each dumpster must contain one type of material only. Mixing types incurs a $150 surcharge.
                </p>

                <textarea value={drDescription} onChange={(e) => setDrDescription(e.target.value)} rows={3}
                  className="w-full px-4 py-3 bg-brand-dark border border-[#2A2A27] rounded-lg text-brand-cream placeholder:text-brand-cream/30 focus:outline-none focus:border-brand-amber focus:ring-1 focus:ring-brand-amber transition-colors resize-y"
                  placeholder="Any access restrictions? Special instructions for delivery?" />
              </div>
            )}

            {/* Date & Time step */}
            {step === dateStep && (
              <DateTimePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate}
                timeSlot={timeSlot} setTimeSlot={setTimeSlot} isDumpster={isDR} />
            )}

            {/* Your Info step */}
            {step === infoStep && (
              <div>
                <h2 className="font-heading text-2xl font-bold text-brand-cream mb-6">Your Information</h2>
                <div className="space-y-5">
                  <Field id="name" label="Name" required value={name} onChange={setName} placeholder="Your name" />
                  <Field id="book-phone" label="Phone" required value={phone} onChange={setPhone} placeholder="(808) 555-1234" type="tel" />
                  <Field id="book-email" label="Email" value={email} onChange={setEmail} placeholder="you@example.com" type="email" />
                  <AddressField label={isDR ? "Delivery Address" : "Pickup Address"} value={address} onChange={setAddress} />
                </div>
                <p className="text-xs text-brand-cream/30 mt-4">
                  We&apos;ll send you a confirmation text with your appointment details.
                </p>
              </div>
            )}

            {/* Confirmation step */}
            {step === confirmStep && (
              <div className="text-center py-6">
                <div className="size-16 rounded-full bg-green-500/10 border-2 border-green-500 flex items-center justify-center mx-auto mb-6">
                  <Check className="size-8 text-green-500" />
                </div>
                <h2 className="font-heading text-3xl font-bold text-brand-cream mb-2">
                  {isDR ? "Booking Received!" : "You\u2019re Booked!"}
                </h2>
                <p className="text-brand-cream/50 mb-8 text-sm">
                  Confirmation #{bookingId.slice(0, 8).toUpperCase()}
                  {isDR && taskId && <> &middot; Task #{taskId.slice(0, 8).toUpperCase()}</>}
                </p>

                <div className="bg-brand-dark border border-[#2A2A27] rounded-xl p-6 text-left max-w-sm mx-auto mb-8 space-y-3">
                  <SummaryRow label="Service" value={serviceLabel} />
                  {estimatedPrice && <SummaryRow label="Estimated Starting Price" value={`$${estimatedPrice}`} />}
                  {estimatedFraction && <SummaryRow label="Estimated Load" value={estimatedFraction} />}
                  {isDR && stopType && <SummaryRow label="Type" value={stopType === "exchange" ? "Exchange" : "Drop Off"} />}
                  {isDR && dumpsterSize && <SummaryRow label="Size" value={`${DUMPSTER_SIZES.find(s => s.value === dumpsterSize)?.label || dumpsterSize}`} />}
                  {isDR && rentalDuration && <SummaryRow label="Rental Period" value={RENTAL_DURATIONS.find(d => d.value === rentalDuration)?.label || rentalDuration} />}
                  {isDR && materialType && <SummaryRow label="Material" value={MATERIAL_TYPES.find(m => m.value === materialType)?.label || materialType} />}
                  <SummaryRow label="Date" value={selectedDate?.toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric" }) || ""} />
                  <SummaryRow label="Time" value={timeLabel} />
                  <SummaryRow label="Name" value={name} />
                  <SummaryRow label="Address" value={address} />
                </div>

                {/* Dumpster rental: Pay Now + agreement info */}
                {isDR && paymentUrl && (
                  <div className="mb-6">
                    <a href={paymentUrl} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 h-12 px-8 bg-brand-amber text-brand-dark font-heading font-semibold rounded-lg hover:bg-brand-amber-dark transition-colors text-lg">
                      <CreditCard className="size-5" />
                      Pay Now
                    </a>
                    <p className="text-brand-cream/40 text-xs mt-3">
                      Prepayment is required to confirm your delivery. A rental agreement will be sent to sign before drop-off.
                    </p>
                  </div>
                )}

                {isDR && !paymentUrl && (
                  <div className="mb-6">
                    <p className="text-brand-cream/50 text-sm">
                      Our team will send you a payment link shortly to confirm your delivery.
                    </p>
                    <p className="text-brand-cream/40 text-xs mt-2">
                      A rental agreement will be sent to sign before drop-off.
                    </p>
                  </div>
                )}

                <p className="text-brand-cream/70 mb-1 font-semibold">What happens next?</p>
                <p className="text-brand-cream/50 text-sm mb-2">
                  {isDR
                    ? "Complete payment to lock in your delivery date. You\u2019ll receive a confirmation text with rental details."
                    : "You\u2019ll receive a confirmation text shortly. Our team will reach out if we need to adjust any details."}
                </p>
                {estimatedPrice && (
                  <p className="text-brand-cream/40 text-xs mb-4">
                    Your estimated starting price is ${estimatedPrice}. Your team lead will confirm the firm price on-site before any work begins.
                  </p>
                )}
                <div className="flex items-center justify-center gap-2 text-brand-cream/50">
                  <Phone className="size-4" />
                  <span className="text-sm">
                    Questions? Call <a href="tel:+18082012668" className="text-brand-amber hover:underline">(808) 201-2668</a>
                  </span>
                </div>
              </div>
            )}

            {/* Navigation */}
            {step < confirmStep && (
              <div className="flex justify-between mt-8 pt-6 border-t border-[#2A2A27]">
                {(step > 1 && !(step === 2 && hasJREstimate)) ? (
                  <button type="button" onClick={() => { setStep(step - 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="flex items-center gap-2 h-11 px-6 border border-[#2A2A27] rounded-lg text-brand-cream hover:border-brand-cream/30 transition-colors">
                    <ChevronLeft className="size-4" /> Back
                  </button>
                ) : <div />}

                {/* Hide next for JR step 1 (they need to get estimate first) */}
                {!(step === 1 && serviceType === "junk-removal") && (
                  <button type="button" onClick={next} disabled={!canProceed() || submitting}
                    className={`flex items-center gap-2 h-11 px-8 rounded-lg font-heading font-semibold transition-colors ${
                      canProceed() && !submitting
                        ? "bg-brand-amber text-brand-dark hover:bg-brand-amber-dark"
                        : "bg-[#2A2A27] text-brand-cream/30 cursor-not-allowed"
                    }`}>
                    {submitting ? (isDR ? "Preparing Payment..." : "Booking...") : step === infoStep ? (isDR ? "Continue to Payment" : "Confirm Booking") : "Next"}
                    {!submitting && step < infoStep && <ChevronRight className="size-4" />}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({ id, label, required, value, onChange, placeholder, type = "text" }: {
  id: string; label: string; required?: boolean; value: string; onChange: (v: string) => void; placeholder: string; type?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-brand-cream/70 mb-1.5">
        {label} {required && <span className="text-brand-amber">*</span>}
      </label>
      <input type={type} id={id} value={value} onChange={(e) => onChange(e.target.value)} required={required}
        className="w-full h-11 px-4 bg-brand-dark border border-[#2A2A27] rounded-lg text-brand-cream placeholder:text-brand-cream/30 focus:outline-none focus:border-brand-amber focus:ring-1 focus:ring-brand-amber transition-colors"
        placeholder={placeholder} />
    </div>
  );
}

function AddressField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const [suggestions, setSuggestions] = useState<{ placeId: string; text: string; secondary: string }[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout>(null);

  const search = async (input: string) => {
    if (input.length < 3) { setSuggestions([]); return; }
    try {
      const res = await fetch("https://places.googleapis.com/v1/places:autocomplete", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Goog-Api-Key": process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "" },
        body: JSON.stringify({
          input,
          locationBias: { circle: { center: { latitude: 21.3069, longitude: -157.8583 }, radius: 50000 } },
          includedRegionCodes: ["us"],
          includedPrimaryTypes: ["street_address", "subpremise", "premise"],
        }),
      });
      if (!res.ok) return;
      const data = await res.json();
      const results = (data.suggestions || [])
        .filter((s: Record<string, unknown>) => s.placePrediction)
        .slice(0, 5)
        .map((s: Record<string, unknown>) => {
          const pred = s.placePrediction as Record<string, unknown>;
          const text = (pred.text as Record<string, string>)?.text || "";
          const structured = pred.structuredFormat as Record<string, Record<string, string>>;
          return {
            placeId: (pred.placeId || pred.place_id || "") as string,
            text: structured?.mainText?.text || text,
            secondary: structured?.secondaryText?.text || "",
          };
        });
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
    } catch { setSuggestions([]); }
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-brand-cream/70 mb-1.5">
        {label} <span className="text-brand-amber">*</span>
      </label>
      <input
        type="text" value={value} required autoComplete="off"
        onChange={(e) => {
          onChange(e.target.value);
          if (debounceRef.current) clearTimeout(debounceRef.current);
          debounceRef.current = setTimeout(() => search(e.target.value), 300);
        }}
        onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        placeholder="Start typing an address on Oahu..."
        className="w-full h-11 px-4 bg-brand-dark border border-[#2A2A27] rounded-lg text-brand-cream placeholder:text-brand-cream/30 focus:outline-none focus:border-brand-amber focus:ring-1 focus:ring-brand-amber transition-colors"
      />
      {showSuggestions && (
        <div className="absolute z-50 w-full mt-1 bg-[#1A1A18] border border-[#2A2A27] rounded-lg shadow-xl overflow-hidden">
          {suggestions.map((s, i) => (
            <button key={s.placeId || i} type="button"
              onMouseDown={() => { onChange(`${s.text}${s.secondary ? ", " + s.secondary : ""}`); setShowSuggestions(false); }}
              className="w-full text-left px-4 py-3 text-sm hover:bg-brand-amber/10 border-b border-[#2A2A27] last:border-0 transition-colors">
              <p className="font-medium text-brand-cream">{s.text}</p>
              {s.secondary && <p className="text-xs text-brand-cream/40">{s.secondary}</p>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <>
      <div className="flex justify-between">
        <span className="text-brand-cream/50 text-sm">{label}</span>
        <span className="text-brand-cream font-medium text-sm text-right max-w-[200px]">{value}</span>
      </div>
      <div className="border-t border-[#2A2A27]" />
    </>
  );
}

function DateTimePicker({ selectedDate, setSelectedDate, timeSlot, setTimeSlot, isDumpster }: {
  selectedDate: Date | null; setSelectedDate: (d: Date) => void; timeSlot: string; setTimeSlot: (s: string) => void; isDumpster: boolean;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const prevMonth = () => { if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); } else setViewMonth(viewMonth - 1); };
  const nextMonth = () => { if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); } else setViewMonth(viewMonth + 1); };
  const monthName = new Date(viewYear, viewMonth).toLocaleString("en-US", { month: "long", year: "numeric" });
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const isDisabled = (day: number) => {
    const date = new Date(viewYear, viewMonth, day);
    if (date < today) return true;
    if (date.getDay() === 0) return true;
    return false;
  };
  const isSameDay = (day: number) => selectedDate?.getFullYear() === viewYear && selectedDate?.getMonth() === viewMonth && selectedDate?.getDate() === day;
  const canGoPrev = viewYear > today.getFullYear() || (viewYear === today.getFullYear() && viewMonth > today.getMonth());

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-brand-cream mb-2">
        {isDumpster ? "Preferred Drop / Exchange Date" : "Preferred Pickup Date"}
      </h2>
      <p className="text-sm text-brand-cream/50 mb-6">Pick a date and time that works for you.</p>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <button type="button" onClick={prevMonth} disabled={!canGoPrev}
            className={`size-9 rounded-lg flex items-center justify-center transition-colors ${canGoPrev ? "hover:bg-[#2A2A27] text-brand-cream" : "text-brand-cream/20 cursor-not-allowed"}`}>
            <ChevronLeft className="size-5" />
          </button>
          <span className="font-heading font-semibold text-brand-cream">{monthName}</span>
          <button type="button" onClick={nextMonth} className="size-9 rounded-lg flex items-center justify-center hover:bg-[#2A2A27] text-brand-cream transition-colors">
            <ChevronRight className="size-5" />
          </button>
        </div>
        <div className="grid grid-cols-7 mb-1">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="text-center text-xs font-medium text-brand-cream/40 py-2">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, idx) => day === null ? <div key={`e-${idx}`} /> : (
            <button key={day} type="button" disabled={isDisabled(day)}
              onClick={() => setSelectedDate(new Date(viewYear, viewMonth, day))}
              className={`h-10 rounded-lg text-sm font-medium transition-colors ${
                isSameDay(day) ? "bg-brand-amber text-brand-dark"
                  : isDisabled(day) ? "text-brand-cream/15 cursor-not-allowed"
                  : "text-brand-cream hover:bg-[#2A2A27]"
              }`}>{day}</button>
          ))}
        </div>
      </div>

      {isDumpster ? (
        <>
          <h3 className="font-heading text-lg font-semibold text-brand-cream mb-3">Delivery Preference</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { val: "early-morning", label: "Early Morning", sub: "As early as possible" },
              { val: "anytime", label: "Anytime", sub: "Flexible — deliver when available" },
            ].map((t) => (
              <button key={t.val} type="button" onClick={() => setTimeSlot(t.val)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${timeSlot === t.val ? "border-brand-amber bg-brand-amber/5" : "border-[#2A2A27] hover:border-brand-cream/20"}`}>
                <p className="font-medium text-brand-cream text-sm">{t.label}</p>
                <p className="text-brand-cream/50 text-xs mt-0.5">{t.sub}</p>
              </button>
            ))}
          </div>
          <p className="text-xs text-brand-cream/30 mt-3">
            Delivery times are not guaranteed but we do our best to accommodate early morning drops. Pickup times are based on driver availability.
          </p>
        </>
      ) : (
        <>
          <h3 className="font-heading text-lg font-semibold text-brand-cream mb-3">Preferred 2-Hour Window</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { val: "8-10", label: "8 – 10 AM" },
              { val: "10-12", label: "10 AM – 12 PM" },
              { val: "12-2", label: "12 – 2 PM" },
              { val: "2-4", label: "2 – 4 PM" },
              { val: "4-6", label: "4 – 6 PM" },
            ].map((t) => (
              <button key={t.val} type="button" onClick={() => setTimeSlot(t.val)}
                className={`p-3 rounded-xl border-2 text-center transition-all ${timeSlot === t.val ? "border-brand-amber bg-brand-amber/5" : "border-[#2A2A27] hover:border-brand-cream/20"}`}>
                <p className="font-medium text-brand-cream text-sm">{t.label}</p>
              </button>
            ))}
          </div>
          <p className="text-xs text-brand-cream/30 mt-3">
            Your crew will arrive within your selected 2-hour window.
          </p>
        </>
      )}
    </div>
  );
}

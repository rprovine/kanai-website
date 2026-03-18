"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { trackFormSubmit } from "@/lib/tracking";

interface DumpsterQuoteFormProps {
  preselectedSize?: string;
  className?: string;
}

export function DumpsterQuoteForm({ preselectedSize, className }: DumpsterQuoteFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/dumpster-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          phone: data.get("phone"),
          address: data.get("address"),
          dumpsterSize: data.get("dumpsterSize"),
          rentalDuration: data.get("rentalDuration"),
          projectType: data.get("projectType"),
          message: data.get("message"),
        }),
      });

      if (!res.ok) throw new Error("Failed to submit");

      setSuccess(true);
      trackFormSubmit("dumpster_quote", { size: data.get("dumpsterSize") as string });
      form.reset();
    } catch {
      setError("Something went wrong. Please call us at (808) 215-5006.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className={className}>
        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
          <div className="text-4xl mb-3">&#10003;</div>
          <h3 className="text-xl font-bold text-green-800 mb-2">Quote Request Received!</h3>
          <p className="text-green-700">
            We&apos;ll contact you shortly with pricing and availability.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="dq-firstName" className="block text-sm font-medium mb-1">
            First Name *
          </label>
          <input
            type="text"
            id="dq-firstName"
            name="firstName"
            required
            className="w-full px-4 py-3 rounded-lg border border-brand-gray-300 focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition"
          />
        </div>
        <div>
          <label htmlFor="dq-lastName" className="block text-sm font-medium mb-1">
            Last Name *
          </label>
          <input
            type="text"
            id="dq-lastName"
            name="lastName"
            required
            className="w-full px-4 py-3 rounded-lg border border-brand-gray-300 focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition"
          />
        </div>
        <div>
          <label htmlFor="dq-email" className="block text-sm font-medium mb-1">
            Email *
          </label>
          <input
            type="email"
            id="dq-email"
            name="email"
            required
            className="w-full px-4 py-3 rounded-lg border border-brand-gray-300 focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition"
          />
        </div>
        <div>
          <label htmlFor="dq-phone" className="block text-sm font-medium mb-1">
            Phone *
          </label>
          <input
            type="tel"
            id="dq-phone"
            name="phone"
            required
            className="w-full px-4 py-3 rounded-lg border border-brand-gray-300 focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="dq-address" className="block text-sm font-medium mb-1">
            Delivery Address *
          </label>
          <input
            type="text"
            id="dq-address"
            name="address"
            required
            className="w-full px-4 py-3 rounded-lg border border-brand-gray-300 focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition"
          />
        </div>
        <div>
          <label htmlFor="dq-size" className="block text-sm font-medium mb-1">
            Dumpster Size *
          </label>
          <select
            id="dq-size"
            name="dumpsterSize"
            required
            defaultValue={preselectedSize || ""}
            className="w-full px-4 py-3 rounded-lg border border-brand-gray-300 focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition"
          >
            <option value="">Select size...</option>
            <option value="10">10 Yard</option>
            <option value="15">15 Yard</option>
            <option value="20">20 Yard</option>
            <option value="30">30 Yard</option>
            <option value="40">40 Yard</option>
          </select>
        </div>
        <div>
          <label htmlFor="dq-duration" className="block text-sm font-medium mb-1">
            Rental Duration
          </label>
          <select
            id="dq-duration"
            name="rentalDuration"
            className="w-full px-4 py-3 rounded-lg border border-brand-gray-300 focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition"
          >
            <option value="3">3 days</option>
            <option value="7" selected>7 days</option>
            <option value="10">10 days</option>
            <option value="14">14 days</option>
            <option value="30">30 days</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="dq-project" className="block text-sm font-medium mb-1">
            Project Type
          </label>
          <select
            id="dq-project"
            name="projectType"
            className="w-full px-4 py-3 rounded-lg border border-brand-gray-300 focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition"
          >
            <option value="">Select project type...</option>
            <option value="cleanout">Home Cleanout</option>
            <option value="renovation">Renovation / Remodel</option>
            <option value="construction">Construction</option>
            <option value="roofing">Roofing</option>
            <option value="landscaping">Landscaping</option>
            <option value="demolition">Demolition</option>
            <option value="commercial">Commercial</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="dq-message" className="block text-sm font-medium mb-1">
            Additional Details
          </label>
          <textarea
            id="dq-message"
            name="message"
            rows={3}
            className="w-full px-4 py-3 rounded-lg border border-brand-gray-300 focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition resize-none"
          />
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <Button type="submit" disabled={loading} className="mt-6 w-full sm:w-auto">
        {loading ? "Submitting..." : "Get Dumpster Quote"}
      </Button>
    </form>
  );
}

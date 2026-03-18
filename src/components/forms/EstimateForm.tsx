"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { trackFormSubmit } from "@/lib/tracking";

interface EstimateFormProps {
  source?: string;
  className?: string;
}

export function EstimateForm({ source = "website", className }: EstimateFormProps) {
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
      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          phone: data.get("phone"),
          address: data.get("address"),
          service: data.get("service"),
          message: data.get("message"),
          source,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit");

      setSuccess(true);
      trackFormSubmit("estimate", { source });
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
          <h3 className="text-xl font-bold text-green-800 mb-2">Request Received!</h3>
          <p className="text-green-700">
            We&apos;ll get back to you within 1 business hour with your free estimate.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium mb-1">
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            className="w-full px-4 py-3 rounded-lg border border-brand-gray-300 focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium mb-1">
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            className="w-full px-4 py-3 rounded-lg border border-brand-gray-300 focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 rounded-lg border border-brand-gray-300 focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1">
            Phone *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            className="w-full px-4 py-3 rounded-lg border border-brand-gray-300 focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="address" className="block text-sm font-medium mb-1">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            className="w-full px-4 py-3 rounded-lg border border-brand-gray-300 focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="service" className="block text-sm font-medium mb-1">
            Service Needed
          </label>
          <select
            id="service"
            name="service"
            className="w-full px-4 py-3 rounded-lg border border-brand-gray-300 focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition"
          >
            <option value="">Select a service...</option>
            <option value="junk-removal">Junk Removal</option>
            <option value="furniture-removal">Furniture Removal</option>
            <option value="appliance-removal">Appliance Removal</option>
            <option value="garage-cleanout">Garage Cleanout</option>
            <option value="estate-cleanout">Estate Cleanout</option>
            <option value="commercial">Commercial Junk Removal</option>
            <option value="construction-debris">Construction Debris</option>
            <option value="yard-waste">Yard Waste</option>
            <option value="demolition">Light Demolition</option>
            <option value="dumpster-rental">Dumpster Rental</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Tell us about your project
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-brand-gray-300 focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition resize-none"
          />
        </div>
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-600">{error}</p>
      )}

      <Button type="submit" disabled={loading} className="mt-6 w-full sm:w-auto">
        {loading ? "Submitting..." : "Get Free Estimate"}
      </Button>
    </form>
  );
}

"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { trackFormSubmit } from "@/lib/tracking";

export function ContactForm({ className }: { className?: string }) {
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          phone: data.get("phone"),
          subject: data.get("subject"),
          message: data.get("message"),
        }),
      });

      if (!res.ok) throw new Error("Failed to submit");

      setSuccess(true);
      trackFormSubmit("contact");
      form.reset();
    } catch {
      setError("Something went wrong. Please call us at (808) 215-5006.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className={className} aria-live="polite">
        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
          <div className="text-4xl mb-3">&#10003;</div>
          <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent!</h3>
          <p className="text-green-700">We&apos;ll get back to you as soon as possible.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cf-firstName" className="block text-sm font-medium mb-1">First Name *</label>
          <input type="text" id="cf-firstName" name="firstName" required className="w-full px-4 py-3 rounded-lg border border-brand-gray-300 focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition" />
        </div>
        <div>
          <label htmlFor="cf-lastName" className="block text-sm font-medium mb-1">Last Name *</label>
          <input type="text" id="cf-lastName" name="lastName" required className="w-full px-4 py-3 rounded-lg border border-brand-gray-300 focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition" />
        </div>
        <div>
          <label htmlFor="cf-email" className="block text-sm font-medium mb-1">Email *</label>
          <input type="email" id="cf-email" name="email" required className="w-full px-4 py-3 rounded-lg border border-brand-gray-300 focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition" />
        </div>
        <div>
          <label htmlFor="cf-phone" className="block text-sm font-medium mb-1">Phone</label>
          <input type="tel" id="cf-phone" name="phone" className="w-full px-4 py-3 rounded-lg border border-brand-gray-300 focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-subject" className="block text-sm font-medium mb-1">Subject *</label>
          <input type="text" id="cf-subject" name="subject" required className="w-full px-4 py-3 rounded-lg border border-brand-gray-300 focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-message" className="block text-sm font-medium mb-1">Message *</label>
          <textarea id="cf-message" name="message" required rows={5} className="w-full px-4 py-3 rounded-lg border border-brand-gray-300 focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition resize-none" />
        </div>
      </div>
      {error && <p className="mt-4 text-sm text-red-600" role="alert" aria-live="assertive">{error}</p>}
      <Button type="submit" disabled={loading} className="mt-6 w-full sm:w-auto">
        {loading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}

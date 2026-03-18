"use client";

import { useState, useRef, FormEvent, ChangeEvent, DragEvent } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { trackFormSubmit } from "@/lib/tracking";
import { siteConfig } from "@/data/site";

const MAX_FILES = 3;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

interface SelectedFile {
  file: File;
  preview: string;
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

interface EstimateFormProps {
  source?: string;
  className?: string;
}

export function EstimateForm({ source = "website", className }: EstimateFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function addFiles(files: FileList | File[]) {
    const incoming = Array.from(files);
    const remaining = MAX_FILES - selectedFiles.length;
    const valid = incoming
      .filter((f) => f.type.startsWith("image/"))
      .filter((f) => f.size <= MAX_FILE_SIZE)
      .slice(0, remaining);

    const newEntries: SelectedFile[] = valid.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setSelectedFiles((prev) => [...prev, ...newEntries]);
  }

  function removeFile(index: number) {
    setSelectedFiles((prev) => {
      const copy = [...prev];
      URL.revokeObjectURL(copy[index].preview);
      copy.splice(index, 1);
      return copy;
    });
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) addFiles(e.target.files);
    e.target.value = "";
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files) addFiles(e.dataTransfer.files);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const images = await Promise.all(
        selectedFiles.map((sf) => fileToBase64(sf.file))
      );

      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          phone: data.get("phone"),
          service: data.get("service"),
          message: data.get("message"),
          source,
          ...(images.length > 0 && { images }),
        }),
      });

      if (!res.ok) throw new Error("Failed to submit");

      setSuccess(true);
      trackFormSubmit("estimate", { source });
      form.reset();
      selectedFiles.forEach((sf) => URL.revokeObjectURL(sf.preview));
      setSelectedFiles([]);
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium mb-1">
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            placeholder="John"
            className="w-full px-4 py-2.5 rounded-lg border border-brand-gray-300 focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition"
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
            placeholder="Doe"
            className="w-full px-4 py-2.5 rounded-lg border border-brand-gray-300 focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition"
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
            placeholder="john@example.com"
            className="w-full px-4 py-2.5 rounded-lg border border-brand-gray-300 focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition"
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
            placeholder="(808) 555-1234"
            className="w-full px-4 py-2.5 rounded-lg border border-brand-gray-300 focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="service" className="block text-sm font-medium mb-1">
            Service Needed
          </label>
          <select
            id="service"
            name="service"
            className="w-full px-4 py-2.5 rounded-lg border border-brand-gray-300 focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition"
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
            rows={3}
            placeholder="Describe what you need hauled away..."
            className="w-full px-4 py-2.5 rounded-lg border border-brand-gray-300 focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition resize-none"
          />
        </div>

        {/* Photo upload */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-1">
            Add photos (optional)
          </label>
          <div
            className={`relative border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition ${
              dragOver
                ? "border-brand-red bg-red-50"
                : "border-brand-gray-300 hover:border-brand-gray-400"
            }`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
            <svg
              className="w-6 h-6 mx-auto text-brand-gray-400 mb-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
              />
            </svg>
            <p className="text-sm text-brand-gray-500">
              Click or drag photos here
            </p>
            <p className="text-xs text-brand-gray-400 mt-0.5">
              Max {MAX_FILES} files, 5MB each
            </p>
          </div>

          {/* Thumbnails */}
          {selectedFiles.length > 0 && (
            <div className="flex gap-2 mt-2 flex-wrap">
              {selectedFiles.map((sf, i) => (
                <div key={i} className="relative group">
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-brand-gray-200 relative">
                    <Image
                      src={sf.preview}
                      alt={sf.file.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(i);
                    }}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-brand-gray-900 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label={`Remove ${sf.file.name}`}
                  >
                    &times;
                  </button>
                  <p className="text-[10px] text-brand-gray-400 mt-0.5 max-w-[64px] truncate">
                    {sf.file.name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-600" role="alert" aria-live="assertive">{error}</p>
      )}

      <Button type="submit" disabled={loading} className="mt-5 w-full">
        {loading ? "Submitting..." : "Get Free Estimate"}
      </Button>

      <p className="mt-3 text-center text-sm text-brand-gray-500">
        Or call{" "}
        <a href={siteConfig.phoneHref} className="text-brand-red font-semibold hover:underline">
          {siteConfig.phone}
        </a>
      </p>
    </form>
  );
}

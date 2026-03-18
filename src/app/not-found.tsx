import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-6 text-center">
      <h1 className="text-6xl font-bold text-[#f20c2d] mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-400 max-w-md mb-8">
        Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="inline-block rounded-lg bg-[#f20c2d] px-6 py-3 font-semibold text-white hover:bg-red-700 transition-colors"
        >
          Back to Home
        </Link>
        <Link
          href="/services"
          className="inline-block rounded-lg border border-white/30 px-6 py-3 font-semibold text-white hover:border-white transition-colors"
        >
          Our Services
        </Link>
      </div>
    </section>
  );
}

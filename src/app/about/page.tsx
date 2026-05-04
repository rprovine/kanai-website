import type { Metadata } from "next";
import { ShieldCheck, MapPin, Leaf, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Kana'i's Roll Off & Junk Removal",
  description:
    "Locally owned and operated on Oahu since 2021. Meet the team behind Kana'i's Roll Off & Junk Removal — licensed, insured, and eco-responsible.",
};

const badges = [
  {
    icon: ShieldCheck,
    title: "Licensed & Insured",
    description: "Fully licensed and insured for your protection",
  },
  {
    icon: MapPin,
    title: "Hawaii-Owned & Operated",
    description: "Born and raised on Oahu, serving the whole island",
  },
  {
    icon: Leaf,
    title: "Eco-Responsible",
    description: "We recycle and donate whenever possible",
  },
  {
    icon: Star,
    title: "200+ Five-Star Reviews",
    description: "Trusted by hundreds of Oahu families and businesses",
  },
];

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative bg-brand-dark py-16 md:py-24 overflow-hidden">
        <img src="/images/hero-about.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/30 to-brand-dark/50" />
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-brand-cream mb-6">
            About Kana&apos;i&apos;s Roll Off
          </h1>
          <p className="text-lg md:text-xl text-brand-cream/70 max-w-2xl mx-auto">
            A local company built on hard work, honest pricing, and doing right
            by our community.
          </p>
        </div>
      </section>

      {/* Founders */}
      <section className="bg-brand-dark py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-cream text-center mb-12">
            Meet the Team Behind the Trucks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Founders photo */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[#2A2A27]">
              <img src="/images/founders.jpg" alt="Brooks and Kana'i — Founders of Kana'i's Roll Off & Junk Removal" className="w-full h-full object-cover" />
            </div>
            {/* Story */}
            <div>
              <h3 className="font-heading text-2xl font-semibold text-brand-cream mb-4">
                Brooks &amp; Kana&apos;i
              </h3>
              <div className="space-y-4 text-brand-cream/70">
                <p>
                  Kana&apos;i&apos;s Roll Off &amp; Junk Removal was founded in
                  2021 by Brooks and Kana&apos;i with a single truck and a
                  simple mission: give Oahu homeowners and businesses a reliable,
                  honest way to get rid of their junk without the runaround.
                </p>
                <p>
                  What started as two guys hauling loads across the island has
                  grown into a full-service junk removal and dumpster rental
                  operation serving every corner of Oahu — from Kapolei to
                  Kailua, North Shore to Hawaii Kai.
                </p>
                <p>
                  We&apos;re not a franchise. We don&apos;t have a call center
                  on the mainland. When you call us, you&apos;re talking to
                  someone who lives here, works here, and takes pride in keeping
                  our island clean.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hawaii-Owned Story */}
      <section className="bg-[#1A1A18] py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-cream mb-6">
            Born on Oahu, Built for Oahu
          </h2>
          <p className="text-brand-cream/70 max-w-2xl mx-auto text-lg">
            We know the narrow driveways, the steep hills, the neighborhoods
            where you need to park down the street. We know the dump schedules,
            the recycling centers, and which items need special handling.
            That&apos;s the advantage of hiring a truly local company — we
            understand the islands because we live here.
          </p>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-brand-dark py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {badges.map((badge) => (
              <div
                key={badge.title}
                className="bg-[#1A1A18] border border-[#2A2A27] rounded-xl p-6 text-center"
              >
                <div className="inline-flex items-center justify-center size-14 rounded-full bg-brand-amber/10 border border-brand-amber/20 mb-4">
                  <badge.icon className="size-7 text-brand-amber" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-brand-cream mb-2">
                  {badge.title}
                </h3>
                <p className="text-sm text-brand-cream/60">
                  {badge.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-[#1A1A18] py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-cream text-center mb-4">
            Our Crew
          </h2>
          <p className="text-brand-cream/60 text-center mb-12 max-w-xl mx-auto">
            The hardworking team that shows up rain or shine, ready to get the
            job done right.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "Xavier", role: "Field Ops Supervisor", img: "/images/team-xavier.jpg" },
              { name: "Rey", role: "Team Lead", img: "/images/team-rey.png" },
              { name: "AJ", role: "Navigator", img: "/images/team-aj.png" },
            ].map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative w-28 h-28 md:w-32 md:h-32 mx-auto mb-3 rounded-full overflow-hidden border-2 border-[#2A2A27]">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <p className="font-heading font-bold text-brand-cream text-sm">{member.name}</p>
                <p className="text-xs text-brand-cream/40">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

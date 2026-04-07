"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "How does the AI estimate work?",
    a: "Take a photo of your junk pile with your phone. Our AI identifies each item, calculates the volume, and gives you an estimated starting price in under 15 seconds. When our team lead arrives on-site, they'll assess the actual load and give you a firm price before any work begins.",
  },
  {
    q: "Is the online estimate a firm price?",
    a: "No — the online estimate is an estimated starting price based solely on the photos or information you provide. Items can look different in person, and loads often change by the time we arrive. Your team lead will give you the firm price on-site. If you approve it, we get to work immediately. If not, you owe nothing.",
  },
  {
    q: "What items do you take?",
    a: "Furniture, appliances, mattresses, electronics, yard waste, construction debris, hot tubs, exercise equipment, and general household junk. If it fits in our truck, we can haul it.",
  },
  {
    q: "What items don't you take?",
    a: "We can't haul hazardous materials (paint, chemicals, asbestos), medical waste, or fuel/propane tanks. If you're unsure about a specific item, give us a call.",
  },
  {
    q: "How is weight factored into pricing?",
    a: "Pricing is based primarily on truck load volume (how much space your items take up). Weight affects dump fees, which are factored into your price. Your team lead will confirm the final price on-site before any work begins.",
  },
  {
    q: "Do I need to be home for the pickup?",
    a: "We prefer someone over 18 to be present to walk us through what goes and approve the final price. If that's not possible, we can arrange a curbside or driveway pickup.",
  },
  {
    q: "What areas do you serve on Oahu?",
    a: "We serve all of Oahu — from Kapolei to Hawaii Kai, Mililani to Kailua, and everywhere in between. Our home base is in Aiea.",
  },
  {
    q: "How do I reschedule or cancel?",
    a: "Use our customer portal to reschedule or cancel online, or call us at (808) 201-2668. We ask for at least 24 hours' notice for schedule changes.",
  },
];

export default function FAQAccordion() {
  return (
    <section className="py-16 md:py-24 bg-[#1A1A18]">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="font-heading text-3xl md:text-4xl font-black text-brand-cream text-center mb-12">
          Frequently Asked Questions
        </h2>

        <Accordion className="space-y-2">
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={i}
              className="bg-brand-dark border border-white/5 rounded-lg px-5 data-open:border-brand-amber/20"
            >
              <AccordionTrigger className="text-left text-sm font-semibold text-brand-cream hover:text-brand-amber hover:no-underline py-4 aria-expanded:text-brand-amber">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-brand-cream/60 leading-relaxed pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

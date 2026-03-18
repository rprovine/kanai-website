export interface DumpsterSize {
  size: string;
  slug: string;
  title: string;
  metaDescription: string;
  dimensions: string;
  weight: string;
  capacity: string;
  priceRange: string;
  rentalPeriod: string;
  idealFor: string[];
  description: string;
  items: string[];
  faqs: { question: string; answer: string }[];
}

export const dumpsterSizes: DumpsterSize[] = [
  {
    size: "10",
    slug: "10-yard",
    title: "10 Yard Dumpster Rental",
    metaDescription: "Rent a 10 yard dumpster in Oahu. Perfect for small cleanouts and minor renovations. Affordable pricing, fast delivery. Call (808) 215-5006.",
    dimensions: "12' L × 8' W × 3.5' H",
    weight: "Up to 2 tons",
    capacity: "Equivalent to 3 pickup truck loads",
    priceRange: "Starting at $350",
    rentalPeriod: "Up to 7 days",
    idealFor: [
      "Small garage or basement cleanout",
      "Minor bathroom or kitchen remodel",
      "Small landscaping project",
      "Single room declutter",
    ],
    description: "Our 10 yard dumpster is the perfect choice for small projects. With a low profile height of just 3.5 feet, it's easy to load and fits in tight driveways. Ideal for single-room cleanouts, minor renovations, and small landscaping jobs.",
    items: ["Household junk", "Small furniture", "Yard waste", "Minor renovation debris", "Boxes and clutter"],
    faqs: [
      { question: "How much can a 10 yard dumpster hold?", answer: "A 10 yard dumpster holds about 3 pickup truck loads of material, or roughly 10 cubic yards of waste." },
      { question: "Will it fit in my driveway?", answer: "Yes! At 12 feet long, the 10 yard dumpster fits in most standard driveways." },
      { question: "What's the weight limit?", answer: "The weight limit is 2 tons (4,000 lbs). Overages may incur additional charges." },
    ],
  },
  {
    size: "15",
    slug: "15-yard",
    title: "15 Yard Dumpster Rental",
    metaDescription: "Rent a 15 yard dumpster in Oahu. Great for medium cleanouts and remodeling projects. Fast delivery. Call (808) 215-5006.",
    dimensions: "14' L × 8' W × 4' H",
    weight: "Up to 2.5 tons",
    capacity: "Equivalent to 5 pickup truck loads",
    priceRange: "Starting at $425",
    rentalPeriod: "Up to 7 days",
    idealFor: [
      "Multi-room cleanout",
      "Medium renovation project",
      "Deck or fence removal",
      "Large garage cleanout",
    ],
    description: "The 15 yard dumpster is our most popular size for homeowners. It offers the perfect balance of capacity and footprint, handling medium-sized cleanouts and renovation projects with ease.",
    items: ["Furniture", "Appliances", "Renovation debris", "Yard waste", "General household junk"],
    faqs: [
      { question: "Is a 15 yard dumpster enough for a kitchen remodel?", answer: "For most kitchen remodels, a 15 yard dumpster provides sufficient capacity for cabinets, countertops, flooring, and fixtures." },
      { question: "How long can I keep it?", answer: "Standard rental is up to 7 days. Extensions are available for an additional daily fee." },
    ],
  },
  {
    size: "20",
    slug: "20-yard",
    title: "20 Yard Dumpster Rental",
    metaDescription: "Rent a 20 yard dumpster in Oahu. Ideal for large cleanouts, construction, and remodeling. Call (808) 215-5006.",
    dimensions: "16' L × 8' W × 4.5' H",
    weight: "Up to 3 tons",
    capacity: "Equivalent to 7 pickup truck loads",
    priceRange: "Starting at $500",
    rentalPeriod: "Up to 10 days",
    idealFor: [
      "Large home cleanout",
      "Full kitchen or bathroom remodel",
      "Roofing project (up to 25 squares)",
      "New construction waste",
    ],
    description: "Our 20 yard dumpster is the go-to choice for large projects. Whether you're tackling a full remodel, roofing job, or large cleanout, this size has the capacity to handle it.",
    items: ["Construction debris", "Roofing materials", "Large furniture", "Appliances", "Bulk household items"],
    faqs: [
      { question: "Can I put roofing shingles in a 20 yard dumpster?", answer: "Yes, but shingles are heavy. A 20 yard dumpster can handle up to 25 squares of shingles within the weight limit." },
      { question: "Is this big enough for a whole house cleanout?", answer: "For a small to medium-sized home, yes. Larger homes may need a 30 or 40 yard dumpster." },
    ],
  },
  {
    size: "30",
    slug: "30-yard",
    title: "30 Yard Dumpster Rental",
    metaDescription: "Rent a 30 yard dumpster in Oahu. Perfect for large construction, demolition, and commercial projects. Call (808) 215-5006.",
    dimensions: "20' L × 8' W × 5' H",
    weight: "Up to 4 tons",
    capacity: "Equivalent to 9 pickup truck loads",
    priceRange: "Starting at $600",
    rentalPeriod: "Up to 10 days",
    idealFor: [
      "Large construction or demolition",
      "Whole-home renovation",
      "Commercial cleanout",
      "Large estate cleanout",
    ],
    description: "The 30 yard dumpster is designed for large-scale projects. With 30 cubic yards of capacity, it handles major renovations, construction projects, and large property cleanouts.",
    items: ["Heavy construction debris", "Demolition materials", "Large volumes of junk", "Commercial waste", "Bulky items"],
    faqs: [
      { question: "Do I need a permit for a 30 yard dumpster?", answer: "If placed on your private property (driveway), no permit is needed. Placement on public streets may require a permit — we can help coordinate this." },
      { question: "How is this delivered?", answer: "We deliver using a roll-off truck. You'll need about 60 feet of clearance for delivery." },
    ],
  },
  {
    size: "40",
    slug: "40-yard",
    title: "40 Yard Dumpster Rental",
    metaDescription: "Rent a 40 yard dumpster in Oahu. Our largest size for major construction and commercial projects. Call (808) 215-5006.",
    dimensions: "22' L × 8' W × 6' H",
    weight: "Up to 5 tons",
    capacity: "Equivalent to 12 pickup truck loads",
    priceRange: "Starting at $750",
    rentalPeriod: "Up to 14 days",
    idealFor: [
      "Major commercial construction",
      "Large-scale demolition",
      "Industrial cleanout",
      "Multi-unit property cleanout",
    ],
    description: "Our largest dumpster is built for the biggest jobs. At 40 cubic yards, it's the workhorse for commercial construction, large-scale demolition, and industrial cleanouts.",
    items: ["High-volume construction waste", "Demolition debris", "Industrial materials", "Commercial cleanout waste", "Bulk recyclables"],
    faqs: [
      { question: "When would I need a 40 yard dumpster?", answer: "A 40 yard dumpster is ideal for commercial construction, large demolition projects, and clearing multi-unit properties." },
      { question: "Can this be placed on residential property?", answer: "Yes, if you have adequate space. You'll need a flat surface and about 70 feet of clearance for delivery." },
    ],
  },
];

export function getDumpsterBySlug(slug: string): DumpsterSize | undefined {
  return dumpsterSizes.find((d) => d.slug === slug);
}

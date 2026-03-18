export interface DumpsterSize {
  size: string;
  slug: string;
  title: string;
  metaDescription: string;
  dimensions: string;
  weight: string;
  tonnageIncluded: string;
  capacity: string;
  priceRange: string;
  rentalPeriod: string;
  bestFor: string;
  idealFor: string[];
  description: string;
  items: string[];
  prohibitedItems: string[];
  faqs: { question: string; answer: string }[];
}

export const dumpsterSizes: DumpsterSize[] = [
  {
    size: "7",
    slug: "7-yard",
    title: "7 Yard Dumpster Rental",
    metaDescription: "Rent a 7 yard dumpster in Oahu. Best for dirt, concrete, asphalt & aggregates. 4 tons included. Starting at $600. Call (808) 215-5006.",
    dimensions: "12' L × 8' W × 2' H",
    weight: "4 tons included",
    tonnageIncluded: "4 tons",
    capacity: "Equivalent to 2-3 pickup truck loads",
    priceRange: "Starting at $600",
    rentalPeriod: "Flexible rental periods",
    bestFor: "Dirt, concrete, asphalt & aggregates",
    idealFor: [
      "Dirt, concrete, asphalt & aggregates",
      "Small driveway or patio demo",
      "Landscaping rock and soil removal",
      "Heavy material hauling",
    ],
    description: "Our 7 yard dumpster is purpose-built for heavy materials. With a low 2-foot profile and 4 tons of included weight, it's the go-to choice for concrete, dirt, asphalt, and aggregate removal. The compact footprint fits easily in any driveway.",
    items: ["Dirt and soil", "Concrete", "Asphalt", "Gravel and rock", "Brick and masonry", "Aggregates"],
    prohibitedItems: ["Tires", "Paint", "Pesticides", "Gasoline", "Motor oil"],
    faqs: [
      { question: "Why does the 7 yard have more tonnage than larger sizes?", answer: "The 7 yard is designed specifically for heavy materials like concrete and dirt. These materials are dense, so the weight limit is higher even though the volume is smaller." },
      { question: "Can I put regular household junk in a 7 yard?", answer: "You can, but it's not the most cost-effective option for light materials. The 15 or 20 yard dumpsters are better suited for general junk and household cleanouts." },
      { question: "Will it fit in my driveway?", answer: "Yes! At 12 feet long and only 2 feet tall, the 7 yard dumpster fits in most standard driveways with room to spare." },
    ],
  },
  {
    size: "15",
    slug: "15-yard",
    title: "15 Yard Dumpster Rental",
    metaDescription: "Rent a 15 yard dumpster in Oahu. Perfect for small-scale projects. 2 tons included. Starting at $800. Call (808) 215-5006.",
    dimensions: "14' L × 8' W × 4' H",
    weight: "2 tons included",
    tonnageIncluded: "2 tons",
    capacity: "Equivalent to 5 pickup truck loads",
    priceRange: "Starting at $800",
    rentalPeriod: "Flexible rental periods",
    bestFor: "Small-scale projects",
    idealFor: [
      "Small-scale home cleanouts",
      "Single room renovation",
      "Garage or basement cleanout",
      "Small landscaping projects",
    ],
    description: "The 15 yard dumpster is our most popular size for homeowners. Perfect for small-scale cleanouts and renovation projects. With 2 tons of included weight and a manageable 4-foot height, it's easy to load and handles most residential jobs.",
    items: ["Furniture", "Appliances", "Household junk", "Renovation debris", "Yard waste", "Electronics"],
    prohibitedItems: ["Tires", "Paint", "Pesticides", "Gasoline", "Motor oil"],
    faqs: [
      { question: "Is a 15 yard dumpster enough for a kitchen remodel?", answer: "For most kitchen remodels, a 15 yard dumpster provides sufficient capacity for cabinets, countertops, flooring, and fixtures. If you're also removing appliances, you may want to consider the 20 yard." },
      { question: "What happens if I go over the weight limit?", answer: "Overage fees apply for weight above the included tonnage. Contact us for current overage rates." },
      { question: "How long can I keep it?", answer: "We offer flexible rental periods for both short-term and long-term needs. Contact us to discuss your project timeline." },
    ],
  },
  {
    size: "20",
    slug: "20-yard",
    title: "20 Yard Dumpster Rental",
    metaDescription: "Rent a 20 yard dumpster in Oahu. Ideal for commercial projects. 3 tons included. Starting at $850. Call (808) 215-5006.",
    dimensions: "14' L × 8' W × 5' H",
    weight: "3 tons included",
    tonnageIncluded: "3 tons",
    capacity: "Equivalent to 7 pickup truck loads",
    priceRange: "Starting at $850",
    rentalPeriod: "Flexible rental periods",
    bestFor: "Commercial projects",
    idealFor: [
      "Commercial cleanouts and build-outs",
      "Full kitchen or bathroom remodel",
      "Multi-room renovation",
      "Roofing projects",
    ],
    description: "Our 20 yard dumpster is the go-to for commercial projects and larger renovations. With 3 tons of included weight and 5-foot walls, it handles full remodels, roofing jobs, and commercial cleanouts with ease.",
    items: ["Construction debris", "Roofing materials", "Large furniture", "Appliances", "Commercial waste", "Bulk household items"],
    prohibitedItems: ["Tires", "Paint", "Pesticides", "Gasoline", "Motor oil"],
    faqs: [
      { question: "Can I put roofing shingles in a 20 yard dumpster?", answer: "Yes, but shingles are heavy. A 20 yard dumpster can handle roofing waste within the 3-ton weight limit. Contact us if you're unsure about weight." },
      { question: "Is this big enough for a whole house cleanout?", answer: "For a small to medium-sized home, yes. Larger homes may need a 25 or 30 yard dumpster." },
    ],
  },
  {
    size: "25",
    slug: "25-yard",
    title: "25 Yard Dumpster Rental",
    metaDescription: "Rent a 25 yard dumpster in Oahu. Perfect for large-scale cleanouts. 3 tons included. Starting at $850. Call (808) 215-5006.",
    dimensions: "14' L × 8' W × 6' H",
    weight: "3 tons included",
    tonnageIncluded: "3 tons",
    capacity: "Equivalent to 9 pickup truck loads",
    priceRange: "Starting at $850",
    rentalPeriod: "Flexible rental periods",
    bestFor: "Large-scale cleanouts",
    idealFor: [
      "Large-scale home cleanouts",
      "Estate cleanouts",
      "Whole-home renovation",
      "Large landscaping projects",
    ],
    description: "The 25 yard dumpster is designed for large-scale cleanouts. Same footprint as the 20 yard but with taller 6-foot walls, giving you more volume at the same price point. Ideal for estate cleanouts, whole-home renovations, and large property clear-outs.",
    items: ["Large volumes of junk", "Estate cleanout materials", "Renovation debris", "Furniture and appliances", "Bulk household items", "Yard waste"],
    prohibitedItems: ["Tires", "Paint", "Pesticides", "Gasoline", "Motor oil"],
    faqs: [
      { question: "What's the difference between the 20 and 25 yard?", answer: "Same footprint (14' × 8'), but the 25 yard has 6-foot walls vs 5-foot. You get more volume for the same starting price — great for bulky but lighter items." },
      { question: "Do I need a permit?", answer: "If placed on your private property (driveway), no permit is needed. Placement on public streets may require a permit — we can help coordinate this." },
    ],
  },
  {
    size: "30",
    slug: "30-yard",
    title: "30 Yard Dumpster Rental",
    metaDescription: "Rent a 30 yard dumpster in Oahu. Our largest size for commercial projects. 5 tons included. Starting at $950. Call (808) 215-5006.",
    dimensions: "18' L × 8' W × 6' H",
    weight: "5 tons included",
    tonnageIncluded: "5 tons",
    capacity: "Equivalent to 12 pickup truck loads",
    priceRange: "Starting at $950",
    rentalPeriod: "Flexible rental periods",
    bestFor: "Commercial projects",
    idealFor: [
      "Major commercial construction",
      "Large-scale demolition",
      "Industrial cleanouts",
      "Multi-unit property cleanouts",
    ],
    description: "Our largest dumpster is built for the biggest jobs. With an 18-foot length, 6-foot walls, and 5 tons of included weight, the 30 yard handles major commercial construction, large-scale demolition, and industrial cleanouts.",
    items: ["High-volume construction waste", "Demolition debris", "Industrial materials", "Commercial cleanout waste", "Bulk recyclables", "Heavy materials"],
    prohibitedItems: ["Tires", "Paint", "Pesticides", "Gasoline", "Motor oil"],
    faqs: [
      { question: "When would I need a 30 yard dumpster?", answer: "A 30 yard dumpster is ideal for commercial construction, large demolition projects, and clearing multi-unit properties." },
      { question: "Can this be placed on residential property?", answer: "Yes, if you have adequate space. You'll need a flat surface and about 60 feet of clearance for delivery." },
      { question: "How is this delivered?", answer: "We deliver using a roll-off truck. You'll need about 60 feet of clearance for delivery and pickup." },
    ],
  },
];

export function getDumpsterBySlug(slug: string): DumpsterSize | undefined {
  return dumpsterSizes.find((d) => d.slug === slug);
}

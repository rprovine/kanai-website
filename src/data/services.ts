export interface ServiceItem {
  name: string;
  items?: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  metaDescription: string;
  heroImage: string;
  intro: string;
  items: ServiceItem[];
  benefits: string[];
  process: string[];
  faqs: FAQ[];
  relatedSlugs: string[];
}

export const services: Service[] = [
  {
    slug: "junk-removal",
    title: "Junk Removal Services",
    shortTitle: "Junk Removal",
    description: "Full-service junk removal for homes and businesses across Oahu.",
    metaDescription: "Professional junk removal services in Oahu, Hawaii. We haul away furniture, appliances, yard waste & more. Call Kana'i's Junk Removal at (808) 215-5006.",
    heroImage: "/images/services/junk-removal.jpg",
    intro: "Whether you're decluttering your home, clearing out a garage, or cleaning up after a renovation, our team handles all the heavy lifting. We remove virtually anything non-hazardous — furniture, appliances, electronics, yard waste, and more.",
    items: [
      { name: "Furniture", items: ["Couches", "Tables", "Chairs", "Desks", "Dressers", "Bed frames"] },
      { name: "Appliances", items: ["Refrigerators", "Washers", "Dryers", "Stoves", "Dishwashers"] },
      { name: "Electronics", items: ["TVs", "Computers", "Printers", "Monitors"] },
      { name: "Yard Waste", items: ["Branches", "Leaves", "Soil", "Green waste"] },
      { name: "Miscellaneous", items: ["Boxes", "Clothing", "Toys", "Sporting goods"] },
    ],
    benefits: [
      "Same-day and next-day service available",
      "Upfront, transparent pricing — no hidden fees",
      "Eco-friendly disposal with recycling and donation partnerships",
      "Fully licensed and insured team",
      "We do all the heavy lifting",
    ],
    process: [
      "Book your free estimate online or call us",
      "Our crew arrives at your scheduled time",
      "Point to what goes — we load and haul it away",
      "We sweep up and dispose responsibly",
    ],
    faqs: [
      { question: "How much does junk removal cost?", answer: "Pricing depends on the volume and type of items. We offer free estimates so you know the cost upfront before we start." },
      { question: "Do you recycle?", answer: "Yes! We partner with local recycling centers and donation organizations to divert as much as possible from landfills." },
      { question: "How fast can you come?", answer: "We offer same-day and next-day service for most areas on Oahu." },
      { question: "What can't you take?", answer: "We cannot remove hazardous materials like chemicals, paint, asbestos, or biological waste. Contact us if you're unsure about a specific item." },
    ],
    relatedSlugs: ["furniture-removal", "appliance-removal", "garage-cleanout"],
  },
  {
    slug: "furniture-removal",
    title: "Furniture Removal Services",
    shortTitle: "Furniture Removal",
    description: "Fast, affordable furniture removal and disposal across Oahu.",
    metaDescription: "Need old furniture removed? Kana'i's Junk Removal picks up couches, tables, mattresses & more across Oahu. Free estimates. Call (808) 215-5006.",
    heroImage: "/images/services/furniture-removal.jpg",
    intro: "Getting rid of old, bulky furniture is a hassle. Our team makes it easy — we'll carry out your unwanted couches, tables, mattresses, dressers, and more. No need to move anything yourself.",
    items: [
      { name: "Living Room", items: ["Sofas", "Loveseats", "Recliners", "Coffee tables", "Entertainment centers"] },
      { name: "Bedroom", items: ["Mattresses", "Box springs", "Bed frames", "Dressers", "Nightstands"] },
      { name: "Dining Room", items: ["Dining tables", "Chairs", "Hutches", "Buffets"] },
      { name: "Office", items: ["Desks", "Office chairs", "Filing cabinets", "Bookshelves"] },
    ],
    benefits: [
      "We carry furniture from any room or floor",
      "Careful removal — no damage to your walls or floors",
      "Donation of usable furniture to local charities",
      "Same-day pickup available",
      "Transparent flat-rate pricing",
    ],
    process: [
      "Schedule a free estimate",
      "Our team arrives and assesses the furniture",
      "We carefully remove items from your home",
      "Furniture is donated, recycled, or disposed responsibly",
    ],
    faqs: [
      { question: "Can you remove furniture from upstairs?", answer: "Absolutely! Our team handles furniture from any room or floor, including tight staircases and narrow hallways." },
      { question: "Do you donate usable furniture?", answer: "Yes, we partner with local charities and donation centers to give usable furniture a second life." },
      { question: "How much does furniture removal cost?", answer: "Cost depends on the number and size of pieces. We offer free on-site estimates with no obligation." },
    ],
    relatedSlugs: ["junk-removal", "appliance-removal", "estate-cleanout"],
  },
  {
    slug: "appliance-removal",
    title: "Appliance Removal Services",
    shortTitle: "Appliance Removal",
    description: "Safe, eco-friendly appliance removal and recycling on Oahu.",
    metaDescription: "Professional appliance removal in Oahu. We haul away refrigerators, washers, dryers, stoves & more. Eco-friendly recycling. Call (808) 215-5006.",
    heroImage: "/images/services/appliance-removal.jpg",
    intro: "Old appliances are heavy and difficult to move. Our team safely disconnects, removes, and responsibly recycles your old refrigerators, washers, dryers, stoves, and more.",
    items: [
      { name: "Kitchen", items: ["Refrigerators", "Stoves/Ovens", "Dishwashers", "Microwaves", "Freezers"] },
      { name: "Laundry", items: ["Washers", "Dryers", "Washer/dryer combos"] },
      { name: "Climate", items: ["Water heaters", "AC units", "Space heaters"] },
      { name: "Other", items: ["Dehumidifiers", "Trash compactors", "Wine coolers"] },
    ],
    benefits: [
      "Safe disconnection and removal",
      "Responsible recycling of metals and components",
      "Freon handled according to EPA regulations",
      "No damage to your home during removal",
      "Available 7 days a week",
    ],
    process: [
      "Book online or call for a free estimate",
      "We safely disconnect the appliance",
      "Our team carries it out carefully",
      "Appliances are recycled at certified facilities",
    ],
    faqs: [
      { question: "Do you disconnect appliances?", answer: "We disconnect standard appliance connections. For hardwired or gas appliances, we recommend having a licensed professional disconnect them first." },
      { question: "Is appliance recycling included?", answer: "Yes, we recycle all appliances at certified facilities at no extra charge." },
      { question: "Can you remove a built-in appliance?", answer: "In most cases, yes. Contact us to discuss your specific situation." },
    ],
    relatedSlugs: ["junk-removal", "furniture-removal", "commercial-junk-removal"],
  },
  {
    slug: "garage-cleanout",
    title: "Garage Cleanout Services",
    shortTitle: "Garage Cleanout",
    description: "Complete garage cleanout services — we clear everything out.",
    metaDescription: "Garage overflowing? Kana'i's Junk Removal provides complete garage cleanout services on Oahu. Fast, affordable, eco-friendly. Call (808) 215-5006.",
    heroImage: "/images/services/garage-cleanout.jpg",
    intro: "Reclaim your garage with our complete cleanout service. Whether it's packed with years of accumulated items or you need a fresh start, we handle everything from start to finish.",
    items: [
      { name: "Common Items", items: ["Old tools", "Sporting equipment", "Holiday decorations", "Boxes and bins", "Unused furniture"] },
      { name: "Bulky Items", items: ["Workbenches", "Shelving units", "Exercise equipment", "Lawn mowers"] },
      { name: "Debris", items: ["Scrap wood", "Old paint cans", "Broken items", "Cardboard"] },
    ],
    benefits: [
      "Complete cleanout in one visit",
      "Sort, donate, recycle, and dispose all handled",
      "Reclaim your parking space",
      "Sweep-clean finish when we're done",
      "Flexible scheduling to fit your needs",
    ],
    process: [
      "Schedule your free garage assessment",
      "We arrive and sort through everything",
      "Items are loaded onto our truck",
      "Your garage is swept clean and ready to use",
    ],
    faqs: [
      { question: "How long does a garage cleanout take?", answer: "Most single-car garages take 1-2 hours. Larger or heavily packed garages may take 2-4 hours." },
      { question: "Do I need to sort items beforehand?", answer: "No! We can sort through everything with you on-site, or you can pre-sort if you prefer." },
      { question: "Can you clean out a storage unit too?", answer: "Yes! We handle storage unit cleanouts the same way. Contact us for a quote." },
    ],
    relatedSlugs: ["junk-removal", "estate-cleanout", "foreclosure-cleanout"],
  },
  {
    slug: "estate-cleanout",
    title: "Estate Cleanout Services",
    shortTitle: "Estate Cleanout",
    description: "Compassionate, thorough estate cleanout services on Oahu.",
    metaDescription: "Sensitive estate cleanout services in Oahu. Kana'i's Junk Removal handles full property cleanouts with care and respect. Call (808) 215-5006.",
    heroImage: "/images/services/estate-cleanout.jpg",
    intro: "Cleaning out an estate is emotionally and physically overwhelming. Our team handles the process with sensitivity and respect, clearing out entire properties efficiently while ensuring valuables are preserved.",
    items: [
      { name: "Furniture & Furnishings", items: ["All household furniture", "Rugs and curtains", "Artwork and decorations"] },
      { name: "Personal Items", items: ["Clothing", "Books", "Kitchen items", "Personal effects"] },
      { name: "Outdoor", items: ["Patio furniture", "Garden equipment", "Sheds and structures"] },
    ],
    benefits: [
      "Compassionate, respectful service",
      "Full property cleanout in as little as one day",
      "Donation coordination for usable items",
      "Work with families, attorneys, and property managers",
      "Broom-clean condition when complete",
    ],
    process: [
      "Free walk-through and estimate",
      "Set aside any items you want to keep",
      "We remove everything else efficiently",
      "Property left broom-clean and ready",
    ],
    faqs: [
      { question: "How soon can you start?", answer: "We can typically begin within 24-48 hours of your request, depending on the scope." },
      { question: "Do you work with attorneys and realtors?", answer: "Yes, we regularly work with estate attorneys, realtors, and property managers." },
      { question: "Can you handle a full house cleanout?", answer: "Absolutely. We can clear an entire home from top to bottom, including the garage and yard." },
    ],
    relatedSlugs: ["garage-cleanout", "foreclosure-cleanout", "junk-removal"],
  },
  {
    slug: "foreclosure-cleanout",
    title: "Foreclosure Cleanout Services",
    shortTitle: "Foreclosure Cleanout",
    description: "Fast foreclosure and eviction cleanout services for property managers.",
    metaDescription: "Foreclosure cleanout services in Oahu. Fast, thorough property cleanouts for banks, realtors & property managers. Call (808) 215-5006.",
    heroImage: "/images/services/foreclosure-cleanout.jpg",
    intro: "Banks, property managers, and realtors trust us to quickly clean out foreclosed and vacated properties. We handle everything from furniture and appliances to trash and debris, leaving properties ready to list.",
    items: [
      { name: "Interior", items: ["All abandoned furniture", "Appliances", "Trash and debris", "Personal belongings"] },
      { name: "Exterior", items: ["Yard waste", "Outdoor furniture", "Debris and junk"] },
    ],
    benefits: [
      "Fast turnaround for time-sensitive properties",
      "Experience with bank and REO requirements",
      "Full interior and exterior cleanout",
      "Photo documentation available",
      "Volume discounts for property managers",
    ],
    process: [
      "Property assessment and quote",
      "Scheduled cleanout on your timeline",
      "Complete interior and exterior clearing",
      "Property left broom-clean and market-ready",
    ],
    faqs: [
      { question: "How fast can you clean out a foreclosure?", answer: "Most properties can be cleared within 1-2 days, depending on size and condition." },
      { question: "Do you provide before/after photos?", answer: "Yes, we document the property before and after for your records." },
      { question: "Do you offer recurring service for property managers?", answer: "Yes, we work with property management companies on an ongoing basis with preferred pricing." },
    ],
    relatedSlugs: ["estate-cleanout", "commercial-junk-removal", "construction-debris-removal"],
  },
  {
    slug: "commercial-junk-removal",
    title: "Commercial Junk Removal",
    shortTitle: "Commercial",
    description: "Commercial junk removal for offices, retail, warehouses, and more.",
    metaDescription: "Commercial junk removal on Oahu. Office cleanouts, retail fixtures, warehouse clearing & more. Licensed & insured. Call (808) 215-5006.",
    heroImage: "/images/services/commercial-junk-removal.jpg",
    intro: "From office cleanouts to warehouse clearing, we provide reliable commercial junk removal services. Our team works around your business schedule to minimize disruption.",
    items: [
      { name: "Office", items: ["Desks and cubicles", "Office chairs", "Filing cabinets", "Electronics", "Paper/documents"] },
      { name: "Retail", items: ["Display fixtures", "Shelving", "Signage", "Inventory"] },
      { name: "Warehouse", items: ["Pallets", "Racking", "Equipment", "Bulk materials"] },
    ],
    benefits: [
      "After-hours and weekend service available",
      "Minimal disruption to your business",
      "Secure document destruction available",
      "Large-scale capacity for big jobs",
      "Recurring service contracts available",
    ],
    process: [
      "Free on-site commercial assessment",
      "Custom quote based on scope and timeline",
      "Scheduled removal around your operations",
      "Clean, professional service every time",
    ],
    faqs: [
      { question: "Can you work after business hours?", answer: "Yes! We offer evening and weekend scheduling to minimize disruption to your operations." },
      { question: "Do you handle confidential documents?", answer: "We can coordinate secure document destruction through our certified shredding partners." },
      { question: "Can you handle large commercial cleanouts?", answer: "Absolutely. We have the equipment and crew to handle any size commercial job." },
    ],
    relatedSlugs: ["office-cleanout", "construction-debris-removal", "junk-removal"],
  },
  {
    slug: "office-cleanout",
    title: "Office Cleanout Services",
    shortTitle: "Office Cleanout",
    description: "Complete office cleanout and furniture removal services.",
    metaDescription: "Office cleanout services on Oahu. We remove desks, chairs, cubicles, electronics & more. Fast, professional service. Call (808) 215-5006.",
    heroImage: "/images/services/office-cleanout.jpg",
    intro: "Moving offices, downsizing, or closing a location? We handle complete office cleanouts — removing desks, chairs, cubicles, electronics, files, and more. We work on your schedule and leave your space ready for the next tenant.",
    items: [
      { name: "Furniture", items: ["Desks", "Cubicle systems", "Conference tables", "Chairs", "Reception furniture"] },
      { name: "Equipment", items: ["Copiers", "Printers", "Servers", "Phone systems"] },
      { name: "Supplies", items: ["Filing cabinets", "Bookshelves", "Storage units", "Whiteboards"] },
    ],
    benefits: [
      "Full office clearance in one visit",
      "Electronics recycled responsibly",
      "Work after hours to avoid disruption",
      "Coordinate with building management",
      "Space left broom-clean and move-in ready",
    ],
    process: [
      "Walk-through and free estimate",
      "Schedule around your business needs",
      "Complete removal of all items",
      "Space cleaned and ready for turnover",
    ],
    faqs: [
      { question: "Can you remove cubicle systems?", answer: "Yes, our team is experienced in disassembling and removing cubicle partition systems." },
      { question: "Do you recycle office electronics?", answer: "Yes, all electronics are recycled through certified e-waste facilities." },
    ],
    relatedSlugs: ["commercial-junk-removal", "furniture-removal", "appliance-removal"],
  },
  {
    slug: "construction-debris-removal",
    title: "Construction Debris Removal",
    shortTitle: "Construction Debris",
    description: "Construction and renovation debris hauling for contractors and homeowners.",
    metaDescription: "Construction debris removal on Oahu. We haul lumber, drywall, concrete, roofing & more. Contractor-friendly service. Call (808) 215-5006.",
    heroImage: "/images/services/construction-debris.jpg",
    intro: "Keep your job site clean and safe. We remove construction and renovation debris including lumber, drywall, concrete, roofing materials, and more. Trusted by contractors across Oahu.",
    items: [
      { name: "Materials", items: ["Lumber and wood", "Drywall and sheetrock", "Concrete and masonry", "Roofing materials", "Flooring"] },
      { name: "Fixtures", items: ["Cabinets", "Countertops", "Windows", "Doors", "Plumbing fixtures"] },
      { name: "Metals", items: ["Rebar", "Piping", "Ductwork", "Structural steel"] },
    ],
    benefits: [
      "Keeps job sites clean and OSHA-compliant",
      "On-demand or scheduled pickups",
      "Handle debris from any phase of construction",
      "Materials recycled when possible",
      "Contractor accounts with preferred pricing",
    ],
    process: [
      "Call or book online for a job site quote",
      "We arrive with the right-sized truck",
      "Debris is loaded and hauled away",
      "Proper disposal and recycling of all materials",
    ],
    faqs: [
      { question: "Can you do recurring pickups during a project?", answer: "Yes! We offer scheduled recurring service throughout your construction project." },
      { question: "Do you remove concrete and masonry?", answer: "Yes, we handle heavy materials including concrete, brick, and stone." },
      { question: "Can you fit in tight job sites?", answer: "Our various truck sizes allow us to access most job sites, including residential neighborhoods." },
    ],
    relatedSlugs: ["commercial-junk-removal", "dumpster-rentals", "yard-waste-removal"],
  },
  {
    slug: "yard-waste-removal",
    title: "Yard Waste Removal Services",
    shortTitle: "Yard Waste",
    description: "Green waste, branches, soil, and yard debris removal on Oahu.",
    metaDescription: "Yard waste removal in Oahu. We haul branches, leaves, soil, grass clippings & more. Fast, eco-friendly service. Call (808) 215-5006.",
    heroImage: "/images/services/yard-waste.jpg",
    intro: "After a storm, landscaping project, or seasonal cleanup, let us handle the yard waste. We remove branches, leaves, soil, grass clippings, and other green waste quickly and responsibly.",
    items: [
      { name: "Green Waste", items: ["Branches and limbs", "Leaves and grass clippings", "Shrubs and bushes", "Palm fronds"] },
      { name: "Soil & Stone", items: ["Dirt and topsoil", "Gravel", "Sand", "Rocks and boulders"] },
      { name: "Other", items: ["Fallen trees", "Stumps", "Fencing", "Landscape timbers"] },
    ],
    benefits: [
      "Green waste composted when possible",
      "Handle any volume — small or large",
      "Storm cleanup available on short notice",
      "No pile too big or too messy",
      "Clean up included after hauling",
    ],
    process: [
      "Book online or call for a free quote",
      "We assess the scope on arrival",
      "Yard waste is loaded and hauled away",
      "Your yard is left clean and clear",
    ],
    faqs: [
      { question: "Do you compost yard waste?", answer: "Yes, we deliver green waste to composting facilities whenever possible." },
      { question: "Can you handle storm damage cleanup?", answer: "Absolutely. We offer emergency storm cleanup on short notice." },
      { question: "Do you remove tree stumps?", answer: "We can remove above-ground stumps and roots. For deep stump grinding, we can refer you to a specialist." },
    ],
    relatedSlugs: ["junk-removal", "construction-debris-removal", "hot-tub-removal"],
  },
  {
    slug: "hot-tub-removal",
    title: "Hot Tub & Spa Removal",
    shortTitle: "Hot Tub Removal",
    description: "Professional hot tub and spa demolition and removal.",
    metaDescription: "Hot tub removal in Oahu. We demolish and haul away old hot tubs and spas. Safe, fast, affordable. Call (808) 215-5006.",
    heroImage: "/images/services/hot-tub-removal.jpg",
    intro: "Old hot tub taking up space? We dismantle and remove hot tubs and spas of all sizes. Our team handles the entire process — disconnection, demolition, hauling, and cleanup.",
    items: [
      { name: "Types We Remove", items: ["Acrylic hot tubs", "Wooden hot tubs", "Portable spas", "In-ground spas", "Swim spas"] },
    ],
    benefits: [
      "Complete demolition and removal",
      "Safe disconnection from electrical and plumbing",
      "Area cleaned and leveled after removal",
      "Materials recycled when possible",
      "No damage to surrounding landscaping",
    ],
    process: [
      "Free on-site assessment",
      "Disconnection from utilities",
      "Demolition and breaking down of the tub",
      "Complete hauling and area cleanup",
    ],
    faqs: [
      { question: "How long does hot tub removal take?", answer: "Most hot tub removals are completed in 2-4 hours." },
      { question: "Do you disconnect the hot tub?", answer: "We handle standard disconnections. Hardwired electrical should be disconnected by a licensed electrician beforehand." },
      { question: "Can you remove an in-ground spa?", answer: "Yes, we can remove in-ground spas. Contact us for an assessment as these require more time." },
    ],
    relatedSlugs: ["junk-removal", "yard-waste-removal", "demolition-services"],
  },
  {
    slug: "demolition-services",
    title: "Light Demolition Services",
    shortTitle: "Demolition",
    description: "Light demolition and teardown services for interior and exterior projects.",
    metaDescription: "Light demolition services on Oahu. Deck removal, shed teardown, interior demo & more. Call Kana'i's Junk Removal at (808) 215-5006.",
    heroImage: "/images/services/demolition.jpg",
    intro: "Need something torn down? From decks and sheds to interior walls and fixtures, our light demolition services handle teardown, hauling, and cleanup in one visit.",
    items: [
      { name: "Exterior", items: ["Decks and patios", "Sheds and outbuildings", "Fencing", "Playgrounds", "Gazebos"] },
      { name: "Interior", items: ["Non-load-bearing walls", "Cabinets", "Flooring", "Tile and backsplash"] },
    ],
    benefits: [
      "Demo and haul-away in one visit",
      "Careful work to protect surrounding structures",
      "Debris removed and area cleaned",
      "Experienced crew with proper tools",
      "Free estimates on all demo projects",
    ],
    process: [
      "On-site assessment and free quote",
      "Careful demolition with proper equipment",
      "All debris loaded and hauled away",
      "Site left clean and ready for your next project",
    ],
    faqs: [
      { question: "What is 'light demolition'?", answer: "Light demolition includes non-structural teardowns like decks, sheds, fences, interior fixtures, and similar projects that don't require heavy machinery." },
      { question: "Do you handle permits?", answer: "Most light demo doesn't require permits, but we'll advise if your project might need one." },
    ],
    relatedSlugs: ["construction-debris-removal", "hot-tub-removal", "commercial-junk-removal"],
  },
  {
    slug: "mattress-removal",
    title: "Mattress Removal & Disposal",
    shortTitle: "Mattress Removal",
    description: "Fast mattress and box spring removal and recycling.",
    metaDescription: "Mattress removal in Oahu. We pick up and recycle mattresses, box springs & bed frames. Same-day service. Call (808) 215-5006.",
    heroImage: "/images/services/mattress-removal.jpg",
    intro: "Old mattresses are bulky and difficult to dispose of. We pick up mattresses, box springs, and bed frames from any room in your home and recycle them whenever possible.",
    items: [
      { name: "Mattress Types", items: ["Twin", "Full", "Queen", "King", "California King", "Pillow-top", "Memory foam"] },
      { name: "Related Items", items: ["Box springs", "Bed frames", "Adjustable bases", "Futons", "Crib mattresses"] },
    ],
    benefits: [
      "Pickup from any room, any floor",
      "Mattresses recycled — not landfilled",
      "Same-day and next-day service",
      "Multiple mattress discount",
      "Quick, clean removal",
    ],
    process: [
      "Schedule your pickup online or by phone",
      "We arrive and remove from any room",
      "Mattresses transported for recycling",
      "Quick, clean service — in and out",
    ],
    faqs: [
      { question: "Can you take a mattress from upstairs?", answer: "Yes! We remove mattresses from any room or floor in your home." },
      { question: "Are mattresses recyclable?", answer: "Yes, most mattress components (steel springs, foam, fabric, wood) can be recycled." },
    ],
    relatedSlugs: ["furniture-removal", "junk-removal", "appliance-removal"],
  },
  {
    slug: "tv-electronics-recycling",
    title: "TV & Electronics Recycling",
    shortTitle: "Electronics Recycling",
    description: "Responsible TV and electronics recycling and disposal on Oahu.",
    metaDescription: "TV & electronics recycling in Oahu. We pick up and responsibly recycle TVs, computers, monitors & more. Call (808) 215-5006.",
    heroImage: "/images/services/electronics-recycling.jpg",
    intro: "Old TVs and electronics contain hazardous materials that shouldn't end up in landfills. We pick up and responsibly recycle all types of electronics through certified e-waste facilities.",
    items: [
      { name: "TVs & Monitors", items: ["Flat screen TVs", "CRT TVs", "Computer monitors", "Projectors"] },
      { name: "Computers", items: ["Desktops", "Laptops", "Servers", "Tablets"] },
      { name: "Other Electronics", items: ["Printers", "Scanners", "Stereos", "Gaming consoles", "Phones"] },
    ],
    benefits: [
      "Certified e-waste recycling",
      "Data destruction available",
      "Pickup from home or office",
      "All electronics accepted",
      "Environmentally responsible processing",
    ],
    process: [
      "Schedule your electronics pickup",
      "We collect all items from your location",
      "Electronics delivered to certified recyclers",
      "Recycling certificate available upon request",
    ],
    faqs: [
      { question: "Do you wipe data from devices?", answer: "We can arrange certified data destruction. For sensitive data, we recommend wiping drives yourself before pickup." },
      { question: "Can you take CRT TVs?", answer: "Yes, we accept CRT TVs and monitors, which require special recycling due to lead content." },
    ],
    relatedSlugs: ["appliance-removal", "office-cleanout", "junk-removal"],
  },
  {
    slug: "refrigerator-removal",
    title: "Refrigerator Removal & Disposal",
    shortTitle: "Refrigerator Removal",
    description: "Safe refrigerator and freezer removal with proper Freon disposal.",
    metaDescription: "Refrigerator removal in Oahu. EPA-compliant Freon disposal, eco-friendly recycling. Fast pickup. Call (808) 215-5006.",
    heroImage: "/images/services/refrigerator-removal.jpg",
    intro: "Refrigerators require special handling due to refrigerant gases. Our team safely removes and recycles old refrigerators and freezers with full EPA compliance.",
    items: [
      { name: "Refrigeration Units", items: ["Top-freezer refrigerators", "Bottom-freezer refrigerators", "Side-by-side", "French door", "Stand-alone freezers", "Mini fridges", "Wine coolers"] },
    ],
    benefits: [
      "EPA-compliant Freon recovery",
      "Safe removal from any location",
      "Steel and components recycled",
      "Same-day service available",
      "Free estimates",
    ],
    process: [
      "Schedule your free estimate",
      "We disconnect and carefully remove the unit",
      "Refrigerant recovered per EPA guidelines",
      "Unit recycled at certified facility",
    ],
    faqs: [
      { question: "Why can't I just put a fridge on the curb?", answer: "Refrigerators contain Freon and other refrigerants that are harmful to the environment and must be properly recovered before disposal." },
      { question: "Do you remove built-in refrigerators?", answer: "Yes, we can handle built-in and counter-depth refrigerator removal." },
    ],
    relatedSlugs: ["appliance-removal", "junk-removal", "commercial-junk-removal"],
  },
  {
    slug: "washer-dryer-removal",
    title: "Washer & Dryer Removal",
    shortTitle: "Washer & Dryer",
    description: "Professional washer and dryer removal and recycling.",
    metaDescription: "Washer & dryer removal on Oahu. We disconnect, remove, and recycle old laundry machines. Fast, affordable service. Call (808) 215-5006.",
    heroImage: "/images/services/washer-dryer.jpg",
    intro: "Upgrading your laundry appliances? We'll remove your old washer and dryer safely and efficiently. Our team disconnects, hauls, and recycles — no effort on your part.",
    items: [
      { name: "Laundry Appliances", items: ["Top-load washers", "Front-load washers", "Stackable units", "Gas dryers", "Electric dryers", "Washer/dryer combos"] },
    ],
    benefits: [
      "Standard disconnection included",
      "Careful removal to prevent water damage",
      "Stackable units handled safely",
      "Recycled at certified facilities",
      "Same-day service available",
    ],
    process: [
      "Book your removal online or by phone",
      "We disconnect water and power lines",
      "Machines carefully removed from your home",
      "Old units recycled responsibly",
    ],
    faqs: [
      { question: "Do you disconnect gas dryers?", answer: "For safety, we recommend having a licensed plumber disconnect gas lines before our arrival." },
      { question: "Can you remove stackable units?", answer: "Yes, our team is experienced in safely separating and removing stackable washer/dryer units." },
    ],
    relatedSlugs: ["appliance-removal", "junk-removal", "furniture-removal"],
  },
  {
    slug: "storage-unit-cleanout",
    title: "Storage Unit Cleanout Services",
    shortTitle: "Storage Cleanout",
    description: "Fast, complete storage unit cleanout and junk removal.",
    metaDescription: "Storage unit cleanout on Oahu. We clear out storage units of all sizes quickly and affordably. Call (808) 215-5006.",
    heroImage: "/images/services/storage-cleanout.jpg",
    intro: "Stop paying monthly rent on a storage unit full of stuff you don't need. We'll empty it out completely, sort through items, and donate or recycle what we can.",
    items: [
      { name: "Common Storage Items", items: ["Furniture", "Boxes and bins", "Appliances", "Sports equipment", "Seasonal items", "Business inventory"] },
    ],
    benefits: [
      "Complete cleanout in one visit",
      "Stop paying monthly storage fees",
      "We sort, donate, and recycle",
      "Any size unit — 5x5 to 10x30+",
      "Coordination with storage facilities",
    ],
    process: [
      "Contact us with unit size and details",
      "We provide a free estimate",
      "Our team clears the entire unit",
      "Unit left empty and broom-clean",
    ],
    faqs: [
      { question: "Do I need to be present?", answer: "You'll need to provide access to the unit, but you don't need to stay for the entire cleanout." },
      { question: "Can you clean out multiple units?", answer: "Yes, we can handle multiple units in one visit with volume discounts available." },
    ],
    relatedSlugs: ["garage-cleanout", "estate-cleanout", "junk-removal"],
  },
  {
    slug: "property-cleanout",
    title: "Full Property Cleanout Services",
    shortTitle: "Property Cleanout",
    description: "Complete property cleanout — every room, garage, and yard cleared.",
    metaDescription: "Full property cleanout on Oahu. We clear entire homes and properties for moves, sales, and estates. Call (808) 215-5006.",
    heroImage: "/images/services/property-cleanout.jpg",
    intro: "Whether you're selling a property, preparing for new tenants, or managing an estate, our full property cleanout service handles everything. Every room, the garage, yard, and any outbuildings — we clear it all.",
    items: [
      { name: "Interior", items: ["All rooms cleared", "Furniture removed", "Appliances hauled", "Closets emptied", "Attics and crawlspaces"] },
      { name: "Exterior", items: ["Garage cleanout", "Yard waste removal", "Shed clearing", "Outdoor furniture", "Debris removal"] },
    ],
    benefits: [
      "One crew handles the entire property",
      "Ready for sale, rental, or renovation",
      "Donate-first approach for usable items",
      "Work with realtors and property managers",
      "Broom-clean finish guaranteed",
    ],
    process: [
      "Walk-through and free whole-property estimate",
      "Set aside anything you want to keep",
      "We clear every space systematically",
      "Property left move-in ready",
    ],
    faqs: [
      { question: "How long does a full property cleanout take?", answer: "Depending on the size and condition, most properties take 1-3 days to fully clear." },
      { question: "Do you work with realtors?", answer: "Yes, we work regularly with realtors to prepare properties for listing and open houses." },
    ],
    relatedSlugs: ["estate-cleanout", "foreclosure-cleanout", "garage-cleanout"],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getRelatedServices(slugs: string[]): Service[] {
  return slugs.map((slug) => services.find((s) => s.slug === slug)).filter(Boolean) as Service[];
}

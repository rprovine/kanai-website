export interface Neighborhood {
  slug: string;
  name: string;
  description: string;
  lat: number;
  lng: number;
}

export const NEIGHBORHOODS: Neighborhood[] = [
  {
    slug: "kapolei",
    name: "Kapolei",
    description: "Serving West Oahu's second city. From new developments near Ka Makana Ali'i to established neighborhoods, we handle furniture removal, construction debris, and estate cleanouts across the Kapolei area.",
    lat: 21.3397, lng: -158.0589,
  },
  {
    slug: "ewa-beach",
    name: "Ewa Beach",
    description: "Covering all of Ewa Beach and Ocean Pointe. Whether you're clearing out a garage in Ewa Gentry or hauling away renovation debris from a Hoakalei home, our crew is ready to help.",
    lat: 21.3156, lng: -158.0072,
  },
  {
    slug: "pearl-city",
    name: "Pearl City",
    description: "Fast response times to Pearl City and the surrounding neighborhoods. From Pearl Highlands condos to single-family homes along Waimano Home Road, we've hauled it all.",
    lat: 21.3972, lng: -157.9731,
  },
  {
    slug: "aiea",
    name: "Aiea",
    description: "Serving the Aiea community from our home base. Whether you're clearing out a Pearl Ridge area condo or hauling construction debris from a Newtown renovation, we're just minutes away.",
    lat: 21.3867, lng: -157.9331,
  },
  {
    slug: "mililani",
    name: "Mililani",
    description: "Regular service to Mililani Town and Mililani Mauka. We know the community's HOA requirements and handle everything from household junk to yard waste and appliance removal.",
    lat: 21.4514, lng: -158.0147,
  },
  {
    slug: "kailua",
    name: "Kailua",
    description: "Serving the Windward side's largest town. From beachside bungalows near Lanikai to homes in Enchanted Lake, we provide fast, reliable junk removal and dumpster delivery.",
    lat: 21.4022, lng: -157.7394,
  },
  {
    slug: "kaneohe",
    name: "Kaneohe",
    description: "Covering all of Kaneohe from Haiku Valley to Ahuimanu. We navigate the Windward roads daily and handle everything from estate cleanouts to construction debris hauling.",
    lat: 21.4181, lng: -157.8036,
  },
  {
    slug: "waipahu",
    name: "Waipahu",
    description: "Dependable junk removal in Waipahu and Waikele. From old plantation-era homes to modern townhouses, we haul away furniture, appliances, yard waste, and construction materials.",
    lat: 21.3867, lng: -158.0092,
  },
  {
    slug: "hawaii-kai",
    name: "Hawaii Kai",
    description: "Serving the East Honolulu community of Hawaii Kai. From marina-area condos to hillside homes in Kalama Valley, we provide reliable junk removal with stunning Ko'olau views on the drive out.",
    lat: 21.2903, lng: -157.7114,
  },
  {
    slug: "makakilo",
    name: "Makakilo",
    description: "Handling junk removal for the Makakilo hillside community. We're equipped for steep driveways and tight access — furniture, appliances, hot tubs, and full cleanouts.",
    lat: 21.3533, lng: -158.0856,
  },
  {
    slug: "halawa",
    name: "Halawa",
    description: "Quick service to Halawa and the Stadium area. Close to our base in Aiea, we can often provide same-day junk removal for Halawa Heights and the surrounding neighborhoods.",
    lat: 21.3750, lng: -157.9167,
  },
  {
    slug: "moanalua",
    name: "Moanalua",
    description: "Serving Moanalua Gardens, Moanalua Valley, and Fort Shafter housing. We handle military PCS cleanouts, residential junk removal, and construction debris hauling.",
    lat: 21.3628, lng: -157.9003,
  },
  {
    slug: "salt-lake",
    name: "Salt Lake",
    description: "Regular junk removal runs through Salt Lake and Aliamanu. From high-rise condos to military housing, we have the equipment and experience to handle any job in the area.",
    lat: 21.3569, lng: -157.9200,
  },
  {
    slug: "honolulu",
    name: "Honolulu",
    description: "Serving the heart of the city from Downtown to Ala Moana. We navigate urban access challenges daily — condo loading docks, narrow parking, elevator moves — and get the job done right.",
    lat: 21.3069, lng: -157.8583,
  },
  {
    slug: "manoa",
    name: "Manoa",
    description: "Junk removal in the lush Manoa Valley. From UH student move-outs to family home cleanouts near Manoa Falls, we handle the valley's unique terrain and access with care.",
    lat: 21.3150, lng: -157.8028,
  },
  {
    slug: "kaimuki",
    name: "Kaimuki",
    description: "Reliable service in Kaimuki and Palolo. We know the older homes and tight streets of this neighborhood well — furniture removal, appliance hauling, and garage cleanouts are our specialty here.",
    lat: 21.2847, lng: -157.8153,
  },
  {
    slug: "kahala",
    name: "Kahala",
    description: "Premium junk removal service for the Kahala community. We handle estate cleanouts, renovation debris, and large-item removal with the care and professionalism this neighborhood expects.",
    lat: 21.2756, lng: -157.7864,
  },
  {
    slug: "waikele",
    name: "Waikele",
    description: "Serving the Waikele community and nearby neighborhoods. From townhome cleanouts to construction debris from home renovations, we provide fast turnaround and fair pricing.",
    lat: 21.3906, lng: -158.0031,
  },
  {
    slug: "waipio",
    name: "Waipio",
    description: "Junk removal and dumpster rental in Waipio Gentry and Waipio Acres. We handle residential cleanouts, yard waste removal, and renovation debris for this growing community.",
    lat: 21.4133, lng: -158.0092,
  },
  {
    slug: "wahiawa",
    name: "Wahiawa",
    description: "Serving central Oahu's Wahiawa community. From Schofield Barracks PCS cleanouts to residential junk removal near Wahiawa Town, we make the drive up and get it done.",
    lat: 21.5028, lng: -158.0236,
  },
];

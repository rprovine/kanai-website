export interface Location {
  slug: string;
  name: string;
  county: string;
  region: string;
  zipCodes: string[];
  description: string;
  nearbyLocations: string[];
}

export const locations: Location[] = [
  // Honolulu Metro
  { slug: "honolulu", name: "Honolulu", county: "Honolulu", region: "Metro Honolulu", zipCodes: ["96813", "96814", "96815", "96816", "96817", "96826"], description: "Serving downtown Honolulu and surrounding neighborhoods with fast, reliable junk removal and dumpster rental services.", nearbyLocations: ["waikiki", "ala-moana", "kakaako", "makiki"] },
  { slug: "waikiki", name: "Waikiki", county: "Honolulu", region: "Metro Honolulu", zipCodes: ["96815"], description: "Professional junk removal services for Waikiki homes, condos, and businesses. Fast response times in the heart of Honolulu.", nearbyLocations: ["honolulu", "ala-moana", "diamond-head", "kapahulu"] },
  { slug: "ala-moana", name: "Ala Moana", county: "Honolulu", region: "Metro Honolulu", zipCodes: ["96814"], description: "Junk removal and dumpster rental services for Ala Moana residences and commercial properties.", nearbyLocations: ["honolulu", "waikiki", "kakaako", "makiki"] },
  { slug: "kakaako", name: "Kaka'ako", county: "Honolulu", region: "Metro Honolulu", zipCodes: ["96814"], description: "Serving the Kaka'ako community with efficient junk removal for condos, offices, and retail spaces.", nearbyLocations: ["honolulu", "ala-moana", "downtown-honolulu", "ward-village"] },
  { slug: "downtown-honolulu", name: "Downtown Honolulu", county: "Honolulu", region: "Metro Honolulu", zipCodes: ["96813"], description: "Commercial and residential junk removal in Downtown Honolulu. Office cleanouts and building clearances.", nearbyLocations: ["honolulu", "kakaako", "chinatown", "nuuanu"] },
  { slug: "chinatown", name: "Chinatown", county: "Honolulu", region: "Metro Honolulu", zipCodes: ["96817"], description: "Junk removal services for Chinatown businesses and residences. Navigating narrow streets with ease.", nearbyLocations: ["downtown-honolulu", "nuuanu", "liliha", "honolulu"] },
  { slug: "ward-village", name: "Ward Village", county: "Honolulu", region: "Metro Honolulu", zipCodes: ["96814"], description: "Junk removal and cleanout services for Ward Village condos and retail spaces.", nearbyLocations: ["kakaako", "ala-moana", "honolulu", "makiki"] },
  { slug: "kapahulu", name: "Kapahulu", county: "Honolulu", region: "Metro Honolulu", zipCodes: ["96816"], description: "Residential junk removal in the Kapahulu neighborhood. From small pickups to full cleanouts.", nearbyLocations: ["waikiki", "kaimuki", "diamond-head", "honolulu"] },

  // Greater Honolulu
  { slug: "makiki", name: "Makiki", county: "Honolulu", region: "Greater Honolulu", zipCodes: ["96822"], description: "Junk removal services for Makiki Heights and surrounding residential areas.", nearbyLocations: ["honolulu", "manoa", "punahou", "moiliili"] },
  { slug: "manoa", name: "Manoa", county: "Honolulu", region: "Greater Honolulu", zipCodes: ["96822"], description: "Professional junk removal in Manoa Valley. Serving homes and the university community.", nearbyLocations: ["makiki", "moiliili", "palolo", "punahou"] },
  { slug: "moiliili", name: "Mo'ili'ili", county: "Honolulu", region: "Greater Honolulu", zipCodes: ["96826"], description: "Quick, affordable junk removal for the Mo'ili'ili community near UH Manoa.", nearbyLocations: ["manoa", "kapahulu", "kaimuki", "makiki"] },
  { slug: "palolo", name: "Palolo", county: "Honolulu", region: "Greater Honolulu", zipCodes: ["96816"], description: "Junk removal and yard waste hauling in Palolo Valley.", nearbyLocations: ["kaimuki", "manoa", "st-louis-heights", "wilhelmina-rise"] },
  { slug: "punahou", name: "Punahou", county: "Honolulu", region: "Greater Honolulu", zipCodes: ["96822"], description: "Serving the Punahou neighborhood with reliable junk removal and cleanout services.", nearbyLocations: ["makiki", "manoa", "moiliili", "honolulu"] },
  { slug: "st-louis-heights", name: "St. Louis Heights", county: "Honolulu", region: "Greater Honolulu", zipCodes: ["96816"], description: "Junk removal services in St. Louis Heights. We navigate steep driveways and hillside homes.", nearbyLocations: ["palolo", "kaimuki", "wilhelmina-rise", "kapahulu"] },
  { slug: "kaimuki", name: "Kaimuki", county: "Honolulu", region: "Greater Honolulu", zipCodes: ["96816"], description: "Trusted junk removal services for Kaimuki homes and businesses.", nearbyLocations: ["kapahulu", "diamond-head", "palolo", "kahala"] },
  { slug: "diamond-head", name: "Diamond Head", county: "Honolulu", region: "Greater Honolulu", zipCodes: ["96815", "96816"], description: "Premium junk removal services in the Diamond Head area. Careful handling for upscale residences.", nearbyLocations: ["waikiki", "kahala", "kaimuki", "kapahulu"] },
  { slug: "kahala", name: "Kahala", county: "Honolulu", region: "Greater Honolulu", zipCodes: ["96816"], description: "Professional junk removal for Kahala's luxury homes. Discreet, careful service.", nearbyLocations: ["diamond-head", "kaimuki", "aina-haina", "waialae"] },
  { slug: "waialae", name: "Waialae", county: "Honolulu", region: "Greater Honolulu", zipCodes: ["96816"], description: "Junk removal and estate cleanouts in the Waialae neighborhood.", nearbyLocations: ["kahala", "kaimuki", "aina-haina", "wilhelmina-rise"] },
  { slug: "wilhelmina-rise", name: "Wilhelmina Rise", county: "Honolulu", region: "Greater Honolulu", zipCodes: ["96816"], description: "Serving Wilhelmina Rise with full-service junk removal.", nearbyLocations: ["kaimuki", "palolo", "st-louis-heights", "waialae"] },
  { slug: "nuuanu", name: "Nu'uanu", county: "Honolulu", region: "Greater Honolulu", zipCodes: ["96817"], description: "Junk removal and yard waste services in the Nu'uanu area.", nearbyLocations: ["downtown-honolulu", "chinatown", "liliha", "pacific-heights"] },
  { slug: "liliha", name: "Liliha", county: "Honolulu", region: "Greater Honolulu", zipCodes: ["96817"], description: "Affordable junk removal in Liliha. Quick response times for the whole neighborhood.", nearbyLocations: ["nuuanu", "chinatown", "kalihi", "pacific-heights"] },
  { slug: "pacific-heights", name: "Pacific Heights", county: "Honolulu", region: "Greater Honolulu", zipCodes: ["96813"], description: "Junk removal services for Pacific Heights residences. Handling hillside access with care.", nearbyLocations: ["nuuanu", "liliha", "tantalus", "makiki"] },
  { slug: "tantalus", name: "Tantalus", county: "Honolulu", region: "Greater Honolulu", zipCodes: ["96813"], description: "Junk and yard waste removal in the Tantalus and Round Top area.", nearbyLocations: ["pacific-heights", "makiki", "manoa", "nuuanu"] },

  // East Honolulu
  { slug: "aina-haina", name: "Aina Haina", county: "Honolulu", region: "East Honolulu", zipCodes: ["96821"], description: "Residential junk removal services in Aina Haina.", nearbyLocations: ["kahala", "niu-valley", "kuliouou", "waialae"] },
  { slug: "niu-valley", name: "Niu Valley", county: "Honolulu", region: "East Honolulu", zipCodes: ["96821"], description: "Full-service junk removal and cleanouts in Niu Valley.", nearbyLocations: ["aina-haina", "kuliouou", "hawaii-kai", "kahala"] },
  { slug: "kuliouou", name: "Kuliouou", county: "Honolulu", region: "East Honolulu", zipCodes: ["96821"], description: "Junk removal for Kuliouou homes. Yard waste and household junk hauled away fast.", nearbyLocations: ["niu-valley", "hawaii-kai", "aina-haina", "niu-valley"] },
  { slug: "hawaii-kai", name: "Hawaii Kai", county: "Honolulu", region: "East Honolulu", zipCodes: ["96825"], description: "Junk removal and dumpster rentals for Hawaii Kai homes and condos.", nearbyLocations: ["kuliouou", "niu-valley", "portlock", "koko-head"] },
  { slug: "portlock", name: "Portlock", county: "Honolulu", region: "East Honolulu", zipCodes: ["96825"], description: "Premium junk removal services for Portlock residences.", nearbyLocations: ["hawaii-kai", "koko-head", "kuliouou"] },
  { slug: "koko-head", name: "Koko Head", county: "Honolulu", region: "East Honolulu", zipCodes: ["96825"], description: "Junk removal near Koko Head. Serving the surrounding residential communities.", nearbyLocations: ["hawaii-kai", "portlock", "waimanalo"] },
  { slug: "waimanalo", name: "Waimanalo", county: "Honolulu", region: "East Honolulu", zipCodes: ["96795"], description: "Junk removal and yard waste hauling in Waimanalo.", nearbyLocations: ["koko-head", "kailua", "hawaii-kai"] },

  // Windward
  { slug: "kailua", name: "Kailua", county: "Honolulu", region: "Windward", zipCodes: ["96734"], description: "Kailua's trusted junk removal service. Fast, friendly, and affordable for homes and businesses.", nearbyLocations: ["lanikai", "enchanted-lake", "maunawili", "waimanalo"] },
  { slug: "lanikai", name: "Lanikai", county: "Honolulu", region: "Windward", zipCodes: ["96734"], description: "Junk removal for Lanikai's beachside homes. Careful, respectful service.", nearbyLocations: ["kailua", "enchanted-lake", "waimanalo"] },
  { slug: "enchanted-lake", name: "Enchanted Lake", county: "Honolulu", region: "Windward", zipCodes: ["96734"], description: "Serving the Enchanted Lake community with reliable junk removal.", nearbyLocations: ["kailua", "lanikai", "maunawili"] },
  { slug: "maunawili", name: "Maunawili", county: "Honolulu", region: "Windward", zipCodes: ["96734"], description: "Junk and green waste removal in Maunawili.", nearbyLocations: ["kailua", "enchanted-lake", "olomana"] },
  { slug: "olomana", name: "Olomana", county: "Honolulu", region: "Windward", zipCodes: ["96734"], description: "Junk removal services for Olomana neighborhood residents.", nearbyLocations: ["maunawili", "kailua", "kaneohe"] },
  { slug: "kaneohe", name: "Kaneohe", county: "Honolulu", region: "Windward", zipCodes: ["96744"], description: "Full-service junk removal for Kaneohe homes, condos, and businesses.", nearbyLocations: ["ahuimanu", "heeia", "kahaluu", "kailua"] },
  { slug: "ahuimanu", name: "Ahuimanu", county: "Honolulu", region: "Windward", zipCodes: ["96744"], description: "Junk removal in Ahuimanu. Quick, affordable service.", nearbyLocations: ["kaneohe", "heeia", "kahaluu"] },
  { slug: "heeia", name: "He'eia", county: "Honolulu", region: "Windward", zipCodes: ["96744"], description: "Serving He'eia with junk removal and cleanout services.", nearbyLocations: ["kaneohe", "ahuimanu", "kahaluu"] },
  { slug: "kahaluu", name: "Kahalu'u", county: "Honolulu", region: "Windward", zipCodes: ["96744"], description: "Reliable junk removal in Kahalu'u. Residential and commercial.", nearbyLocations: ["kaneohe", "heeia", "waikane"] },
  { slug: "waikane", name: "Waikane", county: "Honolulu", region: "Windward", zipCodes: ["96744"], description: "Junk and yard waste removal in Waikane.", nearbyLocations: ["kahaluu", "waiahole", "kaneohe"] },
  { slug: "waiahole", name: "Waiahole", county: "Honolulu", region: "Windward", zipCodes: ["96744"], description: "Junk removal services for the Waiahole community.", nearbyLocations: ["waikane", "kaaawa", "kahaluu"] },
  { slug: "kaaawa", name: "Ka'a'awa", county: "Honolulu", region: "Windward", zipCodes: ["96730"], description: "Junk removal and hauling in Ka'a'awa.", nearbyLocations: ["waiahole", "punaluu", "hauula"] },
  { slug: "punaluu", name: "Punalu'u", county: "Honolulu", region: "Windward", zipCodes: ["96717"], description: "Serving Punalu'u with reliable junk removal.", nearbyLocations: ["kaaawa", "hauula", "waiahole"] },
  { slug: "hauula", name: "Hau'ula", county: "Honolulu", region: "Windward", zipCodes: ["96717"], description: "Junk removal in Hau'ula. We serve the entire North Shore windward coast.", nearbyLocations: ["punaluu", "laie", "kaaawa"] },
  { slug: "laie", name: "La'ie", county: "Honolulu", region: "Windward", zipCodes: ["96762"], description: "Junk removal for La'ie homes and the surrounding community.", nearbyLocations: ["hauula", "kahuku", "punaluu"] },
  { slug: "kahuku", name: "Kahuku", county: "Honolulu", region: "Windward", zipCodes: ["96731"], description: "Serving Kahuku with junk removal and property cleanouts.", nearbyLocations: ["laie", "turtle-bay", "hauula"] },
  { slug: "turtle-bay", name: "Turtle Bay", county: "Honolulu", region: "Windward", zipCodes: ["96731"], description: "Junk removal and cleanout services for the Turtle Bay area.", nearbyLocations: ["kahuku", "sunset-beach", "laie"] },

  // North Shore
  { slug: "sunset-beach", name: "Sunset Beach", county: "Honolulu", region: "North Shore", zipCodes: ["96712"], description: "Junk removal on the North Shore. Serving Sunset Beach homes and vacation rentals.", nearbyLocations: ["turtle-bay", "haleiwa", "pupukea", "kahuku"] },
  { slug: "pupukea", name: "Pupukea", county: "Honolulu", region: "North Shore", zipCodes: ["96712"], description: "Residential junk removal in Pupukea.", nearbyLocations: ["sunset-beach", "haleiwa", "waimea-bay"] },
  { slug: "waimea-bay", name: "Waimea Bay", county: "Honolulu", region: "North Shore", zipCodes: ["96712"], description: "Junk removal services near Waimea Bay.", nearbyLocations: ["pupukea", "haleiwa", "sunset-beach"] },
  { slug: "haleiwa", name: "Haleiwa", county: "Honolulu", region: "North Shore", zipCodes: ["96712"], description: "Haleiwa's go-to junk removal service. From surf shacks to storefronts, we haul it all.", nearbyLocations: ["waimea-bay", "waialua", "mokuleia", "pupukea"] },
  { slug: "waialua", name: "Waialua", county: "Honolulu", region: "North Shore", zipCodes: ["96791"], description: "Junk removal and yard waste hauling in Waialua.", nearbyLocations: ["haleiwa", "mokuleia", "dillingham-airfield"] },
  { slug: "mokuleia", name: "Mokuleia", county: "Honolulu", region: "North Shore", zipCodes: ["96791"], description: "Serving Mokuleia with professional junk removal.", nearbyLocations: ["waialua", "haleiwa", "dillingham-airfield"] },
  { slug: "dillingham-airfield", name: "Dillingham Airfield Area", county: "Honolulu", region: "North Shore", zipCodes: ["96791"], description: "Junk removal services near Dillingham Airfield and surrounding areas.", nearbyLocations: ["mokuleia", "waialua", "haleiwa"] },

  // Central Oahu
  { slug: "wahiawa", name: "Wahiawa", county: "Honolulu", region: "Central Oahu", zipCodes: ["96786"], description: "Central Oahu's trusted junk removal service. Serving Wahiawa homes and businesses.", nearbyLocations: ["schofield-barracks", "whitmore-village", "mililani"] },
  { slug: "schofield-barracks", name: "Schofield Barracks", county: "Honolulu", region: "Central Oahu", zipCodes: ["96857"], description: "Junk removal for military families at Schofield Barracks. PCS cleanouts and more.", nearbyLocations: ["wahiawa", "wheeler-afb", "mililani"] },
  { slug: "wheeler-afb", name: "Wheeler AFB", county: "Honolulu", region: "Central Oahu", zipCodes: ["96854"], description: "Serving Wheeler Air Force Base with junk removal and cleanout services.", nearbyLocations: ["schofield-barracks", "wahiawa", "mililani"] },
  { slug: "whitmore-village", name: "Whitmore Village", county: "Honolulu", region: "Central Oahu", zipCodes: ["96786"], description: "Junk removal in Whitmore Village. Fast, affordable service.", nearbyLocations: ["wahiawa", "haleiwa", "mililani"] },
  { slug: "mililani", name: "Mililani", county: "Honolulu", region: "Central Oahu", zipCodes: ["96789"], description: "Mililani's premier junk removal service. Serving Mililani Town and Mililani Mauka.", nearbyLocations: ["mililani-mauka", "wahiawa", "waipio", "schofield-barracks"] },
  { slug: "mililani-mauka", name: "Mililani Mauka", county: "Honolulu", region: "Central Oahu", zipCodes: ["96789"], description: "Junk removal for Mililani Mauka homes.", nearbyLocations: ["mililani", "wahiawa", "waipio"] },
  { slug: "waipio", name: "Waipio", county: "Honolulu", region: "Central Oahu", zipCodes: ["96797"], description: "Junk removal and dumpster rentals in Waipio.", nearbyLocations: ["mililani", "waipio-acres", "pearl-city", "waipahu"] },
  { slug: "waipio-acres", name: "Waipio Acres", county: "Honolulu", region: "Central Oahu", zipCodes: ["96797"], description: "Serving Waipio Acres with reliable junk removal and yard waste hauling.", nearbyLocations: ["waipio", "mililani", "pearl-city"] },

  // Pearl City / Aiea / Salt Lake
  { slug: "pearl-city", name: "Pearl City", county: "Honolulu", region: "Pearl City-Aiea", zipCodes: ["96782"], description: "Pearl City's trusted junk removal company. Fast, friendly service for homes and businesses.", nearbyLocations: ["aiea", "waimalu", "waipahu", "newtown"] },
  { slug: "aiea", name: "Aiea", county: "Honolulu", region: "Pearl City-Aiea", zipCodes: ["96701"], description: "Professional junk removal in Aiea. Serving residential and commercial properties.", nearbyLocations: ["pearl-city", "halawa", "salt-lake", "waimalu"] },
  { slug: "waimalu", name: "Waimalu", county: "Honolulu", region: "Pearl City-Aiea", zipCodes: ["96701"], description: "Junk removal in Waimalu. Quick response, fair prices.", nearbyLocations: ["pearl-city", "aiea", "newtown"] },
  { slug: "newtown", name: "Newtown", county: "Honolulu", region: "Pearl City-Aiea", zipCodes: ["96701"], description: "Junk removal for the Newtown neighborhood in Aiea.", nearbyLocations: ["aiea", "waimalu", "pearl-city"] },
  { slug: "halawa", name: "Halawa", county: "Honolulu", region: "Pearl City-Aiea", zipCodes: ["96701"], description: "Junk removal and commercial cleanouts in Halawa.", nearbyLocations: ["aiea", "salt-lake", "moanalua"] },
  { slug: "salt-lake", name: "Salt Lake", county: "Honolulu", region: "Pearl City-Aiea", zipCodes: ["96818"], description: "Salt Lake junk removal. Condo cleanouts, furniture removal, and more.", nearbyLocations: ["moanalua", "aiea", "halawa", "foster-village"] },
  { slug: "moanalua", name: "Moanalua", county: "Honolulu", region: "Pearl City-Aiea", zipCodes: ["96819"], description: "Serving Moanalua with fast, reliable junk removal.", nearbyLocations: ["salt-lake", "halawa", "aiea", "red-hill"] },
  { slug: "foster-village", name: "Foster Village", county: "Honolulu", region: "Pearl City-Aiea", zipCodes: ["96818"], description: "Junk removal for Foster Village homes.", nearbyLocations: ["salt-lake", "halawa", "moanalua"] },
  { slug: "red-hill", name: "Red Hill", county: "Honolulu", region: "Pearl City-Aiea", zipCodes: ["96819"], description: "Junk removal in the Red Hill area near Joint Base Pearl Harbor-Hickam.", nearbyLocations: ["moanalua", "salt-lake", "fort-shafter"] },

  // Kalihi / Iwilei
  { slug: "kalihi", name: "Kalihi", county: "Honolulu", region: "Kalihi", zipCodes: ["96819"], description: "Affordable junk removal in Kalihi. Residential and commercial services.", nearbyLocations: ["kalihi-valley", "iwilei", "liliha", "palama"] },
  { slug: "kalihi-valley", name: "Kalihi Valley", county: "Honolulu", region: "Kalihi", zipCodes: ["96819"], description: "Junk and yard waste removal in Kalihi Valley.", nearbyLocations: ["kalihi", "liliha", "moanalua"] },
  { slug: "iwilei", name: "Iwilei", county: "Honolulu", region: "Kalihi", zipCodes: ["96817"], description: "Commercial junk removal in the Iwilei industrial and business district.", nearbyLocations: ["chinatown", "kalihi", "downtown-honolulu"] },
  { slug: "palama", name: "Palama", county: "Honolulu", region: "Kalihi", zipCodes: ["96817"], description: "Junk removal in the Palama neighborhood.", nearbyLocations: ["kalihi", "liliha", "iwilei", "chinatown"] },

  // Ewa / Waipahu / Kapolei
  { slug: "waipahu", name: "Waipahu", county: "Honolulu", region: "Ewa-Kapolei", zipCodes: ["96797"], description: "Waipahu's reliable junk removal service. Homes, condos, and businesses.", nearbyLocations: ["pearl-city", "ewa-beach", "waipio", "village-park"] },
  { slug: "village-park", name: "Village Park", county: "Honolulu", region: "Ewa-Kapolei", zipCodes: ["96797"], description: "Junk removal for Village Park homes.", nearbyLocations: ["waipahu", "waipio", "royal-kunia"] },
  { slug: "royal-kunia", name: "Royal Kunia", county: "Honolulu", region: "Ewa-Kapolei", zipCodes: ["96797"], description: "Serving Royal Kunia with professional junk removal and hauling.", nearbyLocations: ["village-park", "waipahu", "mililani"] },
  { slug: "ewa-beach", name: "Ewa Beach", county: "Honolulu", region: "Ewa-Kapolei", zipCodes: ["96706"], description: "Ewa Beach junk removal. Fast pickup for homes, condos, and military housing.", nearbyLocations: ["ewa-gentry", "ocean-pointe", "kapolei", "waipahu"] },
  { slug: "ewa-gentry", name: "Ewa Gentry", county: "Honolulu", region: "Ewa-Kapolei", zipCodes: ["96706"], description: "Junk removal in Ewa Gentry. Same-day and next-day service.", nearbyLocations: ["ewa-beach", "kapolei", "ocean-pointe"] },
  { slug: "ocean-pointe", name: "Ocean Pointe", county: "Honolulu", region: "Ewa-Kapolei", zipCodes: ["96706"], description: "Junk removal for Ocean Pointe homes.", nearbyLocations: ["ewa-beach", "ewa-gentry", "kapolei"] },
  { slug: "kapolei", name: "Kapolei", county: "Honolulu", region: "Ewa-Kapolei", zipCodes: ["96707"], description: "Kapolei's trusted junk removal service. Serving Oahu's second city with fast, affordable hauling.", nearbyLocations: ["ewa-beach", "makakilo", "ko-olina", "kalaeloa"] },
  { slug: "makakilo", name: "Makakilo", county: "Honolulu", region: "Ewa-Kapolei", zipCodes: ["96707"], description: "Junk removal for Makakilo hillside homes.", nearbyLocations: ["kapolei", "ewa-beach", "kalaeloa"] },
  { slug: "kalaeloa", name: "Kalaeloa", county: "Honolulu", region: "Ewa-Kapolei", zipCodes: ["96707"], description: "Junk removal near Kalaeloa and the former Barbers Point area.", nearbyLocations: ["kapolei", "makakilo", "ko-olina"] },
  { slug: "ko-olina", name: "Ko Olina", county: "Honolulu", region: "Ewa-Kapolei", zipCodes: ["96707"], description: "Premium junk removal services for Ko Olina resorts, condos, and residences.", nearbyLocations: ["kapolei", "nanakuli", "kalaeloa"] },
  { slug: "hoopili", name: "Ho'opili", county: "Honolulu", region: "Ewa-Kapolei", zipCodes: ["96706"], description: "Junk removal for Ho'opili's growing community.", nearbyLocations: ["ewa-beach", "kapolei", "ewa-gentry"] },

  // Leeward / Waianae Coast
  { slug: "nanakuli", name: "Nanakuli", county: "Honolulu", region: "Leeward", zipCodes: ["96792"], description: "Junk removal services for Nanakuli homes and businesses.", nearbyLocations: ["ko-olina", "waianae", "maili"] },
  { slug: "maili", name: "Ma'ili", county: "Honolulu", region: "Leeward", zipCodes: ["96792"], description: "Affordable junk removal in Ma'ili.", nearbyLocations: ["nanakuli", "waianae", "ko-olina"] },
  { slug: "waianae", name: "Waianae", county: "Honolulu", region: "Leeward", zipCodes: ["96792"], description: "Waianae junk removal. Serving the leeward coast with reliable hauling services.", nearbyLocations: ["maili", "makaha", "nanakuli"] },
  { slug: "makaha", name: "Makaha", county: "Honolulu", region: "Leeward", zipCodes: ["96792"], description: "Junk removal in Makaha. From condos to homes, we haul it all.", nearbyLocations: ["waianae", "maili"] },

  // Military
  { slug: "fort-shafter", name: "Fort Shafter", county: "Honolulu", region: "Military", zipCodes: ["96858"], description: "Junk removal for Fort Shafter military families. PCS cleanouts and moving support.", nearbyLocations: ["moanalua", "kalihi", "salt-lake", "red-hill"] },
  { slug: "joint-base-pearl-harbor-hickam", name: "Joint Base Pearl Harbor-Hickam", county: "Honolulu", region: "Military", zipCodes: ["96860"], description: "Serving JBPHH with professional junk removal and PCS cleanout services.", nearbyLocations: ["pearl-city", "aiea", "ewa-beach", "salt-lake"] },
  { slug: "tripler-army-medical-center", name: "Tripler AMC Area", county: "Honolulu", region: "Military", zipCodes: ["96859"], description: "Junk removal near Tripler Army Medical Center and surrounding housing.", nearbyLocations: ["moanalua", "red-hill", "salt-lake", "fort-shafter"] },
  { slug: "marine-corps-base-hawaii", name: "Marine Corps Base Hawaii", county: "Honolulu", region: "Military", zipCodes: ["96863"], description: "MCBH Kaneohe Bay junk removal. PCS and military housing cleanouts.", nearbyLocations: ["kaneohe", "kailua", "enchanted-lake"] },
  { slug: "camp-smith", name: "Camp Smith", county: "Honolulu", region: "Military", zipCodes: ["96861"], description: "Junk removal services for Camp Smith personnel.", nearbyLocations: ["aiea", "halawa", "moanalua", "red-hill"] },

  // Additional neighborhoods to reach 106
  { slug: "hawaii-loa-ridge", name: "Hawaii Loa Ridge", county: "Honolulu", region: "East Honolulu", zipCodes: ["96821"], description: "Premium junk removal for Hawaii Loa Ridge estates.", nearbyLocations: ["aina-haina", "niu-valley", "kahala"] },
  { slug: "kuliouou-valley", name: "Kuliouou Valley", county: "Honolulu", region: "East Honolulu", zipCodes: ["96821"], description: "Junk removal in Kuliouou Valley.", nearbyLocations: ["kuliouou", "niu-valley", "hawaii-kai"] },
  { slug: "wailupe", name: "Wailupe", county: "Honolulu", region: "East Honolulu", zipCodes: ["96821"], description: "Junk removal services for the Wailupe area.", nearbyLocations: ["aina-haina", "niu-valley", "kahala"] },
  { slug: "kalama-valley", name: "Kalama Valley", county: "Honolulu", region: "East Honolulu", zipCodes: ["96825"], description: "Serving Kalama Valley with residential junk removal.", nearbyLocations: ["hawaii-kai", "koko-head"] },
  { slug: "marina-west", name: "Marina West", county: "Honolulu", region: "East Honolulu", zipCodes: ["96825"], description: "Junk removal for Marina West homes in Hawaii Kai.", nearbyLocations: ["hawaii-kai", "kalama-valley"] },
  { slug: "koko-kai", name: "Koko Kai", county: "Honolulu", region: "East Honolulu", zipCodes: ["96825"], description: "Professional junk removal for Koko Kai residences.", nearbyLocations: ["hawaii-kai", "portlock", "koko-head"] },
  { slug: "napili-hauula", name: "Napili/Hau'ula Heights", county: "Honolulu", region: "Windward", zipCodes: ["96717"], description: "Junk removal for the Napili/Hau'ula Heights community.", nearbyLocations: ["hauula", "punaluu", "laie"] },
  { slug: "temple-valley", name: "Temple Valley", county: "Honolulu", region: "Windward", zipCodes: ["96744"], description: "Junk removal services for Temple Valley residents.", nearbyLocations: ["kaneohe", "ahuimanu", "kahaluu"] },
  { slug: "haiku-valley", name: "Haiku Valley", county: "Honolulu", region: "Windward", zipCodes: ["96744"], description: "Serving Haiku Valley with junk removal and yard waste hauling.", nearbyLocations: ["kaneohe", "temple-valley"] },
  { slug: "kaawa-valley", name: "Ka'a'awa Valley", county: "Honolulu", region: "Windward", zipCodes: ["96730"], description: "Junk removal in Ka'a'awa Valley.", nearbyLocations: ["kaaawa", "waiahole"] },
  { slug: "waipio-gentry", name: "Waipio Gentry", county: "Honolulu", region: "Central Oahu", zipCodes: ["96797"], description: "Junk removal for Waipio Gentry homes.", nearbyLocations: ["waipio", "waipahu", "mililani"] },
  { slug: "crestview", name: "Crestview", county: "Honolulu", region: "Central Oahu", zipCodes: ["96789"], description: "Junk removal for Crestview/Mililani area homes.", nearbyLocations: ["mililani", "mililani-mauka", "waipio"] },
  { slug: "manana", name: "Manana", county: "Honolulu", region: "Pearl City-Aiea", zipCodes: ["96782"], description: "Junk removal in Manana/Pearl City.", nearbyLocations: ["pearl-city", "waimalu", "waipio"] },
  { slug: "pearlridge", name: "Pearlridge", county: "Honolulu", region: "Pearl City-Aiea", zipCodes: ["96701"], description: "Junk removal near the Pearlridge area.", nearbyLocations: ["aiea", "pearl-city", "waimalu"] },
  { slug: "aliamanu", name: "Aliamanu", county: "Honolulu", region: "Pearl City-Aiea", zipCodes: ["96818"], description: "Junk removal for Aliamanu military housing and surrounding community.", nearbyLocations: ["salt-lake", "red-hill", "foster-village", "moanalua"] },
  { slug: "pauoa", name: "Pauoa", county: "Honolulu", region: "Greater Honolulu", zipCodes: ["96813"], description: "Junk removal in Pauoa Valley.", nearbyLocations: ["nuuanu", "pacific-heights", "downtown-honolulu"] },
  { slug: "alewa-heights", name: "Alewa Heights", county: "Honolulu", region: "Greater Honolulu", zipCodes: ["96817"], description: "Junk removal services for Alewa Heights homes.", nearbyLocations: ["nuuanu", "liliha", "pauoa"] },
];

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}

export function getNearbyLocations(slugs: string[]): Location[] {
  return slugs.map((slug) => locations.find((l) => l.slug === slug)).filter(Boolean) as Location[];
}

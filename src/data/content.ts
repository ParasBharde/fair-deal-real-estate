import type { Feature, FeatureCollection, Point } from "geojson";
import type {
  Highlight,
  Neighborhood,
  ProcessStep,
  PromisePoint,
  Property,
  Service,
  SupportService,
  Testimonial
} from "../types";

export const pcmcCenter: [number, number] = [73.7908, 18.6279];

export const highlights: Highlight[] = [
  { id: "repeat", value: "23+", label: "repeat and referral-led relationships" },
  { id: "focus", value: "PCMC", label: "micro-market focus across growth corridors" },
  { id: "fees", value: "0 hidden", label: "surprise charges in the consulting journey" }
];

export const promisePoints: PromisePoint[] = [
  {
    id: "transparent",
    title: "Transparent fees",
    description: "Clear consulting discussions, clean paperwork, and no hidden charge surprises."
  },
  {
    id: "rental",
    title: "Rental-first thinking",
    description: "Advice shaped around customer need, occupancy potential, and practical returns."
  },
  {
    id: "legal",
    title: "Legal confidence",
    description: "Agreements, title review, and RERA-aligned guidance handled with clarity."
  },
  {
    id: "solution",
    title: "One-stop execution",
    description: "From shortlist to after-sale support, the journey stays with one consulting partner."
  }
];

export const properties: Property[] = [
  {
    id: "akurdi-1",
    title: "Akurdi Skyline Residency",
    area: "Akurdi",
    configuration: "2BHK",
    price: "\u20B975 Lacs",
    coordinates: [73.7708, 18.6482],
    image:
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80"
    ],
    summary: "Metro-linked family inventory with strong rental movement and easy daily access.",
    address: "Near Akurdi Railway Station, PCMC",
    possession: "Dec 2026",
    status: "Under Construction",
    size: "842 sq.ft. carpet",
    overview:
      "Akurdi Skyline Residency is designed for end users who want daily mobility, family-ready planning, and dependable resale stability within the PCMC belt.",
    highlights: [
      "Walkable access to rail and metro connectivity",
      "Balanced 2BHK layouts with family-use planning",
      "Strong rental demand from professionals and local families"
    ],
    amenities: ["Club lounge", "Children's play court", "Podium parking", "Security lobby"],
    tags: ["2bhk", "rental", "family", "metro", "buy"]
  },
  {
    id: "nigdi-1",
    title: "Nigdi Golden Courtyard",
    area: "Nigdi",
    configuration: "3BHK",
    price: "\u20B998 Lacs",
    coordinates: [73.7645, 18.6513],
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80"
    ],
    summary: "Established neighborhood stock preferred by end users seeking schools and civic access.",
    address: "Sector 24, Nigdi Pradhikaran, PCMC",
    possession: "Ready to Move",
    status: "Ready Inventory",
    size: "1148 sq.ft. carpet",
    overview:
      "Nigdi Golden Courtyard serves buyers looking for mature civic infrastructure, tested neighborhood quality, and larger family formats in a stable location.",
    highlights: [
      "Located in an established civic and retail zone",
      "Spacious 3BHK stock for family-led ownership",
      "Suitable for resale buyers prioritizing long-term livability"
    ],
    amenities: ["Multipurpose hall", "Landscaped court", "Visitor parking", "Solar common lighting"],
    tags: ["3bhk", "family", "resale", "buy", "schools"]
  },
  {
    id: "ravet-1",
    title: "Ravet Urban Crest",
    area: "Ravet",
    configuration: "2BHK",
    price: "\u20B982 Lacs",
    coordinates: [73.7458, 18.6437],
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448205-17d3a46c84de?auto=format&fit=crop&w=1200&q=80"
    ],
    summary: "Young inventory near highway connectivity, suitable for both first homes and rentals.",
    address: "Mumbai-Pune Highway Link, Ravet, PCMC",
    possession: "Jun 2027",
    status: "New Launch",
    size: "876 sq.ft. carpet",
    overview:
      "Ravet Urban Crest is positioned for first-home buyers and investors who want entry into a fast-moving corridor with future infrastructure upside.",
    highlights: [
      "Well-placed for corridor-led price movement",
      "Compact efficient plans for young buyers and investors",
      "Useful access to expressway and western micro-markets"
    ],
    amenities: ["Sky deck", "Co-working lounge", "Gymnasium", "Double-height arrival lobby"],
    tags: ["2bhk", "rental", "investment", "buy", "young buyers"]
  },
  {
    id: "kiwale-1",
    title: "Kiwale Signature Homes",
    area: "Kiwale",
    configuration: "2BHK",
    price: "\u20B968 Lacs",
    coordinates: [73.7288, 18.6479],
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
    ],
    summary: "Value-driven stock with upcoming infrastructure upside and broader ticket flexibility.",
    address: "Kiwale Growth Zone, Dehu Road Corridor, PCMC",
    possession: "Mar 2027",
    status: "Under Construction",
    size: "801 sq.ft. carpet",
    overview:
      "Kiwale Signature Homes targets value-conscious buyers who want to stay inside the PCMC story without stepping into higher ticket pressure too early.",
    highlights: [
      "Balanced pricing for first-home and investor demand",
      "Good fit for budget-driven entry into the western corridor",
      "Future-facing locality with development upside"
    ],
    amenities: ["Jogging track", "Rooftop seating", "Indoor games room", "Retail edge frontage"],
    tags: ["2bhk", "value", "investment", "buy", "budget"]
  },
  {
    id: "wakad-1",
    title: "Wakad Platinum Heights",
    area: "Wakad",
    configuration: "3BHK",
    price: "\u20B91.25 Cr",
    coordinates: [73.7685, 18.5973],
    image:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
    ],
    summary: "High-demand urban inventory with premium livability and strong professional tenant pull.",
    address: "Prime Wakad Link Road, PCMC",
    possession: "Ready to Move",
    status: "Ready Inventory",
    size: "1286 sq.ft. carpet",
    overview:
      "Wakad Platinum Heights is aimed at buyers who value polished urban access, stronger rental pull, and a more premium residential profile within the PCMC market.",
    highlights: [
      "Premium address with strong professional demand",
      "Larger 3BHK planning for lifestyle-led ownership",
      "Suitable for end use and premium rental holding"
    ],
    amenities: ["Infinity edge pool", "Fitness studio", "Business lounge", "Concierge reception"],
    tags: ["3bhk", "premium", "rental", "investment", "buy"]
  }
];

export const neighborhoods: Neighborhood[] = [
  {
    id: "akurdi",
    name: "Akurdi",
    center: [73.7708, 18.6482],
    zoom: 13.8,
    tagline: "Transit-led residential comfort",
    snapshot: "Well-connected residential catchment with dependable family demand."
  },
  {
    id: "nigdi",
    name: "Nigdi",
    center: [73.7645, 18.6513],
    zoom: 13.8,
    tagline: "Established civic infrastructure",
    snapshot: "Mature neighborhood fabric, stable resale conversations, and local trust."
  },
  {
    id: "ravet",
    name: "Ravet",
    center: [73.7458, 18.6437],
    zoom: 13.8,
    tagline: "Emerging corridor momentum",
    snapshot: "Fast-moving projects near key road links, attractive for young buyers."
  },
  {
    id: "kiwale",
    name: "Kiwale",
    center: [73.7288, 18.6479],
    zoom: 13.6,
    tagline: "Value-led expansion zone",
    snapshot: "Room for budget efficiency without stepping out of the PCMC story."
  },
  {
    id: "wakad",
    name: "Wakad",
    center: [73.7685, 18.5973],
    zoom: 13.6,
    tagline: "Premium urban demand",
    snapshot: "High visibility location with strong rental pull and polished lifestyle appeal."
  }
];

export const services: Service[] = [
  {
    id: "legal",
    title: "Legal Clarity",
    description: "Agreement drafting, title checks, and RERA-compliant due diligence.",
    icon: "scale"
  },
  {
    id: "buy-sell",
    title: "Buy / Sell Advisory",
    description: "End-to-end negotiation support from site visit to deal closure.",
    icon: "home"
  },
  {
    id: "rent",
    title: "Rent Management",
    description: "Tenant onboarding, rental valuation, and lease management support.",
    icon: "key"
  },
  {
    id: "maintenance",
    title: "Property Maintenance",
    description: "Vendor coordination, periodic upkeep, and rapid issue resolution.",
    icon: "wrench"
  }
];

export const supportServices: SupportService[] = [
  {
    id: "plumber",
    title: "Plumber & repair coordination",
    detail: "Fast fixes for occupied or newly handed-over homes."
  },
  {
    id: "advocate",
    title: "Advocate support",
    detail: "Practical assistance when a transaction needs legal depth."
  },
  {
    id: "documentation",
    title: "Documentation follow-through",
    detail: "Cleaner execution from token stage to final paperwork."
  }
];

export const processSteps: ProcessStep[] = [
  {
    id: "brief",
    title: "Listen to the actual need",
    detail: "Rental, investment, resale, or move-in decisions start with the customer's real constraint."
  },
  {
    id: "match",
    title: "Shortlist with PCMC precision",
    detail: "We narrow the search by locality behavior, budget stretch, and building quality."
  },
  {
    id: "verify",
    title: "Verify before commitment",
    detail: "Pricing, documentation, and legal clarity are checked before the push to close."
  },
  {
    id: "support",
    title: "Stay after the deal",
    detail: "Maintenance and value-added support reduce friction after possession or tenancy."
  }
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Neha Kulkarni",
    role: "Homebuyer",
    area: "Nigdi",
    quote:
      "The experience felt personal, not transactional. Fees were transparent and every step was explained before we committed."
  },
  {
    id: "t2",
    name: "Rohan Jagtap",
    role: "Rental Investor",
    area: "Ravet",
    quote:
      "They understood rental yield first, not just brochure promises. That changed the shortlist completely."
  },
  {
    id: "t3",
    name: "Priya Deshmukh",
    role: "Seller",
    area: "Wakad",
    quote:
      "What stood out was end-to-end coordination. Legal, negotiation, and post-deal support came from one place."
  }
];

export const propertyGeoJson: FeatureCollection<Point, { propertyId: string }> = {
  type: "FeatureCollection",
  features: properties.map(
    (property): Feature<Point, { propertyId: string }> => ({
      type: "Feature",
      properties: { propertyId: property.id },
      geometry: {
        type: "Point",
        coordinates: property.coordinates
      }
    })
  )
};

export const getPropertyById = (id: string) => properties.find((property) => property.id === id);

export const getRelatedProperties = (propertyId: string, area: string) =>
  properties.filter((property) => property.id !== propertyId && property.area === area);

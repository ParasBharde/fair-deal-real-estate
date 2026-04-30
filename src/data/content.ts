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
    id: "p1",
    title: "2BHK in Akurdi",
    price: "₹75L",
    area: "Akurdi",
    type: "Buy",
    broker: "Raj Patil",
    contact: "+91 9876543210",
    size: "842 sq.ft",
    pricePerSqft: "₹8.9K",
    floor: "5/12",
    facing: "East",
    status: "Ready",
    tag: "High Demand",
    features: ["Near Station", "Parking", "Lift", "Good Light"],
    note: "Strong rental area, slight negotiation possible",
    image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=800&q=80",
    overview: "Strategically located near the Akurdi railway station, this unit offers exceptional connectivity for commuters and high rental yield potential for investors.",
    coordinates: [73.7708, 18.6482],
    configuration: "2BHK",
    gallery: ["https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80"]
  },
  {
    id: "p2",
    title: "3BHK in Nigdi",
    price: "₹98L",
    area: "Nigdi",
    type: "Buy",
    broker: "Sanjay Mane",
    contact: "+91 9922334455",
    size: "1148 sq.ft",
    pricePerSqft: "₹8.5K",
    floor: "2/7",
    facing: "West",
    status: "Ready",
    tag: "Family Choice",
    features: ["Quiet Area", "School Proximity", "Balcony", "Security"],
    note: "Prime location near schools; very well maintained property.",
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80",
    overview: "A spacious 3BHK tailored for families seeking a peaceful residential atmosphere with immediate access to educational institutions.",
    coordinates: [73.7645, 18.6513],
    configuration: "3BHK",
    gallery: ["https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80"]
  },
  {
    id: "p3",
    title: "2BHK in Ravet",
    price: "₹82L",
    area: "Ravet",
    type: "Buy",
    broker: "Anita Deshmukh",
    contact: "+91 9855667788",
    size: "876 sq.ft",
    pricePerSqft: "₹9.3K",
    floor: "10/22",
    facing: "North",
    status: "Ready",
    tag: "Modern Living",
    features: ["Clubhouse", "Gym", "Power Backup", "CCTV"],
    note: "High floor with city views; price slightly firm but worth it.",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80",
    overview: "Located in the fast-growing Ravet corridor, this property is perfect for young professionals looking for a modern lifestyle.",
    coordinates: [73.7458, 18.6437],
    configuration: "2BHK",
    gallery: ["https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80"]
  },
  {
    id: "p4",
    title: "2BHK in Kiwale",
    price: "₹68L",
    area: "Kiwale",
    type: "Buy",
    broker: "Vikram Shah",
    contact: "+91 9766442211",
    size: "801 sq.ft",
    pricePerSqft: "₹8.4K",
    floor: "1/5",
    facing: "East",
    status: "Under Construction",
    tag: "Budget Entry",
    features: ["Ventilation", "Open Space", "Kitchen Trolley"],
    note: "Great value for money; possession expected within 6 months.",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80",
    overview: "An affordable entry point into the PCMC market without compromising on fundamental quality and space.",
    coordinates: [73.7288, 18.6479],
    configuration: "2BHK",
    gallery: ["https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80"]
  },
  {
    id: "p5",
    title: "3BHK in Wakad",
    price: "₹1.25 Cr",
    area: "Wakad",
    type: "Buy",
    broker: "Rahul Gupta",
    contact: "+91 9122334455",
    size: "1286 sq.ft",
    pricePerSqft: "₹9.7K",
    floor: "8/15",
    facing: "East",
    status: "Ready",
    tag: "Premium Hub",
    features: ["Semi-Furnished", "Modular Kitchen", "Gas Pipeline"],
    note: "Premium society; excellent connectivity to Hinjewadi IT Park.",
    image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=800&q=80",
    overview: "A premium 3BHK unit in the heart of Wakad, specifically targeting IT professionals and corporate families.",
    coordinates: [73.7685, 18.5973],
    configuration: "3BHK",
    gallery: ["https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80"]
  },
  {
    id: "p6",
    title: "2BHK in Akurdi",
    price: "₹72L",
    area: "Akurdi",
    type: "Buy",
    broker: "Amit Jadhav",
    contact: "+91 9000000001",
    size: "810 sq.ft",
    pricePerSqft: "₹8.8K",
    floor: "3/10",
    facing: "West",
    status: "Ready",
    tag: "Urgent Sale",
    features: ["Near Railway", "Lift", "Parking", "Family Society"],
    note: "Owner relocating, quick deal expected",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858",
    coordinates: [73.7708, 18.6482],
    configuration: "2BHK",
    gallery: ["https://images.unsplash.com/photo-1484154218962-a197022b5858"]
  },
  {
    id: "p7",
    title: "3BHK in Nigdi",
    price: "₹1.05Cr",
    area: "Nigdi",
    type: "Buy",
    broker: "Sneha Kulkarni",
    contact: "+91 9000000002",
    size: "1150 sq.ft",
    pricePerSqft: "₹9.1K",
    floor: "2/7",
    facing: "East",
    status: "Ready",
    tag: "Family Preferred",
    features: ["Spacious Rooms", "Parking", "Garden View", "Prime Area"],
    note: "Good for long-term family living, minimal negotiation",
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd",
    coordinates: [73.7645, 18.6513],
    configuration: "3BHK",
    gallery: ["https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd"]
  },
  {
    id: "p8",
    title: "2BHK in Ravet",
    price: "₹26K/mo",
    area: "Ravet",
    type: "Rent",
    broker: "Rahul Shinde",
    contact: "+91 9000000003",
    size: "870 sq.ft",
    pricePerSqft: "₹30/sq.ft",
    floor: "8/14",
    facing: "North",
    status: "Ready",
    tag: "Rental Hotspot",
    features: ["Highway Access", "Lift", "Gym", "Security"],
    note: "Strong demand from IT tenants, fast closing",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    coordinates: [73.7458, 18.6437],
    configuration: "2BHK",
    gallery: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"]
  },
  {
    id: "p9",
    title: "2BHK in Kiwale",
    price: "₹65L",
    area: "Kiwale",
    type: "Buy",
    broker: "Pooja Deshmukh",
    contact: "+91 9000000004",
    size: "790 sq.ft",
    pricePerSqft: "₹8.2K",
    floor: "6/12",
    facing: "East",
    status: "Under Construction",
    tag: "Best Value",
    features: ["Budget Friendly", "New Project", "Parking", "Open View"],
    note: "Good entry price, future appreciation expected",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156",
    coordinates: [73.7288, 18.6479],
    configuration: "2BHK",
    gallery: ["https://images.unsplash.com/photo-1494526585095-c41746248156"]
  },
  {
    id: "p10",
    title: "3BHK in Wakad",
    price: "₹1.35Cr",
    area: "Wakad",
    type: "Buy",
    broker: "Karan Mehta",
    contact: "+91 9000000005",
    size: "1300 sq.ft",
    pricePerSqft: "₹10.3K",
    floor: "10/18",
    facing: "West",
    status: "Ready",
    tag: "Premium Deal",
    features: ["Prime Location", "Clubhouse", "Parking", "High Floor"],
    note: "Ideal for professionals, strong resale value",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
    coordinates: [73.7685, 18.5973],
    configuration: "3BHK",
    gallery: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"]
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
  features: properties
    .filter((p): p is Property & { coordinates: [number, number] } => !!p.coordinates)
    .map(
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

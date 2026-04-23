export interface Property {
  id: string;
  title: string;
  area: string;
  configuration: string;
  price: string;
  coordinates: [number, number];
  image: string;
  gallery: string[];
  summary: string;
  address: string;
  possession: string;
  status: string;
  size: string;
  overview: string;
  highlights: string[];
  amenities: string[];
  tags: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: "scale" | "home" | "key" | "wrench";
}

export interface Neighborhood {
  id: string;
  name: string;
  center: [number, number];
  zoom: number;
  tagline: string;
  snapshot: string;
}

export interface Highlight {
  id: string;
  value: string;
  label: string;
}

export interface PromisePoint {
  id: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  area: string;
}

export interface SupportService {
  id: string;
  title: string;
  detail: string;
}

export interface ProcessStep {
  id: string;
  title: string;
  detail: string;
}

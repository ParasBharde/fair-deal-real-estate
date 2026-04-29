import { useEffect, useRef, useState } from "react";
import maplibregl, { LngLatLike, Map as MapLibreMap, StyleSpecification } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  ArrowRight,
  BedDouble,
  CircleDollarSign,
  Compass,
  MapPin,
  ShieldCheck
} from "lucide-react";
import { Link } from "react-router-dom";
import { neighborhoods, pcmcCenter, properties, propertyGeoJson } from "../data/content";
import type { Neighborhood, Property } from "../types";

interface MapHeroProps {
  focusArea: Neighborhood;
  onAreaSelect: (area: Neighborhood) => void;
}

const sourceId = "property-points";
const layerId = "property-pins";
const pulseLayerId = "property-pin-pulse";
const activeLayerId = "property-pin-active";
const rasterSourceId = "osm-raster";

const mapStyle: StyleSpecification = {
  version: 8,
  sources: {
    [rasterSourceId]: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "&copy; OpenStreetMap contributors"
    }
  },
  layers: [
    {
      id: rasterSourceId,
      type: "raster",
      source: rasterSourceId,
      paint: {
        "raster-opacity": 1,
        "raster-brightness-max": 0.94,
        "raster-brightness-min": 0.26,
        "raster-contrast": 0.06,
        "raster-saturation": 0.12
      }
    }
  ]
};

const configurationFilters = ["2BHK", "3BHK"] as const;
const intentFilters = ["Rental", "Investment", "Family"] as const;
const trustChips = ["Transparent Fees", "Rental-First", "Legal Confidence"] as const;
const proofStats = [
  { value: "23+", label: "repeat and referral-led relationships" },
  { value: "PCMC", label: "micro-market focus across core growth corridors" },
  { value: "0 hidden", label: "surprise charges across the consulting journey" }
] as const;

const findPropertyForArea = (areaName: string) =>
  properties.find((property) => property.area.toLowerCase() === areaName.toLowerCase()) ?? properties[0];

export default function MapHero({ focusArea, onAreaSelect }: MapHeroProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property>(() =>
    findPropertyForArea(focusArea.name)
  );
  const [activeAreaFilter, setActiveAreaFilter] = useState<string>(focusArea.name);
  const [activeConfigFilter, setActiveConfigFilter] = useState<string>("2BHK");
  const [activeIntentFilter, setActiveIntentFilter] = useState<string>("Rental");
  const [mapMessage, setMapMessage] = useState(
    "Choose a locality or filter set to update the live PCMC map and the featured property."
  );

  const focusMapOnProperty = (property: Property, zoom = 14.5) => {
    if (!mapRef.current) {
      return;
    }

    mapRef.current.flyTo({
      center: property.coordinates as LngLatLike,
      zoom,
      speed: 0.85,
      curve: 1.08,
      essential: true
    });
  };

  const applySelectedProperty = (property: Property, message: string, zoom = 14.5) => {
    setSelectedProperty(property);
    setActiveAreaFilter(property.area);
    setMapMessage(message);
    focusMapOnProperty(property, zoom);
  };

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) {
      return;
    }

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: mapStyle,
      center: pcmcCenter as LngLatLike,
      zoom: 12,
      antialias: true,
      cooperativeGestures: true,
      attributionControl: false
    });

    mapRef.current = map;
    map.dragRotate.disable();
    map.touchZoomRotate.enable();
    map.touchZoomRotate.disableRotation();
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
    map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-left");

    map.on("load", () => {
      map.addSource(sourceId, {
        type: "geojson",
        data: propertyGeoJson
      });

      map.addLayer({
        id: pulseLayerId,
        type: "circle",
        source: sourceId,
        paint: {
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 10, 11, 15, 20],
          "circle-color": "rgba(212, 175, 55, 0.18)"
        }
      });

      map.addLayer({
        id: layerId,
        type: "circle",
        source: sourceId,
        paint: {
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 10, 5, 15, 8],
          "circle-color": "#D4AF37",
          "circle-stroke-color": "#171717",
          "circle-stroke-width": 2,
          "circle-opacity": 0.98
        }
      });

      map.addLayer({
        id: activeLayerId,
        type: "circle",
        source: sourceId,
        filter: ["==", ["get", "propertyId"], selectedProperty.id],
        paint: {
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 10, 8, 15, 12],
          "circle-color": "#fff4d0",
          "circle-stroke-color": "#D4AF37",
          "circle-stroke-width": 3
        }
      });

      map.on("mouseenter", layerId, () => {
        map.getCanvas().style.cursor = "pointer";
      });

      map.on("mouseleave", layerId, () => {
        map.getCanvas().style.cursor = "";
      });

      map.on("click", layerId, (event) => {
        const feature = event.features?.[0];
        const propertyId = feature?.properties?.propertyId;
        const property = properties.find((item) => item.id === propertyId);

        if (!property) {
          return;
        }

        setActiveConfigFilter(property.configuration);
        setMapMessage(`Pinned on ${property.title} in ${property.area}. The featured dock has been updated.`);
        setSelectedProperty(property);
        focusMapOnProperty(property);
      });
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [selectedProperty.id]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.getLayer(activeLayerId)) {
      return;
    }

    map.setFilter(activeLayerId, ["==", ["get", "propertyId"], selectedProperty.id]);
  }, [selectedProperty.id]);

  useEffect(() => {
    const focusedProperty = findPropertyForArea(focusArea.name);
    setSelectedProperty(focusedProperty);
    setActiveAreaFilter(focusArea.name);
    setMapMessage(`Focused on ${focusArea.name}. The live map and featured property are now aligned.`);

    if (!mapRef.current) {
      return;
    }

    mapRef.current.flyTo({
      center: focusArea.center as LngLatLike,
      zoom: focusArea.zoom,
      speed: 0.8,
      curve: 1.12,
      essential: true
    });
  }, [focusArea.center, focusArea.name, focusArea.zoom]);

  const handleAreaFilter = (area: Neighborhood) => {
    setActiveAreaFilter(area.name);
    const property = findPropertyForArea(area.name);
    setSelectedProperty(property);
    setMapMessage(`Showing ${area.name}. Use the live map to inspect the pinned inventory.`);
    onAreaSelect(area);
  };

  const handleConfigurationFilter = (configuration: string) => {
    const property =
      properties.find(
        (item) =>
          item.configuration.toLowerCase() === configuration.toLowerCase() &&
          item.area.toLowerCase() === activeAreaFilter.toLowerCase()
      ) ??
      properties.find((item) => item.configuration.toLowerCase() === configuration.toLowerCase()) ??
      properties[0];

    setActiveConfigFilter(configuration);
    applySelectedProperty(
      property,
      `Showing ${configuration} inventory. The map is focused on ${property.title} in ${property.area}.`
    );
  };

  const handleIntentFilter = (intent: string) => {
    const normalized = intent.toLowerCase();
    const property =
      properties.find(
        (item) =>
          item.tags.some((tag) => tag.toLowerCase() === normalized) &&
          item.area.toLowerCase() === activeAreaFilter.toLowerCase()
      ) ??
      properties.find((item) => item.tags.some((tag) => tag.toLowerCase() === normalized)) ??
      properties[0];

    setActiveIntentFilter(intent);
    applySelectedProperty(
      property,
      `Showing a ${intent.toLowerCase()}-oriented option. ${property.title} is the current best match.`
    );
  };

  return (
    <section className="relative overflow-hidden border-b border-gold/12 bg-section-glow px-4 pb-10 pt-4 md:px-8 md:pb-12 md:pt-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm font-medium uppercase tracking-[0.38em] text-gold/85">
            FAIR DEAL REAL ESTATE
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/projects"
              className="rounded-full border border-white/12 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-200 transition hover:border-gold/30 hover:text-gold"
            >
              All Projects
            </Link>
            <div className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-[0.26em] text-gold">
              <ShieldCheck size={14} />
              RERA Verified | A51700031228
            </div>
          </div>
        </div>

        <div className="grid gap-7 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div className="space-y-5">
            <div className="rounded-[2.25rem] border border-white/8 bg-[linear-gradient(180deg,rgba(16,16,16,0.78),rgba(10,10,10,0.38))] p-6 shadow-panel md:p-7">
              <p className="text-xs uppercase tracking-[0.34em] text-gold/80">PCMC Real Estate Advisory</p>
              <h1 className="mt-3 max-w-2xl text-4xl leading-[0.92] text-white md:text-[4.6rem]">
                Clear property decisions
                <span className="block text-gold">for the PCMC market.</span>
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-stone-200 md:text-base">
                Transparent consulting for buying, selling, renting, and legal or property support
                across Akurdi, Nigdi, Ravet, Kiwale, and Wakad.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#live-map"
                  className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-gold transition hover:bg-gold/25"
                >
                  Explore PCMC
                  <ArrowRight size={15} />
                </a>
                <a
                  href="#concierge"
                  className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/5 px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-sand transition hover:border-gold/30 hover:text-gold"
                >
                  Talk to Advisor
                </a>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.24em]">
              {trustChips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-white/14 bg-white/5 px-4 py-3 text-stone-200"
                >
                  {chip}
                </span>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {proofStats.map((item) => (
                <div key={item.value} className="glass-panel rounded-[1.8rem] p-4">
                  <p className="text-xl font-semibold text-gold md:text-2xl">{item.value}</p>
                  <p className="mt-2 text-xs leading-5 text-stone-300">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="overflow-hidden rounded-[2.2rem] border border-gold/18 bg-[linear-gradient(180deg,rgba(24,24,24,0.94),rgba(8,8,8,0.98))] shadow-panel">
              <div className="grid gap-0 md:grid-cols-[1.05fr_0.95fr]">
                <div className="relative min-h-[240px] overflow-hidden md:min-h-[320px]">
                  <img
                    src={selectedProperty.image}
                    alt={selectedProperty.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.88))]" />
                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-black/35 px-3 py-2 text-[11px] uppercase tracking-[0.24em] text-gold">
                      <MapPin size={13} />
                      {selectedProperty.area}
                    </div>
                    <h2 className="mt-3 text-2xl text-sand md:text-3xl">{selectedProperty.title}</h2>
                    <p className="mt-2 text-sm font-semibold text-white md:text-base">
                      {selectedProperty.configuration} - {selectedProperty.price}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-between p-5 md:p-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-gold">Featured Property</p>
                    <p className="mt-3 text-sm leading-6 text-stone-300">{selectedProperty.summary}</p>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="min-w-0 rounded-[1.2rem] border border-white/10 bg-white/5 p-3">
                      <p className="text-[10px] uppercase tracking-[0.24em] text-stone-400">Area</p>
                      <p className="mt-2 truncate text-sm text-sand">{selectedProperty.area}</p>
                    </div>
                    <div className="min-w-0 rounded-[1.2rem] border border-white/10 bg-white/5 p-3">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400">Config</p>
                      <p className="mt-2 truncate text-sm text-sand">{selectedProperty.configuration}</p>
                    </div>
                    <div className="min-w-0 rounded-[1.2rem] border border-white/10 bg-white/5 p-3 sm:col-span-2">
                      <p className="text-[10px] uppercase tracking-[0.24em] text-stone-400">Price</p>
                      <p className="mt-2 truncate text-sm text-sand">{selectedProperty.price}</p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      to={`/projects/${selectedProperty.id}`}
                      className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-gold transition hover:bg-gold/25"
                    >
                      View Details
                      <ArrowRight size={14} />
                    </Link>
                    <button
                      type="button"
                      onClick={() =>
                        handleAreaFilter(
                          neighborhoods.find((area) => area.name === selectedProperty.area) ?? focusArea
                        )
                      }
                      className="rounded-full border border-white/12 bg-white/5 px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-stone-200 transition hover:border-gold/30 hover:text-gold"
                    >
                      Center on map
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[1.7rem] border border-gold/16 bg-[linear-gradient(180deg,rgba(18,18,18,0.88),rgba(8,8,8,0.96))] p-4 shadow-panel">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-gold">Guided Discovery</p>
                  <p className="mt-1 text-sm leading-6 text-stone-300">
                    Use chips to browse locality, configuration, and intent without a bulky search block.
                  </p>
                </div>
                <div className="self-start rounded-full border border-gold/18 bg-gold/8 px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-gold/90 md:self-auto whitespace-nowrap">
                  Tap chips to update map
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <div className="flex flex-wrap gap-2">
                  {configurationFilters.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleConfigurationFilter(item)}
                      className={`rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] transition ${
                        activeConfigFilter === item
                          ? "border-gold bg-gold/15 text-gold"
                          : "border-white/12 bg-white/5 text-stone-300 hover:border-gold/30 hover:text-gold"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {intentFilters.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleIntentFilter(item)}
                      className={`rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] transition ${
                        activeIntentFilter === item
                          ? "border-gold bg-gold/15 text-gold"
                          : "border-white/12 bg-white/5 text-stone-300 hover:border-gold/30 hover:text-gold"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}

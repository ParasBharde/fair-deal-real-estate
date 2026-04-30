import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageSeo } from "../hooks/usePageSeo";
import { buildAbsoluteUrl, siteConfig } from "../lib/site";
import { neighborhoods, properties } from "../data/content";

const configurationOptions = ["All", "2BHK", "3BHK"] as const;

export default function ProjectsPage() {
  const [areaFilter, setAreaFilter] = useState("All");
  const [configurationFilter, setConfigurationFilter] = useState("All");

  const filteredProperties = properties.filter((property) => {
    const areaMatches = areaFilter === "All" || property.area === areaFilter;
    const configurationMatches =
      configurationFilter === "All" || property.configuration === configurationFilter;

    return areaMatches && configurationMatches;
  });

  usePageSeo({
    title: `All Projects | ${siteConfig.name}`,
    description:
      "Browse current FAIR DEAL REAL ESTATE listings across Akurdi, Nigdi, Ravet, Kiwale, and Wakad, with cleaner comparison for area and configuration.",
    pathname: "/projects",
    image: properties[0]?.image,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `All Projects | ${siteConfig.name}`,
      url: buildAbsoluteUrl("/projects"),
      mainEntity: {
        "@type": "ItemList",
        itemListElement: properties.map((property, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: buildAbsoluteUrl(`/projects/${property.id}`),
          name: property.title
        }))
      }
    }
  });

  return (
    <main className="min-h-screen bg-section-glow px-4 py-8 text-body md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[2.3rem] border border-primary/18 bg-[linear-gradient(180deg,rgba(var(--color-surface),0.92),rgba(var(--color-background),0.98))] p-7 shadow-panel md:p-10">
          <p className="text-xs uppercase tracking-[0.34em] text-primary/85">Project Directory</p>
          <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="text-5xl leading-[0.92] text-heading md:text-7xl">All Projects</h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-text md:text-base">
                Browse the current FAIR DEAL REAL ESTATE listing set across Akurdi, Nigdi, Ravet,
                Kiwale, and Wakad. This page is built for cleaner comparison than the hero map.
              </p>
            </div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-heading transition hover:border-primary/30 hover:text-primary"
            >
              Back to Home
            </Link>
          </div>
        </div>

        <div className="mt-8 rounded-[2rem] border border-primary/14 bg-[linear-gradient(180deg,rgba(var(--color-surface),0.88),rgba(var(--color-background),0.96))] p-5 shadow-panel md:p-6">
          <div className="flex items-center gap-3 text-primary">
            <SlidersHorizontal size={18} />
            <p className="text-xs uppercase tracking-[0.3em]">Filter Projects</p>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-muted-text-more">Area</p>
              <div className="flex flex-wrap gap-2">
                {["All", ...neighborhoods.map((item) => item.name)].map((area) => (
                  <button
                    key={area}
                    type="button"
                    onClick={() => setAreaFilter(area)}
                    className={`rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] transition ${
                      areaFilter === area
                        ? "border-primary bg-primary/15 text-primary"
                        : "border-glass-border bg-glass text-muted-text hover:border-primary/30 hover:text-primary"
                    }`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-muted-text-more">Configuration</p>
              <div className="flex flex-wrap gap-2">
                {configurationOptions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setConfigurationFilter(item)}
                    className={`rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] transition ${
                      configurationFilter === item
                        ? "border-primary bg-primary/15 text-primary"
                        : "border-glass-border bg-glass text-muted-text hover:border-primary/30 hover:text-primary"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {filteredProperties.map((property, index) => (
            <motion.article
              key={property.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.35 }}
              className="overflow-hidden rounded-[1.9rem] border border-primary/14 bg-[linear-gradient(180deg,rgba(var(--color-surface),0.9),rgba(var(--color-background),0.98))] shadow-panel"
            >
              <img src={property.image} alt={property.title} className="h-60 w-full object-cover" />
              <div className="p-5">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-primary/85">
                  <MapPin size={13} />
                  {property.area}
                </div>
                <h2 className="mt-3 text-3xl text-heading">{property.title}</h2>
                <p className="mt-2 text-lg font-semibold text-heading">
                  {property.configuration} - {property.price}
                </p>
                <p className="mt-4 text-sm leading-7 text-muted-text">{property.summary}</p>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <p className="text-xs uppercase tracking-[0.22em] text-muted-text-more">{property.size}</p>
                  <Link
                    to={`/projects/${property.id}`}
                    className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary transition hover:bg-primary/25"
                  >
                    View Details
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </main>
  );
}

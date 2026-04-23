import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeIndianRupee,
  Building2,
  CalendarClock,
  Check,
  CheckCheck,
  Compass,
  Copy,
  MapPin,
  MoveRight,
  Ruler,
  Share2
} from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getPropertyById, getRelatedProperties } from "../data/content";
import { usePageSeo } from "../hooks/usePageSeo";
import { buildAbsoluteUrl, siteConfig } from "../lib/site";

export default function PropertyDetailPage() {
  const { propertyId } = useParams();
  const property = propertyId ? getPropertyById(propertyId) : undefined;
  const [shareState, setShareState] = useState<"idle" | "copied">("idle");

  if (!property) {
    return <Navigate to="/projects" replace />;
  }

  const relatedProjects = getRelatedProperties(property.id, property.area);
  const propertyPath = `/projects/${property.id}`;
  const propertyUrl = buildAbsoluteUrl(propertyPath);
  const seoTitle = `${property.title} | ${property.configuration} in ${property.area} | ${siteConfig.name}`;
  const seoDescription = `${property.summary} ${property.overview}`;
  const structuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: buildAbsoluteUrl("/")
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Projects",
              item: buildAbsoluteUrl("/projects")
            },
            {
              "@type": "ListItem",
              position: 3,
              name: property.title,
              item: propertyUrl
            }
          ]
        },
        {
          "@type": "Residence",
          name: property.title,
          description: seoDescription,
          url: propertyUrl,
          image: property.gallery,
          address: {
            "@type": "PostalAddress",
            streetAddress: property.address,
            addressLocality: property.area,
            addressRegion: "PCMC, Maharashtra",
            addressCountry: "IN"
          },
          offers: {
            "@type": "Offer",
            priceCurrency: "INR",
            availability:
              property.status === "Ready Inventory"
                ? "https://schema.org/InStock"
                : "https://schema.org/PreOrder",
            url: propertyUrl
          }
        }
      ]
    }),
    [property.address, property.area, property.gallery, property.status, property.title, propertyUrl, seoDescription]
  );

  usePageSeo({
    title: seoTitle,
    description: seoDescription,
    pathname: propertyPath,
    image: property.image,
    type: "article",
    structuredData
  });

  const handleShare = async () => {
    const shareUrl = window.location.href || propertyUrl;
    const sharePayload = {
      title: property.title,
      text: `${property.configuration} in ${property.area} for ${property.price}. ${property.summary}`,
      url: shareUrl
    };

    try {
      if (navigator.share) {
        await navigator.share(sharePayload);
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        setShareState("copied");
        window.setTimeout(() => setShareState("idle"), 2200);
        return;
      }

      const temporaryInput = document.createElement("input");
      temporaryInput.value = shareUrl;
      document.body.appendChild(temporaryInput);
      temporaryInput.select();
      document.execCommand("copy");
      document.body.removeChild(temporaryInput);
      setShareState("copied");
      window.setTimeout(() => setShareState("idle"), 2200);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
    }
  };

  return (
    <main className="min-h-screen bg-section-glow px-4 py-8 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-stone-400">
          <Link to="/" className="transition hover:text-gold">
            Home
          </Link>
          <span>/</span>
          <Link to="/projects" className="transition hover:text-gold">
            Projects
          </Link>
          <span>/</span>
          <span className="text-gold">{property.title}</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="rounded-[2.3rem] border border-white/8 bg-[linear-gradient(180deg,rgba(16,16,16,0.82),rgba(8,8,8,0.98))] p-7 shadow-panel md:p-9">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-gold">
                  {property.status}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-stone-300">
                  {property.area}
                </span>
              </div>
              <h1 className="mt-5 max-w-4xl text-5xl leading-[0.92] text-sand md:text-7xl">
                {property.title}
              </h1>
              <p className="mt-5 max-w-3xl text-sm leading-7 text-stone-300 md:text-base">
                {property.overview}
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-2 text-gold">
                    <BadgeIndianRupee size={16} />
                    <p className="text-[10px] uppercase tracking-[0.24em]">Price</p>
                  </div>
                  <p className="mt-3 text-lg text-sand">{property.price}</p>
                </div>
                <div className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-2 text-gold">
                    <Building2 size={16} />
                    <p className="text-[10px] uppercase tracking-[0.24em]">Configuration</p>
                  </div>
                  <p className="mt-3 text-lg text-sand">{property.configuration}</p>
                </div>
                <div className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-2 text-gold">
                    <Ruler size={16} />
                    <p className="text-[10px] uppercase tracking-[0.24em]">Size</p>
                  </div>
                  <p className="mt-3 text-lg text-sand">{property.size}</p>
                </div>
                <div className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-2 text-gold">
                    <CalendarClock size={16} />
                    <p className="text-[10px] uppercase tracking-[0.24em]">Possession</p>
                  </div>
                  <p className="mt-3 text-lg text-sand">{property.possession}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-[1.3fr_0.7fr]">
              <div className="overflow-hidden rounded-[2rem] border border-gold/14 bg-[linear-gradient(180deg,rgba(20,20,20,0.92),rgba(8,8,8,0.98))] shadow-panel">
                <img src={property.gallery[0]} alt={property.title} className="h-[420px] w-full object-cover" />
              </div>
              <div className="grid gap-4">
                {property.gallery.slice(1).map((image, index) => (
                  <div
                    key={image}
                    className="overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/5 shadow-panel"
                  >
                    <img
                      src={image}
                      alt={`${property.title} gallery ${index + 2}`}
                      className="h-[202px] w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <section className="rounded-[2rem] border border-gold/14 bg-[linear-gradient(180deg,rgba(18,18,18,0.88),rgba(8,8,8,0.96))] p-6 shadow-panel">
                <p className="text-xs uppercase tracking-[0.3em] text-gold">Project Highlights</p>
                <div className="mt-5 space-y-4">
                  {property.highlights.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="mt-1 rounded-full border border-gold/20 bg-gold/10 p-1 text-gold">
                        <Check size={12} />
                      </span>
                      <p className="text-sm leading-7 text-stone-300">{item}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-[2rem] border border-gold/14 bg-[linear-gradient(180deg,rgba(18,18,18,0.88),rgba(8,8,8,0.96))] p-6 shadow-panel">
                <p className="text-xs uppercase tracking-[0.3em] text-gold">Amenities</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {property.amenities.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-xs uppercase tracking-[0.22em] text-stone-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </div>

          <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-[2rem] border border-gold/18 bg-[linear-gradient(180deg,rgba(24,24,24,0.94),rgba(8,8,8,0.98))] p-6 shadow-panel">
              <p className="text-xs uppercase tracking-[0.3em] text-gold">Project Snapshot</p>
              <div className="mt-5 space-y-4 text-sm text-stone-300">
                <div className="rounded-[1.3rem] border border-white/10 bg-white/5 p-4">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-stone-400">Address</p>
                  <div className="mt-2 flex items-start gap-2">
                    <MapPin size={14} className="mt-1 text-gold" />
                    <p>{property.address}</p>
                  </div>
                </div>
                <div className="rounded-[1.3rem] border border-white/10 bg-white/5 p-4">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-stone-400">Status</p>
                  <p className="mt-2">{property.status}</p>
                </div>
                <div className="rounded-[1.3rem] border border-white/10 bg-white/5 p-4">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-stone-400">Possession</p>
                  <p className="mt-2">{property.possession}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/5 px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-stone-200 transition hover:border-gold/30 hover:text-gold"
                >
                  {shareState === "copied" ? <CheckCheck size={14} /> : <Share2 size={14} />}
                  {shareState === "copied" ? "Link Copied" : "Share Property"}
                </button>
                <Link
                  to="/#concierge"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-gold transition hover:bg-gold/25"
                >
                  Request Callback
                  <ArrowRight size={14} />
                </Link>
                <Link
                  to="/projects"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/5 px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-stone-200 transition hover:border-gold/30 hover:text-gold"
                >
                  View All Projects
                </Link>
              </div>
            </div>

            <section className="rounded-[2rem] border border-gold/14 bg-[linear-gradient(180deg,rgba(18,18,18,0.88),rgba(8,8,8,0.96))] p-6 shadow-panel">
              <div className="flex items-center gap-2 text-gold">
                <Compass size={16} />
                <p className="text-xs uppercase tracking-[0.3em]">Best Fit</p>
              </div>
              <p className="mt-4 text-sm leading-7 text-stone-300">
                This project is strongest for buyers who want a clean decision path: strong location
                logic, clear livability value, and a more guided shortlist conversation.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                {property.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-[11px] uppercase tracking-[0.22em] text-stone-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
                <p className="text-[10px] uppercase tracking-[0.24em] text-stone-400">Next Step</p>
                <p className="mt-3 text-sm leading-7 text-stone-300">
                  Shortlist this project, compare it with similar options in {property.area}, and
                  request a callback for pricing, availability, and paperwork support.
                </p>
                <div className="mt-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-stone-300">
                  <Copy size={12} className="text-gold" />
                  Shareable project link available
                </div>
                <div className="mt-4 flex flex-col gap-3">
                  <Link
                    to="/#concierge"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-gold transition hover:bg-gold/25"
                  >
                    Schedule Site Visit
                    <ArrowRight size={14} />
                  </Link>
                  <Link
                    to="/projects"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/5 px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-stone-200 transition hover:border-gold/30 hover:text-gold"
                  >
                    Compare With Other Projects
                  </Link>
                </div>
              </div>
            </section>

            {relatedProjects.length > 0 && (
              <section className="rounded-[2rem] border border-gold/14 bg-[linear-gradient(180deg,rgba(18,18,18,0.88),rgba(8,8,8,0.96))] p-6 shadow-panel">
                <p className="text-xs uppercase tracking-[0.3em] text-gold">Related in {property.area}</p>
                <div className="mt-5 space-y-4">
                  {relatedProjects.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08, duration: 0.3 }}
                      className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4"
                    >
                      <h3 className="text-xl text-sand">{item.title}</h3>
                      <p className="mt-1 text-sm text-white">
                        {item.configuration} - {item.price}
                      </p>
                      <p className="mt-3 text-sm leading-6 text-stone-300">{item.summary}</p>
                      <Link
                        to={`/projects/${item.id}`}
                        className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold transition hover:text-sand"
                      >
                        Open project
                        <MoveRight size={13} />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

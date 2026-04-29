import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Search, ShieldCheck, Sparkles } from "lucide-react";
import type { Highlight, PromisePoint } from "../types";

interface HeroOverlayProps {
  highlights: Highlight[];
  promisePoints: PromisePoint[];
  searchMessage: string;
  onSearch: (query: string) => void;
}

export default function HeroOverlay({
  highlights,
  promisePoints,
  searchMessage,
  onSearch
}: HeroOverlayProps) {
  const [query, setQuery] = useState("");

  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      <div className="mx-auto flex h-full max-w-7xl flex-col justify-between px-4 py-5 md:px-8 md:py-8">
        <div className="flex flex-wrap justify-end gap-3">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-panel pointer-events-auto rounded-full px-4 py-2 text-xs tracking-[0.28em] text-primary"
          >
            <div className="flex items-center gap-2 uppercase">
              <ShieldCheck size={14} />
              <span>RERA Verified | A51700031228</span>
            </div>
          </motion.div>
        </div>

        <div className="grid items-end gap-8 pb-14 pt-10 md:pb-16 md:pt-14 lg:grid-cols-[1.08fr_0.92fr] lg:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-[40rem]"
          >
            <div className="rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(var(--color-background),0.38),rgba(var(--color-background),0.16))] p-5 backdrop-blur-[3px] md:p-7">
              <p className="mb-4 text-xs uppercase tracking-[0.42em] text-primary/90">
                FAIR DEAL REAL ESTATE
              </p>
              <h1 className="text-4xl leading-[0.9] text-white sm:text-5xl md:text-[4.3rem] xl:text-[4.9rem]">
                PCMC real estate,
                <span className="mt-1 block text-primary">with sharper judgment</span>
                <span className="block text-primary">and cleaner execution.</span>
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-7 text-stone-200 md:text-base">
                Transparent, customer-oriented consulting for buying, selling, renting, and ongoing
                support across Akurdi, Nigdi, Ravet, Kiwale, and Wakad.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.24em] text-stone-200">
              {promisePoints.slice(0, 3).map((item) => (
                <span
                  key={item.id}
                  className="rounded-full border border-white/12 bg-white/6 px-4 py-2 backdrop-blur-md"
                >
                  {item.title}
                </span>
              ))}
            </div>

            <div className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.id} className="glass-panel rounded-3xl p-4">
                  <p className="text-2xl font-semibold text-primary md:text-3xl">{item.value}</p>
                  <p className="mt-1 text-xs leading-5 text-stone-300">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-panel pointer-events-auto rounded-[2rem] p-5 md:p-6"
          >
            <p className="text-xs uppercase tracking-[0.28em] text-primary">Search the corridor</p>
            <p className="mt-3 text-3xl leading-none text-accent-light md:text-4xl">
              Search by locality, configuration, or intent.
            </p>
            <p className="mt-4 text-sm leading-6 text-stone-300">
              Try area names like Wakad, home types like 2BHK or 3BHK, and intent words like
              rental, investment, or family.
            </p>

            <form
              className="mt-6"
              onSubmit={(event) => {
                event.preventDefault();
                onSearch(query.trim());
              }}
            >
              <label className="sr-only" htmlFor="property-search">
                Search Area, Configuration, or Intent
              </label>
              <div className="rounded-[1.5rem] border border-primary/20 bg-black/35 p-3">
                <div className="flex items-center gap-3 rounded-[1.2rem] border border-white/8 bg-white/5 px-4 py-3">
                  <Search className="text-primary" size={18} />
                  <input
                    id="property-search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Wakad, 2BHK, rental, investment"
                    className="w-full bg-transparent text-sm text-white placeholder:text-stone-500 focus:outline-none"
                  />
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Wakad", "2BHK", "Rental", "Investment"].map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => {
                        setQuery(chip);
                        onSearch(chip);
                      }}
                      className="rounded-full border border-primary/20 bg-primary/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary transition hover:bg-primary/20"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
                <div className="mt-4 rounded-[1.1rem] border border-white/8 bg-black/30 px-4 py-3">
                  <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-primary/85">
                    <Sparkles size={12} />
                    Active map response
                  </div>
                  <p className="text-xs leading-6 text-stone-300">{searchMessage}</p>
                </div>
              </div>
            </form>

            <div className="mt-5 flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-stone-400">
              <ArrowDown size={14} className="text-primary" />
              Use `+ / -` controls, drag the map, or `Ctrl + scroll` to zoom
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

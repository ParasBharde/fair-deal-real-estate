import { motion } from "framer-motion";
import { ArrowUpRight, MapPinned } from "lucide-react";
import type { Neighborhood } from "../types";

interface NeighborhoodGuideProps {
  neighborhoods: Neighborhood[];
  activeAreaId: string;
  onSelectArea: (area: Neighborhood) => void;
}

export default function NeighborhoodGuide({
  neighborhoods,
  activeAreaId,
  onSelectArea
}: NeighborhoodGuideProps) {
  return (
    <section id="localities" className="section-shell relative z-10 mt-0 px-4 pb-16 md:px-10">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.25rem] border border-primary/18 bg-[linear-gradient(180deg,rgba(var(--color-surface),0.94),rgba(var(--color-background),0.98))] p-6 shadow-panel backdrop-blur-xl md:p-8">
        <div className="flex flex-col gap-4 border-b border-primary/12 pb-6 md:flex-row md:items-end md:justify-between">
          <div className="flex items-start gap-3 text-primary">
            <span className="mt-2 rounded-full border border-primary/20 bg-primary/10 p-2">
              <MapPinned size={18} />
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-primary/80">Map-driven local picks</p>
              <h2 className="mt-1 text-3xl text-accent-light md:text-5xl">PCMC Neighborhood Guide</h2>
              <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-stone-400">
                Tap any area to reposition the hero map and inspect the active micro-market with a
                cleaner, more deliberate browsing flow.
              </p>
            </div>
          </div>

          <div className="glass-panel w-fit rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.26em] text-primary">
            5 localities | live fly-to interaction
          </div>
        </div>

        <div className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 xl:grid xl:grid-cols-5 xl:overflow-visible">
          {neighborhoods.map((area, index) => (
            <motion.button
              key={area.id}
              type="button"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.08, duration: 0.35 }}
              onClick={() => onSelectArea(area)}
              className={`group min-w-[260px] snap-start rounded-[1.7rem] border p-5 text-left transition duration-300 xl:min-w-0 ${
                activeAreaId === area.id
                  ? "border-primary bg-[radial-gradient(circle_at_top_left,rgba(var(--color-primary),0.16),rgba(0,0,0,0.2)_55%),linear-gradient(180deg,rgba(28,28,28,0.96),rgba(10,10,10,0.98))] text-primary shadow-primary"
                  : "border-white/8 bg-[linear-gradient(180deg,rgba(20,20,20,0.82),rgba(8,8,8,0.96))] text-zinc-200 hover:border-primary/30 hover:-translate-y-1"
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="text-[11px] uppercase tracking-[0.3em] text-primary/80">
                  0{index + 1}
                </span>
                <ArrowUpRight
                  size={16}
                  className={`transition ${activeAreaId === area.id ? "text-primary" : "text-stone-500 group-hover:text-primary"}`}
                />
              </div>
              <p className="mt-5 text-[11px] uppercase tracking-[0.28em] text-primary/90">{area.tagline}</p>
              <p className="mt-3 text-3xl leading-none text-accent-light">{area.name}</p>
              <p className="mt-4 text-sm leading-6 text-stone-300">{area.snapshot}</p>
              <div className="mt-6 inline-flex rounded-full border border-primary/15 bg-black/35 px-3 py-2 text-[10px] uppercase tracking-[0.26em] text-stone-400">
                Tap to focus map
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

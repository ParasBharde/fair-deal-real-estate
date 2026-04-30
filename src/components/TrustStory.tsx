import { motion } from "framer-motion";
import { BadgeIndianRupee, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import type { Highlight, PromisePoint } from "../types";

interface TrustStoryProps {
  highlights: Highlight[];
  promisePoints: PromisePoint[];
}

const iconMap = {
  transparent: ShieldCheck,
  rental: BadgeIndianRupee,
  legal: ShieldCheck,
  solution: HeartHandshake
};

export default function TrustStory({ highlights, promisePoints }: TrustStoryProps) {
  return (
    <section className="section-shell border-y border-primary/15 bg-section-glow px-4 py-16 md:px-10">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-ink-deep/10 bg-white/95 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-ink-deep shadow-sm">
            <Sparkles size={14} />
            Why Clients Return
          </div>
          <h2 className="mt-5 text-4xl leading-none text-heading md:text-6xl">
            A rental-first,
            <span className="block text-primary">customer-shaped consulting model.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-text md:text-base">
            FAIR DEAL REAL ESTATE is positioned around practical need, not generic inventory
            pushing. The offer is clear: transparent advice, sharper locality selection, legal
            support, and real after-deal help across the PCMC market.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {highlights.map((item) => (
              <div key={item.id} className="glass-panel rounded-3xl p-5">
                <p className="text-3xl font-semibold text-primary md:text-4xl">{item.value}</p>
                <p className="mt-2 text-sm leading-6 text-muted-text">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } }
          }}
          className="grid gap-4"
        >
          {promisePoints.map((item, index) => {
            const Icon = iconMap[item.id as keyof typeof iconMap] ?? ShieldCheck;
            const isNavy = index % 2 === 0;

            return (
              <motion.article
                key={item.id}
                variants={{
                  hidden: { opacity: 0, x: 24 },
                  show: { opacity: 1, x: 0 }
                }}
                className={`rounded-3xl border p-5 shadow-panel ${
                  isNavy
                    ? "border-primary/20 bg-ink"
                    : "glass-panel"
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className={`rounded-2xl border p-3 ${
                    isNavy 
                      ? "border-primary/30 bg-primary/20 text-primary" 
                      : "border-primary/20 bg-primary/10 text-primary"
                  }`}>
                    <Icon size={20} />
                  </span>
                  <div>
                    <h3 className={`text-xl ${isNavy ? "text-ink-deep" : "text-heading"}`}>{item.title}</h3>
                    <p className={`mt-2 text-sm leading-6 ${isNavy ? "text-ink-deep/70" : "text-muted-text"}`}>{item.description}</p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { ArrowRight, MapPinHouse } from "lucide-react";

export default function ClosingBanner() {
  return (
    <section className="px-4 pb-16 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-gold/25 bg-hero-radiance p-8 shadow-panel md:p-10"
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-black/35 px-4 py-2 text-xs uppercase tracking-[0.28em] text-gold">
              <MapPinHouse size={14} />
              PCMC Local Advantage
            </div>
            <h2 className="mt-5 text-4xl leading-none text-sand md:text-6xl">
              Better local judgment. Cleaner execution. Stronger client trust.
            </h2>
            <p className="mt-5 text-sm leading-7 text-stone-200 md:text-base">
              The revised site now carries the right tone: focused, premium, transparent, and
              practical. It should feel like a consultancy that knows the market, not a generic
              listing portal.
            </p>
          </div>

          <a
            href="#concierge"
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-black/45 px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-gold transition hover:bg-gold/15"
          >
            Start your brief
            <ArrowRight size={16} />
          </a>
        </div>
      </motion.div>
    </section>
  );
}

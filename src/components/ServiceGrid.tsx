import { motion } from "framer-motion";
import { Home, KeyRound, Scale, Wrench } from "lucide-react";
import type { Service } from "../types";

interface ServiceGridProps {
  services: Service[];
}

const iconMap = {
  scale: Scale,
  home: Home,
  key: KeyRound,
  wrench: Wrench
};

export default function ServiceGrid({ services }: ServiceGridProps) {
  return (
    <section className="section-shell px-4 py-16 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Consulting Stack</p>
            <h2 className="mt-3 text-4xl leading-none text-heading md:text-6xl">End-to-end real estate services.</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-muted-text">
            Structured to feel premium but practical: legal depth, transactional control, rental
            handling, and maintenance support in one system.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } }
          }}
          className="mt-10 grid gap-5 md:grid-cols-2"
        >
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            const isNavy = index === 0 || index === services.length - 1;
            return (
              <motion.article
                key={service.id}
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.45 } }
                }}
                className={`group relative overflow-hidden rounded-[2rem] border-[1.5px] p-6 shadow-panel ${
                  isNavy
                    ? "border-primary/40 bg-ink"
                    : "border-primary/10 bg-[linear-gradient(180deg,rgba(var(--color-surface),0.86),rgba(var(--color-background),0.96))]"
                }`}
              >
                <div className={`absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 ${
                  isNavy 
                    ? "bg-[radial-gradient(circle_at_top_right,rgba(var(--color-primary),0.08),transparent_40%)]" 
                    : "bg-[radial-gradient(circle_at_top_right,rgba(var(--color-primary),0.12),transparent_28%)]"
                }`} />
                <div className="relative flex items-start gap-4">
                  <span className={`rounded-2xl border p-3 ${
                    isNavy 
                      ? "border-primary/30 bg-primary/20 text-primary" 
                      : "border-primary/20 bg-primary/10 text-primary"
                  }`}>
                    <Icon size={20} />
                  </span>
                  <div>
                    <h3 className={`text-3xl leading-none ${isNavy ? "text-ink-deep" : "text-heading"}`}>{service.title}</h3>
                    <p className={`mt-3 text-sm leading-7 ${isNavy ? "text-ink-deep/70" : "text-muted-text"}`}>{service.description}</p>
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

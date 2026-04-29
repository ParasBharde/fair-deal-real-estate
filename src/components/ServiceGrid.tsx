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
            <h2 className="mt-3 text-4xl leading-none text-accent-light md:text-6xl">End-to-end real estate services.</h2>
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
          {services.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.article
                key={service.id}
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.45 } }
                }}
                className="group relative overflow-hidden rounded-[2rem] border border-primary/18 bg-[linear-gradient(180deg,rgba(var(--color-surface),0.86),rgba(var(--color-background),0.96))] p-6 shadow-panel"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--color-primary),0.12),transparent_28%)] opacity-0 transition duration-300 group-hover:opacity-100" />
                <div className="relative flex items-start gap-4">
                  <span className="rounded-2xl border border-primary/20 bg-primary/10 p-3 text-primary">
                    <Icon size={20} />
                  </span>
                  <div>
                    <h3 className="text-3xl leading-none text-accent-light">{service.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-text">{service.description}</p>
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

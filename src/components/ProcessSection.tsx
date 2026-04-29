import { motion } from "framer-motion";
import { ArrowUpRight, Wrench } from "lucide-react";
import type { ProcessStep, SupportService } from "../types";

interface ProcessSectionProps {
  processSteps: ProcessStep[];
  supportServices: SupportService[];
}

export default function ProcessSection({ processSteps, supportServices }: ProcessSectionProps) {
  return (
    <section className="section-shell px-4 py-16 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="glass-panel rounded-[2rem] p-6 md:p-8"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-primary">One Stop Flow</p>
            <h2 className="mt-4 text-4xl leading-none text-accent-light md:text-5xl">
              From first brief to post-deal support.
            </h2>
            <div className="mt-8 grid gap-5">
              {processSteps.map((step, index) => (
                <div key={step.id} className="border-l border-primary/20 pl-5">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                      0{index + 1}
                    </span>
                    <ArrowUpRight size={16} className="text-primary" />
                  </div>
                  <h3 className="mt-2 text-2xl text-accent-light">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-text">{step.detail}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="relative overflow-hidden rounded-[2rem] border border-primary/20 bg-[linear-gradient(180deg,rgba(var(--color-primary),0.08),rgba(var(--color-midnight-8),0.95))] p-6 shadow-panel md:p-8"
          >
            <div className="primary-grid absolute inset-0 opacity-50" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-dark-panel px-4 py-2 text-xs uppercase tracking-[0.26em] text-primary">
                <Wrench size={14} />
                Value Add Services
              </div>
              <h3 className="mt-5 text-4xl leading-none text-accent-light md:text-5xl">
                Practical support after the paperwork.
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-7 text-muted-text">
                Your reference note was right on this point. The differentiator is not only the
                transaction, it is the support layer around it.
              </p>
              <div className="mt-8 space-y-4">
                {supportServices.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-3xl border border-primary/20 bg-dark-panel p-5 backdrop-blur-md"
                  >
                    <h4 className="text-2xl text-accent-light">{item.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-muted-text">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

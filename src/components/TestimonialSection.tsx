import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import type { Testimonial } from "../types";

interface TestimonialSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialSection({ testimonials }: TestimonialSectionProps) {
  return (
    <section className="section-shell bg-section-glow px-4 py-16 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Testimonials</p>
            <h2 className="mt-3 text-4xl leading-none text-sand md:text-6xl">
              Written trust beats polished claims.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-stone-300">
            The brand tone should feel human and customer-oriented. These cards are shaped around
            that: clear outcomes, direct language, and local context.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="glass-panel rounded-[2rem] p-6"
            >
              <div className="flex items-center justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-full border border-gold/30 bg-gold/10 text-sm font-semibold text-gold">
                  {item.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <Quote className="text-gold/70" size={20} />
              </div>
              <p className="mt-5 text-sm leading-7 text-stone-200">"{item.quote}"</p>
              <div className="mt-6 border-t border-gold/15 pt-4">
                <p className="text-base font-semibold text-sand">{item.name}</p>
                <p className="text-sm text-stone-400">
                  {item.role} • {item.area}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

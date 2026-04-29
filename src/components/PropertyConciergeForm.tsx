import { FormEvent } from "react";
import { motion } from "framer-motion";
import { ClipboardCheck, PhoneCall } from "lucide-react";

export default function PropertyConciergeForm() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <section id="concierge" className="section-shell px-4 py-16 md:px-10">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
          className="rounded-[2rem] border border-primary/20 bg-hero-radiance p-7 shadow-panel md:p-8"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Property Concierge</p>
          <h2 className="mt-4 text-4xl leading-none text-accent-light md:text-5xl">
            Brief us once. Get a smarter shortlist back.
          </h2>
          <p className="mt-5 text-sm leading-7 text-muted-text-less">
            The form is intentionally minimal. The tone should feel premium and low-friction, not
            like a lead dump page.
          </p>

          <div className="mt-8 space-y-4">
            <div className="glass-panel rounded-3xl p-5">
              <div className="flex items-center gap-3 text-primary">
                <ClipboardCheck size={18} />
                <p className="text-sm font-semibold uppercase tracking-[0.22em]">Clear requirement capture</p>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-text">
                Budget, locality, purpose, and timing are enough to start a meaningful conversation.
              </p>
            </div>
            <div className="glass-panel rounded-3xl p-5">
              <div className="flex items-center gap-3 text-primary">
                <PhoneCall size={18} />
                <p className="text-sm font-semibold uppercase tracking-[0.22em]">Fast response flow</p>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-text">
                Designed for direct follow-up, not endless back-and-forth before the first shortlist.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="glass-panel rounded-[2rem] p-6 md:p-8"
        >
          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              placeholder="Full Name"
              className="rounded-2xl border border-glass-border bg-dark-panel px-4 py-4 text-sm text-heading placeholder:text-muted-text-more focus:border-primary/45 focus:outline-none"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="rounded-2xl border border-glass-border bg-dark-panel px-4 py-4 text-sm text-heading placeholder:text-muted-text-more focus:border-primary/45 focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="Preferred Area"
              className="rounded-2xl border border-glass-border bg-dark-panel px-4 py-4 text-sm text-heading placeholder:text-muted-text-more focus:border-primary/45 focus:outline-none"
            />
            <select
              className="rounded-2xl border border-glass-border bg-dark-panel px-4 py-4 text-sm text-heading focus:border-primary/45 focus:outline-none"
              defaultValue=""
            >
              <option value="" disabled>
                Budget Range
              </option>
              <option value="rental">Rental Requirement</option>
              <option value="50-75">50L - 75L</option>
              <option value="75-100">75L - 1Cr</option>
              <option value="100-plus">1Cr+</option>
            </select>
            <select
              className="rounded-2xl border border-glass-border bg-dark-panel px-4 py-4 text-sm text-heading focus:border-primary/45 focus:outline-none"
              defaultValue=""
            >
              <option value="" disabled>
                Purpose
              </option>
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
              <option value="rent">Rent</option>
              <option value="manage">Maintenance Support</option>
            </select>
            <input
              type="text"
              placeholder="Preferred Configuration"
              className="rounded-2xl border border-glass-border bg-dark-panel px-4 py-4 text-sm text-heading placeholder:text-muted-text-more focus:border-primary/45 focus:outline-none"
            />
            <textarea
              placeholder="Tell us what matters most: possession timeline, rental yield, school access, legal clarity, low maintenance, or anything else."
              rows={5}
              className="rounded-2xl border border-glass-border bg-dark-panel px-4 py-4 text-sm text-heading placeholder:text-muted-text-more focus:border-primary/45 focus:outline-none md:col-span-2"
            />
            <button
              type="submit"
              className="rounded-2xl border border-primary/45 bg-primary/15 px-5 py-4 text-xs font-semibold uppercase tracking-[0.28em] text-primary transition hover:bg-primary/25 md:col-span-2"
            >
              Request a callback
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

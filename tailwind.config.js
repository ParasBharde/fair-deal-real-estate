/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgba(var(--color-primary), <alpha-value>)",
        background: "rgba(var(--color-background), <alpha-value>)",
        surface: "rgba(var(--color-surface), <alpha-value>)",
        "accent-light": "rgba(var(--color-accent-light), <alpha-value>)",
        bronze: "rgba(var(--color-bronze), <alpha-value>)",
        ink: "rgba(var(--color-ink), <alpha-value>)",
        "ink-deep": "rgba(var(--color-ink-deep), <alpha-value>)",
        "accent-gold": "rgba(var(--color-accent-gold), <alpha-value>)",
        muted: "var(--muted)",
        glass: "var(--glass-bg)",
        "glass-strong": "var(--glass-bg-strong)",
        "glass-border": "var(--glass-border)",
        pink: "rgba(var(--color-ink), <alpha-value>)",
        "dark-panel": "rgba(var(--color-ink-deep), 0.04)",
        "dark-panel-strong": "rgba(var(--color-ink-deep), 0.08)",
        "navy": "rgba(var(--color-ink), <alpha-value>)",
        white: "rgba(var(--color-white), <alpha-value>)",
        black: "rgba(var(--color-black), <alpha-value>)",
        "stone-200": "rgba(var(--color-stone-200), <alpha-value>)",
        "stone-300": "rgba(var(--color-stone-300), <alpha-value>)",
        "stone-400": "rgba(var(--color-stone-400), <alpha-value>)",
        "stone-500": "rgba(var(--color-stone-500), <alpha-value>)",
        "zinc-200": "rgba(var(--color-zinc-200), <alpha-value>)",
        "zinc-300": "rgba(var(--color-zinc-300), <alpha-value>)",
        "heading": "var(--text-heading)",
        "body": "var(--text-body)",
        "muted-text": "var(--text-muted)",
        "muted-text-more": "var(--text-muted-more)",
        "muted-text-less": "var(--text-muted-less)"
      },
      boxShadow: {
        primary: "0 10px 30px rgba(var(--color-primary), 0.2)",
        glass: "0 10px 35px rgba(var(--color-ink-deep), 0.06)",
        panel: "0 24px 80px rgba(var(--color-ink-deep), 0.1)"
      },
      backgroundImage: {
        "premium-fade": "radial-gradient(circle at 20% 20%, rgba(var(--color-primary), 0.08), rgba(var(--color-background), 1) 70%)",
        "hero-radiance":
          "radial-gradient(circle at top left, rgba(var(--color-primary), 0.15), transparent 40%), radial-gradient(circle at 80% 15%, rgba(var(--color-ink), 0.03), transparent 25%), linear-gradient(135deg, rgba(var(--color-background), 0.98), rgba(var(--color-accent-light), 0.92))",
        "section-glow":
          "radial-gradient(circle at 15% 10%, rgba(var(--color-primary), 0.08), transparent 30%), radial-gradient(circle at 85% 0%, rgba(var(--color-primary), 0.05), transparent 25%), linear-gradient(180deg, rgba(var(--color-background), 1), rgba(var(--color-surface), 1))"
      }
    }
  },
  plugins: []
};

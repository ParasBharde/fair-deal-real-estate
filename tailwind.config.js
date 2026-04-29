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
        ink: "rgba(var(--color-ink), <alpha-value>)"
      },
      boxShadow: {
        primary: "0 10px 30px rgba(var(--color-primary), 0.25)",
        glass: "0 10px 35px rgba(0, 0, 0, 0.45)",
        panel: "0 24px 80px rgba(0, 0, 0, 0.55)"
      },
      backgroundImage: {
        "midnight-fade": "radial-gradient(circle at 20% 20%, rgba(var(--color-primary), 0.12), rgba(var(--color-background), 0.95) 60%)",
        "hero-radiance":
          "radial-gradient(circle at top left, rgba(var(--color-primary), 0.25), transparent 32%), radial-gradient(circle at 80% 15%, rgba(255,255,255,0.07), transparent 20%), linear-gradient(135deg, rgba(var(--color-background), 0.94), rgba(var(--color-ink), 0.82))",
        "section-glow":
          "radial-gradient(circle at 15% 10%, rgba(var(--color-primary), 0.18), transparent 24%), radial-gradient(circle at 85% 0%, rgba(var(--color-bronze), 0.14), transparent 22%), linear-gradient(180deg, rgba(var(--color-ink), 0.98), rgba(var(--color-background), 1))"
      }
    }
  },
  plugins: []
};

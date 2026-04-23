/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#000000",
        charcoal: "#1a1a1a",
        gold: "#D4AF37",
        bronze: "#8F6B22",
        sand: "#F4E7BF",
        ink: "#0C0C0C"
      },
      boxShadow: {
        gold: "0 10px 30px rgba(212, 175, 55, 0.25)",
        glass: "0 10px 35px rgba(0, 0, 0, 0.45)",
        panel: "0 24px 80px rgba(0, 0, 0, 0.55)"
      },
      backgroundImage: {
        "midnight-fade": "radial-gradient(circle at 20% 20%, rgba(212,175,55,0.12), rgba(0,0,0,0.95) 60%)",
        "hero-radiance":
          "radial-gradient(circle at top left, rgba(212,175,55,0.25), transparent 32%), radial-gradient(circle at 80% 15%, rgba(255,255,255,0.07), transparent 20%), linear-gradient(135deg, rgba(0,0,0,0.94), rgba(11,11,11,0.82))",
        "section-glow":
          "radial-gradient(circle at 15% 10%, rgba(212,175,55,0.18), transparent 24%), radial-gradient(circle at 85% 0%, rgba(143,107,34,0.14), transparent 22%), linear-gradient(180deg, rgba(8,8,8,0.98), rgba(0,0,0,1))"
      }
    }
  },
  plugins: []
};

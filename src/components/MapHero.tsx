import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Users,
  BarChart3,
  TrendingUp,
  LineChart
} from "lucide-react";

const themeColors = {
  primary: "#c4a47c",
  accent: "#ffffff",
};

const showcaseImages = [
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80"
];

const proofStats = [
  { 
    value: "23+", 
    label: "Expert Relationships", 
    icon: <Users size={18} className="text-[#c4a47c]" />,
    detail: "Direct Channel Partners"
  },
  { 
    value: "PCMC", 
    label: "Market Mastery", 
    icon: <TrendingUp size={18} className="text-[#c4a47c]" />,
    detail: "Localized Intelligence"
  },
  { 
    value: "Zero", 
    label: "Hidden Charges", 
    icon: <ShieldCheck size={18} className="text-[#c4a47c]" />,
    detail: "Transparent Advisory"
  }
];

export default function MapHero() {
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImg((prev) => (prev + 1) % showcaseImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen w-full section-shell bg-section-glow font-sans selection:bg-primary/30 flex flex-col">
      <section className="relative flex-1 w-full overflow-hidden flex flex-col">
        <div className="absolute -left-20 -top-20 h-[50vw] w-[50vw] max-h-[500px] max-w-[500px] rounded-full bg-primary/10 blur-[140px] opacity-50 pointer-events-none" />
        <div className="absolute right-[-10%] top-[-10%] h-[60vw] w-[60vw] max-h-[600px] max-w-[600px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
        
        <div 
          className="absolute inset-0 opacity-[0.08] pointer-events-none" 
          style={{ 
            backgroundImage: `radial-gradient(${themeColors.primary} 0.5px, transparent 0.5px)`, 
            backgroundSize: '30px 30px',
            maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)'
          }} 
        />

        <div className="relative flex-1 mx-auto max-w-[1400px] w-full px-6 md:px-12 flex flex-col pt-24 pb-12 md:pt-32 md:pb-16">
          
          <div className="absolute top-6 left-6 right-6 md:top-10 md:left-12 md:right-12 flex items-center justify-between z-50">
            <div className="flex flex-col gap-1">
              <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.4em] sm:tracking-[0.6em] text-primary ml-1">
                Premier Advisory
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tighter text-heading leading-none">
                Fair Deal <span className="font-bold">Real Estate</span>
              </h2>
            </div>

            <div className="hidden sm:flex items-center gap-4">
              <div className="flex items-center gap-2.5 rounded-full border border-glass-border bg-glass px-4 py-2 md:px-6 md:py-3 text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] text-primary backdrop-blur-xl shadow-lg">
                <ShieldCheck size={18} strokeWidth={2.5} />
                RERA | A51700031228
              </div>
            </div>
          </div>

        <div className="grid gap-7 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div className="space-y-5">
            <div className="rounded-[2.25rem] border border-glass-border bg-glass p-6 shadow-panel md:p-7">
              <p className="text-xs uppercase tracking-[0.34em] text-primary/80">PCMC Real Estate Advisory</p>
              <h1 className="mt-3 max-w-2xl text-4xl leading-[0.92] text-heading md:text-[4.6rem]">
                Clear property decisions
                <span className="block text-accent-gold">for the PCMC market.</span>
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-muted-text-less md:text-base">
                Transparent consulting for buying, selling, renting, and legal or property support
                across Akurdi, Nigdi, Ravet, Kiwale, and Wakad.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3 md:gap-4">
                <button 
                  onClick={() => document.getElementById('market-pulse')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-primary px-6 py-3.5 md:px-8 md:py-4 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-black transition-all hover:shadow-2xl hover:shadow-ink/20 active:scale-95 shadow-xl shadow-primary/20"
                >
                  <div className="absolute inset-0 translate-y-[101%] bg-ink-deep transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Explore PCMC</span>
                  <ArrowRight size={16} className="relative z-10 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white" />
                </button>
                
                <button 
                  onClick={() => document.getElementById('market-pulse')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-heading transition hover:border-primary/30 hover:text-primary"
                >
                  Market Pulse
                  <ChevronRight size={14} className="text-primary transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {proofStats.map((item, idx) => {
                const isNavy = idx % 2 == 0;
                return (
                  <div key={item.label} className={`${isNavy ? "bg-ink border-[1.5px] border-primary/40 shadow-panel" : "glass-panel"} rounded-[1.8rem] p-4 flex flex-col justify-center`}>
                    <div className="flex items-center justify-between mb-2">
                       <div className={`rounded-lg p-1.5 ${isNavy ? "bg-white/10" : "bg-primary/10"}`}>
                         {React.cloneElement(item.icon, { className: "text-primary", size: 16 })}
                       </div>
                    </div>
                    <p className={`text-2xl font-semibold md:text-2xl ${isNavy ? "text-ink-deep" : "text-primary"}`}>{item.value}</p>
                    <p className={`mt-1 text-[15px] uppercase tracking-widest ${isNavy ? "text-ink-deep/60" : "text-muted-text"}`}>{item.detail} </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative w-full flex items-center justify-center py-4 lg:py-0">
            <div className="relative aspect-[4/5] w-full max-w-[320px] sm:max-w-[320px] lg:max-w-[500px] overflow-hidden rounded-[2rem] md:rounded-[2.5rem] border border-glass-border bg-glass shadow-panel">
              
              <div className="absolute inset-0">
                {showcaseImages.map((img, idx) => (
                  <div 
                    key={idx}
                    className="absolute inset-0 transition-opacity duration-1500 ease-in-out"
                    style={{ 
                      backgroundImage: `url(${img})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      opacity: activeImg === idx ? 1 : 0,
                      zIndex: activeImg === idx ? 10 : 0,
                      transform: activeImg === idx ? 'scale(1.05)' : 'scale(1)',
                      transition: 'opacity 1.5s ease-in-out, transform 10s linear'
                    }}
                  />
                ))}
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-tr from-navy/30 via-transparent to-transparent z-20 pointer-events-none" />
              
              <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between z-30">
                <div className="flex justify-end">
                  <div className="rounded-xl border-[1.5px] border-primary/40 bg-ink p-2 lg:p-3 shadow-2xl">
                    <div className="flex items-center gap-2 lg:gap-2.5">
                      <div className="flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-lg bg-white/10 text-primary">
                        <BarChart3 size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-ink-deep/60">CAGR</p>
                        <p className="text-[12px] lg:text-sm font-bold text-ink-deep">+12.4%</p>
                      </div>
                    </div>
                  </div>
                </div>

                


              </div>
            </div>

            <div className="absolute top-2 left-10 sm:-top-2 sm:left-10 w-25 sm:w-30 rounded-xl bg-ink border-[1.5px] border-primary/40 p-2.5 sm:p-3.5 shadow-2xl z-40">
              <div className="flex items-center justify-between mb-1.5">
                <div className="p-1 rounded-lg bg-primary/10">
                  <LineChart size={20} className="text-primary" />
                </div>
                <span className="text-[8px] font-bold text-emerald-400">+42%</span>
              </div>
              <p className="text-[8px] uppercase tracking-widest text-ink-deep/60">Asset Value</p>
              <p className="text-xs sm:text-base font-bold text-ink-deep mb-0.5 leading-tight">Market Hike</p>
              <svg className="w-full h-8 sm:h-10 overflow-visible" viewBox="0 0 100 40">
                <path 
                  d="M0,35 Q10,32 20,28 T40,25 T60,15 T80,18 T100,5" 
                  fill="none" stroke="#c4a47c" strokeWidth="2.5" strokeLinecap="round"
                />
              </svg>
            </div>

            
          </div>
        </div>
      </div>
      </section>
    </div>
  );
}

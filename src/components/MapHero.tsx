import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Building2,
  ChevronRight,
  Sparkles,
  Search,
  Users,
  BarChart3,
  TrendingUp,
  LineChart
} from "lucide-react";

/**
 * Theme Constants & Mock Data
 */
const themeColors = {
  primary: "#c4a47c",
  accent: "#ffffff",
};

const showcaseImages = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000",
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

export default function App() {
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImg((prev) => (prev + 1) % showcaseImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#0a0a0b] font-sans selection:bg-[#c4a47c]/30 flex flex-col">
      <section className="relative flex-1 w-full overflow-hidden text-white flex flex-col">
        {/* Background Decorative Elements */}
        <div className="absolute -left-20 -top-20 h-[50vw] w-[50vw] max-h-[500px] max-w-[500px] rounded-full bg-[#c4a47c]/10 blur-[140px] opacity-50 pointer-events-none" />
        <div className="absolute right-[-10%] top-[-10%] h-[60vw] w-[60vw] max-h-[600px] max-w-[600px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.08] pointer-events-none" 
          style={{ 
            backgroundImage: `radial-gradient(${themeColors.primary} 0.5px, transparent 0.5px)`, 
            backgroundSize: '30px 30px',
            maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)'
          }} 
        />

        <div className="relative flex-1 mx-auto max-w-[1400px] w-full px-6 md:px-12 flex flex-col pt-24 pb-12 md:pt-32 md:pb-16">
          
          {/* Header Area - Enlarged Logo and RERA Badge */}
          <div className="absolute top-6 left-6 right-6 md:top-10 md:left-12 md:right-12 flex items-center justify-between z-50">
            <div className="flex flex-col gap-1">
              <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.4em] sm:tracking-[0.6em] text-[#c4a47c] ml-1">
                Premier Advisory
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tighter text-white/90 leading-none">
                Fair Deal <span className="font-bold text-white">Real Estate</span>
              </h2>
            </div>

            <div className="hidden sm:flex items-center gap-4">
              <div className="flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 md:px-6 md:py-3 text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] text-[#c4a47c] backdrop-blur-xl shadow-lg">
                <ShieldCheck size={18} strokeWidth={2.5} />
                RERA | A51700031228
              </div>
            </div>
          </div>

          {/* Main Content Split - Vertical centering and flex sizing */}
          <div className="flex-1 grid gap-10 lg:gap-16 lg:grid-cols-[1.2fr_0.8fr] items-center">
            
            {/* Left Column: Typography */}
            <div className="flex flex-col space-y-6 lg:space-y-8 justify-center">
              <div className="space-y-4 lg:space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-[8px] sm:text-[9px] font-medium uppercase tracking-[0.2em] text-white/50 ring-1 ring-white/10 backdrop-blur-sm w-fit">
                  <Sparkles size={10} className="text-[#c4a47c]" />
                  Exclusive PCMC Opportunities
                </div>
                
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-7xl font-light leading-[1.1] tracking-tight text-white">
                  Strategic <br />
                  Portfolio <br />
                  <span className="font-serif italic text-[#c4a47c]">Excellence.</span>
                </h1>
                
                <p className="max-w-md text-sm sm:text-base font-light leading-relaxed text-white/40">
                  Elevating property decisions in the PCMC growth corridor with bespoke consulting and zero-brokerage on direct builder deals.
                </p>
              </div>

              {/* Action Suite */}
              <div className="flex flex-wrap items-center gap-3 md:gap-4">
                <button 
                  onClick={() => document.getElementById('concierge')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-[#c4a47c] px-6 py-3.5 md:px-8 md:py-4 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-black transition-all active:scale-95 shadow-xl shadow-[#c4a47c]/10"
                >
                  <span className="relative z-10">Start Consultation</span>
                  <ArrowRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" />
                  <div className="absolute inset-0 -translate-x-full bg-white transition-transform group-hover:translate-x-0" />
                </button>
                
                <button 
                  onClick={() => document.getElementById('market-pulse')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group flex items-center gap-3 py-2 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-white/70 transition-all hover:text-white"
                >
                  Market Pulse
                  <ChevronRight size={14} className="text-[#c4a47c] transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              {/* Stats Cards Section - Visible but more compact */}
              <div className="pt-6 md:pt-8 border-t border-white/10 max-w-2xl hidden sm:block">
                <div className="grid grid-cols-3 gap-3 md:gap-4">
                  {proofStats.map((stat) => (
                    <div key={stat.label} className="group relative rounded-xl border border-white/5 bg-white/[0.02] p-3 md:p-4 transition-all hover:bg-white/[0.05] hover:border-[#c4a47c]/30">
                      <div className="mb-2 flex items-center justify-between">
                        <div className="rounded-lg bg-[#c4a47c]/10 p-1.5">
                          {React.cloneElement(stat.icon, { size: 14 })}
                        </div>
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-base md:text-lg lg:text-xl font-bold text-white leading-tight">{stat.value}</div>
                        <div className="text-[7px] md:text-[8px] font-bold uppercase tracking-widest text-[#c4a47c] truncate">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Smaller Visual Showcase */}
            <div className="relative w-full flex items-center justify-center py-4 lg:py-0">
              {/* Image Card Made Smaller with max-w-[320px] constraint */}
              <div className="relative aspect-[4/5] w-full max-w-[320px] sm:max-w-[320px] lg:max-w-[500px] overflow-hidden rounded-[2rem] md:rounded-[2.5rem] border border-white/10 bg-[#0a0a0b] shadow-2xl">
                
                {/* Seamless Background Carousel */}
                <div className="absolute inset-0">
                  {showcaseImages.map((img, idx) => (
                    <div 
                      key={idx}
                      className="absolute inset-0 transition-opacity duration-1500 ease-in-out"
                      style={{ 
                        backgroundImage: `url(${img})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: activeImg === idx ? 0.6 : 0,
                        zIndex: activeImg === idx ? 10 : 0,
                        transform: activeImg === idx ? 'scale(1.05)' : 'scale(1)',
                        transition: 'opacity 1.5s ease-in-out, transform 10s linear'
                      }}
                    />
                  ))}
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{ backgroundImage: `url(${showcaseImages[(activeImg + 1) % showcaseImages.length]})` }}
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0a0b] via-transparent to-[#c4a47c]/10 z-20" />
                
                {/* Floating "Insight" Panels */}
                <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between z-30">
                  <div className="flex justify-end">
                    <div className="rounded-xl border border-white/10 bg-black/40 p-2 lg:p-3 backdrop-blur-2xl">
                      <div className="flex items-center gap-2 lg:gap-2.5">
                        <div className="flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-lg bg-[#c4a47c]/10 text-[#c4a47c]">
                          <BarChart3 size={20} />
                        </div>
                        <div>
                          <p className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-white/40">CAGR</p>
                          <p className="text-[12px] lg:text-sm font-medium text-white">+12.4%</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-[#c4a47c]/30 flex items-center justify-center bg-[#0a0a0b]/60 backdrop-blur-md">
                      <Building2 className="text-[#c4a47c] animate-pulse" size={20} md:size={24} />
                    </div>
                    <div className="space-y-0">
                      <h3 className="text-sm sm:text-base md:text-lg font-serif italic text-white/90">Premium Selection</h3>
                      <p className="text-[6px] sm:text-[7px] uppercase tracking-[0.4em] text-[#c4a47c]">Akurdi • Ravet • Wakad</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-full bg-white/5 border border-white/10 p-1 backdrop-blur-xl overflow-hidden max-w-[400px] mx-auto w-full">
                      <div className="flex-1 px-3 text-right">
                        <span className="text-[12px] sm:text-[14px] font-bold uppercase tracking-[0.2em] text-white/40">
                          Search PCMC
                        </span>
                      </div>
                      <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-[#c4a47c] flex items-center justify-center text-black shrink-0">
                        <Search size={10} sm:size={12} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Market Growth Card - Scaled down slightly */}
              <div className="absolute top-2 left-0 sm:-top-2 sm:-left-4 w-35 sm:w-50 rounded-xl bg-[#0a0a0b]/90 backdrop-blur-2xl border border-white/10 p-2.5 sm:p-3.5 shadow-2xl z-40">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="p-1 rounded-lg bg-[#c4a47c]/10">
                    <LineChart size={20} className="text-[#c4a47c]" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400">+42%</span>
                </div>
                <p className="text-[10px] uppercase tracking-widest text-white/40">Asset Value</p>
                <p className="text-xs sm:text-base font-bold text-white mb-0.5 leading-tight">Market Hike</p>
                <svg className="w-full h-8 sm:h-12 overflow-visible" viewBox="0 0 100 40">
                  <path 
                    d="M0,35 Q10,32 20,28 T40,25 T60,15 T80,18 T100,5" 
                    fill="none" stroke="#c4a47c" strokeWidth="2.5" strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Status Indicator */}
              <div className="absolute bottom-2 right-0 sm:-bottom-2 sm:-right-4 h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-[#0a0a0b]/80 backdrop-blur-xl border border-white/10 flex items-center justify-center z-40">
                 <div className="relative">
                   <div className="h-1.5 w-1.5 rounded-full bg-[#c4a47c] animate-ping opacity-75" />
                   <div className="absolute top-0 h-1.5 w-1.5 rounded-full bg-[#c4a47c]" />
                 </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
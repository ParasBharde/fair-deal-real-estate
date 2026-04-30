import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  ArrowRight,
  ChevronRight,
  SlidersHorizontal,
  TrendingUp,
  Sparkles,
  ExternalLink,
  ShieldCheck,

  Layers,
  Maximize,
  Phone,
  User,
  Compass,
  Zap,
  Tag,
  MessageSquare,
  Loader2
} from "lucide-react";

// Updated dataset based on the new schema
import { properties } from "../data/content";

const neighborhoods = [...new Set(properties.map(p => p.area))];
const configurations = ["All", "2BHK", "3BHK"];

function SectionLabel({ icon, text } : {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-4 mt-6 first:mt-0">
      <div className="text-emerald-500/80">{icon}</div>
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
        {text}
      </span>
      <div className="flex-1 h-[1px] bg-slate-800/40 ml-2" />
    </div>
  );
}

export default function App() {
  const [activeArea, setActiveArea] = useState("Akurdi");
  const [activeConfig, setActiveConfig] = useState("All");
  const [activePropertyId, setActivePropertyId] = useState(properties[0].id);
  const [isLoading, setIsLoading] = useState(false);
  const loadingTimeoutRef = React.useRef<NodeJS.Timeout>();

  const triggerLoad = (action: () => void) => {
    action();
    setIsLoading(true);
    if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
    loadingTimeoutRef.current = setTimeout(() => {
      setIsLoading(false);
    }, 400);
  };

  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
      const areaMatch = p.area === activeArea;
      const configMatch = activeConfig === "All" || p.title.includes(activeConfig);
      return areaMatch && configMatch;
    });
  }, [activeArea, activeConfig]);

  const selectedProperty = useMemo(() => {
    const found = filteredProperties.find(p => p.id === activePropertyId);
    return found || filteredProperties[0] || properties[0];
  }, [filteredProperties, activePropertyId]);

  return (
    <section id="market-pulse" className="min-h-screen bg-[#030712] text-slate-200 py-12 px-4 lg:px-12 selection:bg-emerald-500/30">
      <div className="max-w-[1500px] mx-auto">
        
        <header className="mb-10">
          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 w-fit px-3 py-1 rounded-lg bg-slate-900 border border-slate-800">
              <Sparkles size={12} className="text-emerald-400" />
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">Broker Intel v2.0</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mt-2">
              Market <span className="text-emerald-500">Pulse.</span>
            </h1>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          
          <aside className="w-full lg:w-[320px] shrink-0 bg-slate-900/40 border border-white/5 rounded-[2rem] p-6 backdrop-blur-2xl">
            <div className="sticky top-12 space-y-8">
              
              <nav>
                <SectionLabel icon={<MapPin size={12} />} text="Neighborhoods" />
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                  {neighborhoods.map((name) => (
                    <button
                      key={name}
                      onClick={() => {
                        if (activeArea !== name) triggerLoad(() => setActiveArea(name));
                      }}
                      className={`
                        group relative flex items-center justify-between p-4 rounded-2xl border transition-all duration-300
                        ${activeArea === name 
                          ? "bg-emerald-500 border-emerald-400 text-white shadow-lg shadow-emerald-500/20" 
                          : "bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700"
                        }
                      `}
                    >
                      <span className="text-xs font-bold tracking-tight">{name}</span>
                      {activeArea === name && <ChevronRight size={14} />}
                    </button>
                  ))}
                </div>
              </nav>

              <div>
                <SectionLabel icon={<SlidersHorizontal size={12} />} text="Config" />
                <div className="flex bg-slate-950/60 p-1 rounded-xl border border-slate-800/50">
                  {configurations.map((config) => (
                    <button
                      key={config}
                      onClick={() => {
                        if (activeConfig !== config) triggerLoad(() => setActiveConfig(config));
                      }}
                      className={`
                        flex-1 py-2 rounded-lg text-[10px] font-black tracking-widest transition-all
                        ${activeConfig === config 
                          ? "bg-slate-800 text-white shadow-sm" 
                          : "text-slate-500 hover:text-slate-300"
                        }
                      `}
                    >
                      {config}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20">
                <div className="flex items-center gap-2 mb-2">
                   <TrendingUp size={14} className="text-emerald-400" />
                   <span className="text-[10px] font-black uppercase text-emerald-400 tracking-widest">Broker Insight</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-400 font-medium italic">
                  "{selectedProperty.note}"
                </p>
              </div>
            </div>
          </aside>

          <main className="flex-1 space-y-8">
            {/* Wrapper to prevent height collapse during wait transition */}
            <div className="min-h-[520px] relative">
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loader"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/40 border border-white/5 rounded-[2.5rem] shadow-2xl backdrop-blur-sm z-10"
                  >
                    <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mb-4" />
                    <span className="text-[10px] font-black text-emerald-400 tracking-[0.3em] uppercase">Processing Intel</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key={selectedProperty.id}
                    initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                    transition={{ duration: 0.2 }}
                    className="h-full"
                  >
                    <div className="group relative bg-slate-900/40 border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col xl:flex-row min-h-[520px] shadow-2xl">
                  
                  <div className="w-full xl:w-[45%] relative overflow-hidden h-[300px] xl:h-auto">
                    <img 
                      src={selectedProperty.image} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      alt={selectedProperty.title} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t xl:bg-gradient-to-r from-transparent via-transparent to-[#0f172a]/90" />
                    <div className="absolute top-6 left-6 flex gap-2">
                      <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg text-[9px] font-bold uppercase tracking-widest text-white flex items-center gap-1.5">
                        <Zap size={10} className="text-emerald-500" /> {selectedProperty.status}
                      </span>
                      <span className="px-3 py-1 bg-emerald-500/80 backdrop-blur-md border border-emerald-400/50 rounded-lg text-[9px] font-bold uppercase tracking-widest text-white flex items-center gap-1.5">
                        <Tag size={10} /> {selectedProperty.tag}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 p-8 md:p-10 flex flex-col justify-between bg-[#0f172a]/40">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-emerald-400 mb-1">
                          <MapPin size={14} />
                          <span className="text-[10px] font-black uppercase tracking-[0.3em]">{selectedProperty.area}</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight leading-tight">
                          {selectedProperty.title}
                        </h2>
                      </div>

                      {/* Broker Card */}
                      <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                          <User size={20} />
                        </div>
                        <div className="flex-1">
                          <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest">Assigned Broker</p>
                          <p className="text-sm font-bold text-white">{selectedProperty.broker}</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors border border-slate-700">
                            <Phone size={14} />
                          </button>
                          <button className="p-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded-xl transition-colors">
                            <MessageSquare size={14} />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                          { label: 'Size', val: selectedProperty.size, icon: <Maximize size={10}/> },
                          { label: 'Rate', val: selectedProperty.pricePerSqft, icon: <TrendingUp size={10}/> },
                          { label: 'Floor', val: selectedProperty.floor, icon: <Layers size={10}/> },
                          { label: 'Facing', val: selectedProperty.facing, icon: <Compass size={10}/> },
                        ].map((item, idx) => (
                          <div key={idx} className="px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col gap-0.5">
                            <span className="text-[8px] uppercase font-black text-slate-500 tracking-widest flex items-center gap-1">
                              {item.icon} {item.label}
                            </span>
                            <span className="text-xs font-bold text-white">{item.val}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {selectedProperty.features.map((f, i) => (
                          <div key={i} className="flex items-center gap-2 text-[10px] font-bold text-slate-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                            <ShieldCheck size={12} className="text-emerald-500" />
                            {f}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/5 mt-8">
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase font-black text-slate-500 tracking-[0.2em] mb-1">Final Asking</span>
                        <span className="text-2xl font-bold text-white">{selectedProperty.price}</span>
                      </div>
                      
                      <div className="flex gap-3 w-full sm:w-auto">
                        <button className="flex-1 sm:flex-none px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-[#030712] rounded-2xl font-bold text-[11px] uppercase tracking-widest transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-3 group/btn">
                          View Analysis <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              )}
            </AnimatePresence>
            </div>

            <div className="space-y-4">
              <SectionLabel icon={<Layers size={12} />} text={`Active Listings in ${activeArea}`} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence>
                {filteredProperties.length > 0 ? (
                  filteredProperties.map((p) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      key={p.id}
                      onClick={() => {
                        if (selectedProperty.id !== p.id) triggerLoad(() => setActivePropertyId(p.id));
                      }}
                      className={`
                        p-4 rounded-3xl border cursor-pointer transition-all flex items-center gap-4
                        ${selectedProperty.id === p.id 
                          ? "bg-emerald-500/10 border-emerald-500/40" 
                          : "bg-slate-900/40 border-white/5 hover:border-slate-700 hover:bg-slate-800/40"
                        }
                      `}
                    >
                      <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0">
                        <img src={p.image} className="w-full h-full object-cover" alt="" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-white truncate">{p.title}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[10px] text-emerald-400 font-bold">{p.price}</span>
                          <span className="text-[10px] text-slate-500 uppercase tracking-widest">{p.size}</span>
                        </div>
                      </div>
                      <ExternalLink size={14} className={selectedProperty.id === p.id ? "text-emerald-400" : "text-slate-600"} />
                    </motion.div>
                  ))
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="col-span-full p-8 rounded-[2rem] border border-dashed border-slate-800 text-center text-slate-500 text-sm"
                  >
                    No matching inventories found for this filter.
                  </motion.div>
                )}
                </AnimatePresence>
              </div>
            </div>
          </main>

        </div>
      </div>
    </section>
  );
}
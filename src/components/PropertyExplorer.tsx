import React, { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
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

export default function PropertyExplorer() {
  const [activeArea, setActiveArea] = useState("Akurdi");
  const [activeConfig, setActiveConfig] = useState("All");
  const [activePropertyId, setActivePropertyId] = useState(properties[0].id);
  const [isLoading, setIsLoading] = useState(false);
  const loadingTimeoutRef = React.useRef<any>();
  const scrollRef = useRef<HTMLDivElement>(null);

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
    <section id="market-pulse" className="section-shell bg-section-glow text-body py-12 px-4 lg:px-12 selection:bg-primary/30 min-h-[520px]">
      <div className="max-w-[1500px] mx-auto">
        
        <header className="mb-10">
          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ink-deep/5 border border-ink-deep/10 text-[10px] font-black uppercase tracking-widest text-primary mb-4 backdrop-blur-md">
              <Sparkles size={14} />
              Broker Intel v2.0
            </div>
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-heading mt-2">
              Market <span className="text-accent-gold">Pulse.</span>
            </h1>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          
          <aside className="w-full lg:w-[320px] shrink-0 bg-glass border border-glass-border rounded-[2rem] p-6 shadow-panel">
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
                          ? "bg-primary border-primary text-black shadow-lg shadow-primary/20" 
                          : "bg-glass border-glass-border text-muted-text hover:border-primary/40"
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
                <div className="flex bg-ink-deep/5 p-1 rounded-xl border border-ink-deep/10">
                  {configurations.map((config) => (
                    <button
                      key={config}
                      onClick={() => {
                        if (activeConfig !== config) triggerLoad(() => setActiveConfig(config));
                      }}
                      className={`
                        flex-1 py-2 rounded-lg text-[10px] font-black tracking-widest transition-all
                        ${activeConfig === config 
                          ? "bg-primary text-black shadow-sm" 
                          : "text-muted-text hover:text-heading"
                        }
                      `}
                    >
                      {config}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 mt-8">
                <div className="flex items-center gap-2 mb-2">
                   <TrendingUp size={14} className="text-primary" />
                   <span className="text-[10px] font-black uppercase text-primary tracking-widest">Broker Insight</span>
                </div>
                <p className="text-[11px] leading-relaxed text-muted-text font-medium italic">
                  "{selectedProperty.note}"
                </p>
              </div>
            </div>
          </aside>

          <main className="flex-1 space-y-8" ref={scrollRef}>
            <div className="min-h-[600px] md:min-h-[520px] relative">
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loader"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center justify-center bg-glass border border-glass-border rounded-[2.5rem] shadow-panel backdrop-blur-sm z-10 w-full h-full min-h-[600px] md:min-h-[520px]"
                  >
                    <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                    <span className="text-[10px] font-black text-primary tracking-[0.3em] uppercase">Processing Intel</span>
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
                    <div className="group relative bg-ink border-[1.5px] border-[#111827] rounded-[2.5rem] overflow-hidden flex flex-col xl:flex-row min-h-[520px] shadow-panel">
                  
                  <div className="w-full xl:w-[45%] relative overflow-hidden h-[300px] xl:h-auto">
                    <img 
                      src={selectedProperty.image} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      alt={selectedProperty.title} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t xl:bg-gradient-to-r from-transparent via-transparent to-ink-deep/10" />
                    <div className="absolute top-8 left-8 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-2 rounded-full border border-ink-deep/10 bg-white/95 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-ink-deep shadow-sm backdrop-blur-md">
                        <Zap size={12} className="text-primary" />
                        {selectedProperty.status}
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full border border-ink-deep/10 bg-white/95 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-ink-deep shadow-sm backdrop-blur-md">
                        <Tag size={12} className="text-primary" />
                        {selectedProperty.tag}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 p-8 md:p-10 flex flex-col justify-between bg-ink border-t-2 xl:border-t-0 xl:border-l-1 border-[#111827]">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-primary mb-1">
                          <MapPin size={14} />
                          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80">{selectedProperty.area}</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-semibold text-ink-deep tracking-tight leading-tight">
                          {selectedProperty.title}
                        </h2>
                      </div>

                      <div className="flex items-center gap-4 p-4 rounded-2xl bg-ink-deep/5 border-[0.5px] border-[#111827]">
                        <div className="w-10 h-10 rounded-full bg-ink-deep/10 flex items-center justify-center text-ink-deep">
                          <User size={20} />
                        </div>
                        <div className="flex-1">
                          <p className="text-[10px] uppercase font-black text-ink-deep/50 tracking-widest">Assigned Broker</p>
                          <p className="text-sm font-bold text-ink-deep">{selectedProperty.broker}</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2.5 bg-ink-deep/10 hover:bg-ink-deep/20 text-ink-deep rounded-xl transition-colors border-[0.5px] border-ink-deep/10 shadow-sm">
                            <Phone size={14} />
                          </button>
                          <button className="p-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl transition-colors shadow-sm">
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
                          <div key={idx} className="px-4 py-3 rounded-xl bg-ink-deep/5 border-[0.5px] border-[#111827] flex flex-col gap-0.5">
                            <span className="text-[8px] uppercase font-black text-ink-deep/50 tracking-widest flex items-center gap-1">
                              {item.icon} {item.label}
                            </span>
                            <span className="text-xs font-bold text-ink-deep">{item.val}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {selectedProperty.features.map((f, i) => (
                          <div key={i} className="flex items-center gap-2 text-[10px] font-bold text-ink-deep bg-white/95 px-3 py-1.5 rounded-full border border-ink-deep/10 shadow-sm">
                            <ShieldCheck size={12} className="text-primary" />
                            {f}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t-2 border-[#111827] mt-8">
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase font-black text-ink-deep/50 tracking-[0.2em] mb-1">Final Asking</span>
                        <span className="text-2xl font-bold text-ink-deep">{selectedProperty.price}</span>
                      </div>
                      
                      <div className="flex gap-3 w-full sm:w-auto">
                        
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
                        if (selectedProperty.id !== p.id) {
                          triggerLoad(() => setActivePropertyId(p.id));
                          if (window.innerWidth < 1024) {
                            scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                          }
                        }
                      }}
                      className={`
                        p-4 rounded-3xl border cursor-pointer transition-all flex items-center gap-4
                        ${selectedProperty.id === p.id 
                          ? "bg-primary/10 border-primary/40 shadow-sm" 
                          : "bg-glass border-glass-border hover:border-primary/30 shadow-sm"
                        }
                      `}
                    >
                      <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 shadow-sm">
                        <img src={p.image} className="w-full h-full object-cover" alt="" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-heading truncate">{p.title}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[10px] text-primary font-bold">{p.price}</span>
                          <span className="text-[10px] text-muted-text-more uppercase tracking-widest">{p.size}</span>
                        </div>
                      </div>
                      <ExternalLink size={14} className={selectedProperty.id === p.id ? "text-primary" : "text-muted-text"} />
                    </motion.div>
                  ))
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="col-span-full p-8 rounded-[2rem] border border-dashed border-glass-border text-center text-muted-text text-sm"
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

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";



const TestimonialCarousel = ({ testimonials = [] }: { testimonials?: any[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const data = testimonials;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % data.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  const getCardStyle = (index:number) => {
    const total = data.length;
    
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const isActive = diff === 0;
    const isLeft = diff === -1;
    const isRight = diff === 1;
    const isVisible = Math.abs(diff) <= 1;

    const mobileX = isLeft ? "-65%" : isRight ? "65%" : "0%";
    const desktopX = isLeft ? "-85%" : isRight ? "85%" : "0%";
    
    const mobileRotateY = isLeft ? -25 : isRight ? 25 : 0; 
    const desktopRotateY = isLeft ? -40 : isRight ? 40 : 0;

    return {
      zIndex: isActive ? 50 : 20,
      initial: false,
      animate: {
        opacity: isVisible ? 1 : 0,
        scale: isActive ? 1 : (isMobile ? 0.85 : 0.85),
        x: isActive ? "0%" : (isMobile ? mobileX : desktopX),
        rotateY: isMobile ? mobileRotateY : desktopRotateY,
        skewY: isActive ? 0 : (isLeft ? -1 : 1),
        filter: isActive ? "blur(0px)" : "blur(4px)",
        pointerEvents: (isActive ? "auto" : "none") as "auto" | "none",
      },
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 26
      }
    };
  };

  return (
    <section className="section-shell bg-section-glow px-4 py-16 md:px-10 overflow-hidden select-none">
      <div className="mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between mb-8 md:mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Testimonials</p>
            <h2 className="mt-3 text-4xl leading-none text-heading md:text-6xl">
              Written trust beats polished claims.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-text-less">
            Real stories from real partners. We prioritize human connection and 
            demonstrable results over marketing buzzwords.
          </p>
        </div>

        <div className="relative h-[280px] md:h-[320px] w-full flex items-center justify-center perspective-[1000px] md:perspective-[1500px] transform-gpu">
          <AnimatePresence initial={false}>
            {data.map((item: any, index: number) => {
              const style = getCardStyle(index);
              const total = data.length;
              let diff = index - currentIndex;
              if (diff > total / 2) diff -= total;
              if (diff < -total / 2) diff += total;
              const isActive = diff === 0;
              
              return (
                <motion.article
                  key={item.id}
                  style={{
                    zIndex: style.zIndex,
                    position: "absolute",
                    transformStyle: "preserve-3d",
                    width: isMobile ? "85vw" : "320px"
                  }}
                  initial={style.animate}
                  animate={style.animate}
                  transition={style.transition}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, info) => {
                    const threshold = 40;
                    if (info.offset.x < -threshold) handleNext();
                    if (info.offset.x > threshold) handlePrev();
                  }}
                  className={`p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border shadow-panel overflow-hidden cursor-grab active:cursor-grabbing ${
                    isActive
                      ? "bg-ink border-ink text-ink-deep shadow-xl"
                      : "glass-panel border-glass-border bg-glass"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4 md:mb-6">
                      <div className={`grid h-10 w-10 md:h-12 md:w-12 place-items-center rounded-full border text-sm md:text-base font-semibold ${
                        isActive ? "border-black border-[1.5px] bg-ink-deep/10 text-ink-deep" : "border-primary/30 bg-primary/10 text-primary"
                      }`}>
                        {item.name.split(" ").map((n: string) => n[0]).join("").slice(0,2).toUpperCase()}
                      </div>
                      <Quote className={`${isActive ? "text-ink-deep/30" : "text-primary/70"} rotate-180`} size={isMobile ? 20 : 28} />
                    </div>

                    <p className={`text-sm md:text-base leading-relaxed font-light italic ${isActive ? "text-ink-deep/90" : "text-muted-text-less"}`}>
                      "{item.quote}"
                    </p>

                    <div className={`mt-6 md:mt-8 pt-4 border-t ${isActive ? "border-ink-deep/10" : "border-primary/15"}`}>
                      <p className={`text-sm md:text-base font-bold tracking-tight ${isActive ? "text-ink-deep" : "text-heading"}`}>{item.name}</p>
                      <p className={`text-[10px] md:text-xs mt-1 uppercase tracking-widest font-semibold ${isActive ? "text-ink-deep/60" : "text-muted-text-more"}`}>
                        {item.role} <span className={`mx-1 md:mx-2 ${isActive ? "text-ink-deep/30" : "text-primary/50"}`}>•</span> {item.area}
                      </p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        
        <div className="mt-8 md:mt-10 flex flex-col items-center gap-8">
          <div className="flex items-center gap-4 md:gap-6">
            <button 
              onClick={handlePrev}
              className="group flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary transition-all hover:bg-primary/20 hover:text-primary active:scale-90"
              aria-label="Previous"
            >
              <ChevronLeft size={isMobile ? 18 : 20} />
            </button>
            
            <div className="flex gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-full bg-glass border border-glass-border">
              {data.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-1.5 md:h-2 transition-all duration-300 rounded-full ${currentIndex === i ? 'w-6 md:w-8 bg-primary' : 'w-1.5 md:w-2 bg-primary/30'}`}
                />
              ))}
            </div>

            <button 
              onClick={handleNext}
              className="group flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary transition-all hover:bg-primary/20 hover:text-primary active:scale-90"
              aria-label="Next"
            >
              <ChevronRight size={isMobile ? 18 : 20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;

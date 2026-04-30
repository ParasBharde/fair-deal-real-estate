import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";



const TestimonialCarousel = ({ testimonials = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive detection
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

    // Responsive adjustments for Mobile
    const mobileX = isLeft ? "-65%" : isRight ? "65%" : "0%";
    // Increased desktopX from 78% to 105% to create more space between cards
    const desktopX = isLeft ? "-85%" : isRight ? "85%" : "0%";
    
    const mobileRotateY = isLeft ? -25 : isRight ? 25 : 0; // Less rotation on mobile
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
        pointerEvents: isActive ? "auto" : "none",
      },
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 26
      }
    };
  };

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] px-4 py-10 md:py-14 md:px-10 font-sans select-none">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-blue-600/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />
      
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col gap-4 md:gap-6 md:flex-row md:items-end md:justify-between mb-8 md:mb-12">
          <div className="max-w-2xl">
            <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-blue-500 font-bold mb-2 md:mb-4">Testimonials</p>
            <h2 className="text-3xl leading-tight text-white md:text-6xl font-medium">
              Written trust beats <br />
              <span className="text-gray-500">polished claims.</span>
            </h2>
          </div>
          <p className="max-w-md text-xs md:text-sm leading-relaxed text-gray-400">
            Real stories from real partners. We prioritize human connection and 
            demonstrable results over marketing buzzwords.
          </p>
        </div>

        {/* Carousel Window */}
        <div className="relative h-[280px] md:h-[320px] w-full flex items-center justify-center perspective-[1000px] md:perspective-[1500px] transform-gpu">
          <AnimatePresence initial={false}>
            {data.map((item: Testimonial, index: number) => {
              const style = getCardStyle(index);
              
              return (
                <motion.article
                  key={item.id}
                  style={{
                    zIndex: style.zIndex,
                    boxShadow: index === currentIndex ? "0 25px 80px -15px rgba(59, 130, 246, 0.35)" : "none",
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
                  className="p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-white/10 bg-[#151515] shadow-2xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4 md:mb-6">
                      <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border border-blue-500/40 bg-blue-500/20 text-sm md:text-base font-bold text-blue-400">
                        {item.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                      </div>
                      <Quote className="text-blue-500/40 rotate-180" size={isMobile ? 20 : 28} />
                    </div>

                    <p className="text-sm md:text-base leading-relaxed text-gray-100 font-light italic">
                      "{item.quote}"
                    </p>

                    <div className="mt-6 md:mt-8 pt-4 border-t border-white/5">
                      <p className="text-sm md:text-base font-bold text-white tracking-tight">{item.name}</p>
                      <p className="text-[10px] md:text-xs text-gray-500 mt-1 uppercase tracking-widest font-semibold">
                        {item.role} <span className="mx-1 md:mx-2 text-blue-500/50">•</span> {item.area}
                      </p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="mt-8 md:mt-10 flex flex-col items-center gap-8">
          <div className="flex items-center gap-4 md:gap-6">
            <button 
              onClick={handlePrev}
              className="group flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:bg-blue-600 active:scale-90"
              aria-label="Previous"
            >
              <ChevronLeft size={isMobile ? 18 : 20} />
            </button>
            
            <div className="flex gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-full bg-white/5 border border-white/5">
              {data.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-1.5 md:h-2 transition-all duration-300 rounded-full ${currentIndex === i ? 'w-6 md:w-8 bg-blue-500' : 'w-1.5 md:w-2 bg-white/20'}`}
                />
              ))}
            </div>

            <button 
              onClick={handleNext}
              className="group flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:bg-blue-600 active:scale-90"
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
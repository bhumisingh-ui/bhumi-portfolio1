import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ScrollBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const accentOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.04, 0.08, 0.03]);
  const gradientShift = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (reduced) {
    return (
      <div
        ref={containerRef}
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{ background: "#0a0a0f" }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, 
            #0a0a0f 0%, 
            #0d0d14 25%, 
            #0b0b12 50%, 
            #09090f 75%, 
            #08070c 100%)`,
        }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          background: useTransform(
            gradientShift,
            (pos) =>
              `radial-gradient(ellipse 70% 50% at 50% ${pos}, rgba(0,255,157,0.07), transparent 65%)`
          ),
          opacity: accentOpacity,
        }}
      />
      <div className="absolute inset-0 noise-overlay opacity-30" />
    </div>
  );
}

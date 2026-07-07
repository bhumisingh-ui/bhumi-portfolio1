import { motion, useScroll, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ScrollProgressBar() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  if (reduced) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-[100] origin-left pointer-events-none"
      style={{
        scaleX,
        background: "linear-gradient(90deg, var(--color-amber), var(--color-gold), var(--color-wine))",
      }}
      aria-hidden="true"
    />
  );
}

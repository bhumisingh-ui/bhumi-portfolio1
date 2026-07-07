import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface GlowingOrbProps {
  color?: string;
  size?: number;
  x?: string;
  y?: string;
  delay?: number;
  duration?: number;
  className?: string;
}

export function GlowingOrb({
  color = "rgba(212,160,23,0.15)",
  size = 300,
  x = "50%",
  y = "50%",
  delay = 0,
  duration = 20,
  className = "",
}: GlowingOrbProps) {
  const reduced = useReducedMotion();

  if (reduced) return null;

  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        background: `radial-gradient(circle, ${color}, transparent 70%)`,
        filter: "blur(80px)",
        transform: "translate(-50%, -50%)",
      }}
      animate={{
        x: [0, 40, -30, 0],
        y: [0, -30, 40, 0],
        scale: [1, 1.15, 0.9, 1],
        opacity: [0.2, 0.35, 0.18, 0.2],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

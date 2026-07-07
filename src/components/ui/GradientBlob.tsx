import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface GradientBlobProps {
  className?: string;
  duration?: number;
  delay?: number;
  color?: "amber" | "wine" | "gold" | "plum";
}

const colors = {
  amber: "radial-gradient(circle, color-mix(in srgb, var(--color-amber) 25%, transparent), transparent 70%)",
  wine: "radial-gradient(circle, color-mix(in srgb, var(--color-wine) 20%, transparent), transparent 70%)",
  gold: "radial-gradient(circle, color-mix(in srgb, var(--color-gold) 20%, transparent), transparent 70%)",
  plum: "radial-gradient(circle, color-mix(in srgb, var(--color-plum-mid) 25%, transparent), transparent 70%)",
};

export function GradientBlob({
  className = "",
  duration = 8,
  delay = 0,
  color = "amber",
}: GradientBlobProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      style={{ background: colors[color], willChange: "transform" }}
      animate={
        reduced
          ? { opacity: 0.4 }
          : {
              x: [0, 80, -40, 0],
              y: [0, -50, 30, 0],
              scale: [1, 1.2, 0.9, 1],
            }
      }
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

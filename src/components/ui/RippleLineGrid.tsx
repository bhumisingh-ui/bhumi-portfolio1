import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface RippleLineGridProps {
  className?: string;
  rows?: number;
  cols?: number;
}

export function RippleLineGrid({ className = "", rows = 12, cols = 20 }: RippleLineGridProps) {
  const reduced = useReducedMotion();

  if (reduced) return null;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      <svg className="w-full h-full" preserveAspectRatio="none">
        {Array.from({ length: rows }).map((_, row) =>
          Array.from({ length: cols }).map((_, col) => {
            const x = (col / (cols - 1)) * 100;
            const y = (row / (rows - 1)) * 100;
            const delay = (row + col) * 0.08;

            return (
              <motion.circle
                key={`${row}-${col}`}
                cx={`${x}%`}
                cy={`${y}%`}
                r={1.5}
                fill="var(--color-amber)"
                initial={{ opacity: 0.05, scale: 0.5 }}
                animate={{
                  opacity: [0.05, 0.25, 0.05],
                  scale: [0.5, 1.2, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay,
                  ease: "easeInOut",
                }}
              />
            );
          })
        )}
      </svg>
      {/* Horizontal ripple lines */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute left-0 right-0 h-px"
          style={{
            top: `${(i + 1) * (100 / 7)}%`,
            background: "linear-gradient(90deg, transparent, var(--color-amber), transparent)",
            opacity: 0.08,
          }}
          animate={{ scaleX: [0.3, 1, 0.3], opacity: [0.04, 0.12, 0.04] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

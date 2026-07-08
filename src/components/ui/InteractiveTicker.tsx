import { useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface TickerItem {
  label: string;
  href?: string;
}

interface InteractiveTickerProps {
  items: TickerItem[];
  className?: string;
  speed?: number;
}

export function InteractiveTicker({ items, className = "", speed = 30 }: InteractiveTickerProps) {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const doubled = [...items, ...items];

  if (reduced) {
    return (
      <div className={`flex flex-wrap gap-4 justify-center px-4 ${className}`}>
        {items.map((item) => (
          <span key={item.label} className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">
            {item.label}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-hidden="true"
    >
      <motion.div
        className="flex gap-12 whitespace-nowrap px-4"
        animate={paused ? {} : { x: ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <a
            key={`${item.label}-${i}`}
            href={item.href}
            data-cursor="hover"
            className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-medium text-[var(--text-secondary)] hover:text-[var(--color-accent)] transition-colors"
          >
            <span className="w-1 h-1 bg-[var(--color-accent)]" />
            {item.label}
          </a>
        ))}
      </motion.div>
    </div>
  );
}

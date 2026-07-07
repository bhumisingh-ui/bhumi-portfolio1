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

export function InteractiveTicker({ items, className = "", speed = 25 }: InteractiveTickerProps) {
  const reduced = useReducedMotion();
  const doubled = [...items, ...items];

  if (reduced) {
    return (
      <div className={`flex flex-wrap gap-4 justify-center ${className}`}>
        {items.map((item) => (
          <span key={item.label} className="text-sm text-[var(--text-secondary)]">
            {item.label}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <motion.a
            key={`${item.label}-${i}`}
            href={item.href}
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--color-amber)] transition-colors"
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-amber)]" />
            {item.label}
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}

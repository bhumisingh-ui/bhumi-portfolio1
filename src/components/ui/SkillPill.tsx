import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SkillPillProps {
  name: string;
  index: number;
}

export function SkillPill({ name, index }: SkillPillProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative"
      variants={{
        hidden: { opacity: 0, y: 15 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, delay: index * 0.05 },
        },
      }}
      whileTap={{ scale: 0.97 }}
    >
      <motion.div
        className="px-5 py-2.5 rounded-full text-sm font-medium cursor-default select-none border"
        style={{
          background: isHovered
            ? "linear-gradient(135deg, color-mix(in srgb, var(--color-amber) 35%, transparent), color-mix(in srgb, var(--color-gold) 25%, transparent))"
            : "color-mix(in srgb, var(--color-amber) 12%, transparent)",
          color: "var(--text-primary)",
          borderColor: isHovered ? "var(--color-amber)" : "color-mix(in srgb, var(--color-amber) 20%, transparent)",
          transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        }}
        whileHover={{
          scale: 1.05,
          y: -4,
          boxShadow: "0 8px 25px color-mix(in srgb, var(--color-amber) 25%, transparent)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {name}
      </motion.div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap pointer-events-none z-10"
            style={{
              background: "var(--color-amber)",
              color: "var(--color-text-dark)",
            }}
            initial={{ opacity: 0, y: 5, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.9 }}
            transition={{ duration: 0.15 }}
          >
            {name}
            <div
              className="absolute top-full left-1/2 -translate-x-1/2 -mt-0.5"
              style={{
                width: 0,
                height: 0,
                borderLeft: "5px solid transparent",
                borderRight: "5px solid transparent",
                borderTop: "5px solid var(--color-amber)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

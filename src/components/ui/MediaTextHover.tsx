import { useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MediaTextHoverProps {
  title: string;
  description: string;
  media: React.ReactNode;
  className?: string;
}

export function MediaTextHover({ title, description, media, className = "" }: MediaTextHoverProps) {
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={`group relative overflow-hidden rounded-2xl ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={reduced ? {} : { y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl mb-4"
        animate={hovered && !reduced ? { scale: 1.03 } : { scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {media}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(135deg, color-mix(in srgb, var(--color-amber) 20%, transparent), transparent)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
      <motion.h3
        className="font-display font-bold text-lg mb-2"
        style={{ color: "var(--text-primary)" }}
        animate={hovered && !reduced ? { x: 4 } : { x: 0 }}
      >
        {title}
      </motion.h3>
      <motion.p
        className="text-sm leading-relaxed"
        style={{ color: "var(--text-secondary)" }}
        animate={hovered && !reduced ? { x: 4, opacity: 1 } : { x: 0, opacity: 0.85 }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
}

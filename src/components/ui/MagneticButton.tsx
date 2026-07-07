import { motion } from "framer-motion";
import { useMagnetic } from "../../hooks/useMagnetic";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "outline" | "ghost";
}

export function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  variant = "primary",
}: MagneticButtonProps) {
  const reduced = useReducedMotion();
  const enabled = !reduced && typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;
  const { ref, x, y, onMouseMove, onMouseLeave } = useMagnetic(0.35, enabled);

  const variants: Record<string, string> = {
    primary:
      "bg-[var(--color-amber)] text-[var(--color-text-dark)] hover:shadow-[0_0_30px_color-mix(in_srgb,var(--color-amber)_35%,transparent)]",
    outline:
      "border-2 border-[var(--color-amber)] text-[var(--color-amber)] bg-transparent hover:bg-[color-mix(in_srgb,var(--color-amber)_12%,transparent)]",
    ghost:
      "border border-white/10 text-[var(--text-primary)] hover:bg-white/5",
  };

  const inner = (
    <motion.span
      className={`inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold uppercase tracking-wider transition-colors focus-ring ${variants[variant]} ${className}`}
      style={{ x: enabled ? x : 0, y: enabled ? y : 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="inline-block"
      >
        <a href={href} className="block">
          {inner}
        </a>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="inline-block"
    >
      <button type="button" onClick={onClick} className="block">
        {inner}
      </button>
    </motion.div>
  );
}

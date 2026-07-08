import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ClipPathRevealProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  splitBy?: "char" | "word";
}

export function ClipPathReveal({
  text,
  className = "",
  style,
  delay = 0,
  splitBy = "char",
}: ClipPathRevealProps) {
  const reduced = useReducedMotion();
  const parts = splitBy === "char" ? text.split("") : text.split(" ");

  if (reduced) {
    return (
      <span className={className} style={style}>
        {text}
      </span>
    );
  }

  return (
    <span className={`inline-flex flex-wrap ${className}`} style={style} aria-label={text}>
      {parts.map((part, i) => (
        <span key={`${part}-${i}`} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.7,
              delay: delay + i * (splitBy === "char" ? 0.025 : 0.08),
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {part === " " ? "\u00A0" : part}
            {splitBy === "word" && i < parts.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

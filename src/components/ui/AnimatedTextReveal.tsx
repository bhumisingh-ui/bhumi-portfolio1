import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface AnimatedTextRevealProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  splitBy?: "letter" | "word";
  stagger?: number;
}

export function AnimatedTextReveal({
  text,
  className = "",
  style,
  as: Tag = "span",
  splitBy = "word",
  stagger = 0.06,
}: AnimatedTextRevealProps) {
  const reduced = useReducedMotion();
  const parts = splitBy === "letter" ? text.split("") : text.split(" ");

  if (reduced) {
    return (
      <Tag className={className} style={style}>
        {text}
      </Tag>
    );
  }

  return (
    <Tag className={className} style={style} aria-label={text}>
      {parts.map((part, i) => (
        <span key={`${part}-${i}`} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.6,
              delay: i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ clipPath: "inset(0 0 0 0)" }}
          >
            {part === " " ? "\u00A0" : part}
            {splitBy === "word" && i < parts.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

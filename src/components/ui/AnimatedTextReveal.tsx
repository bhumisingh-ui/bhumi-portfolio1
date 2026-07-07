import { motion } from "framer-motion";
import { letterContainerVariants, letterVariants } from "@/lib/animations";
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
  splitBy = "letter",
  stagger = 0.04,
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
    <motion.span
      className={className}
      style={{ ...style, display: "inline-block", perspective: 600 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      aria-label={text}
    >
      {parts.map((part, i) => (
        <motion.span
          key={`${part}-${i}`}
          variants={letterVariants}
          className="inline-block"
          style={{ transformStyle: "preserve-3d" }}
        >
          {part === " " ? "\u00A0" : part}
          {splitBy === "word" && i < parts.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function AnimatedWordReveal({
  words,
  className = "",
  wordClassName,
  getWordStyle,
}: {
  words: string[];
  className?: string;
  wordClassName?: string;
  getWordStyle?: (index: number) => React.CSSProperties;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <h1 className={className}>
        {words.join(" ")}
      </h1>
    );
  }

  return (
    <motion.h1
      className={className}
      variants={letterContainerVariants}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={letterVariants}
          className={`inline-block mr-[0.3em] ${wordClassName ?? ""}`}
          style={{ ...getWordStyle?.(i), transformStyle: "preserve-3d" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}

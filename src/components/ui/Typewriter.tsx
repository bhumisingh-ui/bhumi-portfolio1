import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TypewriterProps {
  words: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
  cursorColor?: string;
}

export function Typewriter({
  words,
  className = "",
  typingSpeed = 80,
  deletingSpeed = 50,
  pauseTime = 2000,
  cursorColor = "var(--color-amber)",
}: TypewriterProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const current = words[wordIndex];

    if (!isDeleting) {
      // Typing
      setText(current.substring(0, text.length + 1));
      if (text.length + 1 === current.length) {
        // Finished typing, pause then delete
        setTimeout(() => setIsDeleting(true), pauseTime);
        return;
      }
    } else {
      // Deleting
      setText(current.substring(0, text.length - 1));
      if (text.length - 1 === 0) {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
        return;
      }
    }
  }, [text, isDeleting, wordIndex, words, pauseTime]);

  useEffect(() => {
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, typingSpeed, deletingSpeed]);

  return (
    <span className={className}>
      <AnimatePresence mode="wait">
        <motion.span
          key={text}
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
        >
          {text}
        </motion.span>
      </AnimatePresence>
      <motion.span
        className="inline-block ml-0.5"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "steps(2)" as any }}
        style={{ color: cursorColor, fontWeight: 300 }}
      >
        |
      </motion.span>
    </span>
  );
}

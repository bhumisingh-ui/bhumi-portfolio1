import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ClipPathReveal } from "./ClipPathReveal";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);

  const handleComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 12 + 5;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(handleComplete, 500);
      }
      setProgress(Math.min(current, 100));
    }, 80);
    return () => clearInterval(interval);
  }, [handleComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[10001] flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0f]"
      initial={{ clipPath: "inset(0 0 0 0)" }}
      exit={{
        clipPath: "inset(0 0 100% 0)",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(0,255,157,0.08), transparent 70%)",
        }}
      />

      <div className="relative z-10 text-center">
        <h1 className="font-display text-6xl sm:text-8xl font-bold tracking-tight mb-4">
          <span className="text-[var(--color-accent)]">
            <ClipPathReveal text="BS" delay={0.1} />
          </span>
          <span className="text-[var(--text-primary)]">.</span>
        </h1>
        <p className="text-[10px] uppercase tracking-[0.4em] text-[var(--text-secondary)]">
          <ClipPathReveal text="Full Stack Developer" delay={0.4} splitBy="char" />
        </p>
      </div>

      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 w-48">
        <div className="h-px bg-[color-mix(in_srgb,var(--color-text-primary)_10%,transparent)] overflow-hidden">
          <motion.div
            className="h-full bg-[var(--color-accent)]"
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut", duration: 0.2 }}
          />
        </div>
        <p className="text-center mt-3 text-[10px] tracking-[0.3em] text-[var(--text-secondary)]">
          {Math.round(progress)}%
        </p>
      </div>
    </motion.div>
  );
}

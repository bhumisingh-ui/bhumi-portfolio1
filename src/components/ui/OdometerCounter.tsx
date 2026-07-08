import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface OdometerCounterProps {
  value: number | string;
  suffix?: string;
  label?: string;
  className?: string;
}

function DigitColumn({ digit, animate }: { digit: string; animate: boolean }) {
  const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const targetIndex = digit === "." ? -1 : parseInt(digit, 10);

  if (digit === ".") {
    return (
      <span className="inline-block text-[var(--color-accent)] font-display font-bold leading-none">
        .
      </span>
    );
  }

  if (!animate || isNaN(targetIndex)) {
    return (
      <span className="inline-block text-[var(--color-accent)] font-display font-bold leading-none">
        {digit}
      </span>
    );
  }

  return (
    <span className="inline-block overflow-hidden h-[1em] relative" style={{ width: "0.62em" }}>
      <motion.span
        className="flex flex-col items-center"
        initial={{ y: 0 }}
        animate={{ y: `-${targetIndex * 10}%` }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        {digits.map((d) => (
          <span
            key={d}
            className="block h-[1em] leading-none text-[var(--color-accent)] font-display font-bold"
          >
            {d}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

export function OdometerCounter({ value, suffix = "", label, className = "" }: OdometerCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(String(value));

  useEffect(() => {
    if (!isInView) return;
    setDisplayValue(String(value));
  }, [isInView, value]);

  const chars = displayValue.split("");
  const shouldAnimate = isInView && !reduced;

  return (
    <motion.div
      ref={ref}
      className={`text-center ${className}`}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="text-4xl sm:text-5xl flex items-baseline justify-center gap-0">
        {chars.map((char, i) => (
          <DigitColumn key={`${char}-${i}`} digit={char} animate={shouldAnimate} />
        ))}
        {suffix && (
          <span className="text-[var(--color-accent)] font-display font-bold leading-none ml-0.5">
            {suffix}
          </span>
        )}
      </div>
      {label && (
        <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">
          {label}
        </p>
      )}
    </motion.div>
  );
}

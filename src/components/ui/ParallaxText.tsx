import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function wrap(min: number, max: number, v: number): number {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

interface ParallaxTextProps {
  text: string;
  baseVelocity?: number;
  className?: string;
}

export function ParallaxText({
  text,
  baseVelocity = 3,
  className = "",
}: ParallaxTextProps) {
  const reduced = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const directionFactor = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);

  if (reduced) return null;

  return (
    <div
      className={`overflow-hidden whitespace-nowrap pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <motion.div
        className="flex whitespace-nowrap"
        style={{ x }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className="block font-display text-[clamp(3rem,10vw,7rem)] font-bold uppercase tracking-[0.15em] mx-8"
            style={{ color: "var(--color-amber)", opacity: 0.04 }}
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const SECTION_GRADIENTS = [
  "linear-gradient(160deg, #1a0f1b 0%, #2d1b2e 50%, #3d2b3e 100%)",
  "linear-gradient(160deg, #f5f1e8 0%, #f0ebe0 50%, #e8e0d0 100%)",
  "linear-gradient(160deg, #2d1b2e 0%, #3d2b3e 50%, #4a2f4d 100%)",
  "linear-gradient(160deg, #f5f1e8 0%, #faf7f2 50%, #f0ebe0 100%)",
  "linear-gradient(160deg, #1a0f1b 0%, #2d1b2e 40%, #4a2f4d 100%)",
  "linear-gradient(160deg, #3d2b3e 0%, #4a2f4d 30%, #6b3a5d 60%, #8b5a3a 100%)",
];

export function ScrollBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const bg0 = useTransform(scrollYProgress, [0, 0.17], [1, 0]);
  const bg1 = useTransform(scrollYProgress, [0.1, 0.25, 0.35], [0, 1, 0]);
  const bg2 = useTransform(scrollYProgress, [0.28, 0.42, 0.52], [0, 1, 0]);
  const bg3 = useTransform(scrollYProgress, [0.45, 0.58, 0.68], [0, 1, 0]);
  const bg4 = useTransform(scrollYProgress, [0.62, 0.75, 0.85], [0, 1, 0]);
  const bg5 = useTransform(scrollYProgress, [0.78, 1], [0, 1]);

  const opacities = [bg0, bg1, bg2, bg3, bg4, bg5];

  if (reduced) return <div ref={containerRef} className="absolute inset-0 -z-10" aria-hidden="true" />;

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
      {SECTION_GRADIENTS.map((gradient, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{ background: gradient, opacity: opacities[i] }}
        />
      ))}
    </div>
  );
}

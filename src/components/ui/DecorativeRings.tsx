import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface Ring {
  size: number;
  x: string;
  y: string;
  opacity: number;
  borderColor: string;
  parallaxFactor: number;
}

interface DecorativeRingsProps {
  variant?: "plum" | "cream" | "gold";
  className?: string;
}

const ringConfigs: Record<string, Ring[]> = {
  plum: [
    { size: 280, x: "-8%", y: "15%", opacity: 0.12, borderColor: "var(--color-amber)", parallaxFactor: -80 },
    { size: 180, x: "85%", y: "70%", opacity: 0.08, borderColor: "var(--color-gold)", parallaxFactor: 50 },
    { size: 350, x: "90%", y: "-10%", opacity: 0.06, borderColor: "var(--color-wine)", parallaxFactor: -120 },
  ],
  cream: [
    { size: 300, x: "-10%", y: "60%", opacity: 0.08, borderColor: "var(--color-wine)", parallaxFactor: -60 },
    { size: 200, x: "88%", y: "20%", opacity: 0.06, borderColor: "var(--color-amber)", parallaxFactor: 40 },
  ],
  gold: [
    { size: 250, x: "85%", y: "15%", opacity: 0.1, borderColor: "var(--color-plum)", parallaxFactor: -70 },
    { size: 320, x: "-5%", y: "75%", opacity: 0.07, borderColor: "var(--color-wine)", parallaxFactor: 90 },
  ],
};

function ParallaxRing({ ring, index }: { ring: Ring; index: number }) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, ring.parallaxFactor]
  );

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: ring.size,
        height: ring.size,
        left: ring.x,
        top: ring.y,
        border: `2px solid ${ring.borderColor}`,
        opacity: ring.opacity,
        y,
      }}
      animate={{ rotate: [0, 360] }}
      transition={{
        duration: 60 + index * 20,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

export function DecorativeRings({ variant = "plum", className = "" }: DecorativeRingsProps) {
  const reduced = useReducedMotion();
  const rings = ringConfigs[variant] || ringConfigs.plum;

  if (reduced) {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        {rings.map((ring, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: ring.size,
              height: ring.size,
              left: ring.x,
              top: ring.y,
              border: `2px solid ${ring.borderColor}`,
              opacity: ring.opacity,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {rings.map((ring, i) => (
        <ParallaxRing key={i} ring={ring} index={i} />
      ))}
    </div>
  );
}

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SectionHeadingProps {
  label?: string;
  title: string;
  align?: "left" | "right";
  className?: string;
}

const directions = [
  { x: -80, y: 40 },
  { x: 80, y: -30 },
  { x: -40, y: -60 },
  { x: 60, y: 50 },
  { x: -70, y: 20 },
  { x: 40, y: -40 },
];

export function SectionHeading({ label, title, align = "left", className = "" }: SectionHeadingProps) {
  const reduced = useReducedMotion();
  const words = title.split(" ");

  if (reduced) {
    return (
      <div className={`${align === "right" ? "text-right" : "text-left"} ${className}`}>
        {label && <p className="section-label mb-4">{label}</p>}
        <h2 className="heading-lg">{title}</h2>
      </div>
    );
  }

  return (
    <div className={`${align === "right" ? "text-right ml-auto" : "text-left"} ${className}`}>
      {label && (
        <motion.p
          className="section-label mb-4"
          initial={{ opacity: 0, x: align === "right" ? 20 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {label}
        </motion.p>
      )}
      <h2 className="heading-lg overflow-hidden">
        {words.map((word, i) => {
          const dir = directions[i % directions.length];
          return (
            <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, x: dir.x, y: dir.y, rotate: dir.x > 0 ? 4 : -4 }}
                whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {word}
              </motion.span>
            </span>
          );
        })}
      </h2>
    </div>
  );
}

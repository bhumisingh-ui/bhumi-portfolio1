import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { portfolio } from "@/data/portfolio";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import ShapeGrid from "@/components/ShapeGrid";

function ExperienceEntry({
  exp,
  index,
}: {
  exp: (typeof portfolio.experience)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className="grid sm:grid-cols-12 gap-4 sm:gap-8 py-10 border-b border-[color-mix(in_srgb,var(--color-text-primary)_8%,transparent)] last:border-0"
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="sm:col-span-3">
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-accent)]">{exp.period}</p>
      </div>
      <div className="sm:col-span-4">
        <h3 className="font-display text-xl sm:text-2xl font-semibold">{exp.role}</h3>
        <p className="text-sm text-[var(--text-secondary)] mt-1">{exp.organization}</p>
      </div>
      <div className="sm:col-span-5">
        <ul className="space-y-2">
          {exp.highlights.map((h, j) => (
            <li key={j} className="text-sm text-[var(--text-secondary)] leading-relaxed flex gap-3">
              <span className="text-[var(--color-accent)] shrink-0 mt-0.5">—</span>
              {h}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export function Experience() {
  const { experience } = portfolio;
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  return (
    <SectionWrapper id="experience" className="section-padding relative overflow-hidden">
      {!reduced && (
        <div className="absolute inset-0 z-0">
          <ShapeGrid
            speed={0.15}
            squareSize={40}
            direction="up"
            borderColor="#3a2438"
            hoverFillColor="#dc2f02"
            shape="hexagon"
            hoverTrailAmount={8}
          />
          <div className="absolute inset-0 bg-[var(--color-base)]/70 pointer-events-none" />
        </div>
      )}
      <div ref={sectionRef} className="relative z-10 max-w-7xl mx-auto editorial-grid">
        <div className="col-span-12 lg:col-span-4 relative">
          <SectionHeading label="04 — Journey" title="Experience" />
          {!reduced && (
            <div className="hidden lg:block absolute left-0 top-32 w-px h-48 bg-[color-mix(in_srgb,var(--color-text-primary)_8%,transparent)] overflow-hidden">
              <motion.div
                className="w-full bg-[var(--color-accent)] origin-top"
                style={{ height: lineHeight }}
              />
            </div>
          )}
        </div>

        <div className="col-span-12 lg:col-span-8 lg:col-start-5 mt-8 lg:mt-0">
          <p className="text-[var(--text-secondary)] mb-12 max-w-md">
            Positions of responsibility and professional growth.
          </p>
          {experience.map((exp, i) => (
            <ExperienceEntry key={i} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

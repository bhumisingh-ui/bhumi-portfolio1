import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { SectionWrapper, StaggerContainer, staggerChildVariants } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OdometerCounter } from "@/components/ui/OdometerCounter";
import { AnimatedTextReveal } from "@/components/ui/AnimatedTextReveal";
import ShapeGrid from "@/components/ShapeGrid";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function About() {
  const { about } = portfolio;
  const reduced = useReducedMotion();

  return (
    <SectionWrapper id="about" className="section-padding relative overflow-hidden">
      {!reduced && (
        <div className="absolute inset-0 z-0">
          <ShapeGrid
            speed={0.21}
            squareSize={40}
            direction="diagonal"
            borderColor="#695688"
            hoverFillColor="#e85d04"
            shape="hexagon"
            hoverTrailAmount={13}
          />
          <div className="absolute inset-0 bg-[var(--color-base)]/70 pointer-events-none" />
        </div>
      )}
      <div className="relative z-10 max-w-7xl mx-auto editorial-grid items-start gap-y-12">
        <div className="col-span-12 lg:col-span-5 lg:sticky lg:top-32">
          <SectionHeading label="01 — About" title={about.greeting.replace("!", "")} />
          <motion.p
            variants={staggerChildVariants}
            className="mt-6 text-6xl sm:text-7xl font-display font-bold text-[color-mix(in_srgb,var(--color-text-primary)_8%,transparent)] leading-none select-none"
            aria-hidden="true"
          >
            BS
          </motion.p>
        </div>

        <StaggerContainer className="col-span-12 lg:col-span-7 space-y-12">
          <motion.div variants={staggerChildVariants}>
            <p className="text-lg sm:text-xl leading-[1.7] text-[var(--text-primary)]">
              {about.bio}
            </p>
          </motion.div>

          <motion.div
            variants={staggerChildVariants}
            className="grid sm:grid-cols-2 gap-6"
          >
            <div className="border-subtle p-6 sm:p-8 bg-[var(--color-surface)] group hover:border-[color-mix(in_srgb,var(--color-accent)_30%,transparent)] transition-colors duration-500">
              <GraduationCap size={20} className="text-[var(--color-accent)] mb-4" />
              <h3 className="font-display text-lg font-semibold mb-2">{about.education.degree}</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-1">{about.education.school}</p>
              <p className="text-xs text-[var(--text-secondary)] opacity-60 mb-4">
                {about.education.university} · {about.education.period}
              </p>
              <span className="pill-outline text-[var(--color-accent)] border-[color-mix(in_srgb,var(--color-accent)_40%,transparent)]">
                CGPA {about.education.cgpa}
              </span>
            </div>

            <div className="border-subtle p-6 sm:p-8 bg-[var(--color-surface-alt)] flex flex-col justify-center items-center">
              <OdometerCounter
                value={about.leetcode.count}
                suffix="+"
                label={about.leetcode.label}
              />
            </div>
          </motion.div>

          <motion.div variants={staggerChildVariants} className="border-t border-[color-mix(in_srgb,var(--color-text-primary)_8%,transparent)] pt-8">
            <AnimatedTextReveal
              text="Building complete platforms — from database schemas to pixel-perfect frontends."
              as="p"
              splitBy="word"
              className="text-2xl sm:text-3xl font-display font-medium text-[var(--text-primary)] leading-snug"
              stagger={0.06}
            />
          </motion.div>
        </StaggerContainer>
      </div>
    </SectionWrapper>
  );
}

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { portfolio } from "../../data/portfolio";
import { SectionWrapper, StaggerContainer, staggerChildVariants } from "../ui/SectionWrapper";
import { SparkleIcon } from "../ui/SparkleIcon";
import { AnimatedCounter } from "../ui/AnimatedCounter";
import { DecorativeRings } from "../ui/DecorativeRings";
import { GradientBlob } from "../ui/GradientBlob";
import { HoverHighlighter } from "../ui/HoverHighlighter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { cardVariants } from "@/lib/animations";

export function About() {
  const { about } = portfolio;

  return (
    <SectionWrapper id="about" className="relative surface-cream section-padding overflow-hidden">
      <DecorativeRings variant="cream" />
      {/* Dot pattern background */}
      <div className="absolute inset-0 dot-pattern pointer-events-none opacity-50" />
      {/* Floating blobs */}
      <GradientBlob className="w-[300px] h-[300px] -top-20 -right-20" color="amber" duration={14} />
      <GradientBlob className="w-[250px] h-[250px] bottom-10 -left-10" color="gold" duration={12} delay={3} />

      <div className="relative z-10 max-w-5xl mx-auto">
        <StaggerContainer className="grid md:grid-cols-5 gap-10 lg:gap-16 items-start">
          {/* Left - greeting + bio */}
          <div className="md:col-span-3">
            <motion.div variants={staggerChildVariants} className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <SparkleIcon size={20} delay={0.3} color="var(--color-amber)" />
                <h2 className="heading-lg" style={{ color: "var(--color-plum)" }}>
                  <HoverHighlighter
                    text={about.greeting}
                    textColor="var(--color-plum)"
                    penColor="var(--color-amber)"
                    penOpacity={30}
                    penHeight={40}
                    penOffset={4}
                    className="inline"
                  />
                </h2>
                <SparkleIcon size={16} delay={1.1} color="var(--color-gold)" />
              </div>
            </motion.div>

            <motion.p
              variants={staggerChildVariants}
              className="text-base sm:text-lg leading-relaxed mb-8 font-alt"
              style={{ color: "var(--color-text-dark)", opacity: 0.8 }}
            >
              {about.bio}
            </motion.p>

            {/* Education card */}
            <motion.div variants={staggerChildVariants} className="relative group">
              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover="hover"
                whileTap="tap"
              >
                <div
                  className="absolute -inset-[2px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, var(--color-amber), var(--color-wine), var(--color-gold))",
                  }}
                />
                <Card className="relative border-2 hover:border-amber-400 transition-colors group-hover:shadow-[0_12px_35px_color-mix(in_srgb,var(--color-amber)_15%,transparent)]">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <motion.div
                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: "color-mix(in srgb, var(--color-amber) 15%, transparent)" }}
                        whileHover={{ scale: 1.15, rotate: 12 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      >
                        <GraduationCap size={22} style={{ color: "var(--color-amber)" }} />
                      </motion.div>
                      <div>
                        <CardTitle className="text-base sm:text-lg">{about.education.degree}</CardTitle>
                        <CardDescription style={{ color: "var(--color-text-dark)", opacity: 0.7 }}>
                          {about.education.school}
                        </CardDescription>
                        <p className="text-xs mt-0.5 font-mono" style={{ color: "var(--color-text-dark)", opacity: 0.5 }}>
                          {about.education.university} · {about.education.period}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <span
                        className="px-3 py-1 rounded-full text-sm font-bold font-mono"
                        style={{
                          background: "color-mix(in srgb, var(--color-amber) 15%, transparent)",
                          color: "var(--color-amber)",
                        }}
                      >
                        CGPA: {about.education.cgpa}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>

          {/* Right - LeetCode counter */}
          <motion.div variants={staggerChildVariants} className="md:col-span-2">
            <div
              className="rounded-2xl p-6 sm:p-8 text-center relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, var(--color-plum), var(--color-wine))",
                border: "1px solid color-mix(in srgb, var(--color-amber) 15%, transparent)",
              }}
            >
              {/* Grid pattern overlay */}
              <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
              <div className="relative z-10">
                <SparkleIcon size={24} delay={0.6} color="var(--color-gold)" className="mx-auto mb-4" />
                <AnimatedCounter
                  target={about.leetcode.count}
                  suffix="+"
                  label={about.leetcode.label}
                  className="mb-2"
                />
                <div className="mt-6 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-display font-bold" style={{ color: "var(--color-gold)" }}>2</div>
                      <div className="text-xs mt-1 font-alt" style={{ color: "rgba(255,255,255,0.6)" }}>Major Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-display font-bold" style={{ color: "var(--color-gold)" }}>8.94</div>
                      <div className="text-xs mt-1 font-alt" style={{ color: "rgba(255,255,255,0.6)" }}>CGPA</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </StaggerContainer>
      </div>
    </SectionWrapper>
  );
}

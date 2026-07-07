import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Briefcase } from "lucide-react";
import { portfolio } from "../../data/portfolio";
import { SectionWrapper } from "../ui/SectionWrapper";
import { SparkleIcon } from "../ui/SparkleIcon";
import { DecorativeRings } from "../ui/DecorativeRings";
import { GradientBlob } from "../ui/GradientBlob";
import { HoverHighlighter } from "../ui/HoverHighlighter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { cardVariants, timelineNodeVariants } from "@/lib/animations";
import { useReducedMotion } from "../../hooks/useReducedMotion";

function TimelineEntry({
  exp,
  index,
  total,
  lineProgress,
}: {
  exp: (typeof portfolio.experience)[0];
  index: number;
  total: number;
  lineProgress: import("framer-motion").MotionValue<number>;
}) {
  const entryRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(entryRef, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  const threshold = total <= 1 ? 0 : index / (total - 1);
  const nodeScale = useTransform(lineProgress, [threshold - 0.1, threshold + 0.05], [0, 1]);

  return (
    <div ref={entryRef} className="relative pb-12 last:pb-0">
      <motion.div
        className="absolute -left-5 sm:-left-7 top-1 w-4 h-4 rounded-full border-2 z-10"
        style={{
          borderColor: "var(--color-amber)",
          background: "var(--color-plum)",
          scale: reduced ? 1 : nodeScale,
        }}
        variants={timelineNodeVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="absolute inset-1 rounded-full" style={{ background: "var(--color-amber)" }} />
      </motion.div>

      <motion.div
        className="relative group"
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ delay: index * 0.15 }}
        whileHover="hover"
        whileTap="tap"
      >
        {/* Gradient border glow */}
        <div
          className="absolute -inset-[2px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "linear-gradient(135deg, var(--color-amber), var(--color-wine), var(--color-gold))",
          }}
        />
        <Card className="relative border-2 hover:border-amber-400 transition-colors group-hover:shadow-[0_16px_40px_color-mix(in_srgb,var(--color-amber)_18%,transparent)]">
          <CardHeader>
            <div className="flex items-start gap-3">
              <motion.div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "color-mix(in srgb, var(--color-amber) 15%, transparent)" }}
                whileHover={{ scale: 1.15, rotate: 12 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <Briefcase size={20} style={{ color: "var(--color-amber)" }} />
              </motion.div>
              <div>
                <CardTitle className="font-alt">{exp.role}</CardTitle>
                <CardDescription className="text-[var(--color-amber)] font-alt">{exp.organization}</CardDescription>
                <p className="text-xs mt-0.5 text-[var(--text-secondary)] font-mono">{exp.period}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {exp.highlights.map((h, j) => (
               <li key={j} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                  <span className="mt-0.5 shrink-0 text-[var(--color-amber)]">▸</span>
                  {h}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export function Experience() {
  const { experience } = portfolio;
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 60%"],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <SectionWrapper id="experience" className="relative gradient-bg-hero section-padding overflow-hidden">
      <DecorativeRings variant="plum" />
      {/* Floating blobs */}
      <GradientBlob className="w-[350px] h-[350px] top-[20%] -right-20" color="plum" duration={15} />
      <GradientBlob className="w-[250px] h-[250px] bottom-[10%] -left-10" color="amber" duration={11} delay={2} />

      <div className="relative z-10 max-w-4xl mx-auto" ref={sectionRef}>
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <SparkleIcon size={18} delay={0.2} />
            <h2 className="heading-lg" style={{ color: "var(--text-primary)" }}>
              <HoverHighlighter
                text="Experience"
                textColor="var(--text-primary)"
                penColor="var(--color-amber)"
                penOpacity={35}
                penHeight={40}
                penOffset={4}
                className="inline"
              />
            </h2>
            <SparkleIcon size={14} delay={1.5} />
          </div>
          <p className="text-base font-alt" style={{ color: "var(--text-secondary)" }}>
            Positions of responsibility
          </p>
        </div>

        <div className="relative pl-8 sm:pl-12">
          <div
            className="absolute left-3 sm:left-5 top-0 bottom-0 w-0.5 overflow-hidden"
            style={{ background: "color-mix(in srgb, var(--color-amber) 15%, transparent)" }}
          >
            <motion.div
              className="absolute top-0 left-0 right-0 w-full origin-top"
              style={{
                background: "linear-gradient(180deg, var(--color-amber), var(--color-gold))",
                height: "100%",
                scaleY: reduced ? 1 : lineScaleY,
              }}
            />
          </div>

          {experience.map((exp, i) => (
            <TimelineEntry
              key={i}
              exp={exp}
              index={i}
              total={experience.length}
              lineProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

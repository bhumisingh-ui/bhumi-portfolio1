import { portfolio } from "../../data/portfolio";
import { SectionWrapper } from "../ui/SectionWrapper";
import { ProjectCard } from "../ui/ProjectCard";
import { SparkleIcon } from "../ui/SparkleIcon";
import { DecorativeRings } from "../ui/DecorativeRings";
import { RippleLineGrid } from "../ui/RippleLineGrid";
import { GradientBlob } from "../ui/GradientBlob";
import { HoverHighlighter } from "../ui/HoverHighlighter";
import { cardContainerVariants } from "@/lib/animations";
import { motion } from "framer-motion";

export function Projects() {
  const { projects } = portfolio;

  return (
    <SectionWrapper id="projects" className="relative surface-cream section-padding overflow-hidden">
      <DecorativeRings variant="cream" />
      <RippleLineGrid className="opacity-[0.06]" rows={8} cols={14} />
      {/* Floating blobs */}
      <GradientBlob className="w-[400px] h-[400px] -top-20 -right-20" color="amber" duration={14} />
      <GradientBlob className="w-[300px] h-[300px] bottom-10 -left-10" color="wine" duration={12} delay={3} />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <SparkleIcon size={20} delay={0} color="var(--color-amber)" />
            <h2 className="heading-lg" style={{ color: "var(--color-plum)" }}>
              <HoverHighlighter
                text="Projects"
                textColor="var(--color-plum)"
                penColor="var(--color-amber)"
                penOpacity={35}
                penHeight={40}
                penOffset={4}
                className="inline"
              />
            </h2>
            <SparkleIcon size={16} delay={1.2} color="var(--color-gold)" />
          </div>
          <p className="text-base font-alt" style={{ color: "var(--color-text-dark)", opacity: 0.6 }}>
            Things I've built from the ground up
          </p>
        </div>

        <motion.div
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

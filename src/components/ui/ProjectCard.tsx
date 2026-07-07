import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, MessageSquare } from "lucide-react";
import { GithubIcon } from "./Icons";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "./card";
import { Badge } from "./badge";
import { Button } from "./button";
import { cardVariants } from "@/lib/animations";
import type { Project } from "../../data/portfolio";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const mockup =
    project.title === "CodeMentor AI" ? (
      <div
        className="rounded-lg overflow-hidden mb-0"
        style={{
          background: "color-mix(in srgb, var(--color-plum) 30%, var(--bg-surface))",
          border: "1px solid color-mix(in srgb, var(--color-amber) 10%, transparent)",
        }}
      >
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{
            borderBottom: "1px solid color-mix(in srgb, var(--color-amber) 10%, transparent)",
            background: "color-mix(in srgb, var(--color-plum) 50%, var(--bg-surface))",
          }}
        >
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 text-xs opacity-60 flex gap-4 ml-4 font-mono">
            <span>main.tsx</span>
            <span className="opacity-50">utils.ts</span>
          </div>
        </div>
        <div className="aspect-video p-4 sm:p-6 font-mono text-xs sm:text-sm relative overflow-hidden">
          <div style={{ color: "var(--color-amber)", opacity: 0.8 }}>{"function optimize(code: string) {"}</div>
          <div className="ml-4 opacity-60">{"// Analyzing AST structure..."}</div>
          <div className="ml-4 opacity-80">{"const ast = parse(code);"}</div>
          <div
            className="ml-4 mt-2 p-2 rounded-md border"
            style={{
              background: "color-mix(in srgb, var(--color-amber) 10%, transparent)",
              borderColor: "color-mix(in srgb, var(--color-amber) 20%, transparent)",
              color: "var(--color-amber)",
            }}
          >
            <div className="flex items-center gap-1.5 font-sans font-medium mb-1">
              <MessageSquare size={12} /> AI Suggestion
            </div>
            Consider using an iterative approach here to avoid call stack limits on large inputs.
          </div>
          <div className="ml-4 mt-2 opacity-80">{"return optimizeAST(ast);"}</div>
          <div style={{ color: "var(--color-amber)", opacity: 0.8 }}>{"}"}</div>
        </div>
      </div>
    ) : (
      <div
        className="rounded-lg overflow-hidden mb-0"
        style={{
          background: "color-mix(in srgb, var(--color-plum) 30%, var(--bg-surface))",
          border: "1px solid color-mix(in srgb, var(--color-amber) 10%, transparent)",
        }}
      >
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{ borderBottom: "1px solid color-mix(in srgb, var(--color-amber) 10%, transparent)" }}
        >
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div
            className="flex-1 text-center text-xs px-4 py-1 rounded-md"
            style={{
              background: "color-mix(in srgb, var(--color-amber) 8%, transparent)",
              color: "var(--text-secondary)",
            }}
          >
            {project.title.toLowerCase()}.dev
          </div>
        </div>
        <div className="aspect-video flex items-center justify-center p-8">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-display font-bold mb-2" style={{ color: "var(--color-amber)" }}>
              {project.title}
            </div>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              {project.tags.join(" · ")}
            </p>
          </div>
        </div>
      </div>
    );

  return (
    <motion.div
      ref={ref}
      className="relative group"
      style={{ perspective: "1200px" }}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.15 }}
      whileHover="hover"
      whileTap="tap"
    >
      <motion.div
        style={{
          rotateX: reduced ? 0 : rotateX,
          rotateY: reduced ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="absolute -inset-[2px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "linear-gradient(135deg, var(--color-amber), var(--color-wine), var(--color-gold))",
          }}
        />
        <Card className="relative border-2 hover:border-amber-400 transition-colors overflow-hidden group-hover:shadow-[0_20px_50px_color-mix(in_srgb,var(--color-amber)_20%,transparent)]">
          <CardHeader className="p-0 pb-0">
            {mockup}
            <div className="px-6 pt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
            <CardTitle className="px-6 pt-4">{project.title}</CardTitle>
            <CardDescription className="px-6">{project.description}</CardDescription>
          </CardHeader>

          <CardContent>
            <ul className="space-y-2">
              {project.highlights.map((h, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-2 text-sm text-[var(--text-secondary)]"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0.7, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <motion.span
                    className="mt-1 shrink-0 text-[var(--color-amber)]"
                    whileHover={{ scale: 1.2, rotate: 12 }}
                  >
                    ▸
                  </motion.span>
                  {h}
                </motion.li>
              ))}
            </ul>
          </CardContent>

          <CardFooter className="gap-3 flex-wrap">
            {project.repoUrl && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Button asChild variant="outline" size="sm">
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} on GitHub`}>
                    <GithubIcon size={16} />
                    View Code
                  </a>
                </Button>
              </motion.div>
            )}
            {project.liveUrl && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Button asChild size="sm">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} live`}>
                    <ExternalLink size={16} />
                    View Live
                  </a>
                </Button>
              </motion.div>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
}

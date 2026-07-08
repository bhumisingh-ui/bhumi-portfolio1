import { motion } from "framer-motion";
import { ExternalLink, MessageSquare } from "lucide-react";
import { GithubIcon } from "./Icons";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "./card";
import { Badge } from "./badge";
import { Button } from "./button";
import type { Project } from "../../data/portfolio";

interface ProjectCardProps {
  project: Project;
  index: number;
  isFeatured?: boolean;
}

export function ProjectCard({ project, index, isFeatured }: ProjectCardProps) {
  const reduced = useReducedMotion();

  const mockup =
    project.title === "CodeMentor AI" ? (
      <div className="w-full h-full bg-black/50 flex flex-col font-mono text-xs sm:text-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-black/80 relative z-10">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 text-xs opacity-60 flex gap-4 ml-4 text-white">
            <span>main.tsx</span>
            <span className="opacity-50">utils.ts</span>
          </div>
        </div>
        <div className="flex-1 p-4 sm:p-6 relative z-10 flex flex-col justify-center">
          <div className="text-[var(--color-primary)] opacity-90">{"function optimize(code: string) {"}</div>
          <div className="ml-4 opacity-50 text-[var(--color-text-secondary)]">{"// Analyzing AST structure..."}</div>
          <div className="ml-4 opacity-80 text-[var(--color-text-primary)]">{"const ast = parse(code);"}</div>
          <div className="ml-4 mt-3 p-3 rounded-md border bg-[color-mix(in_srgb,var(--color-primary)_15%,transparent)] border-[color-mix(in_srgb,var(--color-primary)_30%,transparent)] text-[var(--color-primary)] shadow-[0_0_15px_color-mix(in_srgb,var(--color-primary)_20%,transparent)] backdrop-blur-sm">
            <div className="flex items-center gap-1.5 font-sans font-bold mb-1 tracking-wide uppercase text-[10px]">
              <MessageSquare size={12} /> AI Suggestion
            </div>
            Consider using an iterative approach here to avoid call stack limits on large inputs.
          </div>
          <div className="ml-4 mt-3 opacity-80 text-[var(--color-text-primary)]">{"return optimizeAST(ast);"}</div>
          <div className="text-[var(--color-primary)] opacity-90">{"}"}</div>
        </div>
      </div>
    ) : (
      <div className="w-full h-full bg-black/50 flex flex-col relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-primary)]/10 via-transparent to-[var(--color-secondary)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-black/80 relative z-10">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 text-center text-xs px-4 py-1 rounded-md bg-[color-mix(in_srgb,var(--color-primary)_15%,transparent)] text-[var(--color-primary)] font-medium mx-4 border border-[color-mix(in_srgb,var(--color-primary)_20%,transparent)]">
            {project.title.toLowerCase()}.dev
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-8 relative z-10">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-display font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-text-primary)] to-[var(--color-text-secondary)] group-hover:from-[var(--color-primary)] group-hover:to-[var(--color-secondary)] transition-all duration-500">
              {project.title}
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] tracking-wider uppercase">
              {project.tech.join(" · ")}
            </p>
          </div>
        </div>
      </div>
    );

  return (
    <motion.div
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduced ? undefined : "hover"}
      className="group h-full flex"
    >
      <Card
        className="w-full flex flex-col relative border border-[rgba(240,240,245,0.08)] transition-all duration-500 overflow-hidden bg-[var(--color-surface-2)] group-hover:bg-[var(--color-surface-3)] shadow-xl group-hover:shadow-[0_20px_50px_color-mix(in_srgb,var(--color-primary)_20%,transparent)] group-hover:border-[color-mix(in_srgb,var(--color-primary)_50%,transparent)] rounded-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none" />
        
        <motion.div
          variants={{ hover: { y: -4 } }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full flex flex-col h-full z-10 relative"
        >
          <div className={`relative w-full overflow-hidden border-b border-[rgba(240,240,245,0.08)] bg-[var(--color-surface-1)] ${isFeatured ? 'aspect-video md:aspect-[21/9]' : 'aspect-video'}`}>
            <motion.div
              variants={{ hover: { scale: 1.04 } }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full"
            >
              {mockup}
            </motion.div>
          </div>

          <CardHeader className="pt-7 px-7">
            <CardTitle className={`font-heading font-bold tracking-tight text-[var(--color-text-primary)] group-hover:text-white transition-colors duration-300 ${isFeatured ? 'text-3xl' : 'text-2xl'}`}>
              {project.title}
            </CardTitle>
            <p className="text-[var(--color-secondary)] text-sm font-semibold tracking-wide mt-1 uppercase">{project.subtitle}</p>
            <CardDescription className="mt-4 text-base leading-relaxed text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors duration-300">
              {project.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex-grow px-7">
            <div className="flex flex-wrap gap-2 mt-2">
              {project.tech.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-[rgba(240,240,245,0.08)] text-[var(--color-text-secondary)] bg-[var(--color-surface-1)] group-hover:border-[var(--color-secondary)] group-hover:text-[var(--color-background)] group-hover:bg-[var(--color-secondary)] transition-all duration-300 py-1 px-3"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>

          <CardFooter className="pt-6 pb-7 px-7 mt-4 border-t border-[rgba(240,240,245,0.08)] flex justify-end">
            <Button asChild size="sm" variant={project.linkType === 'live' ? 'default' : 'outline'} className="rounded-full shadow-lg hover:shadow-[0_0_20px_color-mix(in_srgb,var(--color-primary)_40%,transparent)] transition-all duration-300">
              <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} ${project.linkType}`}>
                {project.linkType === "live" ? <ExternalLink size={16} /> : <GithubIcon size={16} />}
                {project.linkType === "live" ? "View Live" : "View Code"}
              </a>
            </Button>
          </CardFooter>
        </motion.div>
      </Card>
    </motion.div>
  );
}

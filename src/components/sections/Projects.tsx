import { portfolio } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";

export function Projects() {
  const { projects } = portfolio;

  return (
    <section id="projects" className="section-padding relative overflow-hidden bg-[color-mix(in_srgb,var(--color-surface)_10%,transparent)]">
      <div className="max-w-7xl mx-auto mb-16">
        <SectionHeading label="03 — Work" title="Selected Projects" />
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, i) => (
          <div key={project.id} className={i === 0 ? "md:col-span-2" : ""}>
            <ProjectCard project={project} index={i} isFeatured={i === 0} />
          </div>
        ))}
      </div>
    </section>
  );
}

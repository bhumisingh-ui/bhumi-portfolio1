import { useMemo } from "react";
import { motion } from "framer-motion";
import { portfolio } from "@/data/portfolio";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const proficiencyWeights: Record<string, number> = {
  JavaScript: 1.4,
  "Node.js": 1.3,
  "Express.js": 1.2,
  React: 1.3,
  MongoDB: 1.1,
  PostgreSQL: 1.0,
  MySQL: 1.0,
  Java: 1.0,
  C: 0.9,
  HTML5: 1.2,
  CSS3: 1.2,
  Bootstrap: 0.9,
  Git: 1.1,
  GitHub: 1.1,
};

function getWeight(skill: string) {
  return proficiencyWeights[skill] ?? 0.85 + Math.random() * 0.3;
}

export function Skills() {
  const reduced = useReducedMotion();
  const allSkills = useMemo(
    () =>
      portfolio.skillCategories.flatMap((cat) =>
        cat.skills.map((skill) => ({
          skill,
          category: cat.label,
          weight: getWeight(skill),
        }))
      ),
    []
  );

  const marqueeRow1 = [...allSkills, ...allSkills];
  const marqueeRow2 = [...allSkills.slice().reverse(), ...allSkills.slice().reverse()];

  return (
    <SectionWrapper id="skills" className="section-padding relative overflow-hidden">
      <div className="max-w-7xl mx-auto mb-16 editorial-grid">
        <div className="col-span-12 lg:col-span-6">
          <SectionHeading label="02 — Expertise" title="Skills & Tools" />
        </div>
        <div className="col-span-12 lg:col-span-6 lg:flex lg:items-end lg:justify-end">
          <p className="text-[var(--color-text-secondary)] text-base max-w-md lg:text-right">
            Technologies and tools I work with — sized by proficiency and frequency of use.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {[marqueeRow1, marqueeRow2].map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="overflow-hidden border-y border-[rgba(240,240,245,0.08)] py-5 group"
          >
            {reduced ? (
              <div className="flex flex-wrap gap-3 justify-center px-4">
                {allSkills.map(({ skill }) => (
                  <span key={skill} className="pill-outline">{skill}</span>
                ))}
              </div>
            ) : (
              <motion.div
                className="flex gap-8 whitespace-nowrap px-4"
                animate={{ x: rowIndex === 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
                transition={{
                  duration: rowIndex === 0 ? 40 : 45,
                  repeat: Infinity,
                  ease: "linear",
                }}
                whileHover={{ animationPlayState: "paused" }}
                style={{ animationPlayState: "running" }}
              >
                {row.map(({ skill, weight, category }, i) => (
                  <motion.span
                    key={`${skill}-${i}`}
                    data-cursor="hover"
                    className="inline-flex flex-col items-start shrink-0 cursor-default"
                    whileHover={{ scale: 1.05, color: "var(--color-primary)" }}
                  >
                    <span
                      className="font-display font-semibold tracking-tight transition-colors"
                      style={{ fontSize: `${0.85 + weight * 0.55}rem` }}
                    >
                      {skill}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-secondary)] mt-1">
                      {category}
                    </span>
                  </motion.span>
                ))}
              </motion.div>
            )}
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {portfolio.skillCategories.map((cat, i) => (
          <motion.div
            key={cat.id}
            className="border-subtle p-4 bg-[var(--color-surface-1)] hover:border-[var(--color-primary)] hover:shadow-[0_0_15px_color-mix(in_srgb,var(--color-primary)_20%,transparent)] transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-primary)] mb-2">
              {String(i + 1).padStart(2, "0")}
            </p>
            <p className="font-display font-medium text-sm text-[var(--color-text-primary)]">{cat.label}</p>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">{cat.skills.length} skills</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

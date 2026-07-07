import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Code, Server, Database, Wrench } from "lucide-react";
import { portfolio } from "../../data/portfolio";
import { SectionWrapper } from "../ui/SectionWrapper";
import { SkillPill } from "../ui/SkillPill";
import { SparkleIcon } from "../ui/SparkleIcon";
import { DecorativeRings } from "../ui/DecorativeRings";
import { GradientBlob } from "../ui/GradientBlob";
import { HoverHighlighter } from "../ui/HoverHighlighter";
import { Tabs, TabsContent, TabsList, TabsTrigger, TabsIndicator } from "../ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cardVariants } from "@/lib/animations";

const categoryIcons: Record<string, typeof Code> = {
  languages: Code,
  "web-dev": Server,
  databases: Database,
  tools: Wrench,
};

export function Skills() {
  const { skillCategories } = portfolio;
  const [activeTab, setActiveTab] = useState(skillCategories[0].id);

  return (
    <SectionWrapper id="skills" className="relative surface-plum section-padding overflow-hidden">
      <DecorativeRings variant="plum" />
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern pointer-events-none opacity-40" />
      {/* Floating blobs */}
      <GradientBlob className="w-[350px] h-[350px] top-[10%] -left-20" color="wine" duration={16} />
      <GradientBlob className="w-[300px] h-[300px] bottom-[5%] -right-10" color="amber" duration={13} delay={5} />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Star size={20} style={{ color: "var(--color-amber)" }} fill="var(--color-amber)" />
            <h2 className="heading-lg" style={{ color: "var(--text-primary)" }}>
              <HoverHighlighter
                text="Expertise"
                textColor="var(--text-primary)"
                penColor="var(--color-amber)"
                penOpacity={35}
                penHeight={40}
                penOffset={4}
                className="inline"
              />
            </h2>
            <SparkleIcon size={18} delay={0.5} />
          </div>
          <p className="text-base font-alt" style={{ color: "var(--text-secondary)" }}>
            Technologies and tools I work with
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full justify-center mb-2">
            {skillCategories.map((cat) => (
              <TabsTrigger key={cat.id} value={cat.id} className="relative overflow-hidden font-alt">
                {activeTab === cat.id && <TabsIndicator layoutId="skills-tab-indicator" />}
                <span className="relative z-10">{cat.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {skillCategories.map((cat) => {
            const IconComponent = categoryIcons[cat.id] || Code;
            return (
              <TabsContent key={cat.id} value={cat.id}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="relative group"
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
                      <Card className="relative border-2 hover:border-amber-400 transition-colors group-hover:shadow-[0_16px_40px_color-mix(in_srgb,var(--color-amber)_18%,transparent)]">
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <motion.div
                              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                              style={{ background: "color-mix(in srgb, var(--color-amber) 15%, transparent)" }}
                              whileHover={{ scale: 1.15, rotate: 12 }}
                              transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            >
                              <IconComponent size={20} style={{ color: "var(--color-amber)" }} />
                            </motion.div>
                            <CardTitle className="font-alt">{cat.label}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <motion.div
                            className="flex flex-wrap justify-center gap-3"
                            initial="hidden"
                            animate="visible"
                            variants={{
                              hidden: {},
                              visible: { transition: { staggerChildren: 0.05 } },
                            }}
                          >
                            {cat.skills.map((skill, i) => (
                              <SkillPill key={skill} name={skill} index={i} />
                            ))}
                          </motion.div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </SectionWrapper>
  );
}

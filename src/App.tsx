import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Skills } from "./components/sections/Skills";
import { Projects } from "./components/sections/Projects";
import { Experience } from "./components/sections/Experience";
import { Contact } from "./components/sections/Contact";
import { CustomCursor } from "./components/ui/CustomCursor";
import { ScrollBackground } from "./components/ui/ScrollBackground";
import { InteractiveTicker } from "./components/ui/InteractiveTicker";
import { Preloader } from "./components/ui/Preloader";
import { SmoothScroll } from "./components/ui/SmoothScroll";
import { portfolio } from "./data/portfolio";

const allSkills = portfolio.skillCategories.flatMap((c) => c.skills);

const tickerItems = [
  { label: "Available for work", href: "#contact" },
  { label: portfolio.role, href: "#about" },
  { label: `${portfolio.about.leetcode.count}+ LeetCode`, href: "#about" },
  ...allSkills.slice(0, 6).map((s) => ({ label: s, href: "#skills" as const })),
  { label: portfolio.contact.email, href: `mailto:${portfolio.contact.email}` },
];

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <SmoothScroll>
          <div className="relative">
            <ScrollBackground />
            <CustomCursor />
            <Navbar />

            <main>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Experience />
                <Contact />
              </motion.div>
            </main>

            <InteractiveTicker
              items={tickerItems}
              className="py-5 border-t border-[color-mix(in_srgb,var(--color-text-primary)_6%,transparent)] bg-[var(--color-surface)]"
            />
            <Footer />
          </div>
        </SmoothScroll>
      )}
    </>
  );
}

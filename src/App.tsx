import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Skills } from "./components/sections/Skills";
import { Projects } from "./components/sections/Projects";
import { Experience } from "./components/sections/Experience";
import { Infrastructure } from "./components/sections/Infrastructure";
import { Contact } from "./components/sections/Contact";
import { CursorTrail } from "./components/ui/CursorTrail";
import { ConfettiBurst } from "./components/ui/ConfettiBurst";
import { ScrollProgressBar } from "./components/ui/ScrollProgressBar";
import { ScrollBackground } from "./components/ui/ScrollBackground";
import { InteractiveTicker } from "./components/ui/InteractiveTicker";
import { SectionMorphBlob } from "./components/ui/SectionMorphBlob";
import { Preloader } from "./components/ui/Preloader";
import { portfolio } from "./data/portfolio";

const tickerItems = [
  { label: portfolio.role, href: "#about" },
  { label: "Open to opportunities", href: "#contact" },
  { label: `${portfolio.about.leetcode.count}+ LeetCode Problems`, href: "#about" },
  { label: "Full Stack Developer", href: "#projects" },
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
        <div className="relative">
          <SectionMorphBlob />
          <ScrollBackground />
          <ScrollProgressBar />
          <CursorTrail />
          <ConfettiBurst />
          <Navbar />

          <main>
            <AnimatePresence mode="wait">
              <motion.div
                key="all-sections"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Experience />
                <Infrastructure />
                <Contact />
              </motion.div>
            </AnimatePresence>
          </main>

          <InteractiveTicker
            items={tickerItems}
            className="py-4 border-t border-amber-400/10 bg-[color-mix(in_srgb,var(--color-amber)_3%,var(--bg-primary))]"
          />
          <Footer />
        </div>
      )}
    </>
  );
}

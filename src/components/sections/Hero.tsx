import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import DarkVeil from "@/components/DarkVeil";
import { ClipPathReveal } from "@/components/ui/ClipPathReveal";
import { OdometerCounter } from "@/components/ui/OdometerCounter";
import { RippleLineGrid } from "@/components/ui/RippleLineGrid";
import { HoverHighlighter } from "@/components/ui/HoverHighlighter";
import { Typewriter } from "@/components/ui/Typewriter";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Hero() {
  const { hero, name, role } = portfolio;
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [liveStats, setLiveStats] = useState<Record<string, number>>({});

  useEffect(() => {
    async function fetchLeetCodeStats() {
      try {
        const res = await fetch("/api/leetcode-stats");
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        const allStats = data?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum?.find((d: any) => d.difficulty === "All");
        if (allStats?.count) {
          setLiveStats((prev) => ({ ...prev, "LeetCode Problems": allStats.count }));
        } else {
          setLiveStats((prev) => ({ ...prev, "LeetCode Problems": 100 }));
        }
      } catch (e) {
        setLiveStats((prev) => ({ ...prev, "LeetCode Problems": 100 }));
      }
    }
    fetchLeetCodeStats();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden bg-[var(--color-background)]"
      aria-label="Hero section"
    >
      <div className="absolute inset-0 z-0">
        <DarkVeil
          hueShift={255}
          noiseIntensity={0}
          scanlineIntensity={0.01}
          speed={reduced ? 0 : 1.6}
          scanlineFrequency={0.5}
          warpAmount={5}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-background)]/20 to-[var(--color-background)]/90 pointer-events-none" />
      </div>
      <RippleLineGrid className="opacity-[0.06] z-[1]" />

      <motion.div
        className="relative z-10 min-h-[100svh] editorial-grid section-padding items-end pb-16 sm:pb-20"
        style={reduced ? {} : { y: contentY, opacity: contentOpacity }}
      >
        {/* Left column — massive headline */}
        <div className="col-span-12 lg:col-span-7 flex flex-col justify-center pt-24 lg:pt-32 pb-8">
          <motion.p
            className="section-label mb-6 text-[var(--color-primary)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            {role} — Available for work
          </motion.p>

          <h1 className="heading-hero font-display text-[var(--color-text-primary)] mb-6 flex flex-col">
            <span className="flex flex-wrap gap-x-[0.3em]">
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <HoverHighlighter
                  text={hero.headline[0]}
                  textColor="var(--color-primary)"
                  penColor="var(--color-secondary)"
                  penOpacity={30}
                  penHeight={40}
                  penOffset={4}
                  font={{ fontFamily: "inherit", fontWeight: "inherit", fontSize: "inherit", lineHeight: "inherit" }}
                />
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.27, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <HoverHighlighter
                  text={hero.headline[1]}
                  textColor="var(--color-text-primary)"
                  penColor="var(--color-secondary)"
                  penOpacity={30}
                  penHeight={40}
                  penOffset={4}
                  font={{ fontFamily: "inherit", fontWeight: "inherit", fontSize: "inherit", lineHeight: "inherit" }}
                />
              </motion.span>
            </span>
            
            <span className="flex flex-wrap gap-x-[0.3em]">
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.39, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <HoverHighlighter
                  text={hero.headline[2]}
                  textColor="var(--color-text-primary)"
                  penColor="var(--color-secondary)"
                  penOpacity={30}
                  penHeight={40}
                  penOffset={4}
                  font={{ fontFamily: "inherit", fontWeight: "inherit", fontSize: "inherit", lineHeight: "inherit" }}
                />
              </motion.span>
            </span>

            <span className="flex flex-wrap gap-x-[0.3em]">
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.51, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <HoverHighlighter
                  text={`${hero.headline[3]} ${hero.headline[4]}`}
                  textColor="var(--color-text-primary)"
                  penColor="var(--color-secondary)"
                  penOpacity={30}
                  penHeight={40}
                  penOffset={4}
                  font={{ fontFamily: "inherit", fontWeight: "inherit", fontSize: "inherit", lineHeight: "inherit" }}
                />
              </motion.span>
            </span>
          </h1>

          <motion.div
            className="mb-8 text-lg sm:text-xl font-body"
            style={{ color: "var(--color-secondary)", minHeight: "2em" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            <Typewriter words={[role, "Web Architect", "UI/UX Enthusiast"]} typingSpeed={70} deletingSpeed={40} pauseTime={2500} />
          </motion.div>

          <motion.p
            className="max-w-lg text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7 }}
          >
            {hero.subtext}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-6 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.7 }}
          >
            <a
              href={hero.cta.href}
              data-cursor="hover"
              className="group inline-flex items-center gap-3 px-7 py-3.5 bg-[var(--color-primary)] text-white font-medium text-sm tracking-wide focus-ring rounded-full hover:bg-[color-mix(in_srgb,var(--color-primary)_80%,#fff)] transition-colors"
            >
              {hero.cta.label}
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={hero.ctaSecondary.href}
              data-cursor="hover"
              className="link-arrow focus-ring text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors"
            >
              {hero.ctaSecondary.label}
              <span className="arrow-icon inline-block transition-transform">→</span>
            </a>
          </motion.div>
        </div>

        {/* Right column — name + stats */}
        <div className="col-span-12 lg:col-span-5 flex flex-col justify-end items-start lg:items-end gap-8 pt-8 lg:pt-32">
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-36 h-36 sm:w-44 sm:h-44">
              <div
                className="absolute inset-0 border border-[var(--color-primary)] opacity-40"
                style={{ transform: "rotate(45deg)" }}
              />
              <div className="absolute inset-2 overflow-hidden border border-white/10 bg-[var(--color-surface-1)]">
                <img
                  src={portfolio.photo}
                  alt={`${name} portrait`}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 opacity-90 hover:opacity-100"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = "none";
                  }}
                />
              </div>
            </div>
            <p className="mt-4 font-display text-sm tracking-[0.3em] uppercase text-[var(--color-text-secondary)]">
              <ClipPathReveal text={name} delay={1} />
            </p>
          </motion.div>

          <div className="grid grid-cols-3 gap-6 w-full lg:w-auto lg:min-w-[320px] border-t border-[rgba(240,240,245,0.08)] pt-8">
            {hero.stats.map((stat) => (
              <OdometerCounter
                key={stat.label}
                value={(stat as any).fetchLive ? (liveStats[stat.label] ?? stat.value) : stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </motion.div>

      <motion.a
        href="#about"
        data-cursor="hover"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-secondary)] transition-colors"
        animate={reduced ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        aria-label="Scroll to about section"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ArrowDown size={16} />
      </motion.a>
    </section>
  );
}

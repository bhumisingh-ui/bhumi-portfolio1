import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { portfolio } from "../../data/portfolio";
import { SparkleIcon } from "../ui/SparkleIcon";
import { RippleLineGrid } from "../ui/RippleLineGrid";
import { FluidBackground } from "../ui/FluidBackground";
import { HoverHighlighter } from "../ui/HoverHighlighter";
import { MagneticButton } from "../ui/MagneticButton";
import { GradientBlob } from "../ui/GradientBlob";
import { TextScramble } from "../ui/TextScramble";
import { Typewriter } from "../ui/Typewriter";
import { letterContainerVariants, letterVariants } from "@/lib/animations";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const sparklePositions = [
  { size: 22, className: "absolute top-[18%] left-[12%] hidden sm:block" },
  { size: 16, className: "absolute top-[25%] right-[15%] hidden sm:block" },
  { size: 28, className: "absolute bottom-[30%] left-[8%] hidden sm:block" },
  { size: 14, className: "absolute top-[15%] right-[30%]" },
  { size: 18, className: "absolute bottom-[20%] right-[10%]" },
  { size: 12, className: "absolute top-[40%] left-[25%] hidden lg:block" },
  { size: 20, className: "absolute bottom-[15%] left-[20%] hidden sm:block" },
];

const typewriterWords = [
  "Full Stack Web Developer",
  "React & Node.js Enthusiast",
  "UI/UX Passionate",
  "Problem Solver",
  "Open Source Contributor",
];

export function Hero() {
  const reduced = useReducedMotion();
  const { hero, name } = portfolio;
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], [0, -60]);

  const sparkleDelays = useMemo(
    () => sparklePositions.map(() => Math.random() * 2),
    []
  );

  const nameLetters = name.toUpperCase().split("");

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24"
      aria-label="Hero section"
    >
      {/* WebGL Fluid Background */}
      <div className="fluid-background">
        <FluidBackground
          patternStyle={3}
          abyssBase="#0f0814"
          abyssMid="#2d1b2e"
          abyssHigh="#d4a017"
          speed={0.85}
          scale={1.2}
          distortion={2}
          brightness={1.2}
          refraction={0.8}
        />
      </div>

      {/* Dark overlay for text readability */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,rgba(15,8,20,0.2)_0%,rgba(15,8,20,0.55)_60%,rgba(15,8,20,0.8)_100%)]" />

      {/* RippleLineGrid */}
      <RippleLineGrid className="opacity-20 z-[2]" />

      {/* Floating gradient blobs */}
      <GradientBlob className="w-[400px] h-[400px] top-[10%] left-[5%] z-[2]" color="wine" duration={12} />
      <GradientBlob className="w-[350px] h-[350px] bottom-[10%] right-[5%] z-[2]" color="amber" duration={15} delay={2} />
      <GradientBlob className="w-[250px] h-[250px] top-[50%] right-[20%] z-[2]" color="gold" duration={10} delay={4} />

      {/* Sparkles */}
      {sparklePositions.map((sparkle, i) => (
        <SparkleIcon
          key={i}
          size={sparkle.size}
          delay={sparkleDelays[i]}
          className={`${sparkle.className} z-[3]`}
        />
      ))}

      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center py-20 sm:py-0"
        style={reduced ? {} : { opacity: contentOpacity, scale: contentScale, y: contentY }}
      >
        {/* Scramble tagline */}
        <motion.p
          className="mb-4 text-xs sm:text-sm font-mono uppercase tracking-[0.25em]"
          style={{ color: "var(--color-amber)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <TextScramble text={portfolio.tagline} speed={25} />
        </motion.p>

        {/* Name — letter-by-letter tumbling entrance */}
        <motion.div
          className="mb-4 sm:mb-6"
          variants={letterContainerVariants}
          initial="hidden"
          animate="visible"
          style={{ perspective: 800 }}
        >
          <div
            className="flex flex-wrap justify-center gap-x-1 sm:gap-x-2"
            aria-label={name}
          >
            {nameLetters.map((letter, i) => (
              <motion.span
                key={`${letter}-${i}`}
                variants={letterVariants}
                className="font-display font-bold text-2xl sm:text-3xl tracking-widest inline-block"
                style={{
                  color: "var(--color-amber)",
                  transformStyle: "preserve-3d",
                  textShadow: "0 0 40px rgba(212,160,23,0.3)",
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Circular photo with rotating decorative ring */}
        <motion.div
          className="relative mx-auto mb-8 sm:mb-10"
          style={{ width: 170, height: 170 }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="absolute inset-[-12px] rounded-full pointer-events-none"
            style={{
              border: "2px dashed color-mix(in srgb, var(--color-amber) 40%, transparent)",
            }}
            animate={reduced ? {} : { rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            aria-hidden="true"
          />
          {/* Conic glow ring */}
          <motion.div
            className="absolute inset-[-4px] rounded-full pointer-events-none"
            style={{
              background: "conic-gradient(from 0deg, var(--color-amber), var(--color-gold), var(--color-wine), var(--color-amber))",
              filter: "blur(8px)",
              opacity: 0.4,
            }}
            animate={reduced ? {} : { rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "linear-gradient(135deg, var(--color-amber), var(--color-gold))",
              transform: "translate(8px, 8px)",
            }}
          />
          <div
            className="relative w-full h-full rounded-full overflow-hidden"
            style={{
              border: "4px solid var(--color-amber)",
              background: "var(--color-plum-mid)",
            }}
          >
            <img
              src={portfolio.photo}
              alt={`${name} portrait`}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = "none";
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:var(--color-plum-mid);color:var(--color-amber);font-family:'Fraunces',serif;font-size:3rem;font-weight:700;">BS</div>`;
                }
              }}
            />
          </div>
        </motion.div>

        {/* Headline with HoverHighlighter on ALL words */}
        <motion.h1
          className="heading-xl mb-4"
          style={{ color: "var(--text-primary)", perspective: 800 }}
          variants={letterContainerVariants}
          initial="hidden"
          animate="visible"
          aria-label={hero.headline.join(" ")}
        >
          {hero.headline.map((word, i) => (
            <motion.span
              key={i}
              variants={letterVariants}
              className="inline-block mr-[0.3em]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <HoverHighlighter
                text={word}
                textColor={i === 0 ? "var(--color-amber)" : "var(--text-primary)"}
                penColor={i === 0 ? "var(--color-wine)" : "var(--color-amber)"}
                penOpacity={i === 0 ? 50 : 30}
                penHeight={40}
                penOffset={4}
                penRadius={4}
                penLeft={4}
                penRight={4}
                font={{
                  fontFamily: "inherit",
                  fontWeight: "inherit",
                  fontSize: "inherit",
                  lineHeight: "inherit",
                }}
                className="inline"
              />
            </motion.span>
          ))}
        </motion.h1>

        {/* Typewriter effect for role */}
        <motion.div
          className="mb-8 text-lg sm:text-xl font-alt"
          style={{ color: "var(--color-gold)", minHeight: "2em" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <Typewriter words={typewriterWords} typingSpeed={70} deletingSpeed={40} pauseTime={2500} />
        </motion.div>

        <motion.p
          className="text-sm sm:text-base max-w-2xl mx-auto mb-10 leading-relaxed font-alt"
          style={{ color: "var(--text-secondary)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          {hero.subtext}
        </motion.p>

        {/* CTA buttons with magnetic effect */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          <MagneticButton href={hero.cta.href} variant="primary">
            {hero.cta.label}
          </MagneticButton>
          <MagneticButton href={hero.ctaSecondary.href} variant="outline">
            {hero.ctaSecondary.label}
          </MagneticButton>
        </motion.div>

        {/* Floating stats cards */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          {[
            { value: "400+", label: "LeetCode Problems" },
            { value: "8.94", label: "CGPA" },
            { value: "2+", label: "Major Projects" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="glass-strong rounded-2xl px-5 py-4 text-center"
              initial={{ opacity: 0, y: 40 }}
              animate={
                reduced
                  ? { opacity: 1, y: 0 }
                  : { opacity: 1, y: [0, -6, 0] }
              }
              transition={
                reduced
                  ? { delay: 2 + i * 0.15, duration: 0.6 }
                  : {
                      opacity: { delay: 2 + i * 0.15, duration: 0.6 },
                      y: { duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: 2.5 + i * 0.3 },
                    }
              }
            >
              <p className="text-2xl font-bold tracking-tight font-display" style={{ color: "var(--color-amber)" }}>
                {stat.value}
              </p>
              <p className="mt-1 text-[10px] font-medium uppercase tracking-wider font-alt" style={{ color: "var(--text-secondary)" }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.a
          href="#about"
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={20} style={{ color: "var(--text-secondary)", opacity: 0.5 }} />
        </motion.a>
      </motion.div>
    </section>
  );
}

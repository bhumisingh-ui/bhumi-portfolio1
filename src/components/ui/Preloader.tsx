import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

const logoLetterVariants = {
  hidden: { opacity: 0, y: 80, rotateX: 90, filter: "blur(12px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.4 + i * 0.18,
      type: "spring",
      stiffness: 120,
      damping: 18,
    },
  }),
};

const dotVariants = {
  hidden: { opacity: 0, scale: 0, y: 20 },
  visible: {
    opacity: 1,
    scale: [0, 1.6, 1],
    y: 0,
    transition: {
      delay: 0.85,
      type: "spring",
      stiffness: 400,
      damping: 12,
    },
  },
};

const subtitleCharVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 0.7,
    y: 0,
    transition: { delay: 1.3 + i * 0.03, duration: 0.3 },
  }),
};

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);

  const handleComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 10 + 4;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(handleComplete, 700);
      }
      setProgress(Math.min(current, 100));
    }, 90);
    return () => clearInterval(interval);
  }, [handleComplete]);

  const subtitle = "Full Stack Developer";

  return (
    <motion.div
      className="fixed inset-0 z-[10001] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#0f080f" }}
      initial={{ clipPath: "inset(0 0 0 0)" }}
      exit={{
        clipPath: "inset(0 0 100% 0)",
        transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.1 },
      }}
    >
      {/* Ambient glow orbs */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 400,
          height: 400,
          background:
            "radial-gradient(circle, rgba(212,160,23,0.12), transparent 70%)",
          filter: "blur(80px)",
          top: "20%",
          left: "25%",
        }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 350,
          height: 350,
          background:
            "radial-gradient(circle, rgba(107,58,93,0.15), transparent 70%)",
          filter: "blur(70px)",
          bottom: "15%",
          right: "20%",
        }}
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Converging particles */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 250;
        return (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: 4,
              height: 4,
              background: i % 2 === 0 ? "#d4a017" : "#f0c850",
            }}
            initial={{
              x: Math.cos(angle) * radius,
              y: Math.sin(angle) * radius,
              opacity: 0,
              scale: 0,
            }}
            animate={{
              x: 0,
              y: 0,
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 1.2,
              delay: i * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        );
      })}

      {/* Logo: BS. */}
      <div style={{ perspective: 800 }}>
        <div className="flex items-baseline select-none">
          {"BS".split("").map((letter, i) => (
            <motion.span
              key={letter}
              custom={i}
              variants={logoLetterVariants}
              initial="hidden"
              animate="visible"
              className="font-display font-bold text-7xl sm:text-8xl tracking-tight inline-block"
              style={{
                color: "#d4a017",
                transformStyle: "preserve-3d",
                textShadow: "0 0 60px rgba(212,160,23,0.3)",
              }}
            >
              {letter}
            </motion.span>
          ))}
          <motion.span
            variants={dotVariants}
            initial="hidden"
            animate="visible"
            className="font-display font-bold text-7xl sm:text-8xl inline-block"
            style={{ color: "#f5f1e8" }}
          >
            .
          </motion.span>
        </div>
      </div>

      {/* Subtitle */}
      <div className="mt-5 flex overflow-hidden">
        {subtitle.split("").map((char, i) => (
          <motion.span
            key={`sub-${i}`}
            custom={i}
            variants={subtitleCharVariants}
            initial="hidden"
            animate="visible"
            className="text-xs sm:text-sm tracking-[0.3em] uppercase font-body"
            style={{ color: "#c4b5a0" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>

      {/* Decorative line */}
      <motion.div
        className="mt-8 h-px rounded-full"
        style={{ background: "rgba(212,160,23,0.2)" }}
        initial={{ width: 0 }}
        animate={{ width: 80 }}
        transition={{ delay: 1.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Progress bar */}
      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 w-52">
        <div
          className="h-[2px] rounded-full overflow-hidden"
          style={{ background: "rgba(212,160,23,0.08)" }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              background:
                "linear-gradient(90deg, #d4a017, #f0c850, #d4a017)",
              backgroundSize: "200% 100%",
            }}
            animate={{
              width: `${progress}%`,
              backgroundPosition: ["0% 0%", "100% 0%"],
            }}
            transition={{
              width: { ease: "easeOut", duration: 0.3 },
              backgroundPosition: {
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          />
        </div>
        <motion.p
          className="text-center mt-3 text-[10px] tracking-[0.4em] uppercase font-body"
          style={{ color: "rgba(196,181,160,0.35)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.5 }}
        >
          {Math.round(progress)}%
        </motion.p>
      </div>
    </motion.div>
  );
}

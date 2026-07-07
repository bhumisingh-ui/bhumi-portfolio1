import { motion } from "framer-motion";

interface SparkleIconProps {
  size?: number;
  color?: string;
  delay?: number;
  className?: string;
}

export function SparkleIcon({
  size = 20,
  color = "var(--color-gold)",
  delay = 0,
  className = "",
}: SparkleIconProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className={className}
      aria-hidden="true"
      animate={{
        scale: [0.8, 1.2, 0.8],
        opacity: [0.4, 1, 0.4],
        rotate: [0, 15, 0],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    >
      <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z" />
    </motion.svg>
  );
}

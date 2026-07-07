import { useEffect, useRef } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface TrailDot {
  x: number;
  y: number;
  opacity: number;
  size: number;
}

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<TrailDot[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    // Only on desktop with fine pointer
    if (reduced) return;
    const mql = window.matchMedia("(pointer: fine) and (min-width: 768px)");
    if (!mql.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      dotsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        opacity: 0.6,
        size: 4,
      });
      if (dotsRef.current.length > 20) {
        dotsRef.current.shift();
      }
    };
    window.addEventListener("mousemove", handleMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dotsRef.current.forEach((dot) => {
        dot.opacity -= 0.025;
        dot.size *= 0.97;

        if (dot.opacity > 0) {
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(212, 160, 23, ${dot.opacity})`;
          ctx.fill();

          // Outer glow
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dot.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(240, 200, 80, ${dot.opacity * 0.2})`;
          ctx.fill();
        }
      });

      dotsRef.current = dotsRef.current.filter((d) => d.opacity > 0);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999] hidden md:block"
      aria-hidden="true"
    />
  );
}

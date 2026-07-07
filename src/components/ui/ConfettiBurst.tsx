import { useCallback, useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  shape: "circle" | "square" | "star";
}

const COLORS = ["#d4a017", "#f0c850", "#6b3a5d", "#f5f1e8", "#f5d87a", "#8b5a3a"];

export function ConfettiBurst() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const [active, setActive] = useState(false);

  const burst = useCallback((originX?: number, originY?: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const cx = originX ?? canvas.width / 2;
    const cy = originY ?? canvas.height / 2;

    const shapes: Particle["shape"][] = ["circle", "square", "star"];

    for (let i = 0; i < 60; i++) {
      const angle = (Math.PI * 2 * i) / 60 + (Math.random() - 0.5) * 0.5;
      const speed = 4 + Math.random() * 8;
      particlesRef.current.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - Math.random() * 3,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 4 + Math.random() * 6,
        opacity: 1,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 15,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
      });
    }
    setActive(true);
  }, []);

  useEffect(() => {
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

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // gravity
        p.opacity -= 0.012;
        p.rotation += p.rotationSpeed;
        p.vx *= 0.99;

        if (p.opacity > 0) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = p.color;

          if (p.shape === "circle") {
            ctx.beginPath();
            ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
            ctx.fill();
          } else if (p.shape === "square") {
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          } else {
            // star
            const spikes = 5;
            const outerR = p.size / 2;
            const innerR = outerR / 2;
            ctx.beginPath();
            for (let i = 0; i < spikes * 2; i++) {
              const r = i % 2 === 0 ? outerR : innerR;
              const a = (Math.PI * i) / spikes - Math.PI / 2;
              if (i === 0) ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r);
              else ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
            }
            ctx.closePath();
            ctx.fill();
          }
          ctx.restore();
        }
      });

      particlesRef.current = particlesRef.current.filter((p) => p.opacity > 0);

      if (particlesRef.current.length === 0) {
        setActive(false);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Expose burst function via ref on window for contact form
  useEffect(() => {
    (window as unknown as Record<string, unknown>).__confettiBurst = burst;
    return () => {
      delete (window as unknown as Record<string, unknown>).__confettiBurst;
    };
  }, [burst]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-[10000] ${active ? "" : "hidden"}`}
      aria-hidden="true"
    />
  );
}

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Server, Database, Power, RefreshCw, Zap, Cpu } from "lucide-react";
import { SectionWrapper, StaggerContainer, staggerChildVariants } from "../ui/SectionWrapper";
import { SparkleIcon } from "../ui/SparkleIcon";
import { DecorativeRings } from "../ui/DecorativeRings";
import { HoverHighlighter } from "../ui/HoverHighlighter";
import { MagneticButton } from "../ui/MagneticButton";

type DeployState = "idle" | "deploying" | "success";

const initialLogs = [
  { text: "$ Ready to deploy infrastructure...", type: "info" }
];

const deploymentLogs = [
  { text: "$ Initializing containers...", type: "info" },
  { text: "$ API Gateway: online ✓", type: "success" },
  { text: "$ App Server: online ✓", type: "success" },
  { text: "$ Database connected ✓", type: "success" },
  { text: "$ Network topology mapped ✓", type: "success" },
  { text: "$ Infrastructure ready ⚡", type: "success" }
];

export function Infrastructure() {
  const [deployState, setDeployState] = useState<DeployState>("idle");
  const [logs, setLogs] = useState(initialLogs);
  const [currentStep, setCurrentStep] = useState(-1);

  const handleDeploy = () => {
    if (deployState !== "idle") return;
    
    setDeployState("deploying");
    setLogs([deploymentLogs[0]]);
    setCurrentStep(0);
  };

  const handleReset = () => {
    setDeployState("idle");
    setLogs(initialLogs);
    setCurrentStep(-1);
  };

  // Deployment sequence interval
  useEffect(() => {
    if (deployState === "deploying") {
      let step = 0;
      const interval = setInterval(() => {
        step++;
        setCurrentStep(step);
        setLogs(prev => [...prev, deploymentLogs[step]]);
        
        if (step === 5) {
          setDeployState("success");
          clearInterval(interval);
          
          // Trigger confetti if available globally
          const burst = (window as any).__confettiBurst;
          if (burst) {
            setTimeout(() => burst(), 100);
            setTimeout(() => burst(), 400);
            setTimeout(() => burst(), 700);
          }
        }
      }, 1200);

      return () => clearInterval(interval);
    }
  }, [deployState]);

  return (
    <SectionWrapper id="infrastructure" className="relative surface-plum section-padding overflow-hidden">
      <DecorativeRings variant="plum" />
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <SparkleIcon size={20} delay={0.2} color="var(--color-amber)" />
            <h2 className="heading-lg" style={{ color: "var(--text-primary)" }}>
              <HoverHighlighter
                text="Infrastructure"
                textColor="var(--text-primary)"
                penColor="var(--color-amber)"
                penOpacity={35}
                penHeight={40}
                penOffset={4}
                className="inline"
              />
            </h2>
            <SparkleIcon size={16} delay={1.1} color="var(--color-gold)" />
          </div>
          <p className="text-base font-alt" style={{ color: "var(--text-secondary)" }}>
            Full-stack architecture deployed in real-time
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side: Terminal and Controls */}
          <StaggerContainer className="flex flex-col gap-6 order-2 lg:order-1">
            <motion.div variants={staggerChildVariants} className="glass-strong rounded-2xl overflow-hidden border border-[color-mix(in_srgb,var(--color-amber)_20%,transparent)]">
              {/* Terminal Header */}
              <div className="bg-[#1a0f1b] px-4 py-3 flex items-center gap-2 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="mx-auto flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)]">
                  <Terminal size={14} /> deploy.sh
                </div>
              </div>
              
              {/* Terminal Body */}
              <div className="bg-[#0f0814]/80 p-6 h-[250px] overflow-y-auto font-mono text-sm">
                <AnimatePresence>
                  {logs.map((log, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`mb-2 ${log.type === 'success' ? 'text-green-400' : 'text-[var(--color-amber)]'}`}
                    >
                      {log.text}
                    </motion.div>
                  ))}
                  {deployState === "deploying" && (
                    <motion.div
                      className="text-[var(--text-secondary)] mt-2 flex items-center gap-2"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    >
                      <span>_</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.div variants={staggerChildVariants} className="flex flex-wrap gap-4 items-center justify-center lg:justify-start">
              {deployState === "idle" ? (
                <MagneticButton onClick={handleDeploy} variant="primary">
                  <span className="flex items-center gap-2">
                    <Power size={18} /> Deploy Infrastructure ⚡
                  </span>
                </MagneticButton>
              ) : (
                <button
                  onClick={handleReset}
                  className="pill-btn-outline font-alt"
                  disabled={deployState === "deploying"}
                  style={{ opacity: deployState === "deploying" ? 0.5 : 1 }}
                >
                  <RefreshCw size={16} className={deployState === "deploying" ? "animate-spin" : ""} /> Reset Environment
                </button>
              )}
            </motion.div>
            
            {/* Legend/Architecture Icons */}
            <motion.div variants={staggerChildVariants} className="grid grid-cols-3 gap-4 mt-4">
              <div className="flex flex-col items-center justify-center p-3 rounded-xl glass-warm transition-all duration-300">
                <Server size={20} className="mb-2 transition-colors duration-300" style={{ color: currentStep >= 1 ? "var(--color-amber)" : "var(--text-secondary)" }} />
                <span className="text-xs font-alt text-center">API Gateway</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 rounded-xl glass-warm transition-all duration-300">
                <Zap size={20} className="mb-2 transition-colors duration-300" style={{ color: currentStep >= 2 ? "var(--color-gold)" : "var(--text-secondary)" }} />
                <span className="text-xs font-alt text-center">App Server</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 rounded-xl glass-warm transition-all duration-300">
                <Database size={20} className="mb-2 transition-colors duration-300" style={{ color: currentStep >= 3 ? "var(--color-amber)" : "var(--text-secondary)" }} />
                <span className="text-xs font-alt text-center">Database</span>
              </div>
            </motion.div>
          </StaggerContainer>

          {/* Right Side: Animated Network Diagram */}
          <motion.div 
            className="h-[400px] lg:h-[500px] w-full rounded-2xl relative order-1 lg:order-2 flex items-center justify-center glass-strong border border-[color-mix(in_srgb,var(--color-amber)_15%,transparent)] overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Subtle inner glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,color-mix(in_srgb,var(--color-plum-mid)_40%,transparent),transparent_70%)] pointer-events-none" />
            
            <NetworkDiagram step={currentStep} />
            
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}

// ----------------------------------------------------------------------
// Advanced SVG Network Diagram Component
// ----------------------------------------------------------------------
function NetworkDiagram({ step }: { step: number }) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [clickRipples, setClickRipples] = useState<{id: number, x: number, y: number, color: string}[]>([]);

  const isApiReady = step >= 1;
  const isAppReady = step >= 2;
  const isDbReady = step >= 3;
  const isNetworkReady = step >= 4;
  const isAllReady = step >= 5;

  // Colors
  const apiColor = "#d4a017"; // Gold
  const appColor = "#ff7f50"; // Coral
  const dbColor = "#c08081";  // Rose
  const inactiveColor = "color-mix(in srgb, var(--color-plum-mid) 80%, white)";

  const addRipple = (e: React.MouseEvent, color: string) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const newRipple = { id: Date.now(), x, y, color };
    setClickRipples(prev => [...prev, newRipple]);
    setTimeout(() => {
      setClickRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 1000);
  };

  // Node Positions
  const posApi = { x: 100, y: 120 };
  const posApp = { x: 300, y: 120 };
  const posDb = { x: 200, y: 280 };
  const center = { x: 200, y: 180 };

  // Bezier Paths
  const pathApiApp = `M ${posApi.x} ${posApi.y} Q 200 70 ${posApp.x} ${posApp.y}`;
  const pathAppDb = `M ${posApp.x} ${posApp.y} Q 280 200 ${posDb.x} ${posDb.y}`;
  const pathDbApi = `M ${posDb.x} ${posDb.y} Q 120 200 ${posApi.x} ${posApi.y}`;

  // Overshoot easing for drawing lines
  const drawTransition = { duration: 1.2, ease: [0.34, 1.56, 0.64, 1] as any };

  // Generate background particles
  const particles = useMemo(() => {
    return Array.from({ length: 15 }).map(() => ({
      x: Math.random() * 400,
      y: Math.random() * 400 + 400,
      dur: 10 + Math.random() * 20,
      delay: -Math.random() * 20,
    }));
  }, []);

  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center overflow-hidden">
      
      {/* Background Grid & Particles */}
      <div className="absolute inset-0 opacity-20"
           style={{
             backgroundImage: 'radial-gradient(var(--color-amber) 1px, transparent 1px)',
             backgroundSize: '30px 30px',
             animation: 'gridDrift 20s linear infinite'
           }}>
        <style>{`
          @keyframes gridDrift {
            0% { background-position: 0 0; }
            100% { background-position: 30px 30px; }
          }
        `}</style>
      </div>

      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
        {/* Ambient Particles */}
        {particles.map((p, i) => (
          <circle key={i} cx={p.x} cy="0" r="1.5" fill="var(--color-amber)" opacity="0.3">
            <animate attributeName="cy" values={`${p.y};-50`} dur={`${p.dur}s`} begin={`${p.delay}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;0.5;0" dur={`${p.dur}s`} begin={`${p.delay}s`} repeatCount="indefinite" />
          </circle>
        ))}

        <defs>
          <radialGradient id="glowG" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={apiColor} stopOpacity="1" />
            <stop offset="100%" stopColor={apiColor} stopOpacity="0" />
          </radialGradient>
          {/* Comet Trails */}
          <linearGradient id="cometApiApp" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={apiColor} stopOpacity="0" />
            <stop offset="100%" stopColor={apiColor} stopOpacity="1" />
          </linearGradient>
          <linearGradient id="cometAppDb" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={appColor} stopOpacity="0" />
            <stop offset="100%" stopColor={appColor} stopOpacity="1" />
          </linearGradient>
          <linearGradient id="cometDbApi" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={dbColor} stopOpacity="0" />
            <stop offset="100%" stopColor={dbColor} stopOpacity="1" />
          </linearGradient>
          <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Network Lines */}
        <motion.path
          d={pathApiApp}
          stroke={isNetworkReady ? inactiveColor : "transparent"}
          strokeWidth="2"
          strokeDasharray="4 4"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isNetworkReady ? 1 : 0 }}
          transition={drawTransition}
        />
        <motion.path
          d={pathAppDb}
          stroke={isNetworkReady ? inactiveColor : "transparent"}
          strokeWidth="2"
          strokeDasharray="4 4"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isNetworkReady ? 1 : 0 }}
          transition={{ ...drawTransition, delay: 0.1 }}
        />
        <motion.path
          d={pathDbApi}
          stroke={isNetworkReady ? inactiveColor : "transparent"}
          strokeWidth="2"
          strokeDasharray="4 4"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isNetworkReady ? 1 : 0 }}
          transition={{ ...drawTransition, delay: 0.2 }}
        />

        {/* Traveling Comet Trails (Data Flow) */}
        {isAllReady && (
          <>
            {/* Comet API -> App (Fast) */}
            <g filter="url(#glow-filter)">
              <circle r="3" fill={apiColor}>
                <animateMotion dur="1.2s" repeatCount="indefinite" path={pathApiApp} rotate="auto" />
              </circle>
              <path d="M-20,0 L0,0" stroke="url(#cometApiApp)" strokeWidth="3" strokeLinecap="round">
                <animateMotion dur="1.2s" repeatCount="indefinite" path={pathApiApp} rotate="auto" />
              </path>
            </g>

            {/* Comet App -> DB (Medium) */}
            <g filter="url(#glow-filter)">
              <circle r="3" fill={appColor}>
                <animateMotion dur="1.8s" repeatCount="indefinite" path={pathAppDb} rotate="auto" />
              </circle>
              <path d="M-20,0 L0,0" stroke="url(#cometAppDb)" strokeWidth="3" strokeLinecap="round">
                <animateMotion dur="1.8s" repeatCount="indefinite" path={pathAppDb} rotate="auto" />
              </path>
            </g>

            {/* Comet DB -> API (Slow) */}
            <g filter="url(#glow-filter)">
              <circle r="3" fill={dbColor}>
                <animateMotion dur="2.4s" repeatCount="indefinite" path={pathDbApi} rotate="auto" />
              </circle>
              <path d="M-20,0 L0,0" stroke="url(#cometDbApi)" strokeWidth="3" strokeLinecap="round">
                <animateMotion dur="2.4s" repeatCount="indefinite" path={pathDbApi} rotate="auto" />
              </path>
            </g>
          </>
        )}

        {/* Finale: Expanding Ring Pulse */}
        <AnimatePresence>
          {isAllReady && (
            <motion.circle
              cx={center.x}
              cy={center.y}
              initial={{ r: 0, opacity: 1, strokeWidth: 4 }}
              animate={{ r: 250, opacity: 0, strokeWidth: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              stroke="var(--color-gold)"
              fill="none"
            />
          )}
        </AnimatePresence>
      </svg>

      {/* Finale Spark */}
      <AnimatePresence>
        {isAllReady && (
          <motion.div
            className="absolute z-20 pointer-events-none"
            style={{ left: center.x - 24, top: center.y - 24, color: "var(--color-gold)", filter: "drop-shadow(0 0 10px var(--color-gold))" }}
            initial={{ scale: 0, opacity: 1, rotate: -45 }}
            animate={{ scale: 2, opacity: 0, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Zap size={48} fill="currentColor" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Ripples */}
      <AnimatePresence>
        {clickRipples.map(ripple => (
          <motion.div
            key={ripple.id}
            className="absolute rounded-full pointer-events-none z-30"
            style={{ border: `2px solid ${ripple.color}` }}
            initial={{ left: ripple.x - 10, top: ripple.y - 10, width: 20, height: 20, opacity: 1 }}
            animate={{ left: ripple.x - 60, top: ripple.y - 60, width: 120, height: 120, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      {/* Nodes Layer (HTML for styling/hover) */}
      <div className="absolute inset-0 w-full h-full max-w-[400px] max-h-[400px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        
        {/* 1. API Gateway */}
        <div className="absolute z-10" style={{ left: posApi.x - 35, top: posApi.y - 35 }}
             onMouseEnter={() => setHoveredNode("api")} onMouseLeave={() => setHoveredNode(null)}
             onClick={(e) => addRipple(e, apiColor)}>
          {/* Radar Ping Aura */}
          {isApiReady && (
            <motion.div className="absolute inset-0 rounded-full"
              style={{ border: `2px solid ${apiColor}` }}
              animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          {/* Finale Flash */}
          <motion.div className="absolute inset-0 rounded-full bg-white blur-md pointer-events-none"
            initial={{ opacity: 0 }} animate={{ opacity: isAllReady ? [0, 0.8, 0] : 0 }} transition={{ duration: 0.5, delay: 0 }}
          />
          <motion.div
            className="relative flex items-center justify-center w-[70px] h-[70px] cursor-pointer"
            style={{
              clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
              background: isApiReady ? "color-mix(in srgb, #1a0f1b 30%, transparent)" : "#1a0f1b",
              border: `2px solid ${isApiReady ? apiColor : inactiveColor}`,
              backgroundColor: isApiReady ? "color-mix(in srgb, " + apiColor + " 20%, #1a0f1b)" : "#1a0f1b",
              boxShadow: isApiReady ? `0 0 20px ${apiColor}` : "none",
            }}
            animate={isApiReady ? { scale: [1, 1.05, 1], filter: hoveredNode === "api" ? `drop-shadow(0 0 15px ${apiColor})` : 'none' } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.1 }}
          >
            <Server size={30} strokeWidth={1.5} style={{ color: isApiReady ? apiColor : inactiveColor }} />
          </motion.div>
          {/* Tooltip */}
          <AnimatePresence>
            {hoveredNode === "api" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
                className="absolute top-[-40px] left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-mono bg-[#0f0814] border border-white/10 shadow-xl z-50">
                <span style={{ color: apiColor }}>API Gateway</span> — Routing requests since 0.02s
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 2. App Server */}
        <div className="absolute z-10" style={{ left: posApp.x - 35, top: posApp.y - 35 }}
             onMouseEnter={() => setHoveredNode("app")} onMouseLeave={() => setHoveredNode(null)}
             onClick={(e) => addRipple(e, appColor)}>
          {/* Radar Ping Aura */}
          {isAppReady && (
            <motion.div className="absolute inset-0 rounded-full"
              style={{ border: `2px solid ${appColor}` }}
              animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.2 }}
            />
          )}
          {/* Finale Flash */}
          <motion.div className="absolute inset-0 rounded-full bg-white blur-md pointer-events-none"
            initial={{ opacity: 0 }} animate={{ opacity: isAllReady ? [0, 0.8, 0] : 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          />
          <motion.div
            className="relative flex items-center justify-center w-[70px] h-[70px] cursor-pointer rounded-xl"
            style={{
              background: isAppReady ? "color-mix(in srgb, " + appColor + " 20%, #1a0f1b)" : "#1a0f1b",
              border: `2px solid ${isAppReady ? appColor : inactiveColor}`,
              boxShadow: isAppReady ? `0 0 20px ${appColor}` : "none",
            }}
            animate={isAppReady ? { scale: [1, 1.05, 1], filter: hoveredNode === "app" ? `drop-shadow(0 0 15px ${appColor})` : 'none' } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            whileHover={{ scale: 1.1 }}
          >
            <Cpu size={30} strokeWidth={1.5} style={{ color: isAppReady ? appColor : inactiveColor }} />
          </motion.div>
          {/* Tooltip */}
          <AnimatePresence>
            {hoveredNode === "app" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
                className="absolute top-[-40px] left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-mono bg-[#0f0814] border border-white/10 shadow-xl z-50">
                <span style={{ color: appColor }}>App Server</span> — Compute active
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 3. Database */}
        <div className="absolute z-10" style={{ left: posDb.x - 35, top: posDb.y - 35 }}
             onMouseEnter={() => setHoveredNode("db")} onMouseLeave={() => setHoveredNode(null)}
             onClick={(e) => addRipple(e, dbColor)}>
          {/* Radar Ping Aura */}
          {isDbReady && (
            <motion.div className="absolute inset-0 rounded-full"
              style={{ border: `2px solid ${dbColor}` }}
              animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
            />
          )}
          {/* Finale Flash */}
          <motion.div className="absolute inset-0 rounded-full bg-white blur-md pointer-events-none"
            initial={{ opacity: 0 }} animate={{ opacity: isAllReady ? [0, 0.8, 0] : 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          />
          <motion.div
            className="relative flex items-center justify-center w-[70px] h-[70px] cursor-pointer"
            style={{
              borderRadius: "50% 50% 15% 15% / 20% 20% 20% 20%",
              background: isDbReady ? "color-mix(in srgb, " + dbColor + " 20%, #1a0f1b)" : "#1a0f1b",
              border: `2px solid ${isDbReady ? dbColor : inactiveColor}`,
              boxShadow: isDbReady ? `0 0 20px ${dbColor}` : "none",
            }}
            animate={isDbReady ? { scale: [1, 1.05, 1], filter: hoveredNode === "db" ? `drop-shadow(0 0 15px ${dbColor})` : 'none' } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            whileHover={{ scale: 1.1 }}
          >
            <Database size={30} strokeWidth={1.5} style={{ color: isDbReady ? dbColor : inactiveColor }} />
          </motion.div>
          {/* Tooltip */}
          <AnimatePresence>
            {hoveredNode === "db" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
                className="absolute top-[80px] left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-mono bg-[#0f0814] border border-white/10 shadow-xl z-50">
                <span style={{ color: dbColor }}>Database</span> — Persistence connected
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}

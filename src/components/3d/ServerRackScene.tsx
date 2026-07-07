import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Line, Sphere, Box } from "@react-three/drei";
import * as THREE from "three";

interface ServerRackSceneProps {
  deployState: "idle" | "deploying" | "success";
  onStepComplete?: (step: number) => void;
  onDeployComplete?: () => void;
}

export default function ServerRackScene({ deployState, onStepComplete, onDeployComplete }: ServerRackSceneProps) {
  // We'll have 3 servers
  const [activeServers, setActiveServers] = useState(0);
  const [showNetwork, setShowNetwork] = useState(false);
  const rackGroup = useRef<THREE.Group>(null);
  const networkGroup = useRef<THREE.Group>(null);

  // Colors based on theme
  const plum = "#4a2f4d"; // var(--color-plum-mid)
  const amber = "#d4a017"; // var(--color-amber)
  const cream = "#f5f1e8"; // var(--color-cream)

  // Reset logic
  useEffect(() => {
    if (deployState === "idle") {
      setActiveServers(0);
      setShowNetwork(false);
    }
  }, [deployState]);

  // Deployment sequence
  useEffect(() => {
    if (deployState === "deploying") {
      let step = 0;
      const interval = setInterval(() => {
        step++;
        if (step <= 3) {
          setActiveServers(step);
          onStepComplete?.(step);
        } else if (step === 4) {
          setShowNetwork(true);
          onStepComplete?.(4); // Database/Network step
        } else if (step === 5) {
          onDeployComplete?.();
          clearInterval(interval);
        }
      }, 1200); // 1.2s per step for dramatic effect

      return () => clearInterval(interval);
    }
  }, [deployState, onStepComplete, onDeployComplete]);

  // Floating animation for the whole rack
  useFrame((state) => {
    if (rackGroup.current) {
      rackGroup.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
      // Slight rotation based on mouse
      const targetRotationX = (state.pointer.y * Math.PI) / 10;
      const targetRotationY = (state.pointer.x * Math.PI) / 10;
      rackGroup.current.rotation.x = THREE.MathUtils.lerp(rackGroup.current.rotation.x, targetRotationX, 0.05);
      rackGroup.current.rotation.y = THREE.MathUtils.lerp(rackGroup.current.rotation.y, targetRotationY - Math.PI / 8, 0.05); // Offset to show side
    }
  });

  return (
    <group ref={rackGroup} position={[0, 0, 0]}>
      {/* Rack Frame */}
      <Box args={[2.2, 3.5, 2]} position={[0, 0, 0]}>
        <meshStandardMaterial color={plum} wireframe={true} wireframeLinewidth={2} transparent opacity={0.5} />
      </Box>

      {/* Servers */}
      <ServerUnit position={[0, 1, 0]} isActive={activeServers >= 1} delay={0} color={amber} label="API Gateway" />
      <ServerUnit position={[0, 0, 0]} isActive={activeServers >= 2} delay={0.2} color={amber} label="App Server" />
      <ServerUnit position={[0, -1, 0]} isActive={activeServers >= 3} delay={0.4} color={amber} label="Database" />

      {/* Network Nodes and Lines */}
      {showNetwork && (
        <group ref={networkGroup} position={[0, 0, 0]}>
          <NetworkConnection start={[-1, 1, 1]} end={[-2.5, 1.5, 1.5]} color={amber} />
          <NetworkConnection start={[-1, 0, 1]} end={[-2.8, -0.5, 1.2]} color={amber} />
          <NetworkConnection start={[-1, -1, 1]} end={[-2.2, -2, 0.5]} color={amber} />
          
          <NetworkConnection start={[1, 1, 1]} end={[2.5, 1.5, -0.5]} color={amber} />
          <NetworkConnection start={[1, 0, 1]} end={[3, 0, -1]} color={amber} />
          <NetworkConnection start={[1, -1, 1]} end={[2.2, -1.5, 0.5]} color={amber} />
        </group>
      )}

      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
    </group>
  );
}

function ServerUnit({ position, isActive, color }: { position: [number, number, number]; isActive: boolean; delay: number; color: string; label: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Spring animation for sliding in
  useFrame(() => {
    if (meshRef.current) {
      const targetX = isActive ? position[0] : position[0] + 5; // Start offscreen right
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.1);
    }
  });

  return (
    <group position={position}>
      {/* Server chassis */}
      <Box ref={meshRef} args={[2, 0.6, 1.8]} position={[5, 0, 0]}> {/* Initial position offscreen */}
        <meshStandardMaterial color="#1a0f1b" />
        
        {/* Front Panel details */}
        {/* Main Indicator Light */}
        <Sphere args={[0.08, 16, 16]} position={[-0.8, 0, 0.91]}>
          <meshStandardMaterial 
            color={isActive ? color : "#333"} 
            emissive={isActive ? color : "#000"}
            emissiveIntensity={isActive ? 2 : 0}
            toneMapped={false}
          />
        </Sphere>
        
        {/* Blinking data lights */}
        <BlinkingLight isActive={isActive} position={[-0.5, 0, 0.91]} color={color} speed={2} />
        <BlinkingLight isActive={isActive} position={[-0.3, 0, 0.91]} color={color} speed={3.5} />
        
        {/* Vent details */}
        <Box args={[0.8, 0.3, 0.05]} position={[0.4, 0, 0.9]}>
          <meshStandardMaterial color="#2d1b2e" />
        </Box>
      </Box>
    </group>
  );
}

function BlinkingLight({ isActive, position, color, speed }: { isActive: boolean; position: [number, number, number]; color: string; speed: number }) {
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  
  useFrame((state) => {
    if (materialRef.current && isActive) {
      // Create a blinking effect using sine wave
      const intensity = Math.sin(state.clock.elapsedTime * speed) > 0 ? 1 : 0.2;
      materialRef.current.emissiveIntensity = intensity;
    } else if (materialRef.current) {
      materialRef.current.emissiveIntensity = 0;
    }
  });

  return (
    <Sphere args={[0.04, 8, 8]} position={position}>
      <meshStandardMaterial 
        ref={materialRef}
        color={isActive ? color : "#333"} 
        emissive={isActive ? color : "#000"}
        emissiveIntensity={0}
        toneMapped={false}
      />
    </Sphere>
  );
}

function NetworkConnection({ start, end, color }: { start: [number, number, number]; end: [number, number, number]; color: string }) {
  const materialRef = useRef<THREE.LineBasicMaterial>(null);
  const meshMaterialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(() => {
    if (materialRef.current && materialRef.current.opacity < 1) {
      materialRef.current.opacity = Math.min(materialRef.current.opacity + 0.05, 1);
    }
    if (meshMaterialRef.current && meshMaterialRef.current.opacity < 1) {
      meshMaterialRef.current.opacity = Math.min(meshMaterialRef.current.opacity + 0.05, 1);
    }
  });

  const points = useMemo(() => [
    new THREE.Vector3(...start),
    new THREE.Vector3(...end)
  ], [start, end]);

  return (
    <group>
      <Line
        points={points}
        color={color}
        lineWidth={2}
        transparent
        opacity={0}
        ref={materialRef}
      />
      {/* Node at the end */}
      <Sphere args={[0.1, 16, 16]} position={end}>
        <meshStandardMaterial 
          ref={meshMaterialRef}
          color={color} 
          emissive={color}
          emissiveIntensity={1}
          transparent
          opacity={0}
          toneMapped={false}
        />
      </Sphere>
    </group>
  );
}

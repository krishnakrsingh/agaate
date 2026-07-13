import { useRef, MutableRefObject } from 'react';
import { useFrame, Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { MathUtils } from 'three';

// --- Utility Functions ---
const mapRange = (val: number, min: number, max: number) => Math.max(0, Math.min(1, (val - min) / (max - min)));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// --- Colors & Shared Materials ---
const C = {
  deepGreen: "#123F2E",
  leafGreen: "#4F7D43",
  youngLeaf: "#80A85B",
  warmSoil: "#74553D",
  lightSoil: "#A17A59",
  yellow: "#D6AD35",
  water: "#A0D5E5",
  crate: "#C89F70",
  tomato: "#E04A3A"
};

const materials = {
  soil: new THREE.MeshStandardMaterial({ color: "#E0DDD5", roughness: 0.9, flatShading: true }),
  lightSoil: new THREE.MeshStandardMaterial({ color: "#EFECE4", roughness: 1, flatShading: true }),
  stem: new THREE.MeshStandardMaterial({ color: C.leafGreen, roughness: 0.6 }),
  youngStem: new THREE.MeshStandardMaterial({ color: C.youngLeaf, roughness: 0.4 }),
  seed: new THREE.MeshStandardMaterial({ color: C.yellow, roughness: 0.5 }),
  shield: new THREE.MeshStandardMaterial({ color: "#C5DFDF", transparent: true, opacity: 0.15, side: THREE.DoubleSide, roughness: 0.1 }),
  water: new THREE.MeshStandardMaterial({ color: "#A5D3DE", transparent: true, opacity: 0.6 }),
  crate: new THREE.MeshStandardMaterial({ color: "#E5E2DA", roughness: 0.8 }),
  tomato: new THREE.MeshStandardMaterial({ color: "#E05343", roughness: 0.4 })
};

function CropWorldScene({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  
  // Refs for meshes that evolve
  const seedRef = useRef<THREE.Mesh>(null);
  const plantStemRef = useRef<THREE.Group>(null);
  const matureStemRef = useRef<THREE.Group>(null);
  const rowsRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const shieldRef = useRef<THREE.Mesh>(null);
  const dropRef = useRef<THREE.Group>(null);
  const rippleRef = useRef<THREE.Mesh>(null);
  const supportRef = useRef<THREE.Group>(null);
  const fruitRef = useRef<THREE.Group>(null);
  const crateRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    // We dampen the incoming scroll progress slightly for a smoother cinematic feel
    // Though scrub: 1 in GSAP does this, a tiny bit of dampening covers fast scrolls.
    const p = progressRef.current;
    
    // --- CAMERA PATH ---
    if (cameraRef.current) {
       // Interpolate from a close, lower angle to a wider, higher angle as the crop grows
       // S1-S3: (0, 1.5, 4) -> (0, 2, 5)
       // S7-S9: (0, 2, 5) -> (1, 3, 7)
       
       const camX = lerp(0, 1, p);
       const camY = lerp(1.2, 3, p);
       const camZ = lerp(3.5, 7, p);
       cameraRef.current.position.set(camX, camY, camZ);
       
       const lookX = lerp(0, 0.5, p);
       const lookY = lerp(0, 0.5, p);
       cameraRef.current.lookAt(lookX, lookY, 0);
    }
    
    // --- STAGE 01: SEED (0.00 - 0.11) ---
    const s1 = mapRange(p, 0.0, 0.11);
    if (seedRef.current) {
       // Seed goes down into soil
       seedRef.current.position.y = lerp(0.8, -0.05, s1);
       // Hides after S1
       seedRef.current.scale.setScalar(s1 >= 0.99 ? 0 : 1);
    }

    // --- STAGE 02: NURSERY GROWTH (0.11 - 0.22) ---
    const s2 = mapRange(p, 0.11, 0.22);
    if (plantStemRef.current) {
       // Shoot pops up
       plantStemRef.current.scale.y = lerp(0.01, 1, s2);
       plantStemRef.current.scale.x = lerp(0.01, 1, s2);
       plantStemRef.current.scale.z = lerp(0.01, 1, s2);
       
       // Hide after S3 when mature stem takes over
       const s3 = mapRange(p, 0.22, 0.33);
       plantStemRef.current.visible = s3 < 0.99;
    }

    // --- STAGE 03: LAND PREP (0.22 - 0.33) ---
    const s3 = mapRange(p, 0.22, 0.33);
    if (rowsRef.current) {
       rowsRef.current.scale.x = lerp(0.001, 1, MathUtils.smoothstep(s3, 0, 1));
       
       if (matureStemRef.current) {
           matureStemRef.current.visible = s3 >= 0.99;
           // mature stem continues growing slowly through rest of stages
           const futureGrowth = mapRange(p, 0.33, 0.77);
           matureStemRef.current.scale.setScalar(lerp(0.8, 1.4, futureGrowth));
       }
    }

    // --- STAGE 04: ADVISORY (0.33 - 0.44) ---
    const s4 = mapRange(p, 0.33, 0.44);
    if (ringRef.current) {
       const mat = ringRef.current.material as THREE.MeshStandardMaterial;
       // Fade in and out using sine wave
       mat.opacity = Math.sin(s4 * Math.PI) * 0.8;
       ringRef.current.scale.setScalar(s4 > 0 ? 1 : 0);
       
       if (s4 > 0 && s4 < 1) {
          ringRef.current.position.y = 0.5 + Math.sin(state.clock.elapsedTime * 3) * 0.3;
          ringRef.current.rotation.x = -Math.PI/2 + Math.sin(state.clock.elapsedTime) * 0.1;
       }
    }

    // --- STAGE 05: PROTECTION (0.44 - 0.55) ---
    const s5 = mapRange(p, 0.44, 0.55);
    if (shieldRef.current) {
       const shieldMat = shieldRef.current.material as THREE.MeshStandardMaterial;
       shieldMat.opacity = Math.sin(s5 * Math.PI) * 0.3;
       shieldRef.current.scale.setScalar(lerp(0.6, 1.3, s5));
    }

    // --- STAGE 06: FERTIGATION (0.55 - 0.66) ---
    const s6 = mapRange(p, 0.55, 0.66);
    if (dropRef.current && rippleRef.current) {
       const dropMat = (dropRef.current.children[0] as THREE.Mesh).material as THREE.MeshStandardMaterial;
       const ripMat = rippleRef.current.material as THREE.MeshStandardMaterial;
       
       if (s6 > 0.05 && s6 < 0.95) {
          const t = (state.clock.elapsedTime * 2) % 2;
          dropRef.current.position.y = 1.8 - t * 1.8;
          dropRef.current.scale.setScalar(t < 0.9 ? 1 : Math.max(0, 1 - (t-0.9)*10));
          dropMat.opacity = 0.8;
          
          const r = (state.clock.elapsedTime * 2 - 0.5) % 2;
          if (r > 0) {
             rippleRef.current.scale.setScalar(1 + r * 4);
             ripMat.opacity = 1 - r;
          } else {
             ripMat.opacity = 0;
          }
       } else {
          dropMat.opacity = 0;
          ripMat.opacity = 0;
       }
    }

    // --- STAGE 07: CROP SUPPORT (0.66 - 0.77) ---
    const s7 = mapRange(p, 0.66, 0.77);
    if (supportRef.current) {
       supportRef.current.scale.y = lerp(0.001, 1, MathUtils.smoothstep(s7, 0, 1));
    }

    // --- STAGE 08: TIMELY HARVEST (0.77 - 0.89) ---
    const s8 = mapRange(p, 0.77, 0.89);
    const s9 = mapRange(p, 0.89, 1.0);
    
    if (fruitRef.current) {
       // Grow during s8, but hide when crate takes over in s9
       if (s9 === 0) {
          fruitRef.current.scale.setScalar(lerp(0.001, 1, MathUtils.smoothstep(s8, 0, 1)));
          fruitRef.current.visible = true;
       } else {
          fruitRef.current.visible = false;
       }
    }

    // --- STAGE 09: MARKET ACCESS (0.89 - 1.00) ---
    if (crateRef.current) {
       crateRef.current.scale.setScalar(lerp(0.001, 1, Math.min(s9 * 4, 1))); // pops in quickly
       
       // Slide outward to market
       const slide = MathUtils.smoothstep(s9, 0, 1);
       crateRef.current.position.z = lerp(0, 1.5, slide);
       crateRef.current.position.x = lerp(0, 1.2, slide);
       
       // Subtle float effect while moving
       if (s9 > 0) {
           crateRef.current.position.y = 0.2 + Math.sin(state.clock.elapsedTime * 3) * 0.05;
       }
    }
  });

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 1.5, 4]} fov={40} />
      
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} color="#fff8e7" castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#a0d5e5" />
      
      <group position={[0, -0.5, 0]}>
         {/* Base Central Soil (S1+) */}
         <mesh material={materials.lightSoil} position={[0, 0, 0]} receiveShadow>
           <cylinderGeometry args={[1.5, 1.5, 0.1, 32]} />
         </mesh>

         {/* Expanded Farm Rows (S3+) */}
         <group ref={rowsRef}>
           <mesh material={materials.lightSoil} position={[0, -0.05, 0]} receiveShadow>
             <boxGeometry args={[4, 0.1, 4]} />
           </mesh>
           <mesh material={materials.soil} position={[0, 0.05, -1]} castShadow receiveShadow>
             <boxGeometry args={[4, 0.1, 0.6]} />
           </mesh>
           <mesh material={materials.soil} position={[0, 0.05, 0]} castShadow receiveShadow>
             <boxGeometry args={[4, 0.1, 0.6]} />
           </mesh>
           <mesh material={materials.soil} position={[0, 0.05, 1]} castShadow receiveShadow>
             <boxGeometry args={[4, 0.1, 0.6]} />
           </mesh>
           {/* Irrigation lines */}
           <mesh material={new THREE.MeshStandardMaterial({ color: "#222" })} position={[0, 0.11, 0.2]} rotation={[0, 0, Math.PI/2]}>
              <cylinderGeometry args={[0.02, 0.02, 4, 8]} />
           </mesh>
           <mesh material={new THREE.MeshStandardMaterial({ color: "#222" })} position={[0, 0.11, -0.8]} rotation={[0, 0, Math.PI/2]}>
              <cylinderGeometry args={[0.02, 0.02, 4, 8]} />
           </mesh>
           <mesh material={new THREE.MeshStandardMaterial({ color: "#222" })} position={[0, 0.11, 1.2]} rotation={[0, 0, Math.PI/2]}>
              <cylinderGeometry args={[0.02, 0.02, 4, 8]} />
           </mesh>
         </group>

         {/* S1: Seed */}
         <mesh ref={seedRef} material={materials.seed} position={[0, 0.8, 0]} castShadow>
           <sphereGeometry args={[0.1, 16, 16]} />
         </mesh>

         {/* S2: Young Nursery Shoot */}
         <group ref={plantStemRef} position={[0, 0.1, 0]}>
            <mesh material={materials.youngStem} castShadow>
              <cylinderGeometry args={[0.04, 0.06, 0.4, 8]} />
            </mesh>
            <mesh material={materials.youngStem} position={[0.1, 0.1, 0]} rotation={[0, 0, -1]}>
               <coneGeometry args={[0.08, 0.2, 8]} />
            </mesh>
            <mesh material={materials.youngStem} position={[-0.1, 0.2, 0]} rotation={[0, 0, 1]}>
               <coneGeometry args={[0.08, 0.2, 8]} />
            </mesh>
         </group>

         {/* S3+: Mature Plant Base */}
         <group ref={matureStemRef} position={[0, 0.1, 0]} visible={false}>
            <mesh material={materials.stem} position={[0, 0.5, 0]} castShadow>
              <cylinderGeometry args={[0.06, 0.08, 1, 8]} />
            </mesh>
            
            {/* S8: Fruits attached to plant */}
            <group ref={fruitRef}>
               <mesh material={materials.tomato} position={[0.2, 0.6, 0]} castShadow>
                 <sphereGeometry args={[0.15, 16, 16]} />
               </mesh>
               <mesh material={materials.tomato} position={[-0.15, 0.8, 0.1]} castShadow>
                 <sphereGeometry args={[0.12, 16, 16]} />
               </mesh>
               <mesh material={materials.tomato} position={[0.1, 0.4, -0.15]} castShadow>
                 <sphereGeometry args={[0.13, 16, 16]} />
               </mesh>
            </group>
         </group>

         {/* S4: Advisory Ring */}
         <mesh ref={ringRef} material={new THREE.MeshStandardMaterial({ color: C.water, transparent: true, opacity: 0, emissive: C.water, emissiveIntensity: 0.5 })} rotation={[-Math.PI/2, 0, 0]}>
           <torusGeometry args={[0.6, 0.03, 16, 32]} />
         </mesh>

         {/* S5: Protection Shield */}
         <mesh ref={shieldRef} material={materials.shield} position={[0, 0.1, 0]}>
           <sphereGeometry args={[1, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
         </mesh>

         {/* S6: Fertigation Drop & Ripple */}
         <group ref={dropRef} position={[0.2, 1.5, 0.2]}>
            <mesh material={materials.water}>
              <sphereGeometry args={[0.05, 16, 16]} />
            </mesh>
            <mesh material={materials.water} position={[0, 0.05, 0]}>
              <coneGeometry args={[0.05, 0.1, 16]} />
            </mesh>
         </group>
         <mesh ref={rippleRef} material={new THREE.MeshStandardMaterial({ color: C.water, transparent: true, opacity: 0 })} position={[0.2, 0.11, 0.2]} rotation={[-Math.PI/2, 0, 0]}>
            <ringGeometry args={[0.05, 0.1, 32]} />
         </mesh>

         {/* S7: Bamboo Supports */}
         <group ref={supportRef} position={[0, 0.1, 0]}>
            <mesh material={materials.crate} position={[0.25, 0.8, -0.2]} rotation={[0, 0, 0.1]} castShadow>
              <cylinderGeometry args={[0.02, 0.02, 1.6, 8]} />
            </mesh>
            <mesh material={materials.crate} position={[-0.25, 0.8, 0.2]} rotation={[0, 0, -0.1]} castShadow>
              <cylinderGeometry args={[0.02, 0.02, 1.6, 8]} />
            </mesh>
            <mesh material={new THREE.MeshStandardMaterial({ color: "#e8d8c8" })} position={[0, 0.8, 0]} rotation={[Math.PI/2, 0, -0.1]}>
               <cylinderGeometry args={[0.005, 0.005, 0.55, 8]} />
            </mesh>
         </group>

         {/* S9: Market Crate */}
         <group ref={crateRef} position={[0, 0.2, 0]}>
           <mesh material={materials.crate} position={[0, 0, 0]} receiveShadow castShadow>
             <boxGeometry args={[1.2, 0.1, 0.9]} />
           </mesh>
           <mesh material={materials.crate} position={[0, 0.2, 0.4]} receiveShadow castShadow>
             <boxGeometry args={[1.2, 0.5, 0.1]} />
           </mesh>
           <mesh material={materials.crate} position={[0, 0.2, -0.4]} receiveShadow castShadow>
             <boxGeometry args={[1.2, 0.5, 0.1]} />
           </mesh>
           <mesh material={materials.crate} position={[0.55, 0.2, 0]} receiveShadow castShadow>
             <boxGeometry args={[0.1, 0.5, 0.7]} />
           </mesh>
           <mesh material={materials.crate} position={[-0.55, 0.2, 0]} receiveShadow castShadow>
             <boxGeometry args={[0.1, 0.5, 0.7]} />
           </mesh>
           {/* Harvested Produce inside crate */}
           <mesh material={materials.tomato} position={[0.2, 0.1, 0.1]} castShadow>
             <sphereGeometry args={[0.15, 16, 16]} />
           </mesh>
           <mesh material={materials.tomato} position={[-0.2, 0.1, -0.1]} castShadow>
             <sphereGeometry args={[0.15, 16, 16]} />
           </mesh>
           <mesh material={materials.tomato} position={[0, 0.2, -0.2]} castShadow>
             <sphereGeometry args={[0.14, 16, 16]} />
           </mesh>
           <mesh material={materials.tomato} position={[-0.3, 0.2, 0.15]} castShadow>
             <sphereGeometry args={[0.13, 16, 16]} />
           </mesh>
         </group>
         
      </group>
    </>
  );
}

export default function CropWorld({ progressRef }: { progressRef: MutableRefObject<number> }) {
  return (
    <Canvas
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <CropWorldScene progressRef={progressRef} />
    </Canvas>
  );
}

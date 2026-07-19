import { MutableRefObject, RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MathUtils } from "three";
import { mapRange, lerp, materials } from "./CropWorldMaterials";

export interface CropWorldRefs {
  progressRef: MutableRefObject<number>;
  cameraRef: RefObject<THREE.PerspectiveCamera | null>;
  seedRef: RefObject<THREE.Group | null>;
  plantStemRef: RefObject<THREE.Group | null>;
  leafLRef: RefObject<THREE.Group | null>;
  leafRRef: RefObject<THREE.Group | null>;
  crumbGroupRef: RefObject<THREE.Group | null>;
  rowsRef: RefObject<THREE.Group | null>;
  matureStemRef: RefObject<THREE.Group | null>;
  trunkTopRef: RefObject<THREE.Group | null>;
  earlyLeavesRef: RefObject<THREE.Group | null>;
  midLeavesRef: RefObject<THREE.Group | null>;
  lateLeavesRef: RefObject<THREE.Group | null>;
  flowersRef: RefObject<THREE.Group | null>;
  ringRef: RefObject<THREE.Group | null>;
  nodesRef: RefObject<THREE.Group | null>;
  shieldRef: RefObject<THREE.Group | null>;
  shieldParticlesRef: RefObject<THREE.Group | null>;
  rootsRef: RefObject<THREE.Group | null>;
  dropRef: RefObject<THREE.Group | null>;
  rippleGroupRef: RefObject<THREE.Group | null>;
  supportRef: RefObject<THREE.Group | null>;
  fruitRef: RefObject<THREE.Group | null>;
  crateRef: RefObject<THREE.Group | null>;
}

export function useCropWorldFrame({
  progressRef,
  cameraRef,
  seedRef,
  plantStemRef,
  leafLRef,
  leafRRef,
  crumbGroupRef,
  rowsRef,
  matureStemRef,
  trunkTopRef,
  earlyLeavesRef,
  midLeavesRef,
  lateLeavesRef,
  flowersRef,
  ringRef,
  nodesRef,
  shieldRef,
  shieldParticlesRef,
  rootsRef,
  dropRef,
  rippleGroupRef,
  supportRef,
  fruitRef,
  crateRef,
}: CropWorldRefs) {
  useFrame((state) => {
    const p = progressRef.current;

    // --- CAMERA PATH ---
    if (cameraRef.current) {
      const camX = lerp(0.65, 1.85, p);
      const camY = lerp(1.4, 2.7, p);
      const camZ = lerp(3.2, 5.8, p);
      cameraRef.current.position.set(camX, camY, camZ);
      const lookX = lerp(0.1, 0.45, p);
      const lookY = lerp(0.15, 0.55, p);
      cameraRef.current.lookAt(lookX, lookY, 0);
    }

    // --- STAGE 01: SEED (0.00 - 0.11) ---
    const s1 = mapRange(p, 0.0, 0.11);
    if (seedRef.current) {
      seedRef.current.position.y = lerp(0.8, -0.05, s1);
      seedRef.current.scale.setScalar(s1 >= 0.99 ? 0 : 1);
      seedRef.current.rotation.y = state.clock.elapsedTime * 1.5;
      seedRef.current.visible = p < 0.15;
    }

    // --- STAGE 02: NURSERY GROWTH (0.11 - 0.22) ---
    const s2 = mapRange(p, 0.11, 0.22);
    if (plantStemRef.current) {
      plantStemRef.current.scale.setScalar(lerp(0.01, 1, s2));
      if (leafLRef.current && leafRRef.current) {
        leafLRef.current.rotation.z = lerp(1.5, 0.8, s2);
        leafRRef.current.rotation.z = lerp(-1.5, -0.8, s2);
      }
      if (crumbGroupRef.current) {
        crumbGroupRef.current.scale.setScalar(s2 > 0 ? 1 : 0);
        crumbGroupRef.current.position.y = lerp(-0.02, 0.05, s2);
      }
      const s3check = mapRange(p, 0.22, 0.33);
      plantStemRef.current.visible = s2 > 0.01 && s3check < 0.99;
    }

    // --- STAGE 03: LAND PREP + MATURE PLANT APPEARS (0.22 - 0.33) ---
    const s3 = mapRange(p, 0.22, 0.33);
    if (rowsRef.current) {
      rowsRef.current.visible = p >= 0.22;
      rowsRef.current.scale.x = lerp(0.001, 1, MathUtils.smoothstep(s3, 0, 1));
    }

    // --- PROGRESSIVE PLANT GROWTH (0.33 - 0.77) ---
    if (matureStemRef.current) {
      matureStemRef.current.visible = s3 >= 0.99;
      const baseGrowth = mapRange(p, 0.3, 0.44);
      matureStemRef.current.scale.setScalar(lerp(0.6, 1.0, baseGrowth));
    }

    if (trunkTopRef.current) {
      const topGrowth = mapRange(p, 0.38, 0.55);
      trunkTopRef.current.scale.y = lerp(0.01, 1, MathUtils.smoothstep(topGrowth, 0, 1));
      trunkTopRef.current.scale.x = lerp(0.5, 1, topGrowth);
      trunkTopRef.current.scale.z = lerp(0.5, 1, topGrowth);
    }

    if (earlyLeavesRef.current) {
      const earlyGrowth = mapRange(p, 0.31, 0.4);
      earlyLeavesRef.current.scale.setScalar(
        lerp(0.01, 1, MathUtils.smoothstep(earlyGrowth, 0, 1)),
      );
      earlyLeavesRef.current.visible = p >= 0.31;
    }

    if (midLeavesRef.current) {
      const midGrowth = mapRange(p, 0.38, 0.52);
      midLeavesRef.current.scale.setScalar(lerp(0.01, 1, MathUtils.smoothstep(midGrowth, 0, 1)));
      midLeavesRef.current.visible = p >= 0.38;
    }

    if (lateLeavesRef.current) {
      const lateGrowth = mapRange(p, 0.52, 0.7);
      lateLeavesRef.current.scale.setScalar(lerp(0.01, 1, MathUtils.smoothstep(lateGrowth, 0, 1)));
      lateLeavesRef.current.visible = p >= 0.52;
    }

    if (flowersRef.current) {
      const flowerGrowth = mapRange(p, 0.44, 0.58);
      flowersRef.current.scale.setScalar(lerp(0.01, 1, MathUtils.smoothstep(flowerGrowth, 0, 1)));
      flowersRef.current.visible = p >= 0.44;
    }

    // --- STAGE 04: ADVISORY (0.33 - 0.44) ---
    const s4 = mapRange(p, 0.33, 0.44);
    if (ringRef.current) {
      materials.hologramRing.opacity = Math.sin(s4 * Math.PI) * 0.6;
      ringRef.current.visible = s4 > 0.01;
      ringRef.current.scale.setScalar(s4 > 0 ? 1 : 0);
      if (s4 > 0 && s4 < 1) {
        ringRef.current.position.y = 0.4 + Math.sin(state.clock.elapsedTime * 3) * 0.15;
        if (nodesRef.current) {
          nodesRef.current.rotation.y = state.clock.elapsedTime * 2.5;
        }
      }
    }

    // --- STAGE 05: PROTECTION (0.44 - 0.55) ---
    const s5 = mapRange(p, 0.44, 0.55);
    if (shieldRef.current) {
      materials.shield.opacity = Math.sin(s5 * Math.PI) * 0.22;
      materials.shieldWire.opacity = Math.sin(s5 * Math.PI) * 0.45;
      const shScale = lerp(0.5, 1.25, s5);
      shieldRef.current.scale.setScalar(shScale);
      shieldRef.current.visible = s5 > 0.01;
      if (shieldParticlesRef.current) {
        shieldParticlesRef.current.visible = s5 > 0.02 && s5 < 0.98;
        if (s5 > 0.02 && s5 < 0.98) {
          shieldParticlesRef.current.children.forEach((child, idx) => {
            const time = state.clock.elapsedTime * 1.5 + idx * 0.8;
            const progress = (time % 2) / 2;
            const startY = 1.8;
            const startX = Math.sin(idx * 2) * 0.6;
            const startZ = Math.cos(idx * 2) * 0.6;
            const radius = 0.9 * shScale;
            const hitTime = 0.5;
            if (progress < hitTime) {
              const t = progress / hitTime;
              child.position.set(startX, lerp(startY, radius * 0.8, t), startZ);
              child.scale.setScalar(0.02 * (1 - t * 0.2));
            } else {
              const t = (progress - hitTime) / (1 - hitTime);
              const angle = idx * 2;
              const bounceDist = radius + t * 0.5;
              child.position.set(
                Math.sin(angle) * bounceDist,
                lerp(radius * 0.8, radius * 1.2, t),
                Math.cos(angle) * bounceDist,
              );
              child.scale.setScalar(0.025 * (1 - t));
            }
          });
        }
      }
    }

    // --- STAGE 06: FERTIGATION (0.55 - 0.66) ---
    const s6 = mapRange(p, 0.55, 0.66);
    if (rootsRef.current) {
      rootsRef.current.visible = s6 > 0.01;
      materials.roots.opacity = s6 * 0.8 * (0.6 + Math.sin(state.clock.elapsedTime * 6) * 0.4);
    }
    if (dropRef.current && rippleGroupRef.current) {
      dropRef.current.visible = s6 > 0.02 && s6 < 0.98;
      rippleGroupRef.current.visible = s6 > 0.02 && s6 < 0.98;
      if (s6 > 0.02 && s6 < 0.98) {
        materials.waterDrop.opacity = 0.85;
        dropRef.current.children.forEach((child, idx) => {
          const time = state.clock.elapsedTime * 2.2 + idx * 0.4;
          const t = time % 1;
          child.position.y = lerp(1.5, 0.08, t);
          child.position.x = lerp(0.2, 0.05, t);
          child.position.z = lerp(0.2, 0.05, t);
          child.scale.setScalar(t < 0.85 ? 0.035 : Math.max(0, 0.035 * (1 - (t - 0.85) * 6.6)));
        });
        rippleGroupRef.current.children.forEach((child, idx) => {
          const time = state.clock.elapsedTime * 1.5 + idx * 0.5;
          const t = time % 1;
          child.scale.setScalar(0.5 + t * 4.5);
          const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
          if (mat) mat.opacity = (1 - t) * 0.7;
        });
      } else {
        materials.waterDrop.opacity = 0;
        rippleGroupRef.current.children.forEach((child) => {
          const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
          if (mat) mat.opacity = 0;
        });
      }
    }

    // --- STAGE 07: CROP SUPPORT (0.66 - 0.77) ---
    const s7 = mapRange(p, 0.66, 0.77);
    if (supportRef.current) {
      supportRef.current.scale.y = lerp(0.001, 1, MathUtils.smoothstep(s7, 0, 1));
      supportRef.current.visible = p >= 0.66;
    }

    // --- STAGE 08: TIMELY HARVEST (0.77 - 0.89) ---
    const s8 = mapRange(p, 0.77, 0.89);
    const s9 = mapRange(p, 0.89, 1.0);
    if (fruitRef.current) {
      if (s9 === 0) {
        fruitRef.current.scale.setScalar(lerp(0.001, 1.0, MathUtils.smoothstep(s8, 0, 1)));
        fruitRef.current.visible = p >= 0.77;
      } else {
        fruitRef.current.visible = false;
      }
      materials.tomato.color.setRGB(
        lerp(0.45, 0.92, s8),
        lerp(0.7, 0.12, s8),
        lerp(0.25, 0.08, s8),
      );
    }

    // --- WIND SWAY (Organic physics) ---
    const sway = Math.sin(state.clock.elapsedTime * 1.8) * 0.04;
    const swayZ = Math.cos(state.clock.elapsedTime * 1.3) * 0.02;
    if (matureStemRef.current && p >= 0.33) {
      matureStemRef.current.rotation.z = sway;
      matureStemRef.current.rotation.x = swayZ;
      if (earlyLeavesRef.current) earlyLeavesRef.current.rotation.z = -sway * 0.3;
      if (midLeavesRef.current) midLeavesRef.current.rotation.z = sway * 0.4;
      if (lateLeavesRef.current) lateLeavesRef.current.rotation.x = -swayZ * 0.5;
      if (fruitRef.current && p < 0.89) fruitRef.current.rotation.z = -sway * 0.6;
      if (supportRef.current && p >= 0.66) supportRef.current.rotation.z = sway * 0.7;
    }

    // --- STAGE 09: MARKET ACCESS (0.89 - 1.00) ---
    if (crateRef.current) {
      crateRef.current.scale.setScalar(lerp(0.001, 1.0, Math.min(s9 * 4.5, 1.0)));
      crateRef.current.visible = p >= 0.89;
      const slide = MathUtils.smoothstep(s9, 0, 1);
      crateRef.current.position.z = lerp(0, 1.6, slide);
      crateRef.current.position.x = lerp(0, 1.1, slide);
      if (s9 > 0) {
        crateRef.current.position.y = 0.2 + Math.sin(state.clock.elapsedTime * 2.8) * 0.04;
      }
    }
  });
}

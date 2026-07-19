import { useRef, MutableRefObject, useMemo } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { materials, C, SOIL_CLODS } from "./CropWorldMaterials";
import { OrganicLeaf, CompoundLeafBranch, FlowerBlossom, VineTendril } from "./CropWorldParts";
import { useCropWorldFrame } from "./useCropWorldFrame";

function CropWorldScene({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  // Stage 1-2 refs
  const seedRef = useRef<THREE.Group>(null);
  const plantStemRef = useRef<THREE.Group>(null);
  const leafLRef = useRef<THREE.Group>(null);
  const leafRRef = useRef<THREE.Group>(null);
  const crumbGroupRef = useRef<THREE.Group>(null);

  // Mature plant refs
  const matureStemRef = useRef<THREE.Group>(null);
  const trunkTopRef = useRef<THREE.Group>(null); // Segments 3+4 that grow in
  const earlyLeavesRef = useRef<THREE.Group>(null); // First 2 leaf clusters (stage 3)
  const midLeavesRef = useRef<THREE.Group>(null); // 3 more clusters + tendrils (stage 4-5)
  const lateLeavesRef = useRef<THREE.Group>(null); // Dense final foliage layer (stage 6-7)
  const flowersRef = useRef<THREE.Group>(null); // Flower blossoms (stage 5+)

  // Environment refs
  const rowsRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Group>(null);
  const shieldRef = useRef<THREE.Group>(null);
  const shieldParticlesRef = useRef<THREE.Group>(null);
  const rootsRef = useRef<THREE.Group>(null);
  const dropRef = useRef<THREE.Group>(null);
  const rippleGroupRef = useRef<THREE.Group>(null);
  const supportRef = useRef<THREE.Group>(null);
  const fruitRef = useRef<THREE.Group>(null);
  const tomato1Ref = useRef<THREE.Group>(null);
  const tomato2Ref = useRef<THREE.Group>(null);
  const tomato3Ref = useRef<THREE.Group>(null);
  const crateRef = useRef<THREE.Group>(null);

  // Irrigation hose curves
  const hoseCurve1 = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-2.2, -0.18, 0.02),
        new THREE.Vector3(-2.12, 0.0, 0.02),
        new THREE.Vector3(-1.4, 0.0, 0.02),
        new THREE.Vector3(-0.7, 0.0, -0.04),
        new THREE.Vector3(0.0, 0.0, 0.05),
        new THREE.Vector3(0.7, 0.0, -0.03),
        new THREE.Vector3(1.4, 0.0, 0.02),
        new THREE.Vector3(2.12, 0.0, 0.02),
        new THREE.Vector3(2.2, -0.18, 0.02),
      ]),
    [],
  );

  const hoseCurve2 = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-2.2, -0.18, -0.03),
        new THREE.Vector3(-2.12, 0.0, -0.03),
        new THREE.Vector3(-1.4, 0.0, -0.03),
        new THREE.Vector3(-0.7, 0.0, 0.04),
        new THREE.Vector3(0.0, 0.0, -0.02),
        new THREE.Vector3(0.7, 0.0, 0.03),
        new THREE.Vector3(1.4, 0.0, -0.03),
        new THREE.Vector3(2.12, 0.0, -0.03),
        new THREE.Vector3(2.2, -0.18, -0.03),
      ]),
    [],
  );

  const hoseCurve3 = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-2.2, -0.18, 0.04),
        new THREE.Vector3(-2.12, 0.0, 0.04),
        new THREE.Vector3(-1.4, 0.0, 0.04),
        new THREE.Vector3(-0.7, 0.0, -0.03),
        new THREE.Vector3(0.0, 0.0, 0.05),
        new THREE.Vector3(0.7, 0.0, -0.02),
        new THREE.Vector3(1.4, 0.0, 0.04),
        new THREE.Vector3(2.12, 0.0, 0.04),
        new THREE.Vector3(2.2, -0.18, 0.04),
      ]),
    [],
  );

  useCropWorldFrame({
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
  });

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 1.5, 4]} fov={40} />

      <ambientLight intensity={0.65} />
      <directionalLight
        position={[6, 12, 5]}
        intensity={1.8}
        color="#fffcf5"
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-camera-far={25}
        shadow-camera-left={-2.8}
        shadow-camera-right={2.8}
        shadow-camera-top={2.8}
        shadow-camera-bottom={-2.8}
        shadow-bias={-0.0005}
      />
      <directionalLight position={[-6, 6, -5]} intensity={0.5} color="#b8e6f5" />

      <group position={[0, -0.5, 0]}>
        {/* === PLANTER DISH === */}
        <mesh position={[0, -0.04, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.56, 1.5, 0.12, 72]} />
          <meshStandardMaterial color="#E6EBE7" roughness={0.45} metalness={0.1} />
        </mesh>
        <mesh position={[0, 0.02, 0]} receiveShadow>
          <cylinderGeometry args={[1.48, 1.48, 0.02, 72]} />
          <meshStandardMaterial color="#1E2321" roughness={0.7} />
        </mesh>

        {/* Base Central Soil */}
        <mesh material={materials.soil} position={[0, 0.015, 0]} scale={[1, 0.08, 1]} receiveShadow>
          <sphereGeometry args={[1.46, 40, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>

        {/* Tactile Soil Clods */}
        {SOIL_CLODS.map((clod, idx) => (
          <mesh
            key={idx}
            position={clod.pos as [number, number, number]}
            scale={clod.scale}
            rotation={clod.rot as [number, number, number]}
            material={materials.soil}
            castShadow
            receiveShadow
          >
            <dodecahedronGeometry />
          </mesh>
        ))}

        {/* === EXPANDED FARM ROWS (S3+) === */}
        <group ref={rowsRef} visible={false}>
          {/* Tilled soil base */}
          <mesh material={materials.soil} position={[0, 0.03, 0]} receiveShadow>
            <boxGeometry args={[4.4, 0.22, 4.4]} />
          </mesh>

          {/* Row 1 (Back) */}
          <group position={[0, 0.15, -1.1]}>
            <mesh material={materials.soil} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
              <cylinderGeometry args={[0.18, 0.18, 4.2, 64]} />
            </mesh>
            <mesh
              material={materials.mulchSheet}
              position={[0, 0.002, 0]}
              rotation={[0, 0, Math.PI / 2]}
              castShadow
            >
              <cylinderGeometry args={[0.182, 0.182, 4.2, 64, 1, false, -Math.PI * 0.5, Math.PI]} />
            </mesh>
            {[-1.0, 0.0, 1.0].map((xVal, i) => (
              <group key={i} position={[xVal, 0.181, 0]}>
                <mesh material={materials.soil} rotation={[-Math.PI / 2, 0, 0]}>
                  <cylinderGeometry args={[0.04, 0.04, 0.005, 24]} />
                </mesh>
                <mesh material={materials.youngStem} rotation={[0, 0, (i - 1) * 0.15]} castShadow>
                  <cylinderGeometry args={[0.005, 0.007, 0.06, 8]} />
                </mesh>
                <mesh
                  material={materials.youngStem}
                  position={[-0.015, 0.03, 0]}
                  rotation={[0, 0, 0.8]}
                  scale={[1, 0.1, 1.3]}
                >
                  <sphereGeometry args={[0.02, 12, 12]} />
                </mesh>
                <mesh
                  material={materials.youngStem}
                  position={[0.015, 0.03, 0]}
                  rotation={[0, 0, -0.8]}
                  scale={[1, 0.1, 1.3]}
                >
                  <sphereGeometry args={[0.02, 12, 12]} />
                </mesh>
              </group>
            ))}
          </group>

          {/* Row 2 (Center â€” main plant row) */}
          <group position={[0, 0.15, 0]}>
            <mesh material={materials.soil} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
              <cylinderGeometry args={[0.18, 0.18, 4.2, 64]} />
            </mesh>
            <mesh
              material={materials.mulchSheet}
              position={[0, 0.002, 0]}
              rotation={[0, 0, Math.PI / 2]}
              castShadow
            >
              <cylinderGeometry args={[0.182, 0.182, 4.2, 64, 1, false, -Math.PI * 0.5, Math.PI]} />
            </mesh>
            {[-1.0, 0.0, 1.0].map((xVal, i) => (
              <group key={i} position={[xVal, 0.181, 0]}>
                <mesh material={materials.soil} rotation={[-Math.PI / 2, 0, 0]}>
                  <cylinderGeometry args={[0.04, 0.04, 0.005, 24]} />
                </mesh>
                {xVal !== 0.0 && (
                  <>
                    <mesh
                      material={materials.youngStem}
                      rotation={[0, 0, (i - 1) * 0.15]}
                      castShadow
                    >
                      <cylinderGeometry args={[0.005, 0.007, 0.06, 8]} />
                    </mesh>
                    <mesh
                      material={materials.youngStem}
                      position={[-0.015, 0.03, 0]}
                      rotation={[0, 0, 0.8]}
                      scale={[1, 0.1, 1.3]}
                    >
                      <sphereGeometry args={[0.02, 12, 12]} />
                    </mesh>
                    <mesh
                      material={materials.youngStem}
                      position={[0.015, 0.03, 0]}
                      rotation={[0, 0, -0.8]}
                      scale={[1, 0.1, 1.3]}
                    >
                      <sphereGeometry args={[0.02, 12, 12]} />
                    </mesh>
                  </>
                )}
              </group>
            ))}
          </group>

          {/* Row 3 (Front) */}
          <group position={[0, 0.15, 1.1]}>
            <mesh material={materials.soil} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
              <cylinderGeometry args={[0.18, 0.18, 4.2, 64]} />
            </mesh>
            <mesh
              material={materials.mulchSheet}
              position={[0, 0.002, 0]}
              rotation={[0, 0, Math.PI / 2]}
              castShadow
            >
              <cylinderGeometry args={[0.182, 0.182, 4.2, 64, 1, false, -Math.PI * 0.5, Math.PI]} />
            </mesh>
            {[-1.0, 0.0, 1.0].map((xVal, i) => (
              <group key={i} position={[xVal, 0.181, 0]}>
                <mesh material={materials.soil} rotation={[-Math.PI / 2, 0, 0]}>
                  <cylinderGeometry args={[0.04, 0.04, 0.005, 24]} />
                </mesh>
                <mesh material={materials.youngStem} rotation={[0, 0, (i - 1) * 0.15]} castShadow>
                  <cylinderGeometry args={[0.005, 0.007, 0.06, 8]} />
                </mesh>
                <mesh
                  material={materials.youngStem}
                  position={[-0.015, 0.03, 0]}
                  rotation={[0, 0, 0.8]}
                  scale={[1, 0.1, 1.3]}
                >
                  <sphereGeometry args={[0.02, 12, 12]} />
                </mesh>
                <mesh
                  material={materials.youngStem}
                  position={[0.015, 0.03, 0]}
                  rotation={[0, 0, -0.8]}
                  scale={[1, 0.1, 1.3]}
                >
                  <sphereGeometry args={[0.02, 12, 12]} />
                </mesh>
              </group>
            ))}
          </group>

          {/* Drip Irrigation Hoses */}
          <group position={[0, 0.155, -0.75]}>
            <mesh material={materials.hose} castShadow>
              <tubeGeometry args={[hoseCurve1, 64, 0.012, 12, false]} />
            </mesh>
            {[-1.0, 0.0, 1.0].map((xVal, i) => (
              <group key={i} position={[xVal, 0, hoseCurve1.getPointAt((xVal + 2.2) / 4.4).z]}>
                <mesh material={materials.brass} rotation={[0, 0, Math.PI / 2]}>
                  <torusGeometry args={[0.016, 0.005, 8, 16]} />
                </mesh>
                <mesh
                  material={materials.steel}
                  position={[0, 0, -0.035]}
                  rotation={[Math.PI / 2, 0, 0]}
                  castShadow
                >
                  <cylinderGeometry args={[0.004, 0.003, 0.05, 12]} />
                </mesh>
                <mesh material={materials.water} position={[0, -0.005, -0.06]} scale={0.015}>
                  <sphereGeometry args={[1, 12, 12]} />
                </mesh>
              </group>
            ))}
          </group>

          <group position={[0, 0.155, 0.35]}>
            <mesh material={materials.hose} castShadow>
              <tubeGeometry args={[hoseCurve2, 64, 0.012, 12, false]} />
            </mesh>
            {[-1.0, 0.0, 1.0].map((xVal, i) => (
              <group key={i} position={[xVal, 0, hoseCurve2.getPointAt((xVal + 2.2) / 4.4).z]}>
                <mesh material={materials.brass} rotation={[0, 0, Math.PI / 2]}>
                  <torusGeometry args={[0.016, 0.005, 8, 16]} />
                </mesh>
                <mesh
                  material={materials.steel}
                  position={[0, 0, -0.035]}
                  rotation={[Math.PI / 2, 0, 0]}
                  castShadow
                >
                  <cylinderGeometry args={[0.004, 0.003, 0.05, 12]} />
                </mesh>
                <mesh material={materials.water} position={[0, -0.005, -0.06]} scale={0.015}>
                  <sphereGeometry args={[1, 12, 12]} />
                </mesh>
              </group>
            ))}
          </group>

          <group position={[0, 0.155, 1.45]}>
            <mesh material={materials.hose} castShadow>
              <tubeGeometry args={[hoseCurve3, 64, 0.012, 12, false]} />
            </mesh>
            {[-1.0, 0.0, 1.0].map((xVal, i) => (
              <group key={i} position={[xVal, 0, hoseCurve3.getPointAt((xVal + 2.2) / 4.4).z]}>
                <mesh material={materials.brass} rotation={[0, 0, Math.PI / 2]}>
                  <torusGeometry args={[0.016, 0.005, 8, 16]} />
                </mesh>
                <mesh
                  material={materials.steel}
                  position={[0, 0, -0.035]}
                  rotation={[Math.PI / 2, 0, 0]}
                  castShadow
                >
                  <cylinderGeometry args={[0.004, 0.003, 0.05, 12]} />
                </mesh>
                <mesh material={materials.water} position={[0, -0.005, -0.06]} scale={0.015}>
                  <sphereGeometry args={[1, 12, 12]} />
                </mesh>
              </group>
            ))}
          </group>

          {/* Spade Shovel */}
          <group position={[-1.2, 0.52, 0.7]} rotation={[0.25, 0.1, -0.2]}>
            <mesh material={materials.wood} castShadow>
              <cylinderGeometry args={[0.014, 0.014, 0.8, 24]} />
            </mesh>
            <group position={[0, 0.4, 0]}>
              <mesh
                material={materials.steel}
                position={[0, 0.05, 0]}
                rotation={[0, 0, Math.PI / 2]}
                castShadow
              >
                <cylinderGeometry args={[0.01, 0.01, 0.12, 16]} />
              </mesh>
              <mesh material={materials.steel} position={[-0.055, 0, 0]} castShadow>
                <cylinderGeometry args={[0.008, 0.008, 0.1, 16]} />
              </mesh>
              <mesh material={materials.steel} position={[0.055, 0, 0]} castShadow>
                <cylinderGeometry args={[0.008, 0.008, 0.1, 16]} />
              </mesh>
            </group>
            <group position={[0, -0.4, 0]}>
              <mesh material={materials.steel} position={[0, -0.08, 0]} castShadow>
                <boxGeometry args={[0.15, 0.16, 0.012]} />
              </mesh>
              <mesh
                material={materials.steel}
                position={[0, -0.19, 0]}
                rotation={[0, 0, Math.PI / 4]}
                castShadow
              >
                <boxGeometry args={[0.106, 0.106, 0.012]} />
              </mesh>
            </group>
          </group>

          {/* Tilling Rake */}
          <group position={[1.3, 0.28, -0.4]} rotation={[1.45, 0.2, -0.4]}>
            <mesh material={materials.wood} position={[0, 0.6, 0]} castShadow>
              <cylinderGeometry args={[0.012, 0.012, 1.2, 24]} />
            </mesh>
            <group>
              <mesh material={materials.steel} rotation={[0, 0, Math.PI / 2]} castShadow>
                <cylinderGeometry args={[0.013, 0.013, 0.42, 16]} />
              </mesh>
              {Array.from({ length: 9 }).map((_, idx) => (
                <mesh
                  key={idx}
                  material={materials.steel}
                  position={[idx * 0.05 - 0.2, -0.04, 0]}
                  rotation={[0.15, 0, 0]}
                  castShadow
                >
                  <cylinderGeometry args={[0.004, 0.002, 0.08, 12]} />
                </mesh>
              ))}
            </group>
          </group>

          {/* Telemetry Grid */}
          <group position={[0, 0.34, 0]}>
            <mesh
              material={
                new THREE.MeshBasicMaterial({ color: C.glowCyan, transparent: true, opacity: 0.35 })
              }
              position={[0, 0, -1.1]}
            >
              <boxGeometry args={[4.2, 0.004, 0.004]} />
            </mesh>
            <mesh
              material={
                new THREE.MeshBasicMaterial({ color: C.glowCyan, transparent: true, opacity: 0.35 })
              }
              position={[0, 0, 0]}
            >
              <boxGeometry args={[4.2, 0.004, 0.004]} />
            </mesh>
            <mesh
              material={
                new THREE.MeshBasicMaterial({ color: C.glowCyan, transparent: true, opacity: 0.35 })
              }
              position={[0, 0, 1.1]}
            >
              <boxGeometry args={[4.2, 0.004, 0.004]} />
            </mesh>
            <mesh
              material={
                new THREE.MeshBasicMaterial({ color: C.glowCyan, transparent: true, opacity: 0.35 })
              }
              position={[-1.0, 0, 0]}
              rotation={[0, Math.PI / 2, 0]}
            >
              <boxGeometry args={[3.2, 0.004, 0.004]} />
            </mesh>
            <mesh
              material={
                new THREE.MeshBasicMaterial({ color: C.glowCyan, transparent: true, opacity: 0.35 })
              }
              position={[0.0, 0, 0]}
              rotation={[0, Math.PI / 2, 0]}
            >
              <boxGeometry args={[3.2, 0.004, 0.004]} />
            </mesh>
            <mesh
              material={
                new THREE.MeshBasicMaterial({ color: C.glowCyan, transparent: true, opacity: 0.35 })
              }
              position={[1.0, 0, 0]}
              rotation={[0, Math.PI / 2, 0]}
            >
              <boxGeometry args={[3.2, 0.004, 0.004]} />
            </mesh>
            <mesh
              material={new THREE.MeshBasicMaterial({ color: C.glowCyan })}
              position={[-1.0, 0.01, -1.1]}
              scale={0.015}
            >
              <sphereGeometry args={[1, 16, 16]} />
            </mesh>
            <mesh
              material={new THREE.MeshBasicMaterial({ color: C.glowCyan })}
              position={[1.0, 0.01, -1.1]}
              scale={0.015}
            >
              <sphereGeometry args={[1, 16, 16]} />
            </mesh>
            <mesh
              material={new THREE.MeshBasicMaterial({ color: C.glowCyan })}
              position={[-1.0, 0.01, 1.1]}
              scale={0.015}
            >
              <sphereGeometry args={[1, 16, 16]} />
            </mesh>
            <mesh
              material={new THREE.MeshBasicMaterial({ color: C.glowCyan })}
              position={[1.0, 0.01, 1.1]}
              scale={0.015}
            >
              <sphereGeometry args={[1, 16, 16]} />
            </mesh>
          </group>
        </group>

        {/* === S1: GERMINATING SEED === */}
        <group ref={seedRef} position={[0, 0.8, 0]}>
          <group scale={[0.075, 0.14, 0.045]}>
            <mesh material={materials.seed} castShadow>
              <sphereGeometry args={[1, 32, 32]} />
            </mesh>
          </group>
          <group position={[0, -0.09, 0]} rotation={[0.2, 0, 0.35]}>
            <mesh material={materials.youngStem}>
              <cylinderGeometry args={[0.012, 0.005, 0.08, 8]} />
            </mesh>
          </group>
          <mesh material={materials.seedGlow} position={[0, 0.02, 0.015]} scale={0.025}>
            <sphereGeometry args={[1, 16, 16]} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.22, 0]}>
            <torusGeometry args={[0.25, 0.008, 8, 32]} />
            <meshBasicMaterial color={C.yellow} transparent opacity={0.6} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.22, 0]} scale={1.2}>
            <torusGeometry args={[0.25, 0.004, 8, 32]} />
            <meshBasicMaterial color={C.glowCyan} transparent opacity={0.4} />
          </mesh>
        </group>

        {/* === S2: YOUNG SPROUT (Sapling) === */}
        <group ref={plantStemRef} position={[0, 0.05, 0]} visible={false}>
          <group rotation={[0, 0, 0.15]}>
            <mesh material={materials.youngStem} position={[0, 0.09, 0]} castShadow>
              <cylinderGeometry args={[0.03, 0.04, 0.18, 10]} />
            </mesh>
            <group position={[0, 0.18, 0]} rotation={[0, 0, -0.3]}>
              <mesh material={materials.youngStem} position={[0, 0.09, 0]} castShadow>
                <cylinderGeometry args={[0.024, 0.03, 0.18, 10]} />
              </mesh>
              <group position={[0, 0.18, 0]} rotation={[0, 0, 0.18]}>
                <mesh material={materials.youngStem} position={[0, 0.07, 0]} castShadow>
                  <cylinderGeometry args={[0.016, 0.024, 0.14, 10]} />
                </mesh>
                <group position={[0, 0.14, 0]}>
                  {/* Left Cotyledon */}
                  <group ref={leafLRef} position={[-0.012, 0, 0]} rotation={[0, 0, 0.95]}>
                    <mesh
                      material={materials.youngStem}
                      position={[-0.02, 0, 0]}
                      rotation={[0, 0, Math.PI / 2 - 0.2]}
                      castShadow
                    >
                      <cylinderGeometry args={[0.005, 0.008, 0.04, 8]} />
                    </mesh>
                    <mesh
                      material={materials.youngLeaf}
                      position={[-0.05, 0, 0]}
                      scale={[1.1, 0.05, 0.8]}
                      castShadow
                    >
                      <sphereGeometry args={[0.04, 16, 16]} />
                    </mesh>
                  </group>
                  {/* Right Cotyledon */}
                  <group ref={leafRRef} position={[0.012, 0, 0]} rotation={[0, 0, -0.95]}>
                    <mesh
                      material={materials.youngStem}
                      position={[0.02, 0, 0]}
                      rotation={[0, 0, -Math.PI / 2 + 0.2]}
                      castShadow
                    >
                      <cylinderGeometry args={[0.005, 0.008, 0.04, 8]} />
                    </mesh>
                    <mesh
                      material={materials.youngLeaf}
                      position={[0.05, 0, 0]}
                      scale={[1.1, 0.05, 0.8]}
                      castShadow
                    >
                      <sphereGeometry args={[0.04, 16, 16]} />
                    </mesh>
                  </group>
                  {/* Emerging true leaves */}
                  <group position={[0, 0.01, 0.01]} rotation={[0.4, 0, 0]}>
                    <mesh
                      material={materials.youngStem}
                      position={[0, 0.02, 0.01]}
                      rotation={[Math.PI / 3, 0, 0]}
                      castShadow
                    >
                      <cylinderGeometry args={[0.004, 0.006, 0.04, 8]} />
                    </mesh>
                    <OrganicLeaf
                      scale={0.35}
                      position={[0, 0.04, 0.02]}
                      rotation={[Math.PI / 3, 0, 0]}
                      material={materials.youngLeaf}
                    />
                  </group>
                  <group position={[0, 0.01, -0.01]} rotation={[-0.4, 0, 0]}>
                    <mesh
                      material={materials.youngStem}
                      position={[0, 0.02, -0.01]}
                      rotation={[-Math.PI / 3, 0, 0]}
                      castShadow
                    >
                      <cylinderGeometry args={[0.004, 0.006, 0.04, 8]} />
                    </mesh>
                    <OrganicLeaf
                      scale={0.35}
                      position={[0, 0.04, -0.02]}
                      rotation={[-Math.PI / 3, 0, 0]}
                      material={materials.youngLeaf}
                    />
                  </group>
                </group>
              </group>
            </group>
          </group>

          {/* Erupting Soil Crumbles */}
          <group ref={crumbGroupRef}>
            <mesh material={materials.soil} position={[0.06, 0.01, 0.05]} scale={0.035}>
              <icosahedronGeometry />
            </mesh>
            <mesh material={materials.soil} position={[-0.05, 0.01, -0.06]} scale={0.03}>
              <icosahedronGeometry />
            </mesh>
            <mesh material={materials.soil} position={[0.02, 0.02, -0.05]} scale={0.04}>
              <icosahedronGeometry />
            </mesh>
            <mesh material={materials.soil} position={[-0.03, 0.02, 0.06]} scale={0.025}>
              <icosahedronGeometry />
            </mesh>
          </group>
        </group>

        {/* ================================================================ */}
        {/* === S3+: MATURE PLANT â€” PROGRESSIVE GROWTH ARCHITECTURE ======= */}
        {/* ================================================================ */}
        <group ref={matureStemRef} position={[0, 0.1, 0]} visible={false}>
          {/* â”€â”€ TRUNK â”€â”€ organic curving vine */}
          <group rotation={[0.05, 0, 0.05]}>
            {/* Base node */}
            <mesh material={materials.stem} castShadow>
              <sphereGeometry args={[0.05, 14, 14]} />
            </mesh>

            {/* Segment 1 (base) â€” always visible */}
            <mesh material={materials.stem} position={[0, 0.18, 0]} castShadow>
              <cylinderGeometry args={[0.038, 0.05, 0.36, 14]} />
            </mesh>
            <mesh material={materials.stem} position={[0, 0.36, 0]} castShadow>
              <sphereGeometry args={[0.042, 14, 14]} />
            </mesh>

            {/* Segment 2 â€” bends slightly */}
            <group position={[0, 0.36, 0]} rotation={[-0.1, 0, -0.06]}>
              <mesh material={materials.stem} position={[0, 0.18, 0]} castShadow>
                <cylinderGeometry args={[0.03, 0.038, 0.36, 14]} />
              </mesh>
              <mesh material={materials.stem} position={[0, 0.36, 0]} castShadow>
                <sphereGeometry args={[0.034, 14, 14]} />
              </mesh>

              {/* Segments 3+4 â€” grow in progressively via trunkTopRef */}
              <group ref={trunkTopRef} position={[0, 0.36, 0]}>
                {/* Segment 3 â€” bends opposite direction */}
                <group rotation={[0.08, 0, 0.1]}>
                  <mesh material={materials.stem} position={[0, 0.16, 0]} castShadow>
                    <cylinderGeometry args={[0.022, 0.03, 0.32, 14]} />
                  </mesh>
                  <mesh material={materials.stem} position={[0, 0.32, 0]} castShadow>
                    <sphereGeometry args={[0.024, 12, 12]} />
                  </mesh>

                  {/* Segment 4 (tip) */}
                  <group position={[0, 0.32, 0]} rotation={[-0.06, 0, -0.08]}>
                    <mesh material={materials.stem} position={[0, 0.14, 0]} castShadow>
                      <cylinderGeometry args={[0.012, 0.022, 0.28, 12]} />
                    </mesh>
                    {/* Growing tip bud */}
                    <mesh material={materials.youngStem} position={[0, 0.28, 0]} castShadow>
                      <sphereGeometry args={[0.016, 10, 10]} />
                    </mesh>
                  </group>
                </group>
              </group>
            </group>
          </group>

          {/* â”€â”€ EARLY LEAVES (Stage 3) â”€â”€ First 2 compound branches at base */}
          <group ref={earlyLeavesRef} visible={false}>
            {/* Branch 1: Low front-right */}
            <CompoundLeafBranch
              position={[0.02, 0.22, 0.03]}
              rotation={[0.3, 0.6, 0.15]}
              scale={1.1}
              material={materials.leafDark}
            />
            {/* Branch 2: Low back-left */}
            <CompoundLeafBranch
              position={[-0.02, 0.28, -0.03]}
              rotation={[-0.2, 3.4, -0.15]}
              scale={1.0}
              material={materials.leafDark}
            />
            {/* Small single leaves at base */}
            <OrganicLeaf
              position={[0.06, 0.15, 0.01]}
              rotation={[0.2, 0.8, 0.4]}
              scale={0.6}
              material={materials.leafDark}
            />
            <OrganicLeaf
              position={[-0.05, 0.18, -0.04]}
              rotation={[-0.3, -0.5, -0.3]}
              scale={0.5}
              material={materials.leafDark}
            />
          </group>

          {/* â”€â”€ MID LEAVES (Stage 4-5) â”€â”€ 3 more branches at mid-height + tendrils */}
          <group ref={midLeavesRef} visible={false}>
            {/* Branch 3: Mid-height right */}
            <CompoundLeafBranch
              position={[0.03, 0.48, 0.02]}
              rotation={[-0.15, -1.0, 0.2]}
              scale={0.95}
              material={materials.leafMid}
            />
            {/* Branch 4: Mid-height left-back */}
            <CompoundLeafBranch
              position={[-0.03, 0.55, -0.02]}
              rotation={[0.25, 2.8, -0.2]}
              scale={0.9}
              material={materials.leafMid}
            />
            {/* Branch 5: Mid-high front */}
            <CompoundLeafBranch
              position={[0.01, 0.65, 0.03]}
              rotation={[0.35, 0.3, 0.1]}
              scale={0.85}
              material={materials.leafMid}
            />
            {/* Extra individual leaves for density */}
            <OrganicLeaf
              position={[0.08, 0.42, 0.03]}
              rotation={[0.3, 0.5, 0.6]}
              scale={0.7}
              material={materials.leafMid}
            />
            <OrganicLeaf
              position={[-0.07, 0.38, -0.05]}
              rotation={[-0.2, -0.7, -0.5]}
              scale={0.65}
              material={materials.leafMid}
            />
            <OrganicLeaf
              position={[0.05, 0.58, -0.04]}
              rotation={[0.4, -0.3, 0.3]}
              scale={0.55}
              material={materials.leafMid}
            />

            {/* Curling tendrils */}
            <VineTendril position={[0.05, 0.45, 0.04]} rotation={[0, 0.5, 0.3]} scale={1.2} />
            <VineTendril position={[-0.04, 0.52, -0.03]} rotation={[0, -1.5, -0.4]} scale={1.0} />
          </group>

          {/* â”€â”€ LATE LEAVES (Stage 6-7) â”€â”€ Dense canopy, high branches, more tendrils */}
          <group ref={lateLeavesRef} visible={false}>
            {/* Branch 6: High right */}
            <CompoundLeafBranch
              position={[0.02, 0.78, 0.02]}
              rotation={[-0.2, -0.8, 0.25]}
              scale={0.8}
              material={materials.leafLight}
            />
            {/* Branch 7: High left */}
            <CompoundLeafBranch
              position={[-0.02, 0.85, -0.01]}
              rotation={[0.2, 2.2, -0.15]}
              scale={0.75}
              material={materials.leafLight}
            />
            {/* Branch 8: Near top */}
            <CompoundLeafBranch
              position={[0.01, 0.95, 0.01]}
              rotation={[-0.1, 1.5, 0.1]}
              scale={0.7}
              material={materials.leafLight}
            />
            {/* Branch 9: Top canopy */}
            <CompoundLeafBranch
              position={[0, 1.05, -0.02]}
              rotation={[-0.3, -Math.PI, 0.15]}
              scale={0.6}
              material={materials.leafLight}
            />
            {/* Dense individual leaves filling gaps */}
            <OrganicLeaf
              position={[0.09, 0.72, 0.05]}
              rotation={[0.2, 0.4, 0.7]}
              scale={0.75}
              material={materials.leafLight}
            />
            <OrganicLeaf
              position={[-0.08, 0.68, -0.06]}
              rotation={[-0.3, -0.6, -0.6]}
              scale={0.7}
              material={materials.leafLight}
            />
            <OrganicLeaf
              position={[0.06, 0.88, -0.03]}
              rotation={[0.15, -0.2, 0.5]}
              scale={0.6}
              material={materials.leafLight}
            />
            <OrganicLeaf
              position={[-0.05, 0.92, 0.04]}
              rotation={[-0.25, 0.8, -0.4]}
              scale={0.55}
              material={materials.leafMid}
            />
            <OrganicLeaf
              position={[0.03, 1.0, 0.05]}
              rotation={[0.35, 0.2, 0.3]}
              scale={0.5}
              material={materials.leafLight}
            />
            <OrganicLeaf
              position={[-0.04, 1.08, -0.03]}
              rotation={[-0.15, -0.4, -0.2]}
              scale={0.45}
              material={materials.leafMid}
            />

            {/* More tendrils */}
            <VineTendril position={[0.06, 0.75, 0.05]} rotation={[0, 1.2, 0.5]} scale={1.5} />
            <VineTendril position={[-0.05, 0.82, -0.04]} rotation={[0, -0.8, -0.3]} scale={1.3} />
            <VineTendril position={[0.03, 0.98, 0.02]} rotation={[0.3, 0.3, 0.6]} scale={1.0} />
          </group>

          {/* â”€â”€ FLOWERS (Stage 5+) â”€â”€ */}
          <group ref={flowersRef} visible={false}>
            <FlowerBlossom position={[0.06, 0.55, 0.05]} rotation={[0.2, 0.5, 0.3]} scale={1.2} />
            <FlowerBlossom
              position={[-0.05, 0.72, -0.04]}
              rotation={[0.1, -2.0, 0.2]}
              scale={1.0}
            />
            <FlowerBlossom
              position={[0.04, 0.88, 0.03]}
              rotation={[-0.15, 1.2, -0.1]}
              scale={0.9}
            />
            <FlowerBlossom
              position={[-0.03, 0.95, -0.02]}
              rotation={[0.2, -1.5, 0.15]}
              scale={0.8}
            />
            <FlowerBlossom
              position={[0.02, 0.42, -0.04]}
              rotation={[-0.2, -0.8, 0.25]}
              scale={1.1}
            />
          </group>

          {/* â”€â”€ S8: FRUITS â”€â”€ */}
          <group ref={fruitRef} visible={false}>
            {/* Tomato 1 */}
            <group ref={tomato1Ref} position={[0.2, 0.6, 0.08]}>
              <mesh material={materials.tomato} scale={[1, 0.88, 1]} castShadow>
                <sphereGeometry args={[0.16, 32, 32]} />
              </mesh>
              <mesh material={materials.calyx} position={[0, 0.14, 0]} rotation={[0.1, 0, 0]}>
                <cylinderGeometry args={[0.006, 0.008, 0.05, 8]} />
              </mesh>
              <group position={[0, 0.13, 0]}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <mesh
                    key={i}
                    material={materials.calyx}
                    rotation={[0, (i * Math.PI * 2) / 6, 0.45]}
                    position={[0, 0.005, 0]}
                    castShadow
                  >
                    <coneGeometry args={[0.015, 0.07, 4]} />
                  </mesh>
                ))}
              </group>
            </group>

            {/* Tomato 2 */}
            <group ref={tomato2Ref} position={[-0.18, 0.82, 0.14]}>
              <mesh material={materials.tomato} scale={[1, 0.88, 1]} castShadow>
                <sphereGeometry args={[0.13, 32, 32]} />
              </mesh>
              <mesh material={materials.calyx} position={[0, 0.115, 0]}>
                <cylinderGeometry args={[0.005, 0.006, 0.04, 8]} />
              </mesh>
              <group position={[0, 0.11, 0]}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <mesh
                    key={i}
                    material={materials.calyx}
                    rotation={[0, (i * Math.PI * 2) / 6, 0.45]}
                    position={[0, 0.004, 0]}
                    castShadow
                  >
                    <coneGeometry args={[0.012, 0.055, 4]} />
                  </mesh>
                ))}
              </group>
            </group>

            {/* Tomato 3 */}
            <group ref={tomato3Ref} position={[0.08, 0.42, -0.16]}>
              <mesh material={materials.tomato} scale={[1, 0.88, 1]} castShadow>
                <sphereGeometry args={[0.14, 32, 32]} />
              </mesh>
              <mesh material={materials.calyx} position={[0, 0.125, 0]}>
                <cylinderGeometry args={[0.005, 0.007, 0.04, 8]} />
              </mesh>
              <group position={[0, 0.12, 0]}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <mesh
                    key={i}
                    material={materials.calyx}
                    rotation={[0, (i * Math.PI * 2) / 6, 0.45]}
                    position={[0, 0.004, 0]}
                    castShadow
                  >
                    <coneGeometry args={[0.014, 0.06, 4]} />
                  </mesh>
                ))}
              </group>
            </group>
          </group>
        </group>

        {/* === S4: ADVISORY RING === */}
        <group ref={ringRef} visible={false}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.12, 0]}>
            <ringGeometry args={[0.1, 0.8, 32]} />
            <meshBasicMaterial
              color={C.hologram}
              transparent
              opacity={0.15}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.5, 0.01, 8, 48]} />
            <meshBasicMaterial color={C.glowCyan} transparent opacity={0.6} />
          </mesh>
          <mesh rotation={[-Math.PI / 2.5, 0.3, 0]} scale={1.2}>
            <torusGeometry args={[0.5, 0.006, 8, 48]} />
            <meshBasicMaterial color={C.glowBlue} transparent opacity={0.4} />
          </mesh>
          <group ref={nodesRef}>
            <mesh material={materials.telemetryNode} position={[0.5, 0, 0]} scale={0.035}>
              <sphereGeometry />
            </mesh>
            <mesh material={materials.telemetryNode} position={[-0.4, 0.2, 0.3]} scale={0.025}>
              <sphereGeometry />
            </mesh>
          </group>
        </group>

        {/* === S5: PROTECTION SHIELD === */}
        <group ref={shieldRef} visible={false}>
          <mesh material={materials.shield} position={[0, 0.1, 0]}>
            <sphereGeometry args={[0.9, 32, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
          </mesh>
          <mesh material={materials.shieldWireframe} position={[0, 0.1, 0]}>
            <icosahedronGeometry args={[0.91, 2]} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.11, 0]}>
            <torusGeometry args={[0.91, 0.015, 8, 32]} />
            <meshBasicMaterial color={C.glowCyan} transparent opacity={0.6} />
          </mesh>
          <group ref={shieldParticlesRef} visible={false}>
            {Array.from({ length: 6 }).map((_, i) => (
              <mesh
                key={i}
                material={new THREE.MeshBasicMaterial({ color: "#EF4444" })}
                scale={0.02}
              >
                <icosahedronGeometry />
              </mesh>
            ))}
          </group>
        </group>

        {/* === S6: FERTIGATION === */}
        <group>
          <group ref={rootsRef} position={[0, -0.05, 0]} visible={false}>
            <mesh material={materials.rootGlow} position={[0, -0.2, 0]} castShadow>
              <cylinderGeometry args={[0.02, 0.005, 0.4, 8]} />
            </mesh>
            <mesh
              material={materials.rootGlow}
              position={[0.08, -0.15, 0.05]}
              rotation={[0, 0, -0.8]}
            >
              <cylinderGeometry args={[0.01, 0.002, 0.2, 6]} />
            </mesh>
            <mesh
              material={materials.rootGlow}
              position={[-0.08, -0.15, -0.05]}
              rotation={[0, 0, 0.8]}
            >
              <cylinderGeometry args={[0.01, 0.002, 0.2, 6]} />
            </mesh>
            <mesh
              material={materials.rootGlow}
              position={[0.05, -0.28, -0.06]}
              rotation={[0, 0, -0.5]}
            >
              <cylinderGeometry args={[0.008, 0.001, 0.15, 6]} />
            </mesh>
          </group>

          <group ref={dropRef} position={[0.2, 1.8, 0.2]} visible={false}>
            {Array.from({ length: 4 }).map((_, i) => (
              <group key={i}>
                <mesh material={materials.water} scale={0.035}>
                  <sphereGeometry args={[1, 12, 12]} />
                </mesh>
                <mesh
                  material={materials.water}
                  position={[0, 0.04, 0]}
                  scale={0.035}
                  rotation={[Math.PI, 0, 0]}
                >
                  <coneGeometry args={[1, 2.2, 12]} />
                </mesh>
              </group>
            ))}
          </group>

          <group
            ref={rippleGroupRef}
            position={[0.2, 0.12, 0.2]}
            rotation={[-Math.PI / 2, 0, 0]}
            visible={false}
          >
            <mesh>
              <ringGeometry args={[0.02, 0.04, 32]} />
              <meshBasicMaterial color={C.water} transparent opacity={0} side={THREE.DoubleSide} />
            </mesh>
            <mesh>
              <ringGeometry args={[0.02, 0.04, 32]} />
              <meshBasicMaterial color={C.water} transparent opacity={0} side={THREE.DoubleSide} />
            </mesh>
          </group>
        </group>

        {/* === S7: BAMBOO SUPPORTS === */}
        <group ref={supportRef} position={[0, 0.1, 0]} visible={false}>
          <group position={[-0.26, 0.7, 0.15]} rotation={[0, 0, -0.06]}>
            <mesh material={materials.bamboo} castShadow>
              <cylinderGeometry args={[0.022, 0.024, 1.4, 10]} />
            </mesh>
            <mesh material={materials.bambooNode} position={[0, -0.3, 0]}>
              <torusGeometry args={[0.025, 0.006, 8, 16]} />
            </mesh>
            <mesh material={materials.bambooNode} position={[0, 0.1, 0]}>
              <torusGeometry args={[0.025, 0.006, 8, 16]} />
            </mesh>
            <mesh material={materials.bambooNode} position={[0, 0.5, 0]}>
              <torusGeometry args={[0.025, 0.006, 8, 16]} />
            </mesh>
          </group>

          <group position={[0.26, 0.7, -0.15]} rotation={[0, 0, 0.06]}>
            <mesh material={materials.bamboo} castShadow>
              <cylinderGeometry args={[0.022, 0.024, 1.4, 10]} />
            </mesh>
            <mesh material={materials.bambooNode} position={[0, -0.3, 0]}>
              <torusGeometry args={[0.025, 0.006, 8, 16]} />
            </mesh>
            <mesh material={materials.bambooNode} position={[0, 0.1, 0]}>
              <torusGeometry args={[0.025, 0.006, 8, 16]} />
            </mesh>
            <mesh material={materials.bambooNode} position={[0, 0.5, 0]}>
              <torusGeometry args={[0.025, 0.006, 8, 16]} />
            </mesh>
          </group>

          <mesh
            material={materials.bamboo}
            position={[0, 1.25, 0]}
            rotation={[0.2, 0, -Math.PI / 2]}
          >
            <cylinderGeometry args={[0.016, 0.016, 0.7, 8]} />
          </mesh>

          <mesh
            material={materials.twine}
            position={[0.13, 0.9, -0.07]}
            rotation={[0, 0.4, Math.PI / 2]}
          >
            <torusGeometry args={[0.03, 0.004, 6, 12]} />
          </mesh>
          <mesh
            material={materials.twine}
            position={[-0.13, 0.7, 0.07]}
            rotation={[0, -0.4, Math.PI / 2]}
          >
            <torusGeometry args={[0.03, 0.004, 6, 12]} />
          </mesh>
        </group>

        {/* === S9: MARKET CRATE === */}
        <group ref={crateRef} position={[0, 0.2, 0]} visible={false}>
          <mesh material={materials.crate} position={[0, -0.15, 0]} receiveShadow castShadow>
            <boxGeometry args={[1.2, 0.04, 0.9]} />
          </mesh>
          {/* Corner posts */}
          <mesh material={materials.crateDark} position={[0.56, 0.1, 0.41]} castShadow>
            <boxGeometry args={[0.06, 0.45, 0.06]} />
          </mesh>
          <mesh material={materials.crateDark} position={[-0.56, 0.1, 0.41]} castShadow>
            <boxGeometry args={[0.06, 0.45, 0.06]} />
          </mesh>
          <mesh material={materials.crateDark} position={[0.56, 0.1, -0.41]} castShadow>
            <boxGeometry args={[0.06, 0.45, 0.06]} />
          </mesh>
          <mesh material={materials.crateDark} position={[-0.56, 0.1, -0.41]} castShadow>
            <boxGeometry args={[0.06, 0.45, 0.06]} />
          </mesh>

          {/* Front planks */}
          <mesh material={materials.crate} position={[0, 0.22, 0.42]} castShadow>
            <boxGeometry args={[1.12, 0.08, 0.03]} />
          </mesh>
          <mesh material={materials.crate} position={[0, 0.1, 0.42]} castShadow>
            <boxGeometry args={[1.12, 0.08, 0.03]} />
          </mesh>
          <mesh material={materials.crate} position={[0, -0.02, 0.42]} castShadow>
            <boxGeometry args={[1.12, 0.08, 0.03]} />
          </mesh>
          {/* Back planks */}
          <mesh material={materials.crate} position={[0, 0.22, -0.42]} castShadow>
            <boxGeometry args={[1.12, 0.08, 0.03]} />
          </mesh>
          <mesh material={materials.crate} position={[0, 0.1, -0.42]} castShadow>
            <boxGeometry args={[1.12, 0.08, 0.03]} />
          </mesh>
          <mesh material={materials.crate} position={[0, -0.02, -0.42]} castShadow>
            <boxGeometry args={[1.12, 0.08, 0.03]} />
          </mesh>
          {/* Left planks */}
          <mesh material={materials.crate} position={[-0.57, 0.22, 0]} castShadow>
            <boxGeometry args={[0.03, 0.08, 0.8]} />
          </mesh>
          <mesh material={materials.crate} position={[-0.57, 0.1, 0]} castShadow>
            <boxGeometry args={[0.03, 0.08, 0.8]} />
          </mesh>
          <mesh material={materials.crate} position={[-0.57, -0.02, 0]} castShadow>
            <boxGeometry args={[0.03, 0.08, 0.8]} />
          </mesh>
          {/* Right planks */}
          <mesh material={materials.crate} position={[0.57, 0.22, 0]} castShadow>
            <boxGeometry args={[0.03, 0.08, 0.8]} />
          </mesh>
          <mesh material={materials.crate} position={[0.57, 0.1, 0]} castShadow>
            <boxGeometry args={[0.03, 0.08, 0.8]} />
          </mesh>
          <mesh material={materials.crate} position={[0.57, -0.02, 0]} castShadow>
            <boxGeometry args={[0.03, 0.08, 0.8]} />
          </mesh>

          {/* Metal reinforcement */}
          <mesh
            material={materials.crateMetal}
            position={[0.57, 0.1, 0.42]}
            scale={[1.02, 1, 1.02]}
          >
            <boxGeometry args={[0.04, 0.46, 0.04]} />
          </mesh>
          <mesh
            material={materials.crateMetal}
            position={[-0.57, 0.1, 0.42]}
            scale={[1.02, 1, 1.02]}
          >
            <boxGeometry args={[0.04, 0.46, 0.04]} />
          </mesh>
          <mesh
            material={materials.crateMetal}
            position={[0.57, 0.1, -0.42]}
            scale={[1.02, 1, 1.02]}
          >
            <boxGeometry args={[0.04, 0.46, 0.04]} />
          </mesh>
          <mesh
            material={materials.crateMetal}
            position={[-0.57, 0.1, -0.42]}
            scale={[1.02, 1, 1.02]}
          >
            <boxGeometry args={[0.04, 0.46, 0.04]} />
          </mesh>

          {/* Green leaf bedding */}
          <group position={[0, -0.08, 0]}>
            <mesh
              material={materials.calyx}
              rotation={[0.2, 0.1, 0.2]}
              position={[-0.2, 0, 0.1]}
              scale={[2, 0.2, 3]}
            >
              <boxGeometry args={[0.15, 0.1, 0.15]} />
            </mesh>
            <mesh
              material={materials.calyx}
              rotation={[-0.15, -0.2, -0.1]}
              position={[0.25, 0, -0.1]}
              scale={[2.5, 0.2, 2.5]}
            >
              <boxGeometry args={[0.15, 0.1, 0.15]} />
            </mesh>
          </group>

          {/* Harvested tomatoes */}
          <group position={[0, -0.05, 0]}>
            <mesh material={materials.crateTomato} position={[0.2, 0.02, 0.1]} castShadow>
              <sphereGeometry args={[0.15, 16, 16]} />
            </mesh>
            <mesh material={materials.crateTomato} position={[-0.2, 0.02, -0.1]} castShadow>
              <sphereGeometry args={[0.15, 16, 16]} />
            </mesh>
            <mesh material={materials.crateTomato} position={[0, 0.11, -0.2]} castShadow>
              <sphereGeometry args={[0.14, 16, 16]} />
            </mesh>
            <mesh material={materials.crateTomato} position={[-0.3, 0.11, 0.15]} castShadow>
              <sphereGeometry args={[0.13, 16, 16]} />
            </mesh>
            <mesh material={materials.crateTomato} position={[0.25, 0.08, -0.2]} castShadow>
              <sphereGeometry args={[0.12, 16, 16]} />
            </mesh>
            <mesh material={materials.crateTomato} position={[-0.05, 0.01, 0.25]} castShadow>
              <sphereGeometry args={[0.14, 16, 16]} />
            </mesh>
          </group>
        </group>
      </group>
    </>
  );
}

export default CropWorldScene;

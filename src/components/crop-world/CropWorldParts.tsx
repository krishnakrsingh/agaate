import * as THREE from "three";
import { materials, leafGeo } from "./CropWorldMaterials";

interface OrganicLeafProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  material?: THREE.Material;
}

export function OrganicLeaf({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  material = materials.leafMid,
}: OrganicLeafProps) {
  return (
    <group position={position} rotation={rotation} scale={[scale, scale, scale]}>
      {/* Leaf blade — proper leaf-shaped flat mesh */}
      <mesh geometry={leafGeo} material={material} castShadow receiveShadow />
      {/* Midrib vein */}
      <mesh material={materials.stem} position={[0, 0.11, 0.001]} castShadow>
        <cylinderGeometry args={[0.002, 0.004, 0.2, 4]} />
      </mesh>
      {/* Side veins (left + right) */}
      <mesh material={materials.stem} position={[-0.02, 0.1, 0.001]} rotation={[0, 0, 0.5]}>
        <cylinderGeometry args={[0.001, 0.002, 0.08, 4]} />
      </mesh>
      <mesh material={materials.stem} position={[0.02, 0.1, 0.001]} rotation={[0, 0, -0.5]}>
        <cylinderGeometry args={[0.001, 0.002, 0.08, 4]} />
      </mesh>
      <mesh material={materials.stem} position={[-0.018, 0.15, 0.001]} rotation={[0, 0, 0.4]}>
        <cylinderGeometry args={[0.001, 0.0015, 0.06, 4]} />
      </mesh>
      <mesh material={materials.stem} position={[0.018, 0.15, 0.001]} rotation={[0, 0, -0.4]}>
        <cylinderGeometry args={[0.001, 0.0015, 0.06, 4]} />
      </mesh>
    </group>
  );
}

// ======================================================================
// COMPOUND LEAF BRANCH — a petiole with 5 leaflets in a compound pattern
// ======================================================================
interface CompoundBranchProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  material?: THREE.Material;
}

export function CompoundLeafBranch({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  material = materials.leafMid,
}: CompoundBranchProps) {
  return (
    <group position={position} rotation={rotation} scale={[scale, scale, scale]}>
      {/* Junction node */}
      <mesh material={materials.stem} castShadow>
        <sphereGeometry args={[0.018, 8, 8]} />
      </mesh>

      {/* Petiole (branch stem extending outward along X) */}
      <mesh
        material={materials.stem}
        position={[0.14, 0.005, 0]}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
      >
        <cylinderGeometry args={[0.005, 0.012, 0.28, 6]} />
      </mesh>

      {/* Terminal leaflet (tip) — largest leaf at end */}
      <OrganicLeaf
        position={[0.26, 0.01, 0]}
        rotation={[-Math.PI / 2 + 0.1, 0, -0.15]}
        scale={1.1}
        material={material}
      />

      {/* Upper lateral pair — angled outward */}
      <OrganicLeaf
        position={[0.19, 0.012, 0.01]}
        rotation={[-Math.PI / 2 + 0.2, 0.4, -0.35]}
        scale={0.85}
        material={material}
      />
      <OrganicLeaf
        position={[0.19, 0.012, -0.01]}
        rotation={[-Math.PI / 2 + 0.2, -0.4, 0.35]}
        scale={0.85}
        material={material}
      />

      {/* Mid lateral pair */}
      <OrganicLeaf
        position={[0.12, 0.008, 0.015]}
        rotation={[-Math.PI / 2 + 0.15, 0.5, -0.25]}
        scale={0.7}
        material={material}
      />
      <OrganicLeaf
        position={[0.12, 0.008, -0.015]}
        rotation={[-Math.PI / 2 + 0.15, -0.5, 0.25]}
        scale={0.7}
        material={material}
      />

      {/* Lower lateral pair — smaller */}
      <OrganicLeaf
        position={[0.06, 0.005, 0.012]}
        rotation={[-Math.PI / 2 + 0.1, 0.6, -0.2]}
        scale={0.5}
        material={material}
      />
      <OrganicLeaf
        position={[0.06, 0.005, -0.012]}
        rotation={[-Math.PI / 2 + 0.1, -0.6, 0.2]}
        scale={0.5}
        material={material}
      />
    </group>
  );
}

// ======================================================================
// FLOWER CLUSTER — small yellow blossom with petals
// ======================================================================
export function FlowerBlossom({
  position = [0, 0, 0] as [number, number, number],
  rotation = [0, 0, 0] as [number, number, number],
  scale = 1,
}) {
  return (
    <group position={position} rotation={rotation} scale={[scale, scale, scale]}>
      {/* Flower stem */}
      <mesh
        material={materials.stem}
        rotation={[0, 0, Math.PI / 2]}
        position={[0.025, 0, 0]}
        castShadow
      >
        <cylinderGeometry args={[0.004, 0.004, 0.05, 8]} />
      </mesh>
      {/* Brown center */}
      <mesh material={materials.flowerCenter} position={[0.05, 0, 0]}>
        <sphereGeometry args={[0.012, 10, 10]} />
      </mesh>
      {/* Yellow petals */}
      <group position={[0.05, 0, 0]}>
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh
            key={i}
            material={materials.flower}
            rotation={[0, (i * Math.PI * 2) / 6, 0.7]}
            castShadow
          >
            <coneGeometry args={[0.01, 0.035, 4]} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// ======================================================================
// VINE TENDRIL — simple curling segments (much cheaper than tubeGeometry)
// ======================================================================
export function VineTendril({
  position = [0, 0, 0] as [number, number, number],
  rotation = [0, 0, 0] as [number, number, number],
  scale = 1,
}) {
  return (
    <group position={position} rotation={rotation} scale={[scale, scale, scale]}>
      {/* Curl segment 1 */}
      <mesh
        material={materials.tendril}
        position={[0.015, 0.015, 0]}
        rotation={[0, 0, 0.6]}
        castShadow
      >
        <cylinderGeometry args={[0.002, 0.003, 0.04, 4]} />
      </mesh>
      {/* Curl segment 2 */}
      <mesh
        material={materials.tendril}
        position={[0.035, 0.03, 0.005]}
        rotation={[0.2, 0, 1.0]}
        castShadow
      >
        <cylinderGeometry args={[0.0015, 0.002, 0.035, 4]} />
      </mesh>
      {/* Curl segment 3 */}
      <mesh
        material={materials.tendril}
        position={[0.045, 0.045, 0.01]}
        rotation={[0.3, 0.2, 1.6]}
        castShadow
      >
        <cylinderGeometry args={[0.001, 0.0015, 0.03, 4]} />
      </mesh>
      {/* Tiny curl tip */}
      <mesh
        material={materials.tendril}
        position={[0.04, 0.06, 0.015]}
        rotation={[0.4, 0.3, 2.2]}
        castShadow
      >
        <cylinderGeometry args={[0.0008, 0.001, 0.02, 4]} />
      </mesh>
    </group>
  );
}

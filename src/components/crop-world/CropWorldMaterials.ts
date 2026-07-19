import * as THREE from "three";

// --- Utility Functions ---
export const mapRange = (val: number, min: number, max: number) =>
  Math.max(0, Math.min(1, (val - min) / (max - min)));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// --- Color Palette ---
export const C = {
  soil: "#3B2F1B",
  stem: "#3A6B35",
  leafDark: "#2D5A27",
  leafMid: "#4A8C3F",
  leafLight: "#6AAF50",
  leafYoung: "#8BC67A",
  seedHusk: "#D2A96A",
  yellow: "#FFC107",
  hologram: "#60D4F0",
  glowCyan: "#4AE0E0",
  glowBlue: "#6EAAFF",
  water: "#5BC0EB",
  bamboo: "#C4B77D",
  bambooNode: "#B0A06A",
  twine: "#A68B5B",
  wood: "#8B6F47",
  steel: "#B0B8C0",
  brass: "#C5A94E",
  tomato: "#E8453C",
  calyx: "#2D5A27",
  crateWood: "#C49A5A",
  hose: "#2C2C2C",
  mulch: "#D0D0D0",
};

// --- Shared Materials (created once, reused everywhere) ---
export const materials = {
  soil: new THREE.MeshStandardMaterial({ color: C.soil, roughness: 0.95, metalness: 0.02 }),
  stem: new THREE.MeshStandardMaterial({ color: C.stem, roughness: 0.6, metalness: 0.05 }),
  leafDark: new THREE.MeshStandardMaterial({
    color: C.leafDark,
    roughness: 0.5,
    metalness: 0.02,
    side: THREE.DoubleSide,
  }),
  leafMid: new THREE.MeshStandardMaterial({
    color: C.leafMid,
    roughness: 0.45,
    metalness: 0.02,
    side: THREE.DoubleSide,
  }),
  leafLight: new THREE.MeshStandardMaterial({
    color: C.leafLight,
    roughness: 0.4,
    metalness: 0.02,
    side: THREE.DoubleSide,
  }),
  leafYoung: new THREE.MeshStandardMaterial({
    color: C.leafYoung,
    roughness: 0.35,
    metalness: 0.02,
    side: THREE.DoubleSide,
  }),
  youngLeaf: new THREE.MeshStandardMaterial({
    color: C.leafYoung,
    roughness: 0.35,
    metalness: 0.02,
    side: THREE.DoubleSide,
  }),
  youngStem: new THREE.MeshStandardMaterial({
    color: "#8BC67A",
    roughness: 0.5,
    metalness: 0.05,
  }),
  seedHusk: new THREE.MeshStandardMaterial({ color: C.seedHusk, roughness: 0.8, metalness: 0.05 }),
  seed: new THREE.MeshStandardMaterial({ color: C.seedHusk, roughness: 0.8, metalness: 0.05 }),
  seedCore: new THREE.MeshStandardMaterial({ color: "#EED7A1", roughness: 0.5, metalness: 0.05 }),
  seedGlow: new THREE.MeshBasicMaterial({ color: "#FFD54F", transparent: true, opacity: 0.6 }),
  roots: new THREE.MeshStandardMaterial({ color: "#D4C5A9", roughness: 0.9, metalness: 0.0 }),
  rootGlow: new THREE.MeshBasicMaterial({ color: "#4AE0E0", transparent: true, opacity: 0.6 }),
  waterDrop: new THREE.MeshPhysicalMaterial({
    color: C.water,
    transmission: 0.85,
    opacity: 1,
    transparent: true,
    roughness: 0.1,
    ior: 1.33,
  }),
  water: new THREE.MeshPhysicalMaterial({
    color: C.water,
    transmission: 0.85,
    opacity: 1,
    transparent: true,
    roughness: 0.1,
    ior: 1.33,
  }),
  shield: new THREE.MeshPhysicalMaterial({
    color: C.hologram,
    transmission: 0.6,
    opacity: 0.35,
    transparent: true,
    roughness: 0.1,
    metalness: 0.1,
    side: THREE.DoubleSide,
  }),
  shieldWire: new THREE.MeshBasicMaterial({
    color: C.glowCyan,
    wireframe: true,
    transparent: true,
    opacity: 0.2,
  }),
  shieldWireframe: new THREE.MeshBasicMaterial({
    color: C.glowCyan,
    wireframe: true,
    transparent: true,
    opacity: 0.2,
  }),
  hologramRing: new THREE.MeshBasicMaterial({
    color: C.glowCyan,
    transparent: true,
    opacity: 0.8,
    side: THREE.DoubleSide,
  }),
  hologramGrid: new THREE.MeshBasicMaterial({
    color: C.glowCyan,
    wireframe: true,
    transparent: true,
    opacity: 0.3,
    side: THREE.DoubleSide,
  }),
  hologramBeam: new THREE.MeshBasicMaterial({
    color: C.glowBlue,
    transparent: true,
    opacity: 0.15,
    side: THREE.DoubleSide,
  }),
  scannerRing: new THREE.MeshStandardMaterial({
    color: "#00FF66",
    transparent: true,
    opacity: 0.85,
    roughness: 0.1,
    metalness: 0.15,
  }),
  bamboo: new THREE.MeshStandardMaterial({ color: C.bamboo, roughness: 0.65, metalness: 0.05 }),
  bambooNode: new THREE.MeshStandardMaterial({
    color: C.bambooNode,
    roughness: 0.5,
    metalness: 0.05,
  }),
  twine: new THREE.MeshStandardMaterial({ color: C.twine, roughness: 0.85, metalness: 0.0 }),
  tomato: new THREE.MeshStandardMaterial({ color: C.tomato, roughness: 0.4, metalness: 0.05 }),
  calyx: new THREE.MeshStandardMaterial({ color: C.calyx, roughness: 0.6, metalness: 0.05 }),
  wood: new THREE.MeshStandardMaterial({ color: C.wood, roughness: 0.75, metalness: 0.05 }),
  steel: new THREE.MeshStandardMaterial({ color: C.steel, roughness: 0.25, metalness: 0.7 }),
  brass: new THREE.MeshStandardMaterial({ color: C.brass, roughness: 0.3, metalness: 0.8 }),
  mulchSheet: new THREE.MeshStandardMaterial({ color: C.mulch, roughness: 0.2, metalness: 0.65 }),
  hose: new THREE.MeshStandardMaterial({ color: C.hose, roughness: 0.7, metalness: 0.15 }),
  telemetryNode: new THREE.MeshBasicMaterial({ color: C.glowCyan }),
  crate: new THREE.MeshStandardMaterial({ color: C.crateWood, roughness: 0.7, metalness: 0.05 }),
  crateDark: new THREE.MeshStandardMaterial({ color: "#8B6B3A", roughness: 0.75, metalness: 0.05 }),
  crateMetal: new THREE.MeshStandardMaterial({ color: "#888", roughness: 0.3, metalness: 0.7 }),
  crateTomato: new THREE.MeshStandardMaterial({
    color: "#D94040",
    roughness: 0.35,
    metalness: 0.05,
  }),
  flower: new THREE.MeshStandardMaterial({ color: "#FFD54F", roughness: 0.4, metalness: 0.05 }),
  flowerCenter: new THREE.MeshStandardMaterial({
    color: "#5D4037",
    roughness: 0.7,
    metalness: 0.05,
  }),
  tendril: new THREE.MeshStandardMaterial({ color: "#5A9E4B", roughness: 0.5, metalness: 0.05 }),
};

// --- Decorative Soil Clods ---
export const SOIL_CLODS = [
  { pos: [0.55, 0.04, 0.35], scale: 0.05, rot: [0.3, 0.5, 0.2] },
  { pos: [-0.4, 0.03, -0.5], scale: 0.045, rot: [0.7, 0.2, 0.1] },
  { pos: [0.3, 0.05, -0.65], scale: 0.06, rot: [0.1, 0.8, 0.4] },
  { pos: [-0.7, 0.04, 0.2], scale: 0.04, rot: [0.5, 0.3, 0.9] },
  { pos: [0.8, 0.03, -0.15], scale: 0.035, rot: [0.9, 0.1, 0.6] },
  { pos: [-0.2, 0.06, 0.8], scale: 0.055, rot: [0.2, 0.6, 0.3] },
];

// ======================================================================
// LEAF SHAPE GEOMETRY — proper leaf silhouette, created once and reused
// ======================================================================
const leafShape = (() => {
  const s = new THREE.Shape();
  s.moveTo(0, 0); // base (petiole attachment)
  s.bezierCurveTo(0.03, 0.02, 0.055, 0.05, 0.06, 0.09); // right edge lower curve
  s.bezierCurveTo(0.062, 0.11, 0.058, 0.14, 0.05, 0.16); // right edge mid bulge
  s.bezierCurveTo(0.04, 0.19, 0.02, 0.21, 0, 0.22); // tip
  s.bezierCurveTo(-0.02, 0.21, -0.04, 0.19, -0.05, 0.16); // left edge tip to mid
  s.bezierCurveTo(-0.058, 0.14, -0.062, 0.11, -0.06, 0.09); // left edge mid bulge
  s.bezierCurveTo(-0.055, 0.05, -0.03, 0.02, 0, 0); // left edge back to base
  return s;
})();

export const leafGeo = new THREE.ShapeGeometry(leafShape, 6);

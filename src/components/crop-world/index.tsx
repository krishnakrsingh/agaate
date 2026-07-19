import { MutableRefObject } from "react";
import { Canvas } from "@react-three/fiber";
import CropWorldScene from "./CropWorldScene";

export interface CropWorldProps {
  progressRef: MutableRefObject<number>;
  inView?: boolean;
}

export default function CropWorld({ progressRef, inView = true }: CropWorldProps) {
  return (
    <Canvas
      shadows
      frameloop={inView ? "always" : "never"}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
      dpr={[1, 1.25]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <CropWorldScene progressRef={progressRef} />
    </Canvas>
  );
}

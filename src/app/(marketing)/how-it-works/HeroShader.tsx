"use client";

import dynamic from "next/dynamic";

const MeshGradient = dynamic(
  () => import("@paper-design/shaders-react").then((m) => ({ default: m.MeshGradient })),
  { ssr: false }
);

export default function HeroShader() {
  return (
    <MeshGradient
      colors={["#ffffff", "#f5f3ff", "#ede9fe", "#ddd6fe", "#c4b5fd", "#e0e7ff"]}
      speed={0.2}
      distortion={0.4}
      swirl={0.15}
      grainMixer={0.04}
      grainOverlay={0.01}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

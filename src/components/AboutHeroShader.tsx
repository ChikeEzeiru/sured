"use client";

import { Shader, ChromaFlow, DotGrid, Swirl } from "shaders/react";

export default function ShaderEffect() {
  return (
    <div className="absolute inset-0 w-full h-full z-0" aria-hidden>
      <Shader style={{ width: "100%", height: "100%" }}>
        <Swirl
          colorA="#ffffff"
          colorB="#F8FAFC"
          speed={0.5}
          transform={{ scale: 1.8 }}
        />
        <ChromaFlow
          baseColor="#818CF8"
          downColor="#F0FDF4"
          intensity={0.8}
          leftColor="#d165d6"
          momentum={20}
          rightColor="#b6d993"
          transform={{ scale: 1.25 }}
          upColor="#e0a66e"
          visible={true}
        />
        <DotGrid color="#94A3B8" density={80} dotSize={0.15} opacity={0.65} />
      </Shader>
    </div>
  );
}

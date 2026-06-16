"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";

const ParticleJourney = dynamic(() => import("./ParticleJourney"), { ssr: false });

export default function ParticleWrapper({ children }: { children: React.ReactNode }) {
  const targetProgressRef = useRef<number>(0);

  return (
    <section className="relative w-full flex flex-col items-center">
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <ParticleJourney targetProgressRef={targetProgressRef} />
      </div>
      {children}
    </section>
  );
}

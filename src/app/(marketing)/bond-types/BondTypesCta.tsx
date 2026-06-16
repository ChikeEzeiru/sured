"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

const Dithering = dynamic(
  () =>
    import("@paper-design/shaders-react").then((m) => ({
      default: m.Dithering,
    })),
  { ssr: false }
);

export default function BondTypesCta() {
  return (
    <section className="w-full flex flex-col items-center bg-white">
      <div className="relative w-full max-w-310 border-x border-b border-[#e2e8f0] overflow-hidden">
        <Dithering
          speed={0.15}
          shape="warp"
          type="4x4"
          size={1.5}
          scale={1.25}
          colorBack="#00000000"
          colorFront="#A5B4FC4D"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#FFFFFF",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div className="relative z-10 flex flex-col items-center gap-10 py-12 md:py-24 px-3 md:px-8">
          <div className="flex flex-col items-center gap-5 text-center max-w-214">
            <h2 className="text-display-sm font-medium text-[#1e293b] leading-display-sm">
              Not sure which applies?
            </h2>
            <p className="text-xl font-normal text-[#64748b] leading-7.5">
              Most of the time, whoever is requiring the bond tells you exactly
              what you need. If you&apos;re still unsure, call us. We keep
              records on what every major obligee requires and we&apos;ll point
              you in the right direction.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 w-full md:w-auto">
            <Link
              href="tel:+18882368589"
              className="flex w-full md:w-auto items-center justify-center gap-1.5 px-4.5 py-3 bg-brand-hover border-2 border-white/12 rounded-sm text-white text-md font-semibold leading-md shadow-xs hover:bg-[#4338ca] transition-colors"
            >
              Call us: (888) 236-8589
            </Link>
            <p className="text-sm font-medium text-[#64748b]">7 days a week</p>
          </div>
        </div>
      </div>
    </section>
  );
}

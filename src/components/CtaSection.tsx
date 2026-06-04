"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

const Dithering = dynamic(
  () => import("@paper-design/shaders-react").then((m) => ({ default: m.Dithering })),
  { ssr: false }
);

export default function CtaSection() {
  return (
    <section className="w-full flex flex-col items-center bg-white">
      <div className="relative w-full max-w-310 border-x border-b border-[#f1f5f9] overflow-hidden">
        {/* Shader background — fills container, content sits above on z-10 */}
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

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-10 md:gap-12 py-12 md:py-24 px-3 md:px-8">
          {/* Heading */}
          <h2 className="text-display-sm md:text-[36px] font-medium leading-display-sm md:leading-11 tracking-[-0.02em] text-[#1e293b] text-center">
            Your bond is ready when you are.
          </h2>

          {/* CTAs + disclaimer */}
          <div className="flex flex-col items-center gap-3 w-full md:w-auto">
            {/* Buttons */}
            <div className="flex flex-wrap gap-3 md:gap-4 items-center w-full md:w-auto justify-center">
              {/* Primary — Get Sured */}
              <Link
                href="#"
                className="flex flex-1 min-w-47 md:flex-none items-center justify-center gap-1.5
                  px-4.5 py-3 rounded-sm bg-brand-hover
                  border-2 border-[rgba(255,255,255,0.12)]
                  shadow-[0px_4px_8px_-1px_rgba(79,70,229,0.25),0px_3px_6px_-2px_rgba(67,56,202,0.16)]
                  text-white text-md font-semibold leading-md whitespace-nowrap
                  hover:bg-[#4338ca] transition-colors"
              >
                Get Sured
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden
                  className="opacity-60 shrink-0"
                >
                  <path
                    d="M4 10h12M12 6l4 4-4 4"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              {/* Secondary — Call */}
              <Link
                href="tel:+18882368589"
                className="relative flex flex-1 min-w-47 md:flex-none items-center justify-center gap-1.5
                  px-4.5 py-3 rounded-sm bg-white
                  border border-text-secondary
                  shadow-[0px_1px_2px_rgba(0,0,0,0.05),inset_0px_0px_0px_1px_rgba(0,0,0,0.18),inset_0px_-2px_0px_rgba(0,0,0,0.05)]
                  text-border-primary text-md font-semibold leading-md whitespace-nowrap
                  hover:bg-text-primary transition-colors"
              >
                Or call us: (888) 236-8589
              </Link>
            </div>

            {/* Disclaimer */}
            <p className="text-sm md:text-sm font-medium leading-sm text-[#64748b] text-center">
              No commitment until you pay. Soft credit pull only.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import InView from "@/components/InView";

const ParticleJourney = dynamic(() => import("./ParticleJourney"), { ssr: false });

function IconCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const STEPS = [
  {
    num: "01",
    title: "Tell us what you need.",
    body: "Select your bond type and state. Not sure which bond applies to you? Tell us who's requiring it — a state agency, a general contractor, a court — and we'll identify the exact type and required amount. Takes about two minutes.",
    details: [
      "Bond type and state to start — that's it",
      "Subtypes shown with statutory amounts",
      "Call us if you're unsure — we'll identify it",
    ],
  },
  {
    num: "02",
    title: "We shop every carrier.",
    body: "We run a soft credit check — no impact on your score — and match your application against our network of 30+ A-rated carriers. For simple bonds, a quote comes back in seconds. For complex bonds, a licensed specialist takes the file and follows up within one business day.",
    details: [
      "Soft credit pull only — no score impact",
      "30+ A-rated carriers compared instantly",
      "Lowest available rate presented to you",
    ],
  },
  {
    num: "03",
    title: "Get bonded.",
    body: "Review your quote, pay online, and receive your bond digitally. For most bond types this happens the same day you apply. If you need a physical copy mailed to a court, contractor, or obligee, we handle that too — no extra steps on your end.",
    details: [
      "Digital bond emailed immediately after payment",
      "Physical copies mailed same day if required",
      "Renewal reminders sent 30 days before expiry",
    ],
  },
];

const NAVBAR_H = 64; // px — matches h-16

export default function StickySteps() {
  const targetProgressRef = useRef<number>(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const update = () => {
      // The sticky canvas occupies viewport from NAVBAR_H to bottom.
      // Its vertical center in document coords:
      const canvasCenter =
        window.scrollY + NAVBAR_H + (window.innerHeight - NAVBAR_H) / 2;

      // Center of each step in document coords
      const centers = stepRefs.current.map((el) => {
        if (!el) return 0;
        const r = el.getBoundingClientRect();
        return window.scrollY + r.top + r.height / 2;
      });

      // Which step center is closest to the canvas center?
      let nearest = 0;
      let minDist = Infinity;
      centers.forEach((c, i) => {
        const d = Math.abs(c - canvasCenter);
        if (d < minDist) { minDist = d; nearest = i; }
      });

      targetProgressRef.current = nearest;
    };

    window.addEventListener("scroll", update, { passive: true });
    // Also run on resize — step heights / positions can change
    window.addEventListener("resize", update, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section className="w-full flex flex-col items-center bg-white">
      <div className="w-full max-w-[1240px] border-x border-b border-[#f1f5f9] flex flex-col md:flex-row">

        {/* Left — scrollable step text */}
        <div className="flex-1 flex flex-col min-w-0">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              ref={(el) => { stepRefs.current[i] = el; }}
              className="border-b border-[#f1f5f9] last:border-b-0"
            >
              <InView
                delay={i * 60}
                className="flex flex-col gap-5 px-6 md:px-10 py-14 md:py-20"
              >
                <span
                  className="text-[56px] md:text-[64px] font-medium leading-none select-none"
                  style={{ color: "#f1f5f9" }}
                >
                  {step.num}
                </span>
                <h2 className="text-[22px] md:text-[26px] font-medium text-[#0f172a] leading-[30px] md:leading-[34px] tracking-[-0.01em]">
                  {step.title}
                </h2>
                <p className="text-[17px] md:text-[18px] font-normal leading-[26px] md:leading-[28px] text-[#64748b]">
                  {step.body}
                </p>
                <ul className="flex flex-col gap-2">
                  {step.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2 text-sm font-medium text-[#475569]">
                      <span className="shrink-0 mt-0.5 text-[#6366f1]"><IconCheck /></span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </InView>
            </div>
          ))}
        </div>

        {/* Right — sticky particle canvas */}
        <div className="hidden md:block flex-1 shrink-0 self-stretch">
          <div className="sticky top-16 h-[calc(100vh-4rem)] w-full relative">
            <ParticleJourney targetProgressRef={targetProgressRef} />
          </div>
        </div>

      </div>
    </section>
  );
}

"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import StampSection from "@/components/StampSection";

// ─── Icon markers ──────────────────────────────────────────────────────────────
const STEP_ICONS = [
  <svg
    key="s1"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden
  >
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M11 11l3 3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>,
  <svg
    key="s2"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden
  >
    <path
      d="M3 5h10M3 11h10M10 2l3 3-3 3M6 8l-3 3 3 3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>,
  <svg
    key="s3"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    text-text-disabled
    fill="none"
    aria-hidden
  >
    <path
      d="M8 2L3 4.5V9c0 3 2.5 5 5 5.5 2.5-.5 5-2.5 5-5.5V4.5L8 2z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M5.5 8.5l2 2 3-3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>,
];

// ─── Step 1: Bond search dropdown ─────────────────────────────────────────────

function SearchMockup() {
  const groups = [
    {
      heading: "Popular Bonds",
      items: [
        { label: "Performance Bonds", active: true },
        { label: "Court Bond", active: false },
      ],
    },
    {
      heading: "Contract Bonds",
      items: [
        { label: "Bid Bond", active: false },
        { label: "Payment Bond", active: false },
      ],
    },
    {
      heading: "Commercial Bonds",
      items: [
        { label: "License & Permit Bond", active: false },
        { label: "Freight Broker Bond", active: false },
      ],
    },
  ];

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-[6px] max-w-110 w-full overflow-hidden shadow-[0_12px_16px_-4px_rgba(0,0,0,0.08),0_4px_6px_-2px_rgba(0,0,0,0.03),0_2px_2px_-1px_rgba(0,0,0,0.04)]">
      {/* Search bar */}
      <div className="border-b border-text-secondary ">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[#e2e8f0]">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="shrink-0 text-text-disabled"
          >
            <circle
              cx="7"
              cy="7"
              r="4.5"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <path
              d="M11 11l3 3"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
          <div className="flex items-center gap-px">
            <span className="text-[14px] font-medium text-text-disabled leading-4.5">
              Bond
            </span>
            <span className="text-[14px] text-text-muted leading-4.5">s</span>
            {/* Vertical divider */}
            <span className="w-px h-3 bg-bg-secondary mx-px" />
          </div>
        </div>

        {/* Result groups */}
        {groups.map((group) => (
          <div
            key={group.heading}
            className="border-b border-[#f1f5f9] py-3 last:border-b-0"
          >
            <p className="text-left w-full px-4 text-[12px] font-medium text-text-muted mb-2">
              {group.heading}
            </p>
            {group.items.map(({ label, active }) =>
              active ? (
                <div
                  key={label}
                  className="
                    relative w-full bg-[#F8FAFC] px-4 py-2
                    before:absolute before:top-0 before:left-0 before:w-full before:h-px
                    before:bg-[linear-gradient(to_right,#F1F5F9_0%,#E2E8F0_20%,#F1F5F9_100%)]
                    after:absolute after:bottom-0 after:left-0 after:w-full after:h-px
                    after:bg-[linear-gradient(to_right,#F1F5F9_0%,#E2E8F0_20%,#F1F5F9_100%)]
                  "
                >
                  <p className="text-left text-[14px] font-medium text-border-primary whitespace-nowrap">
                    {label}
                  </p>
                </div>
              ) : (
                <div key={label} className="w-full px-4 py-1.5">
                  <p className="text-left text-[14px] font-medium text-border-primary whitespace-nowrap">
                    {label}
                  </p>
                </div>
              )
            )}
          </div>
        ))}
      </div>

      {/* Keyboard hint footer */}
      <div className="bg-text-primary flex items-center gap-5 px-4 py-3 min-h-10">
        <div className="flex items-center gap-1.5">
          <span className="text-[14px] font-manrope font-medium text-text-disabled">
            Navigate
          </span>
          <div className="flex gap-px">
            {(["↑", "↓"] as const).map((k) => (
              <span
                key={k}
                className="border border-[#e2e8f0] rounded-[3px] text-[10px] w-4 h-4 flex items-center justify-center text-[#64748b]"
              >
                {k}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[13.5px] font-manrope font-medium text-text-disabled">
            Select a Bond
          </span>
          <span className="border border-[#64748b] rounded-xs w-3.5 h-3.5 flex items-center justify-center shrink-0">
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
              <path
                d="M7.5 1.5V5H1.5"
                stroke="#64748b"
                strokeWidth="1.1"
                strokeLinecap="round"
              />
              <path
                d="M1.5 5L3.5 3M1.5 5L3.5 7"
                stroke="#64748b"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Step 2: Carrier comparison cards ─────────────────────────────────────────

const CARRIERS = [
  {
    rate: "2.6",
    logo: "/Logos/Logo.svg.svg",
    logoH: 20,
    logoW: 104,
    label: "Fastest approval",
    highlighted: false,
    badge: null,
  },
  {
    rate: "1.8",
    logo: "/Logos/chubb_logo.svg.svg",
    logoH: 11,
    logoW: 108,
    label: "Best for established businesses",
    highlighted: true,
    badge: "A++",
  },
  {
    rate: "2.0",
    logo: "/Logos/liberty_mutual_logo.svg.svg",
    logoH: 26,
    logoW: 104,
    label: "Best all‑around value",
    highlighted: false,
    badge: null,
  },
] as const;

function CarriersMockup() {
  return (
    <div className="relative w-full flex items-center justify-center overflow-hidden py-6">
      {/* Ambient glow blurs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div
          className="absolute w-50 h-48 blur-2xl"
          style={{
            background:
              "linear-gradient(180deg, rgba(204,141,255,0.17), rgba(103,134,255,0.17) 45%, rgba(255,158,158,0.17))",
          }}
        />
        <div
          className="absolute w-51 h-49 blur-sm"
          style={{
            background:
              "linear-gradient(180deg, rgba(204,141,255,0.28), rgba(255,180,215,0.28) 52%, rgba(255,236,158,0.28))",
          }}
        />
      </div>

      <div className="relative flex items-stretch gap-4">
        {CARRIERS.map((card) => (
          <div
            key={card.rate}
            className={[
              "rounded-sm w-50 h-48 p-4 flex flex-col justify-between shrink-0 overflow-hidden",
              card.highlighted
                ? "bg-white border border-[rgba(79,70,229,0.2)] shadow-[0_3px_12px_0_rgba(99,102,241,0.16)]"
                : "bg-white border border-[rgba(0,0,0,0.1)] opacity-[0.68]",
            ].join(" ")}
          >
            {/* Top: badge (if any) + rate */}
            <div
              className={`flex items-start ${
                card.badge ? "justify-between" : "justify-end"
              }`}
            >
              {card.badge && (
                <div className="bg-[#eef2ff] border border-[#c7d2fe] rounded-full flex items-center gap-0.5 pl-1.5 pr-2 py-0.5 shrink-0">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <circle
                      cx="6"
                      cy="6"
                      r="4.5"
                      stroke="#4338ca"
                      strokeWidth="1.1"
                    />
                    <path
                      d="M3.5 6l1.8 1.8 3.2-3.6"
                      stroke="#4338ca"
                      strokeWidth="1.1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-[12px] font-medium text-[#4338ca]">
                    {card.badge}
                  </span>
                </div>
              )}
              <div className="flex items-end gap-0.5">
                <span className="text-[36px] font-medium leading-11 tracking-[-0.72px] text-[#0f172a]">
                  {card.rate}
                </span>
                <span className="text-[14px] font-medium text-text-disabled pb-1">
                  %
                </span>
              </div>
            </div>

            {/* Bottom: logo + label */}
            <div className="flex flex-col gap-1">
              <div
                className="relative"
                style={{ height: card.logoH, width: card.logoW }}
              >
                <Image
                  src={card.logo}
                  alt=""
                  fill
                  className="object-contain object-left"
                />
              </div>
              <p className="text-[10px] font-medium text-text-muted">
                {card.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Steps data ────────────────────────────────────────────────────────────────

const STEPS = [
  {
    title: "Tell us what you need.",
    body: "Search for your bond type or call us directly. If you're not sure what you need, that's fine, we help you figure it out.",
    reversed: false,
  },
  {
    title: "We shop every carrier.",
    body: "Our specialists run your application across our carrier network and come back with the lowest rate we can get. For most bonds, this takes minutes.",
    reversed: true,
  },
  {
    title: "Get Sured.",
    body: "Pay online. Receive your bond digitally. For bonds that require physical copies, we mail them. Most applicants are bonded on the same day.",
    reversed: false,
  },
];

const MOCKUPS = [
  <SearchMockup key={0} />,
  <CarriersMockup key={1} />,
  <StampSection key={2} className="w-full px-4 py-8" />,
];

// ─── Main component ────────────────────────────────────────────────────────────

const BLOB_H = 10; // spotlight height as % of track

export default function HowToBondSection() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      if (!stepsRef.current || !blobRef.current) return;
      const { top, height } = stepsRef.current.getBoundingClientRect();
      // Track viewport center through the section for intuitive position mapping
      const p = Math.max(0, Math.min(1, (window.innerHeight / 2 - top) / height));
      blobRef.current.style.top = `${p * (100 - BLOB_H)}%`;
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <section className="w-full flex flex-col items-center bg-white">
      <div className="w-full max-w-310">
        {/* ── Header ── */}
        <div className="border-y border-[#f1f5f9]">
          <div className="border-x border-[#f1f5f9] flex flex-col items-center px-3 md:px-8 py-12 md:pt-24 md:pb-16">
            <h2 className="max-w-180 text-[24px] md:text-[36px] font-medium leading-8 md:leading-11 tracking-[-0.02em] text-[#0f172a] text-center">
              From application to bonded. <br />
              Often the same day.
            </h2>
          </div>
        </div>

        {/* ── Steps ── */}
        <div
          ref={stepsRef}
          className="relative border-x border-[#f1f5f9] pb-16 lg:pt-16"
        >
          {/*
           * Progress line
           * Mobile:  translate-x-5 (20px from left, matches icon's -translate-x-4 offset)
           * Desktop: left-1/2, centered between text and content columns
           */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 z-0 h-full w-px translate-x-5 lg:left-1/2 lg:-translate-x-1/2"
          >
            {/* Top fade cap */}
            <div
              className="h-4 w-px"
              style={{ background: "linear-gradient(to bottom, transparent, rgba(226,232,240,0.6))" }}
            />
            {/* Static track */}
            <div
              className="relative w-full"
              style={{
                height: "calc(100% - 1rem)",
                background: "linear-gradient(to bottom, rgba(226,232,240,0.6) 0%, rgba(226,232,240,0.6) 88%, transparent 100%)",
              }}
            >
              {/* Moving spotlight — driven by direct DOM mutation, no React re-render */}
              <div
                ref={blobRef}
                className="absolute left-0 z-10 w-px"
                style={{
                  top: "0%",
                  height: `${BLOB_H}%`,
                  background: "linear-gradient(to bottom, transparent 0%, #6366f1 30%, #6366f1 70%, transparent 100%)",
                }}
              />
            </div>
          </div>

          {STEPS.map((step, i) => (
            <div key={i} className="relative flex">
              <div
                className={[
                  "flex w-full justify-center px-1 py-10 text-end md:gap-6 lg:gap-10",
                  i === 0 ? "pt-20" : "",
                  i === STEPS.length - 1 ? "pb-20" : "",
                  step.reversed ? "lg:flex-row-reverse lg:text-start" : "",
                ].join(" ")}
              >
                {/* Desktop text — hidden on mobile */}
                <div className="flex-1 max-lg:hidden flex items-center px-5 max-w-135">
                  <p
                    className={[
                      "text-[24px] leading-8 text-[#0f172a] w-full text-balance",
                      !step.reversed ? "text-right" : "text-left",
                    ].join(" ")}
                  >
                    <span className="font-medium">{step.title}</span>{" "}
                    <span className="font-normal text-[#64748b]">
                      {step.body}
                    </span>
                  </p>
                </div>

                {/* Icon node on the line */}
                <div className="z-[-1] size-fit -translate-y-5 bg-white p-4 max-lg:-translate-x-4">
                  <div className="rounded-[10px] border border-[#e2e8f0] bg-white p-1.25 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]">
                    <div className="size-fit rounded-md border border-[#e2e8f0] bg-text-primary p-1 text-text-disabled">
                      {STEP_ICONS[i]}
                    </div>
                  </div>
                </div>

                {/* Content column: mobile text + dashed frame + mockup */}
                <div className="flex-1 max-lg:-translate-x-4">
                  {/* Mobile-only text */}
                  <div className="text-start lg:pointer-events-none lg:hidden">
                    <p className="text-[20px] leading-7.5 text-[#0f172a] mb-10">
                      <span className="font-medium">{step.title}</span>{" "}
                      <span className="font-normal text-[#64748b]">
                        {step.body}
                      </span>
                    </p>
                  </div>

                  <div
                    className={`flex items-center justify-start ${
                      step.reversed ? "lg:justify-end" : ""
                    }`}
                  >
                    <div className="flex items-center justify-center min-h-60 lg:min-h-75 w-full px-5 max-w-135">
                      {MOCKUPS[i]}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

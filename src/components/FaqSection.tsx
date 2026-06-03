"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What is a surety bond?",
    a: "A guarantee; between you, whoever is requiring the bond, and the insurance company backing it. If you don't fulfil your obligation, the other party can make a claim. Think of it as a licence to do business, backed by a financial guarantee.",
  },
  {
    q: "What makes Sured different from other brokers?",
    a: "Speed, price, and access. We've built relationships with 30+ carriers so we can shop your bond across the market instantly. Most clients get their lowest-ever rate. And unlike the big-box brokers, you'll have a real person in your corner, not a call centre.",
  },
  {
    q: "How do I know what bond I need?",
    a: "Tell us who's requiring it — a state agency, a general contractor, a court, and we'll identify the exact bond type and amount. If you have a licence application or contract requirement, just share it and we'll do the rest.",
  },
  {
    q: "How much do surety bonds cost?",
    a: "Typically 1–3% of the bond amount per year, depending on the bond type and your credit profile. A $10,000 bond might cost as little as $100. We'll find the lowest available rate regardless of your credit history.",
  },
  {
    q: "Can I get bonded today?",
    a: "Yes. Most licence and permit bonds are issued instantly after payment. Larger contract bonds (Performance & Payment) take 1–2 business days. We'll tell you upfront exactly how long it'll take.",
  },
];

function PlusIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 5v14M5 12h14"
        stroke="#64748b"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12h14"
        stroke="#334155"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FaqItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[#e2e8f0]">
      <button
        className="flex w-full items-start justify-between gap-4 px-2 py-4 text-left md:py-5"
        onClick={onToggle}
        aria-expanded={open}
      >
        <span
          className={`text-[18px] md:text-[20px] leading-[28px] md:leading-7.5 font-medium transition-colors duration-200 ${
            open ? "text-[#0f172a]" : "text-[#334155]"
          }`}
        >
          {q}
        </span>
        <span className="mt-0.5 shrink-0">
          {open ? <MinusIcon /> : <PlusIcon />}
        </span>
      </button>

      {/* Smooth expand via grid-rows trick */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-2 pb-5 text-[18px] md:text-[20px] leading-[28px] md:leading-7.5 font-normal text-[#64748b]">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? -1 : i));

  return (
    <section className="w-full bg-text-primary">
      <div className="mx-auto max-w-310 border-x border-b border-[#e2e8f0] py-12 md:py-24">
        {/* Inner group: top + bottom border */}
        <div className="border-t border-b border-[#e2e8f0] flex flex-col md:flex-row md:gap-16 px-3 md:pl-8 md:pr-0">
          {/* Left: section header */}
          <div className="flex flex-col gap-2 py-4 md:py-6 md:w-90 md:shrink-0">
            <div className="self-start bg-white border border-text-secondary rounded-xs px-2 py-0.5 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
              <span className="text-[14px] font-medium leading-[20px] text-border-primary">
                FAQ
              </span>
            </div>
            <h2 className="text-display-sm md:text-[36px] leading-display-sm md:leading-11 font-medium text-[#0f172a] tracking-[-0.72px]">
              Before you call us.
            </h2>
          </div>

          {/* Right: accordion */}
          <div className="flex flex-col flex-1 border-t border-[#e2e8f0] md:border-t-0 md:border-l md:border-[#e2e8f0] md:pl-4 md:pr-8">
            {faqs.map((faq, i) => (
              <FaqItem
                key={i}
                q={faq.q}
                a={faq.a}
                open={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

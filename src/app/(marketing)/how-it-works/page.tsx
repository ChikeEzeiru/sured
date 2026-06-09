import Link from "next/link";
import Image from "next/image";
import InView from "@/components/InView";
import CtaSection from "@/components/CtaSection";

// ── Icons ──────────────────────────────────────────────────────────────────────

function IconCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconChevron() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M3 5l4 4 4-4" stroke="#94a3b8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="opacity-60 shrink-0">
      <path d="M3 8h10M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Step visuals (kept for future use) ────────────────────────────────────────

function Step1Visual() {
  return (
    <div className="w-full max-w-[300px] mx-auto" style={{ perspective: "900px" }}>
      <div
        className="bg-white rounded-[12px] border border-[#e2e8f0] overflow-hidden"
        style={{
          transform: "rotateX(5deg) rotateY(-10deg)",
          boxShadow:
            "0 24px 60px -10px rgba(99,102,241,0.12), 0 8px 20px -4px rgba(0,0,0,0.07), inset 0 0 0 1px rgba(0,0,0,0.04)",
        }}
      >
        {/* Card chrome */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#f1f5f9] bg-[#fafafa]">
          <span className="text-[11px] font-semibold text-[#94a3b8] tracking-wide">STEP 1 OF 2</span>
          <div className="flex gap-1">
            <span className="size-2 rounded-full bg-[#e2e8f0]" />
            <span className="size-2 rounded-full bg-[#c7d2fe]" />
          </div>
        </div>

        <div className="p-4 flex flex-col gap-3">
          {/* Bond type */}
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold text-[#64748b] uppercase tracking-wide">Bond Type</span>
            <div className="flex items-center justify-between bg-white border border-[#cbd5e1] rounded-[6px] px-3 py-2">
              <span className="text-sm font-medium text-[#334155]">Contractor License Bond</span>
              <IconChevron />
            </div>
          </div>

          {/* Subtype — highlighted */}
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold text-[#64748b] uppercase tracking-wide">Bond Subtype</span>
            <div className="flex items-center justify-between bg-[#f5f3ff] border border-[#c4b5fd] rounded-[6px] px-3 py-2">
              <span className="text-sm font-medium text-[#4f46e5]">General Contractor — $15,000</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M3 5l4 4 4-4" stroke="#7c3aed" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* State */}
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold text-[#64748b] uppercase tracking-wide">State</span>
            <div className="flex items-center justify-between bg-white border border-[#cbd5e1] rounded-[6px] px-3 py-2">
              <span className="text-sm font-medium text-[#334155]">California</span>
              <IconChevron />
            </div>
          </div>

          {/* Price callout */}
          <div className="bg-[rgba(238,242,255,0.6)] border border-[rgba(99,102,241,0.3)] rounded-[6px] px-3 py-2">
            <p className="text-[11px] font-medium text-[#334155] leading-snug">
              Most bonds in CA cost{" "}
              <span className="text-[#4f46e5] font-semibold">$150 – $500</span> / year.
            </p>
          </div>

          {/* CTA button */}
          <button
            type="button"
            className="w-full bg-[#4f46e5] text-white text-sm font-semibold py-2 rounded-[6px] flex items-center justify-center gap-1.5 mt-0.5"
          >
            Next
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M3 7h8M8 4l3 3-3 3" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

const CARRIERS = [
  { rate: "2.6", label: "Fastest approval",              logo: "/Logos/Logo.svg.svg",                    lw: 80, lh: 16, highlighted: false, badge: null  },
  { rate: "1.8", label: "Best for established businesses", logo: "/Logos/chubb_logo.svg.svg",             lw: 80, lh: 9,  highlighted: true,  badge: "A++" },
  { rate: "2.0", label: "Best all‑around value",          logo: "/Logos/liberty_mutual_logo.svg.svg",    lw: 76, lh: 19, highlighted: false, badge: null  },
] as const;

function Step2Visual() {
  return (
    <div className="w-full max-w-[360px] mx-auto" style={{ perspective: "900px" }}>
      <div
        className="flex items-end gap-2.5"
        style={{ transform: "rotateX(5deg) rotateY(10deg)" }}
      >
        {CARRIERS.map((card) => (
          <div
            key={card.rate}
            className={[
              "rounded-[10px] p-3.5 flex flex-col justify-between overflow-hidden",
              card.highlighted
                ? "flex-[1_0_0] bg-white border border-[rgba(79,70,229,0.22)] shadow-[0_4px_16px_0_rgba(99,102,241,0.18)] min-h-[168px]"
                : "flex-[0.82_0_0] bg-white border border-[rgba(0,0,0,0.08)] opacity-[0.65] min-h-[148px]",
            ].join(" ")}
          >
            <div className={`flex items-start ${card.badge ? "justify-between" : "justify-end"}`}>
              {card.badge && (
                <div className="flex items-center gap-0.5 bg-[#eef2ff] border border-[#c7d2fe] rounded-full px-1.5 py-0.5">
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden>
                    <circle cx="4.5" cy="4.5" r="3.5" stroke="#4338ca" strokeWidth="1" />
                    <path d="M2.5 4.5l1.4 1.4 2.6-2.8" stroke="#4338ca" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[10px] font-semibold text-[#4338ca]">{card.badge}</span>
                </div>
              )}
              <div className="flex items-end gap-0.5">
                <span className="text-[26px] font-medium leading-none tracking-tight text-[#0f172a]">{card.rate}</span>
                <span className="text-[11px] font-medium text-[#94a3b8] pb-0.5">%</span>
              </div>
            </div>

            <div className="flex flex-col gap-1 mt-3">
              <div className="relative" style={{ height: card.lh, width: card.lw }}>
                <Image src={card.logo} alt="" fill className="object-contain object-left" />
              </div>
              <p className="text-[9px] font-medium text-[#94a3b8] leading-tight">{card.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Step3Visual() {
  return (
    <div className="w-full max-w-[280px] mx-auto" style={{ perspective: "900px" }}>
      <div
        className="bg-white rounded-[12px] border border-[#e2e8f0] overflow-hidden"
        style={{
          transform: "rotateX(5deg) rotateY(-10deg)",
          boxShadow:
            "0 24px 60px -10px rgba(22,163,74,0.10), 0 8px 20px -4px rgba(0,0,0,0.07), inset 0 0 0 1px rgba(0,0,0,0.04)",
        }}
      >
        <div className="px-5 pt-5 pb-4">
          {/* Green check icon */}
          <div
            className="size-8 rounded-[6px] bg-[#16a34a] flex items-center justify-center mb-3 shrink-0"
            style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(0,0,0,0.18), inset 0 -2px 0 rgba(0,0,0,0.05)" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M3 8l3.5 3.5L13 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h4 className="text-[18px] font-medium text-[#334155] leading-snug">You&rsquo;re Sured.</h4>
          <p className="text-xs text-[#64748b] mt-0.5 leading-snug">Your bond document is on its way.</p>
        </div>

        <div className="bg-[#f8fafc] border-t border-[#f1f5f9] px-5 py-3.5 flex flex-col gap-2">
          {[
            { label: "Bond number", value: "SRD-2025-04-8914" },
            { label: "Issued",      value: "Today" },
            { label: "Expires",     value: "Jun 4, 2027" },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-xs text-[#64748b]">{label}</span>
              <span className="text-xs font-medium text-[#334155]">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Data ───────────────────────────────────────────────────────────────────────

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

const STEP_VISUALS = [<Step1Visual key={0} />, <Step2Visual key={1} />, <Step3Visual key={2} />];

const SIMPLE_BOND_TYPES = [
  "License & permit bonds",
  "Contractor license bonds",
  "Auto & motor vehicle dealer bonds",
  "Notary bonds",
  "Freight broker bonds",
  "Mortgage broker bonds",
  "Title agent bonds",
  "Money transmitter bonds",
  "Collection agency bonds",
  "Tax preparer bonds",
];

const COMPLEX_BOND_TYPES = [
  "Performance bonds",
  "Payment bonds",
  "Bid bonds",
  "Court bonds",
  "Subdivision bonds",
  "Fidelity bonds",
  "Maintenance bonds",
  "Supply bonds",
];

const SIMPLE_TIMELINE  = ["Select", "Quote (minutes)", "Pay", "Bond issued"];
const COMPLEX_TIMELINE = ["Apply", "Specialist review", "Underwriting", "Quote (1–3 days)", "Bond issued"];

// ── Sections ───────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="w-full flex flex-col items-center bg-white">
      <div className="w-full max-w-[1240px] border-x border-b border-[#f1f5f9]">
        <div className="px-3 md:px-8 pt-12 md:pt-24 pb-12 md:pb-16">
          <InView className="flex flex-col gap-10 max-w-[680px]">
            <h1 className="font-medium tracking-display text-[30px] leading-[38px]">
              <span className="text-[#0f172a]">From application to bonded. </span>
              <span className="text-[#64748b]">Here&rsquo;s exactly what happens from the moment you reach out to the moment your bond lands in your inbox.</span>
            </h1>
          </InView>
        </div>
      </div>
    </section>
  );
}

function StepsSection() {
  return (
    <section className="w-full flex flex-col items-center bg-white">
      <div className="w-full max-w-[1240px] border-x border-b border-[#f1f5f9]">
        {STEPS.map((step, i) => {
          const reversed = i % 2 === 1;
          return (
            <InView
              key={step.num}
              className={[
                "flex flex-col gap-10 px-3 md:px-8 py-12 md:py-20 border-b border-[#f1f5f9] last:border-b-0",
                reversed ? "md:flex-row-reverse" : "md:flex-row",
                "md:items-center md:gap-16",
              ].join(" ")}
              delay={i * 60}
            >
              <div className="flex flex-col gap-5 flex-1 min-w-0 md:max-w-[480px]">
                <span className="text-[56px] md:text-[64px] font-medium leading-none select-none" style={{ color: "#f1f5f9" }}>
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
              </div>
              <div className="flex-1 flex items-center justify-center py-4 md:py-0">
                {STEP_VISUALS[i]}
              </div>
            </InView>
          );
        })}
      </div>
    </section>
  );
}

function TestimonialSection() {
  return (
    <section className="w-full flex flex-col items-center bg-white">
      <div className="relative w-full max-w-[1240px] border-x border-b border-[#f1f5f9] overflow-hidden">
        {/* Decorative quote mark */}
        <span
          aria-hidden
          className="absolute top-6 md:top-10 left-1/2 -translate-x-1/2 select-none pointer-events-none font-medium text-[#f1f5f9] leading-none"
          style={{ fontSize: "clamp(80px, 12vw, 140px)" }}
        >
          &ldquo;
        </span>

        <InView className="relative z-10 flex flex-col items-center gap-8 px-4 md:px-8 py-16 md:py-24">
          <blockquote className="font-medium text-[#1e293b] text-center leading-[32px] max-w-[720px]" style={{ fontSize: "clamp(18px, 2.5vw, 24px)" }}>
            &ldquo;I received my bond 5 minutes after payment. Fast, responsive, completely straightforward.&rdquo;
          </blockquote>

          <div className="flex items-center gap-3">
            <div className="size-12 rounded-[4px] overflow-hidden shrink-0 bg-[#e2e8f0]">
              <Image
                src="/testimonials/avatar-3.jpg"
                alt="Nguyen Lang"
                width={48}
                height={48}
                className="size-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-medium text-[#334155] leading-6">Nguyen Lang</span>
              <div className="flex items-center gap-2">
                <span className="text-base font-normal text-[#64748b] leading-6">Nail school owner</span>
                <Image
                  src="/Logos/trustpilot_symbol.svg.svg"
                  alt="Trustpilot"
                  width={16}
                  height={15}
                  className="shrink-0"
                />
              </div>
            </div>
          </div>
        </InView>
      </div>
    </section>
  );
}

function BondTracksSection() {
  return (
    <section className="w-full flex flex-col items-center bg-[#020617]">
      <div className="w-full max-w-[1240px] border-x border-b border-[#1e293b] px-3 md:px-8 py-12 md:py-24">
        <InView className="mb-10 md:mb-16">
          <h2 className="text-[24px] md:text-[36px] font-medium leading-[32px] md:leading-[44px] tracking-[-0.02em] text-[#f1f5f9]">
            Two tracks. One agency.
          </h2>
          <p className="mt-3 text-[17px] md:text-[18px] font-normal leading-[26px] md:leading-[28px] text-[#94a3b8] max-w-[560px]">
            Your bond type determines the path. Simple bonds are instant. Complex bonds get a dedicated specialist.
          </p>
        </InView>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-stretch">
          {/* Simple bonds */}
          <InView className="flex-1 flex flex-col gap-6 bg-[#0f172a] border border-[#1e293b] rounded-sm p-6 md:p-8">
            <div className="flex flex-col gap-3">
              <div className="self-start flex items-center gap-1.5 bg-[#052e16] border border-[#166534]/50 rounded-full px-2.5 py-0.5">
                <span className="size-1.5 rounded-full bg-[#4ade80] shrink-0" />
                <span className="text-[#4ade80] text-xs font-semibold">Instant issue</span>
              </div>
              <h3 className="text-[20px] md:text-[22px] font-medium text-[#f1f5f9] leading-[28px]">Simple bonds</h3>
              <p className="text-sm font-normal text-[#94a3b8] leading-[20px]">
                Most license, permit, and commercial bonds are issued the same day — often within minutes of payment.
              </p>
            </div>
            <div className="flex flex-wrap gap-x-1.5 gap-y-2 items-center">
              {SIMPLE_TIMELINE.map((s, i) => (
                <div key={s} className="flex items-center gap-1.5">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${i === SIMPLE_TIMELINE.length - 1 ? "bg-[#052e16] border-[#166534]/50 text-[#4ade80]" : "bg-[#1e293b] border-[#334155] text-[#94a3b8]"}`}>{s}</span>
                  {i < SIMPLE_TIMELINE.length - 1 && <span className="text-[#334155] text-xs">→</span>}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-xs font-semibold text-[#475569] uppercase tracking-wide mb-1">Bond types</p>
              {SIMPLE_BOND_TYPES.map((t) => (
                <div key={t} className="flex items-center gap-2 text-sm font-medium text-[#cbd5e1]">
                  <span className="text-[#4ade80] shrink-0"><IconCheck /></span>{t}
                </div>
              ))}
            </div>
            <Link href="/get-a-bond" className="mt-auto self-start flex items-center gap-1.5 text-sm font-semibold text-[#818cf8] hover:text-[#a5b4fc] transition-colors">
              Get a simple bond <IconArrowRight />
            </Link>
          </InView>

          {/* Complex bonds */}
          <InView className="flex-1 flex flex-col gap-6 bg-[#0f172a] border border-[#1e293b] rounded-sm p-6 md:p-8" delay={100}>
            <div className="flex flex-col gap-3">
              <div className="self-start flex items-center gap-1.5 bg-[#1e1b4b] border border-[#4338ca]/40 rounded-full px-2.5 py-0.5">
                <span className="size-1.5 rounded-full bg-[#818cf8] shrink-0" />
                <span className="text-[#818cf8] text-xs font-semibold">Specialist-handled</span>
              </div>
              <h3 className="text-[20px] md:text-[22px] font-medium text-[#f1f5f9] leading-[28px]">Complex bonds</h3>
              <p className="text-sm font-normal text-[#94a3b8] leading-[20px]">
                Performance, payment, and bid bonds require underwriting. A licensed Sured specialist handles the carrier search, financial review, and documentation end to end.
              </p>
            </div>
            <div className="flex flex-wrap gap-x-1.5 gap-y-2 items-center">
              {COMPLEX_TIMELINE.map((s, i) => (
                <div key={s} className="flex items-center gap-1.5">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${i === COMPLEX_TIMELINE.length - 1 ? "bg-[#1e1b4b] border-[#4338ca]/40 text-[#818cf8]" : "bg-[#1e293b] border-[#334155] text-[#94a3b8]"}`}>{s}</span>
                  {i < COMPLEX_TIMELINE.length - 1 && <span className="text-[#334155] text-xs">→</span>}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-xs font-semibold text-[#475569] uppercase tracking-wide mb-1">Bond types</p>
              {COMPLEX_BOND_TYPES.map((t) => (
                <div key={t} className="flex items-center gap-2 text-sm font-medium text-[#cbd5e1]">
                  <span className="text-[#818cf8] shrink-0"><IconCheck /></span>{t}
                </div>
              ))}
            </div>
            <Link href="/get-a-bond" className="mt-auto self-start flex items-center gap-1.5 text-sm font-semibold text-[#818cf8] hover:text-[#a5b4fc] transition-colors">
              Start an application <IconArrowRight />
            </Link>
          </InView>
        </div>
      </div>
    </section>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function HowItWorksPage() {
  return (
    <main className="flex flex-col flex-1">
      <Hero />
      <StepsSection />
      <BondTracksSection />
      <TestimonialSection />
      <CtaSection
        heading="Most bonds are issued the same day."
        headingAccent="Yours could be next."
        primaryLabel="Start your application"
        disclaimer="Takes 2 minutes. No commitment until you pay."
      />
    </main>
  );
}

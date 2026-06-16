import Link from "next/link";
import Image from "next/image";
import InView from "@/components/InView";
import CtaSection from "@/components/CtaSection";
import StickySteps from "./StickySteps";

// ── Icons ──────────────────────────────────────────────────────────────────────

function SealIcon() {
  return (
    <Image
      src="/icons/sured-icon.svg"
      alt=""
      aria-hidden
      width={16}
      height={20}
      className="shrink-0"
    />
  );
}

function IconCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M2.5 7l3 3 6-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconArrowRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="opacity-60 shrink-0"
    >
      <path
        d="M3 8h10M8 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Data ───────────────────────────────────────────────────────────────────────

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

const SIMPLE_TIMELINE = ["Select", "Quote (minutes)", "Pay", "Bond issued"];
const COMPLEX_TIMELINE = [
  "Apply",
  "Specialist review",
  "Underwriting",
  "Quote (1–3 days)",
  "Bond issued",
];

// ── Sections ───────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="w-full flex flex-col items-center bg-white">
      <div className="w-full max-w-310 border-x border-b border-[#f1f5f9]">
        <div className="px-3 md:px-8 pt-12 md:pt-24 pb-12 md:pb-16">
          <InView className="flex flex-col gap-10 max-w-170">
            <h1 className="font-medium tracking-display text-display-sm leading-display-sm">
              <span className="text-[#0f172a]">
                From application to bonded.{" "}
              </span>
              <span className="text-[#64748b]">
                Here&rsquo;s exactly what happens from the moment you reach out
                to the moment your bond lands in your inbox.
              </span>
            </h1>
          </InView>
        </div>
      </div>
    </section>
  );
}

function TestimonialSection() {
  return (
    <section className="w-full flex flex-col items-center bg-[#F8FAFC]">
      <div className="relative w-full max-w-310 border-x border-b border-[#E2E8F0] overflow-hidden">
        {/* Decorative quote mark */}
        <span
          aria-hidden
          className="absolute top-6 md:top-10 left-1/2 -translate-x-1/2 select-none pointer-events-none font-medium text-[#f1f5f9] leading-none"
          style={{ fontSize: "clamp(80px, 12vw, 140px)" }}
        >
          &ldquo;
        </span>

        <InView className="relative z-10 flex flex-col items-center gap-8 px-4 md:px-8 py-16 md:py-24">
          <blockquote
            className="font-medium text-[#1e293b] text-center leading-8 max-w-180"
            style={{ fontSize: "clamp(18px, 2.5vw, 24px)" }}
          >
            &ldquo;I received my bond 5 minutes after payment. Fast, responsive,
            completely straightforward.&rdquo;
          </blockquote>

          <div className="flex items-center gap-3">
            <div className="size-12 rounded-sm overflow-hidden shrink-0 bg-[#e2e8f0]">
              <Image
                src="/testimonials/avatar-3.jpg"
                alt="Nguyen Lang"
                width={48}
                height={48}
                className="size-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-medium text-border-primary leading-6">
                Nguyen Lang
              </span>
              <div className="flex items-center gap-2">
                <span className="text-base font-normal text-[#64748b] leading-6">
                  Nail school owner
                </span>
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
    <section className="w-full flex flex-col items-center bg-bg-primary">
      <div className="w-full max-w-310 border-x border-b border-[#1e293b] px-3 md:px-8 py-12 md:py-24">
        <InView className="mb-10 md:mb-16">
          <h2 className="text-[24px] md:text-[36px] font-medium leading-8 md:leading-11 tracking-[-0.02em] text-[#f1f5f9]">
            Two tracks. One agency.
          </h2>
          <p className="mt-3 text-[17px] md:text-[18px] font-normal leading-6.5 md:leading-[28px] text-text-mutedmax-w-140]">
            Your bond type determines the path. Simple bonds are instant.
            Complex bonds get a dedicated specialist.
          </p>
        </InView>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-stretch">
          {/* Simple bonds */}
          <InView className="flex-1 flex flex-col gap-6 bg-[#0f172a]/50 border border-[#1e293b] rounded-sm p-6 md:p-8">
            <div className="flex flex-col gap-3">
              <div className="self-start inline-flex items-center bg-[#052e16] border border-[#166534]/50 rounded-full px-2.5 py-0.5">
                <span className="text-[#4ade80] text-xs font-semibold">
                  Instant issue
                </span>
              </div>
              <h3 className="text-[20px] md:text-[22px] font-medium text-[#f1f5f9] leading-[28px]">
                Simple bonds
              </h3>
              <p className="text-sm font-normal text-text-muted leading-[20px]">
                Most license, permit, and commercial bonds are issued the same
                day — often within minutes of payment.
              </p>
            </div>
            <div className="flex flex-wrap gap-x-1.5 gap-y-2 items-center">
              {SIMPLE_TIMELINE.map((s, i) => (
                <div key={s} className="flex items-center gap-1.5">
                  <span
                    className={`text-xs font-medium ${
                      i === SIMPLE_TIMELINE.length - 1
                        ? "text-[#4ade80]"
                        : "text-text-muted"
                    }`}
                  >
                    {s}
                  </span>
                  {i < SIMPLE_TIMELINE.length - 1 && (
                    <span className="text-border-primary text-xs">→</span>
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-xs font-semibold text-text-disabled uppercase tracking-wide mb-1">
                Bond types
              </p>
              {SIMPLE_BOND_TYPES.map((t) => (
                <div
                  key={t}
                  className="flex items-center gap-2 text-sm font-medium text-text-secondary"
                >
                  <span className="text-[#4ade80] shrink-0">
                    <IconCheck />
                  </span>
                  {t}
                </div>
              ))}
            </div>
            <Link
              href="/get-a-bond"
              className="mt-auto self-start flex items-center gap-1.5 text-sm font-semibold text-[#818cf8] hover:text-[#a5b4fc] transition-colors"
            >
              Get a simple bond <IconArrowRight />
            </Link>
          </InView>

          {/* Complex bonds */}
          <InView
            className="flex-1 flex flex-col gap-6 bg-[#0f172a]/50 border border-[#1e293b] rounded-sm p-6 md:p-8"
            delay={100}
          >
            <div className="flex flex-col gap-3">
              <div className="self-start inline-flex items-center bg-[#1e1b4b] border border-[#4338ca]/40 rounded-full px-2.5 py-0.5">
                <span className="text-[#818cf8] text-xs font-semibold">
                  Specialist-handled
                </span>
              </div>
              <h3 className="text-[20px] md:text-[22px] font-medium text-[#f1f5f9] leading-[28px]">
                Complex bonds
              </h3>
              <p className="text-sm font-normal text-text-muted leading-[20px]">
                Performance, payment, and bid bonds require underwriting. A
                licensed Sured specialist handles the carrier search, financial
                review, and documentation end to end.
              </p>
            </div>
            <div className="flex flex-wrap gap-x-1.5 gap-y-2 items-center">
              {COMPLEX_TIMELINE.map((s, i) => (
                <div key={s} className="flex items-center gap-1.5">
                  <span
                    className={`text-xs font-medium ${
                      i === COMPLEX_TIMELINE.length - 1
                        ? "text-[#818cf8]"
                        : "text-text-muted"
                    }`}
                  >
                    {s}
                  </span>
                  {i < COMPLEX_TIMELINE.length - 1 && (
                    <span className="text-border-primary text-xs">→</span>
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-xs font-semibold text-text-disabled uppercase tracking-wide mb-1">
                Bond types
              </p>
              {COMPLEX_BOND_TYPES.map((t) => (
                <div
                  key={t}
                  className="flex items-center gap-2 text-sm font-medium text-text-secondary"
                >
                  <span className="text-[#818cf8] shrink-0">
                    <IconCheck />
                  </span>
                  {t}
                </div>
              ))}
            </div>
            <Link
              href="/get-a-bond"
              className="mt-auto self-start flex items-center gap-1.5 text-sm font-semibold text-[#818cf8] hover:text-[#a5b4fc] transition-colors"
            >
              Start an application <IconArrowRight />
            </Link>
          </InView>
        </div>
      </div>
    </section>
  );
}

function ThreeThingsSection() {
  return (
    <section className="w-full flex flex-col items-center bg-white">
      <div className="w-full max-w-310 border-x border-b border-[#f1f5f9] flex flex-col gap-10 md:gap-16 py-12 md:py-24">
        {/* Heading */}
        <InView className="px-4 md:px-8">
          <h2 className="text-[24px] md:text-display-sm font-medium leading-8 md:leading-display-sm text-[#0f172a]">
            Three things a general broker can&rsquo;t give you.
          </h2>
        </InView>

        {/* Content grid */}
        <div className="border-t border-b border-[#f1f5f9]">
          {/* Item 1 — full width + photo */}
          <div className="border-b border-[#f1f5f9] px-4 md:px-8">
            <InView className="flex flex-col gap-8 px-3 md:px-5 py-10">
              <div className="flex flex-col gap-2">
                <SealIcon />
                <p className="text-[20px] leading-7.5xt-[#64748b]">
                  <span className="font-medium text-border-primary">
                    We only do surety.
                  </span>
                  {
                    " No general insurance, no sidelines. Every person at Sured specialises in bonds. When your situation is unusual, you want someone who has seen it before."
                  }
                </p>
              </div>
              <div className="relative w-full aspect-314/120d:aspect-auto md:h-70 overflow-hidden bg-[#f1f5f9]">
                <Image
                  src="/Pictures/Things only sured can give.avif"
                  alt="Surety bond specialist reviewing documents with a client"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 620px"
                />
              </div>
            </InView>
          </div>

          {/* Items 2 & 3 */}
          <div className="flex flex-col md:flex-row md:px-8">
            <div className="flex-1 flex flex-col justify-center min-h-60 border-b md:border-b-0 md:border-r border-[#f1f5f9] px-8 md:px-5 py-5">
              <InView className="flex flex-col gap-2">
                <SealIcon />
                <p className="text-[20px] leading-7.5 text-[#64748b]">
                  <span className="font-medium text-border-primary">
                    We shop the full market.
                  </span>
                  {
                    " One application goes to every carrier in our network. You get the lowest rate we can find, not the first quote that comes back."
                  }
                </p>
              </InView>
            </div>
            <div className="flex-1 flex flex-col justify-center min-h-60 px-8 md:px-5 py-5">
              <InView delay={100} className="flex flex-col gap-2">
                <SealIcon />
                <p className="text-[20px] leading-7.5 text-[#64748b]">
                  <span className="font-medium text-border-primary">
                    We answer the phone.
                  </span>
                  {
                    " Seven days a week, including weekends. When your project is waiting on a bond, you shouldn’t have to wait until Monday for a callback."
                  }
                </p>
              </InView>
            </div>
          </div>
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
      <StickySteps />
      <BondTracksSection />
      <ThreeThingsSection />
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

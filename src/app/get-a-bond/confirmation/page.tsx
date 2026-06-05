"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import FlowHeader from "@/components/flow/FlowHeader";
import { BOND_TYPES, US_STATES } from "../bondData";

// ── Icons ──────────────────────────────────────────────────────────────────────

function IconArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

// Derive a deterministic "quoted" annual premium from bond type price range.
// In production this would come from an underwriting API response.
function deriveQuote(priceMin: number, priceMax: number): number {
  // Pick a value ~40% through the range (feels like a competitive real quote)
  return Math.round((priceMin + (priceMax - priceMin) * 0.4) / 5) * 5;
}

// Derive a bond amount based on bond type (typical statutory minimums)
function deriveBondAmount(bondId: string): string {
  const amounts: Record<string, string> = {
    "license-permit": "$10,000",
    "contractor-license": "$15,000",
    "auto-dealer": "$25,000",
    "motor-vehicle": "$25,000",
    "mortgage-broker": "$50,000",
    "notary": "$10,000",
    "title-agent": "$50,000",
    "freight-broker": "$75,000",
    "money-transmitter": "$100,000",
    "collection-agency": "$25,000",
    "customs": "$50,000",
    "tax-preparer": "$5,000",
  };
  return amounts[bondId] ?? "$25,000";
}

const CARRIER = "Travellers";

// ── Page ───────────────────────────────────────────────────────────────────────

function ConfirmationContent() {
  const searchParams = useSearchParams();

  const bondTypeId = searchParams.get("type") ?? "";
  const stateAbbr = searchParams.get("state") ?? "";

  const bondType = BOND_TYPES.find((b) => b.id === bondTypeId);
  const stateName = US_STATES.find((s) => s.abbr === stateAbbr)?.name ?? stateAbbr;

  const bondLabel = bondType?.label ?? "Surety Bond";
  const bondAmount = deriveBondAmount(bondTypeId);

  const annualPremium =
    bondType?.priceMin && bondType?.priceMax
      ? deriveQuote(bondType.priceMin, bondType.priceMax)
      : 312;

  const formattedPremium = `$${annualPremium.toLocaleString()}/yr`;
  const payLabel = `Pay $${annualPremium.toLocaleString()}`;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <FlowHeader />

      <main className="flex-1 flex justify-center">
        <div className="flex-1 flex flex-col items-start max-w-[1240px] border-x border-b border-[#e2e8f0] w-full px-4 md:px-8 min-h-0">
          <div className="flex-1 flex flex-col items-center py-16 md:py-24 w-full">
            <div className="flex flex-col gap-8 items-start max-w-[640px] w-full">

              {/* Heading */}
              <div className="flex flex-col gap-2 w-full">
                <h1 className="text-[24px] font-medium text-[#334155] leading-[32px]">
                  You&rsquo;re good to go.
                </h1>
                <p className="text-base text-[#64748b] leading-[24px]">
                  Here&rsquo;s your personalised quote. Pay online and your bond is
                  issued the same day.
                </p>
              </div>

              {/* Quote card */}
              <div className="w-full border border-[#818cf8] rounded-[6px] p-5 flex flex-col gap-2">
                {/* Detail rows */}
                <div className="flex flex-col gap-0 w-full text-sm">
                  <div className="flex items-start justify-between py-1 w-full">
                    <span className="text-[#475569] font-normal">Bond Type</span>
                    <span className="text-[#334155] font-medium text-right">{bondLabel}</span>
                  </div>
                  <div className="flex items-start justify-between py-1 w-full">
                    <span className="text-[#475569] font-normal">State</span>
                    <span className="text-[#334155] font-medium">{stateName}</span>
                  </div>
                  <div className="flex items-start justify-between py-1 w-full">
                    <span className="text-[#475569] font-normal">Bond Amount</span>
                    <span className="text-[#334155] font-medium">{bondAmount}</span>
                  </div>
                  <div className="flex items-start justify-between py-1 w-full">
                    <span className="text-[#475569] font-normal">Carrier</span>
                    <span className="text-[#334155] font-medium">{CARRIER}</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-[#e2e8f0] my-1" />

                {/* Price */}
                <div className="flex flex-col gap-1">
                  <p className="text-[20px] font-semibold text-[#4338ca] leading-[30px]">
                    {formattedPremium}
                  </p>
                  <p className="text-xs text-[#64748b] leading-[18px]">
                    Your annual premium
                  </p>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-3 items-center w-full">
                <div className="flex flex-col gap-2 items-start w-full">
                  {/* Primary: Pay */}
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-1.5 bg-[#4f46e5] text-white text-base font-semibold rounded-[4px] px-4 py-2.5 border-2 border-white/12 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05),inset_0px_0px_0px_1px_rgba(0,0,0,0.18),inset_0px_-2px_0px_0px_rgba(0,0,0,0.05)] transition-opacity hover:opacity-90"
                  >
                    {payLabel}
                    <span className="opacity-60"><IconArrowRight /></span>
                  </button>

                  {/* Secondary: Call */}
                  <a
                    href="tel:+18882368589"
                    className="w-full flex items-center justify-center gap-1.5 text-base font-semibold text-[#475569] rounded-[4px] px-4 py-2.5 hover:bg-[#f8fafc] transition-colors"
                  >
                    Have a question? Call us (888) 236-8589
                    <IconArrowRight />
                  </a>
                </div>

                <p className="text-xs text-[#64748b] text-center">
                  Not happy with this rate? Call us and we&rsquo;ll see if we can do better.
                </p>
              </div>

            </div>
          </div>
        </div>
      </main>

      <div className="flex justify-center">
        <div className="max-w-[1240px] w-full border-x border-[#e2e8f0] h-20" />
      </div>
    </div>
  );
}

export default function GetABondConfirmation() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex flex-col">
        <FlowHeader />
        <main className="flex-1 flex justify-center">
          <div className="flex-1 flex flex-col items-center justify-center max-w-[1240px] border-x border-b border-[#e2e8f0] w-full" />
        </main>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}

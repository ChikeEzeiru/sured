"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import FlowHeader from "@/components/flow/FlowHeader";

// ── Icons ──────────────────────────────────────────────────────────────────────

function IconCheckCircle() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M2 8a6 6 0 1112 0A6 6 0 012 8z" stroke="white" strokeWidth="1.5" />
      <path d="M5 8l2.5 2.5 4-4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconInfo() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden className="shrink-0">
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 9v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="6.5" r="0.75" fill="currentColor" />
    </svg>
  );
}

function IconArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── What happens next bullets ──────────────────────────────────────────────────

const NEXT_STEPS = [
  "A specialist reviews your application (usually same day).",
  "We shop the carrier market for the best rate.",
  "You receive a quote with full documentation within 1–3 business days.",
  "Once approved, your bond is issued and delivered digitally.",
];

// ── Page ───────────────────────────────────────────────────────────────────────

function ConfirmationContent() {
  const searchParams = useSearchParams();

  const email = searchParams.get("email") ?? "";
  const phone = searchParams.get("phone") ?? "";

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <FlowHeader showSaveExit={false} />

      <main className="flex-1 flex justify-center">
        <div className="flex-1 flex flex-col items-start max-w-[1240px] border-x border-b border-[#e2e8f0] w-full px-4 md:px-8 min-h-0">
          <div className="flex-1 flex flex-col items-center py-16 md:py-24 w-full">
            <div className="flex flex-col gap-8 items-start max-w-[640px] w-full">

              {/* Success heading */}
              <div className="flex flex-col gap-3 w-full">
                {/* Green check icon */}
                <div className="size-8 rounded-[6px] bg-[#16a34a] border-2 border-white/12 flex items-center justify-center shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05),inset_0px_0px_0px_1px_rgba(0,0,0,0.18),inset_0px_-2px_0px_0px_rgba(0,0,0,0.05)]">
                  <IconCheckCircle />
                </div>

                <div className="flex flex-col gap-2 w-full">
                  <h1 className="text-[24px] font-medium text-[#334155] leading-[32px]">
                    Your application is with our team.
                  </h1>
                  <p className="text-base text-[#64748b] leading-[24px]">
                    A Sured specialist will review your project details and follow up by
                    tomorrow.{email || phone ? " We'll contact you" : ""}
                    {email && <> at <span className="text-[#334155]">{email}</span></>}
                    {email && phone && <> or</>}
                    {phone && <> at <span className="text-[#334155]">{phone}</span></>}
                    {(email || phone) && "."}
                  </p>
                </div>
              </div>

              {/* What happens next */}
              <div className="flex flex-col gap-1 w-full">
                {NEXT_STEPS.map((step) => (
                  <div key={step} className="flex items-start gap-2 py-1">
                    <span className="text-[#64748b] mt-0.5"><IconInfo /></span>
                    <p className="text-sm font-medium text-[#334155] leading-[20px]">{step}</p>
                  </div>
                ))}
              </div>

              {/* Call card */}
              <div className="w-full border border-[#e2e8f0] rounded-[6px] p-5 flex flex-col items-center gap-1">
                <p className="text-sm text-[#334155] leading-[20px]">Questions? Call us now</p>
                <a
                  href="tel:+18882368589"
                  className="text-[20px] font-semibold text-[#4338ca] leading-[30px] hover:underline"
                >
                  (888) 236-8589
                </a>
                <p className="text-xs text-[#64748b] leading-[18px]">Available 7 days a week</p>
              </div>

              {/* Return home */}
              <div className="w-full">
                <Link
                  href="/"
                  className="w-full flex items-center justify-center gap-1.5 bg-white text-base font-semibold text-[#334155] rounded-[4px] px-4 py-2.5 border border-[#cbd5e1] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05),inset_0px_0px_0px_1px_rgba(0,0,0,0.18),inset_0px_-2px_0px_0px_rgba(0,0,0,0.05)] hover:bg-[#f8fafc] transition-colors"
                >
                  Return to Sured.com
                  <IconArrowRight />
                </Link>
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

export default function ComplexConfirmation() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex flex-col">
        <FlowHeader showSaveExit={false} />
        <main className="flex-1 flex justify-center">
          <div className="flex-1 flex flex-col items-center justify-center max-w-[1240px] border-x border-b border-[#e2e8f0] w-full" />
        </main>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}

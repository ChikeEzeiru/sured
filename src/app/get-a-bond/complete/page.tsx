import Link from "next/link";
import FlowHeader from "@/components/flow/FlowHeader";

function IconCheckCircle() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 8l3.5 3.5L13 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconInfo() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" />
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

export default function GetABondComplete() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <FlowHeader showSaveExit={false} />

      <main className="flex-1 flex justify-center">
        <div className="flex-1 flex flex-col items-start max-w-[1240px] border-x border-b border-[#e2e8f0] w-full px-4 md:px-8 min-h-0">
          <div className="flex-1 flex flex-col items-center py-16 md:py-24 w-full">
            <div className="flex flex-col gap-8 items-start max-w-[640px] w-full">

              {/* Success icon + heading */}
              <div className="flex flex-col gap-3 w-full">
                <div className="relative size-8 rounded-[6px] bg-[#16a34a] border-2 border-white/12 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05),inset_0px_0px_0px_1px_rgba(0,0,0,0.18),inset_0px_-2px_0px_0px_rgba(0,0,0,0.05)] flex items-center justify-center shrink-0">
                  <IconCheckCircle />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <h1 className="text-[24px] font-medium text-[#334155] leading-[32px]">
                    You&rsquo;re Sured.
                  </h1>
                  <p className="text-base font-normal text-[#64748b] leading-[24px]">
                    Your bond has been issued. Check your email — your bond document is on its way.
                  </p>
                </div>
              </div>

              {/* Bond details card */}
              <div className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-[6px] p-5 flex flex-col gap-2">
                <div className="flex items-start justify-between py-1 text-sm leading-[20px]">
                  <span className="text-[#475569] font-normal">Bond number</span>
                  <span className="text-[#334155] font-medium">SRD-2025-04-8914</span>
                </div>
                <div className="flex items-start justify-between py-1 text-sm leading-[20px]">
                  <span className="text-[#475569] font-normal">Issued</span>
                  <span className="text-[#334155] font-medium">Today</span>
                </div>
                <div className="flex items-start justify-between py-1 text-sm leading-[20px]">
                  <span className="text-[#475569] font-normal">Expires</span>
                  <span className="text-[#334155] font-medium">Jun 4, 2027</span>
                </div>
              </div>

              {/* Info bullets */}
              <div className="flex flex-col gap-3 w-full">
                {[
                  "Your bond document arrives by email within minutes.",
                  "File it with whoever required the bond.",
                  "Sured will remind you 30 days before renewal.",
                ].map((text) => (
                  <div key={text} className="flex gap-2 items-start py-1">
                    <span className="shrink-0 text-[#cbd5e1] mt-px">
                      <IconInfo />
                    </span>
                    <p className="text-sm font-medium text-[#334155] leading-[20px]">{text}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link
                href="/"
                className="w-full flex items-center justify-center gap-1.5 bg-white text-[#334155] text-base font-semibold rounded-[4px] px-4 py-2.5 border border-[#cbd5e1] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05),inset_0px_0px_0px_1px_rgba(0,0,0,0.18),inset_0px_-2px_0px_0px_rgba(0,0,0,0.05)] hover:bg-[#f8fafc] transition-colors"
              >
                Return to Sured.com
                <IconArrowRight />
              </Link>

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

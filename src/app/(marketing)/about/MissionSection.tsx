const FACTS = [
  "Headquartered in Austin, Texas.",
  "Backed by Y Combinator since 2024.",
  "Licensed in all 50 states.",
  "We answer the phone on weekends.",
];

function CheckIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M4.5 10.5L8 14L15.5 6.5"
        stroke="#4f46e5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function MissionSection() {
  return (
    <section className="w-full flex flex-col items-center bg-white">
      <div className="w-full max-w-310 border-x border-b border-[#e2e8f0] py-24">
        <div className="flex flex-col md:flex-row md:gap-16 border-t border-b border-[#e2e8f0] md:pl-8">

          {/* Left: badge + heading */}
          <div className="flex flex-col gap-3 px-3 md:px-0 py-6 flex-1">
            <span className="inline-flex items-center px-2 py-0.5 bg-white border border-[#d4d4d4] rounded-sm text-sm font-medium text-[#334155] leading-5 w-fit shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
              Mission
            </span>
            <p className="text-[30px] font-medium text-[#1e293b] leading-[38px]">
              We&apos;re a surety-exclusive broker.{" "}
              <span className="font-normal text-[#64748b]">
                Not a general insurance agency that also does bonds. Not a quote
                aggregator with no expertise behind it. Every person at Sured
                specialises in surety — and we think that specialisation is the
                reason our clients come back.
              </span>
            </p>
          </div>

          {/* Right: fact rows */}
          <div className="flex flex-col border-t md:border-t-0 md:border-l border-[#e2e8f0] md:min-w-[480px] md:self-stretch">
            {FACTS.map((fact) => (
              <div
                key={fact}
                className="flex flex-1 items-center gap-2 px-3 md:pl-4 md:pr-8 py-5 border-b border-[#e2e8f0] last:border-b-0"
              >
                <CheckIcon />
                <p className="text-xl font-normal text-[#64748b] leading-[30px]">
                  {fact}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

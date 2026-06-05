// Icons
function IconCheckCircle() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 9l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconDocument() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M10 1.5H4.5A1.5 1.5 0 003 3v12a1.5 1.5 0 001.5 1.5h9A1.5 1.5 0 0015 15V6.5L10 1.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 1.5V6.5H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 10h6M6 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// Step icon by position (1-indexed, within a given total count)
const STEP_ICONS: Record<2 | 3, React.ReactNode[]> = {
  2: [<IconDocument key="d1" />, <IconDocument key="d2" />],
  3: [<IconDocument key="d1" />, <IconDocument key="d2" />, <IconDocument key="d3" />],
};

const STEP_LABELS: Record<2 | 3, string[]> = {
  2: ["Step 1", "Step 2"],
  3: ["Step 1", "Step 2", "Step 3"],
};

export default function ProgressSteps({
  count,
  current,
}: {
  count: 2 | 3;
  current: number;
}) {
  const icons = STEP_ICONS[count];
  const labels = STEP_LABELS[count];
  // Fraction of the connecting line that should be "filled" (progress indicator)
  const progressPercent = count > 1 ? ((current - 1) / (count - 1)) * 100 : 0;

  return (
    <div className="relative w-full flex items-start justify-between">
      {/* Base line */}
      <div className="absolute top-4 left-[36px] right-[36px] h-px bg-[#e2e8f0]" aria-hidden>
        {/* Filled segment */}
        <div
          className="absolute inset-y-0 left-0 bg-[#334155] transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {icons.map((icon, i) => {
        const stepNum = i + 1;
        const isDone = stepNum < current;
        const isActive = stepNum === current;
        const isFuture = stepNum > current;

        return (
          <div
            key={stepNum}
            className={`relative flex flex-col items-center gap-1.5 min-w-[40px] transition-opacity ${isFuture ? "opacity-50" : "opacity-100"}`}
          >
            <div
              className={`size-8 rounded-[8px] flex items-center justify-center bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] ${
                isActive
                  ? "border border-[rgba(0,0,0,0.1)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05),inset_0px_0px_0px_1px_rgba(0,0,0,0.18),inset_0px_-2px_0px_0px_rgba(0,0,0,0.05)] text-[#334155]"
                  : "border border-[#d4d4d4] text-[#475569]"
              }`}
            >
              {isDone ? (
                <span className="opacity-60 text-[#475569]">
                  <IconCheckCircle />
                </span>
              ) : (
                icon
              )}
            </div>
            <span className="text-xs font-medium text-[#64748b] text-center w-full">
              {labels[i]}
            </span>
          </div>
        );
      })}
    </div>
  );
}

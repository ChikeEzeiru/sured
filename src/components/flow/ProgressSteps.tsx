// Icons
function IconCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconCheckCircle() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 9l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconUser() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="9" cy="5.5" r="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M2.5 16.5c0-3.59 2.91-6.5 6.5-6.5s6.5 2.91 6.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconUsersPlus() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="11" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7.5 13.5c0-2.485 1.567-4.5 3.5-4.5s3.5 2.015 3.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="5.5" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M1 13.5c0-2.485 1.343-4.5 3-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3.5 5.75v2.5M2.25 7h2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconFileText() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M10 1.5H4.5A1.5 1.5 0 003 3v12a1.5 1.5 0 001.5 1.5h9A1.5 1.5 0 0015 15V6.5L10 1.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 1.5V6.5H15M6 9.5h6M6 12.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// Step icon by position (1-indexed, within a given total count)
const STEP_ICONS: Record<2 | 3, React.ReactNode[]> = {
  2: [<IconUser key="u" />, <IconUsersPlus key="up" />],
  3: [<IconUser key="u" />, <IconFileText key="f" />, <IconUsersPlus key="up" />],
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

"use client";

import { useState, useId, useRef, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import FlowHeader from "@/components/flow/FlowHeader";
import ProgressSteps from "@/components/flow/ProgressSteps";
import { BOND_TYPES, US_STATES } from "../../bondData";

// ── Icons ──────────────────────────────────────────────────────────────────────

function IconFolder() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M2 6.5A1.5 1.5 0 013.5 5h4l1.5 2H16.5A1.5 1.5 0 0118 8.5v7A1.5 1.5 0 0116.5 17h-13A1.5 1.5 0 012 15.5v-9z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconBuilding() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M3 17V5a2 2 0 012-2h10a2 2 0 012 2v12M3 17h14M7 17V9m6 8V9M7 9h6M7 6h.01M13 6h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconDollar() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 6v1m0 6v1M7.5 13a2.5 2.5 0 005 0c0-1.38-1.12-2-2.5-2s-2.5-.62-2.5-2a2.5 2.5 0 015 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="2.5" y="3.5" width="15" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2.5 8h15M6.5 2v3M13.5 2v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconChevronDown() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

// ── Input Field ────────────────────────────────────────────────────────────────

function InputField({
  label,
  required,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
  error,
  autoComplete,
}: {
  label: string;
  required?: boolean;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  icon: React.ReactNode;
  error?: string;
  autoComplete?: string;
}) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label htmlFor={id} className="text-sm font-medium text-[#334155] flex items-center gap-0.5">
        {label}
        {required && <span className="text-[#4338ca] font-medium ml-0.5">*</span>}
      </label>
      <div className={`flex items-center gap-2 px-3.5 py-2.5 bg-white border rounded-[8px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] transition-colors ${
        error ? "border-red-400 focus-within:border-red-500" : "border-[#cbd5e1] focus-within:border-[#4f46e5] focus-within:ring-1 focus-within:ring-[#4f46e5]/20"
      }`}>
        <span className="shrink-0 text-[#94a3b8]">{icon}</span>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          className="flex-1 text-base text-[#334155] placeholder:text-[#64748b] bg-transparent outline-none min-w-0"
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

// ── State Select ───────────────────────────────────────────────────────────────

const STATE_OPTIONS = US_STATES.map((s) => ({ value: s.abbr, label: s.name }));

function StateSelect({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedLabel = STATE_OPTIONS.find((o) => o.value === value)?.label ?? "";
  const filtered = query
    ? STATE_OPTIONS.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
    : STATE_OPTIONS;

  function openDropdown() {
    setOpen(true);
    setQuery("");
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  function select(val: string) {
    onChange(val);
    setOpen(false);
    setQuery("");
  }

  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={containerRef} className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-medium text-[#334155] flex items-center gap-0.5">
        Project State
        <span className="text-[#4338ca] font-medium ml-0.5">*</span>
      </label>
      <button
        type="button"
        onClick={openDropdown}
        className={`w-full flex items-center gap-2 px-3.5 py-2.5 bg-white border rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] hover:border-[#94a3b8] transition-colors text-left ${
          error ? "border-red-400" : "border-[#cbd5e1]"
        }`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={`flex-1 text-base truncate ${value ? "text-[#334155]" : "text-[#64748b]"}`}>
          {value ? selectedLabel : "Select state"}
        </span>
        <span className="shrink-0 text-[#64748b]"><IconChevronDown /></span>
      </button>
      {error && <p className="text-xs text-red-500">{error}</p>}

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-[#e2e8f0] rounded-[6px] shadow-[0px_8px_24px_rgba(0,0,0,0.12)] overflow-hidden">
          <div className="p-2 border-b border-[#f1f5f9]">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search states…"
              className="w-full px-3 py-1.5 text-sm text-[#334155] placeholder:text-[#94a3b8] bg-[#f8fafc] border border-[#e2e8f0] rounded-[4px] outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5]/20"
            />
          </div>
          <ul role="listbox" className="max-h-48 overflow-y-auto py-1">
            {filtered.map((opt) => (
              <button
                key={opt.value}
                role="option"
                aria-selected={opt.value === value}
                type="button"
                onClick={() => select(opt.value)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm text-left hover:bg-[#f5f3ff] transition-colors ${
                  opt.value === value ? "text-[#4f46e5] font-medium" : "text-[#334155]"
                }`}
              >
                <span>{opt.label}</span>
                {opt.value === value && <span className="text-[#4f46e5]"><IconCheck /></span>}
              </button>
            ))}
            {filtered.length === 0 && (
              <li className="px-3 py-4 text-sm text-[#94a3b8] text-center">
                No results for &ldquo;{query}&rdquo;
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

function ComplexStep2Content() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const bondTypeId = searchParams.get("type") ?? "";
  const stateAbbr = searchParams.get("state") ?? "";
  const flow = searchParams.get("flow") ?? "complex";

  const bondType = BOND_TYPES.find((b) => b.id === bondTypeId);

  const [projectName, setProjectName] = useState("");
  const [obligee, setObligee] = useState("");
  const [contractValue, setContractValue] = useState("");
  const [projectState, setProjectState] = useState(stateAbbr);
  const [startDate, setStartDate] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const errs: Record<string, string> = {};
    if (!projectName.trim()) errs.projectName = "Project name is required.";
    if (!obligee.trim()) errs.obligee = "Obligee is required.";
    if (!contractValue.trim()) errs.contractValue = "Contract value is required.";
    if (!projectState) errs.projectState = "Project state is required.";
    if (!startDate.trim()) errs.startDate = "Estimated start date is required.";
    return errs;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
    const params = new URLSearchParams({
      type: bondTypeId,
      state: projectState,
      flow,
      project: projectName,
      obligee,
      value: contractValue,
      startDate,
    });
    router.push(`/get-a-bond/complex/step-3?${params.toString()}`);
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <FlowHeader />

      <main className="flex-1 flex justify-center">
        <div className="flex-1 flex flex-col items-start max-w-[1240px] border-x border-b border-[#e2e8f0] w-full px-4 md:px-8 min-h-0">
          <div className="flex-1 flex flex-col items-center py-16 md:py-24 w-full">
            <div className="flex flex-col gap-8 items-start max-w-[640px] w-full">

              <ProgressSteps count={3} current={2} />

              {/* Heading + warning */}
              <div className="flex flex-col gap-2 w-full">
                <h1 className="text-[24px] font-medium text-[#334155] leading-[32px]">
                  Tell us about the project
                </h1>
                <div className="w-full bg-[#fefce8] border border-[#eab308] rounded-[6px] p-3">
                  <p className="text-sm text-[#a16207] leading-[20px]">
                    Performance, payment, and bid bonds require underwriting. A Sured specialist handles the full process — carrier search, financial review, documentation. Most applications are resolved within 1–3 business days.
                  </p>
                </div>
                {bondType && (
                  <p className="text-sm text-[#4f46e5] font-medium mt-1">
                    {bondType.label}{stateAbbr ? ` · ${stateAbbr}` : ""}
                  </p>
                )}
              </div>

              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 w-full">
                <InputField
                  label="Project Name or Description"
                  required
                  placeholder="e.g. Highway repair"
                  value={projectName}
                  onChange={(v) => { setProjectName(v); setErrors((e) => ({ ...e, projectName: "" })); }}
                  icon={<IconFolder />}
                  error={errors.projectName}
                />

                <InputField
                  label="Obligee (who is requiring the bond?)"
                  required
                  placeholder="e.g. City of Sacramento"
                  value={obligee}
                  onChange={(v) => { setObligee(v); setErrors((e) => ({ ...e, obligee: "" })); }}
                  icon={<IconBuilding />}
                  error={errors.obligee}
                />

                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <InputField
                    label="Contract Value ($)"
                    required
                    placeholder="e.g. 2,500,000"
                    value={contractValue}
                    onChange={(v) => { setContractValue(v); setErrors((e) => ({ ...e, contractValue: "" })); }}
                    icon={<IconDollar />}
                    error={errors.contractValue}
                    autoComplete="off"
                  />
                  <div className="relative w-full">
                    <StateSelect
                      value={projectState}
                      onChange={(v) => { setProjectState(v); setErrors((e) => ({ ...e, projectState: "" })); }}
                      error={errors.projectState}
                    />
                  </div>
                </div>

                <InputField
                  label="Estimated Start Date"
                  required
                  placeholder="e.g. July 2025"
                  value={startDate}
                  onChange={(v) => { setStartDate(v); setErrors((e) => ({ ...e, startDate: "" })); }}
                  icon={<IconCalendar />}
                  error={errors.startDate}
                  autoComplete="off"
                />

                <div className="flex flex-col gap-3 items-center w-full pt-2">
                  <button
                    type="submit"
                    disabled={submitted}
                    className="w-full flex items-center justify-center gap-1.5 bg-[#4f46e5] text-white text-base font-semibold rounded-[4px] px-4 py-2.5 border-2 border-white/12 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05),inset_0px_0px_0px_1px_rgba(0,0,0,0.18),inset_0px_-2px_0px_0px_rgba(0,0,0,0.05)] transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    Continue
                    <span className="opacity-60"><IconArrowRight /></span>
                  </button>
                </div>
              </form>

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

export default function GetABondComplexStep2() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex flex-col">
        <FlowHeader />
        <main className="flex-1 flex justify-center">
          <div className="flex-1 flex flex-col items-center justify-center max-w-[1240px] border-x border-b border-[#e2e8f0] w-full" />
        </main>
      </div>
    }>
      <ComplexStep2Content />
    </Suspense>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import FlowHeader from "@/components/flow/FlowHeader";
import ProgressSteps from "@/components/flow/ProgressSteps";
import { BOND_TYPES, US_STATES, type BondType, type BondFlow } from "./bondData";

// ── Icons ──────────────────────────────────────────────────────────────────────

function IconChevronDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

function IconCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M3.5 3.5h4l1.5 3.5-2 1.5a10 10 0 004.5 4.5l1.5-2 3.5 1.5v4a1.5 1.5 0 01-1.5 1.5C6.268 18 2 13.732 2 5A1.5 1.5 0 013.5 3.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Select Field (combobox) ────────────────────────────────────────────────────

interface SelectOption {
  value: string;
  label: string;
  group?: string;
}

function SelectField({
  label,
  value,
  placeholder,
  options,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  options: SelectOption[];
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedLabel = options.find((o) => o.value === value)?.label ?? "";

  const filtered = query
    ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
    : options;

  const groups = filtered.reduce<Record<string, SelectOption[]>>((acc, opt) => {
    const g = opt.group ?? "__none";
    if (!acc[g]) acc[g] = [];
    acc[g].push(opt);
    return acc;
  }, {});

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
      <label className="text-sm font-medium text-[#334155]">{label}</label>
      <button
        type="button"
        onClick={openDropdown}
        className="w-full flex items-center gap-2 px-3 py-2 bg-white border border-[#cbd5e1] rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] hover:border-[#94a3b8] transition-colors text-left"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={`flex-1 text-base truncate ${value ? "text-[#334155]" : "text-[#64748b]"}`}>
          {value ? selectedLabel : placeholder}
        </span>
        <span className="shrink-0 text-[#64748b]"><IconChevronDown /></span>
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-[#e2e8f0] rounded-[6px] shadow-[0px_8px_24px_rgba(0,0,0,0.12)] overflow-hidden">
          <div className="p-2 border-b border-[#f1f5f9]">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              className="w-full px-3 py-1.5 text-sm text-[#334155] placeholder:text-[#94a3b8] bg-[#f8fafc] border border-[#e2e8f0] rounded-[4px] outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5]/20"
            />
          </div>
          <ul role="listbox" className="max-h-60 overflow-y-auto py-1">
            {Object.entries(groups).map(([group, opts]) => (
              <li key={group}>
                {group !== "__none" && (
                  <p className="px-3 pt-2 pb-1 text-xs font-semibold text-[#94a3b8] uppercase tracking-wide">
                    {group}
                  </p>
                )}
                {opts.map((opt) => (
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
              </li>
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

// ── Price Estimate Callout ─────────────────────────────────────────────────────

function PriceEstimate({ bondType, stateName }: { bondType: BondType; stateName: string }) {
  if (!bondType.priceMin || !bondType.priceMax) return null;
  return (
    <div className="w-full bg-[rgba(238,242,255,0.5)] border border-[rgba(99,102,241,0.5)] rounded-[4px] p-3 flex flex-col gap-2">
      <p className="text-base font-semibold text-[#334155] leading-snug">
        Most {bondType.label}s in {stateName} cost between{" "}
        <span className="text-[#4f46e5]">${bondType.priceMin.toLocaleString()}</span>
        {" "}and{" "}
        <span className="text-[#4f46e5]">${bondType.priceMax.toLocaleString()}</span>{" "}
        per year.
      </p>
      <p className="text-sm text-[#64748b] leading-snug">
        Your exact rate depends on your credit score and bond amount. We&rsquo;ll
        show you real quotes — no commitment needed.
      </p>
    </div>
  );
}

// ── Phone Prompt ───────────────────────────────────────────────────────────────

function PhonePrompt() {
  return (
    <div className="w-full bg-[rgba(238,242,255,0.5)] border border-[rgba(99,102,241,0.5)] rounded-[4px] p-4 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-[#4f46e5]"><IconPhone /></span>
        <p className="text-base font-semibold text-[#334155]">Talk to a bond specialist</p>
      </div>
      <p className="text-sm text-[#64748b] leading-snug">
        Not sure what bond you need? Our specialists can identify the right bond
        for your situation in minutes — no obligation.
      </p>
      <a href="tel:+18882368589" className="inline-flex items-center gap-2 text-sm font-semibold text-[#4f46e5] hover:underline">
        <IconPhone />
        (888) 236-8589 — call or text, Mon–Fri 8am–6pm PT
      </a>
    </div>
  );
}

// ── Data ───────────────────────────────────────────────────────────────────────

const BOND_TYPE_OPTIONS = [
  ...BOND_TYPES.filter((b) => b.flow === "simple").map((b) => ({
    value: b.id, label: b.label, group: "License & Permit / Common Bonds",
  })),
  ...BOND_TYPES.filter((b) => b.flow === "complex").map((b) => ({
    value: b.id, label: b.label, group: "Construction & Contract Bonds",
  })),
  ...BOND_TYPES.filter((b) => b.flow === "unsure").map((b) => ({
    value: b.id, label: b.label,
  })),
];

const STATE_OPTIONS = US_STATES.map((s) => ({ value: s.abbr, label: s.name }));

// ── Page ───────────────────────────────────────────────────────────────────────

export default function GetABond() {
  const router = useRouter();
  const [bondTypeId, setBondTypeId] = useState("");
  const [stateAbbr, setStateAbbr] = useState("");

  const bondType = BOND_TYPES.find((b) => b.id === bondTypeId) ?? null;
  const flow: BondFlow | null = bondType?.flow ?? null;
  const stepCount: 2 | 3 = flow === "complex" ? 3 : 2;

  const selectedState = US_STATES.find((s) => s.abbr === stateAbbr);
  const showStateField = flow !== "unsure";
  const showPriceEstimate = bondType?.flow === "simple" && stateAbbr !== "" && bondType.priceMin !== undefined;
  const showPhonePrompt = flow === "unsure";
  const canProceed = bondTypeId !== "" && (flow === "unsure" || stateAbbr !== "");

  function handleNext() {
    if (!bondType) return;
    if (flow === "unsure") {
      router.push("/get-a-bond/not-sure");
      return;
    }
    const params = new URLSearchParams({ type: bondType.id, state: stateAbbr, flow: flow ?? "simple" });
    const nextPath = flow === "complex" ? "/get-a-bond/complex/step-2" : "/get-a-bond/step-2";
    router.push(`${nextPath}?${params.toString()}`);
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <FlowHeader />

      <main className="flex-1 flex justify-center">
        <div className="flex-1 flex flex-col items-start max-w-[1240px] border-x border-b border-[#e2e8f0] w-full px-4 md:px-8 min-h-0">
          <div className="flex-1 flex flex-col items-center py-16 md:py-24 w-full">
            <div className="flex flex-col gap-8 items-start max-w-[640px] w-full">

              <ProgressSteps count={stepCount} current={1} />

              <div className="flex flex-col gap-2 w-full">
                <h1 className="text-2xl md:text-[24px] font-medium text-[#334155] leading-[32px]">
                  What Bond do you need?
                </h1>
                <p className="text-base text-[#64748b] leading-[24px]">
                  Select your bond type and state. We&rsquo;ll show you what most
                  applicants pay before we ask for anything else.
                </p>
              </div>

              <div className="flex flex-col gap-4 w-full">
                <div className="relative">
                  <SelectField
                    label="Bond Type"
                    value={bondTypeId}
                    placeholder="e.g. License and Permit Bond"
                    options={BOND_TYPE_OPTIONS}
                    onChange={setBondTypeId}
                  />
                </div>
                {showStateField && (
                  <div className="relative">
                    <SelectField
                      label="State"
                      value={stateAbbr}
                      placeholder="e.g. California"
                      options={STATE_OPTIONS}
                      onChange={setStateAbbr}
                    />
                  </div>
                )}
              </div>

              {showPhonePrompt && <PhonePrompt />}
              {showPriceEstimate && bondType && selectedState && (
                <PriceEstimate bondType={bondType} stateName={selectedState.name} />
              )}

              {!showPhonePrompt && (
                <div className="flex flex-col gap-3 items-center w-full">
                  <button
                    onClick={handleNext}
                    disabled={!canProceed}
                    className="w-full flex items-center justify-center gap-1.5 bg-[#4f46e5] text-white text-base font-semibold rounded-[4px] px-4 py-2.5 border-2 border-white/12 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05),inset_0px_0px_0px_1px_rgba(0,0,0,0.18),inset_0px_-2px_0px_0px_rgba(0,0,0,0.05)] transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Next
                    <span className="opacity-60"><IconArrowRight /></span>
                  </button>
                  <p className="text-xs text-[#64748b] text-center">
                    Takes about 2 minutes. Soft credit pull only — no impact on your score.
                  </p>
                </div>
              )}

              {showPhonePrompt && (
                <button
                  onClick={() => setBondTypeId("")}
                  className="w-full flex items-center justify-center gap-1.5 bg-white text-[#334155] text-base font-semibold rounded-[4px] px-4 py-2.5 border border-[#cbd5e1] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-colors hover:bg-[#f8fafc]"
                >
                  ← Go back
                </button>
              )}

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

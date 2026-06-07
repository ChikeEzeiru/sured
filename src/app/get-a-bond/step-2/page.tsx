"use client";

import { useState, useId, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import FlowHeader from "@/components/flow/FlowHeader";
import ProgressSteps from "@/components/flow/ProgressSteps";
import { BOND_TYPES } from "../bondData";

// ── Icons ──────────────────────────────────────────────────────────────────────

function IconUserCircle() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4.5 16.5a5.5 5.5 0 0111 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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

function IconMail() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="2.5" y="4.5" width="15" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2.5 7l7.5 5 7.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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
  optional,
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
  optional?: boolean;
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
        {optional && <span className="text-[#64748b] font-normal ml-1">(optional)</span>}
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

// ── Page ───────────────────────────────────────────────────────────────────────

function Step2Content() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const bondTypeId = searchParams.get("type") ?? "";
  const stateAbbr = searchParams.get("state") ?? "";
  const flow = searchParams.get("flow") ?? "simple";

  const bondType = BOND_TYPES.find((b) => b.id === bondTypeId);
  const stepCount: 2 | 3 = flow === "complex" ? 3 : 2;

  // Form state
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consentChecked, setConsentChecked] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = "Full legal name is required.";
    if (!email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Enter a valid email address.";
    if (!phone.trim()) errs.phone = "Phone number is required.";
    if (!consentChecked) errs.consent = "Please confirm consent to continue.";
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
    // Navigate to confirmation — pass data via search params for now
    const params = new URLSearchParams({
      type: bondTypeId,
      state: stateAbbr,
      flow,
      name: fullName,
      email,
      phone,
    });
    router.push(`/get-a-bond/confirmation?${params.toString()}`);
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <FlowHeader />

      <main className="flex-1 flex justify-center">
        <div className="flex-1 flex flex-col items-start max-w-[1240px] border-x border-b border-[#e2e8f0] w-full px-4 md:px-8 min-h-0">
          <div className="flex-1 flex flex-col items-center py-16 md:py-24 w-full">
            <div className="flex flex-col gap-8 items-start max-w-[640px] w-full">

              <ProgressSteps count={stepCount} current={2} />

              <div className="flex flex-col gap-2 w-full">
                <h1 className="text-2xl md:text-[24px] font-medium text-[#334155] leading-[32px]">
                  Tell us about yourself
                </h1>
                <p className="text-base text-[#64748b] leading-[24px]">
                  We need a few details to pull your exact rate. This is a soft
                  credit check and won&rsquo;t affect your score.
                </p>
                {bondType && (
                  <p className="text-sm text-[#4f46e5] font-medium mt-1">
                    {bondType.label}{stateAbbr ? ` · ${stateAbbr}` : ""}
                  </p>
                )}
              </div>

              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 w-full">
                <InputField
                  label="Full Legal Name"
                  required
                  placeholder="e.g. Jane Smith"
                  value={fullName}
                  onChange={(v) => { setFullName(v); setErrors((e) => ({ ...e, fullName: "" })); }}
                  icon={<IconUserCircle />}
                  error={errors.fullName}
                  autoComplete="name"
                />

                <InputField
                  label="Business Name"
                  optional
                  placeholder="Leave blank if sole trader"
                  value={businessName}
                  onChange={setBusinessName}
                  icon={<IconBuilding />}
                  autoComplete="organization"
                />

                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <InputField
                    label="Email"
                    required
                    type="email"
                    placeholder="e.g. you@company.com"
                    value={email}
                    onChange={(v) => { setEmail(v); setErrors((e) => ({ ...e, email: "" })); }}
                    icon={<IconMail />}
                    error={errors.email}
                    autoComplete="email"
                  />
                  <InputField
                    label="Phone"
                    required
                    type="tel"
                    placeholder="(555) 000-0000"
                    value={phone}
                    onChange={(v) => {
                      const digits = v.replace(/\D/g, "").slice(0, 10);
                      let formatted = digits;
                      if (digits.length > 6) formatted = `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`;
                      else if (digits.length > 3) formatted = `(${digits.slice(0,3)}) ${digits.slice(3)}`;
                      else if (digits.length > 0) formatted = `(${digits}`;
                      setPhone(formatted);
                      setErrors((e) => ({ ...e, phone: "" }));
                    }}
                    icon={<IconPhone />}
                    error={errors.phone}
                    autoComplete="tel"
                  />
                </div>

                {/* Consent checkbox */}
                <div className="flex items-start gap-2">
                  <div className="pt-0.5 shrink-0">
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={consentChecked}
                      onClick={() => { setConsentChecked((v) => !v); setErrors((e) => ({ ...e, consent: "" })); }}
                      className={`size-4 rounded-[4px] border flex items-center justify-center transition-colors ${
                        consentChecked
                          ? "bg-[#4f46e5] border-[#4f46e5]"
                          : errors.consent
                          ? "border-red-400"
                          : "border-[#cbd5e1]"
                      }`}
                    >
                      {consentChecked && (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                          <path d="M1.5 5l2.5 2.5 4.5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                  </div>
                  <div>
                    <p className="text-sm text-[#475569] leading-[20px]">
                      Check my rate with a soft pull — this has no impact on my
                      credit score and I&rsquo;m not committing to purchase.
                    </p>
                    {errors.consent && (
                      <p className="text-xs text-red-500 mt-1">{errors.consent}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-3 items-center w-full pt-2">
                  <button
                    type="submit"
                    disabled={submitted}
                    className="w-full flex items-center justify-center gap-1.5 bg-[#4f46e5] text-white text-base font-semibold rounded-[4px] px-4 py-2.5 border-2 border-white/12 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05),inset_0px_0px_0px_1px_rgba(0,0,0,0.18),inset_0px_-2px_0px_0px_rgba(0,0,0,0.05)] transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    Check My Rate
                    <span className="opacity-60"><IconArrowRight /></span>
                  </button>
                  <p className="text-xs text-[#64748b] text-center">
                    Your information is encrypted and never sold.
                  </p>
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

export default function GetABondStep2() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex flex-col">
        <FlowHeader />
        <main className="flex-1 flex justify-center">
          <div className="flex-1 flex flex-col items-center justify-center max-w-[1240px] border-x border-b border-[#e2e8f0] w-full" />
        </main>
      </div>
    }>
      <Step2Content />
    </Suspense>
  );
}

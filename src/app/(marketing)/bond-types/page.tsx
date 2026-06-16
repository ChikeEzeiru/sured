import Link from "next/link";
import BondTypesCta from "./BondTypesCta";

// ── Types ─────────────────────────────────────────────────────────────────────

type BondFaq = { label: string; value: string };

type BondType = {
  number: number;
  title: string;
  subtitle: string;
  cta: { label: string; href: string; variant: "solid" | "link" };
  faqs: [BondFaq, BondFaq, BondFaq];
};

// ── Data ──────────────────────────────────────────────────────────────────────

const BOND_TYPES: BondType[] = [
  {
    number: 1,
    title: "License and permit bonds.",
    subtitle:
      "For contractors, auto dealers, freight brokers, mortgage brokers, notaries, etc",
    cta: { label: "Get Sured", href: "/get-a-bond", variant: "solid" },
    faqs: [
      {
        label: "What it is",
        value:
          "A bond required by a government authority before you can legally operate. Most contractor and professional licences require one.",
      },
      { label: "Typical cost", value: "$100 – $500 / year" },
      { label: "What to expect", value: "Instant quote / same day issuance" },
    ],
  },
  {
    number: 2,
    title: "Contract Bonds.",
    subtitle:
      "For construction companies, general contractors, subcontractors, etc.",
    cta: {
      label: "Start my application",
      href: "/get-a-bond",
      variant: "solid",
    },
    faqs: [
      {
        label: "What it is",
        value:
          "Guarantees you will complete a contract as agreed. Required on most public works projects and many private construction contracts. Includes performance, payment, and bid bonds.",
      },
      { label: "Typical cost", value: "1% – 3% of contract value" },
      {
        label: "What to expect",
        value:
          "Requires underwriting. A Sured specialist handles the process, which takes 1–3 business days",
      },
    ],
  },
  {
    number: 3,
    title: "Commercial bonds.",
    subtitle:
      "For freight brokers, auto dealers, money transmitters, collection agencies etc",
    cta: { label: "Get Sured", href: "/get-a-bond", variant: "solid" },
    faqs: [
      {
        label: "What it is",
        value:
          "Bonds required for specific federal business licences and registrations. Different from contractor licence bonds in scope and regulating authority.",
      },
      { label: "Typical cost", value: "$1,000 – $3,000 / year" },
      {
        label: "What to expect",
        value: "Instant quote / same day issuance for most types",
      },
    ],
  },
  {
    number: 4,
    title: "Court bonds.",
    subtitle:
      "Appeal bonds, guardianship, estate admin, judicial proceedings etc",
    cta: {
      label: "Call (888) 236-8589",
      href: "tel:+18882368589",
      variant: "link",
    },
    faqs: [
      {
        label: "What it is",
        value:
          "Bonds required by a court as a condition of a legal proceeding. Requirements vary significantly by state and case type.",
      },
      { label: "Typical cost", value: "Set by the court" },
      {
        label: "What to expect",
        value:
          "Court bonds have specific requirements around format, carrier, and filing. Our specialists handle the research.",
      },
    ],
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M4 10h12M12 6l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FaqRow({ label, value }: BondFaq) {
  return (
    <div className="flex flex-col border-b border-[#e2e8f0] last:border-b-0">
      <div className="px-6 py-4 md:pl-6 md:pr-8">
        <p className="text-xl font-medium text-border-primary leading-7.5">
          {label}
        </p>
      </div>
      <div className="px-6 pb-4 md:pl-6 md:pr-8">
        <p className="text-xl font-normal text-[#64748b] leading-7.5">
          {value}
        </p>
      </div>
    </div>
  );
}

function SectionHeader({ bond }: { bond: BondType }) {
  return (
    <div className="flex flex-col gap-6 py-6 max-w-120 shrink-0">
      <div className="flex flex-col gap-2">
        <span className="inline-flex items-center px-1.5 py-0.5 bg-[#fafafa] border border-[#e5e5e5] rounded-xs text-[12px] font-medium text-border-primary leading-4.5 w-fit">
          {bond.number}.
        </span>
        <p className="text-display-sm font-medium text-[#1e293b] leading-display-sm">
          {bond.title}{" "}
          <span className="font-normal text-[#64748b]">{bond.subtitle}</span>
        </p>
      </div>

      {bond.cta.variant === "solid" ? (
        <Link
          href={bond.cta.href}
          className="inline-flex items-center gap-1 self-start px-3.5 py-2.5 bg-white border border-text-secondary rounded-sm text-sm font-semibold text-border-primary leading-5 shadow-[0px_4px_8px_-1px_rgba(15,23,42,0.08),0px_3px_6px_-2px_rgba(15,23,42,0.04)] hover:bg-text-primary transition-colors"
        >
          {bond.cta.label}
          <ArrowRight className="shrink-0" />
        </Link>
      ) : (
        <Link
          href={bond.cta.href}
          className="inline-flex items-center gap-1 self-start py-2.5 text-sm font-semibold text-[#4338ca] leading-5 hover:underline"
        >
          {bond.cta.label}
          <ArrowRight className="shrink-0" />
        </Link>
      )}
    </div>
  );
}

function BondSection({
  bond,
  flip,
  bg,
}: {
  bond: BondType;
  flip: boolean;
  bg: "white" | "secondary";
}) {
  return (
    <section
      className={`w-full flex flex-col items-center ${
        bg === "secondary" ? "bg-text-primary" : "bg-white"
      }`}
    >
      <div className="w-full max-w-310 border-x border-[#e2e8f0] py-24">
        {/* Desktop: two-column layout; Mobile: stacked */}
        <div
          className={`flex flex-col md:flex-row md:items-start md:gap-16 border-t border-b border-[#e2e8f0] ${
            flip ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Section header */}
          <div
            className={`flex-1 px-8 border-b md:border-b-0 ${
              flip ? "md:pr-8 md:pl-0" : "md:pl-8 md:pr-0"
            }`}
          >
            <SectionHeader bond={bond} />
          </div>

          {/* FAQs */}
          <div
            className={`flex-1 flex flex-col border-[#e2e8f0] ${
              flip ? "md:border-r" : "md:border-l"
            }`}
          >
            {bond.faqs.map((faq) => (
              <FaqRow key={faq.label} {...faq} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BondTypesPage() {
  return (
    <>
      {/* Hero */}
      <section className="w-full flex flex-col items-center bg-bg-primary">
        <div className="w-full max-w-310 border-x border-b border-border-secondary px-3 md:px-8 py-16 md:py-24">
          <p className="text-display-sm font-medium text-text-primary leading-display-sm tracking-[-0.02em]">
            <span className="font-semibold">Find your bond type.</span>{" "}
            <span className="font-medium text-text-muted">
              Select your category below. If you&apos;re not sure which one
              applies, call us at (888) 236-8589, and we&apos;ll point you in
              the right direction.
            </span>
          </p>
        </div>
      </section>

      {/* Bond type sections */}
      {BOND_TYPES.map((bond, i) => (
        <BondSection
          key={bond.number}
          bond={bond}
          flip={i % 2 !== 0}
          bg={i % 2 === 0 ? "white" : "secondary"}
        />
      ))}

      {/* CTA — "Not sure which applies?" */}
      <BondTypesCta />
    </>
  );
}

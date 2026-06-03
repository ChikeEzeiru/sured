import Image from "next/image";
import InView from "@/components/InView";

const benefits = [
  {
    title: "Same-day bonds for most types.",
    body: "Licence bonds, permit bonds, title bonds, and most commercial bonds are issued the same day you apply. Fill out the form, pay online, receive your bond.",
    padClass: "pr-5 py-5",
  },
  {
    title: "Specialist expertise for complex bonds.",
    body: "Performance bonds, payment bonds, & bid bonds require underwriting. Our specialists handle it, while you get the best rate we find.",
    padClass: "px-5 py-5",
  },
  {
    title: "We are licensed in all 50 states.",
    body: "One agency. Every state. Whether you are bonded in California or moving a project to Hawaii, we will handle it without you starting over.",
    padClass: "pl-5 py-5",
  },
];

export default function BenefitsSection() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[1240px] border-x border-b border-[#f1f5f9] pt-24 flex flex-col">

        {/* ── Heading ── */}
        <InView className="px-8 pb-16">
          <p className="text-[30px] font-medium leading-[38px] max-w-[856px]">
            <span className="text-[#1e293b]">
              Whatever bond you need, we&apos;ve placed it before.{" "}
            </span>
            <span className="font-normal text-[#64748b]">
              We&apos;re not a quote engine — we&apos;re a licensed surety agency
              with in-depth knowledge of the market. We review, shop our
              carriers, and issue your bond, same day. For complex bonds, we
              handle the underwriting for you.
            </span>
          </p>
        </InView>

        {/* ── Benefit cards ── */}
        <div className="border-t border-[#f1f5f9] flex flex-col md:flex-row min-h-[304px] px-8">
          {benefits.map((benefit, i) => (
            <div key={benefit.title} className="contents">
              {/* Vertical divider on desktop, horizontal on mobile */}
              {i > 0 && (
                <div className="h-px w-full bg-[#f1f5f9] md:h-auto md:w-px md:self-stretch" />
              )}

              <InView
                className={`flex flex-1 flex-col justify-center gap-2 ${benefit.padClass}`}
                delay={i * 100}
              >
                <Image
                  src="/icons/sured-icon.svg"
                  alt=""
                  width={16}
                  height={20}
                />
                <p className="text-[20px] leading-[30px]">
                  <span className="font-semibold text-[#334155]">
                    {benefit.title}
                  </span>
                  <span className="font-normal text-[#64748b]">
                    {" "}{benefit.body}
                  </span>
                </p>
              </InView>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

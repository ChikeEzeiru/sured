import AboutHeroShader from "@/components/AboutHeroShader";
import CtaSection from "@/components/CtaSection";
import MissionSection from "./MissionSection";
import TeamSection from "./TeamSection";
import ValuesSection from "./ValuesSection";

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="w-full flex flex-col justify-center items-center bg-white">
        <div className="relative overflow-hidden justify-center items-center w-full max-w-310 border-x border-[#e2e8f0] px-3 md:px-8 py-32 md:py-48 flex flex-col gap-6">
          <AboutHeroShader />

          <div className="relative z-10 flex flex-col gap-4 md:gap-6 max-w-3xl justify-center items-center text-center">
            <span className="relative text-[14px] bg-white font-medium leading-[20px] text-border-primary border border-[#e2e8f0] rounded-xs px-3 py-1.5 w-fit">
              About Us
            </span>

            <h2 className="relative text-display-md font-medium text-bg-secondary leading-display-md tracking-[-0.02em] text-balance">
              We started Sured because getting bonded was harder than it should
              be.
            </h2>

            <p className="relative text-xl font-medium text-balance text-bg-secondary leading-normal tracking-[-0.02em]">
              <span className="font-normal text-text-disabled text-balance">
                We are a modern surety bond agency built for speed,
                transparency, and real specialists who actually pick up the
                phone.
              </span>
            </p>
          </div>
        </div>
      </section>

      <MissionSection />

      <TeamSection />

      <ValuesSection />

      <CtaSection
        heading="We'd rather show you than tell you."
        subtitle="Get Sured and see what working with a specialist actually feels like."
        primaryLabel="Get Sured"
        disclaimer="7 days a week"
      />
    </>
  );
}

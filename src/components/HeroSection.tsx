import Image from "next/image";
import SuredCertificate from "./SuredCertificate";

const carriers: {
  name: string;
  logo: string;
  width: number;
  height: number;
}[] = [
  {
    name: "The Hartford",
    logo: "/Logos/Logo.svg.svg",
    width: 104,
    height: 20,
  },
  {
    name: "Markel",
    logo: "/Logos/markel_insurance_logo.svg.svg",
    width: 40,
    height: 40,
  },
  {
    name: "Liberty Mutual",
    logo: "/Logos/liberty_mutual_logo.svg.svg",
    width: 104,
    height: 26,
  },
  {
    name: "Travelers",
    logo: "/Logos/travelers_icon.png [Vectorized].svg",
    width: 40,
    height: 40,
  },
  {
    name: "Nationwide",
    logo: "/Logos/nationwide_insurance_logo.svg.svg",
    width: 104,
    height: 41,
  },
  {
    name: "Crum & Forster",
    logo: "/Logos/crum__forster_logo.svg.svg",
    width: 35,
    height: 40,
  },
  { name: "Chubb", logo: "/Logos/chubb_logo.svg.svg", width: 108, height: 11 },
  {
    name: "AM Best",
    logo: "/Logos/amblogo_since_white 1.svg",
    width: 92,
    height: 27,
  },
];

export default function HeroSection() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative w-full bg-bg-primary overflow-hidden">
        <div className="relative mx-auto max-w-310 border-x border-border-secondary">
          <div className="flex flex-col-reverse md:flex-row items-center gap-12 px-8 py-16 md:py-24">
            {/* Left — content */}
            <div className="flex flex-col gap-10 md:gap-16 flex-1 min-w-0">
              <h1
                className="anim-fade-up font-medium tracking-display"
                style={{
                  fontSize:
                    "clamp(var(--text-display-sm), 4vw, var(--text-display-md))",
                  lineHeight: "1.2",
                  animationDelay: "80ms",
                }}
              >
                <span className="text-text-primary">
                  Same day surety bonds, expertise included.{" "}
                </span>
                <span className="text-text-muted">
                  We shop every major carrier for the best rates &amp; issue
                  most bonds the day you apply.
                </span>
              </h1>

              <div className="flex flex-col gap-3">
                {/* CTAs */}
                <div
                  className="anim-fade-up flex flex-col sm:flex-row gap-3"
                  style={{ animationDelay: "240ms" }}
                >
                  <a
                    href="#"
                    className="flex items-center justify-center gap-2 bg-brand border-2 border-brand-subtle text-text-primary font-semibold rounded-sm px-4.5 py-3 text-md transition-opacity hover:opacity-90 w-full sm:w-auto"
                    style={{ boxShadow: "var(--shadow-brand)" }}
                  >
                    Get a Quote
                    <span className="opacity-60">→</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center gap-2 bg-bg-primary border border-border-primary text-text-secondary font-semibold rounded-sm px-4.5 py-3 text-md transition-colors hover:border-text-disabled w-full sm:w-auto"
                  >
                    Talk to a Specialist
                  </a>
                </div>

                {/* Trust signals */}
                <div
                  className="anim-fade-up flex items-center gap-2 flex-wrap"
                  style={{ animationDelay: "360ms" }}
                >
                  <span className="text-sm text-text-muted">
                    4500+ companies bonded
                  </span>
                  <span className="text-border-primary">•</span>
                  <span className="flex flex-row gap-2 text-sm text-text-muted">
                    <Image
                      alt=""
                      src="/Logos/Google Symbol.svg.svg"
                      width={16}
                      height={16}
                    />{" "}
                    5★
                  </span>
                  <span className="text-border-primary">•</span>
                  <span className="flex flex-row gap-2 text-sm text-text-muted">
                    <Image
                      alt=""
                      src="/Logos/trustpilot_symbol.svg.svg"
                      width={16}
                      height={16}
                    />{" "}
                    4.8
                  </span>
                </div>
              </div>
            </div>

            {/* Right — certificate animation */}
            <div
              className="anim-fade-right w-full md:w-108.25 md:shrink-0 overflow-hidden"
              style={{ animationDelay: "160ms" }}
            >
              <SuredCertificate className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust / Carrier logos ──────────────────────────── */}
      <section className="w-full bg-bg-primary">
        <div className="mx-auto max-w-310 border-x border-t border-border-secondary px-8 py-12 md:py-16">
          <div className="flex flex-col gap-8">
            <p
              className="anim-fade-up text-lg text-text-secondary"
              style={{ animationDelay: "480ms" }}
            >
              Bonds written with the most trusted carriers in the industry
            </p>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
              {carriers.map((carrier, i) => (
                <div
                  key={carrier.name}
                  className="anim-fade-up flex items-center justify-center min-h-20 md:min-h-25 rounded-sm border border-surface-border bg-surface px-3"
                  style={{ animationDelay: `${560 + i * 40}ms` }}
                >
                  <Image
                    src={carrier.logo}
                    alt={carrier.name}
                    width={carrier.width}
                    height={carrier.height}
                    className="max-w-full h-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

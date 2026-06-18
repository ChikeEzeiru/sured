import Image from "next/image";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact | Sured",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="w-full flex flex-col items-center bg-bg-primary">
        <div className="relative w-full max-w-310 border-x border-b border-border-secondary overflow-hidden px-3 md:px-8 pt-24 pb-8 flex flex-col gap-6 items-center justify-center min-h-100">
          {/* Background watermark */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 w-100 h-123.75 pointer-events-none"
            aria-hidden
          >
            <Image
              src="/icons/Sured Vector.svg"
              alt=""
              fill
              className="object-contain"
            />
          </div>

          <div className="relative z-10 flex flex-col gap-3 items-center max-w-180 text-center">
            <h1 className="text-display-md font-medium text-text-primary leading-display-md tracking-[-0.02em]">
              Talk to us
            </h1>
            <p className="text-xl font-normal text-text-muted leading-7.5 text-balance">
              Whether you need a quote, have a question about your bond, or want
              to know if we can help with your situation, we&apos;re always
              available.
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="w-full flex flex-col items-center bg-white">
        <div className="w-full max-w-310 border-x border-b border-[#e2e8f0] py-24">
          <div className="flex flex-col md:flex-row border-t border-b border-[#e2e8f0] md:gap-16">
            {/* Left: contact info */}
            <div className="flex flex-col md:min-w-120 border-b md:border-b-0 md:border-r border-[#e2e8f0] md:self-stretch">
              {/* Phone */}
              <div className="flex flex-col gap-3 pl-3 md:pl-8 pr-3 md:pr-4 pt-6 pb-8 border-b border-[#e2e8f0]">
                <p className="text-display-md font-medium text-border-primary leading-display-sm tracking-[-0.02em]">
                  (555) 123-4567
                </p>
                <p className="text-lg font-normal text-[#64748b] leading-7.5">
                  Available 7 days a week, including weekends.
                </p>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2 pl-3 md:pl-8 pr-3 md:pr-4 py-4 border-b border-[#e2e8f0]">
                <p className="text-sm font-semibold text-text-muted leading-5 tracking-widest uppercase">
                  Email
                </p>
                <a
                  href="mailto:hello@sured.com"
                  className="text-lg font-normal text-[#64748b] leading-7.5 underline hover:text-border-primary transition-colors"
                >
                  hello@sured.com
                </a>
              </div>

              {/* Office */}
              <div className="flex flex-col gap-2 pl-3 md:pl-8 pr-3 md:pr-4 py-4 border-b border-[#e2e8f0]">
                <p className="text-sm font-semibold text-text-muted leading-5 tracking-widest uppercase">
                  Office
                </p>
                <p className="text-lg font-normal text-[#64748b] leading-7.5">
                  Austin, Texas
                </p>
              </div>

              {/* Info box */}
              <div className="pl-3 md:pl-8 pr-3 md:pr-4 py-4">
                <div className="flex gap-3 items-start px-5 py-7 bg-[#eef2ff] border border-[#818cf8] rounded-sm">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden
                    className="shrink-0 mt-1"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 3.5a1 1 0 110 2 1 1 0 010-2zm-1 4a1 1 0 012 0v4a1 1 0 01-2 0V9.5z"
                      fill="#818cf8"
                    />
                  </svg>
                  <p className="text-xl font-normal text-[#64748b] leading-7.5">
                    Phone calls answered live during business hours.
                    <br />
                    Emails responded to within 4 hours on business days.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: contact form */}
            <div className="flex-1 flex flex-col gap-5 px-3 md:px-0 py-6 md:pr-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

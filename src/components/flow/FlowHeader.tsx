import Image from "next/image";
import Link from "next/link";

export default function FlowHeader() {
  return (
    <header className="w-full flex items-center justify-center h-[68px] bg-white sticky top-0 z-40">
      <div className="flex flex-1 h-full items-center justify-between max-w-[1240px] border-x border-b border-[#e2e8f0] px-4 md:px-8">
        <Link href="/" className="relative h-6 w-[87px] shrink-0">
          <Image
            src="/Logos/Sured Logo Asset Light.svg"
            alt="Sured"
            fill
            className="object-contain object-left"
          />
        </Link>

        <div className="flex items-center gap-4 h-full py-2">
          <a
            href="tel:+18882368589"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-[#334155] hover:text-[#4f46e5] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M7.5 7.5a2.5 2.5 0 015 .833c0 1.667-2.5 2.083-2.5 3.334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="10" cy="14.5" r="0.75" fill="currentColor" />
            </svg>
            Need Help?
          </a>
          <Link
            href="/"
            className="flex items-center gap-1 text-sm font-semibold text-[#334155] border border-[#cbd5e1] rounded-[4px] px-2.5 py-1.5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] hover:bg-[#f8fafc] transition-colors"
          >
            Save &amp; exit
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}

import Image from "next/image";
import Link from "next/link";

const bondLinks = [
  { label: "Contractor Bond", href: "#" },
  { label: "Auto Dealer Bond", href: "#" },
  { label: "Freight Broker Bond", href: "#" },
  { label: "Performance Bond", href: "#" },
  { label: "Bonded Title", href: "#" },
];

const resourceLinks = [
  { label: "Learning Center", href: "#" },
  { label: "FAQ", href: "#" },
  { label: "How to Get a Bond", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Bonds by State", href: "#" },
];

const contactItems = [
  { label: "(888) 236-8589", href: "tel:+18882368589" },
  { label: "support@sured.com", href: "mailto:support@sured.com" },
  { label: "Mon–Sat, 8am–8pm ET", href: null },
];

const stateColumns = [
  ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia"],
  ["Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland"],
  ["Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey"],
  ["New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina"],
  ["South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"],
];

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-label="LinkedIn">
      <rect width="20" height="20" rx="3" fill="currentColor" fillOpacity="0.15" />
      <path d="M6.5 8.5H5v6h1.5v-6zm-.75-2.5a.875.875 0 1 0 0 1.75A.875.875 0 0 0 5.75 6zm9.25 5.5c0-1.93-.418-3-2.25-3-.918 0-1.534.503-1.75.982V8.5H9.5v6H11v-3.284c0-.863.164-1.716 1.25-1.716 1.07 0 1.25 1.012 1.25 1.774V14.5H15v-3z" fill="currentColor" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-label="X">
      <path d="M15.18 3h2.546l-5.563 6.36L18.667 17h-5.122l-4.01-5.244L4.818 17H2.27l5.95-6.802L2 3h5.252l3.627 4.798L15.18 3zm-.893 12.583h1.41L5.772 4.445H4.26l10.027 11.138z" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-label="Facebook">
      <path d="M10 1.875a8.125 8.125 0 1 0 0 16.25A8.125 8.125 0 0 0 10 1.875zm2.031 4.688h-1.218c-.46 0-.563.218-.563.537v.862h1.781l-.232 1.851H10.25v5.312H8.344V9.813H7.187V7.962h1.157V7c0-1.525.921-2.354 2.28-2.354.648 0 1.407.05 1.407.05v1.867z" fill="currentColor" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-label="Instagram">
      <path d="M10 2c-2.173 0-2.444.01-3.297.048-.852.04-1.433.174-1.942.371a3.92 3.92 0 0 0-1.417.923 3.921 3.921 0 0 0-.923 1.417c-.197.509-.332 1.09-.371 1.942C2.01 7.556 2 7.827 2 10s.01 2.444.048 3.297c.04.852.174 1.433.371 1.942.205.524.478.968.923 1.417.449.445.893.718 1.417.923.509.197 1.09.332 1.942.371C7.556 17.99 7.827 18 10 18s2.444-.01 3.297-.048c.852-.04 1.433-.174 1.942-.371a3.921 3.921 0 0 0 1.417-.923c.445-.449.718-.893.923-1.417.197-.509.332-1.09.371-1.942C17.99 12.444 18 12.173 18 10s-.01-2.444-.048-3.297c-.04-.852-.174-1.433-.371-1.942a3.921 3.921 0 0 0-.923-1.417 3.92 3.92 0 0 0-1.417-.923c-.509-.197-1.09-.332-1.942-.371C12.444 2.01 12.173 2 10 2zm0 1.441c2.136 0 2.389.008 3.233.046.78.036 1.203.166 1.485.276.373.145.64.318.92.598.28.28.453.547.598.92.11.282.24.706.276 1.485.038.844.046 1.097.046 3.234 0 2.136-.008 2.389-.046 3.233-.036.78-.166 1.203-.276 1.485a2.48 2.48 0 0 1-.598.92 2.48 2.48 0 0 1-.92.598c-.282.11-.706.24-1.485.276-.844.038-1.097.046-3.233.046-2.137 0-2.39-.008-3.234-.046-.78-.036-1.203-.166-1.485-.276a2.479 2.479 0 0 1-.92-.598 2.479 2.479 0 0 1-.598-.92c-.11-.282-.24-.706-.276-1.485C3.449 12.389 3.44 12.136 3.44 10c0-2.137.008-2.39.046-3.234.036-.78.166-1.203.276-1.485.145-.373.318-.64.598-.92.28-.28.547-.453.92-.598.282-.11.706-.24 1.485-.276C7.61 3.449 7.863 3.44 10 3.44zm0 2.451a4.11 4.11 0 1 0 0 8.218 4.11 4.11 0 0 0 0-8.218zm0 6.777a2.667 2.667 0 1 1 0-5.334 2.667 2.667 0 0 1 0 5.334zm5.23-6.937a.96.96 0 1 1-1.92 0 .96.96 0 0 1 1.92 0z" fill="currentColor" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="w-full flex flex-col items-center bg-bg-primary">
      <div className="flex flex-col items-start w-full max-w-310 border-x border-border-secondary pt-12 md:pt-16">

        {/* Top: Brand + Nav columns */}
        <div className="w-full border-y border-border-secondary px-3 md:px-8 py-8 md:py-12">
          <div className="flex flex-col md:flex-row gap-12 md:gap-6 items-start">

            {/* Brand */}
            <div className="flex flex-col gap-6 w-full md:max-w-[456px] md:flex-[1_0_0]">
              <div className="flex flex-col gap-3">
                <Link href="/" className="relative h-6 w-[87px] md:h-7 md:w-[101px] shrink-0">
                  <Image
                    src="/Logos/Sured Logo Asset.svg"
                    alt="Sured"
                    fill
                    className="object-contain object-left"
                  />
                </Link>
                <p className="text-md md:text-lg leading-md md:leading-lg font-medium text-text-muted">
                  A modern surety bond agency.{" "}
                  <br />
                  Fast bonds. Fair rates. Real specialists.
                </p>
              </div>
              <div className="flex gap-4 items-center text-[#64748b]">
                <Link href="#" className="hover:text-text-muted transition-colors"><LinkedInIcon /></Link>
                <Link href="#" className="hover:text-text-muted transition-colors"><XIcon /></Link>
                <Link href="#" className="hover:text-text-muted transition-colors"><FacebookIcon /></Link>
                <Link href="#" className="hover:text-text-muted transition-colors"><InstagramIcon /></Link>
              </div>
            </div>

            {/* Nav columns */}
            <div className="flex flex-wrap gap-8 md:gap-10 items-start w-full md:flex-[1_0_0]">

              {/* Bonds */}
              <div className="flex flex-col gap-3 flex-1 min-w-[144px]">
                <p className="text-xs md:text-sm font-semibold tracking-wide text-[#64748b]">BONDS</p>
                {bondLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm md:text-md leading-sm md:leading-md font-medium text-[#e2e8f0] hover:text-text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link href="#" className="text-sm md:text-md leading-sm md:leading-md font-medium text-[#818cf8] hover:text-[#a5b4fc] transition-colors">
                  View all bonds →
                </Link>
              </div>

              {/* Resources */}
              <div className="flex flex-col gap-3 flex-1 min-w-[144px]">
                <p className="text-xs md:text-sm font-semibold tracking-wide text-[#64748b]">RESOURCES</p>
                {resourceLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm md:text-md leading-sm md:leading-md font-medium text-[#e2e8f0] hover:text-text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Contact */}
              <div className="flex flex-col gap-3 flex-1 min-w-[144px]">
                <p className="text-xs md:text-sm font-semibold tracking-wide text-[#64748b]">CONTACT</p>
                {contactItems.map((item) =>
                  item.href ? (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="text-sm md:text-md leading-sm md:leading-md font-medium text-[#e2e8f0] hover:text-text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <p key={item.label} className="text-sm md:text-md leading-sm md:leading-md font-medium text-[#e2e8f0]">
                      {item.label}
                    </p>
                  )
                )}
                <p className="text-sm md:text-md leading-sm md:leading-md font-medium text-[#818cf8]">
                  Open evenings &amp; weekends
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bonds by State */}
        <div className="w-full border-b border-border-secondary px-3 md:px-8 py-8 md:py-12 flex flex-col gap-4">
          <p className="text-xs md:text-sm font-semibold tracking-wide text-[#64748b]">BONDS BY STATE</p>
          <div className="flex flex-wrap gap-6 w-full text-sm md:text-md leading-sm md:leading-md font-medium text-[#e2e8f0]">
            {stateColumns.map((col, i) => (
              <div key={i} className="flex flex-col gap-1.5 flex-1 min-w-[144px]">
                {col.map((state) => (
                  <Link
                    key={state}
                    href="#"
                    className="opacity-75 hover:opacity-100 transition-opacity"
                  >
                    {state}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="w-full px-3 md:px-8 py-4 md:py-0 md:min-h-20 flex flex-wrap gap-3 items-center justify-center md:justify-between text-sm md:text-md font-normal text-[#64748b]">
          <p>© 2026 Sured. All rights reserved.</p>
          <div className="flex items-center gap-3 md:gap-4">
            <Link href="#" className="hover:text-text-muted transition-colors">Privacy Policy</Link>
            <span className="text-xs">•</span>
            <Link href="#" className="hover:text-text-muted transition-colors">Terms of Service</Link>
            <span className="text-xs">•</span>
            <Link href="#" className="hover:text-text-muted transition-colors">Licenses</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

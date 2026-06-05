"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Bond types", href: "#bond-types" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 1);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`w-full flex items-center justify-center sticky top-0 z-50 transition-colors duration-200 ${
        scrolled ? "bg-bg-primary" : "bg-transparent"
      }`}
    >
      <div className="flex flex-1 h-16 items-center justify-between max-w-310 border-x border-b border-border-secondary px-3 md:px-8">
        {/* Logo + desktop nav links */}
        <div className="flex items-center gap-10 h-full">
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0 h-7 w-25.25 relative"
          >
            <Image
              src="/Logos/Sured Logo Asset.svg"
              alt="Sured Logo"
              width={101}
              height={28}
              className="absolute left-0 top-0 h-full w-auto"
            />
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center h-full">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-center px-3 h-full text-sm font-semibold text-text-muted hover:text-text-secondary transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Desktop right — CTA + Backed by */}
        <div className="hidden md:flex items-center gap-4 h-full py-2">
          <Link
            href="/get-a-bond"
            className="flex items-center gap-1 bg-brand border-2 border-white/12 text-text-primary text-sm font-semibold rounded-sm px-2.5 py-1.5 transition-opacity hover:opacity-90"
            style={{ boxShadow: "var(--shadow-brand)" }}
          >
            Get a Quote
            <span className="opacity-60 text-xs">→</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-text-secondary">
              Backed by
            </span>
            <Image
              src="/brand/backed-by-yc.svg"
              alt="Y Combinator"
              width={28}
              height={28}
              className="rounded-sm"
            />
          </div>
        </div>

        {/* Mobile — hamburger */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 text-text-muted opacity-60 hover:opacity-100 transition-opacity"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="4" y1="8" x2="20" y2="8" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="16" x2="20" y2="16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu drawer */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-bg-primary border-b border-border-secondary z-40">
          <div className="mx-auto max-w-310 border-x border-border-secondary px-3 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center px-3 py-3 text-sm font-semibold text-text-muted hover:text-text-secondary transition-colors rounded-sm hover:bg-surface"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-border-secondary mt-2 flex flex-col gap-3">
              <Link
                href="/get-a-bond"
                className="flex items-center justify-center gap-1 bg-brand border-2 border-white/12 text-text-primary text-sm font-semibold rounded-sm px-2.5 py-3 transition-opacity hover:opacity-90"
                style={{ boxShadow: "var(--shadow-brand)" }}
                onClick={() => setMenuOpen(false)}
              >
                Get a Quote <span className="opacity-60">→</span>
              </Link>
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-medium text-text-secondary">
                  Backed by
                </span>
                <Image
                  src="/brand/backed-by-yc.svg"
                  alt="Y Combinator"
                  width={28}
                  height={28}
                  className="rounded-sm"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

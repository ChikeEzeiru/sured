"use client";

import { useEffect, useRef, useState } from "react";

/* ── Stats data ── */
const stats = [
  {
    label: "Companies bonded",
    num: 4500,
    format: (n: number) => `${Math.floor(n).toLocaleString("en-US")}+`,
    initial: "0+",
  },
  {
    label: "Bonds written",
    num: 5000,
    format: (n: number) => `${Math.floor(n).toLocaleString("en-US")}+`,
    initial: "0+",
  },
  {
    label: "In bonds placed",
    num: 100,
    format: (n: number) => `$${Math.floor(n)}M+`,
    initial: "$0M+",
  },
  {
    label: "Licensed nationwide",
    num: 50,
    format: (n: number) => `${Math.floor(n)} states`,
    initial: "0 states",
  },
] as const;

type Stat = (typeof stats)[number];

/* ── Rolling counter ──
   Listens to visibilitychange: if the page returns while animation
   is in progress (rAF was suspended), jumps to final value. */
function Counter({ stat, animate }: { stat: Stat; animate: boolean }) {
  const [display, setDisplay] = useState(stat.initial);

  /* Main animation */
  useEffect(() => {
    if (!animate) return;
    const duration = 2000;
    let rafId: number;

    const timer = setTimeout(() => {
      if (document.hidden) {
        setDisplay(stat.format(stat.num));
        return;
      }
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(stat.format(stat.num * eased));
        if (t < 1) rafId = requestAnimationFrame(tick);
        else setDisplay(stat.format(stat.num));
      };
      rafId = requestAnimationFrame(tick);
    }, 500);

    return () => { clearTimeout(timer); cancelAnimationFrame(rafId); };
  }, [animate, stat]);

  /* Snap to final value when page becomes visible again */
  useEffect(() => {
    if (!animate) return;
    const onVisible = () => {
      if (!document.hidden) setDisplay(stat.format(stat.num));
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [animate, stat]);

  return <>{display}</>;
}

/* ── SVG chart strings ── */
const desktopChart = `<svg preserveAspectRatio="none" width="100%" height="100%" overflow="visible" style="display:block;" viewBox="0 0 1240 336" fill="none" xmlns="http://www.w3.org/2000/svg">
<defs>
  <linearGradient id="d_shadow" x1="0" y1="0" x2="0" y2="336" gradientUnits="userSpaceOnUse">
    <stop offset="0%"   stop-color="#6366f1" stop-opacity="0.22"/>
    <stop offset="20%"  stop-color="#6366f1" stop-opacity="0.10"/>
    <stop offset="50%"  stop-color="#6366f1" stop-opacity="0.03"/>
    <stop offset="100%" stop-color="#6366f1" stop-opacity="0"/>
  </linearGradient>
  <clipPath id="d_reveal"><rect id="d_reveal_rect" x="0" y="0" width="0" height="400"/></clipPath>
  <clipPath id="d_clip"><rect width="1240" height="336" fill="white"/></clipPath>
  <linearGradient id="d_g1"  x1="33"   y1="227" x2="32.9999" y2="369"     gradientUnits="userSpaceOnUse"><stop stop-color="#64748B"/><stop offset="1" stop-color="#1E1B4B"/></linearGradient>
  <linearGradient id="d_g2"  x1="113"  y1="228" x2="113"     y2="368.697" gradientUnits="userSpaceOnUse"><stop stop-color="#64748B"/><stop offset="1" stop-color="#1E1B4B"/></linearGradient>
  <linearGradient id="d_g3"  x1="193"  y1="229" x2="193"     y2="368.394" gradientUnits="userSpaceOnUse"><stop stop-color="#64748B"/><stop offset="1" stop-color="#1E1B4B"/></linearGradient>
  <linearGradient id="d_g4"  x1="273"  y1="229" x2="273"     y2="368.394" gradientUnits="userSpaceOnUse"><stop stop-color="#64748B"/><stop offset="1" stop-color="#1E1B4B"/></linearGradient>
  <linearGradient id="d_g5"  x1="353"  y1="226" x2="353"     y2="369.303" gradientUnits="userSpaceOnUse"><stop stop-color="#64748B"/><stop offset="1" stop-color="#1E1B4B"/></linearGradient>
  <linearGradient id="d_g6"  x1="433"  y1="222" x2="433"     y2="370.514" gradientUnits="userSpaceOnUse"><stop stop-color="#64748B"/><stop offset="1" stop-color="#1E1B4B"/></linearGradient>
  <linearGradient id="d_g7"  x1="513"  y1="215" x2="513"     y2="372.633" gradientUnits="userSpaceOnUse"><stop stop-color="#64748B"/><stop offset="1" stop-color="#1E1B4B"/></linearGradient>
  <linearGradient id="d_g8"  x1="593"  y1="206" x2="593"     y2="375.358" gradientUnits="userSpaceOnUse"><stop stop-color="#64748B"/><stop offset="1" stop-color="#1E1B4B"/></linearGradient>
  <linearGradient id="d_g9"  x1="673"  y1="193" x2="673"     y2="379.294" gradientUnits="userSpaceOnUse"><stop stop-color="#64748B"/><stop offset="1" stop-color="#1E1B4B"/></linearGradient>
  <linearGradient id="d_g10" x1="753"  y1="175" x2="753"     y2="384.743" gradientUnits="userSpaceOnUse"><stop stop-color="#64748B"/><stop offset="1" stop-color="#1E1B4B"/></linearGradient>
  <linearGradient id="d_g11" x1="833"  y1="153" x2="833"     y2="391.404" gradientUnits="userSpaceOnUse"><stop stop-color="#64748B"/><stop offset="1" stop-color="#1E1B4B"/></linearGradient>
  <linearGradient id="d_g12" x1="913"  y1="127" x2="913"     y2="399.275" gradientUnits="userSpaceOnUse"><stop stop-color="#64748B"/><stop offset="1" stop-color="#1E1B4B"/></linearGradient>
  <linearGradient id="d_g13" x1="993"  y1="99"  x2="992.999" y2="407.752" gradientUnits="userSpaceOnUse"><stop stop-color="#64748B"/><stop offset="1" stop-color="#1E1B4B"/></linearGradient>
  <linearGradient id="d_g14" x1="1073" y1="69"  x2="1073"    y2="416.835" gradientUnits="userSpaceOnUse"><stop stop-color="#64748B"/><stop offset="1" stop-color="#1E1B4B"/></linearGradient>
  <linearGradient id="d_g15" x1="1153" y1="37"  x2="1153"    y2="426.523" gradientUnits="userSpaceOnUse"><stop stop-color="#64748B"/><stop offset="1" stop-color="#1E1B4B"/></linearGradient>
</defs>
<g clip-path="url(#d_clip)">
  <path clip-path="url(#d_reveal)" d="M1 226C1 226 402 242.5 653 197C904 151.5 1239 0 1239 0L1239 336L1 336Z" fill="url(#d_shadow)"/>
  <path class="graph-grid graph-grid-0"  style="opacity:0" d="M33 227V336"  stroke="url(#d_g1)"  stroke-opacity="0.5" stroke-dasharray="8 8"/>
  <path class="graph-grid graph-grid-1"  style="opacity:0" d="M113 228V336" stroke="url(#d_g2)"  stroke-opacity="0.5" stroke-dasharray="8 8"/>
  <path class="graph-grid graph-grid-2"  style="opacity:0" d="M193 229V336" stroke="url(#d_g3)"  stroke-opacity="0.5" stroke-dasharray="8 8"/>
  <path class="graph-grid graph-grid-3"  style="opacity:0" d="M273 229V336" stroke="url(#d_g4)"  stroke-opacity="0.5" stroke-dasharray="8 8"/>
  <path class="graph-grid graph-grid-4"  style="opacity:0" d="M353 226V336" stroke="url(#d_g5)"  stroke-opacity="0.5" stroke-dasharray="8 8"/>
  <path class="graph-grid graph-grid-5"  style="opacity:0" d="M433 222V336" stroke="url(#d_g6)"  stroke-opacity="0.5" stroke-dasharray="8 8"/>
  <path class="graph-grid graph-grid-6"  style="opacity:0" d="M513 215V336" stroke="url(#d_g7)"  stroke-opacity="0.5" stroke-dasharray="8 8"/>
  <path class="graph-grid graph-grid-7"  style="opacity:0" d="M593 206V336" stroke="url(#d_g8)"  stroke-opacity="0.5" stroke-dasharray="8 8"/>
  <path class="graph-grid graph-grid-8"  style="opacity:0" d="M673 193V336" stroke="url(#d_g9)"  stroke-opacity="0.5" stroke-dasharray="8 8"/>
  <path class="graph-grid graph-grid-9"  style="opacity:0" d="M753 175V336" stroke="url(#d_g10)" stroke-opacity="0.5" stroke-dasharray="8 8"/>
  <path class="graph-grid graph-grid-10" style="opacity:0" d="M833 153V336" stroke="url(#d_g11)" stroke-opacity="0.5" stroke-dasharray="8 8"/>
  <path class="graph-grid graph-grid-11" style="opacity:0" d="M913 127V336" stroke="url(#d_g12)" stroke-opacity="0.5" stroke-dasharray="8 8"/>
  <path class="graph-grid graph-grid-12" style="opacity:0" d="M993 99V336"  stroke="url(#d_g13)" stroke-opacity="0.5" stroke-dasharray="8 8"/>
  <path class="graph-grid graph-grid-13" style="opacity:0" d="M1073 69V336" stroke="url(#d_g14)" stroke-opacity="0.5" stroke-dasharray="8 8"/>
  <path class="graph-grid graph-grid-14" style="opacity:0" d="M1153 37V336" stroke="url(#d_g15)" stroke-opacity="0.5" stroke-dasharray="8 8"/>
  <path class="graph-line" pathLength="1" style="stroke-dasharray:1;stroke-dashoffset:1" d="M1 226C1 226 402 242.5 653 197C904 151.5 1239 0 1239 0" stroke="#818cf8" stroke-width="8" stroke-opacity="0.18" stroke-linecap="round"/>
  <path class="graph-line" pathLength="1" style="stroke-dasharray:1;stroke-dashoffset:1" d="M1 226C1 226 402 242.5 653 197C904 151.5 1239 0 1239 0" stroke="#a5b4fc" stroke-width="1.5" stroke-linecap="round"/>
</g>
</svg>`;

const mobileChart = `<svg preserveAspectRatio="none" width="100%" height="100%" overflow="visible" style="display:block;" viewBox="0 0 362 336" fill="none" xmlns="http://www.w3.org/2000/svg">
<defs>
  <linearGradient id="m_shadow" x1="0" y1="0" x2="0" y2="336" gradientUnits="userSpaceOnUse">
    <stop offset="0%"   stop-color="#6366f1" stop-opacity="0.22"/>
    <stop offset="20%"  stop-color="#6366f1" stop-opacity="0.10"/>
    <stop offset="50%"  stop-color="#6366f1" stop-opacity="0.03"/>
    <stop offset="100%" stop-color="#6366f1" stop-opacity="0"/>
  </linearGradient>
  <clipPath id="m_reveal"><rect id="m_reveal_rect" x="0" y="0" width="0" height="400"/></clipPath>
  <linearGradient id="m_g1"  x1="33"  y1="260" x2="32.9999" y2="359.009" gradientUnits="userSpaceOnUse"><stop stop-color="#64748B"/><stop offset="1" stop-color="#1E1B4B"/></linearGradient>
  <linearGradient id="m_g2"  x1="58"  y1="261" x2="57.9999" y2="358.706" gradientUnits="userSpaceOnUse"><stop stop-color="#64748B"/><stop offset="1" stop-color="#1E1B4B"/></linearGradient>
  <linearGradient id="m_g3"  x1="83"  y1="260" x2="82.9999" y2="359.009" gradientUnits="userSpaceOnUse"><stop stop-color="#64748B"/><stop offset="1" stop-color="#1E1B4B"/></linearGradient>
  <linearGradient id="m_g4"  x1="108" y1="257" x2="108"     y2="359.917" gradientUnits="userSpaceOnUse"><stop stop-color="#64748B"/><stop offset="1" stop-color="#1E1B4B"/></linearGradient>
  <linearGradient id="m_g5"  x1="133" y1="253" x2="133"     y2="361.128" gradientUnits="userSpaceOnUse"><stop stop-color="#64748B"/><stop offset="1" stop-color="#1E1B4B"/></linearGradient>
  <linearGradient id="m_g6"  x1="158" y1="248" x2="158"     y2="362.642" gradientUnits="userSpaceOnUse"><stop stop-color="#64748B"/><stop offset="1" stop-color="#1E1B4B"/></linearGradient>
  <linearGradient id="m_g7"  x1="183" y1="241" x2="183"     y2="364.761" gradientUnits="userSpaceOnUse"><stop stop-color="#64748B"/><stop offset="1" stop-color="#1E1B4B"/></linearGradient>
  <linearGradient id="m_g8"  x1="208" y1="230" x2="208"     y2="368.092" gradientUnits="userSpaceOnUse"><stop stop-color="#64748B"/><stop offset="1" stop-color="#1E1B4B"/></linearGradient>
  <linearGradient id="m_g9"  x1="233" y1="218" x2="233"     y2="371.725" gradientUnits="userSpaceOnUse"><stop stop-color="#64748B"/><stop offset="1" stop-color="#1E1B4B"/></linearGradient>
  <linearGradient id="m_g10" x1="258" y1="206" x2="258"     y2="375.358" gradientUnits="userSpaceOnUse"><stop stop-color="#64748B"/><stop offset="1" stop-color="#1E1B4B"/></linearGradient>
  <linearGradient id="m_g11" x1="283" y1="192" x2="283"     y2="379.596" gradientUnits="userSpaceOnUse"><stop stop-color="#64748B"/><stop offset="1" stop-color="#1E1B4B"/></linearGradient>
  <linearGradient id="m_g12" x1="308" y1="178" x2="308"     y2="383.835" gradientUnits="userSpaceOnUse"><stop stop-color="#64748B"/><stop offset="1" stop-color="#1E1B4B"/></linearGradient>
  <linearGradient id="m_g13" x1="333" y1="164" x2="333"     y2="388.073" gradientUnits="userSpaceOnUse"><stop stop-color="#64748B"/><stop offset="1" stop-color="#1E1B4B"/></linearGradient>
  <linearGradient id="m_g14" x1="358" y1="148" x2="358"     y2="392.917" gradientUnits="userSpaceOnUse"><stop stop-color="#64748B"/><stop offset="1" stop-color="#1E1B4B"/></linearGradient>
</defs>
<g>
  <path clip-path="url(#m_reveal)" d="M1 258C1 258 90 268.5 171.5 244.5C254 215 361 146 361 146L361 336L1 336Z" fill="url(#m_shadow)"/>
  <path class="graph-grid graph-grid-0"  style="opacity:0" d="M33 260V336"      stroke="url(#m_g1)"  stroke-opacity="0.5" stroke-dasharray="8 8"/>
  <path class="graph-grid graph-grid-1"  style="opacity:0" d="M58 261V336"      stroke="url(#m_g2)"  stroke-opacity="0.5" stroke-dasharray="8 8"/>
  <path class="graph-grid graph-grid-2"  style="opacity:0" d="M83 260V336"      stroke="url(#m_g3)"  stroke-opacity="0.5" stroke-dasharray="8 8"/>
  <path class="graph-grid graph-grid-3"  style="opacity:0" d="M108 257V336"     stroke="url(#m_g4)"  stroke-opacity="0.5" stroke-dasharray="8 8"/>
  <path class="graph-grid graph-grid-4"  style="opacity:0" d="M133 253V336"     stroke="url(#m_g5)"  stroke-opacity="0.5" stroke-dasharray="8 8"/>
  <path class="graph-grid graph-grid-5"  style="opacity:0" d="M158 248L158 336" stroke="url(#m_g6)"  stroke-opacity="0.5" stroke-dasharray="8 8"/>
  <path class="graph-grid graph-grid-6"  style="opacity:0" d="M183 241L183 336" stroke="url(#m_g7)"  stroke-opacity="0.5" stroke-dasharray="8 8"/>
  <path class="graph-grid graph-grid-7"  style="opacity:0" d="M208 230L208 336" stroke="url(#m_g8)"  stroke-opacity="0.5" stroke-dasharray="8 8"/>
  <path class="graph-grid graph-grid-8"  style="opacity:0" d="M233 218L233 336" stroke="url(#m_g9)"  stroke-opacity="0.5" stroke-dasharray="8 8"/>
  <path class="graph-grid graph-grid-9"  style="opacity:0" d="M258 206L258 336" stroke="url(#m_g10)" stroke-opacity="0.5" stroke-dasharray="8 8"/>
  <path class="graph-grid graph-grid-10" style="opacity:0" d="M283 192L283 336" stroke="url(#m_g11)" stroke-opacity="0.5" stroke-dasharray="8 8"/>
  <path class="graph-grid graph-grid-11" style="opacity:0" d="M308 178L308 336" stroke="url(#m_g12)" stroke-opacity="0.5" stroke-dasharray="8 8"/>
  <path class="graph-grid graph-grid-12" style="opacity:0" d="M333 164L333 336" stroke="url(#m_g13)" stroke-opacity="0.5" stroke-dasharray="8 8"/>
  <path class="graph-grid graph-grid-13" style="opacity:0" d="M358 148L358 336" stroke="url(#m_g14)" stroke-opacity="0.5" stroke-dasharray="8 8"/>
  <path class="graph-line" pathLength="1" style="stroke-dasharray:1;stroke-dashoffset:1" d="M1 258C1 258 90 268.5 171.5 244.5C254 215 361 146 361 146" stroke="#818cf8" stroke-width="8" stroke-opacity="0.18" stroke-linecap="round"/>
  <path class="graph-line" pathLength="1" style="stroke-dasharray:1;stroke-dashoffset:1" d="M1 258C1 258 90 268.5 171.5 244.5C254 215 361 146 361 146" stroke="#a5b4fc" stroke-width="1.5" stroke-linecap="round"/>
</g>
</svg>`;

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  /* ── Intersection observer (fires once) ── */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* ── SVG animations ── */
  useEffect(() => {
    if (!inView) return;
    const container = sectionRef.current;
    if (!container) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lines = Array.from(container.querySelectorAll<SVGElement>(".graph-line"));
    const grids = Array.from(container.querySelectorAll<SVGElement>(".graph-grid"));
    const dRect = container.querySelector<SVGRectElement>("#d_reveal_rect");
    const mRect = container.querySelector<SVGRectElement>("#m_reveal_rect");

    /* Apply fully-visible final state — called after animation or on page restore */
    const applyFinal = () => {
      lines.forEach((el) => {
        el.style.transition = "none";
        el.style.strokeDashoffset = "0";
      });
      grids.forEach((el) => {
        el.style.transition = "none";
        el.style.opacity = "1";
      });
      if (dRect) dRect.setAttribute("width", "1240");
      if (mRect) mRect.setAttribute("width", "362");
    };

    /* If the page is hidden when we try to animate (e.g. rAF suspended),
       snap to the final state immediately when it becomes visible again. */
    const onVisible = () => {
      if (!document.hidden) applyFinal();
    };
    document.addEventListener("visibilitychange", onVisible);

    if (reduced) {
      applyFinal();
      return () => document.removeEventListener("visibilitychange", onVisible);
    }

    /* Animated path: line + shadow in one shared rAF loop */
    let rafId = 0;
    let cancelled = false;
    const duration = 1600;

    const timer = setTimeout(() => {
      if (cancelled) return;
      /* If the page went hidden during the 300ms delay, just show final state */
      if (document.hidden) { applyFinal(); return; }

      const start = performance.now();
      const tick = (now: number) => {
        if (cancelled) return;
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        lines.forEach((el) => { el.style.strokeDashoffset = String(1 - eased); });
        if (dRect) dRect.setAttribute("width", String(1240 * eased));
        if (mRect) mRect.setAttribute("width", String(362 * eased));
        if (t < 1) rafId = requestAnimationFrame(tick);
        else applyFinal();
      };
      rafId = requestAnimationFrame(tick);
    }, 300);

    /* Grid lines: staggered CSS opacity transitions */
    for (let i = 0; i < 15; i++) {
      container.querySelectorAll<SVGElement>(`.graph-grid-${i}`).forEach((el) => {
        el.style.transition = `opacity 0.35s ease ${0.5 + i * 0.07}s`;
        requestAnimationFrame(() => { el.style.opacity = "1"; });
      });
    }

    return () => {
      cancelled = true;
      clearTimeout(timer);
      cancelAnimationFrame(rafId);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [inView]);

  return (
    <section ref={sectionRef} className="w-full bg-[#020617]">
      <div className="relative mx-auto max-w-[1240px] border-x border-b border-[#1e293b] min-h-[880px] md:min-h-[720px] overflow-hidden flex flex-col pt-12 md:pt-24 gap-10 md:gap-16">

        {/* Growth chart background */}
        <div className="absolute bottom-[33px] left-0 right-0 h-[336px] pointer-events-none select-none">
          <div className="hidden md:block w-full h-full" dangerouslySetInnerHTML={{ __html: desktopChart }} />
          <div className="block md:hidden w-full h-full" dangerouslySetInnerHTML={{ __html: mobileChart }} />
        </div>

        {/* Headline */}
        <div className="px-3 md:px-8">
          <p className="max-w-[856px] text-[24px] md:text-[30px] leading-[32px] md:leading-[38px] font-medium text-[#e2e8f0]">
            {"5,000 bonds. 4,500 companies. The difference is repeat business. "}
            <span className="font-normal text-[#94a3b8]">
              More bonds than clients means businesses come back to Sured for
              their next project. Across four years and all 50 states,
              that&apos;s the number we&apos;re proudest of.
            </span>
          </p>
        </div>

        {/* Stats grid */}
        <div className="px-3 md:px-8">
          <div className="flex flex-wrap gap-8 md:gap-10 max-w-[856px]">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col gap-1 flex-1 min-w-[140px] md:min-w-[280px] border-l-[1.5px] border-[#6366f1] px-3"
              >
                <span className="text-[20px] md:text-[24px] leading-[30px] md:leading-[32px] font-medium text-[#cbd5e1] tabular-nums">
                  <Counter stat={stat} animate={inView} />
                </span>
                <span className="text-[18px] md:text-[20px] leading-[28px] md:leading-[30px] font-normal text-[#94a3b8]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

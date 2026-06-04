"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    quote:
      "Always quick to respond, and pricing is great — usually beat our previous bond providers annual pricing by 20% or more.",
    name: "Mindy Dees",
    company: "Steadily",
    avatar: "/testimonials/avatar-1.jpg",
    platform: null,
  },
  {
    quote:
      "Bruce worked with me on a $155K Performance and Payment bond to get me the absolute lowest price on the market. I couldn't be happier.",
    name: "Teru Brach",
    company: "LA Techs",
    avatar: "/testimonials/avatar-2.jpg",
    platform: null,
  },
  {
    quote:
      "I received my bond 5 minutes after payment. The process was incredibly fast, the team highly responsive, and everything completely straightforward.",
    name: "Nguyen Lang",
    company: "Nail school owner",
    avatar: "/testimonials/avatar-3.jpg",
    platform: "trustpilot",
  },
  {
    quote:
      "As a subprime client I'd been denied by other brokers. Sured had the network to get me bonded regardless.",
    name: "Liam Anderson",
    company: "Business owner",
    avatar: "/testimonials/avatar-4.jpg",
    platform: "google",
  },
  {
    quote:
      "Bruce and his team got us bonded for a government contract and delivered on time. We'll use them for every future project.",
    name: "Sophia Martinez",
    company: "Business owner",
    avatar: "/testimonials/avatar-5.jpg",
    platform: "trustpilot",
  },
];

const COUNT = testimonials.length;
const TRACK = [...testimonials, ...testimonials, ...testimonials];

export default function TestimonialSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const posRef = useRef(COUNT);
  const containerWRef = useRef(1240);
  const dragRef = useRef({ active: false, startX: 0, startPos: COUNT });
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(
    undefined
  );
  const jumpingRef = useRef(false);
  const [dragging, setDragging] = useState(false);

  const cardW = () =>
    typeof window !== "undefined" && window.innerWidth >= 768 ? 440 : 302;

  const applyTransform = (p: number, animate: boolean) => {
    const el = trackRef.current;
    if (!el) return;
    const w = cardW();
    el.style.transition = animate
      ? "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)"
      : "none";
    el.style.transform = `translateX(${
      -(p * w) + containerWRef.current / 2 - w / 2
    }px)`;
  };

  const applyOpacities = (p: number, animate: boolean) => {
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const dist = Math.abs(i - p);
      const opacity = dist < 0.5 ? 1 : dist < 1.5 ? 0.5 : 0;
      el.style.transition = animate ? "opacity 0.35s ease" : "none";
      el.style.opacity = String(opacity);
      el.style.pointerEvents = opacity === 0 ? "none" : "auto";
    });
  };

  /* ── Container width ── */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      containerWRef.current = el.offsetWidth;
      applyTransform(posRef.current, false);
      applyOpacities(posRef.current, false);
    };
    update();
    const obs = new ResizeObserver(update);
    obs.observe(el);
    return () => obs.disconnect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Infinite loop: silent position reset after transition ── */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onEnd = (e: TransitionEvent) => {
      if (e.target !== el || e.propertyName !== "transform") return;
      const p = posRef.current;
      if (p >= COUNT * 2) {
        jumpingRef.current = true;
        posRef.current = p - COUNT;
        applyTransform(posRef.current, false);
        applyOpacities(posRef.current, false);
        requestAnimationFrame(() => {
          jumpingRef.current = false;
        });
      } else if (p < COUNT) {
        jumpingRef.current = true;
        posRef.current = p + COUNT;
        applyTransform(posRef.current, false);
        applyOpacities(posRef.current, false);
        requestAnimationFrame(() => {
          jumpingRef.current = false;
        });
      }
    };
    el.addEventListener("transitionend", onEnd);
    return () => el.removeEventListener("transitionend", onEnd);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Auto-advance ── */
  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (jumpingRef.current) return;
      posRef.current += 1;
      applyTransform(posRef.current, true);
      applyOpacities(posRef.current, true);
    }, 3500);
  };
  const stopTimer = () => clearInterval(timerRef.current);

  useEffect(() => {
    startTimer();
    return stopTimer;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Pause on tab hide, resume on show ── */
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) {
        stopTimer();
      } else {
        applyTransform(posRef.current, false);
        applyOpacities(posRef.current, false);
        startTimer();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Wheel block (must be non-passive) ── */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const block = (e: WheelEvent) => e.preventDefault();
    el.addEventListener("wheel", block, { passive: false });
    return () => el.removeEventListener("wheel", block);
  }, []);

  /* ── Touch (must be non-passive for preventDefault) ── */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onStart = (e: TouchEvent) => {
      stopTimer();
      dragRef.current = {
        active: true,
        startX: e.touches[0].clientX,
        startPos: posRef.current,
      };
      setDragging(true);
      applyTransform(posRef.current, false);
    };
    const onMove = (e: TouchEvent) => {
      if (!dragRef.current.active) return;
      e.preventDefault();
      const w = cardW();
      const newPos =
        dragRef.current.startPos -
        (e.touches[0].clientX - dragRef.current.startX) / w;
      posRef.current = newPos;
      applyTransform(newPos, false);
      applyOpacities(newPos, false);
    };
    const onEnd = () => {
      if (!dragRef.current.active) return;
      dragRef.current.active = false;
      setDragging(false);
      const snapped = Math.round(posRef.current);
      posRef.current = snapped;
      applyTransform(snapped, true);
      applyOpacities(snapped, true);
      startTimer();
    };
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: false });
    el.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Mouse drag ── */
  const onMouseDown = (e: React.MouseEvent) => {
    stopTimer();
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startPos: posRef.current,
    };
    setDragging(true);
    applyTransform(posRef.current, false);
    e.preventDefault();
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragRef.current.active) return;
    const w = cardW();
    const newPos =
      dragRef.current.startPos - (e.clientX - dragRef.current.startX) / w;
    posRef.current = newPos;
    applyTransform(newPos, false);
    applyOpacities(newPos, false);
  };

  const onMouseUp = () => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    setDragging(false);
    const snapped = Math.round(posRef.current);
    posRef.current = snapped;
    applyTransform(snapped, true);
    applyOpacities(snapped, true);
    startTimer();
  };

  return (
    <section className="w-full bg-text-primary">
      <div className="mx-auto max-w-310 border-x border-b border-[#e2e8f0] py-16 md:py-24 flex flex-col gap-10 md:gap-16">
        {/* ── Heading ── */}
        <div className="px-3 md:px-8 flex flex-col items-center gap-2">
          <div className="bg-white border border-text-secondary rounded-xs px-2 py-0.5 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
            <span className="text-[14px] font-medium leading-[20px] text-border-primary">
              Testimonials
            </span>
          </div>
          <h2 className="text-[24px] md:text-[36px] font-medium leading-8 md:leading-11 text-[#1e293b] tracking-[-0.72px] text-center max-w-180">
            See why our clients keep coming back
          </h2>
        </div>

        {/* ── Carousel ── */}
        <div
          ref={containerRef}
          className="border-t border-b border-[#e2e8f0] overflow-hidden select-none"
          style={{
            perspective: "1200px",
            cursor: dragging ? "grabbing" : "grab",
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          <div ref={trackRef} className="flex">
            {TRACK.map((t, i) => {
              const dist = Math.abs(i - COUNT);
              const initOpacity = dist < 0.5 ? 1 : dist < 1.5 ? 0.5 : 0;
              return (
                <div
                  key={i}
                  className="shrink-0 w-75.5 md:w-110 border-r border-[#e2e8f0]"
                >
                  <div
                    ref={(el) => {
                      cardRefs.current[i] = el;
                    }}
                    className="flex flex-col justify-between h-66 min-h-60 px-6 py-5 md:px-8 md:py-6"
                    style={{
                      opacity: initOpacity,
                      pointerEvents: initOpacity === 0 ? "none" : "auto",
                    }}
                  >
                    <p className="text-md md:text-[18px] font-medium leading-[24px] md:leading-[28px] text-black pointer-events-none">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-3 pointer-events-none">
                      <div className="relative size-9 md:size-12 shrink-0 rounded-sm overflow-hidden">
                        <Image
                          src={t.avatar}
                          alt={t.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                          draggable={false}
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[14px] md:text-md font-medium leading-[20px] md:leading-[24px] text-border-primary whitespace-nowrap">
                          {t.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[14px] md:text-md font-normal leading-[20px] md:leading-[24px] text-[#64748b] whitespace-nowrap">
                            {t.company}
                          </span>
                          {t.platform === "trustpilot" && (
                            <Image
                              src="/Logos/trustpilot_symbol.svg.svg"
                              alt="Trustpilot"
                              width={16}
                              height={15}
                              draggable={false}
                            />
                          )}
                          {t.platform === "google" && (
                            <Image
                              src="/Logos/Google Symbol.svg.svg"
                              alt="Google"
                              width={15}
                              height={16}
                              draggable={false}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

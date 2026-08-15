"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  number: string;
  label: string;
  heading: string;
  children: ReactNode;
  className?: string;
};

export function Section({
  id,
  number,
  label,
  heading,
  children,
  className = "",
}: Readonly<SectionProps>) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const revealEls = section.querySelectorAll<HTMLElement>(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" },
    );

    revealEls.forEach((el, i) => {
      el.style.transitionDelay = `${i * 70}ms`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative py-28 scroll-mt-24 ${className}`}
    >
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        {/* Editorial section header */}
        <header className="mb-16 relative overflow-hidden">
          {/* Large decorative background number — Geist Sans, not Instrument Serif */}
          <span
            aria-hidden="true"
            className="absolute -top-2 left-0 select-none pointer-events-none font-black leading-none text-[var(--border)]"
            style={{ fontSize: "clamp(5rem, 14vw, 9rem)" }}
          >
            {number}
          </span>
          {/* Mono eyebrow label */}
          <p className="relative pt-12 font-mono text-[0.65rem] tracking-[0.3em] uppercase text-[var(--accent)] mb-2">
            {label}
          </p>
          {/* Display heading — Instrument Serif */}
          <h2 className="relative font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.1] text-[var(--fg)] max-w-2xl">
            {heading}
          </h2>
          {/* Accent rule */}
          <div className="mt-5 h-px w-14 bg-[var(--accent)] opacity-70" />
        </header>
        {children}
      </div>
    </section>
  );
}

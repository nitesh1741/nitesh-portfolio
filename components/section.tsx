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
      { threshold: 0.08, rootMargin: "0px 0px -50px 0px" },
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
      className={`relative py-24 lg:py-32 scroll-mt-24 ${className}`}
    >
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        {/* Terminal-style section header */}
        <header className="mb-12 reveal">
          <p className="font-mono text-[0.65rem] tracking-[0.28em] uppercase text-[var(--accent)] mb-3">
            {"// "}
            {number.padStart(2, "0")}. {label}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.08] text-[var(--fg)] max-w-2xl">
            {heading}
          </h2>
          <div className="mt-5 h-px w-12 bg-[var(--accent)] opacity-60" />
        </header>

        {children}
      </div>
    </section>
  );
}

"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type SectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
};

export function Section({ id, eyebrow, title, children }: Readonly<SectionProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -80px 0px",
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={`mx-auto max-w-6xl px-5 py-20 lg:px-8 reveal-on-scroll ${
        isRevealed ? "revealed" : ""
      }`}
    >
      <div className="mb-10 max-w-3xl">
        <p className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent)]">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl tracking-tight text-[var(--foreground)]">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

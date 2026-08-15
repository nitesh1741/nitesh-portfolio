"use client";

import { useEffect, useRef, useState } from "react";

type ParsedMetric = {
  raw: number;
  suffix: string;
  label: string;
};

function parseMetricValue(value: string): { raw: number; suffix: string } {
  // Remove commas, then match leading number and trailing suffix
  // "5,000+" → "5000+" → raw:5000, suffix:"+"
  // "60%"    → raw:60,   suffix:"%"
  // "2+"     → raw:2,    suffix:"+"
  const cleaned = value.replace(/,/g, "");
  const match = cleaned.match(/^([\d.]+)(.*)$/);
  if (!match) return { raw: 0, suffix: value };
  return { raw: parseFloat(match[1]), suffix: match[2] };
}

function CountUp({ raw, suffix }: { raw: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const spanRef = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const DURATION = 1600;
          const startTime = performance.now();

          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / DURATION, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * raw));
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [raw]);

  const formatted = count >= 1000 ? count.toLocaleString() : String(count);

  return (
    <span ref={spanRef}>
      {formatted}
      {suffix}
    </span>
  );
}

type MetricsCounterProps = {
  metrics: { value: string; label: string }[];
};

export function MetricsCounter({ metrics }: Readonly<MetricsCounterProps>) {
  const parsed: ParsedMetric[] = metrics.map((m) => ({
    ...parseMetricValue(m.value),
    label: m.label,
  }));

  return (
    <div className="border-t border-b border-[var(--border)] py-8 grid grid-cols-2 gap-8 sm:grid-cols-4">
      {parsed.map((m) => (
        <div key={m.label} className="flex flex-col gap-1.5">
          <span className="font-display text-3xl sm:text-4xl text-[var(--fg)]">
            <CountUp raw={m.raw} suffix={m.suffix} />
          </span>
          <span className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-[var(--muted)] leading-relaxed">
            {m.label}
          </span>
        </div>
      ))}
    </div>
  );
}

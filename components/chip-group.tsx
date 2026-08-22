import { ReactNode } from "react";

type ChipGroupProps = { title: string; items: string[] };

function getCategoryIcon(title: string): ReactNode {
  const norm = title.toLowerCase().trim();

  const iconClass = "h-4 w-4 text-[var(--accent)]";
  const svgProps = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: iconClass,
  };

  if (norm.includes("domain") || norm.includes("expertise"))
    return (
      <svg {...svgProps}>
        <circle cx="12" cy="5" r="2.5" />
        <circle cx="5" cy="12" r="2.5" />
        <circle cx="19" cy="12" r="2.5" />
        <circle cx="12" cy="19" r="2.5" />
        <line x1="12" y1="7.5" x2="12" y2="16.5" />
        <line x1="6.77" y1="10.23" x2="17.23" y2="13.77" />
        <line x1="17.23" y1="10.23" x2="6.77" y2="13.77" />
      </svg>
    );

  if (norm.includes("language"))
    return (
      <svg {...svgProps}>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    );

  if (norm.includes("framework") || norm.includes("librar"))
    return (
      <svg {...svgProps}>
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    );

  if (norm.includes("tool") || norm.includes("cloud") || norm.includes("db") || norm.includes("database"))
    return (
      <svg {...svgProps}>
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
      </svg>
    );

  if (norm.includes("certif"))
    return (
      <svg {...svgProps}>
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
      </svg>
    );

  if (norm.includes("interest"))
    return (
      <svg {...svgProps}>
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    );

  return (
    <svg {...svgProps}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z" />
    </svg>
  );
}

export function ChipGroup({ title, items }: Readonly<ChipGroupProps>) {
  return (
    <div className="border border-[var(--border)] bg-[var(--surface)] p-5 transition-all duration-200 hover:border-[color-mix(in_srgb,var(--accent)_30%,var(--border))] group">
      <div className="flex items-center gap-2.5 mb-4">
        {getCategoryIcon(title)}
        <h3 className="font-mono text-xs tracking-[0.15em] uppercase text-[var(--fg-2)] group-hover:text-[var(--accent)] transition-colors duration-200">
          {title}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="font-mono text-[0.65rem] px-2.5 py-1 border border-[var(--border)] text-[var(--muted)] bg-[var(--bg)] transition-all duration-150 hover:border-[var(--accent)] hover:text-[var(--accent)] cursor-default"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

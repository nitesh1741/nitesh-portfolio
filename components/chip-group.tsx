type ChipGroupProps = {
  title: string;
  items: string[];
};

export function ChipGroup({ title, items }: Readonly<ChipGroupProps>) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm transition-all duration-300 hover:border-[color-mix(in_srgb,var(--accent)_30%,var(--border))]">
      <h3 className="font-bold text-md tracking-tight text-[var(--foreground)]">{title}</h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full bg-[var(--surface-strong)] border border-[color-mix(in_srgb,var(--border)_45%,transparent)] px-3 py-1.25 text-xs font-bold text-[var(--muted)] transition-all duration-200 hover:text-[var(--accent)] hover:border-[var(--accent)] hover:translate-y-[-1px]"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

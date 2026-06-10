type ChipGroupProps = {
  title: string;
  items: string[];
};

export function ChipGroup({ title, items }: Readonly<ChipGroupProps>) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
      <h3 className="font-semibold">{title}</h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full bg-[var(--surface-strong)] px-3 py-1 text-sm text-[var(--muted)]"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

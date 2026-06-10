type ContactLinkProps = {
  label: string;
  value: string;
  href: string;
};

export function ContactLink({ label, value, href }: Readonly<ContactLinkProps>) {
  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className="rounded-md border border-[var(--border)] bg-[var(--background)] p-4.5 transition-all duration-300 hover:border-[var(--accent)] hover:translate-y-[-2px] hover:shadow-sm group cursor-pointer"
    >
      <span className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
        {label}
      </span>
      <span className="mt-1.5 block font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors duration-200">
        {value}
      </span>
    </a>
  );
}

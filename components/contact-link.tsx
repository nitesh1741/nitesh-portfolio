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
      className="rounded-md border border-[var(--border)] bg-[var(--background)] p-4 transition hover:border-[var(--muted)]"
    >
      <span className="block text-xs uppercase text-[var(--muted)]">
        {label}
      </span>
      <span className="mt-1 block font-semibold">{value}</span>
    </a>
  );
}

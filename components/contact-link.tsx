type ContactLinkProps = {
  href: string;
  label: string;
  external?: boolean;
};

export function ContactLink({ href, label, external = false }: ContactLinkProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group inline-flex items-center gap-2 font-mono text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors duration-200"
    >
      <span className="group-hover:translate-x-1 transition-transform duration-200">
        →
      </span>
      {label}
    </a>
  );
}

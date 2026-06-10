import { ReactNode } from "react";

type SectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
};

export function Section({ id, eyebrow, title, children }: Readonly<SectionProps>) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
      <div className="mb-10 max-w-3xl">
        <p className="font-mono text-sm text-[var(--accent)]">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

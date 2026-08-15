import { Section } from "./section";
import { cpProfile } from "@/data/portfolio";

export function CPSection() {
  return (
    <Section
      id="compete"
      number="05"
      label="Competitive Programming"
      heading="Sharpened at competitive scale."
    >
      {/* Hero number */}
      <div className="reveal mb-12 flex flex-col sm:flex-row sm:items-end gap-4 border-b border-[var(--border)] pb-10">
        <span
          className="font-black leading-none text-[var(--fg)]"
          style={{ fontSize: "clamp(4rem, 12vw, 8rem)" }}
        >
          {cpProfile.totalSolved.toLocaleString()}+
        </span>
        <div className="sm:pb-2 flex flex-col gap-1">
          <p className="font-mono text-[0.62rem] tracking-[0.25em] uppercase text-[var(--accent)]">
            Problems Solved
          </p>
          <p className="text-sm text-[var(--muted)]">
            Across LeetCode, GeeksforGeeks, and CodeChef
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Platform cards column */}
        <div className="reveal grid gap-4 content-start">
          {cpProfile.platforms.map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between border border-[var(--border)] bg-[var(--surface)] px-6 py-5 transition-all duration-300 hover:border-[var(--accent)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-sm)]"
            >
              <div className="flex flex-col gap-1">
                <p className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-[var(--accent)]">
                  {platform.name}
                </p>
                <p className="font-mono text-xs text-[var(--muted)]">
                  @{platform.handle}
                </p>
              </div>
              <div className="text-right">
                <span className="font-black text-3xl text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors duration-300 leading-none">
                  {platform.solvedCount.toLocaleString()}+
                </span>
                <p className="font-mono text-[0.58rem] tracking-wider uppercase text-[var(--muted)]">
                  solved
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Contest + discipline column */}
        <div className="reveal flex flex-col gap-5">
          {cpProfile.contests.map((contest) => (
            <div
              key={contest.name}
              className="border border-[var(--border)] bg-[var(--surface)] p-8 flex flex-col gap-6"
            >
              <div>
                <p className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-[var(--accent)] mb-2">
                  Contest Highlight
                </p>
                <h3 className="font-display text-xl text-[var(--fg)]">
                  {contest.name}
                </h3>
              </div>
              <div className="flex items-end gap-6">
                <div>
                  <span className="font-black text-5xl text-[var(--fg)] leading-none">
                    #{contest.rank.toLocaleString()}
                  </span>
                  <p className="font-mono text-[0.58rem] tracking-wider uppercase text-[var(--muted)] mt-1">
                    Global Rank
                  </p>
                </div>
                <div className="pb-0.5 flex flex-col gap-0.5">
                  <p className="font-mono text-sm text-[var(--muted)]">
                    of {contest.totalParticipants.toLocaleString()}+ participants
                  </p>
                  <p className="font-mono text-xs text-[var(--muted)] opacity-60">
                    Top{" "}
                    {Math.round(
                      (contest.rank / contest.totalParticipants) * 100,
                    )}
                    % globally
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Discipline callout */}
          <div className="border border-[var(--accent-light)] bg-[var(--accent-light)] p-6">
            <p className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-[var(--accent)] mb-2">
              Why it matters
            </p>
            <p className="text-sm leading-7 text-[var(--muted)]">
              Consistent problem-solving practice across algorithms, data
              structures, and competitive contests — the discipline translates
              directly into better production engineering decisions.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

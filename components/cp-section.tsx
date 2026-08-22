import { cpProfile } from "@/data/portfolio";
import { Section } from "@/components/section";

export function CPSection() {
  return (
    <Section
      id="compete"
      number="05"
      label="competitive programming"
      heading="DSA, contests, reps."
      className="bg-[var(--bg-alt)]"
    >
      <div className="reveal border border-[var(--border)] bg-[var(--terminal-bg)] p-6 font-mono text-sm max-w-2xl">
        <div className="text-[var(--accent)]">
          $ competitive-stats --handle nitesh1741
        </div>

        <div className="mt-5 space-y-1">
          <div className="flex gap-8 text-[var(--fg-2)]">
            <span className="text-[var(--accent)] min-w-[14ch]">$ total_solved</span>
            <span className="text-[var(--fg)] font-bold">
              {cpProfile.totalSolved.toLocaleString()}+
            </span>
          </div>
          {cpProfile.platforms.map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-8 text-[var(--fg-2)] hover:text-[var(--accent)] transition-colors"
            >
              <span className="text-[var(--accent)] min-w-[14ch]">
                $ {platform.name.toLowerCase().replace("geeksforgeeks", "gfg")}
              </span>
              <span className="text-[var(--fg)]">
                {platform.solvedCount.toLocaleString()}+ problems
              </span>
              <span className="text-[var(--muted)]">(@{platform.handle})</span>
            </a>
          ))}
        </div>

        <div className="mt-6">
          <div className="text-[var(--muted)] mb-3">notable contests:</div>
          {cpProfile.contests.map((contest) => (
            <div
              key={contest.name}
              className="border-l-2 border-[var(--accent)] pl-4 text-[var(--fg-2)]"
            >
              <div className="text-[var(--fg)]">
                &gt; {contest.name} {contest.year}
              </div>
              <div className="text-[var(--muted)] mt-1">
                Rank {contest.rank.toLocaleString()} /{" "}
                {contest.totalParticipants.toLocaleString()}+ participants
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

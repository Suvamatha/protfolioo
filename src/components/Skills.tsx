import { skills } from "../data/content";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

const accents = ["var(--color-cobalt)", "var(--color-clay)", "var(--color-sage)"];

export function Skills() {
  return (
    <section id="skills" className="border-t border-ink/10 bg-paper-dim/60 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="font-body text-sm font-semibold uppercase tracking-[0.14em] text-ink-faint">
            Skills
          </span>
          <h2 className="mt-4 text-balance font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            What I build with
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
          {skills.map((group, i) => (
            <RevealItem key={group.group}>
              <div className="h-full rounded-2xl border border-ink/10 bg-paper p-6 transition-colors hover:border-ink/25">
                <span
                  className="mb-4 inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: accents[i % accents.length] }}
                  aria-hidden
                />
                <h3 className="font-display text-base font-semibold text-ink">{group.group}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full bg-paper-dim px-3 py-1 font-body text-xs font-medium text-ink-soft"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

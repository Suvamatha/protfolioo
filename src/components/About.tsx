import { profile } from "../data/content";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="about" className="border-t border-ink/10 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-[0.6fr_1.4fr] lg:gap-16">
        <Reveal>
          <span className="font-body text-sm font-semibold uppercase tracking-[0.14em] text-ink-faint">
            About
          </span>
        </Reveal>

        <div>
          <Reveal>
            <p className="text-balance font-display text-2xl font-medium leading-snug text-ink sm:text-3xl">
              {profile.about.intro}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-6 max-w-2xl font-body text-base leading-relaxed text-ink-soft sm:text-lg">
              {profile.about.focus} {profile.about.philosophy}
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {profile.about.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-ink/12 bg-paper-dim px-3.5 py-1.5 font-body text-sm font-medium text-ink-soft"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import { PiGraduationCap } from "react-icons/pi";
import { currentlyExploring, education, experience } from "../data/content";
import { Reveal } from "./Reveal";

export function Experience() {
  return (
    <section id="experience" className="border-t border-ink/10 bg-paper-dim/60 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="font-body text-sm font-semibold uppercase tracking-[0.14em] text-ink-faint">
            Experience
          </span>
          <h2 className="mt-4 text-balance font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Where I've worked
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:gap-16">
          <div className="space-y-10">
            {experience.map((role) => (
              <Reveal key={role.company}>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_auto] sm:items-baseline">
                  <h3 className="font-display text-xl font-semibold text-ink">
                    {role.role} <span className="text-ink-faint">·</span>{" "}
                    <span className="text-cobalt">{role.company}</span>
                  </h3>
                  <span className="font-body text-sm font-medium text-ink-faint">{role.dates}</span>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {role.points.map((point) => (
                    <li key={point} className="flex gap-3 font-body text-sm leading-relaxed text-ink-soft sm:text-base">
                      <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-clay" />
                      {point}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.08}>
            <div className="rounded-2xl border border-ink/10 bg-paper p-6">
              <PiGraduationCap size={22} className="text-cobalt" />
              <h3 className="mt-3 font-display text-base font-semibold text-ink">{education.degree}</h3>
              <p className="mt-1 font-body text-sm text-ink-soft">{education.school}</p>
              <p className="mt-3 font-body text-xs font-medium uppercase tracking-wide text-ink-faint">
                {education.extra}
              </p>

              <div className="mt-6 border-t border-ink/10 pt-6">
                <h4 className="font-body text-xs font-semibold uppercase tracking-wide text-ink-faint">
                  Currently exploring
                </h4>
                <ul className="mt-3 space-y-1.5">
                  {currentlyExploring.map((topic) => (
                    <li key={topic} className="font-body text-sm text-ink-soft">
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import { PiArrowUpRight, PiGithubLogo, PiLinkedinLogo } from "react-icons/pi";
import { profile } from "../data/content";
import { Magnetic } from "./Magnetic";
import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <section id="contact" className="border-t border-ink/10 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <span className="font-body text-sm font-semibold uppercase tracking-[0.14em] text-ink-faint">
            Contact
          </span>
          <h2 className="mt-4 max-w-2xl text-balance font-display text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
            Building something in Flutter? Let's talk it through.
          </h2>
        </Reveal>

        <Reveal delay={0.08} className="mt-10 flex flex-wrap items-center gap-5">
          <Magnetic>
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 font-body text-base font-semibold text-paper transition-colors hover:bg-cobalt"
            >
              {profile.email}
              <PiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Magnetic>
        </Reveal>

        <Reveal delay={0.14} className="mt-8 flex items-center gap-6">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-body text-sm font-semibold text-ink-soft transition-colors hover:text-ink"
          >
            <PiGithubLogo size={20} /> GitHub
          </a>
          <a
            href={profile.linkedin || "#contact"}
            target={profile.linkedin ? "_blank" : undefined}
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-body text-sm font-semibold text-ink-soft transition-colors hover:text-ink"
          >
            <PiLinkedinLogo size={20} /> LinkedIn
          </a>
        </Reveal>
      </div>
    </section>
  );
}

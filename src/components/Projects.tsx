import { PiArrowUpRight, PiLockSimple } from "react-icons/pi";
import { projects } from "../data/content";
import { Reveal } from "./Reveal";
import { FloodVisual, RealEstateVisual, WellspringVisual } from "./ProjectVisuals";

function TechPills({ tech }: { tech: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tech.map((t) => (
        <li
          key={t}
          className="rounded-full border border-ink/10 bg-paper px-3 py-1 font-body text-xs font-medium text-ink-soft"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

function ProjectLink({ link, linkLabel, status }: { link?: string; linkLabel?: string; status?: string }) {
  if (link) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="group inline-flex items-center gap-1.5 font-body text-sm font-semibold text-ink"
      >
        {linkLabel ?? "View project"}
        <PiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-ink-faint">
      <PiLockSimple /> {status === "Private" ? "Private / internship project" : "Not public"}
    </span>
  );
}

export function Projects() {
  const [wellspring, flood, realEstate] = projects;

  return (
    <section id="work" className="border-t border-ink/10 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="font-body text-sm font-semibold uppercase tracking-[0.14em] text-ink-faint">
            Selected projects
          </span>
          <h2 className="mt-4 text-balance font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            A few things I've shipped
          </h2>
        </Reveal>

        {/* Project 1 — featured, asymmetric two-column */}
        <Reveal delay={0.05} className="mt-14 sm:mt-20">
          <article className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
            <div className="order-2 lg:order-1">
              <h3 className="font-display text-2xl font-semibold text-ink sm:text-3xl">{wellspring.name}</h3>
              <p className="mt-3 max-w-xl font-body text-base leading-relaxed text-ink-soft sm:text-lg">
                {wellspring.oneLiner}
              </p>
              <p className="mt-5 max-w-xl font-body text-sm leading-relaxed text-ink-soft">
                <span className="font-semibold text-ink">Why it exists — </span>
                {wellspring.problem}
              </p>
              <p className="mt-3 max-w-xl font-body text-sm leading-relaxed text-ink-soft">
                <span className="font-semibold text-ink">Technical challenge — </span>
                {wellspring.challenge}
              </p>
              <div className="mt-6">
                <TechPills tech={wellspring.tech} />
              </div>
              <div className="mt-6">
                <ProjectLink link={wellspring.link} linkLabel={wellspring.linkLabel} status={wellspring.status} />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <WellspringVisual />
            </div>
          </article>
        </Reveal>

        {/* Project 2 — full-width band with ghost number */}
        <Reveal delay={0.05} className="relative mt-20 border-t border-ink/10 pt-16 sm:mt-28">
          <span
            className="pointer-events-none absolute -top-6 right-0 font-display text-[7rem] font-bold leading-none text-ink/5 sm:text-[10rem]"
            aria-hidden
          >
            02
          </span>
          <article className="relative grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
            <FloodVisual />
            <div>
              <span className="mb-3 inline-block rounded-full bg-cobalt-soft px-3 py-1 font-body text-xs font-semibold uppercase tracking-wide text-cobalt-deep">
                NOSK Hackathon
              </span>
              <h3 className="font-display text-2xl font-semibold text-ink sm:text-3xl">{flood.name}</h3>
              <p className="mt-3 max-w-xl font-body text-base leading-relaxed text-ink-soft sm:text-lg">
                {flood.oneLiner}
              </p>
              <p className="mt-5 max-w-xl font-body text-sm leading-relaxed text-ink-soft">
                <span className="font-semibold text-ink">Technical challenge — </span>
                {flood.challenge}
              </p>
              <div className="mt-6">
                <TechPills tech={flood.tech} />
              </div>
              <div className="mt-6">
                <ProjectLink link={flood.link} linkLabel={flood.linkLabel} status={flood.status} />
              </div>
            </div>
          </article>
        </Reveal>

        {/* Project 3 — compact horizontal row */}
        <Reveal delay={0.05} className="mt-20 border-t border-ink/10 pt-16 sm:mt-28">
          <article className="grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <RealEstateVisual />
            <div className="flex flex-col justify-center">
              <h3 className="font-display text-2xl font-semibold text-ink sm:text-3xl">{realEstate.name}</h3>
              <p className="mt-3 max-w-xl font-body text-base leading-relaxed text-ink-soft sm:text-lg">
                {realEstate.oneLiner}
              </p>
              <p className="mt-5 max-w-xl font-body text-sm leading-relaxed text-ink-soft">
                <span className="font-semibold text-ink">Technical challenge — </span>
                {realEstate.challenge}
              </p>
              <div className="mt-6">
                <TechPills tech={realEstate.tech} />
              </div>
              <div className="mt-6">
                <ProjectLink link={realEstate.link} linkLabel={realEstate.linkLabel} status={realEstate.status} />
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

import { PiArrowUpRight, PiLockSimple } from "react-icons/pi";
import { miniDemos, projects, type Project } from "../data/content";
import { LiveDemoButton, LivePhonePreview } from "./LiveDemo";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import {
  FloodVisual,
  RealEstateVisual,
  WellspringVisual,
} from "./ProjectVisuals";

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

function ProjectLink({
  link,
  linkLabel,
  status,
}: {
  link?: string;
  linkLabel?: string;
  status?: string;
}) {
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
      <PiLockSimple />{" "}
      {status === "Private" ? "Private / internship project" : "Not public"}
    </span>
  );
}

function Actions({ project }: { project: Project }) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
      {project.demo && (
        <LiveDemoButton demo={project.demo} name={project.name} />
      )}
      <ProjectLink
        link={project.link}
        linkLabel={project.linkLabel}
        status={project.status}
      />
    </div>
  );
}

/** Project art with the real, running app beside it. */
function WellspringWithDemo({ project }: { project: Project }) {
  if (!project.demo) return <WellspringVisual />;
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-2 overflow-hidden rounded-2xl bg-sage-soft py-8 pr-6 sm:py-10 sm:pr-10">
      <div className="hidden xs:block">
        <WellspringVisual />
      </div>
      <LivePhonePreview demo={project.demo} name={project.name} className="col-span-2 mx-auto w-[210px] xs:col-span-1 sm:w-[230px]" />
    </div>
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
              <h3 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                {wellspring.name}
              </h3>
              <p className="mt-3 max-w-xl font-body text-base leading-relaxed text-ink-soft sm:text-lg">
                {wellspring.oneLiner}
              </p>
              <p className="mt-5 max-w-xl font-body text-sm leading-relaxed text-ink-soft">
                <span className="font-semibold text-ink">Why it exists — </span>
                {wellspring.problem}
              </p>
              <p className="mt-3 max-w-xl font-body text-sm leading-relaxed text-ink-soft">
                <span className="font-semibold text-ink">
                  Technical challenge —{" "}
                </span>
                {wellspring.challenge}
              </p>
              <div className="mt-6">
                <TechPills tech={wellspring.tech} />
              </div>
              <Actions project={wellspring} />
            </div>
            <div className="order-1 lg:order-2">
              <WellspringWithDemo project={wellspring} />
            </div>
          </article>
        </Reveal>

        {/* Project 2 — full-width band with ghost number */}
        <Reveal
          delay={0.05}
          className="relative mt-20 border-t border-ink/10 pt-16 sm:mt-28"
        >
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
              <h3 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                {flood.name}
              </h3>
              <p className="mt-3 max-w-xl font-body text-base leading-relaxed text-ink-soft sm:text-lg">
                {flood.oneLiner}
              </p>
              <p className="mt-5 max-w-xl font-body text-sm leading-relaxed text-ink-soft">
                <span className="font-semibold text-ink">
                  Technical challenge —{" "}
                </span>
                {flood.challenge}
              </p>
              <div className="mt-6">
                <TechPills tech={flood.tech} />
              </div>
              <Actions project={flood} />
            </div>
          </article>
        </Reveal>

        {/* Project 3 — compact horizontal row */}
        <Reveal
          delay={0.05}
          className="mt-20 border-t border-ink/10 pt-16 sm:mt-28"
        >
          <article className="grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <RealEstateVisual />
            <div className="flex flex-col justify-center">
              <h3 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                {realEstate.name}
              </h3>
              <p className="mt-3 max-w-xl font-body text-base leading-relaxed text-ink-soft sm:text-lg">
                {realEstate.oneLiner}
              </p>
              <p className="mt-5 max-w-xl font-body text-sm leading-relaxed text-ink-soft">
                <span className="font-semibold text-ink">
                  Technical challenge —{" "}
                </span>
                {realEstate.challenge}
              </p>
              <div className="mt-6">
                <TechPills tech={realEstate.tech} />
              </div>
              <Actions project={realEstate} />
            </div>
          </article>
        </Reveal>

        {/* Playable mini apps, hosted by FlutterShow */}
        {miniDemos.length > 0 && (
          <div className="mt-20 border-t border-ink/10 pt-16 sm:mt-28">
            <Reveal className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="font-body text-sm font-semibold uppercase tracking-[0.14em] text-ink-faint">
                  Playground
                </span>
                <h3 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
                  Smaller apps you can play with
                </h3>
              </div>
              <p className="max-w-sm font-body text-sm leading-relaxed text-ink-soft">
                Real Flutter Web builds from my repos — tap a phone to use the
                app right here.
              </p>
            </Reveal>
            <RevealGroup
              className="mt-10 grid grid-cols-2 gap-6 sm:gap-10 md:grid-cols-4"
              stagger={0.1}
            >
              {miniDemos.map((m) => (
                <RevealItem key={m.demo.id} className="flex flex-col">
                  <LivePhonePreview
                    demo={m.demo}
                    name={m.name}
                    compact
                    className="w-full"
                  />
                  <div className="mt-5 flex items-start justify-between gap-2 px-1">
                    <div>
                      <p className="font-display text-base font-semibold text-ink">
                        {m.name}
                      </p>
                      <p className="mt-0.5 font-body text-xs text-ink-soft">
                        {m.blurb}
                      </p>
                    </div>
                    <a
                      href={m.repo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${m.name} on GitHub`}
                      className="mt-0.5 text-ink-faint transition-colors hover:text-ink"
                    >
                      <PiArrowUpRight />
                    </a>
                  </div>
                </RevealItem>
              ))}
              <RevealItem className="col-span-2 flex flex-col justify-center rounded-2xl border border-dashed border-ink/15 bg-paper-dim/60 p-6 md:col-span-2">
                <span className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-cobalt">
                  How these run
                </span>
                <p className="mt-3 font-display text-xl font-semibold leading-snug text-ink">
                  Every demo is built by FlutterShow — a tool I made that turns
                  a Flutter GitHub repo into a hosted, shareable phone demo.
                </p>
                <p className="mt-3 font-body text-sm leading-relaxed text-ink-soft">
                  Paste a repo → it runs{" "}
                  <code className="rounded bg-paper px-1 font-mono text-xs">
                    flutter build web
                  </code>
                  , hosts the result and gives a link that stays the same across
                  rebuilds.
                </p>
              </RevealItem>
            </RevealGroup>
          </div>
        )}
      </div>
    </section>
  );
}

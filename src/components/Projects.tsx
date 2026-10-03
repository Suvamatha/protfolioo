import { PiArrowUpRight, PiLockSimple } from "react-icons/pi";
import { fluttershow, projects, type Project } from "../data/content";
import { ComingSoonPhone, LiveDemoButton, LivePhonePreview, ScreenshotPhone, useDemos, useProjectDemo } from "./LiveDemo";
import { FloodVisual, RealEstateVisual, WellspringVisual } from "./ProjectVisuals";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

/*
 * Every project in content.ts renders with the same layout: text on one side,
 * a phone on the other. The phone shows, in order of preference:
 *   1. the live FlutterShow demo (auto-found by the project's GitHub repo)
 *   2. real screenshots you listed in `screenshots`
 *   3. an honest "demo coming soon" screen
 */

const VISUALS = {
  wellspring: { Art: WellspringVisual, bg: "bg-sage-soft", accent: "var(--color-sage)" },
  flood: { Art: FloodVisual, bg: "bg-cobalt-soft", accent: "var(--color-cobalt)" },
  realEstate: { Art: RealEstateVisual, bg: "bg-clay-soft", accent: "var(--color-clay)" },
} as const;
const ORDER = ["wellspring", "flood", "realEstate"] as const;

function TechPills({ tech }: { tech: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tech.map((t) => (
        <li key={t} className="rounded-full border border-ink/10 bg-paper px-3 py-1 font-body text-xs font-medium text-ink-soft">
          {t}
        </li>
      ))}
    </ul>
  );
}

function ProjectLink({ project }: { project: Project }) {
  const href = project.link || project.repo;
  if (href && project.status !== "Private") {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1.5 font-body text-sm font-semibold text-ink">
        {project.linkLabel ?? "View project"}
        <PiArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-ink-faint">
      <PiLockSimple /> {project.status === "Private" ? "Private / internship project" : "Not public"}
    </span>
  );
}

function Showcase({ project, index }: { project: Project; index: number }) {
  const demo = useProjectDemo(project);
  const v = VISUALS[project.visual || ORDER[index % ORDER.length]];
  const shots = project.screenshots?.filter(Boolean) || [];
  const phoneCls = "col-span-2 mx-auto w-[210px] xs:col-span-1 sm:w-[230px]";

  let phone;
  if (demo) phone = <LivePhonePreview demo={demo} className={phoneCls} />;
  else if (shots.length) phone = <ScreenshotPhone images={shots} name={project.name} className={phoneCls} />;
  else
    phone = (
      <ComingSoonPhone
        name={project.name}
        accent={v.accent}
        className={phoneCls}
        note={project.status === "Private" ? "Built for a client during my internship — the code and app are private." : "Live demo coming soon."}
      />
    );

  return (
    <div className={`grid grid-cols-[1fr_auto] items-center gap-2 overflow-hidden rounded-2xl py-8 pr-6 sm:py-10 sm:pr-10 ${v.bg}`}>
      <div className="hidden self-stretch xs:block [&>div]:h-full [&>div]:rounded-none [&>div]:bg-transparent">
        <v.Art />
      </div>
      {phone}
    </div>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const demo = useProjectDemo(project);
  const flip = index % 2 === 1;
  return (
    <Reveal delay={0.05} className={`relative ${index > 0 ? "mt-20 border-t border-ink/10 pt-16 sm:mt-28" : "mt-14 sm:mt-20"}`}>
      {index > 0 && (
        <span
          className={`pointer-events-none absolute -top-6 font-display text-[7rem] font-bold leading-none text-ink/5 sm:text-[10rem] ${flip ? "right-0" : "left-0"}`}
          aria-hidden
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      )}
      <article className={`relative grid grid-cols-1 gap-8 lg:items-center lg:gap-14 ${flip ? "lg:grid-cols-[0.9fr_1.1fr]" : "lg:grid-cols-[1.1fr_0.9fr]"}`}>
        <div className={flip ? "lg:order-2" : "order-2 lg:order-1"}>
          {project.badge && (
            <span className="mb-3 inline-block rounded-full bg-cobalt-soft px-3 py-1 font-body text-xs font-semibold uppercase tracking-wide text-cobalt-deep">
              {project.badge}
            </span>
          )}
          <h3 className="font-display text-2xl font-semibold text-ink sm:text-3xl">{project.name}</h3>
          <p className="mt-3 max-w-xl font-body text-base leading-relaxed text-ink-soft sm:text-lg">{project.oneLiner}</p>
          {project.problem && (
            <p className="mt-5 max-w-xl font-body text-sm leading-relaxed text-ink-soft">
              <span className="font-semibold text-ink">Why it exists — </span>
              {project.problem}
            </p>
          )}
          <p className="mt-3 max-w-xl font-body text-sm leading-relaxed text-ink-soft">
            <span className="font-semibold text-ink">Technical challenge — </span>
            {project.challenge}
          </p>
          <div className="mt-6">
            <TechPills tech={project.tech} />
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            {demo && <LiveDemoButton demo={demo} />}
            <ProjectLink project={project} />
          </div>
        </div>
        <div className={flip ? "lg:order-1" : "order-1 lg:order-2"}>
          <Showcase project={project} index={index} />
        </div>
      </article>
    </Reveal>
  );
}

/** Every other FlutterShow demo appears here automatically. */
function Playground() {
  const { demos } = useDemos();
  const featured = new Set(projects.flatMap((p) => [p.repo, p.link].filter(Boolean).map((u) => u!.toLowerCase().replace(/\/$/, ""))));
  const hidden = new Set(fluttershow.hideFromPlayground.map((u) => u.toLowerCase().replace(/\/$/, "")));
  const rest = demos.filter((d) => !featured.has(d.repo.toLowerCase()) && !hidden.has(d.repo.toLowerCase()));
  if (!fluttershow.playground || rest.length === 0) return null;

  return (
    <div className="mt-20 border-t border-ink/10 pt-16 sm:mt-28">
      <Reveal className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="font-body text-sm font-semibold uppercase tracking-[0.14em] text-ink-faint">Playground</span>
          <h3 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">Smaller apps you can play with</h3>
        </div>
        <p className="max-w-sm font-body text-sm leading-relaxed text-ink-soft">Real Flutter Web builds from my repos — tap a phone to use the app right here.</p>
      </Reveal>
      <RevealGroup className="mt-10 grid grid-cols-2 gap-6 sm:gap-10 md:grid-cols-4" stagger={0.1}>
        {rest.map((d) => (
          <RevealItem key={d.id} className="flex flex-col">
            <LivePhonePreview demo={d} tilt={false} className="w-full" />
            <div className="mt-5 flex items-start justify-between gap-2 px-1">
              <div className="min-w-0">
                <p className="font-display text-base font-semibold text-ink">{d.name}</p>
                {d.description && <p className="mt-0.5 line-clamp-2 font-body text-xs text-ink-soft">{d.description}</p>}
              </div>
              <a href={d.repo} target="_blank" rel="noreferrer" aria-label={`${d.name} on GitHub`} className="mt-0.5 text-ink-faint transition-colors hover:text-ink">
                <PiArrowUpRight />
              </a>
            </div>
          </RevealItem>
        ))}
        <RevealItem className="col-span-2 flex flex-col justify-center rounded-2xl border border-dashed border-ink/15 bg-paper-dim/60 p-6">
          <span className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-cobalt">How these run</span>
          <p className="mt-3 font-display text-xl font-semibold leading-snug text-ink">
            Every demo is built by FlutterShow — a tool I made that turns a Flutter GitHub repo into a hosted, shareable phone demo.
          </p>
          <a href={fluttershow.url} target="_blank" rel="noreferrer" className="group mt-4 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-ink">
            Open FlutterShow <PiArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </RevealItem>
      </RevealGroup>
    </div>
  );
}

export function Projects() {
  return (
    <section id="work" className="border-t border-ink/10 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="font-body text-sm font-semibold uppercase tracking-[0.14em] text-ink-faint">Selected projects</span>
          <h2 className="mt-4 text-balance font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">A few things I've shipped</h2>
        </Reveal>
        {projects.map((p, i) => (
          <ProjectRow key={p.name} project={p} index={i} />
        ))}
        <Playground />
      </div>
    </section>
  );
}

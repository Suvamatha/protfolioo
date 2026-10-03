import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { PiArrowClockwise, PiArrowUpRight, PiCheck, PiCopySimple, PiGithubLogo, PiHandTap, PiPlayFill, PiX } from "react-icons/pi";
import { fluttershow, type Project } from "../data/content";

/* ─────────────────────────────── data: FlutterShow builds ─────────────── */

export type Demo = {
  id: string;
  name: string;
  description?: string;
  repo: string;
  appUrl: string;
  shareUrl: string;
  background: string;
  statusBar: "light" | "dark";
};

type Build = {
  slug?: string;
  repositoryUrl: string;
  demoUrl: string;
  name?: string;
  description?: string;
  private?: boolean;
  chrome?: { background?: string; foreground?: "light" | "dark" };
};

const base = fluttershow.url.replace(/\/$/, "");
const norm = (u = "") => u.trim().replace(/\.git$/, "").replace(/\/$/, "").toLowerCase();
const titleCase = (s: string) =>
  s.replace(/[-_]+/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").replace(/\b\w/g, (c) => c.toUpperCase()).trim();

function toDemo(b: Build): Demo {
  const id = b.slug || b.demoUrl.split("/").filter(Boolean).pop()!;
  return {
    id,
    name: b.name || titleCase(b.repositoryUrl.split("/").pop() || id),
    description: b.description,
    repo: b.repositoryUrl,
    appUrl: base + b.demoUrl,
    shareUrl: `${base}/d/${id}`,
    background: b.chrome?.background || "#ffffff",
    statusBar: b.chrome?.foreground === "light" ? "light" : "dark",
  };
}

type Ctx = { demos: Demo[]; ready: boolean; open: (d: Demo) => void };
const DemoCtx = createContext<Ctx>({ demos: [], ready: false, open: () => {} });

/** Live demo for a project: explicit demoId, else matched by GitHub repo. */
export function useProjectDemo(p: Pick<Project, "repo" | "link" | "demoId">) {
  const { demos } = useContext(DemoCtx);
  return demos.find((d) => (p.demoId ? d.id === p.demoId : [p.repo, p.link].some((u) => u && norm(u) === norm(d.repo)))) || null;
}
export const useDemos = () => useContext(DemoCtx);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [demos, setDemos] = useState<Demo[]>([]);
  const [ready, setReady] = useState(false);
  const [current, setCurrent] = useState<Demo | null>(null);

  useEffect(() => {
    // Only trust a real FlutterShow registry (JSON with builds) — never embed
    // a random page (e.g. this portfolio's own dev server).
    fetch(`${base}/demos/index.json`, { cache: "no-store" })
      .then((r) => (r.ok && r.headers.get("content-type")?.includes("json") ? r.json() : { builds: [] }))
      .then((d: { builds?: Build[] }) => setDemos((d.builds || []).filter((b) => b.demoUrl && b.repositoryUrl).map(toDemo)))
      .catch(() => setDemos([]))
      .finally(() => setReady(true));
  }, []);

  const open = useCallback((d: Demo) => setCurrent(d), []);
  const value = useMemo(() => ({ demos, ready, open }), [demos, ready, open]);
  return (
    <DemoCtx.Provider value={value}>
      {children}
      <AnimatePresence>{current && <DemoModal key={current.id} demo={current} onClose={() => setCurrent(null)} />}</AnimatePresence>
    </DemoCtx.Provider>
  );
}

/* ─────────────────────────────────────────────────────── phone ────────── */

function StatusBar({ tone = "dark" }: { tone?: "light" | "dark" }) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 top-0 z-20 flex h-8 items-center justify-between px-6 font-body text-[11px] font-semibold ${tone === "light" ? "text-white" : "text-ink"}`}
    >
      <span>9:41</span>
      <span className="flex items-center gap-1">
        <span className="flex items-end gap-[2px]">
          {[4, 6, 8, 10].map((h) => (
            <span key={h} className="w-[3px] rounded-[1px] bg-current" style={{ height: h }} />
          ))}
        </span>
        <span className="ml-1 h-[10px] w-[20px] rounded-[3px] border border-current p-[1.5px]">
          <span className="block h-full w-3/4 rounded-[1px] bg-current" />
        </span>
      </span>
    </div>
  );
}

export function Phone({
  children,
  background = "#fff",
  statusBar = "dark",
  className = "",
}: {
  children: ReactNode;
  background?: string;
  statusBar?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-[2.6rem] bg-ink p-[9px] shadow-[0_40px_80px_-30px_rgba(23,22,27,0.55),inset_0_0_0_1.5px_rgba(255,255,255,0.08)] ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[2.1rem]" style={{ background }}>
        <StatusBar tone={statusBar} />
        <div className="pointer-events-none absolute left-1/2 top-2 z-30 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-ink" />
        <div className="absolute inset-x-0 bottom-0 top-8">{children}</div>
        <div className="pointer-events-none absolute bottom-1.5 left-1/2 z-30 h-1 w-24 -translate-x-1/2 rounded-full bg-ink/25" />
      </div>
    </div>
  );
}

/** Flutter needs a real viewport, so render at phone width and scale down. */
const APP_W = 390;
function ScaledFrame({ src, title, onLoad }: { src: string; title: string; onLoad?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ scale: 0.6, h: 800 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const scale = e.contentRect.width / APP_W;
      setSize({ scale, h: Math.round(e.contentRect.height / scale) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <iframe
        src={src}
        title={title}
        tabIndex={-1}
        loading="lazy"
        onLoad={onLoad}
        className="pointer-events-none origin-top-left border-0"
        style={{ width: APP_W, height: size.h, transform: `scale(${size.scale})` }}
      />
    </div>
  );
}

function Loader({ light }: { light?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3">
      <span className="h-7 w-7 animate-spin rounded-full border-2 border-cobalt/20 border-t-cobalt" />
      <span className={`font-body text-[11px] ${light ? "text-white/70" : "text-ink-faint"}`}>Starting Flutter…</span>
    </div>
  );
}

function LiveBadge({ label = "Live" }: { label?: string }) {
  return (
    <span className="absolute -right-2 top-8 z-30 inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-paper px-2.5 py-1 font-body text-[10px] font-bold uppercase tracking-[0.12em] text-ink shadow-md">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-clay opacity-70" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-clay" />
      </span>
      {label}
    </span>
  );
}

/* ─────────────────────────────────── live preview (click to play) ─────── */

export function LivePhonePreview({ demo, className = "", tilt = true }: { demo: Demo; className?: string; tilt?: boolean }) {
  const ref = useRef<HTMLButtonElement>(null);
  const inView = useInView(ref, { once: true, margin: "200px" });
  const [loaded, setLoaded] = useState(false);
  const { open } = useDemos();
  const reduce = useReducedMotion();

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={() => open(demo)}
      whileHover={reduce ? undefined : { y: -6, rotate: tilt ? -1.2 : 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`group relative block cursor-pointer text-left ${className}`}
      aria-label={`Open the live ${demo.name} demo`}
    >
      <Phone background={demo.background} statusBar={demo.statusBar} className="aspect-[390/820] w-full">
        {inView && <ScaledFrame src={demo.appUrl} title={`${demo.name} preview`} onLoad={() => setTimeout(() => setLoaded(true), 900)} />}
        {!loaded && <Loader light={demo.statusBar === "light"} />}
      </Phone>
      <span className="pointer-events-none absolute inset-[9px] flex items-end justify-center rounded-[2.1rem] bg-gradient-to-t from-ink/55 via-ink/0 to-ink/0 pb-7 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        <span className="inline-flex translate-y-2 items-center gap-2 rounded-full bg-paper px-4 py-2 font-body text-xs font-semibold text-ink shadow-lg transition-transform duration-300 group-hover:translate-y-0">
          <PiHandTap size={15} /> Try it live
        </span>
      </span>
      <LiveBadge />
    </motion.button>
  );
}

/** Real screenshots playing in the phone (for private / not-yet-public apps). */
export function ScreenshotPhone({ images, name, className = "" }: { images: string[]; name: string; className?: string }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (images.length < 2 || reduce) return;
    const t = setInterval(() => setI((x) => (x + 1) % images.length), 3200);
    return () => clearInterval(t);
  }, [images.length, reduce]);
  return (
    <div className={`relative ${className}`}>
      <Phone className="aspect-[390/820] w-full">
        <AnimatePresence initial={false}>
          <motion.img
            key={images[i]}
            src={images[i]}
            alt={`${name} screenshot ${i + 1}`}
            className="absolute inset-0 h-full w-full object-cover object-top"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        </AnimatePresence>
        {images.length > 1 && (
          <div className="absolute inset-x-0 bottom-5 z-10 flex justify-center gap-1.5">
            {images.map((src, k) => (
              <button
                key={src}
                onClick={() => setI(k)}
                aria-label={`Screenshot ${k + 1}`}
                className={`h-1.5 rounded-full transition-all ${k === i ? "w-5 bg-ink" : "w-1.5 bg-ink/30"}`}
              />
            ))}
          </div>
        )}
      </Phone>
      <LiveBadge label="Screens" />
    </div>
  );
}

/** Honest placeholder when there's no demo or screenshots yet. */
export function ComingSoonPhone({ name, note, accent, className = "" }: { name: string; note: string; accent: string; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <Phone className="aspect-[390/820] w-full" background="var(--color-paper)">
        <div className="flex h-full flex-col items-center justify-center px-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-[1.25rem] font-display text-2xl font-bold text-paper shadow-lg" style={{ background: accent }}>
            {name.charAt(0)}
          </div>
          <p className="mt-4 font-display text-base font-semibold leading-tight text-ink">{name}</p>
          <p className="mt-2 font-body text-[11px] leading-relaxed text-ink-faint">{note}</p>
        </div>
      </Phone>
    </div>
  );
}

/* ───────────────────────────────────────────────────── button ─────────── */

export function LiveDemoButton({ demo }: { demo: Demo }) {
  const { open } = useDemos();
  return (
    <button
      type="button"
      onClick={() => open(demo)}
      className="group inline-flex items-center gap-2 rounded-full bg-ink py-2 pl-2 pr-4 font-body text-sm font-semibold text-paper transition-colors hover:bg-cobalt"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-paper/15 transition-transform group-hover:scale-110">
        <PiPlayFill size={11} />
      </span>
      Try live demo
    </button>
  );
}

/* ───────────────────────────────────────────────────── modal ──────────── */

function DemoModal({ demo, onClose }: { demo: Demo; onClose: () => void }) {
  const reduce = useReducedMotion();
  const [loaded, setLoaded] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(demo.shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked — link is visible */
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${demo.name} live demo`}
    >
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-md" onClick={onClose} />
      <motion.div
        className="relative flex max-h-full w-full max-w-4xl flex-col items-center gap-6 overflow-y-auto rounded-[2rem] bg-paper p-4 shadow-2xl sm:p-8 lg:flex-row lg:justify-center lg:gap-12"
        initial={{ y: reduce ? 0 : 40, scale: reduce ? 1 : 0.96, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: reduce ? 0 : 24, scale: reduce ? 1 : 0.98, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-40 flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-paper text-ink-soft transition-colors hover:text-ink"
          aria-label="Close demo"
        >
          <PiX size={18} />
        </button>

        <Phone background={demo.background} statusBar={demo.statusBar} className="aspect-[390/820] h-[min(62svh,720px)] w-auto shrink-0 lg:h-[min(74vh,720px)]">
          <iframe
            key={reloadKey}
            src={demo.appUrl}
            title={`${demo.name} — interactive demo`}
            onLoad={() => setTimeout(() => setLoaded(true), 700)}
            className="h-full w-full border-0"
            allow="clipboard-write"
          />
          {!loaded && (
            <div className="absolute inset-0" style={{ background: demo.background }}>
              <Loader light={demo.statusBar === "light"} />
            </div>
          )}
        </Phone>

        <div className="w-full max-w-sm pb-2 lg:pb-0">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cobalt-soft px-3 py-1 font-body text-[11px] font-bold uppercase tracking-[0.12em] text-cobalt-deep">
            <span className="h-1.5 w-1.5 rounded-full bg-cobalt" /> Live Flutter Web build
          </span>
          <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink">{demo.name}</h3>
          <p className="mt-3 font-body text-sm leading-relaxed text-ink-soft">
            {demo.description ? `${demo.description} ` : ""}This is the real app compiled from its GitHub repo — tap, scroll and navigate inside the phone.
          </p>
          <div className="mt-6 flex items-center gap-2 rounded-xl border border-ink/10 bg-paper-dim p-1.5 pl-3">
            <span className="min-w-0 flex-1 truncate font-mono text-xs text-ink-soft">{demo.shareUrl.replace(/^https?:\/\//, "")}</span>
            <button onClick={copy} className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-paper px-3 py-1.5 font-body text-xs font-semibold text-ink shadow-sm">
              {copied ? <PiCheck className="text-sage" /> : <PiCopySimple />} {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={demo.shareUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 font-body text-sm font-semibold text-paper transition-colors hover:bg-cobalt"
            >
              Open full demo <PiArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <button
              onClick={() => {
                setLoaded(false);
                setReloadKey((k) => k + 1);
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-4 py-2.5 font-body text-sm font-semibold text-ink transition-colors hover:border-ink/40"
            >
              <PiArrowClockwise /> Restart
            </button>
            <a
              href={demo.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-2.5 font-body text-sm font-semibold text-ink-soft transition-colors hover:text-ink"
            >
              <PiGithubLogo /> Code
            </a>
          </div>
          <p className="mt-6 font-body text-xs text-ink-faint">Hosted with FlutterShow — my tool that turns a Flutter repo into a shareable demo.</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import {
  PiArrowClockwise,
  PiArrowUpRight,
  PiCheck,
  PiCopySimple,
  PiGithubLogo,
  PiHandTap,
  PiPlayFill,
  PiWifiSlash,
  PiX,
} from "react-icons/pi";
import { fluttershow, type Demo } from "../data/content";

/* ------------------------------------------------------------------ urls */

const base = fluttershow.url.replace(/\/$/, "");
export const demoAppUrl = (d: Demo) => `${base}/demos/${d.id}/`;
export const demoShareUrl = (d: Demo) => `${base}/d/${d.id}`;

/** Resolves true when the FlutterShow host serving this demo is reachable. */
const reach = new Map<string, Promise<boolean>>();
function useReachable(d: Demo, enabled = true) {
  const [state, setState] = useState<"checking" | "ok" | "offline">("checking");
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    let alive = true;
    setState("checking");
    const key = `${d.id}:${attempt}`;
    if (!reach.has(key)) {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 8000);
      reach.set(
        key,
        fetch(demoAppUrl(d), {
          mode: "no-cors",
          signal: ctrl.signal,
          cache: "no-store",
        })
          .then(() => true)
          .catch(() => false)
          .finally(() => clearTimeout(t)),
      );
    }
    reach.get(key)!.then((ok) => alive && setState(ok ? "ok" : "offline"));
    return () => {
      alive = false;
    };
  }, [d, enabled, attempt]);
  return { state, retry: () => setAttempt((a) => a + 1) };
}

/* ---------------------------------------------------------------- phone */

function StatusBar({ tone = "dark" }: { tone?: "light" | "dark" }) {
  const c = tone === "light" ? "text-white" : "text-ink";
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 top-0 z-20 flex h-8 items-center justify-between px-6 font-body text-[11px] font-semibold ${c}`}
    >
      <span>9:41</span>
      <span className="flex items-center gap-1">
        <span className="flex items-end gap-[2px]">
          {[4, 6, 8, 10].map((h) => (
            <span
              key={h}
              className="w-[3px] rounded-[1px] bg-current"
              style={{ height: h }}
            />
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
  demo,
  className = "",
}: {
  children: ReactNode;
  demo: Demo;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-[2.6rem] bg-ink p-[9px] shadow-[0_40px_80px_-30px_rgba(23,22,27,0.55),inset_0_0_0_1.5px_rgba(255,255,255,0.08)] ${className}`}
    >
      <div
        className="relative h-full w-full overflow-hidden rounded-[2.1rem]"
        style={{ background: demo.background ?? "#fff" }}
      >
        <StatusBar tone={demo.statusBar} />
        <div className="pointer-events-none absolute left-1/2 top-2 z-30 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-ink" />
        <div className="absolute inset-x-0 bottom-0 top-8">{children}</div>
        <div className="pointer-events-none absolute bottom-1.5 left-1/2 z-30 h-1 w-24 -translate-x-1/2 rounded-full bg-ink/25" />
      </div>
    </div>
  );
}

/** Flutter needs a real viewport, so we render at phone size and scale down. */
const APP_W = 390;

function ScaledFrame({
  src,
  title,
  onLoad,
}: {
  src: string;
  title: string;
  onLoad?: () => void;
}) {
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

function Shimmer() {
  return (
    <div className="absolute inset-0 flex flex-col gap-3 p-5 pt-6">
      {[60, 90, 75, 40, 85].map((w, i) => (
        <div
          key={i}
          className="h-3 animate-pulse rounded-full bg-ink/8"
          style={{ width: `${w}%`, animationDelay: `${i * 120}ms` }}
        />
      ))}
      <div className="mt-2 h-28 animate-pulse rounded-2xl bg-ink/6" />
    </div>
  );
}

/* ---------------------------------------------------- live card preview */

/**
 * A phone running the real app (non-interactive thumbnail). Loads only when
 * scrolled into view. Click → opens the interactive demo.
 */
export function LivePhonePreview({
  demo,
  name,
  className = "",
  compact = false,
}: {
  demo: Demo;
  name: string;
  className?: string;
  compact?: boolean;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const inView = useInView(ref, { once: true, margin: "200px" });
  const { state } = useReachable(demo, inView);
  const [loaded, setLoaded] = useState(false);
  const open = useDemoModal();
  const reduce = useReducedMotion();

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={() => open({ demo, name })}
      whileHover={reduce ? undefined : { y: -6, rotate: compact ? 0 : -1.2 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`group relative block cursor-pointer text-left ${className}`}
      aria-label={`Open the live ${name} demo`}
    >
      <Phone demo={demo} className="aspect-[390/820] w-full">
        {inView && state === "ok" && (
          <ScaledFrame
            src={demoAppUrl(demo)}
            title={`${name} preview`}
            onLoad={() => setTimeout(() => setLoaded(true), 900)}
          />
        )}
        {(!loaded || state !== "ok") && state !== "offline" && <Shimmer />}
        {state === "offline" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
            <PiPlayFill className="text-cobalt" size={compact ? 22 : 28} />
            <p className="font-display text-sm font-semibold text-ink">
              {name}
            </p>
            <p className="font-body text-[11px] leading-snug text-ink-faint">
              Tap to open the live demo
            </p>
          </div>
        )}
      </Phone>

      {/* Hover overlay */}
      <span className="pointer-events-none absolute inset-[9px] flex items-end justify-center rounded-[2.1rem] bg-gradient-to-t from-ink/55 via-ink/0 to-ink/0 pb-7 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        <span className="inline-flex translate-y-2 items-center gap-2 rounded-full bg-paper px-4 py-2 font-body text-xs font-semibold text-ink shadow-lg transition-transform duration-300 group-hover:translate-y-0">
          <PiHandTap size={15} /> Try it live
        </span>
      </span>

      {/* "Live" badge */}
      <span className="absolute -right-2 top-8 z-30 inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-paper px-2.5 py-1 font-body text-[10px] font-bold uppercase tracking-[0.12em] text-ink shadow-md">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-clay opacity-70" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-clay" />
        </span>
        Live
      </span>
    </motion.button>
  );
}

/* ---------------------------------------------------------------- button */

export function LiveDemoButton({ demo, name }: { demo: Demo; name: string }) {
  const open = useDemoModal();
  return (
    <button
      type="button"
      onClick={() => open({ demo, name })}
      className="group inline-flex items-center gap-2 rounded-full bg-ink py-2 pl-2 pr-4 font-body text-sm font-semibold text-paper transition-colors hover:bg-cobalt"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-paper/15 transition-transform group-hover:scale-110">
        <PiPlayFill size={11} />
      </span>
      Try live demo
    </button>
  );
}

/* ----------------------------------------------------------------- modal */

type Open = { demo: Demo; name: string; repo?: string };
const Ctx = createContext<(o: Open) => void>(() => {});
export const useDemoModal = () => useContext(Ctx);

export function DemoModalProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<Open | null>(null);
  const open = useCallback((o: Open) => setCurrent(o), []);
  return (
    <Ctx.Provider value={open}>
      {children}
      <AnimatePresence>
        {current && (
          <DemoModal
            key={current.demo.id}
            {...current}
            onClose={() => setCurrent(null)}
          />
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}

function DemoModal({ demo, name, onClose }: Open & { onClose: () => void }) {
  const reduce = useReducedMotion();
  const { state, retry } = useReachable(demo);
  const [loaded, setLoaded] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [copied, setCopied] = useState(false);
  const share = demoShareUrl(demo);

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
      await navigator.clipboard.writeText(share);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked — the link is still visible */
    }
  }

  function reload() {
    setLoaded(false);
    setReloadKey((k) => k + 1);
    if (state === "offline") retry();
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
      aria-label={`${name} live demo`}
    >
      <div
        className="absolute inset-0 bg-ink/60 backdrop-blur-md"
        onClick={onClose}
      />

      <motion.div
        className="relative flex max-h-full w-full max-w-4xl flex-col items-center gap-6 lg:justify-center overflow-y-auto rounded-[2rem] bg-paper p-4 shadow-2xl sm:p-8 lg:flex-row lg:items-center lg:gap-12"
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

        {/* Interactive phone */}
        <Phone
          demo={demo}
          className="h-[min(62svh,720px)] lg:h-[min(74vh,720px)] w-auto shrink-0 aspect-[390/820]"
        >
          {state === "ok" && (
            <iframe
              key={reloadKey}
              src={demoAppUrl(demo)}
              title={`${name} — interactive demo`}
              onLoad={() => setTimeout(() => setLoaded(true), 700)}
              className="h-full w-full border-0"
              allow="clipboard-write"
            />
          )}
          {state !== "offline" && !loaded && (
            <div
              className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3"
              style={{ background: demo.background ?? "#fff" }}
            >
              <span className="h-8 w-8 animate-spin rounded-full border-2 border-cobalt/20 border-t-cobalt" />
              <span
                className={`font-body text-xs ${demo.statusBar === "light" ? "text-white/70" : "text-ink-faint"}`}
              >
                Starting Flutter…
              </span>
            </div>
          )}
          {state === "offline" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-paper px-8 text-center">
              <PiWifiSlash size={28} className="text-clay" />
              <p className="font-display text-base font-semibold text-ink">
                Demo server not reachable
              </p>
              <p className="font-body text-xs leading-relaxed text-ink-soft">
                The FlutterShow host at{" "}
                <span className="font-semibold">
                  {base.replace(/^https?:\/\//, "")}
                </span>{" "}
                didn't respond.
              </p>
              <button
                onClick={reload}
                className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 font-body text-xs font-semibold text-paper"
              >
                <PiArrowClockwise /> Try again
              </button>
            </div>
          )}
        </Phone>

        {/* Info */}
        <div className="w-full max-w-sm pb-2 lg:pb-0">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cobalt-soft px-3 py-1 font-body text-[11px] font-bold uppercase tracking-[0.12em] text-cobalt-deep">
            <span className="h-1.5 w-1.5 rounded-full bg-cobalt" /> Live Flutter
            Web build
          </span>
          <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink">
            {name}
          </h3>
          <p className="mt-3 font-body text-sm leading-relaxed text-ink-soft">
            This is the real app compiled from its GitHub repo — tap, scroll and
            navigate inside the phone just like on a device.
          </p>

          <div className="mt-6 flex items-center gap-2 rounded-xl border border-ink/10 bg-paper-dim p-1.5 pl-3">
            <span className="min-w-0 flex-1 truncate font-mono text-xs text-ink-soft">
              {share.replace(/^https?:\/\//, "")}
            </span>
            <button
              onClick={copy}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-paper px-3 py-1.5 font-body text-xs font-semibold text-ink shadow-sm"
            >
              {copied ? <PiCheck className="text-sage" /> : <PiCopySimple />}{" "}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={share}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 font-body text-sm font-semibold text-paper transition-colors hover:bg-cobalt"
            >
              Open full demo{" "}
              <PiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <button
              onClick={reload}
              className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-4 py-2.5 font-body text-sm font-semibold text-ink transition-colors hover:border-ink/40"
            >
              <PiArrowClockwise /> Restart
            </button>
          </div>

          <p className="mt-6 flex items-center gap-1.5 font-body text-xs text-ink-faint">
            <PiGithubLogo /> Hosted with FlutterShow — my tool that turns a
            Flutter repo into a shareable demo.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

/**
 * Hero art: a living Flutter widget tree.
 * - Edges draw in, then a "state change" travels from App down one branch
 *   every few seconds and the reached widgets rebuild (ripple + flash).
 * - Hover a node to trace its path and see what it is.
 * - The whole tree tilts gently with the pointer.
 * Respects prefers-reduced-motion (static tree, no loops).
 */

type Node = {
  id: string;
  x: number;
  y: number;
  r: number;
  color: string;
  label?: string;
  hint: string;
  code: string;
  parent?: string;
  filled?: boolean;
};

const nodes: Node[] = [
  { id: "root", x: 210, y: 46, r: 12, color: "var(--color-cobalt)", label: "App", hint: "Root widget", code: "MaterialApp.router()", filled: true },
  { id: "a", x: 96, y: 150, r: 9, color: "var(--color-ink)", label: "Scaffold", hint: "Screen layout", code: "Scaffold(appBar, body)", parent: "root" },
  { id: "b", x: 320, y: 150, r: 9, color: "var(--color-ink)", label: "BLoC", hint: "Business logic", code: "BlocProvider<HabitCubit>", parent: "root" },
  { id: "a1", x: 40, y: 250, r: 7, color: "var(--color-clay)", label: "AppBar", hint: "Top bar", code: "AppBar(title: …)", parent: "a" },
  { id: "a2", x: 140, y: 258, r: 7, color: "var(--color-sage)", hint: "Body", code: "ListView.builder()", parent: "a" },
  { id: "b1", x: 262, y: 258, r: 7, color: "var(--color-sage)", hint: "Repository", code: "HabitRepository(dio)", parent: "b" },
  { id: "b2", x: 356, y: 232, r: 7, color: "var(--color-clay)", label: "State", hint: "Immutable state", code: "emit(state.copyWith())", parent: "b" },
  { id: "b3", x: 330, y: 350, r: 9, color: "var(--color-cobalt)", label: "Widget", hint: "Rebuilds on state", code: "BlocBuilder<HabitCubit>", parent: "b", filled: true },
  { id: "b31", x: 268, y: 420, r: 6, color: "var(--color-ink)", hint: "Text", code: "Text('24 day streak')", parent: "b3" },
  { id: "b32", x: 372, y: 428, r: 6, color: "var(--color-ink)", hint: "Icon", code: "Icon(Icons.water_drop)", parent: "b3" },
];

const byId = Object.fromEntries(nodes.map((n) => [n.id, n])) as Record<string, Node>;
const edges = nodes.filter((n) => n.parent).map((n) => ({ from: n.parent!, to: n.id }));

/** Smooth vertical S-curve between two nodes. */
function curve(fromId: string, toId: string) {
  const a = byId[fromId];
  const b = byId[toId];
  const my = (a.y + b.y) / 2;
  return `M ${a.x} ${a.y} C ${a.x} ${my}, ${b.x} ${my}, ${b.x} ${b.y}`;
}

/** Node ids from root to the given node. */
function lineage(id: string) {
  const out: string[] = [];
  let cur: string | undefined = id;
  while (cur) {
    out.unshift(cur);
    cur = byId[cur].parent;
  }
  return out;
}

// Branches the "state change" travels down, in a pleasing order.
const routes = ["b32", "a1", "b2", "b31", "a2", "b1"].map(lineage);
const STEP = 0.32; // seconds per edge

export function WidgetTreeArt() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [tick, setTick] = useState(-1);
  const [hover, setHover] = useState<string | null>(null);
  const [rebuilds, setRebuilds] = useState(0);

  // Pointer tilt
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotY = useSpring(useTransform(px, [-0.5, 0.5], [-9, 9]), { stiffness: 120, damping: 18 });
  const rotX = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), { stiffness: 120, damping: 18 });
  const glowX = useTransform(px, [-0.5, 0.5], ["30%", "70%"]);
  const glowY = useTransform(py, [-0.5, 0.5], ["25%", "75%"]);

  // Start the state-flow loop after the intro finishes.
  useEffect(() => {
    if (reduce) return;
    let interval: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      setTick(0);
      interval = setInterval(() => setTick((t) => t + 1), 2600);
    }, 2200);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [reduce]);

  useEffect(() => {
    if (tick >= 0) setRebuilds((r) => r + routes[tick % routes.length].length);
  }, [tick]);

  const route = tick >= 0 && !hover ? routes[tick % routes.length] : null;
  const traced = useMemo(() => (hover ? lineage(hover) : route ?? []), [hover, route]);
  const tracedEdges = new Set(traced.slice(1).map((id) => `${byId[id].parent}-${id}`));
  const active = hover ? byId[hover] : null;

  function onMove(e: React.PointerEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    px.set(0);
    py.set(0);
    setHover(null);
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative mx-auto aspect-[9/10] w-full max-w-md select-none [perspective:1100px]"
    >
      {/* Soft spotlight that follows the pointer */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-[2.5rem] opacity-70"
        style={{
          background: useTransform(
            [glowX, glowY] as never,
            ([x, y]: string[]) => `radial-gradient(circle at ${x} ${y}, color-mix(in oklab, var(--color-cobalt) 16%, transparent), transparent 60%)`,
          ),
        }}
      />

      <motion.div style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }} className="h-full w-full">
        <svg viewBox="0 0 420 480" fill="none" className="h-full w-full overflow-visible" role="img" aria-label="Animated Flutter widget tree">
          <defs>
            <pattern id="wt-dots" width="22" height="22" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.1" fill="var(--color-ink)" opacity="0.09" />
            </pattern>
            <radialGradient id="wt-fade" cx="50%" cy="50%" r="55%">
              <stop offset="55%" stopColor="#fff" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <mask id="wt-mask">
              <rect x="-40" y="-20" width="500" height="520" fill="url(#wt-fade)" />
            </mask>
            <filter id="wt-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.5" />
            </filter>
          </defs>

          {/* Dot grid, faded at the edges */}
          <motion.rect
            x="-40" y="-20" width="500" height="520"
            fill="url(#wt-dots)" mask="url(#wt-mask)"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}
          />

          {/* Base edges */}
          {edges.map((e, i) => (
            <motion.path
              key={`base-${e.from}-${e.to}`}
              d={curve(e.from, e.to)}
              stroke="var(--color-ink)"
              strokeWidth={1.5}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: tracedEdges.has(`${e.from}-${e.to}`) ? 0.12 : 0.22 }}
              transition={{
                pathLength: { duration: reduce ? 0.01 : 0.8, delay: reduce ? 0 : 0.15 + i * 0.07, ease: [0.65, 0, 0.35, 1] },
                opacity: { duration: 0.3 },
              }}
            />
          ))}

          {/* Hover trace: highlighted path from App to the hovered node */}
          {hover &&
            traced.slice(1).map((id, i) => (
              <motion.path
                key={`hover-${id}`}
                d={curve(byId[id].parent!, id)}
                stroke="var(--color-cobalt)"
                strokeWidth={2.4}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.22, delay: i * 0.12, ease: "easeOut" }}
              />
            ))}

          {/* State flow: a glowing comet travels down the current route */}
          <AnimatePresence>
            {route && (
              <motion.g key={`flow-${tick}`} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                {route.slice(1).map((id, i) => (
                  <g key={id}>
                    <motion.path
                      d={curve(byId[id].parent!, id)}
                      stroke="var(--color-cobalt)"
                      strokeWidth={6}
                      strokeLinecap="round"
                      filter="url(#wt-glow)"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: [0, 0.55, 0.25] }}
                      transition={{ duration: STEP, delay: i * STEP, ease: "linear" }}
                    />
                    <motion.path
                      d={curve(byId[id].parent!, id)}
                      stroke="var(--color-cobalt)"
                      strokeWidth={2.2}
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: STEP, delay: i * STEP, ease: "linear" }}
                    />
                  </g>
                ))}
              </motion.g>
            )}
          </AnimatePresence>

          {/* Nodes */}
          {nodes.map((node, i) => {
            const onRoute = traced.includes(node.id);
            const step = route ? route.indexOf(node.id) : -1;
            const isHover = hover === node.id;
            return (
              <g
                key={node.id}
                onPointerEnter={() => setHover(node.id)}
                onPointerLeave={() => setHover(null)}
                className="cursor-pointer"
              >
                {/* Generous invisible hit area */}
                <circle cx={node.x} cy={node.y} r={node.r + 14} fill="transparent" />

                {/* Rebuild ripple when the state flow reaches this node */}
                {step >= 0 && (
                  <motion.circle
                    key={`ripple-${tick}`}
                    cx={node.x}
                    cy={node.y}
                    r={node.r}
                    stroke={node.color}
                    strokeWidth={1.5}
                    fill="none"
                    initial={{ scale: 1, opacity: 0.7 }}
                    animate={{ scale: 3, opacity: 0 }}
                    transition={{ duration: 1.1, delay: step * STEP, ease: "easeOut" }}
                    style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                  />
                )}

                {/* Idle breathing halo on the two "live" widgets */}
                {node.filled && !reduce && (
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={node.r + 6}
                    fill={node.color}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.08, 0.2, 0.08], scale: [1, 1.15, 1] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 1.6 + i * 0.2 }}
                    style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                  />
                )}

                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={node.r}
                  stroke={node.color}
                  strokeWidth={2}
                  initial={{ scale: 0, opacity: 0, fill: "var(--color-paper)" }}
                  animate={{
                    scale: isHover ? 1.35 : 1,
                    opacity: 1,
                    fill: node.filled || isHover || (onRoute && hover) ? node.color : "var(--color-paper)",
                  }}
                  transition={{
                    scale: { type: "spring", stiffness: 420, damping: 16, delay: reduce || hover ? 0 : 0.5 + i * 0.08 },
                    opacity: { duration: reduce ? 0.01 : 0.3, delay: reduce ? 0 : 0.5 + i * 0.08 },
                    fill: { duration: 0.2 },
                  }}
                  style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                />

                {/* Flash fill as the widget rebuilds */}
                {step >= 0 && !node.filled && (
                  <motion.circle
                    key={`flash-${tick}`}
                    cx={node.x}
                    cy={node.y}
                    r={node.r - 2.5}
                    fill={node.color}
                    initial={{ opacity: 0, scale: 0.4 }}
                    animate={{ opacity: [0, 1, 0], scale: [0.4, 1, 0.8] }}
                    transition={{ duration: 0.9, delay: step * STEP + 0.05 }}
                    style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                  />
                )}

                {node.label && (
                  <motion.text
                    x={node.x + node.r + 9}
                    y={node.y + 4}
                    fontSize={12.5}
                    fontWeight={isHover ? 700 : 500}
                    fontFamily="var(--font-body)"
                    fill={isHover ? "var(--color-ink)" : "var(--color-ink-soft)"}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: reduce ? 0.01 : 0.45, delay: reduce ? 0 : 1 + i * 0.08 }}
                  >
                    {node.label}
                  </motion.text>
                )}
              </g>
            );
          })}
        </svg>
      </motion.div>

      {/* Hover card: what this widget is */}
      <AnimatePresence>
        {active && (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="pointer-events-none absolute z-10 w-max max-w-[220px] -translate-x-1/2 rounded-xl border border-ink/10 bg-paper/95 px-3 py-2 shadow-[0_12px_30px_-12px_rgba(23,22,27,0.35)] backdrop-blur"
            style={{
              left: `${(active.x / 420) * 100}%`,
              top: `calc(${(active.y / 480) * 100}% + ${active.r + 16}px)`,
            }}
          >
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-faint">{active.hint}</p>
            <p className="mt-0.5 font-mono text-[12px] text-cobalt-deep">{active.code}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live "DevTools" chip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: reduce ? 0 : 2 }}
        className="absolute bottom-1 left-0 flex items-center gap-2.5 rounded-full border border-ink/10 bg-paper/90 py-1.5 pl-2 pr-3.5 font-body text-xs text-ink-soft shadow-[0_8px_24px_-14px_rgba(23,22,27,0.4)] backdrop-blur sm:left-2"
      >
        <span className="relative flex h-2 w-2">
          {!reduce && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-60" />}
          <span className="relative inline-flex h-2 w-2 rounded-full bg-sage" />
        </span>
        <span className="font-semibold text-ink">60 fps</span>
        <span className="h-3 w-px bg-ink/15" />
        <span>
          <motion.span key={rebuilds} initial={{ opacity: 0.3 }} animate={{ opacity: 1 }} className="inline-block font-semibold tabular-nums text-cobalt">
            {rebuilds}
          </motion.span>{" "}
          rebuilds
        </span>
      </motion.div>
    </div>
  );
}

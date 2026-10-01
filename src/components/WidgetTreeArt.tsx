import { motion, useReducedMotion } from "motion/react";

type Node = { id: string; x: number; y: number; r: number; color: string; label?: string };
type Edge = { from: string; to: string };

const nodes: Node[] = [
  { id: "root", x: 210, y: 46, r: 11, color: "var(--color-cobalt)", label: "App" },
  { id: "a", x: 96, y: 150, r: 9, color: "var(--color-ink)", label: "Scaffold" },
  { id: "b", x: 320, y: 150, r: 9, color: "var(--color-ink)", label: "BLoC" },
  { id: "a1", x: 40, y: 250, r: 7, color: "var(--color-clay)", label: "AppBar" },
  { id: "a2", x: 140, y: 258, r: 7, color: "var(--color-sage)" },
  { id: "b1", x: 262, y: 258, r: 7, color: "var(--color-sage)" },
  { id: "b2", x: 356, y: 232, r: 7, color: "var(--color-clay)", label: "State" },
  { id: "b3", x: 330, y: 350, r: 9, color: "var(--color-cobalt)", label: "Widget" },
  { id: "b31", x: 268, y: 420, r: 6, color: "var(--color-ink)" },
  { id: "b32", x: 372, y: 428, r: 6, color: "var(--color-ink)" },
];

const edges: Edge[] = [
  { from: "root", to: "a" },
  { from: "root", to: "b" },
  { from: "a", to: "a1" },
  { from: "a", to: "a2" },
  { from: "b", to: "b1" },
  { from: "b", to: "b2" },
  { from: "b", to: "b3" },
  { from: "b3", to: "b31" },
  { from: "b3", to: "b32" },
];

function find(id: string) {
  return nodes.find((n) => n.id === id)!;
}

export function WidgetTreeArt() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-[9/10] w-full max-w-md select-none">
      <svg viewBox="0 0 420 480" fill="none" className="h-full w-full overflow-visible">
        {edges.map((edge, i) => {
          const from = find(edge.from);
          const to = find(edge.to);
          return (
            <motion.line
              key={`${edge.from}-${edge.to}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="var(--color-ink)"
              strokeOpacity={0.22}
              strokeWidth={1.5}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: reduce ? 0.01 : 0.7, delay: reduce ? 0 : 0.15 + i * 0.07, ease: "easeOut" }}
            />
          );
        })}

        {nodes.map((node, i) => (
          <g key={node.id}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={node.r}
              fill={node.id === "root" || node.id === "b3" ? node.color : "var(--color-paper)"}
              stroke={node.color}
              strokeWidth={2}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: reduce ? 0.01 : 0.45,
                delay: reduce ? 0 : 0.5 + i * 0.08,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            />
            {node.label && (
              <motion.text
                x={node.x + node.r + 8}
                y={node.y + 4}
                fontSize={12}
                fontFamily="var(--font-body)"
                fill="var(--color-ink-soft)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: reduce ? 0.01 : 0.4, delay: reduce ? 0 : 1 + i * 0.08 }}
              >
                {node.label}
              </motion.text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}

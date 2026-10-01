import { motion, useReducedMotion } from "motion/react";

export function WellspringVisual() {
  const reduce = useReducedMotion();
  const rings = [1, 0.76, 0.54, 0.34];
  return (
    <div className="relative flex h-full min-h-[220px] items-center justify-center overflow-hidden rounded-2xl bg-sage-soft p-8">
      <div className="relative h-40 w-40 sm:h-48 sm:w-48">
        {rings.map((scale, i) => (
          <motion.span
            key={i}
            className="absolute inset-0 rounded-full border-2"
            style={{ borderColor: i % 2 === 0 ? "var(--color-sage)" : "var(--color-clay)" }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale, opacity: 0.9 - i * 0.12 }}
            viewport={{ once: true }}
            transition={{ duration: reduce ? 0.01 : 0.7, delay: reduce ? 0 : i * 0.12, ease: [0.34, 1.56, 0.64, 1] }}
          />
        ))}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="font-display text-2xl font-bold text-ink">24</span>
          <span className="font-body text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
            day streak
          </span>
        </div>
      </div>
    </div>
  );
}

export function FloodVisual() {
  const reduce = useReducedMotion();
  const bars = [0.4, 0.65, 0.5, 0.85, 0.7, 1, 0.6];
  return (
    <div className="relative flex h-full min-h-[220px] items-end gap-2 overflow-hidden rounded-2xl bg-cobalt-soft p-8">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-t-md"
          style={{ backgroundColor: i === 5 ? "var(--color-clay)" : "var(--color-cobalt)" }}
          initial={{ height: 0, opacity: 0.6 }}
          whileInView={{ height: `${h * 100}%`, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: reduce ? 0.01 : 0.6, delay: reduce ? 0 : i * 0.06, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

export function RealEstateVisual() {
  const reduce = useReducedMotion();
  const pins = [
    { x: "28%", y: "32%" },
    { x: "62%", y: "22%" },
    { x: "48%", y: "58%" },
    { x: "78%", y: "68%" },
  ];
  return (
    <div className="relative h-full min-h-[220px] overflow-hidden rounded-2xl bg-clay-soft p-8">
      <svg className="absolute inset-0 h-full w-full opacity-40" aria-hidden>
        <defs>
          <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M28 0H0V28" fill="none" stroke="var(--color-clay)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      {pins.map((pin, i) => (
        <motion.div
          key={i}
          className="absolute flex h-7 w-7 -translate-x-1/2 -translate-y-full items-center justify-center rounded-full border-2 border-paper bg-clay shadow-sm"
          style={{ left: pin.x, top: pin.y }}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: reduce ? 0.01 : 0.4, delay: reduce ? 0 : 0.15 + i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <span className="h-2 w-2 rounded-full bg-paper" />
        </motion.div>
      ))}
    </div>
  );
}

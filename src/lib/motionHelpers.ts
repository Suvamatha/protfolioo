import { useReducedMotion } from "motion/react";

export function useRevealVariants() {
  const reduce = useReducedMotion();

  return {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.01 : 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };
}

export function useStaggerContainer(stagger = 0.08) {
  const reduce = useReducedMotion();

  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: reduce ? 0 : 0.05 },
    },
  };
}

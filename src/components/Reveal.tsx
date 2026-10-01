import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useRevealVariants, useStaggerContainer } from "../lib/motionHelpers";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const variants = useRevealVariants();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

export function RevealGroup({
  children,
  className,
  stagger,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const container = useStaggerContainer(stagger);

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={container}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  const variants = useRevealVariants();
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}

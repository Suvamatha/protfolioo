import { motion } from "motion/react";
import { PiArrowDownRight, PiGithubLogo, PiLinkedinLogo, PiEnvelopeSimple } from "react-icons/pi";
import { profile } from "../data/content";
import { Magnetic } from "./Magnetic";
import { WidgetTreeArt } from "./WidgetTreeArt";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 pb-16 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:pb-24">
        <motion.div initial="hidden" animate="visible" variants={container}>
          <motion.p
            variants={item}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-paper-dim px-3.5 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-sage" />
            Available for Flutter work
          </motion.p>

          <motion.h1
            variants={item}
            className="text-balance font-display text-[2.6rem] font-semibold leading-[1.08] tracking-tight text-ink sm:text-6xl lg:text-[4rem]"
          >
            {profile.name}, <span className="text-cobalt">Flutter</span> developer.
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-lg text-balance font-body text-lg leading-relaxed text-ink-soft">
            {profile.heroLine}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-body text-sm font-semibold text-paper transition-colors hover:bg-cobalt"
              >
                View projects
                <PiArrowDownRight className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" size={16} />
              </a>
            </Magnetic>
            <Magnetic strength={10}>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3.5 font-body text-sm font-semibold text-ink transition-colors hover:border-ink/40"
              >
                Contact me
              </a>
            </Magnetic>
          </motion.div>

          <motion.div variants={item} className="mt-10 flex items-center gap-5">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="text-ink-soft transition-colors hover:text-ink"
            >
              <PiGithubLogo size={22} />
            </a>
            <a
              href={profile.linkedin || "#contact"}
              target={profile.linkedin ? "_blank" : undefined}
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className="text-ink-soft transition-colors hover:text-ink"
            >
              <PiLinkedinLogo size={22} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Send an email"
              className="text-ink-soft transition-colors hover:text-ink"
            >
              <PiEnvelopeSimple size={22} />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
          className="relative"
        >
          <div className="absolute -inset-10 -z-10 rounded-[3rem] bg-cobalt-soft/70 blur-2xl" aria-hidden />
          <WidgetTreeArt />
        </motion.div>
      </div>
    </section>
  );
}

import { profile } from "../data/content";

export function Footer() {
  return (
    <footer className="border-t border-ink/10 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 sm:flex-row sm:px-8">
        <p className="font-body text-xs text-ink-faint">
          © {new Date().getFullYear()} {profile.name}. Built with React, Tailwind & motion.
        </p>
        <a href="#top" className="font-body text-xs font-medium text-ink-faint transition-colors hover:text-ink">
          Back to top
        </a>
      </div>
    </footer>
  );
}

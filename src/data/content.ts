// Edit this file to update the site's content — no other file should need changes
// for text, links, or copy updates.

export const profile = {
  name: "Suvam Shrestha",
  role: "Flutter Developer",
  location: "Lalitpur, Nepal",
  email: "shresthasuvam27@gmail.com",
  github: "https://github.com/Suvamatha",
  // TODO: add your LinkedIn URL
  linkedin: "",
  tagline: "I build fast, well-architected Flutter apps.",
  heroLine:
    "Cross-platform mobile apps with clean architecture, predictable state, and interfaces people actually enjoy using.",
  about: {
    intro:
      "Flutter developer focused on turning product ideas into production-ready mobile apps — from first widget to shipped build.",
    focus:
      "I focus on clean architecture, predictable state management, and API-driven features that hold up as apps grow.",
    philosophy:
      "Maintainable code and a considered interface aren't extras — they're the job. I'd rather ship one feature well than three half-finished.",
    stack: ["Flutter", "Dart", "BLoC / Cubit", "REST APIs", "Clean Architecture"],
  },
};

export const skills = [
  {
    group: "Flutter / Dart",
    items: ["Flutter", "Dart", "Material Design", "Responsive UI"],
  },
  {
    group: "Architecture & State",
    items: ["BLoC", "Cubit", "Clean Architecture", "Repository Pattern", "Dependency Injection"],
  },
  {
    group: "Backend & APIs",
    items: ["REST APIs", "Dio", "Firebase", "JSON", "OpenAPI"],
  },
  {
    group: "Navigation & UI",
    items: ["GoRouter", "Reusable Widgets", "Responsive Layouts"],
  },
  {
    group: "Tools & Workflow",
    items: ["Git", "GitHub", "VS Code", "Android Studio"],
  },
  {
    group: "Also comfortable with",
    items: ["JavaScript", "React", "Node.js", "Docker", "C", "C++"],
  },
] as const;

// ─── Live demos ────────────────────────────────────────────────────────────
// Demos come from FlutterShow (your flutter_app_demo_web site). The portfolio
// reads <url>/demos/index.json and matches each project by its GitHub `repo`.
// So to show a live demo you only need to build the repo in FlutterShow —
// nothing to change here. Override with VITE_FLUTTERSHOW_URL in a .env file.
export const fluttershow = {
  url: (import.meta.env.VITE_FLUTTERSHOW_URL as string | undefined) || "https://flutter-app-demo-web.vercel.app",
  /** Show every other FlutterShow demo in the "Playground" under your projects. */
  playground: true,
  /** Repo URLs to keep out of the Playground. */
  hideFromPlayground: [] as string[],
};

export type Project = {
  name: string;
  oneLiner: string;
  problem?: string;
  tech: string[];
  challenge: string;
  /** GitHub repo of the Flutter app — used to find its live demo automatically. */
  repo?: string;
  /** Link button (defaults to `repo`). */
  link?: string;
  linkLabel?: string;
  status?: "Live" | "In progress" | "Private";
  /** Small pill above the title, e.g. "NOSK Hackathon". */
  badge?: string;
  /** Background art beside the phone. */
  visual?: "wellspring" | "flood" | "realEstate";
  /**
   * No live demo (private or source not public)? Put real screenshots in
   * public/projects/ and list them here — they play as a slideshow in the phone.
   */
  screenshots?: string[];
  /** Force a specific FlutterShow demo id (normally auto-detected from `repo`). */
  demoId?: string;
};

// Add a project = add an object here. Order here = order on the page.
export const projects: Project[] = [
  {
    name: "Wellspring",
    oneLiner: "A personal health and wellness tracker for cycle, mood, sleep, and hydration.",
    problem:
      "Most women's health apps are clinical or cluttered. Wellspring needed to feel personal, calm, and genuinely motivating to open daily.",
    tech: ["Flutter", "Dart", "BLoC/Cubit", "GetIt", "Freezed", "GoRouter"],
    challenge:
      "Designed a scalable feature architecture (BLoC/Cubit + GetIt + Freezed) so journaling, reminders, and an XP/streak system could ship independently without tangled state — plus a custom, accessible design system for the whole app.",
    repo: "https://github.com/Suvamatha/health_app",
    linkLabel: "View on GitHub",
    status: "Live",
    visual: "wellspring",
  },
  {
    name: "Flood Foresight",
    oneLiner: "A cross-platform flood prediction and monitoring app built for the NOSK Hackathon.",
    tech: ["Flutter", "Firebase"],
    challenge:
      "Delivered a working prediction-and-monitoring flow end to end under hackathon time pressure, using Firebase for real-time backend data while collaborating across a team on feature ownership.",
    repo: "https://github.com/Noskathon-Lite/flood_Foresight",
    linkLabel: "View on GitHub",
    status: "Live",
    badge: "NOSK Hackathon",
    visual: "flood",
    screenshots: [],
  },
  {
    name: "Real Estate Mobile Application",
    oneLiner: "A property discovery app with search, filters, pagination, and rich listing details.",
    problem:
      "Built during a Flutter development internship: buyers needed to browse, filter, and compare properties with maps and galleries in a fast, responsive flow.",
    tech: ["Flutter", "Dart", "BLoC/Cubit", "Dio", "REST API", "Clean Architecture"],
    challenge:
      "Implemented BLoC/Cubit with a layered, clean-architecture approach so search, filtering, pagination, maps, galleries, and favorites could all integrate with a REST API via Dio without the codebase becoming unmanageable.",
    status: "Private",
    badge: "Internship",
    visual: "realEstate",
    screenshots: [],
  },
];

export const experience = [
  {
    company: "Blacktech",
    role: "Flutter Developer Intern",
    dates: "Jun 2026 — Aug 2026",
    points: [
      "Developed Flutter applications using Dart, reusable widgets, and responsive UI across multiple features.",
      "Implemented BLoC/Cubit state management with REST API integration via Dio.",
      "Built search, filtering, pagination, and navigation for a property-discovery feature set.",
      "Refactored and debugged existing code to improve performance and long-term maintainability.",
    ],
  },
];

export const education = {
  degree: "Bachelor of Engineering in Software Engineering",
  school: "Nepal College of Information Technology (NCIT)",
  extra: "DevOps Training — 6 months",
};

export const currentlyExploring = ["GoRouter v2 patterns", "Freezed + GetIt architecture", "Docker for mobile CI"];

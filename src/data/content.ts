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

// Live demos are hosted by FlutterShow (github.com/Suvamatha/flutter_app_demo_web).
// Set this to wherever FlutterShow is deployed, e.g. "https://fluttershow.vercel.app".
// You can also override it with VITE_FLUTTERSHOW_URL in a .env file.
export const fluttershow = {
  url: (import.meta.env.VITE_FLUTTERSHOW_URL as string | undefined) ?? "http://localhost:5173",
};

export type Demo = {
  /** FlutterShow demo id — the folder name under FlutterShow's demos/ (e.g. "suvamatha-health-app"). */
  id: string;
  /** Status-bar colour inside the phone frame. */
  statusBar?: "light" | "dark";
  background?: string;
};

export type Project = {
  name: string;
  oneLiner: string;
  problem: string;
  tech: string[];
  challenge: string;
  link?: string;
  linkLabel?: string;
  status?: "Live" | "In progress" | "Private";
  demo?: Demo;
};

export const projects: Project[] = [
  {
    name: "Wellspring",
    oneLiner: "A personal health and wellness tracker for cycle, mood, sleep, and hydration.",
    problem:
      "Most women's health apps are clinical or cluttered. Wellspring needed to feel personal, calm, and genuinely motivating to open daily.",
    tech: ["Flutter", "Dart", "BLoC/Cubit", "GetIt", "Freezed", "GoRouter"],
    challenge:
      "Designed a scalable feature architecture (BLoC/Cubit + GetIt + Freezed) so journaling, reminders, and an XP/streak system could ship independently without tangled state — plus a custom, accessible design system for the whole app.",
    link: "https://github.com/Suvamatha/health_app",
    linkLabel: "View on GitHub",
    status: "Live",
    demo: { id: "suvamatha-health-app", background: "#f4faf9" },
  },
  {
    name: "Flood Foresight",
    oneLiner: "A cross-platform flood prediction and monitoring app built for the NOSK Hackathon.",
    problem:
      "Communities at flood risk need early, clear warnings — built and shipped within a tight hackathon timeline as a team.",
    tech: ["Flutter", "Firebase"],
    challenge:
      "Delivered a working prediction-and-monitoring flow end to end under hackathon time pressure, using Firebase for real-time backend data while collaborating across a team on feature ownership.",
    link: "https://github.com/Noskathon-Lite/flood_Foresight",
    linkLabel: "View on GitHub",
    status: "Live",
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
  },
];

// Smaller apps shown as live, playable phones under the main projects.
export const miniDemos: { name: string; blurb: string; repo: string; demo: Demo }[] = [
  {
    name: "Medicine Tracker",
    blurb: "Daily doses, progress and reminders.",
    repo: "https://github.com/Suvamatha/medicineTrackerApp",
    demo: { id: "suvamatha-medicinetrackerapp" },
  },
  {
    name: "Calculator",
    blurb: "A tidy calculator with a dark UI.",
    repo: "https://github.com/Suvamatha/calculatorAPP",
    demo: { id: "suvamatha-calculatorapp", statusBar: "light", background: "#000000" },
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

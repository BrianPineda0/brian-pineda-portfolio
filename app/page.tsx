import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Download,
  FileText,
  GraduationCap,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import Interactive from "./Interactive";

// ---------------------------------------------------------------------------
// CONTENT — everything the page shows lives here, in plain data. The components
// below consume it and hold no hardcoded copy, so edits happen in one place.
// ---------------------------------------------------------------------------

const PROFILE = {
  firstName: "Brian",
  lastName: "Pineda",
  greeting: "Hi, I'm Brian",
  tagline: "CS + EE @ Rutgers · first-gen builder",
  location: "New Brunswick, NJ",
  email: "brian.pineda.work@gmail.com",
  github: "https://github.com/BrianPineda0",
  githubHandle: "BrianPineda0",
  linkedin: "https://www.linkedin.com/in/brianepineda",
  linkedinHandle: "brianepineda",
  resume: "/resume.pdf",
  availability: "Open to Summer 2026 internships",
  currently:
    "building LLM platforms & data pipelines with an AI-native workflow",
  // First-person intro. Pieces marked { strong } render in solid ink.
  intro: [
    { text: "I'm a first-generation " },
    { text: "Computer Science + Electrical Engineering", strong: true },
    {
      text:
        " student at Rutgers who likes building things that actually ship — full-stack products, data pipelines, and the ",
    },
    { text: "LLM systems", strong: true },
    {
      text:
        " on top of them. I drive most of my work with an AI-native workflow (Claude Code, Codex, Cursor), and I'm just as curious about the ",
    },
    { text: "transistors underneath", strong: true },
    { text: " as the model-routing layer on top." },
  ],
} as const;

const HERO_STATS = [
  { k: "GPA", v: "3.8 / 4.0" },
  { k: "Status", v: "Dean's List" },
  { k: "Grad", v: "May 2029" },
  { k: "Focus", v: "AI / ML · Full-stack" },
];

type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  kind: "Leadership" | "Education";
  points: string[];
};

const EXPERIENCE: ExperienceItem[] = [
  {
    role: "PR Chair",
    org: "Mexican American Student Association (MASA) · Rutgers",
    period: "Mar 2026 — Present",
    kind: "Leadership",
    points: [
      "Own communications and public-facing software for the organization.",
      "Built and maintain the MASA student web app used by the membership.",
      "Work directly with stakeholders to drive 10+ production releases.",
    ],
  },
  {
    role: "B.S. Computer Science & Electrical Engineering",
    org: "Rutgers University — New Brunswick",
    period: "2025 — 2029 (expected)",
    kind: "Education",
    points: [
      "GPA 3.8 / 4.0 · Dean's List.",
      "Studying the full pipeline — from silicon up to the model-routing layer.",
      "Coursework across data structures, AI, computer architecture & systems.",
    ],
  },
];

type Project = {
  id: string;
  name: string;
  category: string;
  context: string;
  blurb: string;
  stack: string[];
  featured?: boolean;
  /** Optional repo or live URL. When set, the card becomes clickable. */
  link?: string;
};

const PROJECTS: Project[] = [
  {
    id: "gencost",
    name: "GenCost",
    category: "LLM Routing Platform",
    context: "AI Tinkerers × ElevenLabs Hackathon · NYC · Apr 2026",
    blurb:
      "Production LLM platform with a smart router that picks the optimal model per request across 6 providers (OpenRouter, DeepSeek, Grok, ElevenLabs, fal.ai, Google) for real-time cost and quality optimization. 20+ FastAPI endpoints behind a Next.js dashboard with live cost tickers, charts, and interactive panels. Built on a 4-person team with Claude Code + CLAUDE.md context files.",
    stack: ["Next.js", "React", "FastAPI", "PostgreSQL", "Claude"],
    featured: true,
  },
  {
    id: "pc-price-predictor",
    name: "PC Hardware Price Predictor",
    category: "Data Pipeline",
    context: "Personal project · Jan 2026 → Present",
    blurb:
      "5-stage Python pipeline turning 9,497 raw scraped records into a normalized SQLite database — 3 tables, 75,000+ rows. Cross-source matching for 2,106 components using composite-key logic with validation at every stage. Driven end-to-end through Claude Code with structured context files.",
    stack: ["Python", "SQL", "SQLite", "Pandas", "Claude Code"],
  },
  {
    id: "masa-rutgers",
    name: "MASA Rutgers Website",
    category: "Student Org Web App",
    context: "Mar 2026 → Present · In production",
    blurb:
      "Student-facing web app for the Mexican American Student Association at Rutgers. Real-time forum, event calendar, and gallery deployed via GitHub Pages and used by the org's membership. 10+ production deployments driven by stakeholder feedback.",
    stack: ["JavaScript", "Firebase", "Firestore", "HTML/CSS"],
  },
  {
    id: "android-photos",
    name: "Android Photos App",
    category: "Mobile · OOP",
    context: "Nov → Dec 2025",
    blurb:
      "Photo-management app ported from a JavaFX desktop project. 4 OOP model classes restructured with clean separation of concerns, 6 user-facing features, tested across 3+ emulator configs with hand-written Activities and unit tests.",
    stack: ["Java", "Android Studio"],
  },
];

const STACK_CATEGORIES: { label: string; items: string[] }[] = [
  {
    label: "AI-Native Workflow",
    items: ["Claude Code", "Codex", "Cursor", "Gemini CLI", "Prompt Engineering", "LLM APIs"],
  },
  {
    label: "Front End",
    items: ["TypeScript", "React", "Next.js", "Tailwind CSS", "shadcn"],
  },
  {
    label: "Back End",
    items: ["Python", "FastAPI", "Node.js", "REST", "WebSocket", "JWT"],
  },
  {
    label: "Data",
    items: ["SQL", "PostgreSQL", "SQLite", "Firebase", "Firestore", "Pandas"],
  },
  {
    label: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "Java", "C", "SQL"],
  },
  {
    label: "Cloud & Tools",
    items: ["AWS", "Vercel", "Supabase", "Git", "Linux", "Android Studio"],
  },
];

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Projects" },
  { href: "#stack", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

// ---------------------------------------------------------------------------
// PRIMITIVES
// ---------------------------------------------------------------------------

function Aurora() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-canvas" />
      <div className="aurora animate-aurora-1 h-[42rem] w-[42rem] -left-40 -top-48 bg-[#7cb6ff]" />
      <div className="aurora animate-aurora-2 h-[38rem] w-[38rem] right-[-12rem] top-[-6rem] bg-[#c9a9ff]" />
      <div className="aurora animate-aurora-3 h-[34rem] w-[34rem] left-1/3 top-[28rem] bg-[#7ff0dc] opacity-40" />
      <div className="aurora animate-aurora-2 h-[30rem] w-[30rem] right-[2rem] bottom-[-8rem] bg-[#ffd9a8] opacity-40" />
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-slate">
      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
      {children}
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="glass-clear rounded-full px-3 py-1 font-mono text-[11px] tracking-[0.02em] text-slate">
      {children}
    </span>
  );
}

// ---------------------------------------------------------------------------
// SECTIONS
// ---------------------------------------------------------------------------

function Nav() {
  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 rounded-full glass-bar px-3 py-2 pl-4">
        <a href="#top" className="group flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-lg bg-gradient-to-br from-brand via-grape to-mint text-[10px] font-bold text-white">
            BP
          </span>
          <span className="hidden font-medium tracking-tight text-ink sm:inline">
            {PROFILE.firstName} {PROFILE.lastName}
          </span>
        </a>
        <nav className="flex items-center gap-0.5">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-[13px] text-slate transition-colors hover:bg-white/70 hover:text-ink"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#resume"
            className="ml-1 hidden items-center gap-1.5 rounded-full bg-ink px-3.5 py-1.5 text-[13px] font-medium text-white transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            <FileText className="h-3.5 w-3.5" />
            Résumé
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative">
      <div className="absolute inset-0 grid-faint" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-36 sm:px-8 md:pb-24 md:pt-44">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="opacity-0 animate-fade-up">
              <Eyebrow>
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
                </span>
                {PROFILE.availability}
              </Eyebrow>
            </div>

            <h1 className="mt-6 font-semibold tracking-tight text-ink opacity-0 animate-fade-up stagger-1">
              <span className="block text-2xl font-medium text-slate sm:text-3xl">
                {PROFILE.greeting} 👋
              </span>
              <span className="mt-1 block text-6xl leading-[0.95] sm:text-7xl md:text-8xl">
                {PROFILE.firstName} {PROFILE.lastName}
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-slate opacity-0 animate-fade-up stagger-2">
              {PROFILE.intro.map((piece, i) =>
                "strong" in piece && piece.strong ? (
                  <span key={i} className="font-medium text-ink">
                    {piece.text}
                  </span>
                ) : (
                  <span key={i}>{piece.text}</span>
                )
              )}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 opacity-0 animate-fade-up stagger-3">
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-medium text-white shadow-float transition-transform hover:-translate-y-0.5"
              >
                See my work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
              >
                Get in touch
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <div className="flex items-center gap-1">
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="GitHub"
                  className="grid h-11 w-11 place-items-center rounded-full glass text-ink transition-transform hover:-translate-y-0.5"
                >
                  <Github className="h-[18px] w-[18px]" />
                </a>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="LinkedIn"
                  className="grid h-11 w-11 place-items-center rounded-full glass text-ink transition-transform hover:-translate-y-0.5"
                >
                  <Linkedin className="h-[18px] w-[18px]" />
                </a>
              </div>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-2 font-mono text-[12px] text-slate opacity-0 animate-fade-up stagger-4">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-brand" />
                {PROFILE.location}
              </span>
              <span className="text-line">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-grape" />
                Currently {PROFILE.currently}
              </span>
            </div>
          </div>

          {/* Avatar card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm opacity-0 animate-fade-up stagger-3">
              <div className="glass rounded-[2rem] p-6" data-tilt>
                <div className="relative mx-auto grid h-44 w-44 animate-float place-items-center rounded-[2.4rem] bg-gradient-to-br from-brand via-grape to-mint shadow-glass-lg">
                  <span className="text-6xl font-semibold tracking-tight text-white">BP</span>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-2.5">
                  {HERO_STATS.map((s) => (
                    <div
                      key={s.k}
                      className="glass-clear rounded-2xl px-3.5 py-3"
                    >
                      <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate">
                        {s.k}
                      </div>
                      <div className="mt-0.5 text-sm font-medium text-ink">
                        {s.v}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      data-reveal
      className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24"
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl md:text-5xl">
        {title}
      </h2>
      <div className="mt-10">{children}</div>
    </section>
  );
}

function About() {
  return (
    <Section id="about" eyebrow="About" title="A student who ships real things.">
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="glass rounded-3xl p-7 md:p-9 lg:col-span-7">
          <div className="space-y-5 text-[15px] leading-relaxed text-slate">
            <p>
              I&apos;m studying Computer Science and Electrical Engineering at
              Rutgers because I want the whole picture — from the{" "}
              <span className="font-medium text-ink">transistors</span> that make
              computation possible up through the{" "}
              <span className="font-medium text-ink">model-routing layer</span>{" "}
              that&apos;s reshaping how software gets built.
            </p>
            <p>
              Most of my recent work is{" "}
              <span className="font-medium text-ink">
                production-grade products built with AI tooling
              </span>{" "}
              — Claude Code, Codex, and Cursor as primary collaborators, with{" "}
              <span className="font-mono text-[0.9em] text-ink">CLAUDE.md</span>{" "}
              and{" "}
              <span className="font-mono text-[0.9em] text-ink">AGENTS.md</span>{" "}
              files driving the context. Shipped LLM platforms, end-to-end data
              pipelines, and real student-org software that people actually use.
            </p>
            <p>
              I&apos;m a{" "}
              <span className="font-medium text-ink">first-generation</span>{" "}
              student in tech, and I serve as{" "}
              <span className="font-medium text-ink">PR Chair at MASA Rutgers</span>{" "}
              — so I&apos;m as comfortable working with stakeholders and a
              community as I am in the IDE. Open to Summer 2026 SWE and AI/ML
              internships, especially anywhere LLM systems or the
              hardware-software boundary is the interesting problem.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:col-span-5">
          <div className="glass rounded-3xl p-7">
            <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate">
              At a glance
            </div>
            <dl className="mt-4 divide-y divide-line">
              {[
                ["Major", "CS + EE"],
                ["School", "Rutgers University"],
                ["Location", PROFILE.location],
                ["Graduation", "May 2029"],
                ["Open to", "Summer 2026 internships"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-4 py-2.5">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-slate">
                    {k}
                  </dt>
                  <dd className="text-right text-sm font-medium text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <a
            href={PROFILE.resume}
            download
            className="group flex items-center justify-between rounded-3xl glass p-6 transition-transform hover:-translate-y-0.5"
          >
            <div>
              <div className="font-medium text-ink">Grab my résumé</div>
              <div className="text-sm text-slate">One-page PDF</div>
            </div>
            <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-white transition-transform group-hover:-translate-y-0.5">
              <Download className="h-4 w-4" />
            </span>
          </a>
        </div>
      </div>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've been.">
      <div className="space-y-5">
        {EXPERIENCE.map((item) => {
          const Icon = item.kind === "Education" ? GraduationCap : Briefcase;
          return (
            <div
              key={item.role}
              className="glass rounded-3xl p-6 md:p-8"
              data-spotlight
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:gap-8">
                <div className="flex items-center gap-3 md:w-64 md:shrink-0">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand/90 to-grape/90 text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate">
                      {item.kind}
                    </div>
                    <div className="font-mono text-[12px] text-ink">
                      {item.period}
                    </div>
                  </div>
                </div>
                <div className="md:flex-1">
                  <h3 className="text-xl font-medium tracking-tight text-ink">
                    {item.role}
                  </h3>
                  <p className="mt-0.5 text-sm text-slate">{item.org}</p>
                  <ul className="mt-4 space-y-2">
                    {item.points.map((p) => (
                      <li
                        key={p}
                        className="flex gap-2.5 text-[15px] leading-relaxed text-slate"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const featured = project.featured;
  const className = `group glass rounded-3xl p-7 md:p-8 transition-transform hover:-translate-y-1 ${
    featured ? "md:col-span-2" : ""
  } flex flex-col`;
  const inner = (
    <>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand">
            {project.category}
          </div>
          <h3
            className={`mt-2 font-medium tracking-tight text-ink ${
              featured ? "text-3xl md:text-4xl" : "text-2xl"
            }`}
          >
            {project.name}
          </h3>
        </div>
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand via-grape to-mint text-xl font-bold text-white">
          {project.name.charAt(0)}
        </span>
      </div>
      <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-slate">
        {project.context}
      </p>
      <p
        className={`mt-4 leading-relaxed text-slate ${
          featured ? "max-w-2xl text-[15px]" : "text-sm"
        } flex-grow`}
      >
        {project.blurb}
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <Chip key={s}>{s}</Chip>
        ))}
      </div>
      {project.link ? (
        <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
          View project
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      ) : null}
    </>
  );
  return project.link ? (
    <a
      href={project.link}
      target="_blank"
      rel="noreferrer noopener"
      className={className}
      data-spotlight
    >
      {inner}
    </a>
  ) : (
    <article className={className} data-spotlight>
      {inner}
    </article>
  );
}

function Work() {
  return (
    <Section id="work" eyebrow="Projects" title="Things I've shipped.">
      <div className="grid gap-6 md:grid-cols-2">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </Section>
  );
}

function Stack() {
  return (
    <Section id="stack" eyebrow="Skills" title="Tools I reach for.">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {STACK_CATEGORIES.map((cat) => (
          <div key={cat.label} className="glass rounded-3xl p-6" data-spotlight>
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand">
              {cat.label}
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <li
                  key={item}
                  className="glass-clear rounded-full px-3 py-1 text-[13px] text-ink"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

function ContactCard({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href: string;
}) {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className="group glass flex flex-col rounded-3xl p-6 transition-transform hover:-translate-y-1"
      data-spotlight
    >
      <div className="flex items-center justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-brand to-grape text-white">
          <Icon className="h-5 w-5" />
        </span>
        <ArrowUpRight className="h-4 w-4 text-slate transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand" />
      </div>
      <div className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-slate">
        {label}
      </div>
      <div className="mt-1 break-all text-[15px] font-medium text-ink">
        {value}
      </div>
    </a>
  );
}

function Resume() {
  return (
    <Section id="resume" eyebrow="Résumé" title="The one-pager.">
      <div className="glass-clear rounded-3xl p-3 sm:p-4">
        <div className="flex items-center justify-between gap-3 px-2 py-2">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-slate">
            <FileText className="h-4 w-4 text-brand" />
            resume.pdf
          </div>
          <div className="flex items-center gap-2">
            <a
              href={PROFILE.resume}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 rounded-full glass px-3.5 py-1.5 text-[13px] font-medium text-ink transition-transform hover:-translate-y-0.5"
            >
              Open
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a
              href={PROFILE.resume}
              download
              className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-1.5 text-[13px] font-medium text-white transition-transform hover:-translate-y-0.5"
            >
              <Download className="h-3.5 w-3.5" />
              Download
            </a>
          </div>
        </div>
        <div className="mt-2 overflow-hidden rounded-2xl border border-line bg-white">
          <iframe
            src={`${PROFILE.resume}#view=FitH`}
            title="Brian Pineda résumé"
            className="h-[78vh] min-h-[520px] w-full"
            loading="lazy"
          />
        </div>
        <p className="px-2 pt-3 text-center text-xs text-slate sm:hidden">
          Not rendering on mobile?{" "}
          <a
            href={PROFILE.resume}
            target="_blank"
            rel="noreferrer noopener"
            className="font-medium text-brand underline"
          >
            Open the PDF in a new tab
          </a>
          .
        </p>
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact" eyebrow="Contact" title="Let's build something.">
      <p className="-mt-4 max-w-xl text-[15px] leading-relaxed text-slate">
        Email is the fastest way to reach me — I read every message and reply
        within a day or two, usually faster if it&apos;s about an internship,
        hackathon, or an interesting LLM problem.
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        <ContactCard
          icon={Mail}
          label="Email"
          value={PROFILE.email}
          href={`mailto:${PROFILE.email}`}
        />
        <ContactCard
          icon={Linkedin}
          label="LinkedIn"
          value={PROFILE.linkedinHandle}
          href={PROFILE.linkedin}
        />
        <ContactCard
          icon={Github}
          label="GitHub"
          value={PROFILE.githubHandle}
          href={PROFILE.github}
        />
      </div>
    </Section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mx-auto max-w-6xl px-5 pb-12 pt-6 sm:px-8">
      <div className="glass flex flex-col items-start justify-between gap-4 rounded-3xl px-6 py-5 sm:flex-row sm:items-center">
        <div className="text-sm text-slate">
          © {year} {PROFILE.firstName} {PROFILE.lastName} · Built with Next.js,
          Tailwind & a lot of coffee.
        </div>
        <div className="flex items-center gap-3">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub"
            className="text-slate transition-colors hover:text-ink"
          >
            <Github className="h-[18px] w-[18px]" />
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn"
            className="text-slate transition-colors hover:text-ink"
          >
            <Linkedin className="h-[18px] w-[18px]" />
          </a>
          <a
            href={`mailto:${PROFILE.email}`}
            aria-label="Email"
            className="text-slate transition-colors hover:text-ink"
          >
            <Mail className="h-[18px] w-[18px]" />
          </a>
        </div>
      </div>
    </footer>
  );
}

// ---------------------------------------------------------------------------
// PAGE
// ---------------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Aurora />
      <Nav />
      <main className="relative">
        <Hero />
        <About />
        <Experience />
        <Work />
        <Stack />
        <Resume />
        <Contact />
        <Footer />
      </main>
      <Interactive />
    </>
  );
}

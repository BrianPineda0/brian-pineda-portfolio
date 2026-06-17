import {
  ArrowRight,
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";

// ---------------------------------------------------------------------------
// CONTENT — edit everything from here. The components below consume this data
// and contain no hardcoded copy, so updates only need to happen in one place.
// ---------------------------------------------------------------------------

const PROFILE = {
  firstName: "Brian",
  lastName: "Pineda",
  tagline: "CS + EE @ Rutgers · AI-Native Builder",
  location: "New Brunswick, NJ",
  school: "Rutgers University",
  gpa: "3.8 / 4.0",
  graduation: "B.S. May 2029",
  email: "brian.pineda.work@gmail.com",
  github: "https://github.com/BrianPineda0",
  linkedin: "https://linkedin.com/in/brian-pineda",
  resume: "/resume.pdf",
  availability: "Available · Summer 2026",
  bio: [
    {
      text:
        "I build full-stack products with an ",
    },
    { text: "AI-native workflow", accent: true },
    {
      text:
        ". TypeScript and Next.js on the front, Python and FastAPI on the back, PostgreSQL underneath. First-generation in tech. Currently exploring ",
    },
    { text: "LLM systems, agentic workflows", accent: true },
    {
      text:
        ", and the hardware beneath them. PR Chair at the Mexican American Student Association (MASA) at Rutgers. Open to ",
    },
    { text: "Summer 2026 internships", accent: true },
    { text: " in software engineering and AI/ML." },
  ],
} as const;

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
      "Production LLM platform with a smart router that picks the optimal model per request across 6 providers (OpenRouter, DeepSeek, Grok, ElevenLabs, fal.ai, Google) for real-time cost and quality optimization. Designed 20+ FastAPI endpoints behind a Next.js dashboard with live cost tickers, charts, and interactive panels. Built on a 4-person team using Claude Code with CLAUDE.md context files.",
    stack: ["Next.js", "React", "FastAPI", "PostgreSQL", "Claude"],
    featured: true,
  },
  {
    id: "pc-price-predictor",
    name: "PC Hardware Price Predictor",
    category: "Data Pipeline",
    context: "Personal project · Jan 2026 → Present",
    blurb:
      "5-stage Python data pipeline turning 9,497 raw scraped records into a normalized SQLite database with 3 tables totaling 75,000+ rows. Cross-source matching for 2,106 components using composite-key logic with validation at every stage. Driven end-to-end through Claude Code with structured CLAUDE.md and AGENTS.md context files.",
    stack: ["Python", "SQL", "SQLite", "Pandas", "Claude Code"],
  },
  {
    id: "masa-rutgers",
    name: "MASA Rutgers Website",
    category: "Student Org Web App",
    context: "Mar 2026 → Present · In production",
    blurb:
      "Student-facing web app for the Mexican American Student Association at Rutgers. Real-time forum, event calendar, and gallery deployed via GitHub Pages and used by the org's membership. 10+ production deployments driven by stakeholder feedback.",
    stack: ["JavaScript", "HTML/CSS", "Firebase", "Firestore", "Cursor"],
  },
  {
    id: "android-photos",
    name: "Android Photos App",
    category: "Mobile · OOP",
    context: "Nov → Dec 2025",
    blurb:
      "Photo management app ported from a JavaFX desktop project. 4 OOP model classes restructured with clean separation of concerns. 6 user-facing features, tested across 3+ emulator configurations. Hand-written Activities with individual unit testing and Git-based collaboration.",
    stack: ["Java", "Android Studio"],
  },
];

const STACK_CATEGORIES: { number: string; label: string; items: string[] }[] = [
  {
    number: "01",
    label: "AI-NATIVE WORKFLOW",
    items: [
      "Claude Code",
      "Codex",
      "Cursor",
      "Gemini CLI",
      "CLAUDE.md / AGENTS.md",
      "Prompt Engineering",
      "LLM API Integration",
    ],
  },
  {
    number: "02",
    label: "FRONT END",
    items: ["TypeScript", "JavaScript", "React", "Next.js", "Tailwind CSS", "shadcn"],
  },
  {
    number: "03",
    label: "BACK END",
    items: ["Python", "FastAPI", "Node.js", "REST API Design", "WebSocket", "JWT"],
  },
  {
    number: "04",
    label: "DATA",
    items: ["SQL", "SQLite", "PostgreSQL", "Firebase", "Firestore", "Pandas"],
  },
  {
    number: "05",
    label: "LANGUAGES",
    items: ["Python", "TypeScript", "JavaScript", "Java", "C", "SQL"],
  },
  {
    number: "06",
    label: "CLOUD & TOOLS",
    items: [
      "AWS",
      "Supabase",
      "Git",
      "GitHub",
      "Linux",
      "Android Studio",
      "IntelliJ IDEA",
      "VS Code",
    ],
  },
];

const COURSEWORK = [
  "Data Structures",
  "Intro to AI",
  "Software Methodology",
  "Programming Languages",
  "Data Management",
  "System Programming",
  "Computer Architecture",
  "Discrete Structures",
];

const QUICK_STATS = [
  { k: "MAJOR", v: "CS + EE" },
  { k: "SCHOOL", v: "Rutgers University" },
  { k: "GRAD", v: "May 2029" },
  { k: "GPA", v: "3.8 / 4.0" },
  { k: "STATUS", v: "Dean's List" },
];

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

// ---------------------------------------------------------------------------
// PRIMITIVES
// ---------------------------------------------------------------------------

function PulseDot({ size = 6 }: { size?: number }) {
  const style = { height: size, width: size };
  return (
    <span className="relative inline-flex" style={style}>
      <span
        className="absolute inset-0 rounded-full bg-accent opacity-60 animate-ping"
      />
      <span
        className="relative inline-flex rounded-full bg-accent"
        style={style}
      />
    </span>
  );
}

function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="font-mono text-[11px] tracking-[0.22em] text-mute">
      <span className="text-accent">[{number}]</span>{" "}
      <span className="text-fg/80">{label}</span>
    </div>
  );
}

function StackPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-mute border border-line px-2 py-1 rounded-sm">
      {children}
    </span>
  );
}

// ---------------------------------------------------------------------------
// SECTIONS
// ---------------------------------------------------------------------------

function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-ink/70 border-b border-line">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
        <a href="#top" className="group flex items-center gap-2">
          <span className="font-sans font-medium text-fg">
            {PROFILE.firstName} {PROFILE.lastName}
          </span>
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent group-hover:scale-125 transition-transform" />
        </a>
        <nav className="flex items-center gap-1 md:gap-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[11px] tracking-[0.18em] uppercase text-mute hover:text-accent transition-colors px-3 py-2"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-line">
      <div className="absolute inset-0 dot-grid pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-36 md:pt-44 pb-24 md:pb-32">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-10 lg:col-span-9">
            {/* Availability badge */}
            <div
              className="inline-flex items-center gap-2.5 border border-line bg-panel/60 backdrop-blur-sm px-3 py-1.5 rounded-full opacity-0 animate-fade-up"
              style={{ animationDelay: "0ms" }}
            >
              <PulseDot size={6} />
              <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-fg/80">
                {PROFILE.availability}
              </span>
            </div>

            {/* Tagline */}
            <p
              className="mt-10 font-mono text-[11px] tracking-[0.22em] uppercase text-mute opacity-0 animate-fade-up stagger-1"
            >
              {PROFILE.tagline}
            </p>

            {/* Name */}
            <h1
              className="mt-4 font-sans font-medium tracking-[-0.04em] leading-[0.92] text-fg text-6xl sm:text-7xl md:text-8xl lg:text-9xl opacity-0 animate-fade-up stagger-2"
            >
              {PROFILE.firstName}
              <br />
              <span className="font-serif italic font-normal text-fg">
                {PROFILE.lastName}
              </span>
              <span className="text-accent">.</span>
            </h1>

            {/* Bio */}
            <p
              className="mt-10 max-w-2xl text-base md:text-lg leading-relaxed text-fg/85 opacity-0 animate-fade-up stagger-3"
            >
              {PROFILE.bio.map((piece, i) =>
                "accent" in piece && piece.accent ? (
                  <span key={i} className="text-accent">
                    {piece.text}
                  </span>
                ) : (
                  <span key={i}>{piece.text}</span>
                )
              )}
            </p>

            {/* CTAs */}
            <div
              className="mt-10 flex flex-wrap items-center gap-3 opacity-0 animate-fade-up stagger-4"
            >
              <a
                href="#work"
                className="group inline-flex items-center gap-2 bg-accent text-ink font-medium text-sm px-5 py-3 rounded-sm hover:bg-accent/90 transition-colors"
              >
                View work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 border border-line hover:border-accent text-fg text-sm px-5 py-3 rounded-sm transition-colors"
              >
                Get in touch
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href={PROFILE.resume}
                download
                className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] uppercase text-mute hover:text-accent px-3 py-2 transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                Resume
              </a>
            </div>

            {/* Meta line */}
            <div
              className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] tracking-[0.14em] uppercase text-mute opacity-0 animate-fade-up stagger-5"
            >
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3 w-3 text-accent" />
                {PROFILE.location}
              </span>
              <span className="text-line">/</span>
              <span>{PROFILE.school}</span>
              <span className="text-line">/</span>
              <span>
                GPA <span className="text-fg">{PROFILE.gpa}</span>
              </span>
              <span className="text-line">/</span>
              <span>{PROFILE.graduation}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  const className =
    "group relative border border-line bg-panel/40 hover:border-accent transition-all duration-300 hover:-translate-y-1 block";
  const inner = (
    <>
      <div className="absolute top-0 right-0 z-10">
        <div className="font-mono text-[10px] tracking-[0.22em] bg-accent text-ink px-3 py-1.5">
          FEATURED
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-8 md:p-10">
        <div className="lg:col-span-7 flex flex-col">
          <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-accent">
            {project.category}
          </div>
          <h3 className="mt-3 font-sans font-medium tracking-tight text-4xl md:text-5xl text-fg group-hover:text-fg">
            {project.name}
          </h3>
          <p className="mt-3 font-mono text-[11px] tracking-[0.14em] uppercase text-mute">
            {project.context}
          </p>
          <p className="mt-6 text-fg/80 leading-relaxed max-w-2xl">
            {project.blurb}
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <StackPill key={s}>{s}</StackPill>
            ))}
          </div>
          {project.link ? (
            <div className="mt-7 inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.18em] uppercase text-mute group-hover:text-accent transition-colors">
              View project
              <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          ) : null}
        </div>
        <div className="lg:col-span-5 hidden lg:flex items-end justify-end">
          <div className="relative w-full aspect-square max-w-md">
            <div className="absolute inset-0 border border-line bg-ink overflow-hidden">
              <div className="absolute inset-0 dot-grid opacity-70" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="font-serif italic text-7xl text-accent/30 select-none">
                  {project.name.charAt(0)}
                </div>
              </div>
              <div className="absolute bottom-4 left-4 font-mono text-[10px] tracking-[0.18em] text-mute">
                ./{project.id}
              </div>
              <div className="absolute top-4 left-4 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="h-1.5 w-1.5 rounded-full bg-amber" />
                <span className="h-1.5 w-1.5 rounded-full bg-line" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  return project.link ? (
    <a href={project.link} target="_blank" rel="noreferrer noopener" className={className}>
      {inner}
    </a>
  ) : (
    <article className={className}>{inner}</article>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const className =
    "group relative border border-line bg-panel/30 hover:border-accent transition-all duration-300 hover:-translate-y-1 p-7 md:p-8 flex flex-col";
  const inner = (
    <>
      <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-accent">
        {project.category}
      </div>
      <h3 className="mt-2 font-sans font-medium tracking-tight text-2xl md:text-3xl text-fg">
        {project.name}
      </h3>
      <p className="mt-2 font-mono text-[11px] tracking-[0.14em] uppercase text-mute">
        {project.context}
      </p>
      <p className="mt-5 text-sm text-fg/75 leading-relaxed flex-grow">
        {project.blurb}
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <StackPill key={s}>{s}</StackPill>
        ))}
      </div>
      {project.link ? (
        <div className="mt-6 inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.18em] uppercase text-mute group-hover:text-accent transition-colors">
          View project
          <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      ) : null}
    </>
  );
  return project.link ? (
    <a href={project.link} target="_blank" rel="noreferrer noopener" className={className}>
      {inner}
    </a>
  ) : (
    <article className={className}>{inner}</article>
  );
}

function Work() {
  const featured = PROJECTS.find((p) => p.featured)!;
  const rest = PROJECTS.filter((p) => !p.featured);
  return (
    <section id="work" className="relative border-b border-line">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="grid grid-cols-12 gap-6 items-end mb-12">
          <div className="col-span-12 md:col-span-7">
            <SectionLabel number="01" label="SELECTED WORK" />
            <h2 className="mt-4 font-sans font-medium tracking-tight text-3xl md:text-5xl text-fg">
              Things I&apos;ve <span className="font-serif italic">shipped</span>.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 md:text-right">
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-mute">
              {PROJECTS.length} projects · 2025 → 2026
            </p>
          </div>
        </div>

        <FeaturedCard project={featured} />

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {rest.map((p, i) => (
            <div
              key={p.id}
              className={i === rest.length - 1 && rest.length % 2 !== 0 ? "md:col-span-2" : ""}
            >
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative border-b border-line">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <SectionLabel number="02" label="ABOUT" />
        <div className="mt-10 grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-7">
            <h2 className="font-sans font-medium tracking-tight text-3xl md:text-5xl text-fg leading-[1.05]">
              First-gen <span className="font-serif italic">engineer</span> learning
              the entire stack — from <span className="text-accent">silicon</span> to{" "}
              <span className="text-accent">agents</span>.
            </h2>
            <div className="mt-8 space-y-5 text-fg/80 leading-relaxed">
              <p>
                I&apos;m studying Computer Science and Electrical Engineering at
                Rutgers because I want to understand the full pipeline — from the
                transistors that make computation possible up through the model
                routing layer that&apos;s reshaping how software gets built.
              </p>
              <p>
                Most of my recent work has been{" "}
                <span className="text-accent">production-grade products built with AI tooling</span>
                : Claude Code, Codex, and Cursor as primary collaborators, with{" "}
                <span className="font-mono text-[0.9em] text-accent">CLAUDE.md</span> and{" "}
                <span className="font-mono text-[0.9em] text-accent">AGENTS.md</span>{" "}
                files driving the context. The output speaks for itself: shipped
                LLM platforms, end-to-end data pipelines, real student-org software
                in production.
              </p>
              <p>
                Outside the IDE I serve as{" "}
                <span className="text-accent">PR Chair at MASA Rutgers</span>, where
                I work with stakeholders, ship public-facing software, and own
                communications for a community I care about. I&apos;m open to{" "}
                <span className="text-accent">Summer 2026 SWE and AI/ML internships</span>{" "}
                — particularly anywhere LLM systems, agentic workflows, or the
                hardware-software boundary is the interesting problem.
              </p>
            </div>
          </div>

          <div className="col-span-12 md:col-span-5 flex flex-col gap-6">
            <div className="border border-line bg-panel/40 p-6 md:p-7">
              <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-accent">
                [QUICK STATS]
              </div>
              <dl className="mt-5 divide-y divide-line/70">
                {QUICK_STATS.map((stat) => (
                  <div
                    key={stat.k}
                    className="py-3 flex items-baseline justify-between gap-4"
                  >
                    <dt className="font-mono text-[10px] tracking-[0.18em] uppercase text-mute">
                      {stat.k}
                    </dt>
                    <dd className="font-sans text-sm text-fg text-right">
                      {stat.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="border border-line bg-panel/40 p-6 md:p-7">
              <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-accent">
                [RELEVANT COURSEWORK]
              </div>
              <ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-2">
                {COURSEWORK.map((course) => (
                  <li
                    key={course}
                    className="font-mono text-[11px] tracking-[0.04em] text-fg/80 flex items-center gap-2"
                  >
                    <span className="text-accent">›</span>
                    {course}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stack() {
  return (
    <section id="stack" className="relative border-b border-line">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="grid grid-cols-12 gap-6 items-end mb-12">
          <div className="col-span-12 md:col-span-7">
            <SectionLabel number="03" label="STACK" />
            <h2 className="mt-4 font-sans font-medium tracking-tight text-3xl md:text-5xl text-fg">
              Tools I <span className="font-serif italic">reach for</span>.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STACK_CATEGORIES.map((cat) => (
            <div
              key={cat.number}
              className="group border border-line bg-panel/30 p-6 md:p-7 hover:border-accent transition-colors"
            >
              <div className="font-mono text-[10px] tracking-[0.22em] text-accent">
                [{cat.number}] {cat.label}
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <li
                    key={item}
                    className="font-mono text-[11px] tracking-[0.04em] text-fg/85 border border-line px-2.5 py-1 rounded-sm group-hover:border-line/80"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
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
      className="group relative border border-line bg-panel/30 hover:border-accent hover:-translate-y-1 transition-all duration-300 p-6 md:p-7 flex flex-col"
    >
      <div className="flex items-center justify-between">
        <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-mute group-hover:text-accent transition-colors">
          {label}
        </div>
        <ArrowUpRight className="h-4 w-4 text-mute group-hover:text-accent transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
      <div className="mt-7 flex items-start gap-3">
        <Icon className="h-5 w-5 text-accent mt-0.5 shrink-0" />
        <div className="font-sans text-sm md:text-base text-fg break-all">
          {value}
        </div>
      </div>
    </a>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative border-b border-line">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <SectionLabel number="04" label="CONTACT" />
        <div className="mt-8 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-8">
            <h2 className="font-sans font-medium tracking-[-0.03em] leading-[1.0] text-5xl md:text-7xl text-fg">
              Let&apos;s <span className="font-serif italic">build</span>
              <br />
              something<span className="text-accent">.</span>
            </h2>
            <p className="mt-6 max-w-xl text-fg/75 leading-relaxed">
              Best reached over email. I read every message and reply within a
              day or two — usually faster if it&apos;s about an internship,
              hackathon, or an interesting LLM problem.
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <ContactCard
            icon={Mail}
            label="EMAIL"
            value={PROFILE.email}
            href={`mailto:${PROFILE.email}`}
          />
          <ContactCard
            icon={Linkedin}
            label="LINKEDIN"
            value="brian-pineda"
            href={PROFILE.linkedin}
          />
          <ContactCard
            icon={Github}
            label="GITHUB"
            value="BrianPineda0"
            href={PROFILE.github}
          />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-mute">
          © {year} {PROFILE.firstName} {PROFILE.lastName} · Built with Next.js +
          Tailwind
        </div>
        <div className="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.18em] uppercase text-mute">
          <PulseDot size={6} />
          <span>System operational</span>
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
    <main className="relative">
      <Nav />
      <Hero />
      <Work />
      <About />
      <Stack />
      <Contact />
      <Footer />
    </main>
  );
}

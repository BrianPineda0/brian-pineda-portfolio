"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { TerminalSquare, X } from "lucide-react";

// ---------------------------------------------------------------------------
// An interactive terminal easter egg. Open with the backtick (`) key or the
// floating launcher; close with Esc. It reads the same content the page does,
// passed in as props, so there's a single source of truth (page.tsx constants).
// Progressive enhancement: it's a client island; with JS off it simply doesn't
// render, and the page is fully usable without it.
// ---------------------------------------------------------------------------

type TProfile = {
  firstName: string;
  lastName: string;
  tagline: string;
  location: string;
  email: string;
  github: string;
  githubHandle: string;
  linkedin: string;
  linkedinHandle: string;
  resume: string;
  availability: string;
  currently: string;
};
type TProject = {
  id: string;
  name: string;
  category: string;
  context: string;
  blurb: string;
  stack: readonly string[];
  link?: string;
};
type TStack = { label: string; items: readonly string[] };
type TExp = {
  role: string;
  org: string;
  period: string;
  kind: string;
  points: readonly string[];
};
type TNav = { href: string; label: string };

type Props = {
  profile: TProfile;
  projects: readonly TProject[];
  stack: readonly TStack[];
  experience: readonly TExp[];
  navLinks: readonly TNav[];
};

type Line = { id: number; node: ReactNode };

const COMMANDS = [
  "help",
  "whoami",
  "about",
  "projects",
  "skills",
  "experience",
  "resume",
  "contact",
  "github",
  "linkedin",
  "email",
  "goto",
  "neofetch",
  "ls",
  "clear",
  "echo",
  "exit",
];

export default function Terminal({
  profile,
  projects,
  stack,
  experience,
  navLinks,
}: Props) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<Line[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const histIndex = useRef<number>(-1);
  const idRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const sections = useMemo(
    () => ["top", ...navLinks.map((n) => n.href.replace("#", "")), "resume"],
    [navLinks]
  );

  const push = useCallback((node: ReactNode) => {
    setLines((prev) => [...prev, { id: idRef.current++, node }]);
  }, []);

  const banner = useCallback(() => {
    push(
      <span className="text-brand">
        {profile.firstName} {profile.lastName} — interactive shell
      </span>
    );
    push(
      <span className="text-slate">
        Type <span className="text-ink">help</span> for commands · Esc to close ·
        ` to toggle
      </span>
    );
  }, [profile.firstName, profile.lastName, push]);

  // First open seeds the banner.
  useEffect(() => {
    if (open && lines.length === 0) banner();
  }, [open, lines.length, banner]);

  // Global hotkey: backtick toggles, Esc closes. Ignore backtick typed into
  // the terminal input itself (so `echo \`` etc. still works).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const inField =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);
      if (e.key === "`" && (!inField || target === inputRef.current)) {
        if (!open) {
          e.preventDefault();
          setOpen(true);
        }
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Focus the input and scroll to the bottom whenever opened or output grows.
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines, open]);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return true;
    }
    return false;
  };

  const run = (raw: string) => {
    const trimmed = raw.trim();
    push(
      <span>
        <span className="text-mint">guest@brianepineda.com</span>
        <span className="text-slate">:~$</span> {raw}
      </span>
    );
    if (!trimmed) return;
    setHistory((h) => [...h, trimmed]);
    histIndex.current = -1;

    const [cmd, ...args] = trimmed.split(/\s+/);
    const arg = args.join(" ");

    switch (cmd.toLowerCase()) {
      case "help":
        push(
          <div className="grid grid-cols-2 gap-x-6 gap-y-0.5 sm:grid-cols-3">
            {[
              ["help", "this list"],
              ["whoami", "quick bio"],
              ["about", "longer bio"],
              ["projects [name]", "what I've shipped"],
              ["skills", "tools I use"],
              ["experience", "where I've been"],
              ["resume", "open the PDF"],
              ["contact", "how to reach me"],
              ["goto <section>", "jump to a section"],
              ["neofetch", "system info"],
              ["clear", "wipe the screen"],
            ].map(([c, d]) => (
              <div key={c}>
                <span className="text-brand">{c}</span>{" "}
                <span className="text-slate">— {d}</span>
              </div>
            ))}
          </div>
        );
        break;

      case "whoami":
        push(
          <span>
            {profile.firstName} {profile.lastName} · {profile.tagline} ·{" "}
            {profile.location}. {profile.availability}.
          </span>
        );
        break;

      case "about":
        push(
          <span className="text-slate">
            I&apos;m {profile.firstName}, a CS + EE student at Rutgers currently{" "}
            {profile.currently}. I build production software with an AI-native
            workflow and care about the whole stack — from transistors to the
            model-routing layer. {profile.availability}.
          </span>
        );
        break;

      case "projects":
      case "project": {
        if (arg) {
          const p = projects.find(
            (x) =>
              x.id.toLowerCase() === arg.toLowerCase() ||
              x.name.toLowerCase().includes(arg.toLowerCase())
          );
          if (!p) {
            push(<span className="text-amber">No project matches “{arg}”.</span>);
            break;
          }
          push(
            <div>
              <div className="text-brand">
                {p.name} <span className="text-slate">· {p.category}</span>
              </div>
              <div className="text-slate">{p.context}</div>
              <div className="mt-1">{p.blurb}</div>
              <div className="mt-1 text-slate">stack: {p.stack.join(", ")}</div>
            </div>
          );
        } else {
          push(
            <div>
              {projects.map((p) => (
                <div key={p.id}>
                  <span className="text-brand">{p.id}</span>{" "}
                  <span className="text-slate">— {p.name} · {p.category}</span>
                </div>
              ))}
              <div className="mt-1 text-slate">
                Tip: <span className="text-ink">projects gencost</span> for details.
              </div>
            </div>
          );
        }
        break;
      }

      case "skills":
      case "stack":
        push(
          <div className="space-y-0.5">
            {stack.map((s) => (
              <div key={s.label}>
                <span className="text-brand">{s.label}:</span>{" "}
                <span className="text-slate">{s.items.join(", ")}</span>
              </div>
            ))}
          </div>
        );
        break;

      case "experience":
      case "exp":
        push(
          <div className="space-y-1">
            {experience.map((x) => (
              <div key={x.role}>
                <span className="text-brand">{x.role}</span>{" "}
                <span className="text-slate">
                  · {x.org} · {x.period}
                </span>
              </div>
            ))}
          </div>
        );
        break;

      case "resume":
      case "cv":
        push(<span>Opening résumé in a new tab…</span>);
        window.open(profile.resume, "_blank", "noopener,noreferrer");
        break;

      case "contact":
        push(
          <div>
            <div>email: <span className="text-brand">{profile.email}</span></div>
            <div>linkedin: <span className="text-brand">{profile.linkedinHandle}</span></div>
            <div>github: <span className="text-brand">{profile.githubHandle}</span></div>
          </div>
        );
        break;

      case "email":
        push(<span>Opening mail client…</span>);
        window.location.href = `mailto:${profile.email}`;
        break;

      case "github":
        push(<span>Opening GitHub…</span>);
        window.open(profile.github, "_blank", "noopener,noreferrer");
        break;

      case "linkedin":
        push(<span>Opening LinkedIn…</span>);
        window.open(profile.linkedin, "_blank", "noopener,noreferrer");
        break;

      case "goto":
      case "cd": {
        const dest = (args[0] || "").replace("#", "").toLowerCase();
        if (!dest) {
          push(<span className="text-slate">usage: goto {sections.join(" | ")}</span>);
          break;
        }
        if (sections.includes(dest) && go(dest)) {
          push(<span>→ {dest}</span>);
          setOpen(false);
        } else {
          push(<span className="text-amber">No section “{dest}”.</span>);
        }
        break;
      }

      case "ls":
        push(<span className="text-slate">{sections.join("  ")}</span>);
        break;

      case "neofetch":
        push(
          <div className="flex gap-4">
            <pre className="text-brand leading-tight">{`  ___
 | _ )  BP
 | _ \\  __
 |___/`}</pre>
            <div className="text-slate">
              <div><span className="text-brand">user</span>: {profile.firstName} {profile.lastName}</div>
              <div><span className="text-brand">role</span>: {profile.tagline}</div>
              <div><span className="text-brand">loc</span>: {profile.location}</div>
              <div><span className="text-brand">shell</span>: brian-sh 1.0</div>
              <div><span className="text-brand">status</span>: {profile.availability}</div>
            </div>
          </div>
        );
        break;

      case "echo":
        push(<span>{arg}</span>);
        break;

      case "clear":
      case "cls":
        setLines([]);
        break;

      case "exit":
      case "quit":
        setOpen(false);
        break;

      // --- easter eggs ---
      case "sudo":
        push(<span className="text-amber">Nice try. You don&apos;t have root here 😏</span>);
        break;
      case "rm":
        push(<span className="text-amber">I&apos;m not falling for that one.</span>);
        break;
      case "coffee":
        push(<span>☕ removed from the footer, still fueling the commits.</span>);
        break;
      case "hire":
      case "hireme":
        push(<span className="text-brand">Excellent choice. → run `email` 🚀</span>);
        break;

      default:
        push(
          <span className="text-amber">
            command not found: {cmd}. Type <span className="text-ink">help</span>.
          </span>
        );
    }
  };

  const complete = () => {
    const parts = input.split(/\s+/);
    if (parts.length <= 1) {
      const matches = COMMANDS.filter((c) => c.startsWith(parts[0]));
      if (matches.length === 1) setInput(matches[0] + " ");
      else if (matches.length > 1) push(<span className="text-slate">{matches.join("  ")}</span>);
    } else {
      const first = parts[0].toLowerCase();
      const last = parts[parts.length - 1].toLowerCase();
      const pool =
        first === "goto" || first === "cd"
          ? sections
          : first === "projects"
          ? projects.map((p) => p.id)
          : [];
      const matches = pool.filter((c) => c.startsWith(last));
      if (matches.length === 1) {
        parts[parts.length - 1] = matches[0];
        setInput(parts.join(" "));
      } else if (matches.length > 1) {
        push(<span className="text-slate">{matches.join("  ")}</span>);
      }
    }
  };

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      histIndex.current =
        histIndex.current < 0
          ? history.length - 1
          : Math.max(0, histIndex.current - 1);
      setInput(history[histIndex.current] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIndex.current < 0) return;
      histIndex.current = histIndex.current + 1;
      if (histIndex.current >= history.length) {
        histIndex.current = -1;
        setInput("");
      } else {
        setInput(history[histIndex.current] ?? "");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      complete();
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open terminal"
        title="Open terminal (`)"
        className="glass-bar fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-full text-ink transition-transform hover:-translate-y-0.5 hover:scale-105"
      >
        <TerminalSquare className="h-5 w-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center p-3 sm:items-end sm:justify-end sm:p-5">
          {/* click-away backdrop */}
          <button
            type="button"
            aria-label="Close terminal"
            onClick={() => setOpen(false)}
            className="absolute inset-0 cursor-default bg-ink/10"
          />
          <div
            role="dialog"
            aria-label="Interactive terminal"
            className="glass-bar relative flex h-[60vh] max-h-[520px] w-full max-w-xl flex-col overflow-hidden rounded-2xl shadow-glass-lg"
            onClick={() => inputRef.current?.focus()}
          >
            {/* title bar */}
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-slate">
                <span className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber" />
                  <span className="h-2.5 w-2.5 rounded-full bg-mint" />
                  <span className="h-2.5 w-2.5 rounded-full bg-brand" />
                </span>
                guest@brianepineda.com
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="text-slate transition-colors hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* output */}
            <div
              ref={bodyRef}
              className="flex-1 space-y-1 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-relaxed text-ink"
            >
              {lines.map((l) => (
                <div key={l.id} className="whitespace-pre-wrap break-words">
                  {l.node}
                </div>
              ))}
              {/* input row */}
              <div className="flex items-center gap-2">
                <span className="shrink-0 text-mint">
                  guest@brianepineda.com<span className="text-slate">:~$</span>
                </span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onInputKey}
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="off"
                  className="w-full flex-1 bg-transparent text-ink caret-brand outline-none"
                  aria-label="Terminal input"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import Image from "next/image";
import { academicProjects, projects, research } from "@/content/site";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

/** University of Helsinki's accent, so coursework ties back to that card. */
const UNIVERSITY = "#a78bfa";

export default function Projects() {
  return (
    <SectionHeader
      id="projects"
      eyebrow="Selected work"
      title="Projects & research"
      lead="Products I've shipped or am building, the machine learning and data work from my master's, and published research."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((project, i) => (
          <Reveal key={project.name} delay={i * 70}>
            <article
              className="card card-hover group relative flex h-full flex-col overflow-hidden p-6"
              style={{ borderTop: `3px solid ${project.color}` }}
            >
              <span
                className="pointer-events-none absolute -top-16 -right-16 h-52 w-52 rounded-full opacity-[0.12] blur-3xl"
                style={{ background: project.color }}
                aria-hidden="true"
              />

              {/* Context above the name, so neither has to wrap around the other */}
              <div className="relative flex items-start gap-3">
                {project.icon ? (
                  <Image
                    src={project.icon}
                    alt=""
                    width={44}
                    height={44}
                    className="shrink-0 rounded-[10px] border border-line"
                  />
                ) : null}
                <div className="min-w-0">
                  <span
                    className="block font-mono text-[0.58rem] tracking-[0.16em] uppercase"
                    style={{ color: project.color }}
                  >
                    {project.context}
                  </span>
                  <h3 className="mt-1 text-[0.98rem] leading-snug font-semibold tracking-tight">
                    {project.name}
                  </h3>
                </div>
              </div>

              <p className="relative mt-3 flex-1 text-sm leading-relaxed text-muted">
                {project.summary}
              </p>

              <p className="relative mt-4 font-mono text-[0.66rem] text-faint">{project.status}</p>

              <div className="relative mt-4 flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <span key={tech} className="chip font-mono">
                    {tech}
                  </span>
                ))}
              </div>

              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline relative mt-5 self-start font-mono text-xs"
                  style={{ color: project.color }}
                >
                  {project.linkLabel} ↗
                </a>
              ) : null}
            </article>
          </Reveal>
        ))}
      </div>

      <GroupDivider label="University projects" />

      <div className="grid gap-4 lg:grid-cols-3">
        {academicProjects.map((item, i) => (
          <Reveal key={item.name} delay={i * 70}>
            <article
              className="card card-hover relative flex h-full flex-col overflow-hidden p-6"
              style={{ borderTop: `3px solid ${UNIVERSITY}` }}
            >
              <span
                className="pointer-events-none absolute -top-16 -right-16 h-52 w-52 rounded-full opacity-[0.1] blur-3xl"
                style={{ background: UNIVERSITY }}
                aria-hidden="true"
              />

              <div className="relative flex items-baseline justify-between gap-3">
                <span
                  className="font-mono text-[0.58rem] tracking-[0.16em] uppercase"
                  style={{ color: UNIVERSITY }}
                >
                  {item.course}
                </span>
                {item.team ? (
                  <span className="shrink-0 font-mono text-[0.58rem] text-faint">{item.team}</span>
                ) : null}
              </div>
              <h3 className="relative mt-1.5 text-[0.98rem] leading-snug font-semibold tracking-tight">
                {item.name}
              </h3>

              <p className="relative mt-3 text-sm leading-relaxed text-muted">{item.summary}</p>
              <p className="relative mt-3 flex-1 text-[0.8rem] leading-relaxed text-faint">
                {item.detail}
              </p>

              {item.result ? (
                <p
                  className="relative mt-5 rounded-md border px-3 py-2 font-mono text-[0.7rem]"
                  style={{ borderColor: "var(--line)", color: UNIVERSITY }}
                >
                  {item.result}
                </p>
              ) : null}

              <div className="relative mt-4 flex flex-wrap gap-1.5">
                {item.tech.map((tech) => (
                  <span key={tech} className="chip font-mono">
                    {tech}
                  </span>
                ))}
              </div>

              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline relative mt-5 self-start font-mono text-xs"
                  style={{ color: UNIVERSITY }}
                >
                  {item.linkLabel} ↗
                </a>
              ) : null}
            </article>
          </Reveal>
        ))}
      </div>

      {/* Research sits in the same section as the work it relates to, but
          visible rather than behind a tab — a paper only counts if it's read. */}
      <GroupDivider label="Research" />

      <div className="grid gap-4 md:grid-cols-2">
        {research.map((item, i) => (
          <Reveal key={item.title} delay={i * 70}>
            <article className="card card-hover h-full p-6">
              <span className="chip font-mono">{item.type}</span>
              <h4 className="mt-3.5 text-sm leading-relaxed font-medium">{item.title}</h4>
              <p className="mt-2 text-xs text-faint">{item.venue}</p>
              {"href" in item && item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline mt-3 inline-block font-mono text-xs text-muted hover:text-brand"
                >
                  {item.linkLabel} ↗
                </a>
              ) : null}
            </article>
          </Reveal>
        ))}
      </div>
    </SectionHeader>
  );
}

function GroupDivider({ label }: { label: string }) {
  return (
    <Reveal>
      <div className="mt-14 mb-7 flex items-center gap-4">
        <span className="h-px flex-1" style={{ background: "var(--line)" }} aria-hidden="true" />
        <h3 className="font-mono text-[0.62rem] tracking-[0.2em] text-faint uppercase">{label}</h3>
        <span className="h-px flex-1" style={{ background: "var(--line)" }} aria-hidden="true" />
      </div>
    </Reveal>
  );
}

import Image from "next/image";
import { projects } from "@/content/site";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

export default function Projects() {
  return (
    <SectionHeader
      id="projects"
      eyebrow="Selected work"
      title="Projects"
      lead="Products I've shipped or am building — one of my own, three from Inverse.AI."
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
    </SectionHeader>
  );
}

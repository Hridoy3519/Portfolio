import {
  type SimpleIcon,
  siCplusplus,
  siDart,
  siDocker,
  siExpress,
  siFirebase,
  siFlutter,
  siGit,
  siHtml5,
  siJavascript,
  siJira,
  siKotlin,
  siLinux,
  siMongodb,
  siMui,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPython,
  siPytorch,
  siReact,
  siScikitlearn,
  siSwift,
  siTailwindcss,
  siTypescript,
} from "simple-icons";
import { skills } from "@/content/site";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

/**
 * Brand icon for each skill that is a product. Concepts — OOP, SOLID, REST
 * APIs, NLP and so on — have no logo and stay text-only. Imported by name, so
 * a renamed or removed icon fails the build instead of rendering blank.
 */
const ICONS: Record<string, SimpleIcon> = {
  "C++": siCplusplus,
  Python: siPython,
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  Swift: siSwift,
  Kotlin: siKotlin,
  Dart: siDart,
  React: siReact,
  "Next.js": siNextdotjs,
  SwiftUI: siSwift,
  Flutter: siFlutter,
  "Tailwind CSS": siTailwindcss,
  "Material UI": siMui,
  "HTML/CSS": siHtml5,
  "Node.js": siNodedotjs,
  "Express.js": siExpress,
  MongoDB: siMongodb,
  MySQL: siMysql,
  Firebase: siFirebase,
  PyTorch: siPytorch,
  "scikit-learn": siScikitlearn,
  Linux: siLinux,
  Docker: siDocker,
  Git: siGit,
  Jira: siJira,
  "Firebase Analytics": siFirebase,
};

/**
 * Brand colour to reveal on hover. Near-black brands (Next.js, Express) are
 * skipped: on the dark theme they would vanish, so they keep the text colour.
 */
function hoverColor(hex: string): string | undefined {
  const n = parseInt(hex, 16);
  const luminance = 0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255);
  return luminance < 60 ? undefined : `#${hex}`;
}

export default function Skills() {
  return (
    <SectionHeader
      id="skills"
      eyebrow="Capabilities"
      title="Technical skills"
      lead="Tools and technologies I work with, grouped by layer of the stack."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {skills.map((group, i) => (
          <Reveal key={group.group} delay={i * 55}>
            <div className="card card-hover h-full p-6">
              <div className="flex items-center gap-2.5">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: "var(--brand)" }}
                  aria-hidden="true"
                />
                <h3 className="font-mono text-[0.65rem] tracking-[0.18em] text-brand uppercase">
                  {group.group}
                </h3>
              </div>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {group.items.map((item) => {
                  const icon = ICONS[item];
                  return (
                    <li
                      key={item}
                      className="chip skill-chip gap-1.5"
                      style={
                        icon
                          ? ({ "--skill-hover": hoverColor(icon.hex) } as React.CSSProperties)
                          : undefined
                      }
                    >
                      {icon ? (
                        <svg
                          viewBox="0 0 24 24"
                          width="13"
                          height="13"
                          fill="currentColor"
                          className="shrink-0"
                          aria-hidden="true"
                        >
                          <path d={icon.path} />
                        </svg>
                      ) : null}
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionHeader>
  );
}

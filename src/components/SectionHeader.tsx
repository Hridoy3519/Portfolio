import type { ReactNode } from "react";
import Reveal from "./Reveal";

type SectionHeaderProps = {
  id: string;
  /** Short category label, shown in the bordered sign above the heading. */
  eyebrow: string;
  title: string;
  lead?: string;
  accent?: string;
  children: ReactNode;
};

/** Section wrapper with a signage-style eyebrow above the heading. */
export default function SectionHeader({
  id,
  eyebrow,
  title,
  lead,
  accent = "var(--brand)",
  children,
}: SectionHeaderProps) {
  return (
    <section id={id} className="shell scroll-mt-24 py-16 md:py-24">
      <Reveal>
        <div className="mb-9 md:mb-12">
          <span
            className="inline-flex items-center gap-2 rounded-md border px-2.5 py-1 font-mono text-[0.65rem] tracking-[0.18em] uppercase"
            style={{ borderColor: accent, color: accent }}
          >
            {eyebrow}
          </span>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
          {lead ? (
            <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-muted">{lead}</p>
          ) : null}
        </div>
      </Reveal>
      {children}
    </section>
  );
}

import { education } from "@/content/site";
import Milepost from "./Milepost";
import Reveal from "./Reveal";
import RoleCard from "./RoleCard";

export default function Education() {
  return (
    <section id="education" className="shell scroll-mt-24 py-16 md:py-24">
      <Reveal>
        <div className="mb-8 md:mb-10">
          <span
            className="inline-flex items-center gap-2 rounded-md border px-2.5 py-1 font-mono text-[0.65rem] tracking-[0.18em] uppercase"
            style={{ borderColor: "var(--brand)", color: "var(--brand)" }}
          >
            Education
          </span>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
            Where I studied
          </h2>
          <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-muted">
            A fully funded master&apos;s in Helsinki, built on a computer science
            degree from Sylhet.
          </p>
        </div>
      </Reveal>

      <div>
        {education.map((stop, i) => (
          <div key={stop.id}>
            {/* The milepost stands between the two degrees */}
            {i > 0 ? <Milepost /> : null}
            <RoleCard stop={stop} />
          </div>
        ))}
      </div>
    </section>
  );
}

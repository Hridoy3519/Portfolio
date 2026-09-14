import { profile, socials } from "@/content/site";
import Reveal from "./Reveal";
import TrainIcon from "./TrainIcon";

export default function FinalStop() {
  return (
    <section id="final-stop" className="shell scroll-mt-24 py-16 md:py-24">
      <Reveal>
        <div className="mb-9 md:mb-12">
          <span
            className="inline-flex items-center gap-2 rounded-md border px-2.5 py-1 font-mono text-[0.65rem] tracking-[0.18em] uppercase"
            style={{ borderColor: "var(--brand)", color: "var(--brand)" }}
          >
            Final stop · Ticket office
          </span>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
            Want to ride the next leg with me?
          </h2>
          <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-muted">
            I&apos;m open to graduate software engineering roles and interesting collaborations.
            Take the ticket — email is the fastest track.
          </p>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <div className="pass shadow-card grid overflow-hidden md:grid-cols-[1fr_15rem]">
          {/* Main ticket */}
          <div className="relative px-6 py-8 md:px-9 md:py-10">
            <div
              className="glow-orb pointer-events-none absolute -bottom-24 -left-16 h-72 w-72"
              aria-hidden="true"
            />

            <div className="relative">
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.2em] text-faint uppercase">
                  <TrainIcon size={14} className="text-brand" />
                  {profile.lineName}
                </span>
                <span className="font-mono text-[0.65rem] text-faint">ONE-WAY · OPEN RETURN</span>
              </div>

              <div className="mt-7 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                <div>
                  <p className="font-mono text-[0.6rem] tracking-[0.18em] text-faint uppercase">From</p>
                  <p className="mt-1 font-mono text-xl font-semibold tracking-tight md:text-2xl">SYL</p>
                  <p className="text-[0.68rem] text-faint">Sylhet · 2019</p>
                </div>

                <div className="flex flex-col items-center gap-1.5 px-2">
                  <TrainIcon size={18} className="text-brand" />
                  <span className="h-[2px] w-16 md:w-24" style={{ background: "var(--rail)" }} aria-hidden="true" />
                  <span className="font-mono text-[0.58rem] text-faint">7 YRS</span>
                </div>

                <div className="text-right">
                  <p className="font-mono text-[0.6rem] tracking-[0.18em] text-faint uppercase">To</p>
                  <p className="mt-1 font-mono text-xl font-semibold tracking-tight md:text-2xl" style={{ color: "var(--brand)" }}>
                    HEL
                  </p>
                  <p className="text-[0.68rem] text-faint">Helsinki · now</p>
                </div>
              </div>

              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-6 sm:grid-cols-3">
                <Field label="Passenger" value={profile.name} />
                <Field label="Class" value="Software Engineer" />
                <Field label="Status" value="Open to offers" />
              </dl>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition hover:opacity-90"
                  style={{ background: "var(--brand)", color: "var(--bg)" }}
                >
                  {profile.email}
                </a>
                <a
                  href={socials[1].href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition hover:text-brand"
                  style={{ borderColor: "var(--line-strong)" }}
                >
                  LinkedIn ↗
                </a>
                <a
                  href={socials[0].href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition hover:text-brand"
                  style={{ borderColor: "var(--line-strong)" }}
                >
                  GitHub ↗
                </a>
              </div>
            </div>
          </div>

          {/* Perforated seam + stub */}
          <div className="relative" style={{ background: "var(--bg-subtle)" }}>
            <span
              className="perforation absolute inset-x-0 top-0 h-px md:inset-y-0 md:left-0 md:h-auto md:w-px"
              aria-hidden="true"
            />
            {/* Notches cut into either end of the seam */}
            <span
              className="absolute top-0 -left-2 h-4 w-4 -translate-y-1/2 rounded-full border md:-top-2 md:left-0 md:-translate-x-1/2 md:translate-y-0"
              style={{ background: "var(--bg)", borderColor: "var(--line-strong)" }}
              aria-hidden="true"
            />
            <span
              className="absolute top-0 -right-2 h-4 w-4 -translate-y-1/2 rounded-full border md:top-auto md:right-auto md:-bottom-2 md:left-0 md:-translate-x-1/2 md:translate-y-0"
              style={{ background: "var(--bg)", borderColor: "var(--line-strong)" }}
              aria-hidden="true"
            />
            <span className="stamp absolute top-5 right-5" aria-hidden="true">
              Valid · all zones
            </span>

            <div className="flex h-full flex-col justify-between gap-6 px-6 py-8 md:px-7">
              <div>
                <p className="font-mono text-[0.6rem] tracking-[0.18em] text-faint uppercase">Seat</p>
                <p className="mt-1 font-mono text-lg font-semibold">01A</p>
                <p className="mt-4 font-mono text-[0.6rem] tracking-[0.18em] text-faint uppercase">
                  Based in
                </p>
                <p className="mt-1 text-sm">{profile.location}</p>
                <p className="mt-4 font-mono text-[0.6rem] tracking-[0.18em] text-faint uppercase">
                  Direct line
                </p>
                <p className="mt-1 font-mono text-xs text-muted">{profile.phone}</p>
              </div>

              <Barcode />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[0.6rem] tracking-[0.18em] text-faint uppercase">{label}</dt>
      <dd className="mt-1 text-sm leading-snug">{value}</dd>
    </div>
  );
}

/** Decorative barcode — fixed widths so server and client render identically. */
function Barcode() {
  const bars = [3, 1, 2, 1, 1, 3, 2, 1, 1, 2, 3, 1, 2, 2, 1, 1, 3, 1, 2, 1, 1, 2, 3, 2, 1, 1, 2, 1];
  return (
    <div aria-hidden="true">
      <div className="flex h-12 items-end gap-[2px]">
        {bars.map((w, i) => (
          <span
            key={i}
            className="h-full"
            style={{ width: `${w}px`, background: i % 2 ? "transparent" : "var(--text)" }}
          />
        ))}
      </div>
      <p className="mt-2 font-mono text-[0.58rem] tracking-[0.2em] text-faint">HRIDOY · 2019—∞</p>
    </div>
  );
}

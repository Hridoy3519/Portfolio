/**
 * The view out of the carriage window: two silhouette layers drifting at
 * different speeds, so the horizon crawls while the foreground rushes past.
 * Purely decorative — hidden from assistive tech.
 */
export default function Scenery() {
  return (
    <div
      className="relative h-40 overflow-hidden rounded-xl border md:h-52"
      style={{ borderColor: "var(--line-strong)", background: "var(--bg-subtle)" }}
      aria-hidden="true"
    >
      {/* Sky wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, color-mix(in srgb, var(--brand) 12%, transparent), transparent 65%)",
        }}
      />

      {/* Far skyline */}
      <div className="drift-slow absolute bottom-8 left-0 flex w-[200%] opacity-40">
        <Skyline />
        <Skyline />
      </div>

      {/* Near poles and trees */}
      <div className="drift-fast absolute bottom-7 left-0 flex w-[200%] opacity-70">
        <Foreground />
        <Foreground />
      </div>

      {/* Track bed */}
      <div
        className="absolute inset-x-0 bottom-0 h-8 border-t"
        style={{ borderColor: "var(--line-strong)", background: "var(--bg-elev)" }}
      >
        <div className="track-ties absolute inset-x-0 top-2 h-3 opacity-60" />
        <div className="absolute inset-x-0 top-[0.35rem] h-[2px]" style={{ background: "var(--rail)" }} />
      </div>

      {/* Window bezel */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl"
        style={{ boxShadow: "inset 0 0 0 6px var(--bg-elev), inset 0 0 0 7px var(--line-strong)" }}
      />
    </div>
  );
}

function Skyline() {
  return (
    <svg viewBox="0 0 600 120" className="h-24 w-1/2 shrink-0" preserveAspectRatio="none">
      <path
        d="M0 120 L0 78 Q60 50 120 74 L150 74 L150 44 L178 44 L178 74 L220 74 L220 58 L246 58 L246 74 L300 74 Q350 40 400 70 L430 70 L430 36 L452 36 L452 70 L500 70 L500 54 L528 54 L528 70 L600 70 L600 120 Z"
        fill="var(--rail)"
      />
    </svg>
  );
}

function Foreground() {
  return (
    <svg viewBox="0 0 600 120" className="h-24 w-1/2 shrink-0" preserveAspectRatio="none">
      <g fill="var(--rail)">
        {[40, 190, 330, 480].map((x) => (
          <g key={x}>
            <rect x={x} y={46} width="3" height="74" />
            <rect x={x - 12} y={46} width="27" height="3" />
          </g>
        ))}
        {[110, 255, 400, 545].map((x) => (
          <g key={x}>
            <rect x={x} y={78} width="4" height="42" />
            <ellipse cx={x + 2} cy={72} rx="15" ry="18" />
          </g>
        ))}
      </g>
    </svg>
  );
}

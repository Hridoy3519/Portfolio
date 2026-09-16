"use client";

import { useEffect, useRef } from "react";

/**
 * The hero centrepiece: a wireframe train running past three layers of scenery.
 * The sky follows the page theme — day in light, night in dark — through the
 * --sky-* variables in globals.css, so it switches with the toggle and needs no
 * JavaScript. The wheels spin at a rate that follows scroll velocity.
 * Decorative — hidden from assistive tech, and stilled by reduced-motion.
 */
export default function TrainScene() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lastY = window.scrollY;
    let velocity = 0;
    let frame = 0;
    let running = true;

    const tick = () => {
      const y = window.scrollY;
      // Exponential smoothing, so the wheels ease rather than snap.
      velocity = velocity * 0.86 + Math.abs(y - lastY) * 0.14;
      lastY = y;

      const t = Math.min(velocity, 55) / 55;
      const duration = 0.85 - t * 0.72; // 0.85s at rest → 0.13s at speed
      scene.style.setProperty("--wheel-spin", `${duration.toFixed(3)}s`);

      if (running) frame = requestAnimationFrame(tick);
    };

    // Only run the loop while the scene is actually on screen.
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        frame = requestAnimationFrame(tick);
      } else if (!entry.isIntersecting) {
        running = false;
        cancelAnimationFrame(frame);
      }
    });
    observer.observe(scene);
    frame = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={sceneRef}
      className="relative h-48 overflow-hidden rounded-2xl border sm:h-56 md:h-64"
      style={{ borderColor: "var(--line-strong)", background: "var(--bg-subtle)" }}
      aria-hidden="true"
    >
      {/* Sky: day in the light theme, night in the dark */}
      <div className="absolute inset-0" style={{ background: "var(--sky)" }} />

      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: "var(--sky-stars)",
          backgroundImage:
            "radial-gradient(1px 1px at 8% 26%, #fff 50%, transparent 51%), radial-gradient(1px 1px at 19% 12%, #fff 50%, transparent 51%), radial-gradient(1.5px 1.5px at 31% 34%, #fff 50%, transparent 51%), radial-gradient(1px 1px at 44% 9%, #fff 50%, transparent 51%), radial-gradient(1px 1px at 57% 28%, #fff 50%, transparent 51%), radial-gradient(1.5px 1.5px at 69% 15%, #fff 50%, transparent 51%), radial-gradient(1px 1px at 78% 38%, #fff 50%, transparent 51%), radial-gradient(1px 1px at 91% 20%, #fff 50%, transparent 51%)",
        }}
      />

      {/* Sun by day, moon by night */}
      <div
        className="absolute right-[12%] h-9 w-9 rounded-full transition-colors duration-500 md:h-11 md:w-11"
        style={{
          top: "var(--sky-body-top)",
          background: "var(--sky-body)",
          boxShadow: "0 0 42px 12px var(--sky-glow)",
        }}
      />

      {/* Far hills — the tea gardens */}
      <div className="drift-slow absolute bottom-10 left-0 flex w-[200%] opacity-40">
        <Hills />
        <Hills />
      </div>

      {/* Mid trees */}
      <div className="drift-mid absolute bottom-10 left-0 flex w-[200%] opacity-60">
        <Trees />
        <Trees />
      </div>

      {/* Catenary poles, closest to the track */}
      <div className="drift-near absolute bottom-10 left-0 flex w-[200%] opacity-80">
        <Poles />
        <Poles />
      </div>

      {/* Track bed */}
      <div
        className="absolute inset-x-0 bottom-0 h-10 border-t"
        style={{ borderColor: "var(--line-strong)", background: "var(--bg-elev)" }}
      >
        <div className="track-ties ties-run absolute inset-x-0 top-2 h-3 opacity-70" />
        <div className="absolute inset-x-0 top-[0.35rem] h-[2px]" style={{ background: "var(--rail)" }} />
        <div className="absolute inset-x-0 top-[1.15rem] h-[2px]" style={{ background: "var(--rail)" }} />
      </div>

      {/* The train */}
      <div className="train-bob absolute bottom-[1.55rem] left-[4%] w-[92%] max-w-[640px] md:left-[8%] md:w-[60%]">
        <Train />
      </div>

      {/* Window bezel */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{ boxShadow: "inset 0 0 0 1px color-mix(in srgb, var(--brand) 20%, transparent)" }}
      />
    </div>
  );
}

function Train() {
  const wheel = (cx: number) => (
    <g key={cx} className="wheel">
      <circle cx={cx} cy={97} r={8} fill="var(--bg-elev)" stroke="var(--brand)" strokeWidth="2" />
      <path d={`M${cx - 8} 97h16M${cx} 89v16`} stroke="var(--brand)" strokeWidth="1.5" opacity="0.7" />
    </g>
  );

  const carriage = (x: number) => (
    <g key={x}>
      <rect x={x} y={30} width={168} height={56} rx={8} fill="var(--bg-elev)" stroke="var(--brand)" strokeWidth="2" />
      {[18, 50, 82, 114, 146].map((wx) => (
        <rect key={wx} x={x + wx} y={42} width={22} height={20} rx={3} fill="var(--board-ink)" opacity="0.85" />
      ))}
      <path d={`M${x + 8} 72h152`} stroke="var(--brand)" strokeWidth="1.2" opacity="0.5" />
      <rect x={x + 10} y={86} width={148} height={5} fill="var(--rail)" />
      {wheel(x + 34)}
      {wheel(x + 58)}
      {wheel(x + 118)}
      {wheel(x + 142)}
    </g>
  );

  return (
    <svg viewBox="0 0 660 110" className="h-auto w-full overflow-visible">
      <defs>
        <linearGradient id="beam" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--board-ink)" stopOpacity="0.35" />
          <stop offset="1" stopColor="var(--board-ink)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Headlight beam */}
      <path className="beam" d="M552 70 L660 44 L660 106 L552 82 Z" fill="url(#beam)" />

      {/* Tail light */}
      <circle className="blink" cx={7} cy={76} r={3} fill="#fb7185" />

      {carriage(4)}
      <rect x={172} y={62} width={12} height={6} fill="var(--rail)" />
      {carriage(184)}
      <rect x={352} y={62} width={12} height={6} fill="var(--rail)" />

      {/* Locomotive */}
      <g>
        <path d="M430 30 L446 16 H478" stroke="var(--brand)" strokeWidth="2" fill="none" />
        <path
          d="M364 86 V38 q0-8 8-8 h118 q32 0 48 22 l16 24 q3 10 -7 10 z"
          fill="var(--bg-elev)"
          stroke="var(--brand)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {[380, 412, 444].map((wx) => (
          <rect key={wx} x={wx} y={42} width={22} height={20} rx={3} fill="var(--board-ink)" opacity="0.85" />
        ))}
        <path d="M482 40 h16 q14 0 22 12 l8 12 h-46 z" fill="var(--board-ink)" opacity="0.9" />
        <path d="M372 72h150" stroke="var(--brand)" strokeWidth="1.2" opacity="0.5" />
        <rect x={370} y={86} width={176} height={5} fill="var(--rail)" />
        <circle cx={549} cy={76} r={4} fill="var(--board-ink)" />
        {wheel(394)}
        {wheel(418)}
        {wheel(492)}
        {wheel(516)}
      </g>
    </svg>
  );
}

function Hills() {
  return (
    <svg viewBox="0 0 600 100" className="h-28 w-1/2 shrink-0 md:h-36" preserveAspectRatio="none">
      <path
        d="M0 100 V62 C70 34 130 72 210 52 C290 32 350 76 430 56 C510 36 555 60 600 64 V100 Z"
        fill="var(--rail)"
      />
      <path
        d="M0 100 V78 C90 60 160 86 250 72 C340 58 420 90 520 74 C560 68 580 72 600 76 V100 Z"
        fill="var(--rail)"
        opacity="0.6"
      />
    </svg>
  );
}

function Trees() {
  const pines = [30, 95, 210, 290, 380, 470, 540];
  return (
    <svg viewBox="0 0 600 100" className="h-20 w-1/2 shrink-0 md:h-24" preserveAspectRatio="none">
      <g fill="var(--rail)">
        {pines.map((x, i) => {
          const h = 46 + (i % 3) * 10;
          return (
            <g key={x}>
              <path d={`M${x} ${100 - h} L${x + 14} 92 L${x - 14} 92 Z`} />
              <path d={`M${x} ${100 - h + 14} L${x + 18} 96 L${x - 18} 96 Z`} />
              <rect x={x - 2} y={92} width={4} height={8} />
            </g>
          );
        })}
        {[160, 340, 510].map((x) => (
          <g key={x}>
            <rect x={x - 2} y={70} width={4} height={30} />
            <ellipse cx={x} cy={66} rx={16} ry={18} />
          </g>
        ))}
      </g>
    </svg>
  );
}

function Poles() {
  return (
    <svg viewBox="0 0 600 120" className="h-28 w-1/2 shrink-0 md:h-36" preserveAspectRatio="none">
      <path
        d="M0 22 Q150 46 300 22 T600 22"
        stroke="var(--rail)"
        strokeWidth="1.5"
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
      <g fill="var(--rail)">
        {[150, 450].map((x) => (
          <g key={x}>
            <rect x={x - 2} y={18} width={4} height={102} />
            <rect x={x - 16} y={18} width={32} height={3} />
            <rect x={x - 6} y={10} width={12} height={8} rx={1} />
          </g>
        ))}
      </g>
    </svg>
  );
}

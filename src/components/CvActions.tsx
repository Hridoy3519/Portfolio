"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Two ways into the CV from the departure board: read it in place, or take the
 * file. The reader is a dialog with the PDF embedded — browsers that refuse to
 * render a PDF in a frame (most mobile ones) still get the two plain links
 * underneath it, so the CV is never a dead end.
 */
export default function CvActions({
  href,
  download,
}: {
  href: string;
  download: string;
}) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="link-underline transition-colors"
          style={{ color: "var(--board-ink)" }}
        >
          Read here
        </button>
        <span className="text-white/25">·</span>
        <a
          href={href}
          download={download}
          className="link-underline transition-colors"
          style={{ color: "var(--board-ink)" }}
        >
          Download ↓
        </a>
      </span>

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Curriculum vitae"
        >
          <button
            type="button"
            aria-label="Close the CV"
            onClick={() => setOpen(false)}
            className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
          />

          <div className="cv-panel relative flex h-full max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-line bg-elev shadow-card">
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-line px-4 py-2.5">
              <p className="font-mono text-[0.65rem] tracking-[0.18em] text-faint uppercase">
                Curriculum vitae
              </p>
              <div className="flex items-center gap-2">
                <a
                  href={href}
                  download={download}
                  className="nav-btn flex h-8 items-center rounded-lg px-2.5 font-mono text-[0.7rem] tracking-wider uppercase"
                >
                  Download ↓
                </a>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close the CV"
                  className="nav-btn grid h-8 w-8 place-items-center rounded-lg"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
            </div>

            <iframe
              src={`${href}#view=FitH`}
              title="Curriculum vitae"
              className="min-h-0 w-full flex-1 bg-subtle"
            />

            {/* Shown through the frame when a browser declines to render the PDF */}
            <p className="shrink-0 border-t border-line px-4 py-2.5 text-[0.75rem] text-muted">
              Not showing?{" "}
              <a href={href} target="_blank" rel="noreferrer" className="link-underline text-brand">
                Open it in a new tab
              </a>{" "}
              or{" "}
              <a href={href} download={download} className="link-underline text-brand">
                download the PDF
              </a>
              .
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}

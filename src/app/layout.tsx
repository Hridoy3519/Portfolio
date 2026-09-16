import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { profile } from "@/content/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display-sg",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-jb",
  display: "swap",
});

const description = `${profile.headline}. Based in ${profile.location}.`;

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s · ${profile.name}`,
  },
  description,
  keywords: [
    profile.name,
    "Software Engineer",
    "Helsinki",
    "C++",
    "React",
    "TypeScript",
    "SwiftUI",
    "Portfolio",
  ],
  authors: [{ name: profile.name, url: profile.siteUrl }],
  creator: profile.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: profile.siteUrl,
    siteName: profile.name,
    title: `${profile.name} — ${profile.role}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbfd" },
    { media: "(prefers-color-scheme: dark)", color: "#07080b" },
  ],
};

/**
 * Applies the stored theme before first paint so the page never flashes
 * the wrong palette. Defaults to dark unless the visitor chose otherwise.
 */
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var dark = stored ? stored === 'dark' : true;
    document.documentElement.classList.toggle('dark', dark);
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`;

/**
 * Some browser extensions stamp marker attributes onto every element they
 * scan (Bitdefender's TrafficLight adds `bis_skin_checked`), after the server
 * HTML arrives but before React hydrates — so React reports a mismatch on
 * every div. This strips those specific markers as they are added.
 *
 * It only ever removes known extension markers, so genuine hydration bugs in
 * our own markup still surface. The observer disconnects shortly after load:
 * once React has hydrated the markers are harmless, and stopping bounds any
 * back-and-forth with an extension that re-adds them.
 */
const extensionMarkerScript = `
(function () {
  var MARKER = /^(bis_skin_checked|bis_register|__processed_.+__)$/;
  function strip(el) {
    if (!el.attributes) return;
    for (var i = el.attributes.length - 1; i >= 0; i--) {
      var name = el.attributes[i].name;
      if (MARKER.test(name)) el.removeAttribute(name);
    }
  }
  try {
    var observer = new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        var m = mutations[i];
        if (m.type === 'attributes' && MARKER.test(m.attributeName)) {
          m.target.removeAttribute(m.attributeName);
        }
      }
    });
    observer.observe(document.documentElement, { attributes: true, subtree: true });
    window.addEventListener('load', function () {
      document.querySelectorAll('*').forEach(strip);
      setTimeout(function () { observer.disconnect(); }, 2000);
    });
  } catch (e) {}
})();
`;

/**
 * Both boot scripts, as one tag at the very start of <body> rather than in
 * <head>. Extensions inject their own <script> tags into <head> before React
 * hydrates, at a position that depends on timing; a script of ours in <head>
 * ends up compared against the extension's and reported as a mismatch.
 * Nothing lands at the start of <body>, and a script there still runs before
 * any content is parsed, so the theme is applied without a flash.
 */
const bootScript = themeScript + extensionMarkerScript;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      {/*
        suppressHydrationWarning is needed on <body> as well as <html>: it only
        applies one level deep, and extensions (password managers, grammar
        checkers) stamp attributes onto <body> before React hydrates.
      */}
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrains.variable} font-sans`}
        suppressHydrationWarning
      >
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        {children}
      </body>
    </html>
  );
}

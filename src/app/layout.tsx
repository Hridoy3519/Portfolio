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

const description = `${profile.role} in ${profile.location}. ${profile.tagline}`;

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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      {/*
        suppressHydrationWarning is needed on <body> as well as <html>: it only
        applies one level deep, and extensions (password managers, grammar
        checkers) stamp attributes onto <body> before React hydrates.
      */}
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrains.variable} font-sans`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}

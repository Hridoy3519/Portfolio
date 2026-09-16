/**
 * Single source of truth for the site.
 * The layout borrows a rail-timetable structure — numbered stops, a route map,
 * a departure board — but every label reads as a professional portfolio.
 * Edit this file to update the content; no component changes needed.
 */

export const profile = {
  name: "Md Hridoy Chowdhury",
  shortName: "Hridoy",
  role: "Software Engineer",
  location: "Helsinki, Finland",
  email: "hridoy3519@gmail.com",
  phone: "+358 41 326 6280",
  // Replace with your deployed domain once live — used for SEO + OG tags.
  siteUrl: "https://hridoychowdhury.com",
  availability: "Open to software engineering roles",
  /**
   * Served from public/cv.pdf. Leave empty and the board omits the entry —
   * better an absent link than a broken one.
   */
  cvUrl: "/cv.pdf",
  /**
   * Right-to-work status. Kept to the plain fact of the permit rather than a
   * claim about sponsorship: an employer acts on this line, so overstating it
   * would waste their time and mine. Append the valid-until date when known.
   * The entry is omitted while this is empty.
   */
  workAuthorisation: "",
  /** Plain-text version of the headline, used for metadata and screen readers. */
  headline:
    "Software Engineer Intern at GE HealthCare and Computer Science Master's student at the University of Helsinki",
  /** Short summary under the name — who I am right now, in my own voice. */
  tagline:
    "I'm a second-year Master's student at the University of Helsinki, currently interning at GE HealthCare. I aspire to become a senior software engineer and a product person. Alongside my studies, I'm building a few personal projects and leading the R&D team at IntexResearch Lab. I'm open to software engineering opportunities.",
} as const;

export const socials = [
  { label: "GitHub", href: "https://github.com/Hridoy3519", handle: "@Hridoy3519" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/hridoy3519", handle: "in/hridoy3519" },
  { label: "Email", href: `mailto:${profile.email}`, handle: profile.email },
] as const;

/**
 * Practical notices under the timetable. Deliberately not figures: the
 * split-flap above already cycles 10M+, 40% and the rest, and a number
 * arriving with no attribution reads as a boast. This answers what those
 * figures can't — whether someone can hire me, and when.
 */
export const serviceInfo: {
  label: string;
  value: string;
  /** When set, the entry renders as a link. */
  href?: string;
  /** Filename the browser saves the linked file as. */
  download?: string;
}[] = [
  { label: "Graduating", value: "July 2027, Helsinki" },
  ...(profile.workAuthorisation
    ? [{ label: "Right to work", value: profile.workAuthorisation }]
    : []),
  {
    label: "Languages",
    value: "English (Fluent) · Finnish (Basic) · Bangla (Native)",
  },
  { label: "Focus", value: "Full-stack · Systems · Mobile · AI Engineering" },
  // Appears only once profile.cvUrl is set, so no broken link can ship.
  ...(profile.cvUrl
    ? [
        {
          label: "Curriculum vitae",
          value: "Download PDF ↓",
          href: profile.cvUrl,
          download: "Md-Hridoy-Chowdhury-CV.pdf",
        },
      ]
    : []),
];

/**
 * Cycled on the split-flap display at the top of the board.
 * Every value is stated in full somewhere else on the page — this is the
 * highlight reel, not the source. Keep values at 16 characters or fewer so
 * the row of flaps still fits a phone screen.
 */
export const highlights = [
  { label: "Based in", value: "Helsinki" },
  { label: "Interning at", value: "GE HealthCare" },
  { label: "Master's in", value: "Computer Science" },
  { label: "Scholarship", value: "100% merit-based" },
  { label: "Average grade", value: "4.83 / 5.00" },
  { label: "Apps used by", value: "10M+ people" },
  { label: "Revenue lift", value: "40%" },
  { label: "LeetCode", value: "Top 2.82%" },
  { label: "IEEEXtreme 14.0", value: "Global rank 390" },
  { label: "Published", value: "IEEE GCAT 2022" },
  { label: "Problems solved", value: "2000+" },
] as const;

/**
 * What I'm doing right now — the headline under my name.
 * Listed explicitly rather than derived, so the order and wording are
 * controlled here; `id` links each card to its entry in the timeline.
 */
export const currentRoles = [
  {
    id: "ge-healthcare",
    icon: "work",
    title: "Software Engineer Intern",
    org: "GE HealthCare",
    color: "#34d399",
  },
  {
    id: "university-of-helsinki",
    icon: "study",
    title: "M.Sc. Computer Science",
    org: "University of Helsinki",
    color: "#a78bfa",
  },
] as const;

/** Start and present location, summarised on the contact card. */
export const journey = {
  from: { code: "SYL", label: "Sylhet · 2019" },
  to: { code: "HEL", label: "Helsinki · now" },
  // Distance rather than duration: the great-circle figure from the milepost.
  span: "6,358 KM",
  years: "2019 — PRESENT",
} as const;

export type ForkTrack = { label: string; note: string; taken?: boolean };

/**
 * Background — the years before the first professional role.
 */
export const background: {
  lead: string;
  milestones: { year: string; place: string; text: string }[];
  choice: { caption: string; tracks: ForkTrack[] };
  values: string[];
} = {
  lead:
    "Before any of the above: where I grew up, and how I arrived at computer science.",
  milestones: [
    {
      year: "1999",
      place: "Moulvibazar, Bangladesh",
      text: "Born in Bangladesh's tea-estate district. A curious child who asked a great many questions — and was fortunate to grow up when the internet could answer them.",
    },
    {
      year: "School years",
      place: "English-medium education",
      text: "Mathematics, physics and the sciences were the subjects that explained how the world works. They still shape how I approach a problem.",
    },
    {
      year: "2018",
      place: "Sylhet",
      text: "Moved to Sylhet for college. Integrity and trust became the principles I work by, alongside a habit of helping the people around me.",
    },
    {
      year: "2019",
      place: "Choosing a field",
      text: "Three subjects were genuinely in contention: astronomy, psychology and computer science. I chose the third, and the professional timeline starts there.",
    },
  ],
  choice: {
    caption:
      "Three options in 2019. The other two never entirely closed — I still follow astronomy, and still find human behaviour worth understanding.",
    tracks: [
      { label: "Astronomy", note: "The scale of the universe" },
      { label: "Psychology", note: "Why people behave as they do" },
      { label: "Computer Science", note: "Building what you can imagine", taken: true },
    ],
  },
  values: [
    "Integrity",
    "Trust",
    "Curiosity",
    "Collaboration",
    "Knowledge sharing",
    "Mathematics & physics",
  ],
};

export type Stop = {
  id: string;
  /** Short location code, shown on the badge and route map. */
  code: string;
  number: string;
  /** The organisation — this is the card's headline. */
  name: string;
  /** Official logo in public/orgs, taken from the organisation's own site. */
  logo?: string;
  /** Logo already fills a coloured square, so it shouldn't sit on a white tile. */
  logoFill?: boolean;
  kind: "Education" | "Experience";
  role: string;
  period: string;
  /** Omit to show no location on the card. */
  place?: string;
  color: string;
  current?: boolean;
  /** Factual one-line summary of the role. */
  summary: string;
  highlights: string[];
  tech: string[];
  /** `progress` (0–1) draws a bar under the value, e.g. credits completed. */
  facts?: { label: string; value: string; progress?: number }[];
  links?: { label: string; href: string }[];
};

export const stops: Stop[] = [
  {
    id: "leading-university",
    code: "SYL",
    number: "01",
    name: "Leading University",
    logo: "/orgs/leading-university.png",
    kind: "Education",
    role: "B.Sc. in Computer Science & Engineering",
    period: "Jan 2019 – Dec 2022",
    place: "Sylhet, Bangladesh",
    color: "#f5a524",
    summary:
      "Four years of computer-science fundamentals, competitive programming, teaching and student leadership.",
    highlights: [
      "Graduated with a CGPA of 3.74 / 4.00.",
      "Took up competitive programming, won university contests and represented the university at national level (ICPC Dhaka Regional 2021).",
      "Teaching Assistant for the Data Structures & Algorithms course.",
      "Treasurer and Secretary of the IEEE Computer Society LU Student Branch (2021–2023), launching several programming bootcamps.",
      "Named Best CS Student Volunteer by the IEEE Computer Society Bangladesh Chapter.",
      "Published a conference paper at IEEE GCAT 2022 as an undergraduate.",
    ],
    tech: ["C++", "Algorithms", "Data Structures", "OOP"],
    facts: [
      { label: "CGPA", value: "3.74 / 4.00" },
      // Labelled by the work, not "Role": I was a student here who also TA'd.
      { label: "Teaching assistant", value: "Data Structures & Algorithms" },
    ],
    links: [
      {
        label: "Transcript",
        href: "https://drive.google.com/file/d/1JTczUEOMtIWvvRpfJSL53EfALXuAViZT/view?usp=sharing",
      },
      {
        label: "IEEE Best Volunteer award",
        href: "https://drive.google.com/file/d/169lE8ClkAK3maxkuvEZexv9kiYCvTaxP/view?usp=sharing",
      },
      {
        label: "IEEE Secretary certificate",
        href: "https://drive.google.com/file/d/1Tn8j8VEz1WzflGxWUckQSDY4tujT8hmR/view?usp=sharing",
      },
    ],
  },
  {
    id: "inverse-ai",
    code: "DAC",
    number: "02",
    name: "Inverse.AI",
    logo: "/orgs/inverse-ai.png",
    kind: "Experience",
    role: "Software Engineer",
    period: "Nov 2022 – May 2025",
    place: "Dhaka, Bangladesh",
    color: "#fb7185",
    summary:
      "Four consumer media applications across iOS and Android, with a combined reach of more than ten million users.",
    highlights: [
      "Built low-level C++ components for hardware-accelerated media processing with FFmpeg and Metal.",
      "Increased app revenue by 40% through a UIKit-to-SwiftUI migration and performance work.",
      "Integrated REST APIs, authentication, custom and Firebase Analytics, and owned production releases.",
      "Worked alongside backend, UI/UX and QA teams; ran code reviews and wrote unit tests and documentation.",
      "Learned to own a product end to end, and to weigh its business impact alongside its implementation.",
      "Recognised with a Certificate of Appreciation.",
    ],
    tech: ["C++", "Swift", "SwiftUI", "UIKit", "Kotlin", "KMM", "FFmpeg", "Metal", "Firebase", "Jira"],
    facts: [
      { label: "Photo Editor · iOS", value: "4.9★" },
      { label: "Video Compressor", value: "10M+ users" },
      { label: "Noise Reducer", value: "10M+ users" },
      { label: "Video Editor · Android", value: "100k+ users" },
    ],
    links: [
      {
        label: "Certificate of Appreciation",
        href: "https://drive.google.com/file/d/1O5dB3i-4K82AeG76viZj_6nfOk_SG5_V/view?usp=sharing",
      },
    ],
  },
  {
    id: "university-of-helsinki",
    code: "HEL",
    number: "03",
    name: "University of Helsinki",
    logo: "/orgs/university-of-helsinki.png",
    kind: "Education",
    role: "M.Sc. in Computer Science",
    period: "Aug 2025 – July 2027",
    place: "Helsinki, Finland",
    color: "#a78bfa",
    current: true,
    summary:
      "A fully funded master's on the Software Engineering track — scalable systems, full-stack development and MLOps.",
    highlights: [
      "Awarded a 100% scholarship on academic merit.",
      "Study track: Software Engineering — scalable systems, full-stack development, MLOps.",
      "Master's thesis interest: applying AI/ML across the stages of the software development lifecycle.",
      "Currently holding an average grade of 4.83 / 5.00.",
      "Joined the Helsinki Pre-Incubators Builders Track shortly after arriving, to develop my own product ideas.",
    ],
    tech: ["Scalable Systems", "Full-stack", "MLOps", "Docker", "CI/CD"],
    facts: [
      { label: "Average grade", value: "4.83 / 5.00" },
      // Update both numbers as credits come in; the bar is derived from them.
      { label: "Credits completed", value: "78 / 120 ECTS", progress: 78 / 120 },
      { label: "Scholarship", value: "100%, merit-based" },
    ],
    links: [
      {
        label: "Transcript",
        href: "https://drive.google.com/file/d/1-Zftq2OOjtt2Adsrwr-HYec5nGbXBtM1/view?usp=sharing",
      },
    ],
  },
  {
    id: "intexresearch-lab",
    code: "IRL",
    number: "04",
    name: "IntexResearch Lab",
    logo: "/orgs/intexresearch-lab.png",
    logoFill: true,
    kind: "Experience",
    role: "Lead — Innovation & Development Unit",
    period: "Nov 2025 – Present",
    color: "#22d3ee",
    current: true,
    summary:
      "Leading a new development unit from formation through to its first shipped in-house and client products.",
    highlights: [
      "Lead the development unit, launching in-house mobile and web products and initiating client projects within months of its formation.",
      "Design system architecture and development workflows, and set code quality standards across the team.",
      "Translate early-stage ideas into production-ready software products.",
      "Work to bridge the gap between academia and industry in Bangladesh.",
    ],
    tech: ["Flutter", "React", "TypeScript", "Node.js", "REST APIs", "MongoDB", "AI/ML integrations"],
    facts: [
      { label: "Scope", value: "Research & Development" },
      { label: "Status", value: "Part-time" },
    ],
  },
  {
    id: "ge-healthcare",
    code: "GEH",
    number: "05",
    name: "GE HealthCare",
    logo: "/orgs/ge-healthcare.png",
    kind: "Experience",
    role: "Software Engineer Intern",
    period: "Summer 2026 – Present",
    place: "Helsinki, Finland",
    color: "#34d399",
    current: true,
    summary:
      "Patient Care Solutions — backend and frontend software for patient monitoring devices, built to medical-industry quality standards.",
    highlights: [
      "Developing backend and frontend software for patient monitors using C++, Python and web technologies.",
      "Delivering software that meets medical-industry quality and reliability requirements.",
      "Owning implementation, code reviews, testing and documentation within a multidisciplinary global Agile team.",
      "Learning first-hand how healthcare software is built and validated inside a large organisation.",
    ],
    tech: ["C++", "Python", "Web Technologies", "Git", "Linux", "Agile"],
    facts: [
      { label: "Domain", value: "Patient Monitoring" },
      { label: "Team", value: "Global, multidisciplinary" },
    ],
  },
];

/**
 * Order for the summary board: current roles first, past ones after.
 * Listed by id rather than sorted by date, so the emphasis is a deliberate
 * choice — it matches the order of the caption under my name.
 * Any stop missing from this list still appears, at the end.
 */
const byIds = (ids: string[]): Stop[] =>
  ids.map((id) => stops.find((s) => s.id === id)).filter((s): s is Stop => s !== undefined);

const BOARD_ORDER = [
  "ge-healthcare",
  "university-of-helsinki",
  "intexresearch-lab",
  "inverse-ai",
  "leading-university",
];

export const boardStops: Stop[] = [
  ...byIds(BOARD_ORDER),
  ...stops.filter((s) => !BOARD_ORDER.includes(s.id)),
];

/** Work history, reverse-chronological — the order a recruiter expects. */
export const experience = byIds([
  "ge-healthcare",
  "intexresearch-lab",
  "inverse-ai",
]);

/** Degrees, most recent first. */
export const education = byIds(["university-of-helsinki", "leading-university"]);

/**
 * Marker between the two degrees. The distance is the great-circle figure
 * between Sylhet and Helsinki, not a rounded one — the precision is the point.
 */
export const milepost = {
  distance: "6358",
  unit: "km",
  caption: "Sylhet → Helsinki · two degrees, two countries",
  screenReaderText:
    "6,358 kilometres separate the two universities: Sylhet, Bangladesh and Helsinki, Finland.",
} as const;

export type Project = {
  name: string;
  /** Who it was built for — keeps personal work and employed work distinct. */
  context: string;
  summary: string;
  status: string;
  tech: string[];
  color: string;
  href?: string;
  linkLabel?: string;
  /** Square app icon in public/projects. */
  icon?: string;
};

/**
 * Shipped and in-progress products. The Inverse.AI apps are labelled as such
 * rather than presented as personal projects — they were built with a team,
 * and the employment context is what makes the reach credible.
 */
export const projects: Project[] = [
  {
    name: "Caplar",
    context: "Personal product",
    summary:
      "An accountability app that turns a to-do list into a commitment you can feel. Stake $1–$10 on a task, finish it by the deadline, or forfeit the money. Tasks can be created by talking to an AI chat in plain language.",
    status: "In development · early access",
    tech: ["iOS", "AI task parsing", "Voice input", "Real-time sync"],
    color: "var(--brand)",
    icon: "/projects/caplar.png",
    href: "https://caplar.app/",
    linkLabel: "caplar.app",
  },
  {
    name: "Photo Filters, Effects & Editor",
    context: "At Inverse.AI",
    summary:
      "Filters, AI cutout and blur, double exposure, magic brushes and artistic text — a full editing suite on the phone.",
    status: "4.9★ on the App Store · iOS",
    tech: ["Swift", "SwiftUI", "Metal", "Core Image"],
    color: "#fb7185",
    icon: "/projects/photo-editor.jpg",
    href: "https://apps.apple.com/app/id1598843369",
    linkLabel: "App Store",
  },
  {
    name: "Video Compressor",
    context: "At Inverse.AI",
    summary:
      "Shrinks video files without visible quality loss, using a hardware-accelerated pipeline built on FFmpeg and Metal.",
    status: "10M+ downloads · iOS & Android",
    tech: ["C++", "FFmpeg", "Metal", "Swift"],
    color: "#fb7185",
    icon: "/projects/video-compressor.jpg",
    href: "https://apps.apple.com/app/id1528281985",
    linkLabel: "App Store",
  },
  {
    name: "Audio Noise Reducer",
    context: "At Inverse.AI",
    summary:
      "Strips background noise from recordings and video audio, and records clean audio directly on device.",
    status: "10M+ downloads · iOS & Android",
    tech: ["C++", "Audio DSP", "Swift", "Kotlin"],
    color: "#fb7185",
    icon: "/projects/noise-reducer.jpg",
    href: "https://apps.apple.com/app/id1451686645",
    linkLabel: "App Store",
  },
];

export type AcademicProject = {
  name: string;
  course: string;
  summary: string;
  detail: string;
  /** Headline result. Omit rather than guess. */
  result?: string;
  tech: string[];
  /** Group projects say so — the credit is shared. */
  team?: string;
  href?: string;
  linkLabel?: string;
};

/** Coursework at the University of Helsinki, most substantial first. */
export const academicProjects: AcademicProject[] = [
  {
    name: "Skill Gap Analyser",
    course: "Introduction to Data Science",
    summary:
      "Pulls the technical skills out of a job description automatically, and finds open roles that match the skills a candidate already has.",
    detail:
      "A custom BiLSTM-CRF named-entity recognition model, built from scratch in PyTorch and trained on 1,018 hand-annotated job postings. It runs on a serverless GPU with sub-200 ms inference, behind a Django API and a Next.js front end.",
    result: "F1 0.963 · precision 0.976 · recall 0.950",
    tech: ["PyTorch", "BiLSTM-CRF", "NLP", "Django", "Next.js"],
    team: "Team of 3",
    href: "https://skill-recognition.vercel.app/",
    linkLabel: "Live demo",
  },
  {
    name: "New Particle Formation Classifier",
    course: "Introduction to Machine Learning",
    summary:
      "Predicts atmospheric new-particle-formation events from a day of sensor readings at the SMEAR II research station in Hyytiälä, Finland.",
    detail:
      "Benchmarked six model families under 5-fold cross-validation. A calibrated logistic regression beat the tree ensembles: the scoring metric rewarded well-calibrated probabilities, and the event boundary proved close to linear.",
    result: "Kaggle score 0.747 · best of six model families",
    tech: ["Python", "scikit-learn", "Probability calibration", "PCA"],
    team: "Team of 2",
  },
  {
    name: "RAG Sales Analytics",
    course: "Data Warehousing",
    summary:
      "A retrieval-augmented generation system that answers analytical questions about four years of retail sales — trends, seasonality, category and regional performance — in plain language.",
    detail:
      "Sales records and aggregate summaries are chunked, embedded with all-MiniLM-L6-v2 into ChromaDB, and passed to Llama 3.2 3B running locally through Ollama. A 30-question ground-truth benchmark measures retrieval and answer accuracy separately.",
    tech: ["Python", "ChromaDB", "Ollama", "Llama 3.2", "RAG"],
    team: "Team of 2",
  },
];

export const skills = [
  {
    group: "Languages",
    items: ["C++", "Python", "TypeScript", "JavaScript", "Swift", "Kotlin", "Dart"],
  },
  {
    group: "Frontend & UI",
    items: ["React", "Next.js", "SwiftUI", "Flutter", "Tailwind CSS", "Material UI", "HTML/CSS"],
  },
  {
    group: "Backend & Data",
    items: ["Node.js", "Express.js", "REST APIs", "MongoDB", "MySQL", "Firebase"],
  },
  {
    // Each item is backed by a project on the page: the Skill Gap Analyser,
    // the NPF classifier, the RAG system and the IELTS evaluation paper.
    group: "AI & Machine Learning",
    items: ["PyTorch", "scikit-learn", "LLMs & RAG", "Vector databases", "NLP", "Model evaluation"],
  },
  {
    group: "Engineering",
    items: ["Data Structures & Algorithms", "OOP", "SOLID", "Clean Architecture", "Testing"],
  },
  {
    group: "Tools & Platforms",
    items: ["Linux", "Docker", "Git", "CI/CD", "Jira", "Firebase Analytics"],
  },
] as const;

export const competitive: {
  intro: string;
  achievements: { title: string; detail: string; href?: string }[];
  /** Judge profiles, linked from the CV. */
  profiles: { label: string; href: string }[];
} = {
  intro:
    "More than 2,000 problems solved across competitive programming judges, alongside national and international contest results.",
  achievements: [
    {
      // Team LUSmallCamp. The CV said 15.0, but these ranks are in the official
      // 14.0 results and match no Leading University team in 15.0 or 16.0.
      title: "IEEEXtreme 14.0",
      detail: "Country Rank 7 · Global Rank 390",
      href: "https://ieeextreme.org/ieeextreme-14-0-ranking/",
    },
    { title: "ICPC Dhaka Regional 2021", detail: "Participant" },
    {
      title: "LeetCode",
      detail: "Top 2.82% globally",
      href: "https://leetcode.com/Hridoy3519/",
    },
    {
      // Codeforces shows the current rank first, which has dropped to Pupil;
      // stating the peak keeps the claim true to what a visitor will find.
      title: "Codeforces",
      detail: "Peak rank Specialist · 1497",
      href: "https://codeforces.com/profile/LU_Hridoy",
    },
    {
      title: "Bitfest Intra LU Contest 2022",
      detail: "Champion",
      href: "https://toph.co/contests/training/kbqjgx4/standings",
    },
    {
      title: "LU Intra Individual Contest 2022",
      detail: "Champion",
      href: "https://coderoj.com/c/lu-intra-2022/standings",
    },
  ],
  profiles: [
    { label: "Codeforces", href: "https://codeforces.com/profile/LU_Hridoy" },
    { label: "LeetCode", href: "https://leetcode.com/Hridoy3519/" },
    { label: "CodeChef", href: "https://www.codechef.com/users/hridoy_3519" },
    { label: "LightOJ", href: "https://lightoj.com/user/hridoy3519" },
  ],
};

export const research: {
  type: string;
  title: string;
  /** Omit rather than guess. */
  venue?: string;
  href?: string;
  linkLabel?: string;
}[] = [
  {
    type: "Publication",
    title:
      "Look After: A Context-Aware Mobile Computing-Based Smart Agent to Manage Personal Events",
    venue: "IEEE GCAT 2022, Bangalore",
    href: "https://doi.org/10.1109/GCAT55367.2022.9971827",
    linkLabel: "DOI: 10.1109/GCAT55367.2022.9971827",
  },
  {
    type: "Literature review",
    // Title taken from the ResearchGate URL; punctuation is inferred.
    title:
      "A Systematic Literature Review of AI Applications in Software Development: Implementation, Testing, and Code Review",
    href: "https://www.researchgate.net/publication/414384977",
    linkLabel: "ResearchGate",
  },
  {
    type: "Academic writing",
    title:
      "Automated IELTS Writing Evaluation and Handwriting Recognition Using CNN, RNN, and the GPT-3 API",
    venue: "Leading University, 2023",
    href: "https://www.researchgate.net/publication/384820985",
    linkLabel: "ResearchGate",
  },
];

/** Certificate links come from the CV (Resume_Hridoy, September 2026). */
export const recommendationsUrl =
  "https://www.linkedin.com/in/hridoy3519/details/recommendations/";

/**
 * Excerpts from LinkedIn recommendations, in each author's own words and
 * trimmed with an ellipsis rather than paraphrased. Ordered by how directly
 * the author saw the work: manager, client, teammate, fellow student.
 */
export const recommendations: {
  name: string;
  title: string;
  relationship: string;
  date: string;
  quote: string;
}[] = [
  {
    name: "Nasif Imtiaj",
    title: "Mobile Application Developer",
    relationship: "Managed me directly at Inverse.AI",
    date: "April 2025",
    quote:
      "When we were integrating our custom video player in iOS for our video editor KMM project for the first time, Hridoy took the initiative to debug and resolve issues, showing resilience and a problem-solving mindset.",
  },
  {
    name: "Damjan Dabo",
    title: "Founder, ReleaseRocket and Itemlist",
    relationship: "Client — iOS app in SwiftUI",
    date: "September 2025",
    quote:
      "He took the lead on most of the design work… He also integrated AI features using the GPT API, showcasing both technical skill and creativity. I strongly recommend him to anyone looking for a reliable and talented iOS developer.",
  },
  {
    name: "Jabed Dhali",
    title: "Software Engineer III, Inverse.AI",
    relationship: "Teammate for 2.5 years at Inverse.AI",
    date: "March 2025",
    quote:
      "He possesses exceptional problem-solving skills, even in challenging environments… Rather than focusing solely on his own growth, he actively fosters the analytical and professional development of his entire team.",
  },
  {
    name: "Mazharul Islam",
    title: "Independent Product Engineer",
    relationship: "Studied together; Chair of IEEE Computer Society LU SB",
    date: "October 2024",
    quote:
      "When I served as Chair of the IEEE Computer Society LU SB Chapter, Hridoy took on the role of Secretary… we achieved several key milestones, including organizing the first-ever elections in the university's history.",
  },
];

export const certifications:{ title: string; detail: string; href?: string }[] = [
  {
    title: "DevOps with Docker (MOOC)",
    detail: "Containerization fundamentals and deployment workflows",
    href: "https://drive.google.com/file/d/1G04QgbPD2qj-EYL_JKe0IfS4hDmNL-dI/view?usp=sharing",
  },
  {
    title: "Entrepreneurship Program",
    detail: "Helsinki Pre-Incubators · Builders Track",
    href: "https://drive.google.com/file/d/1rulfDCnFEJDWdmmVjcT2yb9UzJLS52Gl/view?usp=sharing",
  },
  {
    title: "Complete Web Development",
    detail: "Programming Hero",
    href: "https://drive.google.com/file/d/1CVcfSsb2-IKea2wNqCpQQcuAd2S67Yq7/view",
  },
];

export const languages: {
  name: string;
  level: string;
  href?: string;
  linkLabel?: string;
}[] = [
  {
    name: "English",
    level: "Proficient — IELTS 8.0 / 9.0 (CEFR C1)",
    // The Test Report Form shows date of birth, nationality and candidate
    // number. Linked at the owner's request; the same file is linked in the CV.
    href: "https://drive.google.com/file/d/1VjvkE41k5YgqaSckGsCXt5IDPv6ST0t5/view",
    linkLabel: "IELTS Test Report Form",
  },
  { name: "Finnish", level: "Finnish 1A, basic proficiency (4.0 / 5.0)" },
  { name: "Bangla", level: "Native" },
];

/** Current and longer-term goals. */
export const roadmap = [
  {
    code: "01",
    title: "Building a product of my own",
    status: "In progress",
    text: "The entrepreneurial side has always been there. The first thing I did after arriving in Finland was join the Helsinki Pre-Incubators Builders Track, and I'm currently developing one of my own mobile application ideas.",
  },
  {
    code: "02",
    title: "Founding a school in Bangladesh",
    status: "Long term",
    text: "My long-term goal is to establish a school back home, to give back to the community I came from. I believe quality education changes the course of a person's life, and its students would carry that forward.",
  },
] as const;

/** Every section in scroll order — drives the navigation and the route map. */
export const route = [
  { id: "top", label: "Overview", short: "00" },
  ...experience.map((s) => ({ id: s.id, label: s.name, short: s.code })),
  ...education.map((s) => ({ id: s.id, label: s.name, short: s.code })),
  { id: "projects", label: "Projects & research", short: "01" },
  { id: "skills", label: "Technical skills", short: "02" },
  { id: "achievements", label: "Achievements", short: "03" },
  { id: "recommendations", label: "Recommendations", short: "04" },
  // Background and "What's next" are hidden — see the commented-out
  // components in app/page.tsx. Restore both together.
  // { id: "background", label: "Background", short: "04" },
  // { id: "roadmap", label: "What's next", short: "05" },
  { id: "contact", label: "Contact", short: "05" },
] as const;

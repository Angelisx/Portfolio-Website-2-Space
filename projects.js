// Projects data — edit this list to add, remove, or reorder projects.
//
// Each entry:
//   title  (required) Project name
//   blurb  (required) One-line description
//   tags   (required) Array of tech/keyword tags
//   status (required) "Live" or "Building"
//   links  (optional) Array of { label, url }, e.g. { label: "Live site", url: "https://..." }
//                     Leave out for private projects.
//
// Projects are shown in the order listed here.

export const projects = [
  {
    title: "Dashboard 2",
    blurb: "A personal life dashboard PWA that syncs with Obsidian and Notion.",
    tags: ["Vite", "TypeScript", "Supabase (RLS)", "Netlify Functions", "PWA"],
    status: "Live",
  },
  {
    title: "Ant Farm",
    blurb: "A live view of AI coding agents across repos, drawn as an ant colony.",
    tags: ["Vite", "Supabase Realtime", "JavaScript"],
    status: "Live",
  },
  {
    title: "Tax PDF Combiner",
    blurb: "A privacy-first tool that merges client documents into one ordered, bookmarked PDF, entirely on the local machine.",
    tags: ["Python", "Local-only", "PDF"],
    status: "Live",
  },
  {
    title: "Home Front",
    blurb: "A pre-BMT prep checklist and timeline for getting ready to report.",
    tags: ["Static site", "Netlify", "JavaScript"],
    status: "Live",
  },
  {
    title: "Murphy's Law",
    blurb: "A plan stress-tester that hunts for what could go wrong before it does.",
    tags: ["Planning", "Stress-testing"],
    status: "Building",
  },
];

import { createFileRoute, redirect } from "@tanstack/react-router";

// The portfolio is a plain HTML/CSS/JS site served from /portfolio/index.html
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sumaiya Rajpar — Web Developer & CS Student Portfolio" },
      {
        name: "description",
        content:
          "Portfolio of Sumaiya Rajpar, a Computer Science student and web developer in Karachi, turning ideas into beautiful and functional websites.",
      },
      { property: "og:title", content: "Sumaiya Rajpar — Web Developer Portfolio" },
      {
        property: "og:description",
        content: "Skills, projects, education and contact details of Sumaiya Rajpar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  beforeLoad: () => {
    throw redirect({ href: "/portfolio/index.html" });
  },
  component: () => null,
});

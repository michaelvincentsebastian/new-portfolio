// ============================================================
// src/lib/data/site.ts
// ============================================================

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

export const siteConfig = {
  name: "Michael Vincent Sebastian Handojo",
  siteTitle: "Michael Vincent Sebastian Handojo's Portfolio",
  siteDescription:
    "Portfolio of Michael Vincent, an Analytics Engineer Intern building pipelines and data-driven products.",
  siteUrl: "https://michaelvincentsebastianhandojo.vercel.app/",
};

export const socialLinks: SocialLink[] = [
  { name: "GitHub", href: "https://github.com/michaelvincentsebastian", icon: "github" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/michaelvincentsebastian/", icon: "linkedin" },
  { name: "Instagram", href: "https://www.instagram.com/mchlvincent_?igsh=Ym83bDZhZ2poZmIx", icon: "instagram" },
  { name: "Discord", href: "https://discord.com/users/vinnokkotsu", icon: "discord" },
];

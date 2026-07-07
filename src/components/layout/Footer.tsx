import { Heart } from "lucide-react";
import { portfolio } from "../../data/portfolio";
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from "../ui/Icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="py-8 px-4 sm:px-6"
      style={{
        background: "var(--color-plum)",
        borderTop: "1px solid color-mix(in srgb, var(--color-amber) 10%, transparent)",
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm flex items-center gap-1.5" style={{ color: "var(--text-secondary)" }}>
          © {year} {portfolio.name}. Made with{" "}
          <Heart size={14} style={{ color: "var(--color-amber)" }} fill="var(--color-amber)" /> &
          React
        </p>

        <div className="flex items-center gap-3">
          {portfolio.contact.socials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 focus-ring"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--color-amber)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
              }}
              aria-label={social.label}
            >
              {social.platform === "github" && <GithubIcon size={16} />}
              {social.platform === "linkedin" && <LinkedinIcon size={16} />}
              {social.platform === "leetcode" && <LeetCodeIcon size={16} />}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

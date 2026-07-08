
import { ArrowUp } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from "@/components/ui/Icons";

export function Footer() {
  const year = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <footer className="relative border-t border-[rgba(240,240,245,0.08)] bg-[var(--color-background)] pb-10 pt-12">
      <div className="section-padding">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-end gap-10">
          
          <div className="flex flex-col items-center md:items-start gap-3">
            <p className="text-sm font-medium text-[var(--color-text-primary)]">
              Designed & built by {portfolio.name}
            </p>
            <p className="text-xs text-[var(--color-text-secondary)]">
              © {year} All rights reserved.
            </p>
            <div className="mt-2 flex items-center gap-2 text-xs font-medium text-[var(--color-secondary)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-secondary)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-secondary)]"></span>
              </span>
              Available for opportunities
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="flex flex-wrap justify-center gap-5 text-xs font-medium uppercase tracking-[0.1em] text-[var(--color-text-secondary)]">
              {navLinks.map(link => (
                <a key={link.label} href={link.href} className="hover:text-[var(--color-primary)] transition-colors">
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-6">
              <div className="flex gap-4">
                {portfolio.contact.socials.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                    aria-label={social.label}
                  >
                    {social.platform === "github" && <GithubIcon size={18} />}
                    {social.platform === "linkedin" && <LinkedinIcon size={18} />}
                    {social.platform === "leetcode" && <LeetCodeIcon size={18} />}
                  </a>
                ))}
              </div>
              
              <div className="w-px h-6 bg-[rgba(240,240,245,0.08)]" />

              <button
                onClick={scrollToTop}
                className="group flex items-center gap-2 text-xs font-medium uppercase tracking-[0.1em] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
              >
                Back to top
                <ArrowUp size={14} className="transition-transform group-hover:-translate-y-1" />
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  );
}

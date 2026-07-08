import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { ClipPathReveal } from "@/components/ui/ClipPathReveal";
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from "@/components/ui/Icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[color-mix(in_srgb,var(--color-text-primary)_8%,transparent)]">
      <div className="section-padding pt-20 pb-10">
        <div className="max-w-7xl mx-auto editorial-grid items-end gap-12">
          <div className="col-span-12 lg:col-span-8">
            <p className="section-label mb-6">Let's collaborate</p>
            <h2 className="heading-xl font-display mb-6 leading-tight">
              <span className="block overflow-hidden">
                <ClipPathReveal text="Let's build" />
              </span>
              <span className="block overflow-hidden text-gradient-accent">
                <ClipPathReveal text="something great." delay={0.15} />
              </span>
            </h2>
            <motion.a
              href={`mailto:${portfolio.contact.email}`}
              data-cursor="hover"
              className="group inline-flex items-center gap-3 font-display text-2xl sm:text-4xl lg:text-5xl text-[var(--text-primary)] hover:text-[var(--color-accent)] transition-colors focus-ring"
              whileHover={{ x: 8 }}
            >
              {portfolio.contact.email}
              <ArrowUpRight className="w-8 h-8 sm:w-12 sm:h-12 transition-transform group-hover:translate-x-2 group-hover:-translate-y-2" />
            </motion.a>
          </div>

          <div className="col-span-12 lg:col-span-4 flex flex-col items-start lg:items-end gap-6">
            <div className="flex gap-4">
              {portfolio.contact.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="w-10 h-10 flex items-center justify-center border-subtle text-[var(--text-secondary)] hover:text-[var(--color-accent)] hover:border-[color-mix(in_srgb,var(--color-accent)_40%,transparent)] transition-colors focus-ring"
                  aria-label={social.label}
                >
                  {social.platform === "github" && <GithubIcon size={18} />}
                  {social.platform === "linkedin" && <LinkedinIcon size={18} />}
                  {social.platform === "leetcode" && <LeetCodeIcon size={18} />}
                </a>
              ))}
            </div>
            <p className="text-xs text-[var(--text-secondary)] tracking-wide">
              © {year} {portfolio.name}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

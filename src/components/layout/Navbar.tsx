import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from "@/components/ui/Icons";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = portfolio.nav.map((n) => n.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sections[i]);
            return;
          }
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav
          className={`max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between transition-all duration-500 ${
            scrolled ? "py-3 glass-dark mt-3 mx-3 sm:mx-5 lg:mx-8" : "py-6"
          }`}
        >
          <a
            href="#"
            data-cursor="hover"
            className="font-display font-bold text-base tracking-tight focus-ring"
          >
            <span className="text-[var(--color-accent)]">B</span>
            <span className="text-[var(--text-primary)]">S</span>
            <span className="text-[var(--text-secondary)]">.</span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {portfolio.nav.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  data-cursor="hover"
                  className="relative px-4 py-2 text-xs uppercase tracking-[0.15em] font-medium transition-colors focus-ring"
                  style={{ color: isActive ? "var(--color-accent)" : "var(--text-secondary)" }}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-4 right-4 h-[2px] bg-[var(--color-accent)]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1">
              {portfolio.contact.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="w-8 h-8 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--color-accent)] transition-colors focus-ring"
                  aria-label={social.label}
                >
                  {social.platform === "github" && <GithubIcon size={16} />}
                  {social.platform === "linkedin" && <LinkedinIcon size={16} />}
                  {social.platform === "leetcode" && <LeetCodeIcon size={16} />}
                </a>
              ))}
            </div>

            <button
              className="md:hidden w-9 h-9 flex items-center justify-center border-subtle focus-ring"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-72 z-[70] p-6 flex flex-col bg-[var(--color-background)] border-l border-subtle"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <button
                className="self-end w-9 h-9 flex items-center justify-center border-subtle mb-10 focus-ring"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X size={18} />
              </button>

              <div className="flex flex-col gap-1">
                {portfolio.nav.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className="px-3 py-4 font-display text-2xl font-semibold border-b border-[color-mix(in_srgb,var(--color-text-primary)_6%,transparent)] focus-ring"
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { portfolio } from "../../data/portfolio";
import { ThemeToggle } from "../ui/ThemeToggle";
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from "../ui/Icons";


export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine active section
      const sections = portfolio.nav.map((n) => n.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sections[i]);
            return;
          }
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "color-mix(in srgb, var(--bg-primary) 85%, transparent)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "1px solid color-mix(in srgb, var(--color-amber) 10%, transparent)"
            : "1px solid transparent",
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav
          className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between"
          style={{ height: scrolled ? "60px" : "76px", transition: "height 0.3s ease" }}
        >
          {/* Logo / Name */}
          <a
            href="#"
            className="font-display font-bold text-lg tracking-tight focus-ring rounded-lg px-1"
            style={{ color: "var(--color-amber)" }}
          >
            BS<span style={{ color: "var(--text-primary)" }}>.</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {portfolio.nav.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 focus-ring"
                  style={{
                    color: isActive ? "var(--color-amber)" : "var(--text-secondary)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.target as HTMLElement).style.color = "var(--text-primary)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.target as HTMLElement).style.color = "var(--text-secondary)";
                  }}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full -z-10"
                      style={{
                        background: "color-mix(in srgb, var(--color-amber) 12%, transparent)",
                      }}
                      layoutId="nav-active"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right side: socials + theme */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1">
              {portfolio.contact.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 focus-ring"
                  style={{
                    color: "var(--text-secondary)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--color-amber)";
                    (e.currentTarget as HTMLElement).style.background =
                      "color-mix(in srgb, var(--color-amber) 12%, transparent)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                  aria-label={social.label}
                >
                  {social.platform === "github" && <GithubIcon size={17} />}
                  {social.platform === "linkedin" && <LinkedinIcon size={17} />}
                  {social.platform === "leetcode" && <LeetCodeIcon size={17} />}
                </a>
              ))}
            </div>

            <ThemeToggle />

            {/* Mobile hamburger */}
            <button
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center focus-ring"
              style={{
                color: "var(--text-primary)",
                background: "color-mix(in srgb, var(--color-amber) 10%, transparent)",
              }}
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[60]"
              style={{ background: "rgba(0,0,0,0.5)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-72 z-[70] p-6 flex flex-col"
              style={{
                background: "var(--bg-primary)",
                borderLeft: "1px solid color-mix(in srgb, var(--color-amber) 15%, transparent)",
              }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <button
                className="self-end w-10 h-10 rounded-full flex items-center justify-center mb-8 focus-ring"
                style={{
                  color: "var(--text-primary)",
                  background: "color-mix(in srgb, var(--color-amber) 10%, transparent)",
                }}
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col gap-2">
                {portfolio.nav.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className="px-4 py-3 rounded-xl text-lg font-medium font-display transition-colors focus-ring"
                    style={{ color: "var(--text-primary)" }}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.background =
                        "color-mix(in srgb, var(--color-amber) 12%, transparent)";
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.background = "transparent";
                    }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>

              <div className="mt-auto flex gap-3 pt-8">
                {portfolio.contact.socials.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center focus-ring"
                    style={{
                      color: "var(--text-secondary)",
                      background: "color-mix(in srgb, var(--color-amber) 10%, transparent)",
                    }}
                    aria-label={social.label}
                  >
                    {social.platform === "github" && <GithubIcon size={18} />}
                    {social.platform === "linkedin" && <LinkedinIcon size={18} />}
                    {social.platform === "leetcode" && <LeetCodeIcon size={18} />}
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Loader2, ArrowUpRight } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from "@/components/ui/Icons";
import { FloatingLabelInput, FloatingLabelTextarea } from "@/components/ui/FloatingLabelInput";
import { ClipPathReveal } from "@/components/ui/ClipPathReveal";
import ShapeGrid from "@/components/ShapeGrid";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type FormState = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitState, setSubmitState] = useState<FormState>("idle");
  const reduced = useReducedMotion();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.includes("@") || !formState.message.trim()) {
      setSubmitState("error");
      return;
    }
    setSubmitState("loading");
    await new Promise((r) => setTimeout(r, 800));
    setSubmitState("success");
    setFormState({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitState("idle"), 4000);
  };

  return (
    <SectionWrapper id="contact" className="section-padding relative overflow-hidden">
      {!reduced && (
        <div className="absolute inset-0 z-0">
          <ShapeGrid
            speed={0.25}
            squareSize={40}
            direction="diagonal"
            borderColor="rgba(240, 240, 245, 0.15)"
            hoverFillColor="var(--color-tertiary)"
            shape="hexagon"
            hoverTrailAmount={13}
          />
          <div className="absolute inset-0 bg-[var(--color-base)]/70 pointer-events-none" />
        </div>
      )}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="editorial-grid gap-12 lg:gap-20">
          {/* Bold CTA headline */}
          <div className="col-span-12 lg:col-span-7">
            <p className="section-label mb-6">05 — Contact</p>
            <h2 className="heading-xl font-display mb-8">
              <span className="block overflow-hidden">
                <ClipPathReveal text="Let's" delay={0.1} />
              </span>
              <span className="block overflow-hidden text-gradient-accent">
                <ClipPathReveal text="build something." delay={0.3} />
              </span>
            </h2>

            <motion.a
              href={`mailto:${portfolio.contact.email}`}
              data-cursor="hover"
              className="group inline-block font-display text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors duration-500 focus-ring break-all"
              whileHover={{ x: 4 }}
            >
              {portfolio.contact.email}
              <ArrowUpRight
                size={32}
                className="inline ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0 text-[var(--color-primary)]"
              />
            </motion.a>

            <p className="mt-6 text-[var(--color-text-secondary)]">{portfolio.contact.phone}</p>

            <div className="flex flex-wrap gap-4 mt-8">
              {portfolio.contact.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="pill-outline hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors focus-ring flex items-center gap-2"
                >
                  {social.platform === "github" && <GithubIcon size={14} />}
                  {social.platform === "linkedin" && <LinkedinIcon size={14} />}
                  {social.platform === "leetcode" && <LeetCodeIcon size={14} />}
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <motion.form
              onSubmit={handleSubmit}
              className="border-subtle p-6 sm:p-8 bg-[var(--color-surface-1)]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm text-[var(--color-text-secondary)] mb-6">
                Have a project in mind? Send a message.
              </p>
              <div className="space-y-5">
                <FloatingLabelInput
                  id="contact-name"
                  label="Name"
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                />
                <FloatingLabelInput
                  id="contact-email"
                  label="Email"
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                />
                <FloatingLabelTextarea
                  id="contact-message"
                  label="Message"
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                />

                <motion.button
                  type="submit"
                  data-cursor="hover"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[var(--color-primary)] text-[var(--color-text-primary)] font-medium text-sm focus-ring disabled:opacity-60"
                  disabled={submitState === "loading" || submitState === "success"}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <AnimatePresence mode="wait">
                    {submitState === "loading" && (
                      <motion.span key="loading" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <Loader2 size={16} className="animate-spin" /> Sending...
                      </motion.span>
                    )}
                    {submitState === "success" && (
                      <motion.span key="success" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <CheckCircle size={16} /> Sent!
                      </motion.span>
                    )}
                    {(submitState === "idle" || submitState === "error") && (
                      <motion.span key="idle" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <Send size={16} /> Send Message
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

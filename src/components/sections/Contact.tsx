import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Send, CheckCircle, Loader2 } from "lucide-react";
import { portfolio } from "../../data/portfolio";
import { SectionWrapper, StaggerContainer, staggerChildVariants } from "../ui/SectionWrapper";
import { SparkleIcon } from "../ui/SparkleIcon";
import { DecorativeRings } from "../ui/DecorativeRings";
import { RippleLineGrid } from "../ui/RippleLineGrid";
import { GradientBlob } from "../ui/GradientBlob";
import { HoverHighlighter } from "../ui/HoverHighlighter";
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from "../ui/Icons";
import { FloatingLabelInput, FloatingLabelTextarea } from "../ui/FloatingLabelInput";
import { Button } from "../ui/button";

function GithubContactIcon({ size = 16 }: { size?: number }) {
  return <GithubIcon size={size} />;
}
function LinkedinContactIcon({ size = 16 }: { size?: number }) {
  return <LinkedinIcon size={size} />;
}

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    href: `mailto:${portfolio.contact.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    href: `tel:${portfolio.contact.phone.replace(/[^+\d]/g, "")}`,
  },
  {
    icon: GithubContactIcon,
    label: "GitHub",
    href: portfolio.contact.socials.find((s) => s.platform === "github")?.url || "#",
  },
  {
    icon: LinkedinContactIcon,
    label: "LinkedIn",
    href: portfolio.contact.socials.find((s) => s.platform === "linkedin")?.url || "#",
  },
];

type FormState = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitState, setSubmitState] = useState<FormState>("idle");
  const [shake, setShake] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formState.name.trim() || !formState.email.includes("@") || !formState.message.trim()) {
      setSubmitState("error");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setSubmitState("loading");
    await new Promise((r) => setTimeout(r, 800));

    const burst = (window as unknown as Record<string, unknown>).__confettiBurst as
      | ((x?: number, y?: number) => void)
      | undefined;
    const btn = (e.target as HTMLFormElement).querySelector('button[type="submit"]');
    if (burst && btn) {
      const rect = btn.getBoundingClientRect();
      burst(rect.left + rect.width / 2, rect.top);
    } else {
      burst?.();
    }

    setSubmitState("success");
    setFormState({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitState("idle"), 4000);
  };

  return (
    <SectionWrapper id="contact" className="relative gradient-bg-contact section-padding overflow-hidden">
      <DecorativeRings variant="gold" />
      <RippleLineGrid className="opacity-[0.04]" rows={6} cols={12} />
      {/* Floating blobs */}
      <GradientBlob className="w-[350px] h-[350px] top-[10%] -left-20" color="wine" duration={16} />
      <GradientBlob className="w-[300px] h-[300px] bottom-[5%] -right-10" color="amber" duration={13} delay={5} />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <SparkleIcon size={22} delay={0} />
            <h2 className="heading-lg" style={{ color: "var(--text-primary)" }}>
              <HoverHighlighter
                text="Let's Talk!"
                textColor="var(--text-primary)"
                penColor="var(--color-amber)"
                penOpacity={35}
                penHeight={40}
                penOffset={4}
                className="inline"
              />
            </h2>
            <SparkleIcon size={16} delay={0.9} />
          </div>
          <p className="text-base font-alt" style={{ color: "var(--text-secondary)" }}>
            Have a project in mind? I'd love to hear about it.
          </p>
        </div>

        <StaggerContainer className="flex flex-wrap justify-center gap-3 mb-14">
          {contactMethods.map((method) => {
            const Icon = method.icon;
            return (
              <motion.a
                key={method.label}
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-2.5 px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 focus-ring font-alt"
                style={{
                  background: "color-mix(in srgb, var(--color-amber) 15%, transparent)",
                  color: "var(--text-primary)",
                  border: "1px solid color-mix(in srgb, var(--color-amber) 25%, transparent)",
                }}
                variants={staggerChildVariants}
                whileHover={{
                  y: -3,
                  boxShadow: "0 8px 25px color-mix(in srgb, var(--color-amber) 30%, transparent)",
                  background: "var(--color-amber)",
                  color: "var(--color-text-dark)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                <Icon size={16} />
                {method.label}
              </motion.a>
            );
          })}
          <motion.a
            href={portfolio.contact.socials.find((s) => s.platform === "leetcode")?.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 focus-ring font-alt"
            style={{
              background: "color-mix(in srgb, var(--color-amber) 15%, transparent)",
              color: "var(--text-primary)",
              border: "1px solid color-mix(in srgb, var(--color-amber) 25%, transparent)",
            }}
            variants={staggerChildVariants}
            whileHover={{
              y: -3,
              boxShadow: "0 8px 25px color-mix(in srgb, var(--color-amber) 30%, transparent)",
              background: "var(--color-amber)",
              color: "var(--color-text-dark)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            <LeetCodeIcon size={16} />
            LeetCode
          </motion.a>
        </StaggerContainer>

        {/* Form with gradient border glow */}
        <div className="relative group max-w-lg mx-auto">
          <div
            className="absolute -inset-[2px] rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none"
            style={{
              background: "linear-gradient(135deg, var(--color-amber), var(--color-wine), var(--color-gold))",
            }}
          />
          <motion.form
            onSubmit={handleSubmit}
            className="relative rounded-2xl p-6 sm:p-8"
            style={{
              background: "color-mix(in srgb, var(--color-amber) 5%, var(--bg-surface))",
              border: "1px solid color-mix(in srgb, var(--color-amber) 15%, transparent)",
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            animate={shake ? { x: [0, -10, 10, -10, 0] } : { x: 0 }}
          >
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

              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                <Button
                  type="submit"
                  className="w-full font-alt"
                  size="lg"
                  disabled={submitState === "loading" || submitState === "success"}
                >
                  <AnimatePresence mode="wait">
                    {submitState === "loading" && (
                      <motion.span
                         key="loading"
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                      >
                        <Loader2 size={18} className="animate-spin" />
                        Sending...
                      </motion.span>
                    )}
                    {submitState === "success" && (
                      <motion.span
                        key="success"
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <CheckCircle size={18} />
                        Message Sent!
                      </motion.span>
                    )}
                    {submitState === "idle" || submitState === "error" ? (
                      <motion.span
                        key="idle"
                        className="flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Send size={18} />
                        Send Message
                      </motion.span>
                    ) : null}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </div>
          </motion.form>
        </div>
      </div>
    </SectionWrapper>
  );
}

import { useState, type InputHTMLAttributes } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingLabelInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

export function FloatingLabelInput({ label, id, className, value, ...props }: FloatingLabelInputProps) {
  const [focused, setFocused] = useState(false);
  const hasValue = Boolean(value && String(value).length > 0);
  const floated = focused || hasValue;

  return (
    <div className="relative">
      <motion.label
        htmlFor={id}
        layout
        className={cn(
          "absolute left-4 pointer-events-none text-sm font-medium transition-colors duration-200",
          floated ? "top-2 text-xs" : "top-1/2 -translate-y-1/2"
        )}
        style={{ color: floated ? "var(--color-accent)" : "var(--text-secondary)" }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        {label}
      </motion.label>
      <input
        id={id}
        value={value}
        className={cn(
          "w-full px-4 pt-6 pb-2 rounded-xl text-sm focus-ring outline-none transition-colors duration-200",
          className
        )}
        style={{
          background: "color-mix(in srgb, var(--color-accent) 4%, var(--bg-surface))",
          border: "1px solid color-mix(in srgb, var(--color-border) 40%, transparent)",
          color: "var(--text-primary)",
        }}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur?.(e);
        }}
        {...props}
      />
    </div>
  );
}

interface FloatingLabelTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
}

export function FloatingLabelTextarea({ label, id, className, value, ...props }: FloatingLabelTextareaProps) {
  const [focused, setFocused] = useState(false);
  const hasValue = Boolean(value && String(value).length > 0);
  const floated = focused || hasValue;

  return (
    <div className="relative">
      <motion.label
        htmlFor={id}
        layout
        className={cn(
          "absolute left-4 pointer-events-none text-sm font-medium transition-colors duration-200",
          floated ? "top-3 text-xs" : "top-5"
        )}
        style={{ color: floated ? "var(--color-accent)" : "var(--text-secondary)" }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        {label}
      </motion.label>
      <textarea
        id={id}
        value={value}
        className={cn(
          "w-full px-4 pt-7 pb-3 rounded-xl text-sm focus-ring outline-none transition-colors duration-200 resize-none",
          className
        )}
        style={{
          background: "color-mix(in srgb, var(--color-accent) 4%, var(--bg-surface))",
          border: "1px solid color-mix(in srgb, var(--color-border) 40%, transparent)",
          color: "var(--text-primary)",
        }}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur?.(e);
        }}
        {...props}
      />
    </div>
  );
}

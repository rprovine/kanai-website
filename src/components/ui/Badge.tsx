import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "red" | "dark" | "light";
  className?: string;
}

const variants = {
  red: "bg-brand-red/10 text-brand-red border-brand-red/20",
  dark: "bg-brand-gray-900/10 text-brand-gray-900 border-brand-gray-900/20",
  light: "bg-white/10 text-white border-white/20",
};

export function Badge({ children, variant = "red", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

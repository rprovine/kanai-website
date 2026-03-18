"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: "white" | "light" | "dark" | "black";
  padding?: "sm" | "md" | "lg";
}

const bgStyles = {
  white: "bg-white",
  light: "bg-brand-gray-50",
  dark: "bg-brand-gray-900 text-white",
  black: "bg-black text-white",
};

const paddingStyles = {
  sm: "py-12 sm:py-16",
  md: "py-24 sm:py-32",
  lg: "py-32 sm:py-40",
};

export function Section({
  children,
  className,
  id,
  background = "white",
  padding = "md",
}: SectionProps) {
  return (
    <motion.section
      id={id}
      className={cn(bgStyles[background], paddingStyles[padding], className)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.section>
  );
}

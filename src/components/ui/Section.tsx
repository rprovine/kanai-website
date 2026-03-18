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
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-24 md:py-32",
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}

"use client";

import { forwardRef, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "white";
type Size = "sm" | "md" | "lg";

const variantStyles: Record<Variant, string> = {
  primary: "bg-brand-red text-white hover:bg-brand-red-dark shadow-lg shadow-brand-red/25 hover:shadow-brand-red/40",
  secondary: "bg-brand-gray-900 text-white hover:bg-brand-gray-800",
  outline: "border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white",
  ghost: "text-brand-gray-600 hover:text-brand-gray-900 hover:bg-brand-gray-100",
  white: "bg-white text-brand-gray-900 hover:bg-brand-gray-100 shadow-lg",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-xs font-semibold",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-sm",
};

interface ButtonBaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

type ButtonAsButton = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

type ButtonAsLink = ButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button({ variant = "primary", size = "md", className, ...props }, ref) {
    const classes = cn(
      "inline-flex items-center justify-center font-semibold rounded-md transition-all duration-200 cursor-pointer",
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    if ("href" in props && props.href) {
      const { href, ...rest } = props as ButtonAsLink;
      return (
        <Link
          href={href}
          className={classes}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...rest}
        />
      );
    }

    return (
      <button
        className={classes}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...(props as ButtonAsButton)}
      />
    );
  }
);

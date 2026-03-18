type ClassValue = string | number | boolean | null | undefined | Record<string, unknown> | ClassValue[];

function clsx(...args: ClassValue[]): string {
  const classes: string[] = [];
  for (const arg of args.flat()) {
    if (!arg) continue;
    if (typeof arg === "string") {
      classes.push(arg);
    } else if (typeof arg === "object") {
      for (const [key, value] of Object.entries(arg as Record<string, unknown>)) {
        if (value) classes.push(key);
      }
    }
  }
  return classes.join(" ");
}

export function cn(...inputs: ClassValue[]): string {
  return clsx(...inputs);
}

export function formatPhone(phone: string): string {
  return phone.replace(/\D/g, "");
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

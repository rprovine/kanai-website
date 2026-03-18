"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type LazyImageProps = ImageProps & {
  wrapperClassName?: string;
};

export function LazyImage({
  className,
  wrapperClassName,
  onLoad,
  ...props
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn("overflow-hidden", wrapperClassName)}>
      <Image
        loading="lazy"
        placeholder="blur"
        className={cn(
          "transition-opacity duration-500 ease-in-out",
          loaded ? "opacity-100" : "opacity-0",
          className
        )}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        {...props}
      />
    </div>
  );
}

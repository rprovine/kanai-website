"use client";

import { useState, useEffect } from "react";

/**
 * Checks whether the browser supports WebGL rendering.
 * Returns `true` once detection completes and WebGL is available,
 * `false` if it is not, and `false` during SSR / initial hydration.
 */
export function useWebGLSupport(): boolean {
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
      setSupported(gl !== null);
    } catch {
      setSupported(false);
    }
  }, []);

  return supported;
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";

export function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="hidden lg:block fixed top-[72px] left-0 right-0 z-40 bg-white border-b shadow-sm"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-2">
            <a
              href={siteConfig.phoneHref}
              className="text-brand-gray-900 font-semibold hover:text-brand-red transition-colors"
            >
              {siteConfig.phone}
            </a>
            <Button href="/book-now" size="sm">
              Get Free Estimate
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { dumpsterSizes } from "@/data/dumpsters";
import { trackDumpsterSizeSelect } from "@/lib/tracking";

const DumpsterViewer = dynamic(
  () => import("@/components/three/DumpsterViewer").then((m) => m.DumpsterViewer),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] bg-brand-gray-100 rounded-xl animate-pulse flex items-center justify-center">
        <p className="text-brand-gray-400">Loading 3D viewer...</p>
      </div>
    ),
  }
);

export function DumpsterSizeComparison() {
  const [selectedIndex, setSelectedIndex] = useState(2); // default to 20-yard
  const selected = dumpsterSizes[selectedIndex];

  function handleSelect(index: number) {
    setSelectedIndex(index);
    trackDumpsterSizeSelect(dumpsterSizes[index].size);
  }

  return (
    <section className="bg-brand-gray-50 py-24 sm:py-32">
      <Container>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Compare Dumpster Sizes</h2>
          <p className="text-brand-gray-500 mt-2">
            Click a size to see the dimensions in 3D
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* 3D Viewer */}
          <div className="bg-white rounded-2xl shadow-sm border border-brand-gray-200 overflow-hidden">
            <DumpsterViewer selectedIndex={selectedIndex} />
          </div>

          {/* Info panel */}
          <div>
            {/* Size selector buttons */}
            <div className="flex gap-2 mb-6">
              {dumpsterSizes.map((d, i) => (
                <button
                  key={d.slug}
                  onClick={() => handleSelect(i)}
                  className={cn(
                    "flex-1 py-3 rounded-lg font-bold text-center transition-all",
                    i === selectedIndex
                      ? "bg-brand-red text-white shadow-lg shadow-brand-red/25"
                      : "bg-white text-brand-gray-600 border border-brand-gray-200 hover:border-brand-red/30"
                  )}
                >
                  {d.size}
                  <span className="block text-xs font-normal opacity-75">yard</span>
                </button>
              ))}
            </div>

            {/* Selected size details */}
            <motion.div
              key={selected.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl p-6 border border-brand-gray-200"
            >
              <h3 className="text-2xl font-bold mb-4">
                <span className="text-brand-red">{selected.size}</span> Yard Dumpster
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-brand-gray-400 uppercase font-semibold">Dimensions</p>
                  <p className="font-medium">{selected.dimensions}</p>
                </div>
                <div>
                  <p className="text-xs text-brand-gray-400 uppercase font-semibold">Capacity</p>
                  <p className="font-medium">{selected.capacity}</p>
                </div>
                <div>
                  <p className="text-xs text-brand-gray-400 uppercase font-semibold">Weight Limit</p>
                  <p className="font-medium">{selected.weight}</p>
                </div>
                <div>
                  <p className="text-xs text-brand-gray-400 uppercase font-semibold">Price</p>
                  <p className="text-xl font-bold text-brand-red">{selected.priceRange}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-brand-gray-400 uppercase font-semibold mb-2">Ideal For</p>
                <ul className="space-y-1">
                  {selected.idealFor.map((use) => (
                    <li key={use} className="text-sm text-brand-gray-600 flex items-start gap-2">
                      <span className="text-brand-red mt-0.5">&#10003;</span>
                      {use}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import SectionBadge from "@/components/ui/SectionBadge";

const modules = [
  {
    title: "PATIENT PORTAL",
    color: "from-medical-400 to-medical-600",
    bg: "bg-medical-600",
  },
  {
    title: "CLINICAL QUEUE",
    color: "from-success-400 to-success-600",
    bg: "bg-success-600",
  },
  {
    title: "DIGITAL E-FILE",
    color: "from-violet-400 to-violet-600",
    bg: "bg-violet-600",
  },
  {
    title: "PHARMACY",
    color: "from-amber-400 to-amber-600",
    bg: "bg-amber-600",
  },
  {
    title: "BOARDROOM",
    color: "from-rose-400 to-rose-600",
    bg: "bg-rose-600",
  },
];

const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };

export default function InteractiveMenu() {
  const [hovered, setHovered] = useState<number | null>(null);

  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    }
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <SectionBadge label="Explore Modules" />
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-clinical-900 sm:text-4xl dark:text-white">
            The ecosystem at a glance
          </h2>
        </div>

        {/* Stacked menu */}
        <div
          className="relative"
          onMouseLeave={() => setHovered(null)}
        >
          {modules.map((mod, i) => (
            <motion.div
              key={mod.title}
              onMouseEnter={() => setHovered(i)}
              animate={{
                opacity: hovered === null || hovered === i ? 1 : 0.3,
              }}
              transition={{ duration: 0.3 }}
              className="group relative cursor-pointer border-b border-clinical-200/60 dark:border-clinical-800/60"
            >
              <div className="flex items-center justify-between py-5 md:py-6">
                <h3 className="text-5xl font-light tracking-tighter text-clinical-900 transition-colors sm:text-6xl md:text-8xl dark:text-white">
                  {hovered === i ? (
                    <span
                      className={`bg-gradient-to-r ${mod.color} bg-clip-text text-transparent`}
                    >
                      {mod.title}
                    </span>
                  ) : (
                    mod.title
                  )}
                </h3>

                {/* Index number */}
                <span className="hidden text-sm font-medium tabular-nums text-clinical-400 sm:block dark:text-clinical-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Underline reveal */}
              <motion.div
                className={`absolute bottom-0 left-0 h-px bg-gradient-to-r ${mod.color}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: hovered === i ? 1 : 0 }}
                transition={{ duration: 0.4, ease: "easeOut" as const }}
                style={{ originX: 0 }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating image that tracks the cursor */}
      <AnimatePresence>
        {hovered !== null && (
          <motion.div
            className="pointer-events-none fixed z-30"
            style={{
              x: smoothX,
              y: smoothY,
            }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className={`-translate-x-1/2 -translate-y-1/2 flex h-48 w-64 items-center justify-center overflow-hidden rounded-2xl shadow-2xl md:h-56 md:w-72 ${modules[hovered].bg}`}
            >
              {/* Abstract placeholder visual */}
              <div className="relative flex h-full w-full items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                <div className="absolute bottom-0 right-0 h-3/4 w-3/4 rounded-tl-3xl bg-white/10" />
                <span className="relative text-lg font-semibold tracking-wide text-white/90">
                  {modules[hovered].title}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

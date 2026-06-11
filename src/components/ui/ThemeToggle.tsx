"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const cycle = ["light", "dark", "system"] as const;

const icons = {
  light: Sun,
  dark: Moon,
  system: Monitor,
} as const;

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-9 w-9" />;
  }

  const current = (theme ?? "system") as (typeof cycle)[number];
  const Icon = icons[current];

  function next() {
    const idx = cycle.indexOf(current);
    setTheme(cycle[(idx + 1) % cycle.length]);
  }

  return (
    <button
      onClick={next}
      aria-label={`Theme: ${current}. Click to switch.`}
      className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-clinical-200 bg-white transition-colors hover:bg-clinical-100 dark:border-clinical-700 dark:bg-clinical-800 dark:hover:bg-clinical-700"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={current}
          initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center"
        >
          <Icon size={16} className="text-clinical-600 dark:text-clinical-300" />
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

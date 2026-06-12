"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Activity } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";

const navLinks = [
  { label: "Platform", href: "#features" },
  { label: "Workflow", href: "#workflow" },
  { label: "Hayer Technologies", href: "#hayer" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  function getUnderlineStyle() {
    if (hovered === null || !navRef.current) return { opacity: 0, left: 0, width: 0 };
    const li = itemRefs.current[hovered];
    if (!li) return { opacity: 0, left: 0, width: 0 };
    const navRect = navRef.current.getBoundingClientRect();
    const liRect = li.getBoundingClientRect();
    return {
      opacity: 1,
      left: liRect.left - navRect.left,
      width: liRect.width,
    };
  }

  const underline = getUnderlineStyle();

  return (
    <header className="sticky top-0 z-50 flex justify-center px-4 pt-5">
      <nav className="flex w-full max-w-4xl items-center justify-between rounded-full border border-clinical-200/20 bg-clinical-50/10 px-5 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-2xl dark:border-clinical-800/50 dark:bg-clinical-950/30">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-medical-600 text-white">
            <Activity size={15} />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-bold text-clinical-900 dark:text-white">
              MindPulse
            </span>
            <span className="text-[10px] font-semibold tracking-wider text-medical-600 dark:text-medical-400">
              HIMS
            </span>
          </div>
        </a>

        {/* Desktop links + theme toggle */}
        <div className="hidden items-center gap-6 md:flex">
          <div className="relative">
            <ul
              ref={navRef}
              className="flex items-center gap-6"
              onMouseLeave={() => setHovered(null)}
            >
              {navLinks.map((link, i) => (
                <li
                  key={link.href}
                  ref={(el) => { itemRefs.current[i] = el; }}
                  onMouseEnter={() => setHovered(i)}
                >
                  <a
                    href={link.href}
                    className="block py-1 text-[13px] font-medium text-clinical-600 transition-colors hover:text-clinical-900 dark:text-clinical-400 dark:hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Sliding underline */}
            <motion.div
              className="pointer-events-none absolute -bottom-0.5 h-[2px] rounded-full bg-medical-600 dark:bg-medical-400"
              animate={{
                left: underline.left,
                width: underline.width,
                opacity: underline.opacity,
              }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
          </div>

          <div className="h-4 w-px bg-clinical-300/40 dark:bg-clinical-700/40" />
          <ThemeToggle />
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex items-center gap-1.5 md:hidden">
          <ThemeToggle />
          <button
            className="inline-flex items-center justify-center rounded-full p-2 text-clinical-600 transition-colors hover:bg-clinical-200/20 dark:text-clinical-400 dark:hover:bg-clinical-800/30"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu — drops below the pill */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" as const }}
            className="absolute top-full mt-2 w-full max-w-4xl rounded-2xl border border-clinical-200/20 bg-clinical-50/80 px-2 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-2xl md:hidden dark:border-clinical-800/50 dark:bg-clinical-950/80"
          >
            <ul className="flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl px-4 py-2.5 text-sm font-medium text-clinical-600 transition-colors hover:bg-clinical-200/30 hover:text-clinical-900 dark:text-clinical-400 dark:hover:bg-clinical-800/40 dark:hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

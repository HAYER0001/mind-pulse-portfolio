"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Activity } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";

const navLinks = [
  { label: "Platform Modules", href: "#modules" },
  { label: "Clinical Workflow", href: "#workflow" },
  { label: "Architecture", href: "#architecture" },
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
    <header className="sticky top-0 z-50 rounded-t-[2.5rem] border-b border-clinical-200/40 bg-transparent backdrop-blur-xl dark:border-clinical-800/40">
      <nav className="mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-medical-600 text-white">
            <Activity size={18} />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-clinical-900 dark:text-white">
              MindPulse
            </span>
            <span className="text-xs font-semibold tracking-wider text-medical-600 dark:text-medical-400">
              HIMS
            </span>
          </div>
        </a>

        {/* Desktop links + theme toggle */}
        <div className="hidden items-center gap-8 lg:flex">
          <div className="relative">
            <ul
              ref={navRef}
              className="flex items-center gap-8"
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
                    className="block py-1 text-sm font-medium text-clinical-600 transition-colors hover:text-medical-600 dark:text-clinical-400 dark:hover:text-medical-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Sliding underline */}
            <motion.div
              className="pointer-events-none absolute -bottom-px h-0.5 rounded-full bg-medical-600 dark:bg-medical-400"
              animate={{
                left: underline.left,
                width: underline.width,
                opacity: underline.opacity,
              }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
          </div>
          <ThemeToggle />
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            className="inline-flex items-center justify-center rounded-md p-2 text-clinical-600 dark:text-clinical-400"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-clinical-200/40 backdrop-blur-xl lg:hidden dark:border-clinical-800/40"
          >
            <ul className="flex flex-col gap-1 px-6 py-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-clinical-600 transition-colors hover:bg-clinical-100 hover:text-medical-600 dark:text-clinical-400 dark:hover:bg-clinical-800 dark:hover:text-medical-400"
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

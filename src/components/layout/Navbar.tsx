"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Activity } from "lucide-react";

const navLinks = [
  { label: "Platform Modules", href: "#modules" },
  { label: "Clinical Workflow", href: "#workflow" },
  { label: "Architecture", href: "#architecture" },
  { label: "Hayer Technologies", href: "#hayer" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-clinical-200/60 bg-white/80 backdrop-blur-xl dark:border-clinical-800/60 dark:bg-clinical-900/80">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
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

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-clinical-600 transition-colors hover:text-medical-600 dark:text-clinical-400 dark:hover:text-medical-400"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-clinical-600 lg:hidden dark:text-clinical-400"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-clinical-200/60 bg-white/95 backdrop-blur-xl lg:hidden dark:border-clinical-800/60 dark:bg-clinical-900/95"
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

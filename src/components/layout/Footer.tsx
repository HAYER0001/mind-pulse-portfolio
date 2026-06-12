"use client";

import { Activity } from "lucide-react";
import { motion } from "framer-motion";

const currentYear = new Date().getFullYear();

const linkGroups = [
  {
    heading: "Product",
    links: [
      { label: "Home", href: "#" },
      { label: "Features", href: "#features" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Use Cases", href: "#workflow" },
      { label: "Privacy", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="rounded-b-[2.5rem] border-t border-white/5 bg-clinical-950">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-10">
        {/* Top row: logo + link grid */}
        <div className="grid gap-12 sm:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand column */}
          <div>
            <a href="#" className="inline-flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-medical-600 text-white">
                <Activity size={15} />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-bold text-white">
                  MindPulse
                </span>
                <span className="text-[10px] font-semibold tracking-wider text-medical-400">
                  HIMS
                </span>
              </div>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-clinical-500">
              A unified clinical ecosystem streamlining patient care and
              hospital operations at every scale.
            </p>
          </div>

          {/* Link columns */}
          {linkGroups.map((group) => (
            <div key={group.heading}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-clinical-500">
                {group.heading}
              </h4>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-clinical-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-14 h-px bg-white/5" />

        {/* Bottom row */}
        <div className="mt-8 flex flex-col items-center gap-6 text-center">
          {/* Signature with glow hover */}
          <motion.p
            className="cursor-default bg-gradient-to-r from-clinical-600 via-clinical-500 to-clinical-600 bg-clip-text text-sm font-medium text-transparent transition-all duration-500"
            whileHover={{
              backgroundImage:
                "linear-gradient(to right, #64748b, #e2e8f0, #64748b)",
              textShadow: "0 0 30px rgba(226,232,240,0.3)",
            }}
          >
            Engineered by Hayer Technologies.
          </motion.p>

          <p className="text-xs text-clinical-600">
            &copy; {currentYear} Hayer Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

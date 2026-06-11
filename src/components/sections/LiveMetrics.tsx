"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";

const templates = [
  () => {
    const id = Math.random().toString(36).slice(2, 8).toUpperCase();
    return { text: `Syncing Patient  HID: MCH2026-${id}`, tag: "SYNC" as const };
  },
  () => ({
    text: "Atomic WriteBatch Complete  →  /visits + /patients_bio",
    tag: "WRITE" as const,
  }),
  () => {
    const rx = ["Amoxicillin 500mg", "Paracetamol 650mg", "Pantoprazole 40mg", "Cetirizine 10mg"][
      Math.floor(Math.random() * 4)
    ];
    return { text: `Prescription Routed to Pharmacy  ·  ${rx}`, tag: "RX" as const };
  },
  () => ({
    text: `New Walk-in Registered  ·  Reception Desk ${Math.ceil(Math.random() * 4)}`,
    tag: "REG" as const,
  }),
  () => ({
    text: `Vitals Captured  ·  BP ${100 + Math.floor(Math.random() * 40)}/${60 + Math.floor(Math.random() * 30)}  HR ${60 + Math.floor(Math.random() * 40)}bpm`,
    tag: "VITAL" as const,
  }),
  () => ({
    text: "Cloud Function Trigger  ·  onAppointmentFinalized executed",
    tag: "FN" as const,
  }),
  () => {
    const dept = ["Cardiology", "Orthopedics", "Neurology", "Pediatrics"][
      Math.floor(Math.random() * 4)
    ];
    return { text: `Consultation Completed  ·  ${dept} Queue Updated`, tag: "DONE" as const };
  },
  () => ({
    text: `Invoice Generated  ·  ₹${(500 + Math.floor(Math.random() * 4500)).toLocaleString("en-IN")}  ·  GST Applied`,
    tag: "BILL" as const,
  }),
];

const tagColors: Record<string, string> = {
  SYNC: "text-medical-400",
  WRITE: "text-success-400",
  RX: "text-amber-400",
  REG: "text-medical-300",
  VITAL: "text-rose-400",
  FN: "text-violet-400",
  DONE: "text-success-300",
  BILL: "text-yellow-400",
};

interface LogLine {
  id: number;
  timestamp: string;
  text: string;
  tag: string;
}

const MAX_LINES = 12;

function generateLine(id: number): LogLine {
  const tmpl = templates[Math.floor(Math.random() * templates.length)]();
  const now = new Date();
  const ts = now.toLocaleTimeString("en-GB", { hour12: false });
  return { id, timestamp: ts, text: tmpl.text, tag: tmpl.tag };
}

function seedLines(): LogLine[] {
  const lines: LogLine[] = [];
  for (let i = 0; i < 6; i++) {
    lines.push(generateLine(i));
  }
  return lines;
}

export default function LiveMetrics() {
  const [lines, setLines] = useState<LogLine[]>(() => seedLines());
  const counterRef = useRef(6);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      counterRef.current += 1;
      const newLine = generateLine(counterRef.current);
      setLines((prev) => [...prev.slice(-(MAX_LINES - 1)), newLine]);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-2xl border border-clinical-800 bg-clinical-950 shadow-2xl shadow-medical-950/30">
          {/* Title bar */}
          <div className="flex items-center justify-between border-b border-clinical-800 px-5 py-3">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                <span className="h-3 w-3 rounded-full bg-success-500/80" />
              </div>
              <div className="flex items-center gap-2 text-clinical-400">
                <Terminal size={14} />
                <span className="text-xs font-medium">
                  mindpulse-hims — live telemetry
                </span>
              </div>
            </div>

            {/* System Online */}
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success-400" />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-success-400">
                System Online
              </span>
            </div>
          </div>

          {/* Log body */}
          <div
            ref={scrollRef}
            className="h-80 overflow-y-auto p-5 font-mono text-[13px] leading-relaxed"
          >
            <AnimatePresence initial={false}>
              {lines.map((line) => (
                <motion.div
                  key={line.id}
                  initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="flex gap-3 py-0.5"
                >
                  <span className="shrink-0 text-clinical-600">
                    {line.timestamp}
                  </span>
                  <span
                    className={`shrink-0 font-semibold ${tagColors[line.tag] ?? "text-clinical-400"}`}
                  >
                    [{line.tag}]
                  </span>
                  <span className="text-clinical-300">{line.text}</span>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Blinking cursor */}
            <motion.span
              className="inline-block h-4 w-1.5 translate-y-0.5 bg-medical-400"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "steps(2)" as never }}
            />
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-between border-t border-clinical-800 px-5 py-2 text-[11px] text-clinical-500">
            <span>Firestore ap-south-1 · multi-tenant</span>
            <span>{lines.length} events captured</span>
          </div>
        </div>
      </div>
    </section>
  );
}

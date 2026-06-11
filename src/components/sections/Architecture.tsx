"use client";

import { motion } from "framer-motion";
import {
  Layers,
  Smartphone,
  GitBranch,
  Flame,
  Database,
  Check,
  Zap,
  ArrowDown,
  ArrowRight,
} from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";

/* ------------------------------------------------------------------ */
/*  Fade-up variant                                                   */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" as const },
  }),
};

/* ------------------------------------------------------------------ */
/*  Tech stack items                                                  */
/* ------------------------------------------------------------------ */

const stack = [
  {
    icon: Smartphone,
    name: "Flutter / Dart",
    role: "Cross-Platform UI",
    description:
      "Single codebase targeting iOS, Android, and Web with 60fps rendering and pixel-perfect clinical interfaces.",
  },
  {
    icon: GitBranch,
    name: "Riverpod",
    role: "Reactive State",
    description:
      "Compile-safe, provider-scoped state management driving every queue, form, and real-time subscription across modules.",
  },
  {
    icon: Flame,
    name: "Firebase",
    role: "Auth / Firestore / Cloud Functions",
    description:
      "Real-time document database, multi-tenant auth with role-based access, and serverless business logic at the edge.",
  },
  {
    icon: Database,
    name: "Hive",
    role: "Offline-First Cache",
    description:
      "Lightweight, encrypted local storage ensuring uninterrupted clinical workflows even when connectivity drops.",
  },
];

function TechStack() {
  return (
    <div className="space-y-4">
      {stack.map((item, i) => (
        <motion.div
          key={item.name}
          className="rounded-xl border border-clinical-200 bg-white p-4 transition-shadow hover:shadow-md hover:shadow-medical-600/5 dark:border-clinical-800 dark:bg-clinical-900/60"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 + i * 0.1, duration: 0.45, ease: "easeOut" as const }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-medical-600 text-white">
              <item.icon size={18} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-clinical-900 dark:text-white">
                {item.name}
              </h4>
              <p className="text-xs text-medical-600 dark:text-medical-400">
                {item.role}
              </p>
            </div>
          </div>
          <p className="mt-2.5 text-sm leading-relaxed text-clinical-500 dark:text-clinical-400">
            {item.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  WriteBatch animation                                              */
/* ------------------------------------------------------------------ */

function WriteBatchDiagram() {
  const loopTransition = {
    duration: 5,
    repeat: Infinity,
    repeatDelay: 2,
    ease: "easeInOut" as const,
  };

  return (
    <motion.div
      className="rounded-2xl border border-clinical-200 bg-gradient-to-br from-clinical-50 to-white p-6 sm:p-8 dark:border-clinical-800 dark:from-clinical-900/80 dark:to-clinical-950"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {/* Trigger event */}
      <motion.div
        className="mx-auto flex w-fit items-center gap-2 rounded-lg border border-medical-200 bg-medical-50 px-4 py-2.5 dark:border-medical-800 dark:bg-medical-950/60"
        animate={{
          boxShadow: [
            "0 0 0 0 rgba(37,99,235,0)",
            "0 0 0 8px rgba(37,99,235,0.1)",
            "0 0 0 0 rgba(37,99,235,0)",
          ],
        }}
        transition={loopTransition}
      >
        <Zap size={16} className="text-medical-600 dark:text-medical-400" />
        <span className="text-sm font-semibold text-medical-700 dark:text-medical-300">
          AppointmentFinalized
        </span>
      </motion.div>

      {/* Arrow down */}
      <div className="flex justify-center py-3">
        <motion.div
          className="text-clinical-400 dark:text-clinical-600"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ ...loopTransition, delay: 0.6 }}
        >
          <ArrowDown size={20} />
        </motion.div>
      </div>

      {/* WriteBatch box */}
      <motion.div
        className="mx-auto rounded-xl border-2 border-dashed border-medical-300 bg-white px-5 py-4 dark:border-medical-700 dark:bg-clinical-900/80"
        animate={{
          borderColor: [
            "rgb(147 197 253)",
            "rgb(37 99 235)",
            "rgb(147 197 253)",
          ],
        }}
        transition={loopTransition}
      >
        <p className="mb-4 text-center text-xs font-bold uppercase tracking-widest text-medical-600 dark:text-medical-400">
          WriteBatch.commit()
        </p>

        {/* Two parallel writes */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          {/* visits write */}
          <motion.div
            className="rounded-lg border border-clinical-200 bg-clinical-50 p-3 dark:border-clinical-700 dark:bg-clinical-800/60"
            animate={{
              opacity: [0.4, 1, 1, 1],
              scale: [0.95, 1, 1, 1],
            }}
            transition={{ ...loopTransition, delay: 1.2 }}
          >
            <div className="flex items-center justify-between">
              <code className="text-xs font-semibold text-clinical-700 dark:text-clinical-300">
                /visits
              </code>
              <motion.div
                animate={{
                  opacity: [0, 0, 1, 1],
                  scale: [0, 0, 1, 1],
                }}
                transition={{ ...loopTransition, delay: 1.2 }}
              >
                <Check size={14} className="text-success-500" />
              </motion.div>
            </div>
            <p className="mt-1.5 text-[11px] leading-snug text-clinical-500 dark:text-clinical-400">
              doctor, diagnosis, prescription, timestamp
            </p>
          </motion.div>

          {/* Center connector */}
          <div className="flex flex-col items-center gap-1">
            <motion.div
              className="text-clinical-400 dark:text-clinical-600"
              animate={{ opacity: [0, 0.5, 1, 0.5] }}
              transition={{ ...loopTransition, delay: 1 }}
            >
              <ArrowRight size={16} className="rotate-180" />
            </motion.div>
            <span className="text-[9px] font-semibold uppercase tracking-wider text-clinical-400 dark:text-clinical-500">
              atomic
            </span>
            <motion.div
              className="text-clinical-400 dark:text-clinical-600"
              animate={{ opacity: [0, 0.5, 1, 0.5] }}
              transition={{ ...loopTransition, delay: 1 }}
            >
              <ArrowRight size={16} />
            </motion.div>
          </div>

          {/* patients_bio write */}
          <motion.div
            className="rounded-lg border border-clinical-200 bg-clinical-50 p-3 dark:border-clinical-700 dark:bg-clinical-800/60"
            animate={{
              opacity: [0.4, 1, 1, 1],
              scale: [0.95, 1, 1, 1],
            }}
            transition={{ ...loopTransition, delay: 1.2 }}
          >
            <div className="flex items-center justify-between">
              <code className="text-xs font-semibold text-clinical-700 dark:text-clinical-300">
                /patients_bio
              </code>
              <motion.div
                animate={{
                  opacity: [0, 0, 1, 1],
                  scale: [0, 0, 1, 1],
                }}
                transition={{ ...loopTransition, delay: 1.2 }}
              >
                <Check size={14} className="text-success-500" />
              </motion.div>
            </div>
            <p className="mt-1.5 text-[11px] leading-snug text-clinical-500 dark:text-clinical-400">
              lastVisit, visitCount, updatedAt
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Commit status */}
      <div className="flex justify-center pt-4">
        <motion.div
          className="flex items-center gap-1.5 rounded-full border border-success-200 bg-success-50 px-3 py-1 dark:border-success-800 dark:bg-success-950/40"
          animate={{
            opacity: [0, 0, 0, 1],
            y: [6, 6, 6, 0],
          }}
          transition={{ ...loopTransition, delay: 1.2 }}
        >
          <Check size={12} className="text-success-600 dark:text-success-400" />
          <span className="text-[11px] font-semibold text-success-700 dark:text-success-400">
            Batch committed — zero partial writes
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                           */
/* ------------------------------------------------------------------ */

export default function Architecture() {
  return (
    <section id="architecture" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-14 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            <SectionBadge label="Architecture" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="mt-5 text-3xl font-bold tracking-tight text-clinical-900 sm:text-4xl md:text-5xl dark:text-white"
          >
            Built for{" "}
            <span className="text-medical-600 dark:text-medical-400">
              clinical reliability
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="mx-auto mt-4 max-w-2xl text-clinical-500 dark:text-clinical-400"
          >
            A feature-first modular architecture where every layer — UI, state,
            backend, and cache — is purpose-built for healthcare-grade
            reliability.
          </motion.p>
        </div>

        {/* Split layout */}
        <div className="grid items-start gap-10 lg:grid-cols-2">
          {/* Left: stack */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            <div className="mb-5 flex items-center gap-2">
              <Layers size={18} className="text-medical-600 dark:text-medical-400" />
              <h3 className="text-lg font-semibold text-clinical-900 dark:text-white">
                The Stack
              </h3>
            </div>
            <TechStack />
          </motion.div>

          {/* Right: WriteBatch diagram */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
          >
            <div className="mb-5 flex items-center gap-2">
              <Flame size={18} className="text-medical-600 dark:text-medical-400" />
              <h3 className="text-lg font-semibold text-clinical-900 dark:text-white">
                Atomic WriteBatch Flow
              </h3>
            </div>
            <WriteBatchDiagram />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

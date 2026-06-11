"use client";

import { motion } from "framer-motion";
import {
  UserRound,
  Stethoscope,
  ConciergeBell,
  Pill,
} from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";
import Button from "@/components/ui/Button";

/* ------------------------------------------------------------------ */
/*  Staggered fade-up variant                                         */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
};

/* ------------------------------------------------------------------ */
/*  Interconnected clinical nodes graphic                             */
/* ------------------------------------------------------------------ */

const nodes = [
  { id: "patients", label: "Patients", icon: UserRound, x: 50, y: 20 },
  { id: "doctors", label: "Doctors", icon: Stethoscope, x: 82, y: 50 },
  { id: "reception", label: "Reception", icon: ConciergeBell, x: 50, y: 80 },
  { id: "pharmacy", label: "Pharmacy", icon: Pill, x: 18, y: 50 },
];

const edges: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0],
  [0, 2],
  [1, 3],
];

function SyncPulse({
  x1,
  y1,
  x2,
  y2,
  delay,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
}) {
  return (
    <motion.circle
      r={3}
      fill="#2563eb"
      initial={{ opacity: 0 }}
      animate={{
        cx: [x1, x2],
        cy: [y1, y2],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 2.4,
        delay,
        repeat: Infinity,
        repeatDelay: 1.2,
        ease: "easeInOut" as const,
      }}
    />
  );
}

function ClinicalNetwork() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        {/* Edges */}
        {edges.map(([a, b], i) => {
          const from = nodes[a];
          const to = nodes[b];
          const isCross = (a === 0 && b === 2) || (a === 1 && b === 3);
          return (
            <g key={`edge-${i}`}>
              <motion.line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                className={
                  isCross
                    ? "stroke-medical-300/30 dark:stroke-medical-700/30"
                    : "stroke-medical-300/50 dark:stroke-medical-600/40"
                }
                strokeWidth={isCross ? 0.3 : 0.4}
                strokeDasharray={isCross ? "1 1" : undefined}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  delay: 0.8 + i * 0.12,
                  duration: 0.6,
                  ease: "easeOut" as const,
                }}
              />
              <SyncPulse
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                delay={1.5 + i * 0.5}
              />
            </g>
          );
        })}
      </svg>

      {/* Nodes */}
      {nodes.map((node, i) => (
        <motion.div
          key={node.id}
          className="absolute flex flex-col items-center gap-1.5"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 0.3 + i * 0.15,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          {/* Breathing ring */}
          <motion.div
            className="absolute h-14 w-14 rounded-2xl bg-medical-400/10 sm:h-16 sm:w-16"
            animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0, 0.4] }}
            transition={{
              duration: 3,
              delay: i * 0.6,
              repeat: Infinity,
              ease: "easeInOut" as const,
            }}
          />

          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-medical-200 bg-white shadow-lg shadow-medical-600/10 sm:h-16 sm:w-16 dark:border-clinical-700 dark:bg-clinical-800 dark:shadow-medical-400/5">
            <node.icon
              size={22}
              className="text-medical-600 dark:text-medical-400"
            />
          </div>

          <span className="text-[11px] font-semibold text-clinical-600 sm:text-xs dark:text-clinical-300">
            {node.label}
          </span>
        </motion.div>
      ))}

      {/* Center hub glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="h-5 w-5 rounded-full bg-medical-500/30 blur-lg"
          animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as const }}
        />
      </div>

      {/* Live sync indicator */}
      <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success-500 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success-500" />
        </span>
        <span className="text-[10px] font-medium text-clinical-400 dark:text-clinical-500">
          Real-time sync
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero section                                                      */
/* ------------------------------------------------------------------ */

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16">
      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #64748b 1px, transparent 1px), linear-gradient(to bottom, #64748b 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <SectionBadge label="Multi-Tenant Healthcare Platform" />
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="mt-8 text-4xl font-extrabold leading-tight tracking-tight text-clinical-900 sm:text-5xl md:text-7xl dark:text-white"
        >
          The Complete{" "}
          <span className="text-medical-600 dark:text-medical-400">
            Clinical
          </span>{" "}
          Ecosystem.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-clinical-500 dark:text-clinical-400"
        >
          A robust, cross-platform Hospital Management System bridging patient
          self-service with complex clinical workflows, powered by Flutter and
          Firebase.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button variant="primary">Explore Modules</Button>
          <Button variant="outline">View Architecture</Button>
        </motion.div>
      </div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={4}
        className="relative mt-16 w-full max-w-lg"
      >
        <ClinicalNetwork />
      </motion.div>
    </section>
  );
}

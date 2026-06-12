"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FileX2,
  Users,
  Pill,
  Receipt,
  FolderHeart,
  Radio,
  Repeat,
  Zap,
} from "lucide-react";

const items = [
  {
    pain: "Disconnected Patient Records",
    painDesc:
      "Paper files scattered across departments. Doctors waste 12+ minutes per consultation hunting for patient history.",
    painIcon: FileX2,
    solution: "Unified Digital E-Files",
    solutionDesc:
      "Every consultation, prescription, and diagnostic indexed by visit — instant clinical lookup from any device.",
    solutionIcon: FolderHeart,
  },
  {
    pain: "Manual Queue Chaos",
    painDesc:
      "Walk-ins collide with scheduled patients. Reception juggles tokens on paper. Doctors have no visibility into wait times.",
    painIcon: Users,
    solution: "Real-Time Queue Sync",
    solutionDesc:
      "Twin-stream intelligent queuing that merges walk-ins and appointments into a single, live priority feed for every doctor.",
    solutionIcon: Radio,
  },
  {
    pain: "Lost Prescriptions & Re-dosing",
    painDesc:
      "Handwritten prescriptions get misread or lost. Patients return for refills with no record of prior dosages.",
    painIcon: Pill,
    solution: "Smart Auto-Repeat Rx",
    solutionDesc:
      "Digital prescriptions with auto-repeat logic, pharmacy routing, and a full audit trail accessible to patient and doctor.",
    solutionIcon: Repeat,
  },
  {
    pain: "Billing Errors & Revenue Leakage",
    painDesc:
      "Manual invoicing leads to missed charges, incorrect GST, and zero visibility into daily revenue.",
    painIcon: Receipt,
    solution: "Atomic Fee Invoicing",
    solutionDesc:
      "Every consultation triggers an atomic billing event — auto-calculated fees, GST, and real-time revenue dashboards.",
    solutionIcon: Zap,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function PainSolutionCard({
  item,
  index,
}: {
  item: (typeof items)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const morphProgress = useTransform(scrollYProgress, [0.3, 0.85], [0, 1]);

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="relative"
    >
      {/* Connector line */}
      {index < items.length - 1 && (
        <div className="absolute left-6 top-[4.5rem] -bottom-4 w-px bg-gradient-to-b from-clinical-300 to-transparent dark:from-clinical-700" />
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Pain */}
        <motion.div
          className="rounded-xl border border-rose-200/60 bg-rose-50/50 p-5 dark:border-rose-900/30 dark:bg-rose-950/20"
          style={{ opacity: useTransform(morphProgress, [0, 1], [1, 0.35]) }}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400">
              <item.painIcon size={20} />
            </div>
            <h4 className="text-sm font-bold text-rose-700 dark:text-rose-400">
              {item.pain}
            </h4>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-rose-600/80 dark:text-rose-400/70">
            {item.painDesc}
          </p>
        </motion.div>

        {/* Solution */}
        <motion.div
          className="rounded-xl border border-medical-200/60 bg-medical-50/50 p-5 dark:border-medical-800/40 dark:bg-medical-950/30"
          style={{
            opacity: useTransform(morphProgress, [0, 1], [0.35, 1]),
            scale: useTransform(morphProgress, [0, 1], [0.97, 1]),
          }}
        >
          <div className="flex items-center gap-3">
            <motion.div
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-medical-100 text-medical-600 dark:bg-medical-900/50 dark:text-medical-400"
              style={{
                boxShadow: useTransform(
                  morphProgress,
                  [0, 1],
                  ["0 0 0 0 rgba(59,130,246,0)", "0 0 20px 2px rgba(59,130,246,0.2)"]
                ),
              }}
            >
              <item.solutionIcon size={20} />
            </motion.div>
            <h4 className="text-sm font-bold text-medical-700 dark:text-medical-300">
              {item.solution}
            </h4>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-medical-600/80 dark:text-medical-400/70">
            {item.solutionDesc}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ValueProposition() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const headingOpacityPain = useTransform(scrollYProgress, [0, 0.35, 0.45], [1, 1, 0]);
  const headingOpacitySolution = useTransform(scrollYProgress, [0.35, 0.5, 1], [0, 1, 1]);

  return (
    <section ref={sectionRef} className="relative px-6 py-32">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1fr_1.4fr]">
        {/* Left — sticky heading */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="inline-block rounded-full border border-medical-200 bg-medical-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-medical-700 dark:border-medical-800 dark:bg-medical-950/40 dark:text-medical-400">
              Why MindPulse
            </span>
          </motion.div>

          <div className="relative mt-6 h-24 overflow-hidden sm:h-28">
            {/* Pain heading */}
            <motion.h2
              className="absolute inset-0 text-3xl font-bold leading-tight tracking-tight text-clinical-900 sm:text-4xl dark:text-white"
              style={{ opacity: headingOpacityPain }}
            >
              Barriers to{" "}
              <span className="text-rose-500">Clinical Efficiency</span>
            </motion.h2>

            {/* Solution heading */}
            <motion.h2
              className="absolute inset-0 text-3xl font-bold leading-tight tracking-tight text-clinical-900 sm:text-4xl dark:text-white"
              style={{ opacity: headingOpacitySolution }}
            >
              The{" "}
              <span className="text-medical-600 dark:text-medical-400">
                MindPulse
              </span>{" "}
              Solution
            </motion.h2>
          </div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-4 max-w-sm text-clinical-500 dark:text-clinical-400"
          >
            Every pain point in traditional hospital workflows maps directly to
            a MindPulse module. Scroll to see the transformation.
          </motion.p>
        </div>

        {/* Right — pain/solution pairs */}
        <div className="flex flex-col gap-10">
          {items.map((item, i) => (
            <PainSolutionCard key={item.pain} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

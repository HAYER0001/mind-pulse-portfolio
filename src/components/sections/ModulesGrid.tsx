"use client";

import { motion } from "framer-motion";
import {
  CalendarCheck,
  Stethoscope,
  Receipt,
  FolderHeart,
  BarChart3,
  Video,
  Mic,
  WifiOff,
  Repeat,
  Activity,
  Fingerprint,
  Clock,
  Users,
  TrendingUp,
  ClipboardList,
} from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";

/* ------------------------------------------------------------------ */
/*  Card visuals                                                      */
/* ------------------------------------------------------------------ */

function BookingSteps() {
  const steps = [
    { n: "1", label: "Symptoms" },
    { n: "2", label: "Doctor" },
    { n: "3", label: "Slot" },
    { n: "4", label: "Mode" },
    { n: "5", label: "Confirm" },
  ];

  return (
    <div className="mt-5 flex items-center gap-1">
      {steps.map((s, i) => (
        <div key={s.n} className="flex items-center gap-1">
          <motion.div
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-medical-600 text-[11px] font-bold text-white"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{
              delay: 0.3 + i * 0.1,
              type: "spring",
              stiffness: 300,
              damping: 18,
            }}
            viewport={{ once: true }}
          >
            {s.n}
          </motion.div>
          {i < steps.length - 1 && (
            <div className="h-px w-3 bg-clinical-300 dark:bg-clinical-700 sm:w-5" />
          )}
        </div>
      ))}
    </div>
  );
}

function BookingModes() {
  const modes = [
    { icon: Video, label: "Video" },
    { icon: Mic, label: "Audio" },
    { icon: WifiOff, label: "Offline" },
  ];

  return (
    <div className="mt-3 flex gap-2">
      {modes.map((m, i) => (
        <motion.div
          key={m.label}
          className="flex items-center gap-1.5 rounded-md border border-clinical-200 bg-clinical-50 px-2.5 py-1.5 text-[11px] font-medium text-clinical-600 dark:border-clinical-700 dark:bg-clinical-800 dark:text-clinical-400"
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 + i * 0.1 }}
          viewport={{ once: true }}
        >
          <m.icon size={13} />
          {m.label}
        </motion.div>
      ))}
    </div>
  );
}

function ConsultationVisual() {
  const items = [
    { icon: Users, label: "Twin-Stream Queue", color: "text-medical-600 dark:text-medical-400" },
    { icon: Activity, label: "Live Vitals", color: "text-success-600 dark:text-success-400" },
    { icon: Repeat, label: "Auto-Repeat Rx", color: "text-medical-600 dark:text-medical-400" },
  ];

  return (
    <div className="mt-5 space-y-2">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          className="flex items-center gap-3 rounded-lg border border-clinical-200 bg-clinical-50 px-3 py-2.5 dark:border-clinical-700 dark:bg-clinical-800/60"
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + i * 0.12, ease: "easeOut" as const }}
          viewport={{ once: true }}
        >
          <item.icon size={16} className={item.color} />
          <span className="text-xs font-medium text-clinical-700 dark:text-clinical-300">
            {item.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function ReceptionChips() {
  const chips = [
    { icon: Fingerprint, label: "Aadhaar KYC" },
    { icon: Receipt, label: "Atomic Invoicing" },
    { icon: Clock, label: "Walk-in Queue" },
  ];

  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {chips.map((c, i) => (
        <motion.div
          key={c.label}
          className="flex items-center gap-1.5 rounded-full border border-clinical-200 bg-white px-3 py-1.5 text-[11px] font-medium text-clinical-600 dark:border-clinical-700 dark:bg-clinical-800 dark:text-clinical-400"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + i * 0.1 }}
          viewport={{ once: true }}
        >
          <c.icon size={13} />
          {c.label}
        </motion.div>
      ))}
    </div>
  );
}

function TimelineVisual() {
  const visits = ["Jan 2025", "Mar 2025", "Jun 2025"];

  return (
    <div className="mt-5 flex items-center gap-0">
      {visits.map((v, i) => (
        <div key={v} className="flex items-center">
          <motion.div
            className="flex flex-col items-center gap-1"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.15 }}
            viewport={{ once: true }}
          >
            <div className="h-3 w-3 rounded-full border-2 border-medical-500 bg-white dark:bg-clinical-900" />
            <span className="text-[10px] font-medium text-clinical-500 dark:text-clinical-400">
              {v}
            </span>
          </motion.div>
          {i < visits.length - 1 && (
            <div className="mx-1 mb-4 h-px w-10 bg-clinical-300 sm:w-14 dark:bg-clinical-700" />
          )}
        </div>
      ))}
    </div>
  );
}

function RevenueChart() {
  const bars = [40, 55, 35, 70, 60, 85, 75, 92, 68, 88, 78, 95];

  return (
    <div className="mt-5 flex h-20 items-end gap-1">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-t bg-gradient-to-t from-medical-600 to-medical-400"
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          transition={{ delay: 0.2 + i * 0.05, duration: 0.4, ease: "easeOut" as const }}
          viewport={{ once: true }}
        />
      ))}
    </div>
  );
}

function ManagementChips() {
  const items = [
    { icon: TrendingUp, label: "Revenue" },
    { icon: Users, label: "Staff" },
    { icon: ClipboardList, label: "Attendance" },
  ];

  return (
    <div className="mt-3 flex gap-2">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          className="flex items-center gap-1.5 rounded-md border border-clinical-200 bg-clinical-50 px-2.5 py-1.5 text-[11px] font-medium text-clinical-600 dark:border-clinical-700 dark:bg-clinical-800 dark:text-clinical-400"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + i * 0.1 }}
          viewport={{ once: true }}
        >
          <item.icon size={13} />
          {item.label}
        </motion.div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Card data                                                         */
/* ------------------------------------------------------------------ */

interface ModuleCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  area: string;
  visual: React.ReactNode;
}

const modules: ModuleCard[] = [
  {
    title: "Patient App & 5-Step Booking",
    description:
      "Intelligent self-registration with Aadhaar-based KYC, symptom capture, and multi-modal consultations — video, audio, or walk-in — in five guided steps.",
    icon: <CalendarCheck size={20} />,
    area: "booking",
    visual: (
      <>
        <BookingSteps />
        <BookingModes />
      </>
    ),
  },
  {
    title: "Consultation Workspace",
    description:
      "A dual-queue command center for doctors — manage walk-ins and scheduled patients, capture vitals in real time, and build smart auto-repeat prescriptions.",
    icon: <Stethoscope size={20} />,
    area: "consult",
    visual: <ConsultationVisual />,
  },
  {
    title: "Reception & Billing",
    description:
      "Walk-in registrations with Aadhaar verification, automated fee calculation, and atomic invoicing that keeps billing airtight.",
    icon: <Receipt size={20} />,
    area: "reception",
    visual: <ReceptionChips />,
  },
  {
    title: "Digital E-File",
    description:
      "A unified patient history vault — every consultation, prescription, and diagnostic report indexed by visit for instant clinical lookup.",
    icon: <FolderHeart size={20} />,
    area: "efile",
    visual: <TimelineVisual />,
  },
  {
    title: "Management Board",
    description:
      "Boardroom-grade analytics — revenue trends, department throughput, staff attendance, and operational KPIs in real-time dashboards.",
    icon: <BarChart3 size={20} />,
    area: "mgmt",
    visual: (
      <>
        <RevenueChart />
        <ManagementChips />
      </>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Grid                                                              */
/* ------------------------------------------------------------------ */

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const gridAreas = {
  booking: "md:[grid-area:booking]",
  consult: "md:[grid-area:consult]",
  reception: "md:[grid-area:reception]",
  efile: "md:[grid-area:efile]",
  mgmt: "md:[grid-area:mgmt]",
} as const;

export default function ModulesGrid() {
  return (
    <section id="modules" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-14 text-center">
          <SectionBadge label="Platform Modules" />
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-clinical-900 sm:text-4xl md:text-5xl dark:text-white">
            Every module a hospital needs
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-clinical-500 dark:text-clinical-400">
            Five integrated pillars spanning the entire clinical journey — from
            the patient&apos;s first tap to boardroom-level analytics.
          </p>
        </div>

        {/* Bento grid */}
        <div
          className="grid grid-cols-1 gap-5 md:grid-cols-4"
          style={{
            gridTemplateAreas: `
              "booking booking consult consult"
              "reception efile mgmt mgmt"
            `,
          }}
        >
          {modules.map((card, i) => (
            <motion.article
              key={card.title}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              custom={i}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className={`group rounded-2xl border border-clinical-200 bg-white p-6 transition-shadow hover:shadow-xl hover:shadow-medical-600/5 dark:border-clinical-800 dark:bg-clinical-900/60 ${gridAreas[card.area as keyof typeof gridAreas]}`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-medical-600 text-white">
                  {card.icon}
                </div>
                <h3 className="text-lg font-semibold text-clinical-900 dark:text-white">
                  {card.title}
                </h3>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-clinical-500 dark:text-clinical-400">
                {card.description}
              </p>

              {card.visual}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

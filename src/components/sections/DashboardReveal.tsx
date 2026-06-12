"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
} from "framer-motion";
import {
  Activity,
  Users,
  CalendarCheck,
  ClipboardList,
  TrendingUp,
  Bell,
  Pill,
  FileHeart,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Placeholder dashboard UI                                          */
/* ------------------------------------------------------------------ */

const queueItems = [
  { name: "Riya Sharma", token: "T-014", type: "Walk-in", status: "Vitals" },
  { name: "Arjun Mehta", token: "T-015", type: "Scheduled", status: "Waiting" },
  { name: "Priya Nair", token: "T-016", type: "Video", status: "In Consult" },
  { name: "Vikram Das", token: "T-017", type: "Walk-in", status: "Waiting" },
];

const statCards = [
  { label: "Today's Patients", value: "142", icon: Users, trend: "+12%" },
  { label: "Appointments", value: "68", icon: CalendarCheck, trend: "+8%" },
  { label: "Prescriptions", value: "94", icon: Pill, trend: "+15%" },
  { label: "Revenue", value: "₹1.2L", icon: TrendingUp, trend: "+22%" },
];

function DashboardUI() {
  return (
    <div className="mx-auto h-full w-full max-w-6xl px-6 py-20">
      <div className="flex h-full flex-col gap-5">
        {/* Top bar */}
        <div className="flex items-center justify-between rounded-xl border border-medical-500/20 bg-clinical-900/80 px-5 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-medical-600 text-white">
              <Activity size={14} />
            </div>
            <span className="text-sm font-bold text-white">
              MindPulse Dashboard
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-clinical-400">
              <Bell size={14} />
            </div>
            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-medical-400 to-cyan-400" />
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {statCards.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-medical-500/15 bg-clinical-900/80 p-4"
            >
              <div className="flex items-center justify-between">
                <s.icon size={16} className="text-medical-400" />
                <span className="text-[10px] font-semibold text-success-400">
                  {s.trend}
                </span>
              </div>
              <p className="mt-3 text-2xl font-bold text-white">{s.value}</p>
              <p className="mt-0.5 text-[11px] text-clinical-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Main content grid */}
        <div className="grid flex-1 grid-cols-1 gap-3 md:grid-cols-3">
          {/* Queue */}
          <div className="col-span-2 rounded-xl border border-medical-500/15 bg-clinical-900/80 p-5">
            <div className="mb-4 flex items-center gap-2">
              <ClipboardList size={15} className="text-medical-400" />
              <span className="text-xs font-semibold text-white">
                Live Patient Queue
              </span>
              <span className="ml-auto flex h-4 w-4 items-center justify-center rounded-full bg-success-500/20 text-[9px] font-bold text-success-400">
                {queueItems.length}
              </span>
            </div>
            <div className="space-y-2">
              {queueItems.map((q) => (
                <div
                  key={q.token}
                  className="flex items-center justify-between rounded-lg bg-white/[0.03] px-3 py-2.5"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-medical-500/15 text-[10px] font-bold text-medical-400">
                      {q.token.split("-")[1]}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white">
                        {q.name}
                      </p>
                      <p className="text-[10px] text-clinical-500">{q.type}</p>
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      q.status === "In Consult"
                        ? "bg-success-500/15 text-success-400"
                        : q.status === "Vitals"
                          ? "bg-amber-500/15 text-amber-400"
                          : "bg-white/5 text-clinical-400"
                    }`}
                  >
                    {q.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-3">
            <div className="flex-1 rounded-xl border border-medical-500/15 bg-clinical-900/80 p-5">
              <div className="mb-3 flex items-center gap-2">
                <FileHeart size={15} className="text-medical-400" />
                <span className="text-xs font-semibold text-white">
                  Recent E-Files
                </span>
              </div>
              <div className="space-y-2">
                {["Riya Sharma", "Arjun Mehta", "Priya Nair"].map((name) => (
                  <div
                    key={name}
                    className="flex items-center gap-2 rounded-lg bg-white/[0.03] px-3 py-2"
                  >
                    <div className="h-5 w-5 rounded-full bg-gradient-to-br from-medical-400/30 to-cyan-400/30" />
                    <span className="text-[11px] text-clinical-300">
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-medical-500/15 bg-clinical-900/80 p-5">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-clinical-500">
                System
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-success-400" />
                </span>
                <span className="text-xs text-success-400">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Flashlight Reveal Section                                         */
/* ------------------------------------------------------------------ */

const springConfig = { stiffness: 120, damping: 25, mass: 0.5 };

export default function DashboardReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);

  const maskImage = useMotionTemplate`radial-gradient(320px circle at ${x}px ${y}px, black 0%, transparent 70%)`;

  function handleMouseMove(e: React.MouseEvent) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(e.clientX - rect.left);
    rawY.set(e.clientY - rect.top);
  }

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen cursor-none items-center justify-center overflow-hidden bg-clinical-950"
    >
      {/* Background text prompt */}
      <div className="pointer-events-none relative z-10 select-none text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-clinical-700">
          Interactive Preview
        </p>
        <h2 className="mt-4 text-5xl font-extralight tracking-tight text-clinical-800 sm:text-7xl md:text-8xl">
          Reveal the Workflow.
        </h2>
        <p className="mt-4 text-sm text-clinical-700">
          Move your cursor to explore the dashboard
        </p>
      </div>

      {/* Dashboard layer — masked by flashlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          maskImage,
          WebkitMaskImage: maskImage,
        }}
      >
        <DashboardUI />
      </motion.div>

      {/* Subtle glow that follows cursor on top of everything */}
      <motion.div
        className="pointer-events-none absolute z-30 h-40 w-40 rounded-full bg-medical-500/8 blur-3xl"
        style={{
          left: x,
          top: y,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </section>
  );
}

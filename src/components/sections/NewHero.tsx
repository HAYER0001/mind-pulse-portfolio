"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import AnimatedText from "@/components/ui/AnimatedText";

const NetworkScene = dynamic(() => import("@/components/3d/NetworkScene"), {
  ssr: false,
});

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.3 + i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function NewHero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-clinical-950 px-6 py-24">
      {/* 3D canvas background */}
      <div className="pointer-events-auto absolute inset-0 z-0">
        <NetworkScene />
      </div>

      {/* Radial masks — blend 3D into the dark bg */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, transparent 0%, rgba(2,6,23,0.7) 55%, rgba(2,6,23,1) 100%)",
        }}
      />
      {/* Top fade */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-40"
        style={{
          background: "linear-gradient(to bottom, rgba(2,6,23,1) 0%, transparent 100%)",
        }}
      />
      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40"
        style={{
          background: "linear-gradient(to top, rgba(2,6,23,1) 0%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-[2] mx-auto flex max-w-4xl flex-col items-center text-center">
        {/* Badge */}
        <motion.span
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="inline-block rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-clinical-300"
        >
          The Future of Healthcare Operations
        </motion.span>

        {/* H1 */}
        <AnimatedText
          text={"Connect Patients,\nDoctors, and Hospitals\nin Minutes."}
          as="h1"
          className="mt-10 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-7xl"
          delay={0.45}
          gradient={{
            text: "in Minutes.",
            className:
              "bg-gradient-to-r from-medical-400 to-medical-200 bg-clip-text text-transparent",
          }}
        />

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-clinical-400"
        >
          MindPulse eliminates clinical bottlenecks. A unified ecosystem for
          intelligent queueing, digital E-files, and seamless hospital
          management.
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="cursor-pointer rounded-full bg-white px-8 py-4 text-sm font-semibold tracking-wide text-clinical-950 shadow-lg shadow-white/10 transition-colors hover:bg-clinical-100"
          >
            Explore the Ecosystem
          </motion.button>
        </motion.div>

        {/* Subtle scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-20"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as const }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] font-medium uppercase tracking-widest text-clinical-500">
              Scroll
            </span>
            <div className="h-8 w-px bg-gradient-to-b from-clinical-500 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import SectionBadge from "@/components/ui/SectionBadge";
import Button from "@/components/ui/Button";

const NetworkScene = dynamic(() => import("@/components/3d/NetworkScene"), {
  ssr: false,
});

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16">
      {/* 3D WebGL background */}
      <div className="pointer-events-auto absolute inset-0 z-0">
        <NetworkScene />
      </div>

      {/* Radial gradient overlay for text legibility */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(248,250,252,0.85) 0%, rgba(248,250,252,0.4) 60%, transparent 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] hidden dark:block"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(2,6,23,0.88) 0%, rgba(2,6,23,0.45) 60%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-[2] mx-auto flex max-w-4xl flex-col items-center text-center">
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
          className="mt-6 max-w-2xl text-lg leading-relaxed text-clinical-500 dark:text-clinical-300"
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
    </section>
  );
}

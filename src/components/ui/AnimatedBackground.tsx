"use client";

import { motion } from "framer-motion";

const blobs = [
  {
    className: "bg-medical-400/20 dark:bg-medical-600/15",
    style: { width: "55vw", height: "55vw", top: "-15%", left: "-10%" },
    animate: { x: [0, 80, 0], y: [0, 60, 0], scale: [1, 1.15, 1] },
    duration: 22,
  },
  {
    className: "bg-medical-300/15 dark:bg-medical-700/10",
    style: { width: "45vw", height: "45vw", bottom: "-10%", right: "-8%" },
    animate: { x: [0, -70, 0], y: [0, -50, 0], scale: [1, 1.1, 1] },
    duration: 26,
  },
  {
    className: "bg-clinical-300/20 dark:bg-clinical-700/15",
    style: { width: "35vw", height: "35vw", top: "40%", left: "50%" },
    animate: { x: [0, -60, 0], y: [0, 40, 0], scale: [1.05, 0.95, 1.05] },
    duration: 30,
  },
];

export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${blob.className}`}
          style={blob.style}
          animate={blob.animate}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: "easeInOut" as const,
          }}
        />
      ))}
    </div>
  );
}

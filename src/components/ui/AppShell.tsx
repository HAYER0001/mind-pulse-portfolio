"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" as const }}
      className="relative mx-auto flex max-w-7xl flex-1 flex-col overflow-hidden rounded-[2.5rem] border border-clinical-200/50 bg-clinical-50/90 shadow-2xl backdrop-blur-2xl dark:border-clinical-800/50 dark:bg-clinical-950/80"
    >
      {/* Scroll progress bar */}
      <motion.div
        className="sticky top-0 z-[60] h-[3px] origin-left rounded-t-[2.5rem] bg-medical-500"
        style={{ scaleX }}
      />

      {children}
    </motion.div>
  );
}

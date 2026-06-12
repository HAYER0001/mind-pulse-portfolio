"use client";

import { motion } from "framer-motion";

const phrase =
  "ATOMIC BILLING  •  AADHAAR VERIFIED  •  TWIN-STREAM QUEUE  •  ZERO DOWNTIME  •  IMMUTABLE E-FILE  •  ";

export default function InfiniteMarquee() {
  return (
    <div className="overflow-hidden py-16">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {/* Two identical spans for seamless loop */}
        <span className="text-8xl font-black uppercase leading-none text-clinical-200/[0.04] sm:text-9xl dark:text-clinical-200/[0.06]">
          {phrase}
        </span>
        <span className="text-8xl font-black uppercase leading-none text-clinical-200/[0.04] sm:text-9xl dark:text-clinical-200/[0.06]">
          {phrase}
        </span>
      </motion.div>
    </div>
  );
}

"use client";

import { motion, type Variants } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
  gradient?: { text: string; className: string };
}

const container: Variants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: { staggerChildren: 0.05, delayChildren: delay },
  }),
};

const wordVariant: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 14, mass: 0.8 },
  },
};

export default function AnimatedText({
  text,
  as: Tag = "h1",
  className,
  delay = 0,
  gradient,
}: AnimatedTextProps) {
  const MotionTag = motion.create(Tag);

  const lines = text.split("\n");

  return (
    <MotionTag
      variants={container}
      initial="hidden"
      animate="visible"
      custom={delay}
      className={className}
    >
      {lines.map((line, lineIdx) => (
        <span key={lineIdx} className="block">
          {line.split(" ").map((word, wordIdx) => {
            const isGradientWord =
              gradient && gradient.text.split(" ").includes(word) &&
              lineIdx === lines.length - 1;

            return (
              <span
                key={`${lineIdx}-${wordIdx}`}
                className="inline-block overflow-hidden"
              >
                <motion.span
                  variants={wordVariant}
                  className={`inline-block ${
                    isGradientWord ? gradient!.className : ""
                  }`}
                >
                  {word}
                  {wordIdx < line.split(" ").length - 1 && " "}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </MotionTag>
  );
}

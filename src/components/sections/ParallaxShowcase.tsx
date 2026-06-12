"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Smartphone,
  Flame,
  Database,
  ShieldCheck,
  Layers,
  Zap,
} from "lucide-react";

const luxEase = [0.16, 1, 0.3, 1] as const;

const fadeSlideUp = {
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 1.2, ease: luxEase },
  },
};

interface ShowcaseBlock {
  badge: string;
  heading: string;
  body: string;
  bullets: { icon: React.ComponentType<{ size?: number }>; text: string }[];
  imageAccent: string;
  imageLabel: string;
  imageSubtext: string;
}

const blocks: ShowcaseBlock[] = [
  {
    badge: "Frontend Layer",
    heading: "Flutter — One Codebase,\nEvery Screen",
    body: "A single Dart codebase compiles to native iOS, Android, and Web. Feature-first folder structure keeps every module — booking, consultation, pharmacy — isolated yet composable, enabling parallel development across teams.",
    bullets: [
      { icon: Smartphone, text: "iOS · Android · Web from one source" },
      { icon: Layers, text: "Feature-first modular architecture" },
      { icon: Zap, text: "60fps Skia-rendered clinical UIs" },
    ],
    imageAccent: "from-medical-500 to-medical-700",
    imageLabel: "lib/features/",
    imageSubtext: "booking · consultation · pharmacy · e_file · management",
  },
  {
    badge: "Backend Layer",
    heading: "Firebase — Real-Time\nat Global Scale",
    body: "Firestore's document model maps naturally to clinical entities — patients, visits, prescriptions. WriteBatch ensures atomic multi-document commits, while Cloud Functions handle event-driven workflows like appointment finalization and prescription routing.",
    bullets: [
      { icon: Flame, text: "Firestore real-time subscriptions" },
      { icon: Database, text: "WriteBatch atomic transactions" },
      { icon: ShieldCheck, text: "Security Rules + HIPAA-grade ACLs" },
    ],
    imageAccent: "from-amber-500 to-amber-700",
    imageLabel: "firestore.rules",
    imageSubtext: "patients · visits · prescriptions · invoices · audit_log",
  },
];

function ParallaxImage({
  accent,
  label,
  subtext,
}: {
  accent: string;
  label: string;
  subtext: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.div
      ref={ref}
      variants={fadeSlideUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="relative"
    >
      <motion.div
        style={{ y }}
        className={`aspect-[4/3] w-full overflow-hidden rounded-3xl bg-gradient-to-br ${accent} p-px`}
      >
        <div className="flex h-full w-full flex-col justify-between rounded-[calc(1.5rem-1px)] bg-clinical-950 p-8">
          {/* Faux code window */}
          <div>
            <div className="mb-4 flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-success-500/60" />
            </div>
            <code className="text-sm font-medium text-white/80">{label}</code>
            <div className="mt-3 space-y-2">
              {subtext.split(" · ").map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-white/30" />
                  <span className="font-mono text-xs text-white/40">
                    {item}/
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Decorative grid */}
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="h-8 rounded-lg bg-white/[0.03]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.06 }}
                viewport={{ once: true }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ParallaxShowcase() {
  return (
    <section id="system-arch" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          variants={fadeSlideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20 text-center"
        >
          <span className="inline-block rounded-full border border-medical-200 bg-medical-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-medical-700 dark:border-medical-800 dark:bg-medical-950/40 dark:text-medical-400">
            System Architecture
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-clinical-900 sm:text-4xl md:text-5xl dark:text-white">
            Two layers.{" "}
            <span className="text-medical-600 dark:text-medical-400">
              Zero compromise.
            </span>
          </h2>
        </motion.div>

        {/* Alternating blocks */}
        <div className="space-y-32">
          {blocks.map((block, i) => {
            const reverse = i % 2 !== 0;
            return (
              <div
                key={block.badge}
                className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
                  reverse ? "lg:[direction:rtl]" : ""
                }`}
              >
                {/* Text */}
                <motion.div
                  variants={fadeSlideUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className="lg:[direction:ltr]"
                >
                  <span className="text-xs font-semibold uppercase tracking-widest text-medical-600 dark:text-medical-400">
                    {block.badge}
                  </span>

                  <h3 className="mt-3 whitespace-pre-line text-3xl font-bold leading-tight tracking-tight text-clinical-900 md:text-4xl dark:text-white">
                    {block.heading}
                  </h3>

                  <p className="mt-5 max-w-lg leading-relaxed text-clinical-500 dark:text-clinical-400">
                    {block.body}
                  </p>

                  <ul className="mt-8 space-y-3">
                    {block.bullets.map((b, j) => (
                      <motion.li
                        key={b.text}
                        variants={fadeSlideUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        custom={j}
                        className="flex items-center gap-3"
                      >
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-medical-600 text-white">
                          <b.icon size={16} />
                        </div>
                        <span className="text-sm font-medium text-clinical-700 dark:text-clinical-300">
                          {b.text}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Image */}
                <div className="lg:[direction:ltr]">
                  <ParallaxImage
                    accent={block.imageAccent}
                    label={block.imageLabel}
                    subtext={block.imageSubtext}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

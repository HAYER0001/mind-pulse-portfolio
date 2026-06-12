"use client";

import { motion } from "framer-motion";
import { Smartphone, Stethoscope, Hospital, ShieldCheck } from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const cards = [
  {
    audience: "Patients",
    title: "5-Step Intelligent Booking",
    description:
      "Self-register and book multi-modal appointments instantly.",
    icon: Smartphone,
    accent: "from-medical-500 to-cyan-400",
  },
  {
    audience: "Doctors",
    title: "Twin-Stream Smart Queue",
    description:
      "Manage remote and walk-in patients from a unified consultation workspace.",
    icon: Stethoscope,
    accent: "from-medical-500 to-blue-400",
  },
  {
    audience: "Hospitals",
    title: "Atomic Billing & Reception",
    description:
      "Automate invoicing, Aadhaar verification, and token assignments.",
    icon: Hospital,
    accent: "from-medical-500 to-indigo-400",
  },
  {
    audience: "Universal",
    title: "Digital E-File Vault",
    description:
      "Immutable, lifetime medical records accessible anywhere.",
    icon: ShieldCheck,
    accent: "from-medical-500 to-violet-400",
  },
];

export default function AudienceFeatures() {
  return (
    <section id="features" className="px-6 py-32">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0}
          className="mb-16 text-center"
        >
          <span className="inline-block rounded-full border border-medical-200 bg-medical-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-medical-700 dark:border-medical-800 dark:bg-medical-950/40 dark:text-medical-400">
            Built for Everyone
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-clinical-900 sm:text-4xl md:text-5xl dark:text-white">
            One platform.{" "}
            <span className="text-medical-600 dark:text-medical-400">
              Every stakeholder.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-clinical-500 dark:text-clinical-400">
            Purpose-built experiences for patients, clinicians, and
            administrators — all connected in real time.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              custom={i}
            >
              <SpotlightCard>
                {/* Audience label */}
                <span className="text-[11px] font-semibold uppercase tracking-widest text-medical-500 dark:text-medical-400">
                  {card.audience}
                </span>

                {/* Icon */}
                <div
                  className={`mt-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${card.accent} text-white shadow-lg shadow-medical-600/15`}
                >
                  <card.icon size={22} />
                </div>

                {/* Title */}
                <h3 className="mt-5 text-xl font-bold text-clinical-900 dark:text-white">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="mt-2 leading-relaxed text-clinical-500 dark:text-clinical-400">
                  {card.description}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

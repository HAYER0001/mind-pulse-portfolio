"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { Send, CheckCircle } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Glowing orb                                                       */
/* ------------------------------------------------------------------ */

function GlowOrb() {
  return (
    <div className="relative flex h-48 w-48 items-center justify-center sm:h-56 sm:w-56">
      {/* Outer pulse */}
      <motion.div
        className="absolute h-full w-full rounded-full bg-medical-500/10"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as const }}
      />
      {/* Mid ring */}
      <motion.div
        className="absolute h-3/4 w-3/4 rounded-full bg-medical-400/15 blur-xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" as const }}
      />
      {/* Core */}
      <div className="relative h-1/2 w-1/2 rounded-full bg-gradient-to-br from-medical-400 to-cyan-400 shadow-[0_0_60px_20px_rgba(59,130,246,0.3)]" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating-label input                                              */
/* ------------------------------------------------------------------ */

function FloatingInput({
  label,
  type = "text",
  name,
}: {
  label: string;
  type?: string;
  name: string;
}) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const active = focused || value.length > 0;

  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="peer w-full rounded-xl border border-white/10 bg-white/5 px-4 pt-5 pb-2 text-sm text-white outline-none transition-all placeholder:text-transparent focus:border-medical-500/50 focus:ring-2 focus:ring-medical-500/30"
        placeholder={label}
      />
      <label
        className={`pointer-events-none absolute left-4 transition-all duration-200 ${
          active
            ? "top-1.5 text-[10px] font-semibold text-medical-400"
            : "top-3.5 text-sm text-clinical-500"
        }`}
      >
        {label}
      </label>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating-label select                                             */
/* ------------------------------------------------------------------ */

function FloatingSelect() {
  const [value, setValue] = useState("");

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 pt-5 pb-2 text-sm text-white outline-none transition-all focus:border-medical-500/50 focus:ring-2 focus:ring-medical-500/30"
      >
        <option value="" disabled className="bg-clinical-900">
          Select...
        </option>
        <option value="doctor" className="bg-clinical-900">
          Doctor
        </option>
        <option value="admin" className="bg-clinical-900">
          Hospital Administrator
        </option>
        <option value="patient" className="bg-clinical-900">
          Patient
        </option>
      </select>
      <label
        className={`pointer-events-none absolute left-4 transition-all duration-200 ${
          value
            ? "top-1.5 text-[10px] font-semibold text-medical-400"
            : "top-1.5 text-[10px] font-semibold text-medical-400"
        }`}
      >
        I am a...
      </label>
      {/* Chevron */}
      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-clinical-500">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Magnetic submit button                                            */
/* ------------------------------------------------------------------ */

const springConfig = { stiffness: 250, damping: 18, mass: 0.5 };

function SubmitButton() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const [submitted, setSubmitted] = useState(false);

  const bgPos = useMotionValue(0);
  const bgPosSpring = useSpring(bgPos, { stiffness: 100, damping: 20 });
  const bgGradient = useMotionTemplate`linear-gradient(${bgPosSpring}deg, #2563eb, #06b6d4, #2563eb)`;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.15);
    y.set(dy * 0.15);
    bgPos.set(((e.clientX - rect.left) / rect.width) * 360);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  function handleClick() {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block w-full"
    >
      <motion.button
        type="button"
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-medical-600/25 transition-shadow hover:shadow-medical-500/40"
        style={{ background: submitted ? undefined : (bgGradient as unknown as string) }}
        disabled={submitted}
      >
        {submitted ? (
          <>
            <CheckCircle size={16} />
            Demo Requested
          </>
        ) : (
          <>
            <Send size={16} />
            Request Demo
          </>
        )}
      </motion.button>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                           */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function ContactForm() {
  return (
    <section id="contact" className="px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0}
          className="overflow-hidden rounded-3xl border border-white/10 bg-clinical-950 shadow-2xl shadow-medical-950/20"
        >
          <div className="grid lg:grid-cols-2">
            {/* Left — Hook */}
            <div className="flex flex-col items-center justify-center gap-8 px-8 py-16 text-center lg:px-12">
              <GlowOrb />

              <div>
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Transform Your{" "}
                  <span className="bg-gradient-to-r from-medical-400 to-cyan-400 bg-clip-text text-transparent">
                    Clinical Workflow
                  </span>
                </h2>
                <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-clinical-400">
                  Request a personalized demo of the MindPulse ecosystem —
                  tailored to your hospital&apos;s scale and specialty.
                </p>
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap justify-center gap-3">
                {["HIPAA Ready", "Multi-Tenant", "Zero Downtime"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-clinical-400"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Right — Form */}
            <div className="border-t border-white/10 px-8 py-12 lg:border-t-0 lg:border-l lg:px-12">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={1}
              >
                <h3 className="text-lg font-semibold text-white">
                  Get Started
                </h3>
                <p className="mt-1 text-sm text-clinical-500">
                  Fill in your details and we&apos;ll reach out within 24 hours.
                </p>
              </motion.div>

              <form
                className="mt-8 space-y-5"
                onSubmit={(e) => e.preventDefault()}
              >
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={2}
                >
                  <FloatingInput label="Full Name" name="name" />
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={3}
                >
                  <FloatingInput
                    label="Clinic / Hospital Name"
                    name="hospital"
                  />
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={4}
                >
                  <FloatingInput
                    label="Work Email"
                    type="email"
                    name="email"
                  />
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={5}
                >
                  <FloatingSelect />
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={6}
                  className="pt-2"
                >
                  <SubmitButton />
                </motion.div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

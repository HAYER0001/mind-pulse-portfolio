"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  type HTMLMotionProps,
} from "framer-motion";

type ButtonVariant = "primary" | "outline";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "style"> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-medical-600 text-white shadow-md shadow-medical-600/20 hover:bg-medical-700",
  outline:
    "border border-medical-300 text-medical-700 hover:bg-medical-50 hover:border-medical-400 dark:border-clinical-600 dark:text-medical-400 dark:hover:bg-clinical-800 dark:hover:border-medical-500",
};

const springConfig = { stiffness: 250, damping: 18, mass: 0.5 };

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.15);
    y.set(dy * 0.15);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className={`inline-flex cursor-pointer items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold tracking-wide transition-colors ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {children}
      </motion.button>
    </motion.div>
  );
}

"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

type ButtonVariant = "primary" | "outline";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-medical-600 text-white shadow-md shadow-medical-600/20 hover:bg-medical-700",
  outline:
    "border border-medical-300 text-medical-700 hover:bg-medical-50 hover:border-medical-400 dark:border-clinical-600 dark:text-medical-400 dark:hover:bg-clinical-800 dark:hover:border-medical-500",
};

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(37, 99, 235, 0.25)" }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`inline-flex cursor-pointer items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold tracking-wide transition-colors ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}

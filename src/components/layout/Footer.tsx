import { Activity } from "lucide-react";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="rounded-b-[2.5rem] border-t border-clinical-200 bg-white dark:border-clinical-800 dark:bg-clinical-950">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-medical-600 text-white">
              <Activity size={18} />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-clinical-900 dark:text-white">
                MindPulse
              </span>
              <span className="text-xs font-semibold tracking-wider text-medical-600 dark:text-medical-400">
                HIMS
              </span>
            </div>
          </div>

          {/* Mission */}
          <p className="max-w-lg text-sm leading-relaxed text-clinical-500 dark:text-clinical-400">
            A comprehensive, multi-tenant hospital management and clinical
            ecosystem — streamlining patient care, clinical operations, and
            administrative workflows for healthcare institutions of every scale.
          </p>

          {/* Stack */}
          <div className="flex flex-wrap justify-center gap-2">
            {["Flutter", "Firebase", "HIPAA Compliant", "Multi-Tenant"].map(
              (tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-clinical-200 bg-clinical-50 px-3 py-1 text-xs font-medium text-clinical-600 dark:border-clinical-700 dark:bg-clinical-800 dark:text-clinical-400"
                >
                  {tag}
                </span>
              )
            )}
          </div>

          {/* Divider + copyright */}
          <div className="h-px w-full max-w-xs bg-clinical-200 dark:bg-clinical-800" />

          <p className="text-xs text-clinical-400 dark:text-clinical-500">
            &copy; {currentYear} Hayer Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

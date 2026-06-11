interface SectionBadgeProps {
  label: string;
}

export default function SectionBadge({ label }: SectionBadgeProps) {
  return (
    <span className="inline-block rounded-full border border-medical-200 bg-medical-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-medical-700 dark:border-medical-800 dark:bg-medical-950/40 dark:text-medical-400">
      {label}
    </span>
  );
}

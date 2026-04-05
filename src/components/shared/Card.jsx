export function Card({ children, className = '', padding = true, hover = false }) {
  return (
    <div
      className={[
        'rounded-2xl border border-slate-200/80 bg-white shadow-card transition-shadow duration-200',
        'dark:border-slate-700/80 dark:bg-slate-800/80',
        hover && 'hover:shadow-card-hover',
        padding && 'p-5 sm:p-6',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}

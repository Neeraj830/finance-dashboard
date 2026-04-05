export function Table({ children, className = '' }) {
  return (
    <div
      className={[
        'overflow-x-auto rounded-xl border border-slate-200/80 dark:border-slate-700/80',
        className,
      ].join(' ')}
    >
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">{children}</table>
    </div>
  );
}

export function Th({ children, className = '', ...rest }) {
  return (
    <th
      className={[
        'border-b border-slate-200 bg-slate-50/90 px-4 py-3 font-semibold text-slate-700',
        'dark:border-slate-700 dark:bg-slate-800/90 dark:text-slate-200',
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </th>
  );
}

export function Td({ children, className = '', ...rest }) {
  return (
    <td
      className={[
        'border-b border-slate-100 px-4 py-3 text-slate-700 dark:border-slate-700/80 dark:text-slate-300',
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </td>
  );
}

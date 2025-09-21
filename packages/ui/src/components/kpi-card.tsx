import * as React from 'react';

type KpiCardProps = {
  label: string;
  value: string;
  trend?: {
    label: string;
    direction: 'up' | 'down' | 'flat';
  };
};

export const KpiCard: React.FC<KpiCardProps> = ({ label, value, trend }) => {
  const indicator = {
    up: 'text-emerald-500',
    down: 'text-rose-500',
    flat: 'text-slate-500',
  } as const;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">{value}</p>
      {trend ? (
        <p className={`mt-2 text-sm font-medium ${indicator[trend.direction]}`}>
          {trend.label}
        </p>
      ) : null}
    </div>
  );
};

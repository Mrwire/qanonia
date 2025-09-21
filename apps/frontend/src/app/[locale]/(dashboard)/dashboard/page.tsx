import { KpiCard } from '@qanounia/ui';
import { getTranslations } from 'next-intl/server';

const kpis = [
  {
    key: 'openCases',
    value: '12',
    trend: {
      label: '+8% vs. mois dernier',
      direction: 'up' as const,
    },
  },
  {
    key: 'pendingSignature',
    value: '5',
    trend: {
      label: '-2% vs. semaine dernière',
      direction: 'down' as const,
    },
  },
  {
    key: 'overdue',
    value: '3',
    trend: {
      label: 'Stable',
      direction: 'flat' as const,
    },
  },
];

export default async function DashboardPage() {
  const t = await getTranslations('kpi');
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 p-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Qanounia</h1>
        <p className="text-slate-500 dark:text-slate-400">
          Pilotage des dossiers, signatures et facturations en temps réel.
        </p>
      </header>
      <section className="grid gap-4 md:grid-cols-3">
        {kpis.map((kpi) => (
          <KpiCard
            key={kpi.key}
            label={t(kpi.key as 'openCases' | 'pendingSignature' | 'overdue')}
            value={kpi.value}
            trend={kpi.trend}
          />
        ))}
      </section>
    </main>
  );
}

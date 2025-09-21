import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function IndexPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations('app');
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary to-primary/80 p-6 text-primary-foreground">
      <div className="max-w-xl space-y-4 text-center">
        <h1 className="text-4xl font-bold sm:text-5xl">{t('title')}</h1>
        <p className="text-lg text-primary-foreground/80">{t('subtitle')}</p>
        <Link
          href={`/${params.locale}/dashboard`}
          className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-primary shadow-lg transition hover:bg-slate-100"
        >
          Accéder au tableau de bord
        </Link>
      </div>
    </div>
  );
}

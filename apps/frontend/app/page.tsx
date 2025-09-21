import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-8 text-center">
      <div className="max-w-xl space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-900/70">Qanounia Platform</p>
        <h1 className="text-4xl font-semibold text-blue-950">Infrastructure ready for legal & accounting operations</h1>
        <p className="text-base text-blue-900/80">
          Cette base Next.js servira l’interface client : authentification, dashboard, dossiers, workflows. Les pages seront
          connectées au backend NestJS et bénéficieront d’une internationalisation FR/AR complète.
        </p>
      </div>
      <div className="flex gap-4">
        <Link className="rounded-full bg-blue-900 px-6 py-3 text-white shadow-md" href="/sign-in">
          Accéder à la plateforme
        </Link>
        <Link className="rounded-full border border-blue-900 px-6 py-3 text-blue-900" href="/docs">
          Documentation
        </Link>
      </div>
    </main>
  );
}

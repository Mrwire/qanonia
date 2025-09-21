# Qanounia Platform

Qanounia est une plateforme SaaS modulaire destinée aux cabinets juridiques et comptables de la région MENA. Elle fournit des services de gestion de dossiers, génération documentaire, signature électronique, facturation et analytique avec une conformité stricte aux exigences locales (loi 53-05) et européennes (eIDAS-ready).

## 🚀 Monorepo

Ce dépôt utilise **pnpm workspaces** et **Turborepo** pour orchestrer les applications et packages partagés.

```
.
├── apps/
│   ├── backend/   # API NestJS (REST v1)
│   └── frontend/  # Next.js 14 App Router
├── packages/
│   ├── ui/        # Design system shadcn étendu
│   └── config/    # Configuration partagée (schemas, zod)
├── infra/         # Docker Compose, Helm chart, manifests
├── docs/          # ADR, OpenAPI, guides
└── scripts/       # Seeds, migrations, smoke tests
```

## 📦 Installation

```bash
pnpm install
```

## 🧪 Scripts racine

| Script | Description |
| --- | --- |
| `pnpm dev` | Lance les services en mode développement (`turbo run dev`). |
| `pnpm build` | Build toutes les cibles. |
| `pnpm lint` | Lint complet. |
| `pnpm test` | Tests unitaires / intégration. |
| `pnpm typecheck` | Vérification TypeScript. |
| `pnpm migrate:dev` | Prisma migrations (backend). |

## 📚 Documentation

- [`docs/adr`](./docs/adr) : Architecture Decision Records.
- [`docs/openapi/openapi.yaml`](./docs/openapi/openapi.yaml) : Contrats REST v1.
- [`docs/runbooks`](./docs/runbooks) : Opérations (migrations, rollback, monitoring).

## 🛡️ Principes clés

- **Sécurité** : OWASP ASVS intermédiaire, RBAC, audit trail exhaustif.
- **Internationalisation** : UI FR/AR avec RTL complet, backend multi-langue.
- **Observabilité** : logs JSON (pino), traces OpenTelemetry, métriques Prometheus.
- **Performance** : API P95 < 300ms (hors tâches asynchrones).

## 🧭 Roadmap agents

1. **AGENT_ARCHI** – scaffolding monorepo, ADR, CI/CD.
2. **AGENT_BACKEND** – Auth, Users, Cases, Docgen endpoints.
3. **AGENT_FRONTEND** – Pages Auth, Dashboard, Cases.
4. **AGENT_DOCGEN** – moteur de rendu PDF/DOCX.
5. **AGENT_ESIGN** – intégration provider-agnostique, webhooks.
6. **AGENT_BILLING** – factures, paiements mock.
7. **AGENT_WORKFLOWS** – moteur d’états, SLA, notifications.
8. **AGENT_QA** – couverture 80%, smoke tests, pipeline vert.

## 🤝 Contribution

Les contributions suivent un flux PR contrôlé. Merci de conserver une couverture de test ≥ 80%, un lint sans avertissement et une documentation à jour.

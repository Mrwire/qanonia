# Qanounia Platform Monorepo

Qanounia est une plateforme SaaS destinée aux cabinets juridiques et comptables du Maroc/MENA. Elle centralise la gestion des dossiers, documents, signatures électroniques, archivage probatoire et facturation.

## 🎯 Objectifs clés

- Architecture modulaire : backend NestJS, frontend Next.js, packages partagés.
- Conformité : loi 53-05, eIDAS-ready, auditabilité complète.
- Internationalisation : français et arabe (RTL) dès la base.

## 🗂️ Structure du dépôt

```
├── apps/
│   ├── backend/          # API NestJS (services REST, Prisma, observabilité)
│   └── frontend/         # Application Next.js 14 (App Router, i18n, Tailwind)
├── packages/
│   ├── ui/               # Design system shadcn/ui enrichi
│   └── utils/            # Utilitaires partagés (validation, formats)
├── docs/                 # ADR, OpenAPI, runbooks, checklists
├── infra/                # Docker Compose dev, chart Helm minimal, Dockerfiles
├── scripts/              # Seeds, automatisation (en cours)
└── .github/workflows/    # Pipelines CI/CD
```

## ⚙️ Prérequis

- Node.js 20+
- pnpm 9+
- Docker (pour l'orchestration locale)

## 🚀 Démarrage rapide

```bash
pnpm install
pnpm dev                  # lance backend + frontend (turbo)
```

Pour utiliser Docker Compose (PostgreSQL, Redis, MinIO, backend, frontend) :

```bash
cd infra
docker compose -f docker-compose.dev.yml up --build
```

## 🧱 Backend

- Framework : NestJS 10, TypeScript strict, validation Zod.
- ORM : Prisma + PostgreSQL 16 (`apps/backend/prisma/schema.prisma`).
- Observabilité : pino (logs JSON), Terminus (health), OTel (à venir).
- Scripts utiles :
  - `pnpm --filter backend start:dev`
  - `pnpm --filter backend test`
  - `pnpm --filter backend migrate:dev`

## 💻 Frontend

- Next.js 14 (App Router), React 18.
- Styling : TailwindCSS + design tokens `@qanounia/ui`.
- i18n : next-intl (FR/AR), prise en charge RTL.
- Gestion d'état : React Query, Zustand.

## 🧩 Packages partagés

- `@qanounia/ui` : tokens de thème et composants réutilisables.
- `@qanounia/utils` : helpers de validation (ISO date, etc.).

## 🧪 Qualité

- Lint : `pnpm lint`
- Tests unitaires : `pnpm test`
- Typecheck : `pnpm typecheck`
- Couverture : `pnpm test:coverage`

## 📄 Documentation

- ADR (`docs/architecture-decisions/`) : décisions structurantes.
- OpenAPI (`docs/openapi/openapi.yaml`) : contrat REST initial.
- Runbooks (`docs/runbooks/operations.md`) : opérations/migrations.
- Checklists (`docs/checklists/security.md`) : sécurité & conformité.

## ☁️ Déploiement

- Dockerfiles dédiés : `infra/dockerfiles/backend.Dockerfile`, `infra/dockerfiles/frontend.Dockerfile`.
- Chart Helm minimal (`infra/helm/qanounia`) pour K8s : backend + frontend, secrets basiques.
- Variables d'env (exemple) : `apps/backend/.env.example`.

## 🔐 Conformité & Sécurité

- Hashage des mots de passe : Argon2/bcrypt (implémentation future).
- Audit log exhaustif, RBAC par organisation.
- Stockage chiffré (MinIO/S3 SSE) et journaux immutables (roadmap).

## 📈 Roadmap prochaine itération

1. Implémenter l’authentification (JWT + OAuth).
2. Exposer POST `/v1/cases` avec Prisma + AuditLog.
3. Mettre en place la base UI (shadcn) et pages Auth/Dashboard.

Pour plus de détails, consultez les ADR et la documentation.

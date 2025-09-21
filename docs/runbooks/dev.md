# Runbook – Environnements de développement

## Pré-requis
- Node.js 20
- pnpm 9+
- Docker (pour Postgres, Redis, MinIO)

## Étapes
1. Copier `.env.example` des apps et ajuster les secrets.
2. Lancer `docker compose -f infra/docker-compose.dev.yml up -d`.
3. Exécuter `pnpm install` puis `pnpm dev`.
4. Pour les migrations : `pnpm migrate:dev`.
5. Pour les tests : `pnpm test` (backend + frontend).

## Restauration des données
- `pnpm --filter backend prisma db seed` (script à venir) pour injecter des données de démonstration.
- Nettoyage : `docker compose -f infra/docker-compose.dev.yml down -v`.

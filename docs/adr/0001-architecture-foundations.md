# ADR 0001 – Architecture Foundations

## Status
Accepted

## Context

Qanounia doit offrir un socle robuste pour des services juridiques/comptables critiques. Nous devons garantir une architecture modulaire, une séparation claire des responsabilités et des pipelines CI/CD reproductibles.

## Decision

1. **NestJS + Prisma pour le backend** : fournit un cadre structuré, TypeScript first, adapté aux micro-modules (auth, cases, billing) et intègre facilement la validation (zod) et Prisma pour la persistance.
2. **Next.js 14 App Router pour le frontend** : App Router offre le streaming, le rendu serveur + client hybride ainsi qu'une intégration directe avec next-intl pour la prise en charge FR/AR.
3. **Monorepo pnpm + Turborepo** : permet le partage de packages (ui, config), la mutualisation des scripts et une exécution parallélisée des tests/lints.

## Consequences

- Les modules backend doivent exposer leurs contrats via OpenAPI et suivre une convention `/v1/...`.
- Les applications utilisent des packages internes (config/ui) pour éviter la duplication et garantir une cohérence design & validation.
- Les pipelines CI devront installer pnpm, exécuter lint/test/build pour backend et frontend.

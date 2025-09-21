# ADR 0001 — Monorepo structure with pnpm and Turborepo

- Status: Accepted
- Date: 2024-07-07

## Context

Qanounia comprises multiple services (backend APIs, frontend, shared UI/system packages, infrastructure). Coordinated delivery and shared tooling are essential for maintaining consistency across teams.

## Decision

We adopt a pnpm-based monorepo orchestrated by Turborepo. Applications live under `apps/` (Next.js frontend, NestJS backend) while reusable code resides in `packages/`. Infrastructure-as-code and operational scripts are stored under `infra/` and `scripts/` respectively.

## Consequences

- Shared dependencies are hoisted efficiently which keeps install times manageable.
- Turborepo pipelines allow incremental builds, caching, and parallel execution for CI.
- Requires developers to use pnpm and understand workspace constraints.

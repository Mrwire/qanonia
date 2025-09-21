# ADR 0003 — PostgreSQL with Prisma ORM

- Status: Accepted
- Date: 2024-07-07

## Context

Qanounia handles structured legal, billing, and audit data requiring ACID guarantees, relational integrity, and advanced JSON querying. Multi-tenancy per organization and audit logging demand transactional consistency.

## Decision

We standardize on PostgreSQL 16 paired with Prisma ORM. Prisma's schema-first workflow provides type-safe queries, migration management, and developer productivity, while PostgreSQL satisfies regulatory requirements and supports complex reporting.

## Consequences

- Enables advanced data modeling (JSONB, arrays) and future analytical extensions (materialized views).
- Prisma schema serves as a single source of truth for services and generates typed clients.
- Requires managing Prisma migrations within CI/CD and ensuring compatibility with PostgreSQL-specific features.

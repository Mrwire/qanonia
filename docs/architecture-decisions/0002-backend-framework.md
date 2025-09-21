# ADR 0002 — NestJS for the backend service layer

- Status: Accepted
- Date: 2024-07-07

## Context

The backend must expose modular REST APIs, integrate with queues, support structured logging, enforce validation, and remain maintainable by a multi-team organization.

## Decision

We selected NestJS 10 with TypeScript strict mode as the foundation for all backend services. Nest provides modular architecture, dependency injection, and first-class support for validation, OpenAPI generation, and testing.

## Consequences

- Developers can leverage Nest modules to encapsulate bounded contexts (`auth`, `cases`, etc.).
- Built-in CLI accelerates scaffolding and supports consistent code generation.
- Requires familiarity with Nest's abstractions (providers, decorators) and initial learning curve for contributors migrating from Express.

# Operations Runbook

## Environment variables

Copy `apps/backend/.env.example` to `.env` in the backend directory and adjust secrets for the deployment target. Key variables include:

- `DATABASE_URL` — PostgreSQL connection string.
- `REDIS_URL` — Redis instance used for queues and caching.
- `S3_*` — MinIO/S3 credentials for document storage.
- `JWT_SECRET` / `JWT_REFRESH_SECRET` — Signing secrets for access and refresh tokens.

## Database migrations

```bash
pnpm install
pnpm --filter backend generate
pnpm --filter backend migrate:dev
```

For production/staging environments run `pnpm --filter backend migrate:deploy` during deployments.

## Seed data

Use the `scripts/seed.ts` command (see `scripts/README.md`) to populate baseline organizations, users, and demo cases.

## Health checks

- `GET /v1/health/live` — container liveness.
- `GET /v1/health/ready` — readiness including dependent services.

## Logs and monitoring

- Structured JSON logs emitted via pino. Use `REQUEST_ID` correlation in log aggregators.
- OpenTelemetry exporters will be configured in future iterations; placeholders are in the backend configuration module.

## Backups

- PostgreSQL: schedule daily logical backups (pg_dump) with 7-day retention.
- Object storage: enable bucket versioning and server-side encryption.

## Incident response

1. Acknowledge alerts via the monitoring system.
2. Check recent deployments for regressions.
3. Review logs and metrics (latency, error rate).
4. If necessary, roll back using Helm (`helm rollback qanounia <revision>`).
5. Document the incident in the shared postmortem template.

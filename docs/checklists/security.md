# Security & Compliance Checklist

- [ ] Environment variables managed through secrets manager (Vault/KMS) — no plaintext secrets in Git.
- [ ] JWT signing keys rotated every 180 days.
- [ ] Password hashing uses Argon2id or bcrypt cost >= 12.
- [ ] MFA enforcement configurable at organization level.
- [ ] Audit log captures CRUD, authentication, signature events with immutable storage.
- [ ] Dependency scanning (npm audit, Trivy) executed on every CI run.
- [ ] Containers run as non-root users; file system mounted read-only where possible.
- [ ] Rate limiting enabled per IP and per token on sensitive endpoints.
- [ ] CSRF protection enabled for cookie-based authentication flows.
- [ ] Data retention policies configured for archive module (legal compliance with law 53-05).

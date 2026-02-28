# Production Readiness Checklist

## What is fixed in this update

- CI no longer fails on lockfile drift by using `npm install` in GitHub Actions (instead of `npm ci`).
- Added explicit `typecheck` step in CI.
- Added Node and npm metadata (`engines`, `packageManager`) in `package.json` for consistent tooling.
- Added `.env.example` with expected runtime variables.
- Added a Dockerfile and `.dockerignore` for containerized deployment.
- Added `/api/health` endpoint for uptime checks and load-balancer probes.

## What still needs to be implemented for full production readiness

1. AuthN/AuthZ and per-match access controls.
2. Persistent Postgres schemas for matches, players, and ratings.
3. Redis-backed realtime fanout and queue-backed async workers.
4. True streaming voice pipeline (capture, STT, LLM orchestration, TTS).
5. Observability stack: traces, logs, metrics, and alerts.
6. Secrets management and automated key rotation.

## Deployment baseline

- Build image:
  - `docker build -t echoclash-dashboard ./mistral-dashboard`
- Run image:
  - `docker run --env-file .env -p 3000:3000 echoclash-dashboard`
- Health check:
  - `curl http://localhost:3000/api/health`

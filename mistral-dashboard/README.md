# EchoClash Dashboard (Next.js)

This is the web client for EchoClash.

## Quick Start

```bash
cp .env.example .env.local
npm install
npm run dev
```

## Scripts

- `npm run dev` – local dev server
- `npm run typecheck` – TypeScript checks
- `npm run lint` – ESLint checks
- `npm run build` – production build
- `npm run start` – run production server

## Health Endpoint

- `GET /api/health` returns service health JSON.

## Deployment

A container baseline is provided:

```bash
docker build -t echoclash-dashboard .
docker run --env-file .env -p 3000:3000 echoclash-dashboard
```

For architecture and production roadmap details see:

- `docs/architecture-audit.md`
- `docs/production-readiness.md`

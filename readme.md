# EchoClash

<p align="left">
  <img src="https://img.shields.io/badge/Mistral_AI-FF7000?style=for-the-badge&logo=mistral&logoColor=white" alt="Mistral AI" />
  <img src="https://img.shields.io/badge/ElevenLabs-000000?style=for-the-badge&logo=elevenlabs&logoColor=white" alt="ElevenLabs" />
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
</p>

Voice-controlled AI battle arena prototype (Next.js frontend) with a production-readiness roadmap for realtime voice gameplay.

## Project Structure

- `mistral-dashboard/` – Next.js app, UI, routes, components.
- `.github/workflows/` – CI workflow.
- `mistral-dashboard/docs/architecture-audit.md` – architecture analysis and prioritized actions.
- `mistral-dashboard/docs/production-readiness.md` – what is fixed now vs what remains.

## Setup

```bash
cd mistral-dashboard
cp .env.example .env.local
npm install
npm run dev
```

## Current Status

- ✅ Core UI routes available (`/`, `/play`, `/leaderboard`, `/profile`, `/demo`).
- ✅ Security headers configured in Next.js.
- ✅ Baseline CI checks (install, typecheck, lint, build).
- ⚠️ Realtime voice ingestion/orchestration and persistent backend are not yet implemented.

## Production Readiness Docs

- Architecture audit + prioritized P0/P1/P2 actions:
  - `mistral-dashboard/docs/architecture-audit.md`
- Production checklist and deployment baseline:
  - `mistral-dashboard/docs/production-readiness.md`

## Hackathon Context

Built for the **Mistral Worldwide Hackathon** with focus on voice gameplay and adaptive AI combat loops.

# EchoClash Architecture and Production Readiness Audit

## Current structure and architecture

- **App shell**: Next.js App Router with route-driven UI in `app/`.
- **Presentation layer only**: current implementation is mostly static UI with client-only state transitions in `app/play/[gameId]/page.tsx` and `src/components/VoiceButton.tsx`.
- **No backend API boundary yet**: no route handlers, server actions, queues, or persistent data store.
- **No runtime integration with Mistral/Voxtral/ElevenLabs**: references are present in text, but there are no provider SDK calls.

## Key issues found

1. Routes linked from the home page (`/leaderboard`, `/profile`, `/demo`) were missing.
2. Leaderboard is not persisted and had no source-of-truth data model.
3. Voice flow is simulated with `setTimeout`, not microphone capture + transcription + model orchestration.
4. Security posture was default-only (no hardened HTTP headers).
5. CI/CD automation was absent.

## Scalability, performance, and security improvements

### Scalability / performance

- Split architecture into:
  - **Realtime gateway** (WebSocket/SSE) for turn streams.
  - **Orchestrator workers** for STT → LLM → TTS pipelines.
  - **Game state service** with event-sourced turn logs.
- Add caching for static metadata and read-heavy leaderboard endpoints.
- Stream partial responses (token streaming and low-latency TTS chunking) instead of waiting for full model completion.
- Apply edge caching for static pages and APIs safe for public caching.

### Security

- Enforce strict API key isolation in server-only env vars.
- Add authN/authZ with signed session tokens and per-match authorization checks.
- Add abuse controls: per-IP and per-user rate limits for voice upload and model invocation endpoints.
- Store and rotate provider secrets via a secret manager.
- Add webhook/request signature verification for external callbacks.

## Voice processing review and recommendations

- Current `VoiceButton` correctly models UX states but does not record audio.
- Recommended production voice pipeline:
  1. Browser microphone capture (`MediaRecorder`/WebRTC).
  2. Chunked upload over WebSocket.
  3. Voxtral streaming STT with partial transcripts.
  4. Turn parser + action validator.
  5. Mistral NPC inference with memory context.
  6. ElevenLabs streaming TTS response.
  7. Client receives synchronized transcript + audio + state deltas.

## Backend improvements for real-time streaming

- Prefer **WebSocket** for bidirectional voice chunks and turn events.
- Use **Redis pub/sub or NATS** for fan-out from workers to active game clients.
- Implement per-match message ordering with sequence IDs.
- Add idempotency keys for retried turn submissions.
- Persist every turn event to durable storage before broadcasting completion.

## AI model integration pattern recommendations

- Introduce a provider abstraction layer:
  - `SpeechToTextProvider`
  - `NpcReasoningProvider`
  - `TextToSpeechProvider`
- Keep prompt templates versioned and testable.
- Add guardrails (structured outputs, schema validation, profanity/safety filters).
- Track token/audio usage and latency by provider + model.

## State management for adaptive NPCs

- Store NPC state as a deterministic state machine per match:
  - temperament
  - memory vector references
  - cooldowns
  - last actions
- Use event sourcing for replay/debugging (`turn_started`, `stt_partial`, `action_resolved`, `tts_sent`).
- In frontend, use a dedicated store (Zustand or Redux Toolkit) for turn state + stream events.

## Leaderboard persistence recommendations

- Move leaderboard to Postgres with schema:
  - `players`
  - `matches`
  - `match_events`
  - `ratings`
- Update ELO asynchronously from match end events.
- Cache top-N leaderboard in Redis with TTL + write-through invalidation.
- Add anti-cheat validation (server-authoritative outcomes only).

## Missing DevOps / CI/CD practices

- Add GitHub Actions checks: install, lint, build, test.
- Add preview deployments per PR (Vercel or equivalent).
- Add environment-specific configs (dev/staging/prod).
- Add observability stack: OpenTelemetry traces, structured logs, metrics dashboards.
- Add SLO alerts for latency/error rates and provider failures.

## Production-ready deployment strategy

- **Frontend**: Next.js on Vercel or containerized Node runtime.
- **Realtime and workers**: separate autoscaled services on Fly.io/Render/Kubernetes.
- **Data**: managed Postgres + Redis.
- **Queue**: managed queue (Upstash QStash, NATS JetStream, or RabbitMQ).
- **Secrets**: cloud secret manager + rotation policy.
- **Release strategy**: blue/green or canary with feature flags for model rollouts.

## Prioritized actionable improvements

### P0 (immediate)

1. Implement server-only API routes for voice turn ingestion.
2. Introduce persistent storage for matches and leaderboard.
3. Add auth and authorization checks for match participation.
4. Add rate limiting for STT/TTS/model endpoints.
5. Add tracing/logging for full voice turn lifecycle.

### P1 (next)

1. Add WebSocket realtime gateway and stream partial transcripts.
2. Replace simulated voice state transitions with real microphone streaming.
3. Add provider abstraction and fallback model logic.
4. Add deterministic NPC state machine + event log persistence.

### P2 (later)

1. Build offline replay mode from event logs.
2. Add automated load testing for concurrent matches.
3. Add model quality evaluation harness (NPC consistency, command accuracy).
4. Add cost controls and budget alerts per provider.

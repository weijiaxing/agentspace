# Agent Space

A 3D interface for AI agents.

Agent Space is a spatial interface for AI assistants. Instead of living inside a chat box, agents exist in an interactive 3D environment where you can see them, talk to them, and eventually coordinate multiple agents in one place.

## MVP

This version includes:

- One 3D room
- One assistant avatar (Andy)
- A chat panel
- Agent state display: idle / thinking / replying
- A backend abstraction that supports `mock` mode and `openai-compatible` mode
- GLB model support with placeholder fallback

## Stack

- Next.js
- React
- TypeScript
- Three.js
- react-three-fiber
- @react-three/drei

## Run locally

```bash
cp .env.example .env.local
npm install
npm run dev
```

Then open http://localhost:3000

## Backend modes

### 1. Mock mode

Default mode for fast UI iteration:

```env
AGENT_BACKEND_MODE=mock
```

### 2. OpenAI-compatible mode

You can connect Agent Space to any OpenAI-compatible backend:

```env
AGENT_BACKEND_MODE=openai-compatible
AGENT_BACKEND_BASE_URL=https://api.openai.com/v1
AGENT_BACKEND_API_KEY=your_api_key_here
AGENT_BACKEND_MODEL=gpt-4o-mini
```

This can later be replaced with a dedicated OpenClaw bridge or any custom agent service.

## 3D model

To replace the placeholder avatar with a real model, add:

```bash
public/models/andy.glb
```

Behavior:
- If the model exists and loads, Agent Space renders the GLB avatar.
- If not, it falls back to the built-in placeholder avatar.

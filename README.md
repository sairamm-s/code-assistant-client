# DevDoc AI — Client

React + Vite + TypeScript single-page app for DevDoc AI: upload or link a codebase, watch it get indexed, and chat with it with source citations.

See [`SUBMISSION.md`](./SUBMISSION.md) for architecture and product decisions. See [`CLAUDE.md`](./CLAUDE.md) for the full project map (screens, components, models, Redux slices).

## Prerequisites

- Node.js 20+
- The [server](../server) running locally (or reachable at whatever URL you configure below)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy the env file:
   ```bash
   cp .env.example .env
   ```
   `VITE_API_URL` should point at the server's `/api/v1` base — default `http://localhost:5050/api/v1`.

## Running

```bash
npm run dev
```

Visit `http://localhost:5173`.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server with HMR |
| `npm run build` | Type-check (`tsc -b`) and production build |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint |

## Notes

- The app has 4 screens: landing (with a recent-repositories list), ingest (GitHub URL or ZIP upload), indexing status, and chat. Repository Dashboard, API Explorer, and Dependency Explorer were designed but deferred — see `SUBMISSION.md` section h.
- All state shown is real backend data — no invented/mocked statistics.

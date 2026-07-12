# Kiwiforms

A Turborepo monorepo with a NestJS backend, React frontend, and shared TypeScript types.

## Structure

```
kiwiforms/
├── apps/
│   ├── api/          # NestJS backend (port 3000)
│   └── web/          # React + Vite frontend (port 5173)
├── packages/
│   └── types/        # Shared TypeScript types (@kiwiforms/types)
├── turbo.json
└── package.json
```

## Prerequisites

- Node.js 18+
- npm 9+

## Getting Started

```bash
# Install dependencies
npm install

# Build all packages (types must build before apps)
npm run build

# Start all apps in dev mode
npm run dev
```

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:3000

The frontend proxies `/api/*` requests to the backend via Vite.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start all apps in watch mode |
| `npm run build` | Build all packages and apps |
| `npm run lint` | Type-check all packages |
| `npm run clean` | Remove build artifacts |

## Shared Types

Add types to `packages/types/src/index.ts`. Both `@kiwiforms/api` and `@kiwiforms/web` import from `@kiwiforms/types`:

```ts
import type { User, ApiResponse } from '@kiwiforms/types';
```

After changing types, rebuild with `npm run build --workspace=@kiwiforms/types` or run `npm run dev` which watches the types package.

## Adding Packages

- **New app:** create under `apps/` and add to root `workspaces`
- **New shared package:** create under `packages/` with `"name": "@kiwiforms/<name>"`

# Architecture

AICA is organized around a simple guidance flow:

```text
onboarding profile
  -> pathway matching
  -> recommendation explanation
  -> roadmap setup
  -> roadmap generation
  -> scoped Advisor guidance
```

## Packages

### `packages/client`

React application built with Vite, Tailwind CSS, shadcn/ui, React Query, and Motion. The client should render focused user guidance surfaces and keep business rules light.

### `packages/server`

Bun and Express API server. The server owns persistence, recommendation scoring, roadmap generation, authentication, and LLM prompt orchestration.

### `packages/contracts`

Shared Zod schemas and TypeScript types. Request and response shapes that cross package boundaries should live here when they become part of the app contract.

## Data Flow

- The client collects user input through guided forms.
- The server validates and stores structured profile data.
- Recommendation services score active pathways against match profiles.
- Roadmap services use selected pathway data plus setup preferences.
- Advisor services answer only inside AICA context.

## Design Principles

- Keep recommendations explainable.
- Keep roadmap timelines honest.
- Prefer structured pathway data over free-form generation.
- Keep LLM output grounded in app data.
- Avoid sending large dashboard payloads when the client needs only next action, progress, and compact insight.

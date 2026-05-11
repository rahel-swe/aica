# AICA

AICA is an open-source academic and career guidance app. It helps users turn onboarding answers into explainable pathway recommendations, compare realistic options, and generate practical roadmaps for the next stage of learning or career growth.

The project is built as a Bun monorepo with a React client, an Express API server, and shared TypeScript contracts.

## What AICA Does

- Collects structured onboarding data about strengths, interests, goals, and work preferences.
- Recommends study, career, and hybrid pathways using explainable matching logic.
- Generates roadmap plans that separate immediate action windows from long professional journeys.
- Provides a scoped Advisor experience for pathway and roadmap guidance.
- Keeps schemas and API types shared through the contracts package.

## Repository Structure

```text
packages/
  client/      React, Vite, Tailwind CSS, shadcn/ui
  server/      Bun, Express, MongoDB, Better Auth
  contracts/   Shared Zod schemas and TypeScript types
```

## Requirements

- Bun 1.x
- MongoDB, local or hosted

## Setup

Install dependencies from the repository root:

```bash
bun install
```

Create environment files:

```bash
cp packages/server/.env.example packages/server/.env
cp packages/client/.env.example packages/client/.env
```

Update the values in those local `.env` files. Do not commit secrets.

Seed pathway data when needed:

```bash
cd packages/server
bun run seed:pathways
```

## Development

Run the full workspace from the repository root:

```bash
bun dev
```

Or run packages separately:

```bash
cd packages/server
bun dev
```

```bash
cd packages/client
bun dev
```

Default local URLs:

- Client: `http://localhost:5173`
- Server: `http://localhost:5000`
- MongoDB: `mongodb://localhost:27017/aica`

## Useful Commands

```bash
bun --filter '*' test
bun --filter '*' dev
bun --filter '*' start
bun run format
```

Package-specific commands:

```bash
cd packages/client && bun run build
cd packages/server && bun run build
cd packages/contracts && bun run build
```

## Product Boundaries

AICA is a focused guidance product, not a general-purpose chatbot. Contributions should preserve these boundaries:

- Recommendations must remain explainable.
- Advisor responses must stay grounded in AICA context.
- Roadmaps should be practical and honest about long regulated careers.
- Seed data should favor structured, high-confidence pathways over noisy volume.
- Client screens should show useful decision state, not oversized analytics.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

## Security

Please read [SECURITY.md](SECURITY.md) before reporting vulnerabilities.

## License

A license has not been selected yet. Until a `LICENSE` file is added, reuse rights are not granted. Maintainers should choose a license before announcing the repository as fully open source.

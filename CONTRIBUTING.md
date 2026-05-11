# Contributing to AICA

Thanks for helping improve AICA. This guide keeps contributions focused, reviewable, and aligned with the product.

## Before You Start

- Check existing issues or discussions before opening duplicate work.
- Keep changes small and scoped.
- Prefer clear product behavior over clever abstractions.
- Do not commit secrets, private planning notes, or local environment files.

## Project Priorities

AICA is about direction finding, recommendations, and roadmaps. Good contributions usually improve one of these areas:

- onboarding data quality
- pathway taxonomy and seed data
- recommendation scoring and explanations
- roadmap generation and progress tracking
- scoped Advisor guidance
- accessible, calm, user-facing UI
- shared contracts and validation

Avoid changes that turn AICA into a general chatbot, a large analytics dashboard, or a random career directory.

## Development Workflow

1. Fork or branch from the default branch.
2. Install dependencies with `bun install`.
3. Create local `.env` files from the provided examples.
4. Make a focused change.
5. Run the relevant build or test command.
6. Open a pull request with a clear summary and verification notes.

## Code Style

- Use TypeScript for application code.
- Keep shared API shapes in `packages/contracts`.
- Validate request and response data with schemas where practical.
- Follow existing service, controller, repository, and query patterns.
- Keep frontend components modular and reusable.
- Avoid unrelated refactors in feature PRs.

## Commit and Pull Request Guidance

Use clear commit messages. A good pull request includes:

- what changed
- why it changed
- how it was verified
- screenshots for visible UI work
- any remaining risks or follow-up work

## Seed Data Rules

Seed data should be production-oriented:

- stable slugs
- no fake licensing claims
- no duplicate or near-duplicate pathways
- realistic roadmap logic
- explainable matching profiles
- clear hierarchy for taxonomy nodes

## Reporting Issues

Use the issue templates when available. Include reproduction steps, expected behavior, actual behavior, and relevant environment details.

# Security Policy

## Supported Versions

Security fixes are handled on the default branch unless maintainers publish a release policy.

## Reporting a Vulnerability

Please do not open a public issue with exploit details.

Use GitHub private vulnerability reporting if it is enabled for the repository. If it is not enabled, contact the maintainers privately and include:

- a short description of the issue
- affected package or route
- reproduction steps
- possible impact
- any suggested fix

## Sensitive Data

Do not commit:

- `.env` files
- API keys
- database credentials
- production URLs with secrets
- private product planning documents
- user data exports

## Local Development

Use the provided `.env.example` files as templates. Replace placeholder values locally and keep secrets out of commits.

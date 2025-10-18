# Academic Career AI Advisor

AI-powered academic and career advisory platform.

This repository contains three main folders:

- `ai/` — Flask-based AI microservice (Python)
- `client/` — Vite + React frontend
- `server/` — Node + TypeScript API server

## Quick start

1. Install dependencies for all parts:

```powershell
npm run install:all
```

2. Make sure MongoDB is running locally or provide a `MONGO_URI` for a cloud instance (MongoDB Atlas).

3. Start all services together:

```powershell
npm run dev:fullstack
```

Or start parts individually (run each command in its own terminal):

```powershell
# API server (watch mode)
npm run dev:server

# Web client (Vite)
npm run dev:client

# AI service (Flask)
npm run dev:ai
```

## Ports and access

- Web Client: http://localhost:5173 (Vite default)
- API Server: http://localhost:5000 (default expected)
- AI Service: http://localhost:5001 (Flask)
- MongoDB: mongodb://localhost:27017

## What the root scripts do

The root `package.json` includes helpers that call into each subproject:

- `install:all` — installs Node deps in root, client and server, then installs Python requirements for `ai/`.
- `dev:fullstack` — runs the server, client and ai service concurrently using `concurrently`.
- `dev:client` — runs `cd client && npm run dev`.
- `dev:server` — runs `cd server && npm run dev` (server uses `tsx watch`).
- `dev:ai` — runs `cd ai && python -m flask run --port=5001`.

## Prerequisites

- Node.js >= 16 and npm >= 7
- Python 3.10+ for the AI service
- MongoDB (local) or MongoDB Atlas

On Windows use PowerShell (pwsh.exe) or an elevated terminal as needed.

## Install details (step-by-step)

1. From project root install everything:

```powershell
npm run install:all
```

2. Or install manually per subproject:

```powershell
# Frontend
cd client
npm install

# Backend
cd ..\server
npm install

# AI service
cd ..\ai
python -m pip install -r requirements.txt
```

Notes on Python deps: `ai/requirements.txt` contains Flask, transformers, torch and NLP libraries (spaCy, tokenizers, etc.). On Windows the `torch` binary may require choosing the right wheel (CPU vs CUDA) — if pip fails, follow PyTorch's official install instructions.

## Environment variables

Create `server/.env` with at least:

```
MONGO_URI=mongodb://localhost:27017/your-db
JWT_SECRET=replace_with_a_secret
PORT=5000
```

Create `ai/.env` (optional):

```
FLASK_APP=app.py
FLASK_ENV=development
FLASK_PORT=5001
```

Do not commit secrets into git.

## Health checks and endpoints

- AI health: GET http://localhost:5001/health
- AI recommendation: POST http://localhost:5001/recommend (expects JSON payload)

Check `server/src/routes` for API endpoints and required payloads.

## Troubleshooting

- If `pip install -r requirements.txt` fails on `torch`, install a compatible wheel from https://pytorch.org.
- If `concurrently` is not found after install, ensure npm installed devDependencies or run `npx concurrently "npm run dev:server" "npm run dev:client" "npm run dev:ai"`.
- If MongoDB connection fails, verify `MONGO_URI` and that the MongoDB service is running.

## Recommended follow-ups

- Add `server/.env.example` and `ai/.env.example` with sample values.
- Add a `docker-compose.yml` to orchestrate MongoDB, server and ai for easy local development.

If you want, I can create `.env.example` files or a `docker-compose.yml` next — tell me which and I'll add them.

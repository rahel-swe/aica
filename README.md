# 🎓 Academic Career AI Advisor

Your AI buddy for academic guidance & career planning ✨🤖

This repo is split into three main parts:

- `client/` — ⚡ Vite + React frontend
- `server/` — 🚀 Node + TypeScript API
- `contracts/` — 🔗 Shared types & schemas

## 🚀 Quick Start

1. **Install everything** (from the repo root):

```powershell
bun install
```

2. **Set up MongoDB** 🛢️
   - **Local:** Ensure MongoDB is running at `mongodb://localhost:27017`
   - **Cloud:** Or set a `MONGO_URI` environment variable (MongoDB Atlas works too ☁️)

3. **Start Running in development:**

```bash
# Full Stack: run in the root of the repo
bun dev

# API server
cd packages/server
bun dev

# Web client (Vite)
cd packages/client
npm dev
```

## 🌐 Ports & Access

- 💻 **Web Client:** http://localhost:5173
- 🔌 **API Server:** http://localhost:5000
- 🛢️ **MongoDB:** mongodb://localhost:27017

Happy building! 💖✨

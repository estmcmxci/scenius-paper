# Scenius Paper

Interactive product paper for **Scenius** — reputation-weighted prediction markets for music catalog valuation.

**Live:** coming soon

## Architecture

**Frontend** — React 19 + Vite
- Split-pane layout: paper reader alongside AI chat
- Table of contents navigation, text selection for contextual questions

**Backend** — FastAPI + OpenAI Agents SDK
- Research agent with paper search and simulation tools
- Live simulation engine for custom parameter sweeps

## Setup

### Backend

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -e .
# Set OPENAI_API_KEY in .env
uvicorn app.main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Status

🚧 In progress — content blank, scaffold only.

**Author:** estmcmxci.eth — Trece Research, NYC

# Research Paper Chat

Interactive chat interface for exploring **"Reputation-Weighted Prediction Markets Under Wealth Heterogeneity and Heavy Tails"** — a research paper on how reputation-weighted aggregation outperforms capital-weighted and equal-weighted prediction mechanisms under Pareto-distributed stake heterogeneity.

**Live:** [research-paper-chat.vercel.app](https://research-paper-chat.vercel.app)

## Architecture

**Frontend** — React 19 + Vite, deployed on Vercel
- Split-pane layout: paper reader (PDF + rendered sections) alongside AI chat
- Table of contents navigation, text selection for contextual questions
- LaTeX rendering via KaTeX, markdown via react-markdown
- Built on [@openai/chatkit-react](https://github.com/openai/chatkit)

**Backend** — FastAPI + OpenAI Agents SDK, deployed on Railway
- Research agent (o4-mini) with paper search, simulation, and figure generation tools
- Live simulation engine: runs custom parameter sweeps (up to 5,000 events, 10 seeds)
- Pre-computed results from 630 simulation runs across 3 campaigns and 3 wealth-skill regimes
- ChatKit protocol for streaming responses

## Running Locally

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

## Key Dependencies

| Layer | Stack |
|-------|-------|
| Frontend | React 19, Vite 6, react-pdf, KaTeX, ChatKit React |
| Backend | FastAPI, OpenAI Agents SDK, ChatKit Server, NumPy, SciPy, Matplotlib |
| Infra | Vercel (frontend), Railway (backend) |

## Paper

The paper proposes a reputation-weighted aggregation mechanism where each participant's influence scales with their demonstrated predictive accuracy. Three mechanisms are compared across three wealth-skill correlation regimes, showing that reputation weighting consistently improves accuracy (+0.13% to +0.20% Brier score, p < 10⁻¹⁵) while capital weighting degrades accuracy by up to -5.27% under anti-correlated conditions.

**Author:** estmcmxci.eth — Trece Research, NYC

## License

All rights reserved.

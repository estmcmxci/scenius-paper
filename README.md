# scenius-paper

Monorepo for two interactive papers by estmcmxci.eth (Trece Research).

## Layout

```
apps/
├── research/           # Research paper: "Reputation-Weighted Prediction Markets
│   ├── frontend/       # Under Wealth Heterogeneity and Heavy Tails"
│   └── backend/        # → https://research.scenius.blog
├── product/            # Product paper: "Scenius: A Reputation-Weighted Prediction
│   ├── frontend/       # Market for Music Catalog Pricing"
│   └── backend/        # → https://scenius-blog.vercel.app
papers/
├── research/           # LaTeX source, PDF, drafts for research paper
└── product/            # Markdown, LaTeX, PDF for product paper
```

Each `apps/*` is independently deployable. Frontends use Vite + React 19, backends use FastAPI + `openai-agents` + ChatKit.

## Deploy targets

| App | Vercel | Railway | ChatKit domainKey |
|---|---|---|---|
| `apps/research` | `paper-chat-frontend` → research.scenius.blog | project `paper-chat`, service `paper-chat` | `domain_pk_69e40f88…3ccf` |
| `apps/product`  | `scenius-blog` → scenius-blog.vercel.app (re-link required) | project `scenius-paper`, service `remarkable-spirit` | `domain_pk_69a3be2e…28c0` |

## Develop

```bash
# Research paper
cd apps/research/backend
python -m venv .venv && source .venv/bin/activate
pip install -e .
uvicorn app.main:app --reload --port 8000
# in another shell:
cd apps/research/frontend && npm install && npm run dev

# Product paper (same, but under apps/product/)
```

Both backends need `OPENAI_API_KEY` in env. Both frontends read `VITE_CHATKIT_URL` / `VITE_API_URL` from `.env.production` or `.env.local`.

## Deploy

```bash
# Research frontend
cd apps/research/frontend
vercel --prod            # links to paper-chat-frontend (prj_EJALKf2…)

# Research backend
cd apps/research/backend
railway link             # project: paper-chat, service: paper-chat
railway up

# Product frontend
cd apps/product/frontend
vercel link              # one-time, pick: scenius-blog
vercel --prod

# Product backend
cd apps/product/backend
railway link             # project: scenius-paper, service: remarkable-spirit
railway up
```

**Author:** estmcmxci.eth — Trece Research, NYC

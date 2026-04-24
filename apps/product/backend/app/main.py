from typing import Any
import re

from dotenv import load_dotenv

load_dotenv()

from pathlib import Path

from chatkit.server import StreamingResult
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse, Response, StreamingResponse
from fastapi.staticfiles import StaticFiles

from .server import PaperChatKitServer
from .store import MemoryStore

app = FastAPI(title="Paper Chat Backend")

# Serve generated figures as static files
figures_dir = Path(__file__).parent / "data" / "figures"
figures_dir.mkdir(parents=True, exist_ok=True)
app.mount("/figures", StaticFiles(directory=str(figures_dir)), name="figures")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

store = MemoryStore()
server = PaperChatKitServer(store=store)

# ─── Paper content configuration ───

DATA_DIR = Path(__file__).parent / "data" / "paper"
LATEX_DIR = Path(__file__).resolve().parent.parent.parent.parent.parent / "papers" / "product"

SECTIONS = [
    {"file": "abstract.md", "slug": "abstract", "title": "Abstract", "order": 0},
    {"file": "introduction_the_pricing_problem.md", "slug": "introduction", "title": "1. Introduction — The Pricing Problem", "order": 1},
    {"file": "the_signal_what_a_prediction_is.md", "slug": "the-signal", "title": "2. The Signal — What a Prediction Is", "order": 2},
    {"file": "reputation_the_scoring_loop.md", "slug": "reputation", "title": "3. Reputation — The Scoring Loop", "order": 3},
    {"file": "reputation-weighted_aggregation_the_mechanism.md", "slug": "aggregation", "title": "4. Reputation-Weighted Aggregation — The Mechanism", "order": 4},
    {"file": "the_market_how_it_runs.md", "slug": "the-market", "title": "5. The Market — How It Runs", "order": 5},
    {"file": "incentive_why_tastemakers_participate.md", "slug": "incentive", "title": "6. Incentive — Why Tastemakers Participate", "order": 6},
    {"file": "distribution_the_surface_layer.md", "slug": "distribution", "title": "7. Distribution — The Surface Layer", "order": 7},
    {"file": "identity_portable_reputation.md", "slug": "identity", "title": "8. Identity — Portable Reputation", "order": 8},
    {"file": "markets_as_apis_the_output.md", "slug": "markets-as-apis", "title": "9. Markets as APIs — The Output", "order": 9},
    {"file": "competitive_landscape.md", "slug": "competitive-landscape", "title": "10. Competitive Landscape", "order": 10},
    {"file": "privacy.md", "slug": "privacy", "title": "11. Privacy", "order": 11},
    {"file": "results.md", "slug": "results", "title": "12. Results", "order": 12},
    {"file": "roadmap.md", "slug": "roadmap", "title": "13. Roadmap", "order": 13},
    {"file": "conclusion.md", "slug": "conclusion", "title": "14. Conclusion", "order": 14},
    {"file": "references.md", "slug": "references", "title": "References", "order": 15},
]

# Figure placeholder patterns → image markdown replacements
FIGURE_REPLACEMENTS = [
    (
        r"\*\[Figure 1:.*?\]\*",
        "![Figure 1: Depop listing for a Spotify screenshot proving early listenership of the artist Nettspend](/figures/paper/fig_calibration.png)",
    ),
    (
        r"\*\[Figure: Bar chart showing absolute Brier.*?error bars\.\]\*",
        "![Figure 2: Calibration — predicted vs observed frequency for E, C, R mechanisms across regimes](/figures/paper/fig_calibration.png)",
    ),
    (
        r"\*\[Figure: Line plots showing R-vs-C improvement vs noise gap.*?Regimes A and B\.\]\*",
        "![Figure 3: Reputation separation — good vs bad agent reputation distributions](/figures/paper/fig_reputation_separation.png)",
    ),
    (
        r"\*\[Figure: Line plots showing R-vs-C improvement and C-vs-E distortion.*?increasing concentration\.\]\*",
        "![Figure 4: Inequality sensitivity — R-vs-C improvement and C-vs-E distortion vs stake dispersion](/figures/paper/fig_inequality_sensitivity.png)",
    ),
]


def _load_section_content(filename: str) -> str:
    """Load a section markdown file and replace figure placeholders with image tags."""
    path = DATA_DIR / filename
    if not path.exists():
        return ""
    content = path.read_text(encoding="utf-8")
    for pattern, replacement in FIGURE_REPLACEMENTS:
        content = re.sub(pattern, replacement, content, flags=re.DOTALL)
    # Strip per-section "References" blocks (they all end with ---\n\n## References\n...)
    # so that references only appear once in the dedicated References section
    content = re.sub(r'\n---\s*\n+## References.*', '', content, flags=re.DOTALL)
    return content


@app.get("/")
async def health() -> dict[str, Any]:
    return {"status": "ok", "agent": "Paper Assistant"}


@app.get("/api/paper/full")
async def paper_full():
    """Return the full paper as structured JSON with ordered sections."""
    sections = []
    for sec in SECTIONS:
        content = _load_section_content(sec["file"])
        sections.append({
            "slug": sec["slug"],
            "title": sec["title"],
            "content": content,
            "order": sec["order"],
        })
    return {
        "title": "Scenius: A Reputation-Weighted Prediction Market for Music Catalog Pricing",
        "sections": sections,
    }


@app.get("/api/paper/pdf")
async def paper_pdf():
    """Serve the paper PDF file."""
    candidates = [
        DATA_DIR / "paper.pdf",
        LATEX_DIR / "paper.pdf",
        LATEX_DIR / "Reputation-weighted markets (product).pdf",
    ]
    for pdf_path in candidates:
        if pdf_path.exists():
            return FileResponse(
                path=str(pdf_path),
                media_type="application/pdf",
                filename="paper.pdf",
            )
    return JSONResponse({"error": "PDF not available"}, status_code=404)


@app.post("/chatkit")
async def chatkit_endpoint(request: Request) -> Response:
    body = await request.body()
    context: dict[str, Any] = {}
    result = await server.process(body, context=context)
    if isinstance(result, StreamingResult):
        return StreamingResponse(result, media_type="text/event-stream")
    return Response(content=result.json, media_type="application/json")

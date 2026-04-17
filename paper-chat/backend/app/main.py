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
LATEX_DIR = Path(__file__).resolve().parent.parent.parent.parent / "latex_text"

SECTIONS = [
    {"file": "introduction_draft.md", "slug": "introduction", "title": "I. Introduction", "order": 1},
    {"file": "related_work_draft.md", "slug": "related-work", "title": "II. Related Work", "order": 2},
    {"file": "model_methods_draft.md", "slug": "model-methods", "title": "III. Model and Experimental Design", "order": 3},
    {"file": "results_draft.md", "slug": "results", "title": "V. Results", "order": 4},
    {"file": "discussion_draft.md", "slug": "discussion", "title": "VI. Discussion", "order": 5},
    {"file": "limitations_future_work_draft.md", "slug": "limitations-future-work", "title": "VII. Limitations and Future Work", "order": 6},
    {"file": "conclusion_draft.md", "slug": "conclusion", "title": "VIII. Conclusion", "order": 7},
    {"file": "references_draft.md", "slug": "references", "title": "References", "order": 8},
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
        "title": "Reputation-Weighted Prediction Markets Under Wealth Heterogeneity and Heavy Tails",
        "sections": sections,
    }


@app.get("/api/paper/pdf")
async def paper_pdf():
    """Serve the paper PDF file."""
    candidates = [
        DATA_DIR / "paper.pdf",
        LATEX_DIR / "paper.pdf",
        LATEX_DIR / "Reputation-Weighted Prediction Markets Under Wealth Heterogeneity and Heavy Tails.pdf",
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

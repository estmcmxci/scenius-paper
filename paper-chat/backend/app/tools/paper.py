"""Paper search tools — TF-IDF over markdown chunks + reference search."""

import os
import re
from pathlib import Path

from agents import function_tool
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load paper data at module level
_PAPER_DIR = Path(__file__).parent.parent / "data" / "paper"

_sections: dict[str, str] = {}
_chunks: list[dict[str, str]] = []
_references: str = ""

for md_file in sorted(_PAPER_DIR.glob("*.md")):
    name = md_file.stem.replace("_draft", "").replace("_", " ").title()
    text = md_file.read_text()
    _sections[name] = text
    # Split into paragraph-level chunks
    paragraphs = [p.strip() for p in text.split("\n\n") if p.strip() and len(p.strip()) > 50]
    for para in paragraphs:
        _chunks.append({"section": name, "text": para})

bib_path = _PAPER_DIR / "references.bib"
if bib_path.exists():
    _references = bib_path.read_text()

# Build TF-IDF index
_texts = [c["text"] for c in _chunks]
_vectorizer = TfidfVectorizer(stop_words="english", max_features=5000)
_tfidf_matrix = _vectorizer.fit_transform(_texts) if _texts else None


@function_tool
def search_paper(query: str, top_k: int = 3) -> str:
    """Search the paper content using TF-IDF similarity. Returns the most relevant passages."""
    if _tfidf_matrix is None or not _chunks:
        return "No paper content loaded."

    top_k = min(top_k, 5)
    query_vec = _vectorizer.transform([query])
    sims = cosine_similarity(query_vec, _tfidf_matrix).flatten()
    top_indices = sims.argsort()[-top_k:][::-1]

    results = []
    for idx in top_indices:
        if sims[idx] > 0.01:
            chunk = _chunks[idx]
            text = chunk['text'][:800]  # cap each chunk
            results.append(f"**[{chunk['section']}]** (score: {sims[idx]:.3f})\n{text}")

    if not results:
        return "No relevant passages found for that query."

    return "\n\n---\n\n".join(results)


@function_tool
def get_section(section: str) -> str:
    """Get a paper section by name (truncated to 3000 chars). Available: Introduction, Model Methods, Results, Discussion, Related Work, Limitations Future Work, Conclusion."""
    # Try exact match first
    if section in _sections:
        text = _sections[section][:3000]
        return f"# {section}\n\n{text}"

    # Try case-insensitive partial match
    lower = section.lower()
    for name, text in _sections.items():
        if lower in name.lower() or name.lower() in lower:
            return f"# {name}\n\n{text[:3000]}"

    return f"Section '{section}' not found. Available: {', '.join(_sections.keys())}"


@function_tool
def get_references(query: str) -> str:
    """Search the references/bibliography for entries matching the query."""
    if not _references:
        return "No references file loaded."

    # Split into individual bib entries
    entries = re.split(r'(?=@\w+\{)', _references)
    matches = []
    lower_query = query.lower()
    for entry in entries:
        if entry.strip() and lower_query in entry.lower():
            matches.append(entry.strip())

    if not matches:
        return f"No references found matching '{query}'."

    return f"Found {len(matches)} matching reference(s):\n\n" + "\n\n".join(matches[:10])

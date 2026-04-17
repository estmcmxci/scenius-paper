# Duetti Music Finance Index — Analysis for Scenius

## Core Value Proposition

**Scenius extracts alpha from the uncertainty discount on young catalogs.** The music catalog market applies a uniform 3.2x multiple to all 2–5 year publishing catalogs — but within that tier, there is enormous variance in actual future value. Some of these artists will 10x; most will decay. That variance is unexploited alpha. The MFI prices the category; Scenius prices the individual. The spread between the generic 3.2x and what a specific catalog is actually worth is the alpha that tastemakers with demonstrated accuracy can capture. Scenius produces forward-looking, calibrated breakout probabilities from forecasters with proven track records, compressing the uncertainty discount for catalogs where crowd conviction is strong but historical data doesn't yet exist. The mechanism design (reputation-weighted aggregation, proper scoring rules, heavy-tailed modeling) is the infrastructure; extracting alpha from the undifferentiated tier is the purpose.

---

**Source:** https://www.duetti.co/music-finance-index
**Date reviewed:** February 2026
**Published by:** Duetti + Billboard (H1 2026, first edition)

---

## What the MFI Is

A semi-annual industry benchmark tracking music catalog valuations via revenue multiples (price / trailing 12-month net revenue), surveyed from a curated panel of industry insiders — managers, lawyers, artists, and their teams. Not institutional buyers.

## Key Data Points

### Valuation Multiples by Catalog Age

| Age | Masters | Publishing |
|-----|---------|------------|
| 2–5 years | 3.5x | 3.2x |
| 5–10 years | 5.7x | 6.1x |
| 10+ years | 5.8x | 8.7x |

### Deal Activity Outlook (H1 2026)

- **Latin:** +67% net positive (strongest growth)
- **Sub-$1M deals:** +61% net positive (strongest momentum by deal size)
- **Hip-Hop/R&B:** +7% net growth (stalled)
- **$15M+ mega-deals:** +7% net positive (near saturation)
- **Emerging regions leading:** Latin America, India, MEA

### Market Sentiment

Panel shifted from mild softness in late 2025 (–7% net) to cautious optimism for H1 2026 (+19% net positive). Growth concentrated in "slight increases" rather than sharp repricing.

---

## Correspondence to Scenius Paper

### 1. The MFI is a reputation-weighted poll, not a market

The panel is curated (not open) and draws from "ground-level" insiders rather than institutional buyers. This is essentially a prediction poll with implicit performance-weighting — they select panelists based on presumed expertise. Our paper's Atanasov et al. (2017) finding that performance-weighted polls outperform prediction markets is directly relevant. The MFI is doing by curation what Scenius proposes to do by mechanism.

### 2. The MFI admits its core metric is incomplete

They state the revenue multiple is "a useful shorthand, but is inherently incomplete." The missing piece is exactly what our paper identifies: forward-looking signal about breakout potential. Revenue multiples are backward-looking (trailing 12 months). For young catalogs (2–5 years, the lowest multiples at 3.2–3.5x), historical data is sparse — this is precisely where reputation-weighted conviction from tastemakers could supplement actuarial underwriting. Our paper's Future Work section already makes this argument with the Duetti citation.

### 3. The age gradient reveals the information gap Scenius fills

Young catalogs (2–5 years) trade at 3.2–3.5x while mature catalogs (10+ years) trade at 5.8–8.7x. The premium on older catalogs reflects certainty — more data, proven durability. Scenius-derived breakout probabilities could compress this discount for young catalogs where crowd conviction is strong but historical data doesn't yet exist.

### 3a. What "compress the discount" means concretely

The discount exists because of uncertainty. A 10+ year publishing catalog trades at 8.7x revenue because the buyer knows what they're getting — a decade of streaming data, proven durability, sync licensing history. A 2–5 year catalog trades at 3.2x for the same revenue because the buyer doesn't know if that revenue will persist. The artist might be a one-hit wonder. The 5.5x gap between 3.2x and 8.7x is the price of uncertainty.

The discount is applied uniformly to all young catalogs. A 3-year-old catalog from an artist who is genuinely about to break out trades at roughly the same 3.2x multiple as a 3-year-old catalog from an artist who has peaked — because the buyer can't reliably distinguish between them using backward-looking data alone. Trailing revenue looks similar for both.

"Compress the discount" means: reduce the uncertainty for specific catalogs where forward-looking signal exists. If a reputation-weighted prediction market produces a calibrated breakout probability of, say, 0.35 for Artist A (backed by forecasters with demonstrated track records), and 0.04 for Artist B, a buyer now has information that trailing revenue doesn't capture. Artist A's catalog might warrant a 5x or 6x multiple instead of the generic 3.2x — not because their history is longer, but because the crowd with proven taste is saying this catalog's future revenue trajectory is stronger than the base rate.

The gap between 3.2x and 8.7x doesn't disappear — it just stops being applied blindly to every young catalog. Catalogs with strong forward-looking signal get repriced upward; catalogs without it stay at the floor. That's the compression.

**Who benefits:** The artist selling at 5x instead of 3.2x. The buyer who avoids overpaying for a catalog the crowd is bearish on. And the tastemakers whose reputation score generated the signal in the first place.

### 4. Sub-$1M deals are the Scenius sweet spot — and where all the alpha is

Sub-$1M deals show the strongest momentum (+61% net positive), and emerging regions (Latin America, India, MEA) are leading volume expectations. But these are precisely the segments with the least institutional data coverage — fewer Luminate streams, less sync history, fewer comparable transactions. The information asymmetry is highest exactly where deal activity is growing fastest. This is where all the alpha is: the gap between what institutional data can see and what local tastemakers already know. This is the Regime B population from our paper — tastemakers with signal but not capital — and it's the underwriting frontier where Scenius can play the largest role. No institutional dataset will tell you which Nigerian Afrobeats artist or Argentine trap producer is about to break out. The people in those scenes already know. Scenius gives them a mechanism to express that conviction, earn reputation from it, and feed the signal into catalog valuation.

### 4a. The inverse data problem — and why Scenius is a permanently different kind of signal

The entire institutional data stack — Luminate, Chartmetric, Spotify for Artists analytics — was built for the US/UK major-label ecosystem. It works great for a Drake catalog with 10 years of streaming data across every DSP. It's thin to nonexistent for an independent Afrobeats artist in Lagos or a regional Mexican act breaking on YouTube in Guadalajara. The data infrastructure was built for the center and hasn't caught up to where growth is actually happening.

This creates an inverse data problem. In mature markets (US Pop, 10+ year catalogs), there's abundant data and the challenge is filtering it. In emerging markets and early-career segments, the data doesn't exist yet — the challenge is *generating* it. Scenius is a data generation mechanism. It turns distributed local knowledge into a structured, calibrated signal for markets where institutional data hasn't arrived yet.

**What underwriters do today in the absence of data:**

1. **Don't invest** — wait until data coverage improves. Miss the alpha.
2. **Apply the generic 3.2x discount** — treat it like every other young catalog. Underpay the artist, but also miss the breakout upside.
3. **Rely on gut feel from A&R contacts** — call someone who knows the scene. Unscalable, unverifiable, not composable.

Option 3 is what actually happens. And it's essentially an informal, non-meritocratic version of what Scenius formalizes.

**Crucially, Scenius is not a stopgap until institutional data catches up — it is a permanently different kind of signal.** Even when Luminate eventually improves coverage in India and Spotify penetrates deeper into MEA, consumption data will always be backward-looking. It tells you what already happened. Scenius produces forward-looking conviction from people with demonstrated taste. These are complementary, not substitutable. Trailing streams tell you the decay curve; Scenius tells you the breakout probability. No amount of historical data will ever replace the signal that comes from the people in the scene who know what's next. The institutional data stack and the conviction signal stack will coexist permanently — one looks backward, the other looks forward.

### 4b. Scenius as the discovery layer for sub-$5M deals

Sub-$1M is +61%, and the broader sub-$5M tier is where almost all the momentum is (mega-deals at +7% are basically flat). These are early-career, independent, emerging-market catalogs — the exact population where institutional data is thinnest and local taste signal is richest.

Scenius doesn't just complement the underwriting — it's the discovery layer. Before a catalog can be valued, it has to be found. In the sub-$5M tier, there's no Goldman Sachs banker shopping the deal. Discovery happens through A&R networks, playlist curators, local scene participants. Scenius structures that discovery process: tastemakers express conviction, outcomes resolve, reputation accrues, and the catalogs with the strongest forward-looking signal surface to the top. The underwriter doesn't need to call 50 A&R contacts in Lagos — they read the market.

### 5. Genre and geography fragmentation matches our heterogeneous-signal model

Latin (+67%), India, MEA leading — these are markets where local tastemakers have private information that institutional buyers lack. Our model's "good agents with low noise" maps directly to niche community members with genre- or region-specific knowledge.

---

## Competitive Landscape: Forward-Looking Signals in Music Finance (Feb 2026)

**Scenius is a net new signal source.** Forward-looking capabilities are emerging across the music data stack, but they are fragmented, siloed, and none produce what Scenius produces.

### Who has forward-looking capabilities today

| Player | What they predict | For whom | Limitation |
|---|---|---|---|
| **Chartmetric** | Artist breakout signals (6 metrics, daily scores) | A&R teams | No financial output. Discovers artists, doesn't value catalogs. |
| **Sodatone** (Warner) | Breaking artists from 40k daily uploads | Internal Warner A&R | Proprietary, locked inside one major label. |
| **Spotify** | Which tracks to surface algorithmically | Internal engagement | Most predictive data in the world — completely unavailable to investors. |
| **Duetti** | Decay curves, statistical modeling | Catalog underwriting | Forward-looking in the DCF sense, but backward-looking inputs (consumption data). |
| **Xposure Music** | AI-based catalog pricing | Catalog acquisition ($10K-$4M range) | Trained on historical trends. Same backward-looking input limitation. |
| **Goldman Sachs** | Macro industry forecast (~$200B by 2035) | Investor guidance | Macro-level only. No per-catalog signal. |
| **Academic ML** | Hit prediction (85-97% accuracy in papers) | Nobody — uncommercialized | No bridge to catalog valuation or institutional adoption. |

### Five gaps nobody fills

1. **No one combines A&R breakout signals with financial valuation.** Chartmetric can spot a rising artist. Duetti can price a catalog. Nobody connects the two.
2. **Cultural momentum signals don't feed into catalog pricing.** The ABS/securitization market ($3.5B+ issued in 2024) uses DCF models with smooth decay curves — no TikTok virality, no sync pipeline, no genre cycle positioning. The Hipgnosis writedown crisis of 2023-2024 demonstrated the cost of this blind spot.
3. **DSP data asymmetry.** Spotify's skip rates, repeat listen patterns, super-listener formation — the most predictive engagement data that exists — is locked inside DSPs and unavailable to the investment community.
4. **No prediction of catalog re-emergence.** Songs go viral on TikTok years after release. 53% of TV syncs feature older tracks. Nobody predicts which catalog assets will re-emerge.
5. **Academic models remain uncommercialized.** The bridge between ML hit prediction research and institutional music finance doesn't exist.

### Where Scenius sits — a fundamentally different signal class

Scenius occupies a space nobody else is in. The existing stack has two modes:

- **Algorithmic, top-down (Chartmetric, Sodatone):** Screens for breakout patterns in platform data. Quantitative analysis. Powerful but limited to what the data already captures — and unavailable or incomplete for data-sparse emerging markets.
- **Actuarial, backward-looking (Duetti, Xposure, Hipgnosis):** Models catalog value from consumption history and decay curves. DCF projections. Works well for mature catalogs with years of data. Structurally blind to inflection points.

**Scenius is neither.** It generates forward-looking conviction from human tastemakers with demonstrated accuracy — bottom-up, reputation-weighted, calibrated by proper scoring rules. It is not a better version of what exists. It is a new input class that the existing stack cannot produce.

The closest analogy: Chartmetric is quantitative analysis (screens for breakout patterns in data). Scenius is fundamental analysis (calibrated human judgment about what's going to break out and why). Both are valuable. Nobody is doing the latter systematically.

This is why Scenius is not a stopgap — it is a permanently different kind of signal. Algorithmic tools will keep improving. Consumption data will keep expanding. But no amount of backward-looking platform data will ever replace the forward-looking signal that comes from the people in the scene who know what's next. Scenius structures, verifies, and makes that signal composable.

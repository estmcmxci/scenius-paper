# Scenius Product Paper — Outline

**Structure:** Bitcoin-style (problem → mechanism → proof). ~9 pages. Each section builds cumulatively on the prior.

---

## Abstract

*One paragraph. Hybrid tone: open with the market problem in plain language, pivot to the mechanism. Accessible entry, technical core.*

Young music catalogs trade at a uniform discount because backward-looking data can't distinguish future breakouts from one-hit wonders — yet the people closest to the music already know. Scenius is a reputation-weighted prediction market that captures this forward-looking conviction and makes it legible to catalog buyers. Participants predict binary breakout events on a weekly resolution cycle; their influence in the market scales with demonstrated accuracy, not capital. We show that reputation-weighted aggregation consistently outperforms both equal-weighted and capital-weighted mechanisms across all wealth-skill regimes, and propose an implementation built on SoundCloud's discovery infrastructure, ENS-based portable identity, and passkey-embedded wallets for non-crypto-native participants. The resulting signal — calibrated breakout probabilities for individual artists — can be licensed directly to actuarial pricing models, compressing the uncertainty discount where institutional data doesn't yet exist.

---

## 1. Introduction — The Pricing Problem

*~2/3 page. Diagnose why current catalog valuation fails.*

- MFI applies uniform 3.2x to all 2–5 year publishing catalogs. Within that tier, enormous variance — some artists will 10x, most will decay. The spread is unexploited alpha.
- MFI data shows strongest momentum in sub-$1M deals (+61% net positive) — the long tail, not the mega-deals. This is precisely the segment with the least institutional data coverage and the highest information asymmetry.
- Music cycles are fast: ~106K new tracks hit streaming services every day, new releases drop every Friday, first-week performance is a primary signal. The market moves at weekly cadence.
- Backward-looking data (trailing 12-month revenue) can't distinguish future breakouts from one-hit wonders.
- Forward-looking signal exists — tastemakers in local scenes already know — but no mechanism captures it. Spotify's New Music Friday biases toward signed acts; by the time an artist hits NMF, the discovery already happened upstream.
- Spotify's voting primitives (Hip-Hop's Next Leaders, Feb 2026) prove demand for forward-looking conviction, but equal-weighted aggregation is the weakest form.
- SoundCloud is where discovery happens before the label system captures it — curator graphs, repost networks, pre-breakout audience formation. That's where the mechanism needs to live.

*Sources: `duetti_mfi_analysis.md`, `spotify_voting_signal.md`, `product_positioning_blog_soundcloud.md`*

---

## 2. The Signal — What a Prediction Is

*~1 page. Define the data structure (Bitcoin's "Transactions" equivalent).*

- An "electronic coin" in Bitcoin is a chain of signatures. A "prediction" in Scenius is a calibrated probability estimate on a binary breakout event.
- Signal model: s_ij = β·θ_j + ε_ij — each tastemaker receives a noisy private signal about an artist's latent quality.
- The market question: *Will this track exceed τ cumulative streams within 1 week?*
- Resolution horizon matches the pace of the market — weekly drops, weekly resolution. Fast cycles mean reputation compounds quickly: more resolution events, faster signal separation between accurate and inaccurate forecasters.
- Heavy tails: latent quality is Pareto-distributed. Most tracks get tiny traction; a small number explode massively.
- This section establishes what the mechanism operates on.

*Source: `Scenius_Design_Spec.md`*

---

## 3. Reputation — The Scoring Loop

*~1/2 page. The building block (Bitcoin's "Timestamp Server" equivalent — the simple idea that everything else rests on).*

- Reputation update: r_i ← r_i · (1 + λ · score_i), where score_i = 1 − (p_ij − θ_j)²
- Brier-score-based: strictly proper, incentivizes honest reporting.
- Multiplicative: good forecasters compound; bad forecasters decay.
- Reputation accrues over time and becomes the portable track record tied to an identity.

---

## 4. Reputation-Weighted Aggregation — The Mechanism

*~1 page. The core innovation (Bitcoin's "Proof-of-Work" equivalent — the section that makes the system work).*

- Three mechanisms compared:
  - Equal-weighted (E): p_j = (1/N) Σ p_ij — one person, one vote. Spotify's model.
  - Capital-weighted (C): p_j = Σ(w_i · p_ij) / Σ(w_i) — one dollar, one vote. Traditional prediction markets.
  - Reputation-weighted (R): p_j = Σ(r_i · s_i · p_ij) / Σ(r_i · s_i) — influence scales with accuracy.
- Three wealth-skill regimes (A: uncorrelated, B: anti-correlated, C: correlated) determine when capital-weighting helps vs. hurts.
- R dominates C across all regimes. The improvement is modest (+0.13% to +0.20% Brier) but consistent and statistically significant (p < 10⁻¹⁵).
- The binding constraint: multiplicative reputation can't override extreme capital concentration (~10% rep differential vs. 40x stake differential). This is an honest limitation, not hidden.

---

## 5. The Market — How It Runs

*~2/3 page. The protocol (Bitcoin's "Network" equivalent).*

- Campaign structure: a set of binary prediction events with defined resolution criteria and time horizons.
- Resolution oracle: objective outcome (streaming threshold crossed within 1 week) settles the market.
- Participation: tastemakers stake on artist outcomes; the market aggregates predictions in real time.
- SoundCloud as infrastructure — curator graphs, repost networks, pre-breakout audience data consumed as API inputs. The platform doesn't need to change anything.

*Source: `product_positioning_blog_soundcloud.md`*

---

## 6. Incentive — Why Tastemakers Participate

*~1/2 page. The economic loop (Bitcoin's "Incentive" equivalent).*

- Reputation is the incentive, not just capital returns. Your ENS name becomes your public track record.
- Walden's "invest in what you know" made structurally sound: lived experience in a music scene becomes a quantifiable, composable asset.
- The three-sided market: tastemakers earn reputation, catalog buyers get forward-looking price signals, artists get repriced from the uniform 3.2x when the crowd is right.
- Writers get paid for accuracy, not attention — reversing the economic model that killed music journalism.

*Sources: `walden_variant_markets_analysis.md`, `product_positioning_blog_soundcloud.md`*

---

## 7. Distribution — The Surface Layer

*~1/2 page. Practical concern (Bitcoin's "Reclaiming Disk Space" — making it work at scale).*

- scenius.blog is the discovery and media layer — a callback to the blog era (Pigeons & Planes, 2DopeBoyz, Gorilla vs. Bear) when independent curators were the primary pipeline for emerging talent, before algorithmic playlists absorbed that function.
- Curated contributors at launch: invited writers with demonstrated taste stake their reputation by publishing on artists they believe will break out. Their writing feeds the prediction market.
- Readers can co-sign — staking their own reputation on an artist a blogger has surfaced. Two tiers of participation: curators who originate signal, and readers who amplify it.
- The blog is the discovery surface; the prediction market is the backend. Media is distribution; reputation is the product.
- Read → Co-sign → Earn funnel.

---

## 8. Identity — Portable Reputation

*~1/2 page. Practical concern (Bitcoin's "SPV" equivalent — making it accessible without running the full system).*

- ENS names as human-readable, portable reputation identifiers.
- Para embedded wallets: passkey-based onboarding, no seed phrase, wallet layer invisible.
- Reputation travels with the address across any app that reads it — not locked inside Scenius.
- Non-crypto-native users (A&Rs, curators, scouts) never see the wallet.

---

## 9. Markets as APIs — The Output

*~1/2 page. Practical concern (Bitcoin's "Combining and Splitting Value" — making the output usable).*

- The market produces a calibrated breakout probability backed by adversarial competition among participants risking reputation.
- That probability is a programmable endpoint — a signal any downstream system can consume.
- Actuarial models like Duetti's MFI can ingest the Scenius signal directly: instead of applying a uniform 3.2x to all young catalogs, the MFI can weight by Scenius-derived breakout probability for individual artists.
- **Revenue stream: Scenius licenses this signal to catalog underwriters.** The data feed is the business model — not transaction fees, not a token.
- Walden's "markets as APIs" made literal: Scenius is the API endpoint that catalog pricing models call.

*Sources: `walden_variant_markets_analysis.md`, `duetti_mfi_analysis.md`*

---

## 10. Competitive Landscape

*~2/3 page. Where Scenius sits relative to existing approaches.*

- **Algorithmic top-down (Chartmetric, Sodatone):** Ingest streaming/social data and score artists using proprietary models. Backward-looking by construction — they measure what already happened, not what will happen. Sodatone was acquired by Warner Music Group; Chartmetric serves labels. Neither produces forward-looking conviction signal.
- **Actuarial backward-looking (Duetti/MFI, Xposure):** Price catalogs using trailing revenue multiples and comparable transactions. The MFI is the industry benchmark but applies uniform multiples within age tiers. Cannot differentiate individual catalogs within the same tier.
- **Equal-weighted polls (Spotify voting):** Captures forward-looking conviction but doesn't weight by accuracy. Popularity contests, not information markets.
- **Scenius is a net new signal class:** Not algorithmic top-down, not actuarial backward-looking, not an unweighted poll. Forward-looking human conviction with demonstrated accuracy. A permanently different signal source that complements rather than replaces the existing stack.

---

## 11. Privacy

*~1/3 page. What's public vs. private.*

- Public: reputation scores, aggregate market probabilities, prediction history (tied to ENS).
- Private: individual position sizes, personal identity behind the ENS name (pseudonymous by default).
- Trade-off stated honestly: reputation portability requires public track records. Participants opt into legibility.

---

## 12. Results

*~1.5 pages. The formal evidence (Bitcoin's "Calculations" — the longest section).*

- 630 simulation runs across 3 campaigns, 3 regimes.
- Reputation improvement: +0.13% to +0.20% Brier (modest but consistent, p < 10⁻¹⁵).
- Capital distortion: up to −5.27% under extreme inequality (Regime B).
- Reputation separation ratio ~1.1x distinguishes good from bad agents.
- The binding constraint: ~10% reputation differential can't override 40x stake differential.
- Key figures: calibration plot, inequality sensitivity, reputation separation.
- Link to interactive simulation in the paper chat app — the reader can run it themselves.

---

## 13. Roadmap

*~1/3 page. Phased rollout.*

- **Phase 1 — Paper + Simulation:** Research paper submitted to D2 at Columbia Business School (May 2026). Interactive paper chat app live. Mechanism validated via simulation.
- **Phase 2 — scenius.blog MVP:** Curated contributors, SoundCloud data integration, weekly prediction cycles. Reputation accrual begins. ENS + Para wallet onboarding.
- **Phase 3 — Signal Licensing:** First integrations with catalog underwriters. Scenius-derived breakout probabilities consumed by actuarial models. Revenue stream established.
- **Phase 4 — Open Participation:** Expand beyond curated contributors. Reputation scores as the quality filter. API access for downstream consumers.

---

## 14. Conclusion

*One paragraph. Mirror the abstract with the fully developed argument.*

---

## References

*Compact. ~10–15 entries. Atanasov, Walden, Mulligan, MFI/Duetti, LMSR, proper scoring rules, SoundCloud data, etc.*

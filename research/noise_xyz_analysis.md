# Noise.xyz — Continuous Relevance Markets: Cross-Reference Analysis for Scenius

**Source:** [Noise Documentation](https://docs.noise.xyz/introduction)
**Platform:** noise.xyz
**Analysis Date:** April 11, 2026

---

## Platform Summary

Noise is a continuous trading platform for trend relevance. Users go long or short on cultural, tech, business, entertainment, and crypto trends with no expiry and no binary resolution. Markets run perpetually, with a funding rate mechanism that anchors trading prices to a real-world "Relevance Index" derived from social signal aggregation.

The platform settles on Base via a hybrid architecture: off-chain order matching, onchain settlement through smart contracts (SettlementEngine + PositionManager). Wallets are non-custodial, embedded via Privy with EIP-712 typed data signing. Users purchase non-refundable, non-redeemable "Credits" as in-app trading collateral. Leverage is fixed at 1x with isolated margin.

---

## Core Mechanism: The Relevance Index

Noise constructs a composite metric (displayed as e.g. "581.50 degrees") from two categories of data sources:

**Content sources** (X, Reddit, YouTube, Instagram, Substack, RSS):
- Engagement velocity: weighted sum of views, likes, shares, replies, quotes, bookmarks — tuned per platform
- Post volume: distinct content mentions
- Unique authors: distinct accounts posting, to distinguish genuine interest from coordinated/automated activity

**Signal sources** (prediction markets):
- Trading volume in related markets
- Market count indicating breadth of informed interest

### Computation

1. **Smoothing:** Raw metrics pass through exponential moving average filtering with a configurable half-life parameter per market
2. **Aggregation:** Smoothed values across all sources combine via weighted aggregation with configurable per-source, per-metric weights
3. **Normalization:** The composite Relevance Index is normalized against its own historical average to produce an Attention Factor centered at 1.0
4. **Oracle price:** Blends the Attention Factor with a normalized trading volume ratio (current volume / long-term average), updated every 1-3 seconds

### Funding Rate

Continuous per-second payments between longs and shorts:
- Mark price > oracle: longs pay shorts
- Mark price < oracle: shorts pay longs

This anchors trading activity to real-world relevance without hard-pegging the price. The funding rate combines mark/oracle deviation with order book imbalance signals and a clamped fixed interest component.

### Data Source Resilience

When a source fails, its contribution decays gradually rather than dropping to zero. The Relevance Index continues updating from active sources. This prevents single-source outages from causing discontinuous price shocks.

---

## Structural Comparison: Noise vs Scenius

| Dimension | Noise | Scenius |
|---|---|---|
| **Core question** | "How relevant is this trend right now?" | "Will this artist break out within the prediction horizon?" |
| **Market type** | Perpetual, continuous, no resolution | Binary, fixed horizon, resolved against SoundCloud delta |
| **Signal input** | Multi-platform social engagement (X, Reddit, YouTube, Instagram, Substack) + prediction market volume | SoundCloud API metrics (plays, followers, reposts) |
| **Signal output** | Oracle price (Attention Factor x Volume Ratio) | Reputation-weighted breakout probability |
| **Aggregation** | Capital-weighted order book (fair price = quantity-weighted mid-price) | Reputation-weighted: $p_j^R = \frac{\sum_i r_i s_{i,j} p_{i,j}}{\sum_i r_i s_{i,j}}$ |
| **Reputation system** | None | Core mechanism: EMA of Brier-scored accuracy, EAS-attested |
| **EMA usage** | Smoothing social signals (configurable half-life per market) | Smoothing reputation scores: $r_i = (1-\alpha) r_i + \alpha \exp(-\beta(p_{ij} - Y_j)^2)$ |
| **Chain** | Base (mainnet) | Base Sepolia (mainnet after human approval) |
| **Wallet** | Privy (embedded, EIP-712) | Para (passkey-based) |
| **Settlement** | Onchain via SettlementEngine + PositionManager smart contracts | Onchain via EAS attestations |
| **Currency** | Non-refundable Credits (in-app, not fiat) | Reputation score (non-monetary, accuracy-derived) |
| **Scope** | General trends: tech, culture, business, entertainment, crypto | Music-specific: SoundCloud artist breakout events |

---

## Overlap: Where the Systems Share Structure

### 1. EMA as Core Primitive

Both platforms use exponential moving averages as their fundamental smoothing mechanism, but on different inputs:

- **Noise:** EMA on raw social engagement metrics to reduce noise before aggregation. Half-life is configurable per market.
- **Scenius:** EMA on individual prediction accuracy to update reputation scores. $\alpha = 0.05$ (fixed smoothing factor).

The mathematical operation is identical. The insight is shared: recent observations should matter more than old ones, and the rate of decay should match the domain. Noise tunes half-life per market because trend relevance decays at different rates across domains. Scenius uses a fixed $\alpha$ because the reputation update cadence is tied to resolution events, not continuous signal.

### 2. Multi-Source Signal Aggregation

Noise aggregates signals across six content platforms plus prediction market data, with configurable per-source weights reflecting signal quality. Scenius currently relies on a single source (SoundCloud API).

This is a design pattern worth noting: Noise's weighted multi-source aggregation with graceful degradation on source failure is a more resilient architecture than single-source dependency.

### 3. Base L2

Both platforms settle on Base. Noise uses custom smart contracts (SettlementEngine, PositionManager). Scenius uses EAS. Same chain, different settlement patterns, but shared infrastructure assumptions about Base's throughput and cost profile.

### 4. Embedded Non-Custodial Wallets

Both use embedded wallet providers (Noise: Privy; Scenius: Para) to abstract away seed phrases and wallet management. Both sign transactions on behalf of users via server-side SDKs. The UX philosophy is identical: users participate in onchain activity without needing to understand wallets.

---

## What Scenius Could Borrow

### 1. Relevance Index as Complementary Prediction Context

Noise's multi-platform social signal aggregation (engagement velocity, post volume, unique authors across X/Reddit/YouTube/Instagram/Substack) could serve as contextual input for Scenius tastemakers when forming predictions. Today, tastemakers see only SoundCloud metrics. A social relevance signal — showing that an artist is generating cross-platform discussion velocity — would enrich the information environment without changing the core mechanism.

**Application:** If Noise exposes Relevance Index data via API (or if Scenius builds a similar multi-source aggregation), surface it alongside SoundCloud snapshots on prediction pages. Tastemakers make better predictions when they have richer context. The reputation mechanism still scores accuracy against SoundCloud-resolved outcomes — the additional context just reduces noise in the private signals.

**Constraint:** This does not change the resolution logic. SoundCloud delta remains the objective outcome measure. Social signal is context, not truth.

### 2. Graceful Source Degradation Pattern

Noise's approach to data source failure — gradual decay of contribution rather than abrupt dropout — is directly applicable to Scenius if the platform adds signal sources beyond SoundCloud. Even for the current single-source architecture, a similar pattern could handle SoundCloud API rate limiting or transient outages more gracefully in the snapshot service.

**Application:** In `app/domains/soundcloud/service/snapshot.ts`, if a snapshot fetch fails, the system could decay the weight of stale data in downstream computations rather than blocking resolution entirely. This is more relevant for the resolution service (`app/domains/resolution/`) where a missed snapshot shouldn't invalidate an entire prediction cycle.

### 3. Funding Rate as a Future Mechanism Option

If Scenius ever explores continuous markets alongside binary predictions — for example, a "live conviction" surface where tastemakers express ongoing belief in an artist's trajectory — Noise's funding rate design is a well-documented reference. The per-second accrual, the oracle anchor (Attention Factor x Volume Ratio), and the mark/oracle deviation-based rate are clean primitives.

**Application:** This is future work, not current scope. Binary resolution is what makes the Brier score work, which is what makes reputation meaningful. A continuous market would need a different scoring mechanism. But Noise demonstrates that the oracle-anchored funding rate pattern works for tying real-world signal to market prices without hard-pegging — a useful reference if Scenius expands beyond binary events.

### 4. Hybrid Settlement Architecture Reference

Noise's split between off-chain matching (speed) and onchain settlement (trust) on Base is the pattern Scenius would need if it graduates from attestation-only onchain presence to actual market settlement. The SettlementEngine (validates trade signatures, atomic settlement) and PositionManager (isolated margin, collateral) contract separation is a practical reference architecture.

**Application:** If Scenius moves toward onchain reputation staking or market settlement beyond EAS attestations, this two-contract pattern is a proven design on the same chain.

---

## What Does Not Apply

### 1. Capital-Weighted Price Discovery

Noise uses a standard order book with quantity-weighted mid-price. This is capital-weighted aggregation — the same mechanism the Design Spec and Kalshi analysis demonstrate is suboptimal for cultural markets:

$$p_j^C = \frac{\sum_i s_{i,j} p_{i,j}}{\sum_i s_{i,j}}$$

Noise has no reputation system. A wealthy participant with poor cultural instincts has the same market influence as an informed-but-capital-constrained tastemaker. The Kalshi analysis documents this exact failure mode in music markets: "sharks like Davies and Fean are only able to make as much money as they do if there are counterparties to lose to them." Noise inherits this structural weakness for any culturally-driven market.

### 2. Perpetual Markets (No Resolution)

Noise deliberately avoids resolution events. Markets run continuously with no binary outcome. This design choice removes the ability to score prediction accuracy — which means reputation cannot be computed from demonstrated skill. In Scenius's framework, resolution is not a bug to be designed away; it is the event that generates the ground truth needed for reputation scoring. Without resolution:
- No Brier score
- No reputation update
- No mechanism for distinguishing skilled tastemakers from lucky or wealthy ones

The Noise approach optimizes for liquidity and continuous engagement. The Scenius approach optimizes for calibrated signal quality. These are different objectives.

### 3. Credits as Non-Monetary Collateral

Noise's Credits are non-refundable, non-redeemable in-app currency. This sidesteps regulatory complexity but also eliminates real skin-in-the-game. Scenius's design uses reputation as the primary stake — which is non-monetary but carries real consequences (influence on future markets, visible track record, EAS-attested history). Reputation has properties Credits lack: it is earned, not purchased; it compounds with accuracy; it is publicly verifiable onchain.

### 4. General Trend Coverage

Noise covers trends across tech, culture, business, entertainment, and crypto. Scenius's moat is music-specific domain depth built on SoundCloud's pre-breakout signal environment. Broadening to general trends would dilute the information advantage that makes reputation-weighted aggregation outperform capital-weighted aggregation. The research demonstrates that reputation weighting matters most under heavy-tailed outcome distributions with heterogeneous private signals — conditions specific to cultural markets, not general trend tracking.

### 5. Leverage and Liquidation Mechanics

Noise includes margin management, three-stage liquidation, and leverage infrastructure. These are trading platform primitives irrelevant to a reputation-weighted prediction market. Scenius participants stake reputation, not leveraged capital.

---

## Positioning: Where Noise Sits in the Competitive Landscape

The Kalshi analysis identified Scenius's competitive position against capital-weighted prediction markets. Noise occupies a third position:

| Platform | Mechanism | Resolution | Reputation | Signal Consumer |
|---|---|---|---|---|
| **Kalshi** | Binary event contracts, capital-weighted | Yes (binary outcome) | None | Retail traders, some institutional monitoring |
| **Noise** | Perpetual relevance markets, capital-weighted | None (continuous) | None | Traders seeking trend exposure |
| **Spotify voting** | Fan polls, equal-weighted | None (engagement metric) | None | Internal editorial/playlist curation |
| **Scenius** | Binary breakout predictions, reputation-weighted | Yes (SoundCloud delta) | Core mechanism (EMA Brier, EAS-attested) | Catalog buyers, labels, A&R teams |

Noise validates market demand for cultural signal trading but does not solve the aggregation quality problem. Like Kalshi, it produces a capital-weighted price. Unlike Kalshi, it avoids resolution — which means it cannot even begin to measure whether its prices were accurate. Scenius is the only architecture in this landscape that resolves predictions, scores accuracy, compounds reputation, and produces calibrated probabilities usable as financial inputs.

---

## Key Takeaway

Noise demonstrates that continuous social signal aggregation via EMA smoothing, multi-source weighted composites, and oracle-anchored funding rates is a viable production architecture on Base. These are engineering patterns Scenius can reference. But Noise's mechanism design — capital-weighted, no resolution, no reputation — is precisely the design the Scenius research argues against. The platforms share infrastructure assumptions (Base, embedded wallets, EMA smoothing) but diverge completely on the question that matters: does accuracy compound into influence? Noise says no. Scenius says that is the entire innovation.

---

## Key References

- [Scenius Design Spec](./Scenius_Design_Spec.md) — Mathematical specification of reputation-weighted mechanism
- [Kalshi / Rolling Stone Analysis](./kalshi_rolling_stone_analysis.md) — Capital-weighted failure modes in music prediction markets
- [Walden / Variant Fund Analysis](./walden_variant_markets_analysis.md) — Markets as APIs thesis; Scenius as micro-mechanism correction
- [Product Positioning](./product_positioning_blog_soundcloud.md) — Three-layer architecture (blog + prediction + reputation)

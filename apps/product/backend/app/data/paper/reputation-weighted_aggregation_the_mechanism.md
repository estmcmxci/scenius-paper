## 4. Reputation-Weighted Aggregation — The Mechanism

This is the core innovation. Three aggregation mechanisms map individual beliefs to a single consensus probability for each event:

**Equal-weighted (E).** The unweighted crowd average:

$$\bar{p}_j = \frac{1}{N} \sum_{i=1}^{N} p_{i,j}$$

One person, one vote. This is Spotify's model. It ignores both capital and track record.

**Capital-weighted (C).** Each belief is weighted by stake:

$$p_j^C = \frac{\sum_{i=1}^{N} s_i \, p_{i,j}}{\sum_{i=1}^{N} s_i}$$

One dollar, one vote. This is the mechanism implicit in every existing prediction market — Polymarket, Kalshi, all of them. Influence is proportional to capital, with no use of past accuracy.

**Reputation-weighted (R).** Each belief is weighted by the product of stake and learned reputation:

$$p_j^R = \frac{\sum_{i=1}^{N} r_i \, s_i \, p_{i,j}}{\sum_{i=1}^{N} r_i \, s_i}$$

Influence scales with demonstrated accuracy. The multiplicative form $r_i \cdot s_i$ preserves skin-in-the-game while introducing a corrective factor based on track record.

### Three regimes

The wealth-skill relationship determines when capital-weighting helps versus hurts:

- **Regime A (Uncorrelated).** Stakes are random relative to skill. Wealth carries no information.
- **Regime B (Anti-correlated).** The best forecasters are the least capitalized. This is the structural reality of cultural markets — tastemakers in Lagos, São Paulo, or SoundCloud comment sections have signal but not capital.
- **Regime C (Correlated).** The wealthiest participants are also the most skilled. This is the best case for capital-weighting.

### Results

Reputation-weighted aggregation improves over capital-weighted in all three regimes. The improvement ranges from +0.13% to +0.20% in Brier score, with $p < 10^{-15}$ across all tests. It is modest in absolute magnitude but consistent, statistically unambiguous, and present in every tested configuration.

Capital-weighting degrades forecast quality when wealth does not correlate with skill: -0.83% in Regime A, -1.21% in Regime B. Only in Regime C, where whales are predominantly skilled, does capital-weighting help (+1.88%).

There is no tested configuration in which reputation-weighting degrades performance. It is safe to adopt even when capital already correlates with skill. Methodology, assumptions, and interactive exploration are documented in the [research paper](https://research-paper-chat.vercel.app).

### The binding constraint — stated honestly

The multiplicative architecture is the central limitation. The mechanism achieves a reputation separation ratio of $1.105\times$ — good agents accumulate roughly 10% higher reputation than bad agents. But consider two agents under extreme inequality:

- A *consistently accurate* small agent: reputation 0.89, stake 0.5 → effective weight **0.45**
- A *consistently noisy* whale: reputation 0.80, stake 20 → effective weight **16.0**

The noisy whale exerts 36x more influence despite the mechanism correctly identifying them as a poor forecaster. A ~10% reputation differential cannot override a 40x stake differential. The mechanism knows who is good. It lacks the architectural authority to act proportionally on that knowledge.

This is not hidden. It is the most important finding in the research and the clearest motivation for alternative weighting architectures — reputation-only ($w_i = r_i$) or log-scaled stakes ($w_i = r_i \cdot \log(1 + s_i)$) — that give demonstrated accuracy greater authority relative to raw capital.

---

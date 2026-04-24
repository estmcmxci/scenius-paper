# Scenius: A Reputation-Weighted Prediction Market for Music Catalog Pricing

**estmcmxci.eth**
Trece Research, New York City

February 2026

---

## Abstract

Young music catalogs trade at a uniform discount because backward-looking data cannot distinguish future breakouts from one-hit wonders — yet the people closest to the music already know. Scenius is a reputation-weighted prediction market that captures this forward-looking conviction and makes it legible to catalog buyers. Participants predict binary breakout events on a weekly resolution cycle; their influence in the market scales with demonstrated accuracy, not capital. Reputation-weighted aggregation consistently outperforms both equal-weighted and capital-weighted mechanisms across all wealth-skill regimes ($p < 10^{-15}$, 630 simulation runs). The implementation is built on SoundCloud's discovery infrastructure, ENS-based portable identity, and passkey-embedded wallets for non-crypto-native participants. The resulting signal — calibrated breakout probabilities for individual artists — can be licensed directly to actuarial pricing models, compressing the uncertainty discount where institutional data does not yet exist.

---

## 1. Introduction — The Pricing Problem

The [Music Finance Index](https://www.duetti.co/music-finance-index), published by Duetti and Billboard, applies a uniform 3.2x revenue multiple to all 2–5 year publishing catalogs. Within that tier, the variance is enormous. Some of those artists will 10x. Most will decay. The spread between the generic 3.2x and what a specific catalog is actually worth is unexploited alpha.

The MFI data itself reveals where the opportunity concentrates. Sub-$1M deals show the strongest momentum at +61% net positive. Emerging regions — Latin America (+67%), India, Middle East and Africa — are leading volume expectations. These are precisely the segments with the least institutional data coverage and the highest information asymmetry. The alpha is largest where the data is thinnest.

Music moves fast. Approximately 106,000 new tracks hit streaming services every day. New releases drop every Friday. First-week performance is a primary signal. The market operates at weekly cadence, but the pricing infrastructure operates at annual cadence — trailing 12-month revenue, smooth decay curves, comparable transaction multiples. The mismatch is structural.

Backward-looking data cannot solve this. Trailing revenue tells you what already happened. It cannot distinguish an artist at the inflection point between obscurity and breakout from an artist who has peaked. The MFI acknowledges this directly: the revenue multiple is "a useful shorthand, but is inherently incomplete."

Forward-looking signal exists. Tastemakers in local scenes — curators, early fans, A&R scouts, niche community members — already know which artists are about to break out. But no mechanism captures that conviction in a structured, verifiable, composable form. Spotify's New Music Friday biases toward signed acts; by the time an artist hits NMF, the discovery already happened upstream. Algorithmically generated playlists measure what already has traction. They do not predict what will.

Spotify itself recognizes the demand for forward-looking conviction. In February 2026, it launched [Hip-Hop's Next Leaders](https://newsroom.spotify.com/2026-02-25/leaders-next-generation-hip-hop/) — a RapCaviar campaign where fans vote daily on which of eight artists will "define hip-hop this decade." Billboards in major cities. Daily in-app voting. This is structurally identical to an equal-weighted prediction market. But every fan gets one vote regardless of track record. A first-time listener and someone who called Doechii in 2022 carry the same weight. Equal-weighted aggregation is the weakest form of information aggregation.

SoundCloud is where discovery happens before the label system captures it. Curator graphs, repost networks, pre-breakout audience formation — the upstream signal environment where tastemaker behavior is already legible. That is where the mechanism needs to live.

---

## 2. The Signal — What a Prediction Is

An "electronic coin" in Bitcoin is a chain of digital signatures. A "prediction" in Scenius is a calibrated probability estimate on a binary breakout event.

Each track in the market has a latent quality $q_j$ — some hidden underlying breakout potential that no one directly observes but that drives whether it succeeds. In cultural markets, most tracks get tiny traction and a small number explode massively. The biggest winners are orders of magnitude larger than the median. This is a heavy-tailed distribution, modeled as:

$$q_j \sim \text{Pareto}(\alpha) + 1$$

The latent quality maps to a true breakout probability through a sigmoid transform:

$$\theta_j = \sigma(\beta \log q_j + b)$$

where $\sigma(x) = 1/(1 + e^{-x})$ is the logistic function. The logarithmic compression is essential — without it, the Pareto's heavy tail would collapse most probabilities to 0 or 1, eliminating the interesting forecasting problem.

Tastemakers do not see the true breakout probability. They see a noisy version of it. Each tastemaker $i$ receives a private signal in log-odds space:

$$x_{i,j} = \text{logit}(\theta_j) + \epsilon_{i,j}, \quad \epsilon_{i,j} \sim \mathcal{N}(0, \sigma_i^2)$$

Some tastemakers are better than others. A good tastemaker ($\sigma_i = 0.6$) produces beliefs tightly clustered around the truth. A bad tastemaker ($\sigma_i = 1.6$) produces beliefs wide enough to be nearly uninformative on any individual round. Their belief is:

$$p_{i,j} = \sigma(x_{i,j})$$

The market question is binary: *Will this track exceed $\tau$ cumulative streams within 1 week?* Resolution matches the pace of the market — weekly drops, weekly resolution. Fast cycles mean reputation compounds quickly. More resolution events produce faster signal separation between accurate and inaccurate forecasters.

---

## 3. Reputation — The Scoring Loop

Reputation is the building block everything else rests on. After each round, the binary outcome $Y_j \sim \text{Bernoulli}(\theta_j)$ resolves, and each agent's reputation updates:

$$r_i \leftarrow (1 - \lambda) \, r_i + \lambda \exp\!\big(-k (p_{i,j} - Y_j)^2\big)$$

This has three components:

**Exponential credit.** $\exp(-k(p_{i,j} - Y_j)^2)$ produces a score in $(0, 1]$. Close to the outcome: credit near 1. Far from the outcome: credit decays exponentially toward 0. The parameter $k = 5$ controls the sharpness.

**EMA smoothing.** $\lambda = 0.05$ means 95% of the weight is on the agent's history. Reputation is a slow-moving, stable summary of past performance. A single lucky or unlucky round cannot dominate the signal.

**Initialization at unity.** All agents start with $r_i = 1$. The mechanism has no prior information about who is good. It must learn the quality differential from data.

The exponential credit function is closely related to the Brier score — both measure squared error between prediction and outcome. This connection to proper scoring rules ensures that agents maximize their expected reputation by reporting truthfully. Reputation is not gamed by hedging or strategic misreporting. It is earned by being right, consistently, over time.

The result is a portable track record tied to an identity. Good forecasters compound. Bad forecasters decay. Over hundreds of rounds, the mechanism separates the two — reliably, endogenously, and without any external labels about who is skilled.

---

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

## 5. The Market — How It Runs

A campaign is a set of binary prediction events with defined resolution criteria and a fixed time horizon. The structure:

1. **Artists surface.** Tracks enter the market from SoundCloud's upstream discovery layer — curator reposts, early listener clusters, pre-breakout audience formation.
2. **Tastemakers predict.** Participants express calibrated probabilities on whether each track will exceed a streaming threshold within one week. The prediction is quantified conviction — not a like, not a vote, but a probability backed by reputation stake.
3. **Outcomes resolve.** The streaming threshold is objective. Either the track crossed the threshold or it did not. The oracle is on-chain verifiable: a deterministic function of publicly available streaming data.
4. **Reputation updates.** Accurate forecasters compound. Inaccurate forecasters decay. The cycle repeats weekly.

SoundCloud is the infrastructure layer. It has the early listening data, the curator graphs, the repost networks, and the pre-breakout audience signals. Scenius is an application built on SoundCloud — consuming its data as an API input, weighting it by demonstrated accuracy, and outputting reputation-weighted breakout probabilities that catalog buyers can act on. SoundCloud does not need to change anything. Scenius makes their data more valuable.

---

## 6. Incentive — Why Tastemakers Participate

Reputation is the incentive. Not just capital returns — a portable, compounding track record tied to your identity. Your ENS name becomes your public record of demonstrated taste. Not one early call, but a pattern of calibrated prediction across hundreds of events.

Jesse Walden (Variant Fund) argues that "[invest in what you know](https://x.com/jessewldn/status/2022291132080644339#:~:text=invest%20in%20what%20you%20know)" is increasingly possible as permissionless markets expand access to economic upside. A kid who understands TikTok trends knows memes better than Citadel. A gamer in a virtual economy knows it better than a gaming analyst. Scenius makes this structural: lived experience in a music scene becomes a quantifiable, composable asset — not through capital allocation, but through demonstrated predictive accuracy.

The three-sided market:

- **Tastemakers** earn reputation by being right. Accuracy compounds into influence and, eventually, into a signal that downstream buyers pay for.
- **Catalog buyers** get forward-looking price signals. Instead of relying on trailing revenue or gut-feel A&R calls, they can read a market that aggregates the conviction of people with proven track records.
- **Artists** get repriced from the uniform 3.2x when the crowd is right. An artist with a Scenius-derived breakout probability of 0.35 — backed by forecasters with demonstrated accuracy — might warrant a 5x or 6x multiple instead of the generic 3.2x. Not because their history is longer, but because the people with proven taste are saying the future trajectory is stronger than the base rate.

Writers get paid for accuracy, not attention. This reverses the economic model that killed music journalism. Traditional music journalism died because attention could not be monetized sustainably. Scenius changes the underlying economics: your attention is not the product — your *accuracy* is.

---

## 7. Distribution — The Surface Layer

scenius.blog is the discovery and media layer. It is a callback to the blog era — Pigeons & Planes, 2DopeBoyz, Gorilla vs. Bear — when independent curators were the primary pipeline for emerging talent, before algorithmic playlists absorbed that function.

The blog era died because the economic model underneath it could not sustain narrative-driven discovery. Curation became frictionless, invisible, and automated. There are no new music journalists because the platform layer killed the business model for the old ones. scenius.blog brings journalism back by changing the economic model underneath it. Writers do not get paid for pageviews. They get paid for being right.

At launch, contributors are curated — invited writers with demonstrated taste who stake their reputation by publishing on artists they believe will break out. The writing *is* the market participation. The narrative *is* the prediction.

Readers can co-sign — staking their own reputation on an artist a writer has surfaced. Two tiers of participation: curators who originate signal, and readers who amplify it. The funnel:

1. **Read** — Discover artists through narrative.
2. **Co-sign** — Stake reputation on who breaks out.
3. **Earn** — Compound reputation from accuracy.

The blog is the discovery surface. The prediction market is the backend. Media is distribution. Reputation is the product.

---

## 8. Identity — Portable Reputation

Reputation is only valuable if it travels. Scenius identity is built on two primitives:

**ENS names** serve as human-readable, portable reputation identifiers. Your reputation score, prediction history, and track record are tied to your ENS name — not locked inside a proprietary platform database. Any application that reads ENS can read your reputation. It is composable by default.

**Para embedded wallets** handle onboarding. Passkey-based authentication — no seed phrase, no MetaMask popup, no browser extension. The wallet layer is invisible. Non-crypto-native participants — A&Rs, curators, scouts, music journalists — never see the wallet. They see a login screen. The blockchain infrastructure is underneath, but the user experience is a blog with a reputation score.

Reputation travels with the address. If a new platform emerges that reads Scenius reputation scores, your track record is already there. You do not start from zero. This is the difference between reputation locked inside Spotify's recommendation engine (proprietary, opaque, non-portable) and reputation stored on a public ledger (verifiable, composable, owned by the forecaster).

---

## 9. Markets as APIs — The Output

Walden argues that markets are evolving from discrete venues into programmable endpoints that produce real-time, costly-to-fake information consumable by applications and agents. Onchain markets are permissionless, composable, global, and use standardized interfaces. Coinbase calls Morpho vaults for lending rates. Polymarket odds appear at the Golden Globes. Apple's Clean Energy Charging consumes grid carbon data.

Scenius is the next instance of this pattern. The market produces a calibrated breakout probability backed by adversarial competition among participants risking reputation. That probability is a programmable endpoint — a signal any downstream system can consume.

The concrete application: actuarial models like Duetti's MFI can ingest the Scenius signal directly. Instead of applying a uniform 3.2x to all young catalogs, the MFI can weight by Scenius-derived breakout probability for individual artists. A catalog with a Scenius probability of 0.35 gets repriced upward. A catalog with a probability of 0.04 stays at the floor. The gap between 3.2x and 8.7x does not disappear — it just stops being applied blindly to every young catalog.

**The revenue stream is data licensing.** Scenius licenses the signal to catalog underwriters. The data feed is the business model — not transaction fees, not a token. The value proposition to underwriters is direct: you are currently making acquisition decisions with a uniform 3.2x applied to all young catalogs. We produce individual-level breakout probabilities from forecasters with demonstrated track records. The signal is structured, calibrated, and available as an API endpoint.

Walden says markets are becoming APIs. Scenius says those APIs need reputation-weighted aggregation to produce accurate signals in cultural domains.

---

## 10. Competitive Landscape

The existing music data stack has two modes:

**Algorithmic, top-down.** Chartmetric ingests streaming and social data, scoring artists using proprietary models. Sodatone (acquired by Warner Music Group) screens 40,000 daily uploads for breaking patterns. Both are backward-looking by construction — they measure what already happened. Neither produces forward-looking conviction. Neither connects discovery signals to catalog valuation.

**Actuarial, backward-looking.** Duetti's MFI prices catalogs using trailing revenue multiples and comparable transactions. Xposure Music uses AI-based catalog pricing trained on historical trends. Both work well for mature catalogs with years of data. Both are structurally blind to inflection points. They can tell you the decay curve; they cannot tell you the breakout probability.

**Equal-weighted polls.** Spotify's voting primitives (Hip-Hop's Next Leaders, February 2026) capture forward-looking conviction but do not weight by accuracy. Popularity contests, not information markets.

Scenius is none of these. It is a net new signal class — not algorithmic top-down, not actuarial backward-looking, not an unweighted poll. Forward-looking human conviction with demonstrated accuracy. The closest analogy: Chartmetric is quantitative analysis (screens for breakout patterns in data). Scenius is fundamental analysis (calibrated human judgment about what is going to break out and why). Both are valuable. Nobody is doing the latter systematically.

This is not a stopgap until institutional data catches up. Even when Luminate improves coverage in India and Spotify penetrates deeper into MEA, consumption data will always be backward-looking. It tells you what already happened. Scenius produces forward-looking conviction from people with demonstrated taste. These are complementary, not substitutable. Trailing streams tell you the decay curve; Scenius tells you the breakout probability. No amount of historical data will ever replace the signal that comes from the people in the scene who know what is next.

Scenius is a net new signal class — and a permanently different one.

---

## 11. Privacy

What is public:
- Reputation scores
- Aggregate market probabilities
- Prediction history (tied to ENS)

What is private:
- Individual position sizes
- Personal identity behind the ENS name (pseudonymous by default)

The trade-off is stated honestly: reputation portability requires public track records. A reputation score is only valuable if downstream consumers can verify it. Participants opt into legibility — they choose to make their track record readable in exchange for the compounding value of demonstrated accuracy. The ENS name is pseudonymous. The track record is public. The person behind it is private unless they choose otherwise.

---

## 12. Results

The mechanism was validated through Monte Carlo simulation: 630 total runs across three experimental campaigns. All three aggregation mechanisms — equal-weighted, capital-weighted, and reputation-weighted — observe the same private signals and the same realized outcomes on every round. Performance differences are attributable solely to the weighting rule.

### Campaign 1: Main Results

Three wealth-skill regimes at default parameters ($\alpha = 1.7$, $\sigma_{\text{good}} = 0.6$, $\sigma_{\text{bad}} = 1.6$, $\sigma_s = 1.0$, $J = 5{,}000$ rounds, $n = 30$ seeds per regime).

| Regime | Metric | R vs C (%) | 95% CI | p-value | C vs E (%) | Rep Sep |
|--------|--------|-----------|--------|---------|-----------|---------|
| A: Uncorrelated | Brier | +0.155 | [+0.143, +0.166] | $1.2 \times 10^{-21}$ | -0.834 | 1.105x |
| A: Uncorrelated | LogLoss | +0.152 | [+0.141, +0.162] | $4.1 \times 10^{-22}$ | -0.586 | 1.105x |
| B: Anti-correlated | Brier | +0.138 | [+0.123, +0.156] | $4.8 \times 10^{-16}$ | -1.213 | 1.105x |
| B: Anti-correlated | LogLoss | +0.132 | [+0.117, +0.148] | $2.4 \times 10^{-16}$ | -0.925 | 1.105x |
| C: Correlated | Brier | +0.145 | [+0.134, +0.156] | $3.5 \times 10^{-21}$ | +1.881 | 1.105x |
| C: Correlated | LogLoss | +0.170 | [+0.161, +0.180] | $3.5 \times 10^{-25}$ | +2.191 | 1.105x |

Reputation outperforms capital in all three regimes. The 95% confidence intervals are entirely above zero in every case. Capital-weighting degrades forecasts in Regimes A and B (the "C vs E" column is negative — capital makes it worse). Only in Regime C, where wealth already proxies for skill, does capital-weighting help.

### Campaign 2: Parameter Sensitivity

Sweep over tail heaviness ($\alpha \in \{1.3, 1.7, 2.5\}$) and noise gap ($\Delta\sigma \in \{0.5, 1.0, 1.5\}$) for Regimes A and B. 18 configurations, 10 seeds each.

The reputation advantage scales monotonically with the noise gap: from approximately +0.01% at $\Delta\sigma = 0.5$ to +0.50% at $\Delta\sigma = 1.5$. When there is more skill heterogeneity to exploit, the reputation mechanism extracts more value from it. The advantage also scales with tail heaviness — lighter tails produce a cleaner signal-to-noise ratio in the reputation update, and the mechanism learns faster.

Across all 36 cells (2 regimes $\times$ 3 $\alpha$ $\times$ 3 noise gaps $\times$ 2 metrics), the point estimate is non-negative in every case. There is no parameter configuration where reputation-weighting is harmful.

### Campaign 3: Inequality Sensitivity

Sweep over stake dispersion ($\sigma_s$ from 0.0 to 2.0) for Regimes A and B. 18 configurations, 20 seeds each.

| $\sigma_s$ | Gini | C vs E (%) | R vs C (%) | Recovery |
|------------|------|-----------|-----------|----------|
| 0.00 | 0.00 | 0.000 | +0.134 | — |
| 0.25 | 0.13 | -0.103 | +0.131 | >100% |
| 0.50 | 0.25 | -0.281 | +0.130 | 46% |
| 0.75 | 0.37 | -0.580 | +0.131 | 23% |
| 1.00 | 0.47 | -1.068 | +0.137 | 13% |
| 1.25 | 0.55 | -1.807 | +0.146 | 8% |
| 1.50 | 0.63 | -2.802 | +0.155 | 6% |
| 1.75 | 0.69 | -3.988 | +0.162 | 4% |
| 2.00 | 0.73 | -5.265 | +0.165 | 3% |

This table is the most important result in the paper. It shows two things simultaneously:

1. **Capital-weighting gets worse as inequality increases.** The distortion goes from 0% to -5.27% monotonically. At extreme concentration (Gini 0.73 — comparable to crypto wealth distributions), the capital-weighted forecast is 5.27% worse than simply averaging everyone equally.

2. **Reputation helps, but cannot keep up.** The R-vs-C improvement grows from +0.134% to +0.165% — a 23% increase. But the distortion grows from 0% to -5.27% — over two orders of magnitude. Recovery collapses from 46% at moderate inequality to 3% at extreme inequality.

The reputation correction grows with inequality. But it grows far more slowly than the damage it corrects. The binding constraint is the multiplicative architecture: reputation scales the stake but cannot replace it. A noisy whale's influence has a floor determined by their stake, regardless of how poor their track record becomes.

Reputation separation is invariant to stake dispersion — $1.107\times$ across all 9 values of $\sigma_s$ and both regimes, to machine precision (the slight difference from the $1.105\times$ in Campaign 1 reflects different seed counts — 30 vs. 20 — not a change in mechanism behavior). The learning works. The architecture is the bottleneck.

### Figures

- **Figure 1: Calibration plot.** All three mechanisms compared under Regime B. Each point shows observed breakout frequency within a predicted-probability bin. All three are well-calibrated; the reputation-weighted curve tracks the 45-degree diagonal most closely.
- **Figure 2: Inequality sensitivity.** Two panels: (a) reputation advantage grows with inequality; (b) capital distortion worsens monotonically. The reputation correction in (a) grows far more slowly than the distortion in (b).
- **Figure 3: Reputation separation.** Final reputation scores for good vs. bad agents after 5,000 rounds. The mechanism achieves a $1.107\times$ separation ratio, correctly identifying agent quality.

The full interactive simulation is available in the [paper chat application](https://research-paper-chat.vercel.app), where readers can explore the results, run parameter sweeps, and interrogate the data directly.

---

## 13. Roadmap

**Phase 1 — Paper + Simulation.** Research paper submitted to D2 (Designing DeFi) at Columbia Business School, May 2026. Interactive paper chat application live. Mechanism validated via Monte Carlo simulation across 630 runs. Applied to ETHGlobal Spotlight.

**Phase 2 — scenius.blog MVP.** Curated contributors with demonstrated taste. SoundCloud data integration for upstream discovery signals. Weekly prediction cycles with objective resolution criteria. Reputation accrual begins. ENS + Para wallet onboarding — passkey-based, no seed phrase.

**Phase 3 — Signal Licensing.** First integrations with catalog underwriters. Scenius-derived breakout probabilities consumed by actuarial pricing models. Revenue stream established through data licensing — not transaction fees, not a token.

**Phase 4 — Open Participation.** Expand beyond curated contributors. Reputation scores serve as the quality filter — anyone can participate, but influence scales with demonstrated accuracy. API access for downstream consumers. The market becomes infrastructure.

---

## 14. Conclusion

Young music catalogs trade at a uniform discount because no mechanism exists to capture forward-looking conviction from the people closest to the music. The MFI prices the category; Scenius prices the individual. Through reputation-weighted aggregation, demonstrated accuracy — not capital — determines influence over the consensus forecast. The mechanism is consistent: it improves calibration across all wealth-skill regimes, all parameter configurations, and all inequality levels. The mechanism is safe: there is no tested configuration in which it degrades performance. The mechanism is honest about its limitation: a ~10% reputation differential cannot override a 40x stake differential under the multiplicative architecture, and this motivates the next generation of weighting designs. The signal it produces — calibrated breakout probabilities from forecasters with proven track records — is a permanently different kind of signal, complementary to but not substitutable for backward-looking consumption data. The spread between the generic 3.2x and what a specific catalog is actually worth is the alpha. Scenius is the mechanism that captures it.

---

## References

Atanasov, P., Rescober, P., Stone, E., Swift, S. A., Servan-Schreiber, E., Tetlock, P., Ungar, L., & Mellers, B. (2017). Distilling the wisdom of crowds: Prediction markets vs. prediction polls. *Management Science*, 63(3), 691–706.

Brier, G. W. (1950). Verification of forecasts expressed in terms of probability. *Monthly Weather Review*, 78(1), 1–3.

Budescu, D. V. & Chen, E. (2015). Identifying expertise to extract the wisdom of crowds. *Management Science*, 61(2), 267–280.

Duetti & Billboard. (2026). Music Finance Index, H1 2026. https://www.duetti.co/music-finance-index

Elberse, A. (2013). *Blockbusters: Hit-making, Risk-taking, and the Big Business of Entertainment*. Henry Holt.

Eno, B. (2009). Scenius, or communal genius. Edge.org.

Gneiting, T. & Raftery, A. E. (2007). Strictly proper scoring rules, prediction, and estimation. *Journal of the American Statistical Association*, 102(477), 359–378.

Hanson, R. (2007). Logarithmic market scoring rules for modular combinatorial information aggregation. *Journal of Prediction Markets*, 1(1), 3–15.

Manski, C. F. (2006). Interpreting the predictions of prediction markets. *Economics Letters*, 91(3), 425–429.

Mellers, B., Stone, E., Atanasov, P., et al. (2015). Identifying and cultivating superforecasters as a method of improving geopolitical forecasts. *Perspectives on Psychological Science*, 10(3), 267–281.

Spotify Newsroom. (2026). Hip-Hop's Next Leaders. https://newsroom.spotify.com/2026-02-25/leaders-next-generation-hip-hop/

Taleb, N. N. (2020). *Statistical Consequences of Fat Tails*. STEM Academic Press.

Walden, J. (2026). Finance as horizontal substrate. Variant Fund Blog. https://www.variant.fund/

Wolfers, J. & Zitzewitz, E. (2004). Prediction markets. *Journal of Economic Perspectives*, 18(2), 107–126.

Wolfers, J. & Zitzewitz, E. (2006). Interpreting prediction market prices as probabilities. NBER Working Paper 12200.

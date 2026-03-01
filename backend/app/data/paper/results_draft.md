# Results — Draft for Review

## V. Results

### V-A. Main Results: Three Wealth--Skill Regimes

Table II presents the core results across all three wealth--skill correlation regimes at default parameters ($\alpha = 1.7$, $\sigma_{\text{good}} = 0.6$, $\sigma_{\text{bad}} = 1.6$, $\sigma_s = 1.0$, $J = 5{,}000$, $n = 30$ seeds).

**Table II: Reputation vs Capital Improvement Across Wealth--Skill Regimes**

| Regime | Metric | R vs C (%) | 95% CI | $p$-value | C vs E (%) | Rep Sep |
|---|---|---|---|---|---|---|
| A: Uncorrelated | Brier | +0.155 | [+0.143, +0.166] | $1.2 \times 10^{-21}$ *** | −0.834 | 1.105× |
| A: Uncorrelated | LogLoss | +0.152 | [+0.141, +0.162] | $4.1 \times 10^{-22}$ *** | −0.586 | 1.105× |
| B: Anti-correlated | Brier | +0.138 | [+0.123, +0.156] | $4.8 \times 10^{-16}$ *** | −1.213 | 1.105× |
| B: Anti-correlated | LogLoss | +0.132 | [+0.117, +0.148] | $2.4 \times 10^{-16}$ *** | −0.925 | 1.105× |
| C: Correlated | Brier | +0.145 | [+0.134, +0.156] | $3.5 \times 10^{-21}$ *** | +1.881 | 1.105× |
| C: Correlated | LogLoss | +0.170 | [+0.161, +0.180] | $3.5 \times 10^{-25}$ *** | +2.191 | 1.105× |

*R vs C: positive = reputation outperforms capital. C vs E: positive = capital improves over equal-weighting; negative = capital degrades.*

**Finding 1: Reputation-weighted aggregation improves over capital-weighted aggregation in all three regimes, though the effect is modest in absolute magnitude.** The R-vs-C improvement is positive and highly statistically significant ($p < 10^{-15}$) across all six tests (3 regimes × 2 metrics), with 95% confidence intervals entirely above zero. The improvement ranges from +0.14% to +0.16% in Brier score (+0.13% to +0.17% across both metrics) — a consistent but small correction. This result holds regardless of whether wealth correlates with skill, is independent of it, or inversely correlates with it.

**Finding 2: Capital-weighting degrades forecast quality when wealth does not positively correlate with skill.** The C-vs-E column reveals the directional effect of capital-weighting relative to equal-weighting. In Regime A (uncorrelated), capital-weighting reduces Brier accuracy by 0.83% — introducing noise by randomly overweighting some agents and underweighting others. In Regime B (anti-correlated), the degradation is more severe at 1.21% — capital-weighting systematically amplifies the influence of noisy agents. Only in Regime C (correlated), where whales are predominantly skilled, does capital-weighting help (+1.88% Brier). Notably, the capital distortion in Regimes A and B is 5--9× larger in magnitude than the reputation correction, foreshadowing a key limitation explored in Section V-C.

**Finding 3: Reputation-weighting never underperforms capital-weighting, but provides only a partial correction.** Regime C is the best-case scenario for capital-weighting — wealth already proxies for skill, and capital-weighted aggregation outperforms equal-weighted by nearly 2%. Even here, reputation-weighted aggregation further improves over capital-weighted by +0.145% (Brier) and +0.170% (LogLoss), both with $p < 10^{-20}$. There is no tested configuration in which reputation-weighting degrades performance. However, the magnitude of the reputation correction (+0.13--0.17%) is an order of magnitude smaller than the capital distortion it corrects in Regimes A and B (−0.83% to −1.21%). This asymmetry is structural, not incidental: because the reputation-weighted forecast is $p^R = \sum r_i s_i p_i / \sum r_i s_i$, each agent's influence is *bounded below by their stake*. Reputation can modulate stake — scaling it up or down by a small factor — but cannot override it. A consistently accurate minnow accumulates high reputation, yet their effective weight $r_i \cdot s_i$ remains small when $s_i$ is small. Reputation-weighting is safe to adopt but is not a full remedy for capital-weighting pathologies under this multiplicative architecture.

**Finding 4: Reputation separation is invariant to the wealth structure.** The mechanism achieves a reputation separation ratio of 1.105× in the main results (good agents accumulate ~10% higher reputation than bad agents) identically across all three regimes. This confirms that the reputation learning rule identifies agent quality from forecasting accuracy alone, independent of agents' stake levels. Whether a good agent is a whale (Regime C) or a minnow (Regime B), they still make better predictions and accumulate proportionally more reputation. However, the modest separation ratio of 1.105× also explains the modest effect sizes: a ~10% reputation differential can only partially offset stake differentials between agents.

*[Figure: Bar chart showing absolute Brier/LogLoss for Equal, Capital, Reputation across three regimes. Figure: Bar chart showing R-vs-C improvement by regime with error bars.]*

### V-B. Parameter Sensitivity

To assess robustness beyond the default parameter setting, we sweep over $\alpha \in \{1.3, 1.7, 2.5\}$ (tail heaviness) and noise gap $\Delta\sigma \in \{0.5, 1.0, 1.5\}$ (signal heterogeneity) for Regimes A and B ($J = 2{,}000$, $n = 10$ seeds per cell).

**Finding 5: The reputation advantage scales monotonically with the noise gap.** As the difference between good and bad agent precision increases from $\Delta\sigma = 0.5$ to $\Delta\sigma = 1.5$, the R-vs-C Brier improvement grows from approximately +0.01% (often non-significant at $\Delta\sigma = 0.5$) to +0.50% ($p < 10^{-5}$ at $\Delta\sigma = 1.5$). This scaling is smooth and monotonic across all tested $\alpha$ values and both regimes. The interpretation is straightforward: when there is more skill heterogeneity to exploit, the reputation mechanism extracts more value from it.

**Finding 6: The reputation advantage scales with tail heaviness.** At a fixed noise gap, higher $\alpha$ (lighter tails) produces larger R-vs-C improvements. This may appear counterintuitive — heavier tails make forecasting harder, so one might expect more room for reputation to help. However, lighter tails produce a cleaner signal-to-noise ratio in the reputation update: breakout probabilities are less extreme, so the squared error $(p_i - Y)^2$ is more informative about agent quality. The mechanism learns faster and separates agents more cleanly under lighter tails.

**Finding 7: The mechanism never hurts.** Across all 36 cells of the parameter sweep (2 regimes × 3 $\alpha$ × 3 noise gaps × 2 metrics), the mean R-vs-C improvement is non-negative in every case. At the low end ($\alpha = 1.3$, $\Delta\sigma = 0.5$), some results are not statistically significant, reflecting limited statistical power with 10 seeds and a genuinely small effect. But the point estimate is always positive or near zero — there is no cell where reputation-weighting is harmful.

*[Figure: Line plots showing R-vs-C improvement vs noise gap for each α and regime. Figure: Heatmaps of R-vs-C Brier improvement over the α × noise gap grid for Regimes A and B.]*

### V-C. Inequality Sensitivity

The main results (Section V-A) use $\sigma_s = 1.0$, corresponding to moderate wealth inequality (Gini $\approx 0.47$). To test how the degree of wealth concentration affects both the capital-weighting pathology and the reputation correction, we sweep $\sigma_s$ from 0.0 (perfect equality) to 2.0 (extreme concentration, Gini $\approx 0.73$) for Regimes A and B ($J = 5{,}000$, $n = 20$ seeds per cell). This sweep reveals the central limitation of multiplicative reputation-weighting: as wealth concentration increases, noisy whales increasingly dominate the aggregate forecast, and a small multiplicative adjustment to their weight cannot undo the distortion their stake imposes.

**Finding 8: At $\sigma_s = 0$, capital-weighted is identical to equal-weighted (sanity check).** When all agents have stake $s_i = 1$, the capital-weighted and equal-weighted forecasts are mathematically identical. The measured C-vs-E delta is $< 10^{-15}$% (floating-point zero), and results are identical across Regimes A and B — confirming that the regime assignment is irrelevant when stakes are uniform. Reputation-weighting still improves over both baselines by +0.134% (Brier, $p < 10^{-20}$), demonstrating that the reputation benefit exists even absent any wealth heterogeneity. This anchor point validates the experimental pipeline.

**Finding 9: Capital distortion scales monotonically with wealth inequality.** Table III reports the C-vs-E Brier delta as a function of $\sigma_s$ for Regime B (anti-correlated).

**Table III: Capital Distortion vs Stake Dispersion (Regime B, Brier)**

| $\sigma_s$ | Gini | C vs E (%) | Significance |
|---|---|---|---|
| 0.00 | 0.00 | 0.000 | n.s. |
| 0.25 | 0.13 | −0.103 | * |
| 0.50 | 0.25 | −0.281 | ** |
| 0.75 | 0.37 | −0.580 | *** |
| 1.00 | 0.47 | −1.068 | *** |
| 1.25 | 0.55 | −1.807 | *** |
| 1.50 | 0.63 | −2.802 | *** |
| 1.75 | 0.69 | −3.988 | *** |
| 2.00 | 0.73 | −5.265 | *** |

The distortion is monotonically increasing in magnitude: at $\sigma_s = 2.0$, the capital-weighted forecast is 5.27% worse than equal-weighting. Each increment of $\sigma_s$ worsens the distortion, with no plateau or reversal. In Regime A (uncorrelated), the same pattern holds but with smaller magnitudes — C-vs-E reaches −4.52% at $\sigma_s = 2.0$ — because random (rather than systematic) overweighting of noisy agents is less damaging than systematic overweighting.

**Finding 10: The reputation correction grows with wealth inequality, but far more slowly than the distortion it corrects — because multiplicative reputation cannot override the stake floor of noisy whales.** Table IV reports the R-vs-C Brier improvement alongside the capital distortion for Regime B, together with the fraction of distortion recovered.

**Table IV: Reputation Recovery vs Capital Distortion (Regime B, Brier)**

| $\sigma_s$ | C vs E (%) | R vs C (%) | Recovery |
|---|---|---|---|
| 0.00 | 0.000 | +0.134 | — |
| 0.25 | −0.103 | +0.131 | >100% |
| 0.50 | −0.281 | +0.130 | 46% |
| 0.75 | −0.580 | +0.131 | 23% |
| 1.00 | −1.068 | +0.137 | 13% |
| 1.25 | −1.807 | +0.146 | 8% |
| 1.50 | −2.802 | +0.155 | 6% |
| 1.75 | −3.988 | +0.162 | 4% |
| 2.00 | −5.265 | +0.165 | 3% |

The R-vs-C improvement grows from +0.134% to +0.165% — a 23% increase across the full range of $\sigma_s$. But the capital distortion grows from 0% to −5.27% — a divergence of over two orders of magnitude. The recovery ratio collapses because the distortion is driven by noisy whales whose stake grows with $\sigma_s$, while the reputation correction — a small multiplicative adjustment on those same stakes — scales proportionally to the stake, not to the damage the stake causes. As whales grow larger, reputation can only shave a few percent off their influence; it cannot shrink them down to the level their accuracy warrants. At moderate inequality ($\sigma_s = 0.50$, Gini $\approx 0.25$), reputation recovers nearly half the capital distortion. But at extreme inequality ($\sigma_s = 2.0$, Gini $\approx 0.73$), it recovers only 3%. The same pattern holds in Regime A, where R-vs-C grows from +0.134% to +0.196%.

**Finding 11: The multiplicative form is the binding constraint.** The fundamental limitation is architectural. Under multiplicative reputation-weighting, influence is $w_i = r_i \cdot s_i$: reputation *scales* the stake but cannot *replace* it. This means that a noisy whale's influence has a floor determined by their stake, regardless of how poor their track record becomes. Consider the numbers from this simulation: the reputation mechanism achieves a separation ratio of 1.107× — good agents converge to mean reputation ~0.89, bad agents to ~0.80 (both below the initial value of 1.0, since the exponential credit $\exp(-k(p-Y)^2)$ is almost always below 1 for $k=5$). Now consider two agents under extreme inequality ($\sigma_s = 2.0$):

- A *consistently accurate* small agent: reputation 0.89, stake 0.5 → effective weight **0.45**
- A *consistently noisy* whale: reputation 0.80, stake 20 → effective weight **16.0**

The noisy whale exerts 36× more influence on the aggregate forecast than the accurate small agent, despite the mechanism correctly identifying the whale as a poor forecaster. The reputation correction reduces the whale's weight by only 10% (from 20 to 16) — a marginal adjustment relative to the underlying 40× stake asymmetry. No matter how many rounds the small agent forecasts accurately, their effective weight cannot grow beyond $r_i \cdot s_i$, which is capped by their modest stake. The mechanism correctly identifies who is good and who is bad; the problem is that multiplicative reputation lacks the authority to act on that information when stakes are sufficiently concentrated. This motivates alternative weighting architectures — such as reputation-only weighting ($w_i = r_i$) or log-scaled stakes ($w_i = r_i \cdot \log(1 + s_i)$) — explored in the Discussion.

**Finding 12: Reputation separation is invariant to stake dispersion.** Across all 9 values of $\sigma_s$ and both regimes, the reputation separation ratio is exactly 1.107× (to machine precision). The mechanism's ability to distinguish good from bad agents is determined entirely by the signal structure ($\sigma_{\text{good}}$, $\sigma_{\text{bad}}$, $J$) and the learning parameters ($\lambda$, $k$), not by the wealth distribution. (The slight difference from the 1.105× reported in Section V-A reflects different seed counts across campaigns — 30 seeds in V-A vs 20 seeds here — not a change in mechanism behavior.) This invariance is a desirable property: the reputation signal is not contaminated by wealth structure. It also confirms that the limited recovery in Table IV is not due to a failure of reputation learning — the mechanism learns just as well under extreme inequality. The bottleneck is the weighting architecture, not the learning rule.

*[Figure: Line plots showing R-vs-C improvement and C-vs-E distortion vs σ_s for Regimes A and B with error bars. Figure: Stake distribution histograms at σ_s = 0, 0.5, 2.0 showing increasing concentration.]*

### V-D. Summary of Findings

Table V consolidates the twelve findings. The results establish two complementary conclusions: (1) capital-weighted aggregation degrades forecast quality under wealth-skill misalignment, and the degradation scales with wealth inequality; (2) multiplicative reputation-weighting provides a consistent, safe, but modest correction — the mechanism reliably learns who is accurate and who is not, but the multiplicative architecture limits its ability to act on that knowledge, because a noisy whale's influence is floored by their stake regardless of their track record. Together, these findings motivate the search for weighting architectures that decouple influence from raw capital, giving reputation more authority relative to stake.

**Table V: Summary of Findings**

| # | Finding | Gap Addressed |
|---|---|---|
| 1 | Reputation improves over capital in all 3 regimes ($p < 10^{-15}$); effect is modest (+0.13--0.17%) | Performance-weighting beats capital-weighting [II-B] |
| 2 | Capital-weighting degrades forecasts in Regimes A (−0.83%) and B (−1.21%) | Capital = wealth-weighting, not info-weighting [II-A] |
| 3 | Reputation never underperforms capital, but correction is partial | Safety of adoption [II-B] |
| 4 | Reputation separation invariant to wealth structure (1.105×) | — |
| 5 | Reputation advantage scales with noise gap | Effect under varying skill heterogeneity [II-B] |
| 6 | Reputation advantage scales with tail heaviness ($\alpha$) | Performance under heavy tails untested [II-D] |
| 7 | No parameter configuration where reputation hurts | Robustness [II-E] |
| 8 | $\sigma_s = 0$: capital $\equiv$ equal (sanity check) | — |
| 9 | Capital distortion scales with inequality (0% → −5.27%) | No test of wealth inequality variation [II-A] |
| 10 | Reputation advantage grows with inequality, but far slower than distortion (recovery: 46% → 3%) | No test of wealth inequality variation [II-A] |
| 11 | Multiplicative weighting is the binding constraint; ~10% reputation differential cannot overcome 40× stake differential | — (central limitation, informs Discussion) |
| 12 | Reputation separation invariant to $\sigma_s$; learning works, weighting architecture is the bottleneck | — |

---

## References

References as numbered in Related Work and Model drafts.

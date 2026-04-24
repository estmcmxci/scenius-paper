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

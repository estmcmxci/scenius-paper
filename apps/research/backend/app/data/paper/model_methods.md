# Model and Experimental Design — Draft for Review

## III. Model

### III-A. Setup and Notation

We consider a sequential prediction setting with $N$ agents indexed $i = 1, \dots, N$ evaluating $J$ content items (e.g., songs, videos, posts) in succession. Each agent $i$ is characterized by a private signal precision $\sigma_i > 0$ (lower is better) and a stake $s_i \geq 0$ representing the capital they commit to the market. Agents are partitioned into two types: a fraction $\phi$ are *good* agents with signal noise $\sigma_{\text{good}}$, and the remaining $1 - \phi$ are *bad* agents with signal noise $\sigma_{\text{bad}} > \sigma_{\text{good}}$. The difference $\Delta\sigma = \sigma_{\text{bad}} - \sigma_{\text{good}}$ is the *noise gap*, which parameterizes the degree of skill heterogeneity in the population.

This binary partition is a simplification of continuous skill distributions, chosen because it isolates the core question: can the mechanism learn to upweight the informed minority even when that minority holds less capital? The 80/20 split ($\phi = 0.2$) models the empirically common situation where the majority of market participants are noise traders or casual bettors, while a small minority possesses genuine predictive skill [7, 9].

### III-B. Latent Quality and Breakout Probability

For each item $j$, a latent quality $q_j$ is drawn from a shifted Pareto distribution:

$$q_j \sim \text{Pareto}(\alpha) + 1, \quad f(q) = \alpha \, q^{-(\alpha+1)}, \quad q \geq 1$$

The Pareto distribution is chosen because cultural breakout events — streaming counts, viral reach, box office returns — empirically follow power-law distributions [13, 14]. The shape parameter $\alpha > 1$ controls tail heaviness: smaller $\alpha$ produces heavier tails with more extreme outliers. We test $\alpha \in \{1.3, 1.7, 2.5\}$, spanning from very heavy ($\alpha = 1.3$, finite mean but infinite variance) to moderately heavy ($\alpha = 2.5$) tails.

The latent quality is mapped to a true breakout probability via a sigmoid transform:

$$\theta_j = \sigma(\beta \log q_j + b)$$

where $\sigma(x) = 1/(1 + e^{-x})$ is the logistic sigmoid and $\beta = 1$ is a scaling constant. The logarithmic compression of $q_j$ is essential: without it, the Pareto's heavy tail would produce extreme values of the sigmoid argument, collapsing most breakout probabilities to 0 or 1 and eliminating the interesting forecasting problem in the interior of the probability simplex.

The bias $b$ is calibrated so that $\mathbb{E}[\theta_j] \approx 0.10$ — i.e., approximately 10% of items break out. This base rate is chosen to reflect the empirical reality of cultural markets, where the vast majority of content fails to achieve viral or commercial breakout [13]. Calibration is performed via Brent's root-finding method on a sample of 200,000 Pareto draws, and $b$ is recalibrated for each value of $\alpha$ to ensure a constant base rate across tail-heaviness comparisons.

### III-C. Private Signals and Beliefs

Each agent $i$ observes a private signal about item $j$ in log-odds space:

$$x_{i,j} = \text{logit}(\theta_j) + \epsilon_{i,j}, \quad \epsilon_{i,j} \sim \mathcal{N}(0, \sigma_i^2)$$

where $\text{logit}(p) = \log(p/(1-p))$. Working in log-odds space ensures that additive Gaussian noise is symmetric around the true value and that the transform back to probability space via the sigmoid naturally constrains beliefs to $[0, 1]$.

Agent $i$'s belief is then:

$$p_{i,j} = \sigma(x_{i,j})$$

Good agents ($\sigma_i = 0.6$) produce beliefs tightly clustered around $\theta_j$; bad agents ($\sigma_i = 1.6$) produce beliefs that are substantially more dispersed. To give concrete intuition: for a true $\theta = 0.10$, a good agent's beliefs are typically in the range $[0.04, 0.22]$, while a bad agent's beliefs range from roughly $[0.01, 0.60]$. The bad agent's signal is wide enough to be nearly uninformative on any individual round, though it is still unbiased in expectation.

### III-D. Aggregation Mechanisms

We compare three aggregation rules that map the vector of individual beliefs $(p_{1,j}, \dots, p_{N,j})$ to a single consensus probability for each item $j$.

**Equal-weighted (baseline):** The unweighted crowd average.

$$\bar{p}_j = \frac{1}{N} \sum_{i=1}^{N} p_{i,j}$$

This ignores both capital and track record. It is the simplest possible aggregation and serves as the reference against which capital-weighting is measured.

**Capital-weighted:** Each agent's belief is weighted by their stake $s_i$.

$$p_j^C = \frac{\sum_{i=1}^{N} s_i \, p_{i,j}}{\sum_{i=1}^{N} s_i}$$

This is the mechanism implicit in all existing capital-weighted prediction markets. In an order-book market like Polymarket, a trader's influence on the market price is proportional to their order size; in an LMSR-based market, it is proportional to the number of shares purchased. The capital-weighted average is a simplified stand-in that captures the core property: *influence is proportional to stake, with no use of past accuracy* [3, 4]. This simplification removes sequential trading dynamics and price impact but preserves the fundamental aggregation principle that our experiment targets.

**Reputation-weighted (proposed):** Each agent's belief is weighted by the product of their stake and a learned reputation score $r_i$.

$$p_j^R = \frac{\sum_{i=1}^{N} r_i \, s_i \, p_{i,j}}{\sum_{i=1}^{N} r_i \, s_i}$$

The multiplicative form $r_i \cdot s_i$ preserves the skin-in-the-game incentive of capital-weighting while introducing a corrective factor that can amplify or attenuate each agent's influence based on demonstrated forecasting quality.

All three mechanisms observe the *same* individual beliefs $p_{i,j}$ on every round. The only difference is the weighting scheme. Any performance difference is therefore attributable solely to the aggregation rule.

### III-E. Scoring and Reputation Update

After each round, the binary outcome $Y_j \sim \text{Bernoulli}(\theta_j)$ is observed and used to score the aggregate forecasts and update reputations.

**Scoring.** We evaluate each mechanism using two strictly proper scoring rules:

- *Brier score:* $\text{BS}_j = (\hat{p}_j - Y_j)^2$
- *Log loss:* $\text{LL}_j = -[Y_j \log \hat{p}_j + (1 - Y_j) \log(1 - \hat{p}_j)]$

where $\hat{p}_j$ is the mechanism's aggregate forecast, clipped to $[10^{-6}, 1 - 10^{-6}]$ to prevent numerical overflow in the log loss.

**Reputation update.** After observing $Y_j$, each agent's reputation is updated via an exponential moving average (EMA) with exponential credit:

$$r_i \leftarrow (1 - \lambda) \, r_i + \lambda \exp\!\big(-k (p_{i,j} - Y_j)^2\big)$$

All agents are initialized with $r_i = 1$. The update has three components:

1. *Exponential credit:* $\exp(-k(p_{i,j} - Y_j)^2)$ produces a score in $(0, 1]$. If agent $i$'s prediction was close to the outcome, the credit is near 1; if far, it decays exponentially toward 0. The parameter $k = 5$ controls the sharpness of this decay.

2. *EMA smoothing:* The parameter $\lambda = 0.05$ determines how quickly reputation responds to new evidence. With $\lambda = 0.05$, approximately 95% of the weight is on the agent's history, making reputation a slow-moving, stable summary of past performance. This prevents a single lucky or unlucky round from dominating the reputation signal.

3. *Initialization at unity:* All agents start with equal reputation, meaning the reputation-weighted mechanism is identical to capital-weighted on round 1. The mechanism must *learn* the quality differential from data; it has no prior information about which agents are good.

The exponential credit function is closely related to the Brier score — both measure squared error between prediction and outcome. This connection to proper scoring rules ensures that, in expectation, agents maximize their accumulated reputation by reporting truthfully.

**Order of operations.** The reputation used to weight round $j$'s forecast is learned from rounds $1$ through $j-1$. Reputation is updated *after* scoring, never benefiting from hindsight on the current round. This is the standard online learning setup.

### III-F. Heterogeneous Stakes and Wealth--Skill Regimes

Stakes are drawn from a log-normal distribution and normalized to unit mean:

$$\tilde{s}_i \sim \text{LogNormal}(0, \sigma_s^2), \quad s_i = \tilde{s}_i \, / \, \overline{\tilde{s}}$$

The log-normal distribution is the standard model for wealth and income distributions — right-skewed, always positive, and parameterized by a single dispersion parameter $\sigma_s$. Normalization to mean 1 ensures that the total capital in the market is constant across inequality levels; only the *distribution* of capital changes.

At $\sigma_s = 0$, all agents have stake $s_i = 1$ and the capital-weighted mechanism is mathematically identical to equal-weighted. As $\sigma_s$ increases, wealth concentration grows: at $\sigma_s = 1.0$, the Gini coefficient is approximately 0.47 and the top 20% of agents hold roughly 2--3x the capital of the bottom 80%. At $\sigma_s = 2.0$, Gini reaches 0.73, comparable to crypto wealth distributions, and a handful of agents dominate the capital-weighted forecast.

We define three *wealth--skill correlation regimes* that control how stakes are assigned to agent types:

**Regime A (Uncorrelated).** Stakes are assigned to agents uniformly at random, independently of their signal precision. Wealth carries no information about skill.

**Regime B (Anti-correlated).** Agents are processed in descending order of stake. Each agent is assigned to the "bad" (high-noise) pool with probability 0.8 and to the "good" (low-noise) pool with probability 0.2, subject to the constraint that pool sizes match the $\phi / (1-\phi)$ split. This produces a population where high-stake agents are predominantly noisy forecasters — the adversarial case for capital-weighting.

**Regime C (Correlated).** The mirror of Regime B: high-stake agents are assigned to the good pool with probability 0.8. This is the best case for capital-weighting, where wealth proxies for skill.

The probabilistic (80/20) assignment rather than deterministic sorting reflects the reality that wealth--skill correlations are never perfect. Even in Regime B, some whales happen to be skilled; even in Regime C, some small players are good forecasters. This softening prevents pathological edge cases and makes the regimes more empirically realistic.

Stakes are regenerated independently for each random seed, meaning that multi-seed results average over both randomness in outcomes *and* randomness in the wealth distribution.

---

## IV. Experimental Design

### IV-A. Simulation Protocol

Each experimental run is a single invocation of the model pipeline (Sections III-B through III-E) for $J$ rounds with a fixed random seed. A single pseudorandom number generator (NumPy `default_rng`) initialized with the seed produces all stochastic quantities — Pareto draws, agent noise, Bernoulli outcomes, and stake draws — in a deterministic sequence.

This design ensures that for a given seed, all three aggregation mechanisms observe the *same* latent qualities, the *same* private signals, and the *same* realized outcomes. The only variable is the weighting rule. Performance differences across mechanisms are therefore attributable solely to the aggregation scheme, not to sampling variation. This paired structure is critical for statistical power: rather than asking whether reputation outperforms capital *on average across different worlds*, we ask whether it outperforms *in the same world* — a far more powerful test that dramatically reduces variance.

### IV-B. Evaluation Metrics

For each mechanism $m \in \{E, C, R\}$ and seed $s$, we compute the mean Brier score $\overline{\text{BS}}_m^{(s)} = J^{-1} \sum_j \text{BS}_{m,j}^{(s)}$ and mean log loss $\overline{\text{LL}}_m^{(s)} = J^{-1} \sum_j \text{LL}_{m,j}^{(s)}$ across all $J$ rounds.

The primary outcome variable is the relative improvement of reputation-weighted over capital-weighted aggregation:

$$\Delta_{R \text{ vs } C}^{(s)} = \frac{\overline{S}_C^{(s)} - \overline{S}_R^{(s)}}{\overline{S}_C^{(s)}} \times 100\%$$

where $S$ is either Brier score or log loss. Positive values indicate that reputation outperforms capital. We report this for both scoring rules to guard against artifacts of any single metric's sensitivity profile.

As a secondary outcome, we report the *capital distortion*:

$$\Delta_{C \text{ vs } E}^{(s)} = \frac{\overline{S}_E^{(s)} - \overline{S}_C^{(s)}}{\overline{S}_E^{(s)}} \times 100\%$$

Positive values indicate that capital-weighting improves over equal-weighting; negative values indicate that capital-weighting *degrades* the forecast. This metric isolates the effect of wealth heterogeneity on the capital-weighted mechanism, independent of the reputation correction.

We also track *reputation separation* — the ratio of mean final reputation among good agents to mean final reputation among bad agents — as a measure of the mechanism's ability to identify agent quality endogenously.

### IV-C. Statistical Methods

For each experimental configuration (regime, parameter setting), we run $n$ independent seeds and obtain $n$ paired improvement values $\{\Delta^{(1)}, \dots, \Delta^{(n)}\}$.

**Confidence intervals.** We construct 95% confidence intervals for the mean improvement via the nonparametric bootstrap (10,000 resamples with replacement). The bootstrap avoids distributional assumptions, which is appropriate given that the improvement values are ratios of correlated random variables.

**Hypothesis testing.** We test $H_0: \mathbb{E}[\Delta] = 0$ using a paired one-sample $t$-test on the $n$ per-seed improvement values. The paired design — same seed, different mechanism — ensures that the test captures the mechanism effect rather than cross-seed variance. We report $p$-values with significance levels $* \, (p < 0.05)$, $** \, (p < 0.01)$, $*** \, (p < 0.001)$.

### IV-D. Parameter Settings

| **Parameter** | **Symbol** | **Default** | **Swept values** |
|---|---|---|---|
| Agents | $N$ | 50 | — |
| Rounds | $J$ | 5,000 | 2,000 (param. sweep) |
| Pareto tail | $\alpha$ | 1.7 | {1.3, 1.7, 2.5} |
| Base rate | $\mathbb{E}[\theta]$ | 0.10 | — |
| Good fraction | $\phi$ | 0.20 | — |
| Good noise | $\sigma_{\text{good}}$ | 0.6 | — |
| Bad noise | $\sigma_{\text{bad}}$ | 1.6 | {1.1, 1.6, 2.1} |
| Stake dispersion | $\sigma_s$ | 1.0 | {0.0, 0.25, ..., 2.0} |
| Rep. learning rate | $\lambda$ | 0.05 | — |
| Rep. sharpness | $k$ | 5.0 | — |
| Rep. initialization | $r_0$ | 1.0 | — |

### IV-E. Experimental Campaigns

We conduct three experimental campaigns, each targeting a different dimension of the research question.

**Campaign 1: Main results (Section V-A).** All three regimes (A, B, C) at default parameters. $J = 5{,}000$ rounds, $n = 30$ seeds per regime. This establishes the core finding: does reputation outperform capital, and does the answer depend on the wealth--skill correlation?

**Campaign 2: Parameter sensitivity (Section V-B).** Sweep over $\alpha \in \{1.3, 1.7, 2.5\}$ and noise gap $\Delta\sigma \in \{0.5, 1.0, 1.5\}$ for regimes A and B. $J = 2{,}000$, $n = 10$ seeds per cell. This tests robustness across tail heaviness and signal heterogeneity: 3 × 3 × 2 = 18 configurations.

**Campaign 3: Inequality sensitivity (Section V-C).** Sweep $\sigma_s \in \{0.0, 0.25, 0.50, \dots, 2.0\}$ for regimes A and B at default signal parameters. $J = 5{,}000$, $n = 20$ seeds per cell. This tests how wealth concentration affects both the capital distortion and the reputation correction: 9 × 2 = 18 configurations. The $\sigma_s = 0$ anchor provides a built-in sanity check: with equal stakes, capital-weighted must equal equal-weighted exactly.

In total, the three campaigns comprise $3 \times 30 + 18 \times 10 + 18 \times 20 = 630$ simulation runs, each of $J = 2{,}000$--$5{,}000$ rounds.

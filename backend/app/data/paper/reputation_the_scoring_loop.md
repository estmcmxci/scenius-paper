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

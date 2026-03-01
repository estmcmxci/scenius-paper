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

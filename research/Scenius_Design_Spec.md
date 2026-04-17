---
title: Scenius Research

---

---
title: Scenius Research

---

# Scenius Research


## Research Question: 
Does reputation-weighted LMSR improve forecast calibration for binary breakout events defined as cumulative 12-month streams exceeding a fixed threshold τ for early-stage tracks?

## **Market Question**: 
Will this track, released by an artist with fewer than X monthly listeners at release (t₀), exceed τ cumulative streams within 12 months?


**Where:**
- X defines “early-stage” (e.g., <100k monthly listeners at release).
- τ is your breakout threshold (choose so ~5–20% of tracks succeed in sim).
- Horizon = 12 months (fixed and objective).


## Insight:

Every track has some hidden underlying "quality" or "breakout potential" that we don't directly observe, but which drives whether it succeeds. 

We call that hidden variable:  $q_j$ for track $𝑗$

In cultural markets:

- most tracks get tiny traction
- small number explode massively
- biggest winners are orders of magnitude larger 

Examples of heavy-tailed distribution models that model this behavior:

- Pareto distributions
- Lognormal distributions

So in a simulation, you can use either:

$q_j \sim \text{Pareto}(\alpha)$


This gives each track a latent "strength", where most will be weak, and some will be extremely large. 

We introduce latent quality "q" because we want agents to have noisy information about something real and outcomes to be probabilistic but grounded. 

In summary, we:

1. Draw hidden quality "$q_j$"
2. Translate that into breakout probability


## Converting Latent Quality → breakout probability 


Latent quality itself is not the outcome; we instead model a probability of breakout: 

$\theta_j = \sigma(\beta \log q_j + b)$


Where:
- $σ$= logistic function (squashes values into (0,1))
- $β$ controls sensitivity
- $b$ shifts baseline rate

Intuition:
- Low quality → low breakout probability
- High quality → high breakout probability
- Still probabilistic

Therefore: 

$Y_j \sim \text{Bernoulli}(\theta_j)$

Where for track $j$, the outcome $Y_j$ is drawn from a Bernoulli distribution with parameter $θ_j$

A Bernoulli distribution models a single yes/no event.

It has one parameter, $θ$, the probability of “success.”



**Insight:**

We are testing whether reputation weighting helps when:

- outcomes are heavy-tailed
- signals are uneven quality 

If outcomes were normal and symmetric,
capital-weighted LMSR might already work fine.

Heavy tails stress-test the mechanism.


We’re simulating a world where:
- Some tracks are secretly amazing.
- Most are mediocre.
- Agents try to sense which are which.
- The market tries to aggregate their beliefs.
- Then we test which market design gets closer to truth.

## Noise 

Tastemakers don't see the true breakout probability $\theta_j$ for track $j$, they see a noisy version of it. 

Some tastemakers are better, some are worse. This is what we mean by heterogeneous private signals. 

Each tastemaker has a noise level $σ_i$ and are assigned a noise parameter:

- Small $σ_i$ → very accurate (good tastemaker)
- Large $σ_i$ → very noisy (bad tastemaker)


So skill translates into how much noise distorts their signal. 

## Quantifying private signals

We start with the true breakout probability: $\theta_j$; but probabilities are bounded between 0 and 1. 

Mathematically, it's easier to work in log-odds space, so we transform:


$$
\text{logit}(\theta_j) = \log\left(\frac{\theta_j}{1 - \theta_j}\right)
$$

Now we add noise:


$$
x_{i,j} = \text{logit}(\theta_j) + \epsilon_{i,j}
$$

Where:

$$
\epsilon_{i,j} \sim \mathcal{N}(0, \sigma_i^2)
$$

That means:

- the error is normally distributed
- mean = 0 (no systematic bias)
- variance depends on the agent

So: 

- good tastemakers → small wiggle
- bad tastemakers → big distortion


--

Now we convert back to probability: 



$$
p_{i,j} = \sigma(x_{i,j})
$$


Where:

$$
\sigma(x) = \frac{1}{1 + e^{-x}}
$$

This gives: 

- $p_{i,j} \in (0,1)$
- The tastemaker's personal breakout belief

**Why This Is Important**

This creates:
- A world where information exists
- But it’s unevenly distributed
- And no one sees truth directly

Now your market has something real to aggregate.

Without heterogeneous noise, reputation weighting wouldn’t matter.


## Market Aggregation

> **Note (terminology):** The aggregation formulas below are an *LMSR-inspired* shortcut suitable for an MVP simulation. For an IEEE-style paper, either (a) implement full LMSR with a cost function and explicit trading, or (b) describe this section as a *stake-weighted probability aggregator* that isolates the effect of reputation-weighted influence.

### Optional: Full LMSR reference (binary)

For a binary market with outstanding share quantities $q_0, q_1$ and liquidity parameter $b$, the LMSR cost function is:

$$
C(q_0,q_1)= b\,\log\left(e^{q_0/b}+e^{q_1/b}\right)
$$

The implied probability of outcome 1 is:

$$
p = \frac{e^{q_1/b}}{e^{q_0/b}+e^{q_1/b}}
$$

## Market Aggregation

We need a rule that turns the set of beliefs into a market probability. 

At this point in our simulation: 

- Each agent $i$ has a belief $p_{i,j}$ about breakout.
- Each agent may commit some stake $s_{i,j}$
- We need one single market probability 


> How do we combine all individual beliefs into one price? 

**Our baseline method: Capital-Weighted Aggregation**:

$$
p_j^C = \frac{\sum_i s_{i,j} \, p_{i,j}}{\sum_i s_{i,j}}
$$

**Interpretation**:

- Multiply each agent's belief by how much money they put in
- Add it up
- Divide by total money 

This formula is simply a weighted average where weights = dollars. 

**Intuition:**

- If Agent A bets $100$ at $0.8$
- Agent B bets $10$ at $0.2$

Market price will be closer to .8, therefore, money determines influence and there is no concept of skill. 


**Reputation-Weighted Aggregation (proposed):**

We now introduce:

- Individual agent reputation $r_i$
- Reputation reflects past predictive accuracy 

$$
p_j^R = \frac{\sum_i r_i \, s_{i,j} \, p_{i,j}}{\sum_i r_i \, s_{i,j}}
$$


The difference is in that this new formula, instead of money weights, money and reputation are the weights. 

**Interpretation:**

Two agents both bet $100:
- Agent A: reputation = 2.0
- Agent B: reputation = 0.5

Effective influence:
- A counts as $200
- B counts as $50


So the market listens more to proven agents.


--

In our baseline method, capital alone determines price whereas in our pioneering method, capital and track record determine the price. 

This IS the entire innovation. 

In our Jupyter simulation:

- We will compare our baseline forecasting with our reputation-weighted forecasting 

Then we will measure:

- Which is closer to the true outcome? 
- Which is better calibrated?
- Which as lower Brier / log loss? 

If $$p_j^R $$ consistently performs better than $$ p_j^C$$ 

we have shown that

**Reputation-weighted influence improves information aggregation under heterogeneous signals.**

## Realizing the Outcome (generating the actual breakout)

$$
Y_j \sim \text{Bernoulli}(\theta_j)
$$

This means:

- True breakout probability was $θ_j$
- The actual outcome is randomly drawn 
- $Y_j = 1$ (breakout) with probability $θ_j$
- Otherwise $Y_j = 0$

This is the resolution event. 

In our prior step, we generated competing forecasts. In the current step, we get truth. 


We can now evaluate: 

- Was $p_j^C$ closer to reality? 
- Or was $p_j^R$ closer? 


## Checkpoint

1. Hidden quality → determines true probability $θ_j$
2. Agents see noisy signals → form beliefs 
3. Market aggregates beliefs → outputs forecast 
4. Reality happens → outcome drawn from $θ_j$


Once $Y_j$ is realized:

- you can compute forecast error 
- You can update each agent's reputation
- You can compare market calibration 

Realizing the outcome enables:

- Scoring
- Learning
- Reputation evolution
- Performance comparison 

## Scoring Forecasts 

$$
Y_j ~ Bernoulli (θ_j) 
$$

Resolving the outcome of competing markets gave us:

- The true outcome (0 or 1)
- What the market predicted:
    - $p_j^C$ (capital-weighted)
    - $p_j^R$ (reputation-weighted)
    
Now we're asking which forecast was closer to what actually happened? 

## Scoring

A prediction market outputs probabilities. We need to measure:

> How good were those probabilities? 

Not just whether they were right but whether they were well-calibrated and accurate. 

We leverage a Brier Score:

$$
Brier(p, Y) = (p - Y)^2
$$

This allows to understand:

- If market predicts .8 and outcome = 1:
→ error = (.8-1)^2 = .04 (small)
- If market predicts .8 and outcome = 0:
→ error = (.8-0)^2 = .64 (large)

Lower is better. Brier scores punish confident wrong forecasts heavily. 

We also leverage Log Loss:

$$
LogLoss(p,Y) = - [Ylog p + (1 -Y) log (1-p)]
$$

This punishes extreme confidence even more. 

If: 

- market predicts .99 and outcome = 0 
→ log loss is huge. 

Log loss strongly discourages overconfidence. 


--

Brier and log loss are strictly proper scoring rules. This means that they reward honest probability reporting. 


## Comparing LMSR vs Reputation-Weighted 

For each round $j$:

Compute: 

$$ 
(p_j^C-Y_j)^2
$$
$$
(P_j^R-Y_j)^2
$$


Then average across many rounds:

$$
\mathbb{E}\left[(p^C - Y)^2\right] \;\text{vs.}\; \mathbb{E}\left[(p^R - Y)^2\right]
$$

Same for Log loss: 

$$
\mathbb{E}\left[\text{LogLoss}(p^C, Y)\right] \;\text{vs.}\; \mathbb{E}\left[\text{LogLoss}(p^R, Y)\right]
$$

If either:

$$
\mathbb{E}\left[(p^R - Y)^2\right] < \mathbb{E}\left[(p^C - Y)^2\right]
$$

or 

$$
\mathbb{E}\left[\text{LogLoss}(p^R, Y)\right] < \mathbb{E}\left[\text{LogLoss}(p^C, Y)\right]
$$

then reputation-weighted aggregation improved calibration 

Therefore: 

- predict via market aggregations 
- realize outcomes (Bernoulli)
- Measure the gap by scoring market forecasts 


## Updating reputation 

We need a rule that rewards accuracy. 

Simple option:

- Scoring each agent based on how close their belief was to the outcome:

$$
\ell_{i,j} = (p_{i,j} - Y_j)^2
$$

Convert lost to a credit:

$$
c_{i,j} = \exp(-k\,\ell_{i,j})
$$

Update with decay (prevents early lock-in): 

$$
r_i \leftarrow (1-\lambda)\,r_i + \lambda\,c_{i,j}
$$

Initialize $r_i = 1$ for all agents.

That creates the feedback loop:

- good agents become more influential
- bad agents fade


## More details

So far we have:

- Aggregated market forecasts
- Realized their outcomes
- Measure forecast accuracy 


Now we want our system to learn over time via reputation. 

Each agent predicted: $$P_i,_j$$

Reality was: 

$$
Y_j \in \{0,1\}
$$

We measure how wrong agents were using squared error: 

$$
Y_j \in \{0,1\}
$$

Small loss → close to truth
Large loss → far from truth 

Example: 

- Predict .7, outcome 1 → loss = .09
- Predict .7, outcome 0 → loss = .49 

--

**Converting Loss to Credit**

We don't allow reputation to decrease linearly with error; instead, we transform loss into a positive "credit": 

$$
\ell_{i,j} = (p_{i,j} - Y_j)^2
$$

Why exponential?
- Keeps credit between (0,1)
- Rewards small error smoothly
- Penalizes large error sharply 

If loss = 0 → credit = 1
If loss large → credit close to 0 

Parameter $k$ controls sensitivity. 


**Updating reputation with decay**

Now we update: 

$$
c_{i,j} = \exp(-k\,\ell_{i,j})
$$ 

This is a weighted average between: 

- Old reputation
- New performance 

If λ small → slow learning
If λ large → fast learning

Decay prevents:

- Early lucky agents from dominating forever
- Reputation freezing permanently 

**This creates:**

Over many rounds, accurate agents accumulate higher $r_i$ while noisy agents drift toward low $r_i$

**Reputation affects price impact:**

$$
p_j^R = \frac{\sum_i r_i \, s_{i,j} \, p_{i,j}}{\sum_i r_i \, s_{i,j}}
$$

Meaning:

- Good forecasters influence prices more over time
- Bad forecasters fade


In Plain English:

1. Agents predict
2. Reality happens
3. We reward accurate agents
4. Next round, accurate agents matter more 


## Experimental Parameters (to report in the paper)

- Number of agents: $N$
- Number of rounds/markets: $J$
- Heavy-tail parameters: Pareto $\alpha$ (or lognormal $\mu,\sigma$)
- Breakout base rate control: $\beta, b$ in $\theta_j = \sigma(\beta\log q_j + b)$
- Agent noise: choose two groups (good/bad) with $\sigma_i \in \{\sigma_{\text{good}}, \sigma_{\text{bad}}\}$ or sample $\sigma_i$ from a distribution
- Reputation update: learning rate $\lambda$ and sensitivity $k$
- Stakes: start with constant $s_{i,j}=1$ for MVP; later explore heterogeneous stakes

## Baselines (recommended)

- **Capital-weighted** aggregation (your $p_j^C$)
- **Reputation-weighted** aggregation (your $p_j^R$)
- **Equal-weighted** crowd average: $\bar p_j = \frac{1}{N}\sum_i p_{i,j}$
- *(Optional)* Logistic regression on signals as a non-market baseline

## Repetition

Run for $J$ = 10,000 Rounds

At the end:

- Compare mean Brier/log loss (capital vs reputation)
- Plot calibration: bucket predictions into bins and compare predicted vs realized frequency
- Plot reputation distribution: does it separate good vs noisy agents (tastemakers)? 

**It's imperative to simulate thousands of independent breakout events:**

$j = 1, 2, \dots, J$

Each round: 

1. Draw hidden quality
2. Generate noise agent signals 
3. Aggregate via:
    - capital-weighted LMSR
    - reputation-weighted LMSR
4. Realize outcome
5. Update reputation 

## Iterations are necessary 

Our research question is about expected performance: 

> Does reputation-weighted LMSR improve forecast calibration?

This is a statistical question. 

We cannot answer it from a single event.

We need:

$$
\mathbb{E}\left[L(p^R, Y)\right] \;\text{vs.}\; \mathbb{E}\left[L(p^C, Y)\right]
$$

Which means averaging over many trials. 

## What gets measured at the end

1. Mean Brier / Log Loss

$$
\frac{1}{J} \sum_{j=1}^{J} (p_j^C - Y_j)^2
$$

and 

$$
\frac{1}{J} \sum_{j=1}^{J} (p_j^R - Y_j)^2
$$


If reputation-weighted loss is lower, it aggregates information better. 


## Calibration Plot

Next, we group predictions into bins:

- All predictions between .2-.3
- All predictions between .3-.4
- etc. 

For each bin:

- Compute average predicted probability
- Compute actual frequency of breakout 

If predictions are well-calibrated: 

Points lie near 45-degree line.

If reputation-weighted is closer to the line → better calibration. 


## Reputation Distribution 

We check whether:

- Good agents (low noise) end up with high $r_i$
- Noisy agents end up with low $r_i$

If not, the mechanism failed to learn skill. 

## Limitations and future work

**Explicit limitations**

1. **One-shot weighted average.** The experiment uses a one-shot weighted average of beliefs per round (equal-, capital-, or reputation-weighted). We do not model a full prediction market: no order book, sequential trading, LMSR cost function, or liquidity pool. Results therefore speak to this aggregation setting; extension to dynamic markets is future work.

2. **Reputation helps only modestly.** Reputation-weighting improves calibration over capital-weighting at every level of stake inequality, but the gain is modest. Under high inequality ($\sigma_s$ large), capital-weighting can degrade calibration by several percentage points vs equal-weighting, while reputation recovers only a small fraction of that loss. Reputation is a multiplicative correction on stakes and cannot overcome extreme concentration (a bad agent with very large stake still dominates). We state this as a limitation and as motivation to keep refining the mechanism.

**Design question and proposed direction**

The natural next step is how reputation should interact with stakes: **multiplicative** (as here), **replace** stakes entirely with reputation, or **compress** the role of stake size. We propose evaluating **log-scaled stakes** (or log-scaled effective weight) alongside these options. Under multiplicative weighting, large stakers retain linearly proportional influence, which limits how much reputation can correct. If influence is instead $r_i \cdot \log(1 + s_i)$ or $\log(1 + r_i s_i)$, stake has diminishing returns and reputation can have more bite without fully abandoning skin-in-the-game. Future work should compare: (1) multiplicative $r \times s$, (2) reputation-only weighting, and (3) **reputation $\times$ log-scaled stake** (our proposition), on calibration and participation.

## Recap

The research question: 

> Does reputation-weighted LMSR improve calibration under heavy tails and heterogeneous signals?

Our mechanism simulates this scenario, and we evaluate it statistically. 

If after 10k rounds:

- Reputation-weighted markets have lower loss
- Better calibration 
- Clear separation of skilled agents 

Then: 

We have empirical evidence that endogenous influence weighting improves aggregation. 
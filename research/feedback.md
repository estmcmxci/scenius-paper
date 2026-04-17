SUBMISSION: 73
TITLE: Reputation-Weighted Prediction Markets Under Wealth Heterogeneity and Heavy Tails

----------------------- REVIEW 1 ---------------------

SUBMISSION: 73
TITLE: Reputation-Weighted Prediction Markets Under Wealth Heterogeneity and Heavy Tails

----------- Overall evaluation -----------
SCORE: -2 (reject)
----- TEXT:
### Paper Summary

The paper draws a comparison between market-based and reputation-based predictions. The core claim of the paper is that in the setting of culture breakout prediction, there are specific conditions that support the reputation-based approach: Heavy tails, heterogenous private information, and no correlation of wealth and forecasting skill. It uses simulations to support the claim.

### Strengths

The core idea of identifying specific settings where reputation may out-perform prediction markets is interesting. In particular, identifying settings with heavy tails / where success is an anomaly, seems like a promising setting to focus on.

### Weaknesses

The main weakness of the paper is in the way it models prediction markets. In the simulations, wealth may initially be correlated/uncorrelated/anti-correlated with prediction skill, but the relation remains static throughout the run of the simulation: Wealth accumulation doesn't exhibit the behavior of a learning process. This is (implicitly) an anti-market view of capital, because the 'magic' of capital in real-world markets is that prices do exhibit the behavior of a learning process. This assumption together with the focus on simulations, kind of preemptively leads to the eventual results. The results would be much stronger if run empirically on a real market, and show reputation advantage there. A hint to this being the core issue is in the fact that actually heavy tails do not seem to play a part in the results, counter to the positioning in the abstract and introduction. By Finding 6, reputation outperforms markets even better with lighter tails.

The third pillar of the three identified specialties of culture breakout prediction is also apparent in the introduction and related work: The paper mentions supporting literature for the heavy tail and heterogenous private information assumptions, but not so for the disconnect between capital and prediction ability. For example, why wouldn’t wealthy agents pay ‘culture aficionados’ to predict on their behalf? Why would wealthy agents keep engaging in a prediction platform where they lose? In the simulation, reputation is updated after each market is resolved, but capital is not, though we'd expect that after the market is resolved, everyone that were right win something, and these that were wrong lose something. So capital in itself serves as a form of reputation.


----------------------- REVIEW 2 ---------------------

SUBMISSION: 73
TITLE: Reputation-Weighted Prediction Markets Under Wealth Heterogeneity and Heavy Tails

----------- Overall evaluation -----------
SCORE: -1 (weak reject)
----- TEXT:
Summary

The inspiration for the paper is the finding in prior work that prediction markets may tend to aggregate information biased toward those with capital rather than those with good reputations for predictive skill.

The paper uses simulations to investigate reputation versus capital in information aggregation. The setup is a number of agents, some good at forecasting and some bad, and each has some amount of capital. In each round, each agent observes their private signal and makes a prediction. Each is assigned a reputation based on past accuracy.

The paper compares the performance of an aggregate forecast produced either by: (1) averaging all predictions; (2) averaging predictions weighted by capital; (3) averaging predictions weighted by reputation.

Unsurprisingly, reputation-weighted aggregation performs best. The paper investigates more deeply and has a number of more subtle findings. For example, light-tailed distributions improve the advantage of reputation-weighting because the clearer signal makes it easier to separate the good forecasters from the bad ones.

Considers prediction markets with "reputation-weighted" aggregation. In contrast, traditional prediction markets can be viewed as "captial-weighted" in that people with the most money to bet can move the prices the most, regardless of information.


Opinion

I think the simulations make some interesting points, but they're a bit far from how a prediction market would aggregate information, and they're set up to succeed in making the main point (we should aggregate by reputation instead of capital).

A prediction market specifically includes dynamic back-and-forth information updating, which isn't present here. On the other hand, in the setting that is actually studied, I would want to draw on prior work like online no-regret learning to design good algorithms/reputation systems.


Comments for Authors

The simulation setup is reminiscent of online no-regret learning, and the reputation mechanism is a bit similar to the Multiplicative Weights algorithm for no-regret learning. If the goal were to design a good reputation mechanism, the paper should compare to Multiplicative Weights, which could be interpreted as a reputation mechanism.

While the results may be interesting for forecasting mechanisms generally, I feel the applicability to prediction markets is a bit limited. It's not clear how one would run a prediction market that is based on reputation. In a real prediction market setting, many practical questions arise; for instance, couldn't high-reputation agents find people with lots of capital to bankroll them? So I would suggest that the conclusions are more about forecast aggregation in general than prediction markets specifically.

Regarding the comment in the paper about honest reporting: the setup also feels similar to "forecasting competitions", which literature the authors may find interesting, e.g. Witkowski et al. 2021 "Incentive-Compatible Forecasting Competitions".


----------------------- REVIEW 3 ---------------------

SUBMISSION: 73
TITLE: Reputation-Weighted Prediction Markets Under Wealth Heterogeneity and Heavy Tails

----------- Overall evaluation -----------
SCORE: 0 (borderline paper)
----- TEXT:
This paper builds a model to study prediction markets roughly as follows:

* A market like which song will be #1 Billboard in 3 months? which is heavy tailed (lots of songs, most do not rate) and has diffuse private information
* Traders like Alice who is wealthy but not well informed on music, Bob is not wealthy but very well informed on music, and Carol who is not a trader but uses the forecasts to book concert halls.

The model shows that Alice's trades dominate Bob's, proving worst information to Carol.

They then try to adjust markets to help Bob's weight on prices with reputation scoring. This helps overall, both in cases like the above and also in cases where Alice is both wealthy and well informed. However the amount it helps is bounded and not very strong. And some other results about parameters than influence how much it helps.

+ The paper seems novel
+ The methodological side is not my expertise but it seems sound to me
- The topic is a bit niche and probably the idea of wealth influencing forecasts is more interesting than the solution
- A ways off from "DeFi"-ready
- Prediction market is not modelled, it is more like reported beliefs
- Model makes a lot of simplifying assumptions

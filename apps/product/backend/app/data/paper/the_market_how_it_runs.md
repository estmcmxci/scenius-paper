## 5. The Market — How It Runs

A campaign is a set of binary prediction events with defined resolution criteria and a fixed time horizon. The structure:

1. **Artists surface.** Tracks enter the market from SoundCloud's upstream discovery layer — curator reposts, early listener clusters, pre-breakout audience formation.
2. **Tastemakers predict.** Participants express calibrated probabilities on whether each track will exceed a streaming threshold within one week. The prediction is quantified conviction — not a like, not a vote, but a probability backed by reputation stake.
3. **Outcomes resolve.** The streaming threshold is objective. Either the track crossed the threshold or it did not. The oracle is on-chain verifiable: a deterministic function of publicly available streaming data.
4. **Reputation updates.** Accurate forecasters compound. Inaccurate forecasters decay. The cycle repeats weekly.

SoundCloud is the infrastructure layer. It has the early listening data, the curator graphs, the repost networks, and the pre-breakout audience signals. Scenius is an application built on SoundCloud — consuming its data as an API input, weighting it by demonstrated accuracy, and outputting reputation-weighted breakout probabilities that catalog buyers can act on. SoundCloud does not need to change anything. Scenius makes their data more valuable.

---

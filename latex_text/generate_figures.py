"""Generate paper figures from simulation data."""
import numpy as np
import pandas as pd
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from scipy.optimize import brentq

# --- Helpers ---
def sigmoid(x):
    return np.where(x >= 0, 1.0 / (1.0 + np.exp(-x)), np.exp(x) / (1.0 + np.exp(x)))

def logit(p):
    p = np.clip(p, 1e-12, 1 - 1e-12)
    return np.log(p / (1 - p))

def tune_bias(alpha, beta=1.0, target=0.10, seed=42):
    rng_t = np.random.default_rng(seed)
    q = rng_t.pareto(alpha, size=200_000) + 1
    return brentq(lambda bv: sigmoid(beta * np.log(q) + bv).mean() - target, -15, 15)

def calibration_curve(predictions, outcomes, n_bins=10):
    edges = np.linspace(0, 1, n_bins + 1)
    centers, freqs, counts = [], [], []
    for lo, hi in zip(edges[:-1], edges[1:]):
        m = (predictions >= lo) & (predictions < hi)
        if m.sum() > 0:
            centers.append(predictions[m].mean())
            freqs.append(outcomes[m].mean())
            counts.append(m.sum())
        else:
            centers.append((lo + hi) / 2); freqs.append(np.nan); counts.append(0)
    return np.array(centers), np.array(freqs), np.array(counts)

def generate_stakes(n, sigma_s, seed=0):
    rng = np.random.default_rng(seed)
    raw = rng.lognormal(mean=0, sigma=sigma_s, size=n)
    return raw / raw.mean()

def assign_stakes_regime(stakes, n_good, regime='uncorrelated', seed=0):
    rng = np.random.default_rng(seed + 7777)
    n = len(stakes)
    n_bad = n - n_good
    sorted_idx = np.argsort(stakes)[::-1]
    if regime == 'uncorrelated':
        perm = rng.permutation(n)
        good_indices = set(perm[:n_good])
    elif regime == 'anti_correlated':
        good_slots, bad_slots = n_good, n_bad
        good_indices = set()
        for idx in sorted_idx:
            if bad_slots == 0:
                good_indices.add(idx); good_slots -= 1
            elif good_slots == 0:
                bad_slots -= 1
            elif rng.random() < 0.8:
                bad_slots -= 1
            else:
                good_indices.add(idx); good_slots -= 1
    elif regime == 'correlated':
        good_slots, bad_slots = n_good, n_bad
        good_indices = set()
        for idx in sorted_idx:
            if good_slots == 0:
                bad_slots -= 1
            elif bad_slots == 0:
                good_indices.add(idx); good_slots -= 1
            elif rng.random() < 0.8:
                good_indices.add(idx); good_slots -= 1
            else:
                bad_slots -= 1
    good_list = sorted(good_indices)
    bad_list = sorted(set(range(n)) - good_indices)
    return np.concatenate([stakes[good_list], stakes[bad_list]])

def run_simulation(N, J, alpha, beta, b, agent_sigmas, stakes,
                   rep_init=1.0, lam=0.05, k=5.0, seed=0):
    rng = np.random.default_rng(seed)
    n_ag = len(agent_sigmas)
    n_g = (agent_sigmas < (agent_sigmas.min() + agent_sigmas.max()) / 2).sum()
    eps = 1e-6
    s_sum = stakes.sum()
    pE = np.zeros(J); pC = np.zeros(J); pR = np.zeros(J)
    brier_E = np.zeros(J); brier_C = np.zeros(J); brier_R = np.zeros(J)
    outcomes = np.zeros(J, dtype=np.int8)
    reps = np.full(n_ag, rep_init)
    for j in range(J):
        q_j = rng.pareto(alpha) + 1
        theta_j = float(sigmoid(beta * np.log(q_j) + b))
        p_ij = sigmoid(logit(theta_j) + rng.normal(0, agent_sigmas))
        pE[j] = p_ij.mean()
        pC[j] = np.dot(stakes, p_ij) / s_sum
        w_R = reps * stakes
        pR[j] = np.dot(w_R, p_ij) / w_R.sum()
        Y_j = rng.binomial(1, theta_j)
        outcomes[j] = Y_j
        for ba, pv in [(brier_E, pE[j]), (brier_C, pC[j]), (brier_R, pR[j])]:
            ba[j] = (pv - Y_j) ** 2
        reps = (1 - lam) * reps + lam * np.exp(-k * (p_ij - Y_j) ** 2)
    return {
        'pE': pE, 'pC': pC, 'pR': pR,
        'brier_E': brier_E, 'brier_C': brier_C, 'brier_R': brier_R,
        'outcomes': outcomes, 'reputations': reps.copy(),
    }

# --- Parameters ---
N, J = 50, 5000
ALPHA, BETA = 1.7, 1.0
SIGMA_GOOD, SIGMA_BAD = 0.6, 1.6
FRAC_GOOD = 0.2
SIGMA_S = 1.0
n_good = int(N * FRAC_GOOD)
B = tune_bias(ALPHA, BETA, 0.10)

# --- Run demo simulation (Regime B, seed=42) ---
agent_sigmas = np.array([SIGMA_GOOD] * n_good + [SIGMA_BAD] * (N - n_good))
raw_stakes = generate_stakes(N, SIGMA_S, seed=42)
demo_stakes = assign_stakes_regime(raw_stakes, n_good, regime='anti_correlated', seed=42)
demo = run_simulation(N, J, ALPHA, BETA, B, agent_sigmas, demo_stakes, seed=42)

# ================================================================
# FIGURE 2: Calibration Plot
# ================================================================
fig, ax = plt.subplots(figsize=(3.5, 3.5))
for preds, label, color, marker in [
    (demo['pE'], 'Equal-weighted', '#2ca02c', 'D'),
    (demo['pC'], 'Capital-weighted', '#d62728', 'o'),
    (demo['pR'], 'Reputation-weighted', '#1f77b4', 's'),
]:
    c, f, _ = calibration_curve(preds, demo['outcomes'])
    ax.plot(c, f, f'{marker}-', color=color, label=label, ms=4, lw=1.2)
ax.plot([0, 1], [0, 1], 'k--', alpha=0.4, lw=0.8, label='Perfect')
ax.set_xlabel('Predicted probability', fontsize=9)
ax.set_ylabel('Observed frequency', fontsize=9)
ax.legend(fontsize=7, loc='upper left')
ax.set_xlim(-0.02, 1.02); ax.set_ylim(-0.02, 1.02)
ax.set_aspect('equal')
ax.grid(True, alpha=0.3)
ax.tick_params(labelsize=8)
plt.tight_layout()
fig.savefig('fig_calibration.pdf', bbox_inches='tight', dpi=300)
plt.close()
print("Saved fig_calibration.pdf")

# ================================================================
# FIGURE 3: Reputation Separation Boxplot
# ================================================================
reps = demo['reputations']
fig, ax = plt.subplots(figsize=(3.5, 3.0))
bp = ax.boxplot(
    [reps[:n_good], reps[n_good:]],
    tick_labels=['Good agents\n($\\sigma = 0.6$)', 'Bad agents\n($\\sigma = 1.6$)'],
    patch_artist=True, widths=0.5,
)
bp['boxes'][0].set_facecolor('#1f77b4'); bp['boxes'][0].set_alpha(0.7)
bp['boxes'][1].set_facecolor('#d62728'); bp['boxes'][1].set_alpha(0.7)
for median in bp['medians']:
    median.set_color('black'); median.set_linewidth(1.5)
ax.set_ylabel('Final reputation score', fontsize=9)
ax.grid(True, alpha=0.3, axis='y')
ax.tick_params(labelsize=8)
# Annotate means
for i, (data, color) in enumerate([(reps[:n_good], '#1f77b4'), (reps[n_good:], '#d62728')]):
    ax.annotate(f'$\\mu = {data.mean():.3f}$', xy=(i + 1, data.mean()),
                xytext=(i + 1.35, data.mean()), fontsize=7.5, color=color,
                arrowprops=dict(arrowstyle='->', color=color, lw=0.8))
# Annotate ratio
ratio = reps[:n_good].mean() / reps[n_good:].mean()
ax.text(0.97, 0.97, f'Separation: {ratio:.3f}$\\times$',
        transform=ax.transAxes, ha='right', va='top', fontsize=8,
        bbox=dict(boxstyle='round,pad=0.3', facecolor='wheat', alpha=0.5))
plt.tight_layout()
fig.savefig('fig_reputation_separation.pdf', bbox_inches='tight', dpi=300)
plt.close()
print("Saved fig_reputation_separation.pdf")

# ================================================================
# FIGURE 4: Inequality Sensitivity (two-panel)
# ================================================================
ineq_df = pd.read_csv('/Users/oakgroup/Desktop/scenius/research/inequality_sweep_results.csv')

REGIME_LABELS = {'anti_correlated': 'B: Anti-correlated', 'uncorrelated': 'A: Uncorrelated'}
regime_colors = {'anti_correlated': '#d62728', 'uncorrelated': '#2ca02c'}

fig, axes = plt.subplots(1, 2, figsize=(7.16, 3.2))  # full IEEE width

# Left panel: R vs C improvement
ax = axes[0]
for regime in ['anti_correlated', 'uncorrelated']:
    for metric, marker, ls in [('Brier', 'o', '-'), ('LogLoss', 's', '--')]:
        sub = ineq_df[(ineq_df['regime'] == regime) & (ineq_df['metric'] == metric)]
        sub = sub.sort_values('sigma_s')
        xs = sub['sigma_s'].values
        ys = sub['R_vs_C_pct'].values
        lo = ys - sub['R_vs_C_ci_lo'].values
        hi = sub['R_vs_C_ci_hi'].values - ys
        ax.errorbar(xs, ys, yerr=[lo, hi], marker=marker, color=regime_colors[regime],
                    capsize=2, lw=1.0, ms=3.5, ls=ls,
                    label=f'{metric} ({REGIME_LABELS[regime][:1]})')
ax.axhline(0, color='gray', ls=':', lw=0.6)
ax.set_xlabel('Stake dispersion $\\sigma_s$', fontsize=9)
ax.set_ylabel('R vs C improvement (%)', fontsize=9)
ax.set_title('(a) Reputation advantage', fontsize=9, fontweight='bold')
ax.legend(fontsize=6.5, ncol=2, loc='upper left')
ax.grid(True, alpha=0.3)
ax.tick_params(labelsize=8)

# Right panel: C vs E distortion
ax = axes[1]
for regime in ['anti_correlated', 'uncorrelated']:
    for metric, marker, ls in [('Brier', 'o', '-'), ('LogLoss', 's', '--')]:
        sub = ineq_df[(ineq_df['regime'] == regime) & (ineq_df['metric'] == metric)]
        sub = sub.sort_values('sigma_s')
        xs = sub['sigma_s'].values
        ys = sub['C_vs_E_pct'].values
        lo = ys - sub['C_vs_E_ci_lo'].values
        hi = sub['C_vs_E_ci_hi'].values - ys
        ax.errorbar(xs, ys, yerr=[lo, hi], marker=marker, color=regime_colors[regime],
                    capsize=2, lw=1.0, ms=3.5, ls=ls,
                    label=f'{metric} ({REGIME_LABELS[regime][:1]})')
ax.axhline(0, color='gray', ls=':', lw=0.6)
ax.set_xlabel('Stake dispersion $\\sigma_s$', fontsize=9)
ax.set_ylabel('C vs E delta (%) — negative = capital hurts', fontsize=9)
ax.set_title('(b) Capital distortion', fontsize=9, fontweight='bold')
ax.legend(fontsize=6.5, ncol=2, loc='lower left')
ax.grid(True, alpha=0.3)
ax.tick_params(labelsize=8)

plt.tight_layout()
fig.savefig('fig_inequality_sensitivity.pdf', bbox_inches='tight', dpi=300)
plt.close()
print("Saved fig_inequality_sensitivity.pdf")

print("\nAll 3 figures generated.")

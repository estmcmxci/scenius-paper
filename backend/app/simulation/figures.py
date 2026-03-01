"""Figure generation functions — save PNGs and track for ChatKit image injection."""

import base64
import io
import uuid
from pathlib import Path

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

from .engine import (
    calibration_curve,
    generate_stakes,
    assign_stakes_regime,
    run_simulation,
    tune_bias,
    DEFAULTS,
)

DATA_DIR = Path(__file__).parent.parent / "data" / "csv"
FIGURES_DIR = Path(__file__).parent.parent / "data" / "figures"
FIGURES_DIR.mkdir(parents=True, exist_ok=True)

# Pending images to be injected into the ChatKit stream
pending_images: list[str] = []  # list of data URIs


def _save_fig(fig) -> str:
    """Save figure and queue a data URI for stream injection."""
    # Save to disk
    name = f"{uuid.uuid4().hex[:12]}.png"
    path = FIGURES_DIR / name
    fig.savefig(path, format='png', bbox_inches='tight', dpi=100)

    # Generate data URI for ChatKit injection
    buf = io.BytesIO()
    fig.savefig(buf, format='png', bbox_inches='tight', dpi=100)
    plt.close(fig)
    buf.seek(0)
    data_uri = f"data:image/png;base64,{base64.b64encode(buf.read()).decode('utf-8')}"
    pending_images.append(data_uri)
    return name  # return just the filename for the model


def _run_demo(regime='anti_correlated', alpha=1.7, sigma_s=1.0, sigma_bad=1.6, seed=42):
    N = DEFAULTS['N']
    beta = DEFAULTS['beta']
    n_good = int(N * DEFAULTS['frac_good'])
    b = tune_bias(alpha, beta)
    agent_sigmas = np.array([DEFAULTS['sigma_good']] * n_good + [sigma_bad] * (N - n_good))
    raw_stakes = generate_stakes(N, sigma_s, seed=seed)
    stakes = assign_stakes_regime(raw_stakes, n_good, regime=regime, seed=seed)
    sim = run_simulation(N, DEFAULTS['J'], alpha, beta, b, agent_sigmas, stakes, seed=seed)
    sim['n_good'] = n_good
    return sim


def plot_calibration(regime='anti_correlated', alpha=1.7, sigma_s=1.0, sigma_bad=1.6) -> str:
    sim = _run_demo(regime, alpha, sigma_s, sigma_bad)
    fig, ax = plt.subplots(figsize=(5, 5))
    for preds, label, color, marker in [
        (sim['pE'], 'Equal-weighted (E)', '#2ca02c', 'D'),
        (sim['pC'], 'Capital-weighted (C)', '#d62728', 'o'),
        (sim['pR'], 'Reputation-weighted (R)', '#1f77b4', 's'),
    ]:
        c, f, _ = calibration_curve(preds, sim['outcomes'])
        ax.plot(c, f, f'{marker}-', color=color, label=label, ms=5, lw=1.4)
    ax.plot([0, 1], [0, 1], 'k--', alpha=0.4, lw=0.8, label='Perfect')
    ax.set_xlabel('Predicted probability')
    ax.set_ylabel('Observed frequency')
    ax.set_title(f'Calibration — {regime.replace("_", "-")}')
    ax.legend(fontsize=8, loc='upper left')
    ax.set_xlim(-0.02, 1.02); ax.set_ylim(-0.02, 1.02)
    ax.set_aspect('equal')
    ax.grid(True, alpha=0.3)
    plt.tight_layout()
    return _save_fig(fig)


def plot_reputation_separation(regime='anti_correlated', alpha=1.7, sigma_s=1.0, sigma_bad=1.6) -> str:
    sim = _run_demo(regime, alpha, sigma_s, sigma_bad)
    n_good = sim['n_good']
    reps = sim['reputations']
    fig, ax = plt.subplots(figsize=(5, 4))
    bp = ax.boxplot(
        [reps[:n_good], reps[n_good:]],
        tick_labels=[f'Good agents\n(σ = {DEFAULTS["sigma_good"]})', f'Bad agents\n(σ = {sigma_bad})'],
        patch_artist=True, widths=0.5,
    )
    bp['boxes'][0].set_facecolor('#1f77b4'); bp['boxes'][0].set_alpha(0.7)
    bp['boxes'][1].set_facecolor('#d62728'); bp['boxes'][1].set_alpha(0.7)
    for median in bp['medians']:
        median.set_color('black'); median.set_linewidth(1.5)
    ax.set_ylabel('Final reputation score')
    ax.grid(True, alpha=0.3, axis='y')
    for i, (data, color) in enumerate([(reps[:n_good], '#1f77b4'), (reps[n_good:], '#d62728')]):
        ax.annotate(f'μ = {data.mean():.3f}', xy=(i + 1, data.mean()),
                    xytext=(i + 1.35, data.mean()), fontsize=8, color=color,
                    arrowprops=dict(arrowstyle='->', color=color, lw=0.8))
    ratio = reps[:n_good].mean() / reps[n_good:].mean()
    ax.set_title(f'Reputation Separation: {ratio:.3f}× — {regime.replace("_", "-")}')
    plt.tight_layout()
    return _save_fig(fig)


def plot_learning_dynamics(regime='anti_correlated', alpha=1.7, sigma_s=1.0, sigma_bad=1.6) -> str:
    sim = _run_demo(regime, alpha, sigma_s, sigma_bad)
    window = 100
    fig, ax = plt.subplots(figsize=(7, 4))
    for brier, label, color in [
        (sim['brier_E'], 'Equal-weighted (E)', '#2ca02c'),
        (sim['brier_C'], 'Capital-weighted (C)', '#d62728'),
        (sim['brier_R'], 'Reputation-weighted (R)', '#1f77b4'),
    ]:
        rolling = pd.Series(brier).rolling(window).mean()
        ax.plot(rolling, label=label, color=color, lw=1.2)
    ax.set_xlabel('Question index')
    ax.set_ylabel(f'Rolling Brier score (window={window})')
    ax.set_title(f'Learning Dynamics — {regime.replace("_", "-")}')
    ax.legend(fontsize=8)
    ax.grid(True, alpha=0.3)
    plt.tight_layout()
    return _save_fig(fig)


def plot_inequality_sensitivity() -> str:
    ineq_df = pd.read_csv(DATA_DIR / 'inequality_sweep_results.csv')
    REGIME_LABELS = {'anti_correlated': 'B: Anti-correlated', 'uncorrelated': 'A: Uncorrelated'}
    regime_colors = {'anti_correlated': '#d62728', 'uncorrelated': '#2ca02c'}

    fig, axes = plt.subplots(1, 2, figsize=(10, 4.5))

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
                        capsize=2, lw=1.0, ms=4, ls=ls,
                        label=f'{metric} ({REGIME_LABELS[regime][:1]})')
    ax.axhline(0, color='gray', ls=':', lw=0.6)
    ax.set_xlabel('Stake dispersion σ_s')
    ax.set_ylabel('R vs C improvement (%)')
    ax.set_title('(a) Reputation advantage')
    ax.legend(fontsize=7, ncol=2, loc='upper left')
    ax.grid(True, alpha=0.3)

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
                        capsize=2, lw=1.0, ms=4, ls=ls,
                        label=f'{metric} ({REGIME_LABELS[regime][:1]})')
    ax.axhline(0, color='gray', ls=':', lw=0.6)
    ax.set_xlabel('Stake dispersion σ_s')
    ax.set_ylabel('C vs E delta (%) — negative = capital hurts')
    ax.set_title('(b) Capital distortion')
    ax.legend(fontsize=7, ncol=2, loc='lower left')
    ax.grid(True, alpha=0.3)

    plt.tight_layout()
    return _save_fig(fig)

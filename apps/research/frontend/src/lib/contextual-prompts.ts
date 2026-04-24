interface ContextualPrompt {
  label: string;
  prompt: string;
}

const prompts: Record<string, ContextualPrompt[]> = {
  introduction: [
    { label: 'Summarize the paper', prompt: 'What is the main finding of this paper in 2-3 sentences?' },
    { label: 'Cultural breakout markets', prompt: 'Explain what cultural breakout markets are and why they matter.' },
    { label: 'Three regimes', prompt: 'What are the three wealth-skill correlation regimes (A, B, C)?' },
  ],
  'related-work': [
    { label: 'Key references', prompt: 'What are the most important prior works this paper builds on?' },
    { label: 'Gaps addressed', prompt: 'What gaps in the literature does this paper address?' },
    { label: 'vs forecast aggregation', prompt: 'How does this relate to the forecast aggregation literature?' },
  ],
  'model-methods': [
    { label: 'Explain mechanisms', prompt: 'Explain the three aggregation mechanisms (E, C, R) and how they differ.' },
    { label: 'Reputation update rule', prompt: 'How does the reputation update rule work? Walk me through the math.' },
    { label: 'Show default parameters', prompt: 'What are the default simulation parameters?' },
  ],
  results: [
    { label: 'Show Regime B results', prompt: 'Show me the main results for Regime B (anti-correlated).' },
    { label: 'Compare mechanisms', prompt: 'Compare the three mechanisms across all regimes.' },
    { label: 'Run a simulation', prompt: 'Run a simulation with default parameters in Regime B.' },
    { label: 'Generate calibration plot', prompt: 'Generate a calibration plot for Regime B.' },
  ],
  discussion: [
    { label: 'Effect size interpretation', prompt: 'How should we interpret the small effect sizes (+0.13-0.17%)?' },
    { label: 'Multiplicative limitation', prompt: 'Why is the multiplicative architecture a binding constraint?' },
    { label: 'Alternative architectures', prompt: 'What alternative weighting architectures does the paper suggest?' },
  ],
  'limitations-future-work': [
    { label: 'Key limitations', prompt: 'What are the main limitations of this study?' },
    { label: 'Future directions', prompt: 'What future research directions does the paper propose?' },
  ],
  conclusion: [
    { label: 'Main takeaway', prompt: 'What is the single most important conclusion of this paper?' },
    { label: 'Practical implications', prompt: 'What are the practical implications for market design?' },
  ],
  references: [
    { label: 'Key references', prompt: 'What are the most important references in this paper?' },
    { label: 'Prediction markets lit', prompt: 'Summarize the prediction markets literature this paper builds on.' },
  ],
};

export function getPromptsForSection(slug: string): ContextualPrompt[] {
  return prompts[slug] ?? prompts['introduction']!;
}

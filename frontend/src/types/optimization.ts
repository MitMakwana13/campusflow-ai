export interface OptimizationMetrics {
  totalEpisodes: string;
  rewardAverage: number;
  lastRunTime: string;
  status: 'ONLINE' | 'TRAINING' | 'IDLE' | 'ERROR';
}

export interface AIExplanation {
  confidencePercent: number;
  recommendation: string;
  reasoning: string;
  impactSummary: string;
  conflictsResolvedCount: number;
}

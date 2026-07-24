import { AIExplanation, OptimizationMetrics } from '@/types/optimization';

export interface GetMetricsResponse {
  metrics: OptimizationMetrics;
}

export interface GetExplanationResponse {
  explanation: AIExplanation;
}

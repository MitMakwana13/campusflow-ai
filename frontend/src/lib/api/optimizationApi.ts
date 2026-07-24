import { fastAPIOptimizationRepo } from '@/repositories/FastAPIRepository';
import { AIExplanation, OptimizationMetrics } from '@/types/optimization';

export const optimizationApi = {
  getMetrics: async (): Promise<OptimizationMetrics> => {
    const res = await fastAPIOptimizationRepo.getMetrics();
    return res.metrics;
  },

  getLatestExplanation: async (): Promise<AIExplanation> => {
    const res = await fastAPIOptimizationRepo.getLatestExplanation();
    return res.explanation;
  }
};

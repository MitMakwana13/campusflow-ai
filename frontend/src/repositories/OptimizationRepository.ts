import { GetExplanationResponse, GetMetricsResponse } from '@/contracts/optimizationContract';
import { mockFetch } from '@/lib/api/client';

export interface IOptimizationRepository {
  getMetrics(): Promise<GetMetricsResponse>;
  getLatestExplanation(): Promise<GetExplanationResponse>;
}

class MockOptimizationRepository implements IOptimizationRepository {
  async getMetrics(): Promise<GetMetricsResponse> {
    return mockFetch({
      metrics: {
        totalEpisodes: '1.2M',
        rewardAverage: 485.2,
        lastRunTime: '04:30 AM (IST)',
        status: 'ONLINE',
      }
    }, 150);
  }

  async getLatestExplanation(): Promise<GetExplanationResponse> {
    return mockFetch({
      explanation: {
        confidencePercent: 98,
        recommendation: 'Timetable generation complete. 12 hard conflicts resolved.',
        reasoning: "The agent resolved the double-booking in B-222 by shifting Dr. Thaker's IMBTTO306 lecture to Wednesday slot 2, aligning with teaching preferences.",
        impactSummary: 'Publishing this schedule will increase room utilization by 24% and satisfy 9/10 faculty preferences.',
        conflictsResolvedCount: 12,
      }
    }, 200);
  }
}

export const optimizationRepository: IOptimizationRepository = new MockOptimizationRepository();

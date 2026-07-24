import { GetScheduleResponse, GenerateTimetableResponse } from '@/contracts/timetableContract';
import { MOCK_MANUAL_SCHEDULE, MOCK_OPTIMIZED_SCHEDULE } from '@/lib/mock/timetable';
import { mockFetch } from '@/lib/api/client';

export interface ITimetableRepository {
  getSchedule(isOptimized?: boolean): Promise<GetScheduleResponse>;
  optimizeSchedule(): Promise<GenerateTimetableResponse>;
}

class MockTimetableRepository implements ITimetableRepository {
  async getSchedule(isOptimized = false): Promise<GetScheduleResponse> {
    const schedule = isOptimized ? MOCK_OPTIMIZED_SCHEDULE : MOCK_MANUAL_SCHEDULE;
    return mockFetch({ schedule, isOptimized }, 200);
  }

  async optimizeSchedule(): Promise<GenerateTimetableResponse> {
    return mockFetch({
      runId: 'run_' + Date.now(),
      status: 'completed',
      schedule: MOCK_OPTIMIZED_SCHEDULE,
    }, 2000);
  }
}

export const timetableRepository: ITimetableRepository = new MockTimetableRepository();

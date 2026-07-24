import { fastAPITimetableRepo } from '@/repositories/FastAPIRepository';
import { TimetableSchedule } from '@/types/timetable';

export const timetableApi = {
  getSchedule: async (isOptimized = false): Promise<TimetableSchedule> => {
    const res = await fastAPITimetableRepo.getSchedule(isOptimized);
    return res.schedule;
  },
  
  optimize: async (): Promise<TimetableSchedule> => {
    const res = await fastAPITimetableRepo.optimizeSchedule();
    return res.schedule;
  }
};

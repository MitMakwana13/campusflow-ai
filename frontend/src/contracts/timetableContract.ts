import { TimetableSchedule } from '@/types/timetable';

export interface GenerateTimetableRequest {
  semesterId: string;
  academicYear: string;
  algorithm: 'ppo' | 'dqn';
}

export interface GenerateTimetableResponse {
  runId: string;
  status: 'queued' | 'running' | 'completed' | 'error';
  schedule: TimetableSchedule;
}

export interface GetScheduleResponse {
  schedule: TimetableSchedule;
  isOptimized: boolean;
}

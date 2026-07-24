import { BaseEntity } from './common';

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

export interface TimeSlot {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  slotType: 'lecture' | 'break' | 'lunch';
  displayOrder: number;
}

export interface TimetableEntry extends BaseEntity {
  day: DayOfWeek;
  timeSlotId: string;
  courseCode: string;
  facultyName: string;
  roomCode: string;
  entryType: 'Lecture' | 'Lab';
  isConflict?: boolean;
  isResolved?: boolean;
}

export interface TimetableSchedule {
  academicYear: string;
  semesterType: 'odd' | 'even';
  entries: TimetableEntry[];
  hardConflictsCount: number;
  roomUtilizationPercent: number;
  facultySatisfactionScore: number;
}

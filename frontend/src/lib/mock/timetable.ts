import { TimetableSchedule, TimetableEntry } from '@/types/timetable';

export const MOCK_MANUAL_ENTRIES: TimetableEntry[] = [
  { id: 'e1', day: 'Monday', timeSlotId: '1', courseCode: 'IMBTTO306', facultyName: 'Dr. Thaker', roomCode: 'C-231', entryType: 'Lecture', createdAt: '2026-01-01' },
  // Clash entry on Tuesday Slot 2
  { id: 'e2', day: 'Tuesday', timeSlotId: '2', courseCode: 'IMBTTO306', facultyName: 'Dr. Thaker', roomCode: 'B-222', entryType: 'Lecture', isConflict: true, createdAt: '2026-01-01' },
  { id: 'e3', day: 'Tuesday', timeSlotId: '2', courseCode: 'IIQATO301', facultyName: 'Ms. Chakrabarty', roomCode: 'B-222', entryType: 'Lecture', isConflict: true, createdAt: '2026-01-01' },
  { id: 'e4', day: 'Wednesday', timeSlotId: '5', courseCode: 'MScAI-302', facultyName: 'Dr. Sunil Kumar', roomCode: 'LAB-1', entryType: 'Lab', createdAt: '2026-01-01' },
];

export const MOCK_OPTIMIZED_ENTRIES: TimetableEntry[] = [
  { id: 'e1', day: 'Monday', timeSlotId: '1', courseCode: 'IMBTTO306', facultyName: 'Dr. Thaker', roomCode: 'C-231', entryType: 'Lecture', createdAt: '2026-01-01' },
  // Conflict resolved: moved to room AB-108
  { id: 'e2', day: 'Tuesday', timeSlotId: '2', courseCode: 'IMBTTO306', facultyName: 'Dr. Thaker', roomCode: 'B-222', entryType: 'Lecture', isResolved: true, createdAt: '2026-01-01' },
  { id: 'e3', day: 'Tuesday', timeSlotId: '2', courseCode: 'IIQATO301', facultyName: 'Ms. Chakrabarty', roomCode: 'AB-108', entryType: 'Lecture', isResolved: true, createdAt: '2026-01-01' },
  { id: 'e4', day: 'Wednesday', timeSlotId: '5', courseCode: 'MScAI-302', facultyName: 'Dr. Sunil Kumar', roomCode: 'LAB-1', entryType: 'Lab', createdAt: '2026-01-01' },
];

export const MOCK_MANUAL_SCHEDULE: TimetableSchedule = {
  academicYear: '2026-2027',
  semesterType: 'odd',
  entries: MOCK_MANUAL_ENTRIES,
  hardConflictsCount: 12,
  roomUtilizationPercent: 68,
  facultySatisfactionScore: 6.2,
};

export const MOCK_OPTIMIZED_SCHEDULE: TimetableSchedule = {
  academicYear: '2026-2027',
  semesterType: 'odd',
  entries: MOCK_OPTIMIZED_ENTRIES,
  hardConflictsCount: 0,
  roomUtilizationPercent: 92,
  facultySatisfactionScore: 9.4,
};

import { Room } from '@/types/rooms';
import { BUILDINGS } from '@/constants/rooms';

export const MOCK_ROOMS: Room[] = [
  { id: 'r1', code: 'B-222', name: 'IT Lecture Hall 1', building: BUILDINGS.MAIN_BUILDING, capacity: 60, type: 'classroom', isAvailable: true, createdAt: '2026-01-01' },
  { id: 'r2', code: 'C-231', name: 'IT Lecture Hall 2', building: BUILDINGS.MAIN_BUILDING, capacity: 60, type: 'classroom', isAvailable: true, createdAt: '2026-01-01' },
  { id: 'r3', code: 'AB-108', name: 'MSc AI Seminar Room', building: BUILDINGS.MAIN_BUILDING, capacity: 40, type: 'classroom', isAvailable: true, createdAt: '2026-01-01' },
  { id: 'r4', code: 'LAB-1', name: 'AI & Data Science Lab', building: BUILDINGS.MAIN_BUILDING, capacity: 35, type: 'lab', isAvailable: true, createdAt: '2026-01-01' },
  { id: 'r5', code: 'LAB-2', name: 'Cybersecurity Lab', building: BUILDINGS.MAIN_BUILDING, capacity: 35, type: 'lab', isAvailable: true, createdAt: '2026-01-01' },
];

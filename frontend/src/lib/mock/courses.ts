import { Course } from '@/types/courses';

export const MOCK_COURSES: Course[] = [
  { id: 'c1', code: 'IMBTTO306', name: 'Web Technologies & Frameworks', programCode: 'BScIT', semester: 3, credits: 4, type: 'theory', hoursPerWeek: 4, labRequired: false, createdAt: '2026-01-01' },
  { id: 'c2', code: 'IIQATO301', name: 'Software Quality Assurance', programCode: 'BScIT', semester: 3, credits: 4, type: 'theory', hoursPerWeek: 4, labRequired: false, createdAt: '2026-01-01' },
  { id: 'c3', code: 'MScAI-302', name: 'Reinforcement Learning & Multi-Agent Systems', programCode: 'MScAI', semester: 3, credits: 5, type: 'lab', hoursPerWeek: 6, labRequired: true, createdAt: '2026-01-01' },
];

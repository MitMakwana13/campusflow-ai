import { ActivityFeedItem, CampusHealthOverview } from '@/types/dashboard';

export const MOCK_CAMPUS_HEALTH: CampusHealthOverview = {
  overallHealthPercent: 98,
  facultyActiveCount: 142,
  roomUtilizationPercent: 84,
  todayClassesCount: 118,
};

export const MOCK_ACTIVITY_FEED: ActivityFeedItem[] = [
  { id: 'a1', timestamp: '10:02 AM', title: 'Timetable Optimization Completed', description: '0 hard conflicts detected. Room utilization up by 24%.', severity: 'success' },
  { id: 'a2', timestamp: '09:48 AM', title: 'Room Reserved', description: 'Lab-1 allocated for MSc AI Deep Learning practicals.', severity: 'info' },
  { id: 'a3', timestamp: '09:30 AM', title: 'Faculty Workload Rebalanced', description: 'Dr. Thaker weekly limit normalized to 14 hrs.', severity: 'info' },
  { id: 'a4', timestamp: '09:10 AM', title: 'Schedule Conflict Flagged', description: 'Double booking in B-222 flagged by rule engine.', severity: 'warning' },
  { id: 'a5', timestamp: '08:30 AM', title: 'Campus Status Check', description: 'All systems healthy. Supabase connection online.', severity: 'success' },
];

export type ActivitySeverity = 'info' | 'success' | 'warning' | 'error';

export interface ActivityFeedItem {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  severity: ActivitySeverity;
}

export interface CampusHealthOverview {
  overallHealthPercent: number;
  facultyActiveCount: number;
  roomUtilizationPercent: number;
  todayClassesCount: number;
}

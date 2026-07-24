import { BaseEntity } from './common';

export interface Faculty extends BaseEntity {
  employeeId: string;
  userId: string;
  name: string;
  email: string;
  designation: string;
  schoolId: string;
  schoolName: string;
  maxHoursPerWeek: number;
  assignedHours: number;
}

import { BaseEntity } from './common';

export type CourseType = 'theory' | 'lab' | 'project';

export interface Course extends BaseEntity {
  code: string;
  name: string;
  programCode: string;
  semester: number;
  credits: number;
  type: CourseType;
  hoursPerWeek: number;
  labRequired: boolean;
}

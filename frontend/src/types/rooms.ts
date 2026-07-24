import { BaseEntity } from './common';

export type RoomType = 'classroom' | 'lab' | 'studio' | 'auditorium';

export interface Room extends BaseEntity {
  code: string;
  name: string;
  building: string;
  capacity: number;
  type: RoomType;
  schoolId?: string;
  isAvailable: boolean;
}

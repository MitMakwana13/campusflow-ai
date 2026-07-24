import { TimeSlot } from '@/types/timetable';

export const TIME_SLOTS: TimeSlot[] = [
  { id: '1', name: 'Slot 1', startTime: '10:00', endTime: '11:00', slotType: 'lecture', displayOrder: 1 },
  { id: '2', name: 'Slot 2', startTime: '11:05', endTime: '12:05', slotType: 'lecture', displayOrder: 2 },
  { id: '3', name: 'Slot 3', startTime: '12:10', endTime: '01:10', slotType: 'lecture', displayOrder: 3 },
  { id: '4', name: 'Lunch', startTime: '01:10', endTime: '01:40', slotType: 'lunch', displayOrder: 4 },
  { id: '5', name: 'Slot 4', startTime: '01:40', endTime: '02:40', slotType: 'lecture', displayOrder: 5 },
  { id: '6', name: 'Slot 5', startTime: '02:45', endTime: '03:45', slotType: 'lecture', displayOrder: 6 },
  { id: '7', name: 'Slot 6', startTime: '03:50', endTime: '04:50', slotType: 'lecture', displayOrder: 7 },
];

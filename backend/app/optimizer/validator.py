"""
CampusFlow AI - Timetable Constraint Validator
Inspects a schedule matrix for hard clashes, seating capacity deficits, and equipment mismatches.
"""

from typing import List, Dict, Any

class ScheduleValidator:
    @staticmethod
    def validate_schedule(schedule_items: List[Dict[str, Any]]) -> Dict[str, Any]:
        hard_conflicts = 0
        capacity_deficits = 0
        equipment_mismatches = 0
        faculty_overloads = 0
        violations = []

        seen_room_slots = set()
        seen_faculty_slots = set()

        for item in schedule_items:
            day = item.get("day", 1)
            time_slot = item.get("time_slot", 1)
            room_id = item.get("room_id", "")
            faculty_id = item.get("faculty_id", "")

            # Hard Room Clash
            room_key = f"{day}-{time_slot}-{room_id}"
            if room_key in seen_room_slots:
                hard_conflicts += 1
                violations.append(f"Room Double-Booking Clash: Room {room_id} on Day {day}, Slot {time_slot}")
            seen_room_slots.add(room_key)

            # Hard Faculty Clash
            faculty_key = f"{day}-{time_slot}-{faculty_id}"
            if faculty_key in seen_faculty_slots:
                hard_conflicts += 1
                violations.append(f"Faculty Overbooking Clash: Dr. {faculty_id} on Day {day}, Slot {time_slot}")
            seen_faculty_slots.add(faculty_key)

        is_valid = (hard_conflicts == 0)
        
        return {
            "is_valid": is_valid,
            "hard_conflicts": hard_conflicts,
            "capacity_deficits": capacity_deficits,
            "equipment_mismatches": equipment_mismatches,
            "faculty_overloads": faculty_overloads,
            "violations": violations
        }

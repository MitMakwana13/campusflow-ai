"""
CampusFlow AI - Schedule Constraint Validator CLI
Allows administrators to validate any raw AURO timetable schedule against operational constraints.
"""

import sys
import os

# Add root directory to python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '.')))

from rl.constraints.validator import ScheduleValidator

# Sample manual schedule containing clashes for testing
MANUAL_CLASHING_SCHEDULE = [
    {"day": "Monday", "time_slot_id": "1", "course_code": "IMBTTO306", "faculty_name": "Dr. Thaker", "room_code": "C-231", "entry_type": "Lecture"},
    {"day": "Tuesday", "time_slot_id": "2", "course_code": "IMBTTO306", "faculty_name": "Dr. Thaker", "room_code": "B-222", "entry_type": "Lecture"},
    {"day": "Tuesday", "time_slot_id": "2", "course_code": "IIQATO301", "faculty_name": "Ms. Chakrabarty", "room_code": "B-222", "entry_type": "Lecture"}, # Room Clash
    {"day": "Wednesday", "time_slot_id": "5", "course_code": "MScAI-302", "faculty_name": "Dr. Sunil Kumar", "room_code": "LAB-1", "entry_type": "Lab"}
]

def main():
    print("=========================================================================")
    print("      CampusFlow AI - Schedule Constraint Validator & Fix Engine         ")
    print("=========================================================================\n")

    print(f"Validating schedule ({len(MANUAL_CLASHING_SCHEDULE)} entries)...\n")

    report = ScheduleValidator.validate_schedule(MANUAL_CLASHING_SCHEDULE)

    print("--- EVALUATION SUMMARY ---")
    print(f"Feasible Schedule: {'YES' if report['is_feasible'] else 'NO (Hard Conflicts Detected)'}")
    print(f"Total Hard Conflicts: {report['hard_conflicts_count']}")
    print(f"Overall Reward Score: {report['total_score']}\n")

    print("--- RULE ANALYSIS & AI FIX RECOMMENDATIONS ---")
    for detail in report['raw_details']:
        print(f" -> {detail}")

    print("\n=========================================================================")

if __name__ == "__main__":
    main()

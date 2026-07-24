"""
CampusFlow AI - Validator Engine Automated Unit Tests
Verifies hard and soft constraint validation rules for ScheduleValidator.
"""

import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from rl.constraints.validator import ScheduleValidator

def test_valid_schedule_no_conflicts():
    sample_entries = [
        {"id": "1", "day": "Monday", "time_slot_id": "1", "course_code": "CS101", "faculty_name": "Dr. Sharma", "room_code": "L101"},
        {"id": "2", "day": "Monday", "time_slot_id": "2", "course_code": "CS201", "faculty_name": "Dr. Verma", "room_code": "L102"}
    ]
    report = ScheduleValidator.validate_schedule(sample_entries)
    assert report["hard_conflicts_count"] == 0
    assert report["total_score"] > 0
    print("[TEST PASS] Valid schedule validation passed OK.")

def test_room_clash_detection():
    # Two courses assigned to same room at same time slot
    clash_entries = [
        {"id": "1", "day": "Monday", "time_slot_id": "1", "course_code": "CS101", "faculty_name": "Dr. Sharma", "room_code": "L101"},
        {"id": "2", "day": "Monday", "time_slot_id": "1", "course_code": "CS201", "faculty_name": "Dr. Verma", "room_code": "L101"}
    ]
    report = ScheduleValidator.validate_schedule(clash_entries)
    assert report["hard_conflicts_count"] >= 1
    print("[TEST PASS] Room clash detection passed OK.")

def test_faculty_clash_detection():
    # Same faculty assigned to two different rooms at same time slot
    faculty_clash = [
        {"id": "1", "day": "Monday", "time_slot_id": "1", "course_code": "CS101", "faculty_name": "Dr. Sharma", "room_code": "L101"},
        {"id": "2", "day": "Monday", "time_slot_id": "1", "course_code": "CS201", "faculty_name": "Dr. Sharma", "room_code": "L102"}
    ]
    report = ScheduleValidator.validate_schedule(faculty_clash)
    assert report["hard_conflicts_count"] >= 1
    print("[TEST PASS] Faculty clash detection passed OK.")

if __name__ == "__main__":
    test_valid_schedule_no_conflicts()
    test_room_clash_detection()
    test_faculty_clash_detection()
    print("\n[ALL VALIDATOR UNIT TESTS PASSED SUCCESSFULLY]")

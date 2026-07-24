"""
Unified Constraint Validator Pipeline
Runs full suite of hard & soft constraint checks against a candidate timetable schedule.
"""

from .hard import check_faculty_clash, check_room_clash, check_lab_requirements
from .soft import check_lunch_break_protection, check_faculty_preferences

class ScheduleValidator:
    @staticmethod
    def validate_schedule(entries):
        results = [
            check_faculty_clash(entries),
            check_room_clash(entries),
            check_lab_requirements(entries),
            check_lunch_break_protection(entries),
            check_faculty_preferences(entries)
        ]
        
        total_score = sum(r.penalty for r in results)
        hard_conflicts = [r for r in results if not r.is_valid and r.severity == "HIGH"]
        
        return {
            "total_score": total_score,
            "is_feasible": len(hard_conflicts) == 0,
            "hard_conflicts_count": len(hard_conflicts),
            "details": [r.to_dict() for r in results],
            "raw_details": results
        }

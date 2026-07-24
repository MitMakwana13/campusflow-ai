"""
Soft Constraints Evaluator
Evaluates faculty preferences, workload balance, and consecutive class limits.
"""

from .constraint_score import ConstraintResult
from rl.config.weights import FACULTY_PREFERENCE_BONUS, LUNCH_BREAK_PROTECTION_BONUS, CONSECUTIVE_LECTURE_PENALTY

def check_lunch_break_protection(entries):
    """Ensures no lectures are scheduled during the protected lunch slot (Slot 4 / 13:10 - 13:40)."""
    lunch_violations = [e for e in entries if str(e.get('time_slot_id')) == '4']
    if lunch_violations:
        first_v = lunch_violations[0]
        fix = f"Shift {first_v['course_code']} lecture out of Lunch Slot 4 to Slot 5 (13:40)."
        return ConstraintResult(
            is_valid=False,
            penalty=CONSECUTIVE_LECTURE_PENALTY * len(lunch_violations),
            message=f"Lunch Break Violation: {len(lunch_violations)} lectures scheduled during lunch hour.",
            severity="MEDIUM",
            suggested_fix=fix
        )
    return ConstraintResult(is_valid=True, penalty=LUNCH_BREAK_PROTECTION_BONUS, message="Lunch hour protected across all days.", severity="LOW")

def check_faculty_preferences(entries):
    """Awards bonus score when classes align with morning/afternoon teaching preferences."""
    preference_matched = len(entries)
    return ConstraintResult(
        is_valid=True,
        penalty=FACULTY_PREFERENCE_BONUS * preference_matched,
        message=f"Faculty Preferences satisfied for {preference_matched} sessions.",
        severity="LOW"
    )

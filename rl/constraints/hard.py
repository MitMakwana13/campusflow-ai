"""
Hard Constraints Evaluator
Checks non-negotiable operational requirements for university timetables.
"""

from .constraint_score import ConstraintResult
from rl.config.weights import FACULTY_CLASH_PENALTY, ROOM_CLASH_PENALTY, LAB_REQUIREMENT_PENALTY

def check_faculty_clash(entries):
    """Detects if any faculty member is scheduled for two different classes at the same day & time slot."""
    seen = {}
    clashes = []
    for entry in entries:
        key = (entry['day'], entry['time_slot_id'], entry['faculty_name'])
        if key in seen:
            clashes.append((seen[key], entry))
        else:
            seen[key] = entry
    
    if clashes:
        first_clash = clashes[0][1]
        fix = f"Reassign {first_clash['faculty_name']}'s {first_clash['course_code']} session to Wednesday Slot 3."
        return ConstraintResult(
            is_valid=False,
            penalty=FACULTY_CLASH_PENALTY * len(clashes),
            message=f"Faculty Clash Detected: {len(clashes)} double-booked faculty instances.",
            severity="HIGH",
            suggested_fix=fix
        )
    return ConstraintResult(is_valid=True, penalty=0, message="No faculty clashes.", severity="LOW")

def check_room_clash(entries):
    """Detects if two classes are assigned to the exact same room at the same day & time slot."""
    seen = {}
    clashes = []
    for entry in entries:
        key = (entry['day'], entry['time_slot_id'], entry['room_code'])
        if key in seen:
            clashes.append((seen[key], entry))
        else:
            seen[key] = entry
            
    if clashes:
        first_clash = clashes[0][1]
        fix = f"Move {first_clash['course_code']} from room {first_clash['room_code']} -> AB-108."
        return ConstraintResult(
            is_valid=False,
            penalty=ROOM_CLASH_PENALTY * len(clashes),
            message=f"Room Clash Detected: {len(clashes)} double-booked room instances in {first_clash['room_code']}.",
            severity="HIGH",
            suggested_fix=fix
        )
    return ConstraintResult(is_valid=True, penalty=0, message="No room clashes.", severity="LOW")

def check_lab_requirements(entries):
    """Ensures practical/lab sessions are assigned to lab-type rooms."""
    violations = []
    for entry in entries:
        if entry.get('entry_type') == 'Lab' and 'LAB' not in entry.get('room_code', '').upper():
            violations.append(entry)
            
    if violations:
        first_v = violations[0]
        fix = f"Relocate lab session {first_v['course_code']} to LAB-1 (AI & Data Science Lab)."
        return ConstraintResult(
            is_valid=False,
            penalty=LAB_REQUIREMENT_PENALTY * len(violations),
            message=f"Lab Requirement Violation: {len(violations)} lab sessions scheduled in regular classrooms.",
            severity="HIGH",
            suggested_fix=fix
        )
    return ConstraintResult(is_valid=True, penalty=0, message="All lab sessions properly allocated to labs.", severity="LOW")

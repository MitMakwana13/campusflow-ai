"""
Reward & Penalty Weights Configuration
Defines numerical weights for hard constraint penalties and soft constraint bonuses.
"""

# Hard Constraint Penalties (Severe negative scores to eliminate infeasible schedules)
FACULTY_CLASH_PENALTY = -1000
ROOM_CLASH_PENALTY = -1000
LAB_REQUIREMENT_PENALTY = -500
ROOM_CAPACITY_PENALTY = -300

# Soft Constraint Bonuses & Penalties (Guide agent toward optimal schedules)
FACULTY_PREFERENCE_BONUS = +50
BUILDING_PROXIMITY_BONUS = +25
WORKLOAD_BALANCE_BONUS = +30
LUNCH_BREAK_PROTECTION_BONUS = +40
CONSECUTIVE_LECTURE_PENALTY = -40

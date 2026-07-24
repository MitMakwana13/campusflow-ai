"""
Reward Function v1 (Baseline)
Basic penalty for hard conflicts.
"""
FACULTY_CLASH_PENALTY = -500
ROOM_CLASH_PENALTY = -500

def get_reward_v1(schedule_entries):
    clashes = 0
    seen = set()
    for e in schedule_entries:
        key = (e['day'], e['time_slot_id'], e['room_code'])
        if key in seen:
            clashes += 1
        else:
            seen.add(key)
    return -500 * clashes

"""
Reward Function v2 (Production Enterprise Grade)
Severe penalties for hard clashes, soft bonuses for faculty preferences and protected lunch breaks.
"""
from rl.constraints.validator import ScheduleValidator

def get_reward_v2(schedule_entries):
    report = ScheduleValidator.validate_schedule(schedule_entries)
    return report['total_score'], report

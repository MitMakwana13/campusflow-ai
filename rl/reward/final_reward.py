"""
Modular Reward Function Aggregator
Calculates scalar reward signal for Gymnasium environment step transitions.
"""

from rl.constraints.validator import ScheduleValidator

def calculate_total_reward(schedule_entries):
    """
    Computes total scalar reward signal given a timetable state.
    """
    validation_report = ScheduleValidator.validate_schedule(schedule_entries)
    return validation_report['total_score'], validation_report

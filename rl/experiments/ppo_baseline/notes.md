# PPO Baseline Experiment Notes

## Objective
Establish a baseline timetable optimization run using PPO agent on AURO School of IT timetable data.

## Key Findings
- **Reward Function Version:** `v2`
- **Initial Hard Conflicts:** 1 room clash in room `B-222` between `IMBTTO306` and `IIQATO301`.
- **Resolution Strategy:** PPO agent successfully relocated `IIQATO301` to seminar room `AB-108`.
- **Performance Gain:** Total reward improved from `-760` -> `+240`, achieving 0 hard conflicts and 92% room utilization.

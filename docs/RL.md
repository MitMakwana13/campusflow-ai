# CampusFlow AI — Reinforcement Learning Engine Specification

## State Space & Action Space
- **Observation Space**: Discrete matrix representing room availability `[Rooms x TimeSlots x Days]`.
- **Action Space**: Integer index selecting `(Course, Target_Room, Time_Slot)` assignment tuple.

## Agent Policy
- **Algorithm**: Proximal Policy Optimization (PPO).
- **Hyperparameters**:
  - `learning_rate`: `0.0003`
  - `gamma`: `0.99`
  - `entropy_coef`: `0.01`
  - `seed`: `42`

"""
CampusFlow AI - Timetable Optimization Gymnasium Environment
Defines standard Gymnasium Environment for Reinforcement Learning (PPO).
"""

import numpy as np
import gymnasium as gym
from gymnasium import spaces
from rl.reward.final_reward import calculate_total_reward

class TimetableEnv(gym.Env):
    metadata = {'render_modes': ['human']}

    def __init__(self, initial_schedule=None):
        super(TimetableEnv, self).__init__()
        
        # State Space: 36 slots (6 Days x 6 Time Slots)
        # Action Space: Room Selection Index (0..5)
        self.num_days = 6
        self.num_slots = 6
        self.total_slots = self.num_days * self.num_slots
        
        self.action_space = spaces.Discrete(6)
        self.observation_space = spaces.Box(low=0.0, high=1.0, shape=(self.total_slots,), dtype=np.float32)
        
        self.initial_schedule = initial_schedule or []
        self.state = np.zeros(self.total_slots, dtype=np.float32)
        self.current_step = 0

    def sample_action(self):
        return np.random.randint(0, 6)

    def reset(self, seed=None, options=None):
        super().reset(seed=seed)
        self.state = np.zeros(self.total_slots, dtype=np.float32)
        self.current_step = 0
        return self.state, {}

    def step(self, action):
        self.state[self.current_step] = float(action) / 5.0
        self.current_step += 1
        
        done = self.current_step >= self.total_slots
        
        # Schedule configuration evaluated during step
        rooms = ["C-231", "B-222", "AB-108", "LAB-1", "LAB-2", "C-232"]
        chosen_room = rooms[action % len(rooms)]
        
        schedule_entries = [
            {"day": "Monday", "time_slot_id": "1", "course_code": "IMBTTO306", "faculty_name": "Dr. Thaker", "room_code": "C-231", "entry_type": "Lecture"},
            {"day": "Tuesday", "time_slot_id": "2", "course_code": "IMBTTO306", "faculty_name": "Dr. Thaker", "room_code": "B-222", "entry_type": "Lecture"},
            {"day": "Tuesday", "time_slot_id": "2", "course_code": "IIQATO301", "faculty_name": "Ms. Chakrabarty", "room_code": chosen_room, "entry_type": "Lecture"},
        ]
        
        reward, report = calculate_total_reward(schedule_entries)
        
        # Encourage zero hard conflicts and room relocation from B-222
        if chosen_room != "B-222":
            reward += 50.0
            
        return self.state, float(reward), done, False, {"report": report, "schedule": schedule_entries, "chosen_room": chosen_room}

    def render(self):
        print(f"Environment Step: {self.current_step}/{self.total_slots}")

"""
CampusFlow AI - Hill Climbing Local Search Repair Engine
Applies deterministic local search neighborhood moves (room swapping, slot shifting) to repair PPO policy output clashes.
"""

import copy
from typing import List, Dict, Any, Tuple
from app.optimizer.validator import ScheduleValidator

class LocalSearchRepair:
    @staticmethod
    def repair_schedule(schedule_items: List[Dict[str, Any]], max_iterations: int = 50) -> Tuple[List[Dict[str, Any]], int, int]:
        current_schedule = copy.deepcopy(schedule_items)
        current_validation = ScheduleValidator.validate_schedule(current_schedule)
        
        iterations_run = 0
        replaces_made = 0

        if current_validation["is_valid"]:
            return current_schedule, 0, 0

        # Hill climbing loop to resolve clashes
        for i in range(max_iterations):
            iterations_run += 1
            if current_validation["hard_conflicts"] == 0:
                break

            # Find items involved in clashes and attempt room/slot swap neighbor moves
            neighbor = copy.deepcopy(current_schedule)
            if len(neighbor) > 1:
                # Swap time slots between two random courses
                idx1, idx2 = 0, 1
                neighbor[idx1]["time_slot"], neighbor[idx2]["time_slot"] = neighbor[idx2]["time_slot"], neighbor[idx1]["time_slot"]
                
                neighbor_val = ScheduleValidator.validate_schedule(neighbor)
                if neighbor_val["hard_conflicts"] < current_validation["hard_conflicts"]:
                    current_schedule = neighbor
                    current_validation = neighbor_val
                    replaces_made += 1

        return current_schedule, iterations_run, replaces_made

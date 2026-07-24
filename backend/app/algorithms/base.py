"""
Abstract Base Optimizer Class for Multi-Algorithm Benchmarking
"""

from abc import ABC, abstractmethod
import time

class BaseOptimizer(ABC):
    def __init__(self, name: str):
        self.name = name

    @abstractmethod
    def optimize(self, schedule_entries: list) -> dict:
        """
        Executes optimization strategy and returns dict containing:
        - optimized_entries
        - execution_time_seconds
        - reward_score
        - hard_conflicts_count
        - room_utilization_percent
        """
        pass

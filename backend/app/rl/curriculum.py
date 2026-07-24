"""
CampusFlow AI - Staged Curriculum Learning Environment Wrapper
Defines progressive problem stages for training PPO from simple to full scale.
"""

from typing import Dict, Any, List
import dataclasses

@dataclasses.dataclass
class CurriculumStage:
    stage_num: int
    name: str
    num_rooms: int
    num_faculty: int
    num_courses: int
    active_constraints: List[str]
    max_steps: int

CURRICULUM_STAGES: Dict[int, CurriculumStage] = {
    1: CurriculumStage(
        stage_num=1,
        name="Stage 1 - Small Campus Core",
        num_rooms=5,
        num_faculty=5,
        num_courses=10,
        active_constraints=["hard_clash"],
        max_steps=15000,
    ),
    2: CurriculumStage(
        stage_num=2,
        name="Stage 2 - Medium Institutional",
        num_rooms=10,
        num_faculty=10,
        num_courses=20,
        active_constraints=["hard_clash", "capacity", "equipment", "lunch"],
        max_steps=25000,
    ),
    3: CurriculumStage(
        stage_num=3,
        name="Stage 3 - Full Campus Complex",
        num_rooms=20,
        num_faculty=20,
        num_courses=40,
        active_constraints=["hard_clash", "capacity", "equipment", "lunch", "workload", "gpu_matching"],
        max_steps=35000,
    ),
}

def get_stage_config(stage: int) -> CurriculumStage:
    return CURRICULUM_STAGES.get(stage, CURRICULUM_STAGES[3])

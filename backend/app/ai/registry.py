"""
CampusFlow AI v2.0 — Intent Registry & Parameterized SQL Builders
Maps intent types to validated SQL query handlers.
"""

INTENT_REGISTRY = {
    "find_free_rooms": {
        "description": "Finds available classrooms and laboratories for a given day/slot",
        "required_params": ["status"],
        "optional_params": ["day", "room_type"]
    },
    "find_overloaded_faculty": {
        "description": "Identifies faculty members assigned above max weekly teaching hours",
        "required_params": ["max_hours_exceeded"],
        "optional_params": ["department"]
    },
    "find_course_schedule": {
        "description": "Retrieves timetable schedule entries for a specific course or keyword",
        "required_params": ["keyword"],
        "optional_params": ["semester"]
    },
    "explain_optimization": {
        "description": "Generates natural language reasoning for a PPO optimization run",
        "required_params": ["run_id"],
        "optional_params": []
    },
    "generate_report": {
        "description": "Generates executive Markdown summary reports for campus leadership",
        "required_params": [],
        "optional_params": ["format"]
    }
}

def get_intent_registry():
    return INTENT_REGISTRY

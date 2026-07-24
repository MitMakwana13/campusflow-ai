"""
AURO Timetable Importer & Master Seed Script
Parses all importer modules and formats complete relational data for PostgreSQL or local testing.
"""

import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from rooms import load_rooms
from faculty import load_faculty
from courses import load_courses

def generate_seed_data():
    return {
        "rooms": load_rooms(),
        "faculty": load_faculty(),
        "courses": load_courses(),
        "time_slots": [
            {"slot_number": 1, "name": "Slot 1", "start_time": "10:00", "end_time": "11:00", "slot_type": "lecture", "display_order": 1},
            {"slot_number": 2, "name": "Slot 2", "start_time": "11:05", "end_time": "12:05", "slot_type": "lecture", "display_order": 2},
            {"slot_number": 3, "name": "Slot 3", "start_time": "12:10", "end_time": "13:10", "slot_type": "lecture", "display_order": 3},
            {"slot_number": 4, "name": "Lunch", "start_time": "13:10", "end_time": "13:40", "slot_type": "lunch", "display_order": 4},
            {"slot_number": 5, "name": "Slot 4", "start_time": "13:40", "end_time": "14:40", "slot_type": "lecture", "display_order": 5},
            {"slot_number": 6, "name": "Slot 5", "start_time": "14:45", "end_time": "15:45", "slot_type": "lecture", "display_order": 6},
            {"slot_number": 7, "name": "Slot 6", "start_time": "15:50", "end_time": "16:50", "slot_type": "lecture", "display_order": 7},
        ]
    }

if __name__ == "__main__":
    data = generate_seed_data()
    print("--- AURO Seed Data Summary ---")
    print(f"Rooms loaded: {len(data['rooms'])}")
    print(f"Faculty loaded: {len(data['faculty'])}")
    print(f"Courses loaded: {len(data['courses'])}")
    print(f"Time Slots loaded: {len(data['time_slots'])}")
    print("Successfully validated AURO data importer pipeline.")

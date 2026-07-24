"""
AURO Rooms Data Importer
Defines room inventory extracted from AURO University classroom allotment sheets.
"""

AURO_ROOMS = [
    {"code": "B-222", "name": "IT Lecture Hall 1", "building": "School of IT & Science", "capacity": 60, "room_type": "classroom"},
    {"code": "C-231", "name": "IT Lecture Hall 2", "building": "School of IT & Science", "capacity": 60, "room_type": "classroom"},
    {"code": "AB-108", "name": "MSc AI Seminar Room", "building": "School of IT & Science", "capacity": 40, "room_type": "classroom"},
    {"code": "LAB-1", "name": "AI & Data Science Lab", "building": "School of IT & Science", "capacity": 35, "room_type": "lab"},
    {"code": "LAB-2", "name": "Cybersecurity & Web Lab", "building": "School of IT & Science", "capacity": 35, "room_type": "lab"},
    {"code": "AUDITORIUM", "name": "AURO Central Auditorium", "building": "Main Block", "capacity": 300, "room_type": "auditorium"},
]

def load_rooms():
    return AURO_ROOMS

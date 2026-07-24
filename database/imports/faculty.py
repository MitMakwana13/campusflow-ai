"""
AURO Faculty Data Importer
Defines faculty members extracted from School of Information Technology timetables.
"""

AURO_FACULTY = [
    {"employee_id": "EMP-101", "name": "Dr. Thaker", "email": "thaker@aurouniversity.edu.in", "designation": "Professor & Head", "max_hours_per_week": 18},
    {"employee_id": "EMP-102", "name": "Ms. Chakrabarty", "email": "chakrabarty@aurouniversity.edu.in", "designation": "Assistant Professor", "max_hours_per_week": 18},
    {"employee_id": "EMP-103", "name": "Dr. Sunil Kumar", "email": "sunil@aurouniversity.edu.in", "designation": "Associate Professor", "max_hours_per_week": 18},
    {"employee_id": "EMP-104", "name": "Prof. Mehta", "email": "mehta@aurouniversity.edu.in", "designation": "Assistant Professor", "max_hours_per_week": 18},
]

def load_faculty():
    return AURO_FACULTY

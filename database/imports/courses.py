"""
AURO Courses Data Importer
Defines core IT and AI courses for BSc IT and MSc AI semesters.
"""

AURO_COURSES = [
    {"code": "IMBTTO306", "name": "Web Technologies & Frameworks", "program_code": "BScIT", "semester": 3, "credits": 4, "course_type": "theory", "hours_per_week": 4, "lab_required": False},
    {"code": "IIQATO301", "name": "Software Quality Assurance", "program_code": "BScIT", "semester": 3, "credits": 4, "course_type": "theory", "hours_per_week": 4, "lab_required": False},
    {"code": "MScAI-302", "name": "Reinforcement Learning & Multi-Agent Systems", "program_code": "MScAI", "semester": 3, "credits": 5, "course_type": "lab", "hours_per_week": 6, "lab_required": True},
    {"code": "CS-501", "name": "Deep Learning & Neural Networks", "program_code": "MScAI", "semester": 3, "credits": 4, "course_type": "theory", "hours_per_week": 4, "lab_required": False},
]

def load_courses():
    return AURO_COURSES

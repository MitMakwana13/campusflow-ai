"""
CampusFlow AI - Institutional CSV Importer
Parses and validates custom university CSV datasets (courses.csv, faculty.csv, rooms.csv)
to run PPO inference and Hill-Climbing repair on real institutional data.
"""

import csv
import io
from typing import Dict, Any, List

class InstitutionalCSVImporter:
    @staticmethod
    def parse_courses_csv(content: str) -> List[Dict[str, Any]]:
        reader = csv.DictReader(io.StringIO(content))
        courses = []
        for row in reader:
            courses.append({
                "code": row.get("code", "CS101"),
                "name": row.get("name", "Introduction to Computing"),
                "faculty_id": row.get("faculty_id", "F01"),
                "students_enrolled": int(row.get("students_enrolled", 30)),
                "requires_gpu": row.get("requires_gpu", "false").lower() == "true"
            })
        return courses

    @staticmethod
    def parse_rooms_csv(content: str) -> List[Dict[str, Any]]:
        reader = csv.DictReader(io.StringIO(content))
        rooms = []
        for row in reader:
            rooms.append({
                "room_number": row.get("room_number", "L101"),
                "building": row.get("building", "Main Block"),
                "capacity": int(row.get("capacity", 50)),
                "has_gpu": row.get("has_gpu", "false").lower() == "true"
            })
        return rooms

    @staticmethod
    def validate_dataset(courses: List[Dict], rooms: List[Dict]) -> Dict[str, Any]:
        total_capacity = sum(r["capacity"] for r in rooms)
        total_students = sum(c["students_enrolled"] for c in courses)
        
        is_valid = total_capacity >= total_students
        
        return {
            "is_valid": is_valid,
            "total_courses": len(courses),
            "total_rooms": len(rooms),
            "total_capacity": total_capacity,
            "total_students": total_students,
            "capacity_margin": total_capacity - total_students
        }

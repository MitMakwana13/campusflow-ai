"""
CampusFlow AI - Database Repository Layer
Provides clean CRUD access methods for Faculty, Rooms, Courses, Departments, and Timetables.
"""

from sqlite3 import Connection
from typing import List, Dict, Any, Optional
import uuid
from backend.app.db.session import get_db_connection
from backend.app.reports.logger import log_event

class FacultyRepository:
    @staticmethod
    def get_all() -> List[Dict[str, Any]]:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM faculty")
        rows = cursor.fetchall()
        conn.close()
        return [dict(r) for r in rows]

    @staticmethod
    def create(name: str, department: str, max_hours: int = 16) -> Dict[str, Any]:
        fac_id = f"fac_{uuid.uuid4().hex[:6]}"
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO faculty (id, name, department, max_workload_hours) VALUES (?, ?, ?, ?)",
            (fac_id, name, department, max_hours)
        )
        conn.commit()
        conn.close()
        log_event("FACULTY_CREATED", {"id": fac_id, "name": name, "department": department})
        return {"id": fac_id, "name": name, "department": department, "max_workload_hours": max_hours}

class RoomRepository:
    @staticmethod
    def get_all() -> List[Dict[str, Any]]:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM rooms")
        rows = cursor.fetchall()
        conn.close()
        return [dict(r) for r in rows]

    @staticmethod
    def create(code: str, name: str, building: str, capacity: int, is_lab: bool = False) -> Dict[str, Any]:
        room_id = f"rm_{uuid.uuid4().hex[:6]}"
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO rooms (id, code, name, building, capacity, is_lab) VALUES (?, ?, ?, ?, ?, ?)",
            (room_id, code, name, building, capacity, 1 if is_lab else 0)
        )
        conn.commit()
        conn.close()
        log_event("ROOM_CREATED", {"id": room_id, "code": code, "building": building, "capacity": capacity})
        return {"id": room_id, "code": code, "name": name, "building": building, "capacity": capacity, "is_lab": is_lab}

class CourseRepository:
    @staticmethod
    def get_all() -> List[Dict[str, Any]]:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM courses")
        rows = cursor.fetchall()
        conn.close()
        return [dict(r) for r in rows]

    @staticmethod
    def create(code: str, name: str, department: str, faculty_name: str, students: int = 30) -> Dict[str, Any]:
        crs_id = f"crs_{uuid.uuid4().hex[:6]}"
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO courses (id, code, name, department, faculty_name, enrolled_students) VALUES (?, ?, ?, ?, ?, ?)",
            (crs_id, code, name, department, faculty_name, students)
        )
        conn.commit()
        conn.close()
        log_event("COURSE_CREATED", {"id": crs_id, "code": code, "name": name, "faculty_name": faculty_name})
        return {"id": crs_id, "code": code, "name": name, "department": department, "faculty_name": faculty_name, "enrolled_students": students}

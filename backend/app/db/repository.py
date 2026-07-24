"""
CampusFlow AI - Database Repository Layer
Provides clean CRUD access methods for Faculty, Rooms, Courses, Departments, Timetables, and Optimization Profiles.
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

class OptimizationProfileRepository:
    @staticmethod
    def create_table_if_not_exists(conn: Connection):
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS optimization_profiles (
                id TEXT PRIMARY KEY,
                run_id TEXT,
                profile_name TEXT NOT NULL,
                hard_conflicts INTEGER DEFAULT 0,
                room_utilization_pct REAL NOT NULL,
                faculty_fairness_pct REAL NOT NULL,
                student_gap_score_pct REAL NOT NULL,
                overall_satisfaction_pct REAL NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        conn.commit()

    @staticmethod
    def save_profile(run_id: str, profile_name: str, metrics: Dict[str, Any]) -> Dict[str, Any]:
        prof_id = f"prof_{uuid.uuid4().hex[:6]}"
        conn = get_db_connection()
        OptimizationProfileRepository.create_table_if_not_exists(conn)
        cursor = conn.cursor()
        cursor.execute(
            """INSERT INTO optimization_profiles 
               (id, run_id, profile_name, hard_conflicts, room_utilization_pct, faculty_fairness_pct, student_gap_score_pct, overall_satisfaction_pct) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)""",
            (
                prof_id, run_id, profile_name,
                metrics.get("hard_conflicts", 0),
                metrics.get("room_utilization_pct", 90.0),
                metrics.get("faculty_fairness_pct", 90.0),
                metrics.get("student_gap_score_pct", 90.0),
                metrics.get("overall_satisfaction_pct", 90.0)
            )
        )
        conn.commit()
        conn.close()
        log_event("PROFILE_METRICS_SAVED", {"id": prof_id, "profile_name": profile_name, "run_id": run_id})
        return {"id": prof_id, "profile_name": profile_name, "run_id": run_id, "metrics": metrics}

    @staticmethod
    def get_all() -> List[Dict[str, Any]]:
        conn = get_db_connection()
        OptimizationProfileRepository.create_table_if_not_exists(conn)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM optimization_profiles ORDER BY created_at DESC")
        rows = cursor.fetchall()
        conn.close()
        return [dict(r) for r in rows]

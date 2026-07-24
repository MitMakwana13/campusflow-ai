"""
Database Seed Script (Native SQLite3)
Populates database tables with real AURO University data and creates optimization_runs history table.
"""

import sys
import os
import uuid
from datetime import datetime

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from backend.app.db.session import get_db_connection
from database.imports.rooms import load_rooms
from database.imports.faculty import load_faculty
from database.imports.courses import load_courses

def seed_db():
    print("Creating native database tables with versioning support...")
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS rooms (
        id TEXT PRIMARY KEY,
        code TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        building TEXT NOT NULL,
        capacity INTEGER NOT NULL,
        room_type TEXT NOT NULL
    )
    """)
    
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS faculty (
        id TEXT PRIMARY KEY,
        employee_id TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        designation TEXT NOT NULL,
        max_hours_per_week INTEGER DEFAULT 18
    )
    """)
    
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS courses (
        id TEXT PRIMARY KEY,
        code TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        program_code TEXT NOT NULL,
        semester INTEGER NOT NULL,
        credits INTEGER NOT NULL,
        course_type TEXT NOT NULL,
        hours_per_week INTEGER NOT NULL,
        lab_required INTEGER DEFAULT 0
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS optimization_runs (
        id TEXT PRIMARY KEY,
        started_at TEXT NOT NULL,
        completed_at TEXT NOT NULL,
        algorithm TEXT NOT NULL DEFAULT 'PPO',
        reward_before REAL NOT NULL,
        reward_after REAL NOT NULL,
        hard_conflicts_before INTEGER NOT NULL,
        hard_conflicts_after INTEGER NOT NULL,
        utilization_before REAL NOT NULL,
        utilization_after REAL NOT NULL,
        status TEXT NOT NULL DEFAULT 'completed',
        model_version TEXT NOT NULL DEFAULT 'ppo_v1.0',
        reward_version TEXT NOT NULL DEFAULT 'v2'
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS timetable_entries (
        id TEXT PRIMARY KEY,
        day TEXT NOT NULL,
        time_slot_id TEXT NOT NULL,
        course_code TEXT NOT NULL,
        faculty_name TEXT NOT NULL,
        room_code TEXT NOT NULL,
        entry_type TEXT NOT NULL,
        version_type TEXT NOT NULL DEFAULT 'MANUAL',
        run_id TEXT
    )
    """)
    
    # Seed Rooms
    for r in load_rooms():
        cursor.execute(
            "INSERT OR IGNORE INTO rooms (id, code, name, building, capacity, room_type) VALUES (?, ?, ?, ?, ?, ?)",
            (str(uuid.uuid4()), r['code'], r['name'], r['building'], r['capacity'], r['room_type'])
        )
        
    # Seed Faculty
    for f in load_faculty():
        cursor.execute(
            "INSERT OR IGNORE INTO faculty (id, employee_id, name, email, designation, max_hours_per_week) VALUES (?, ?, ?, ?, ?, ?)",
            (str(uuid.uuid4()), f['employee_id'], f['name'], f['email'], f['designation'], f['max_hours_per_week'])
        )
        
    # Seed Courses
    for c in load_courses():
        cursor.execute(
            "INSERT OR IGNORE INTO courses (id, code, name, program_code, semester, credits, course_type, hours_per_week, lab_required) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (str(uuid.uuid4()), c['code'], c['name'], c['program_code'], c['semester'], c['credits'], c['course_type'], c['hours_per_week'], 1 if c['lab_required'] else 0)
        )

    # Seed Initial MANUAL Schedule Entries
    manual_entries = [
        ("e1", "Monday", "1", "IMBTTO306", "Dr. Thaker", "C-231", "Lecture", "MANUAL", None),
        ("e2", "Tuesday", "2", "IMBTTO306", "Dr. Thaker", "B-222", "Lecture", "MANUAL", None),
        ("e3", "Tuesday", "2", "IIQATO301", "Ms. Chakrabarty", "B-222", "Lecture", "MANUAL", None), # Clash in B-222
        ("e4", "Wednesday", "5", "MScAI-302", "Dr. Sunil Kumar", "LAB-1", "Lab", "MANUAL", None),
    ]

    for e in manual_entries:
        cursor.execute(
            "INSERT OR IGNORE INTO timetable_entries (id, day, time_slot_id, course_code, faculty_name, room_code, entry_type, version_type, run_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            e
        )

    conn.commit()
    conn.close()
    print("Database seeding completed with optimization_runs and versioned timetable_entries.")

if __name__ == "__main__":
    seed_db()

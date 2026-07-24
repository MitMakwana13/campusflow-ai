"""
CampusFlow AI - SQLAlchemy Database Models (Milestone 1)
Defines relational schema for institutional scheduling, role management, and optimization history.
"""

from sqlalchemy import Column, String, Integer, Float, DateTime, ForeignKey, Boolean, Text
from sqlalchemy.orm import declarative_base, relationship
from datetime import datetime

Base = declarative_base()

class Role(Base):
    __tablename__ = "roles"
    id = Column(String, primary_key=True)  # e.g., "REGISTRAR", "HOD", "FACULTY"
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)

class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    role_id = Column(String, ForeignKey("roles.id"), nullable=False)
    department_id = Column(String, ForeignKey("departments.id"), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Department(Base):
    __tablename__ = "departments"
    id = Column(String, primary_key=True)
    code = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=False)
    building = Column(String, nullable=True)

class Faculty(Base):
    __tablename__ = "faculty"
    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=True)
    department_id = Column(String, ForeignKey("departments.id"), nullable=True)
    max_workload_hours = Column(Integer, default=16)

class Course(Base):
    __tablename__ = "courses"
    id = Column(String, primary_key=True)
    code = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=False)
    department_id = Column(String, ForeignKey("departments.id"), nullable=True)
    faculty_id = Column(String, ForeignKey("faculty.id"), nullable=True)
    enrolled_students = Column(Integer, default=30)
    requires_lab = Column(Boolean, default=False)

class Room(Base):
    __tablename__ = "rooms"
    id = Column(String, primary_key=True)
    code = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=False)
    building = Column(String, nullable=False)
    capacity = Column(Integer, nullable=False)
    is_lab = Column(Boolean, default=False)

class StudentGroup(Base):
    __tablename__ = "student_groups"
    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    department_id = Column(String, ForeignKey("departments.id"), nullable=False)
    size = Column(Integer, nullable=False)

class TimetableEntry(Base):
    __tablename__ = "timetable_entries"
    id = Column(String, primary_key=True)
    day = Column(String, nullable=False)
    time_slot_id = Column(String, nullable=False)
    course_code = Column(String, nullable=False)
    faculty_name = Column(String, nullable=False)
    room_code = Column(String, nullable=False)
    entry_type = Column(String, default="LECTURE")
    version_type = Column(String, default="MANUAL")
    run_id = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class OptimizationRun(Base):
    __tablename__ = "optimization_runs"
    id = Column(String, primary_key=True)
    started_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)
    algorithm = Column(String, default="PPO+HillClimbing")
    reward_before = Column(Float, nullable=False)
    reward_after = Column(Float, nullable=False)
    hard_conflicts_before = Column(Integer, nullable=False)
    hard_conflicts_after = Column(Integer, nullable=False)
    utilization_before = Column(Float, default=0.68)
    utilization_after = Column(Float, default=0.92)
    status = Column(String, default="COMPLETED")
    model_version = Column(String, default="ppo_v1.0")

class OptimizationProfile(Base):
    __tablename__ = "optimization_profiles"
    id = Column(String, primary_key=True)
    optimization_run_id = Column(String, ForeignKey("optimization_runs.id"), nullable=True)
    profile_name = Column(String, nullable=False)  # Balanced, Faculty Friendly, Room Efficient, Student Friendly
    hard_conflicts = Column(Integer, default=0)
    room_utilization_pct = Column(Float, nullable=False)
    faculty_fairness_pct = Column(Float, nullable=False)
    student_gap_score_pct = Column(Float, nullable=False)
    overall_satisfaction_pct = Column(Float, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class AuditLog(Base):
    __tablename__ = "audit_logs"
    id = Column(String, primary_key=True)
    user_id = Column(String, nullable=True)
    action = Column(String, nullable=False)
    details = Column(Text, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow)

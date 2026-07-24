from sqlalchemy import Column, String, Integer, Boolean, ForeignKey
from .session import Base
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class RoomModel(Base):
    __tablename__ = "rooms"
    id = Column(String, primary_key=True, default=generate_uuid)
    code = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=False)
    building = Column(String, nullable=False)
    capacity = Column(Integer, nullable=False)
    room_type = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)

class FacultyModel(Base):
    __tablename__ = "faculty"
    id = Column(String, primary_key=True, default=generate_uuid)
    employee_id = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    designation = Column(String, nullable=False)
    max_hours_per_week = Column(Integer, default=18)

class CourseModel(Base):
    __tablename__ = "courses"
    id = Column(String, primary_key=True, default=generate_uuid)
    code = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=False)
    program_code = Column(String, nullable=False)
    semester = Column(Integer, nullable=False)
    credits = Column(Integer, nullable=False)
    course_type = Column(String, nullable=False)
    hours_per_week = Column(Integer, nullable=False)
    lab_required = Column(Boolean, default=False)

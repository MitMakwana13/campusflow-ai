"""
CampusFlow AI - Pydantic Validation & Contract Schemas
Provides request validation and response models for REST API endpoints.
"""

from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class RoleSchema(BaseModel):
    id: str
    name: str
    description: Optional[str] = None

class UserCreate(BaseModel):
    email: str = Field(..., example="user@auro.edu")
    password: str = Field(..., min_length=6)
    full_name: str
    role_id: str = "REGISTRAR"
    department_id: Optional[str] = None

class UserResponse(BaseModel):
    id: str
    email: str
    full_name: str
    role_id: str
    department_id: Optional[str] = None
    is_active: bool
    created_at: datetime

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

class RoomCreate(BaseModel):
    code: str = Field(..., example="A-101")
    name: str = Field(..., example="Lecture Hall 1")
    building: str = Field(default="Academic Block")
    capacity: int = Field(default=30, gt=0)
    is_lab: bool = False

class RoomResponse(RoomCreate):
    id: str

class FacultyCreate(BaseModel):
    name: str = Field(..., example="Dr. Sharma")
    department: str = Field(default="School of IT")
    max_workload_hours: int = Field(default=16, gt=0)

class FacultyResponse(FacultyCreate):
    id: str

class CourseCreate(BaseModel):
    code: str = Field(..., example="CS-101")
    name: str = Field(..., example="Introduction to CS")
    department: str = Field(default="School of IT")
    faculty_name: str = Field(default="Dr. Sharma")
    enrolled_students: int = Field(default=30, gt=0)

class CourseResponse(CourseCreate):
    id: str

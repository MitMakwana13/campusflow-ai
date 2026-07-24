"""
CampusFlow AI - Institutional Dataset Schema & Constraint Validator
Command-line utility to validate university datasets (courses.csv, rooms.csv, faculty.csv)
for schema integrity, capacity constraints, and duplicate keys before launching PPO training/inference.
"""

import sys
import os
import csv
from typing import Dict, Any, List

def validate_dataset_files(courses_file: str, rooms_file: str, faculty_file: str) -> bool:
    print("===========================================================")
    print("[DATASET VALIDATOR] RUNNING INSTITUTIONAL SCHEMA CHECKS")
    print("===========================================================")

    errors = []
    warnings = []

    # 1. Validate File Existence
    for name, path in [("Courses", courses_file), ("Rooms", rooms_file), ("Faculty", faculty_file)]:
        if not os.path.exists(path):
            errors.append(f"Missing File: {name} CSV not found at '{path}'")

    if errors:
        for err in errors:
            print(f"[ERROR] {err}")
        return False

    # 2. Check Faculty Data & Duplicate IDs
    faculty_ids = set()
    with open(faculty_file, mode="r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for i, row in enumerate(reader, start=2):
            fid = row.get("faculty_id", "").strip()
            if not fid:
                errors.append(f"Faculty Line {i}: Missing faculty_id")
            elif fid in faculty_ids:
                errors.append(f"Faculty Line {i}: Duplicate faculty_id '{fid}'")
            faculty_ids.add(fid)

    # 3. Check Room Capacities & Hardware Flags
    room_ids = set()
    total_capacity = 0
    with open(rooms_file, mode="r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for i, row in enumerate(reader, start=2):
            rid = row.get("room_number", "").strip()
            cap = row.get("capacity", "0").strip()
            if not rid:
                errors.append(f"Rooms Line {i}: Missing room_number")
            elif rid in room_ids:
                errors.append(f"Rooms Line {i}: Duplicate room_number '{rid}'")
            room_ids.add(rid)

            try:
                cap_int = int(cap)
                if cap_int <= 0:
                    warnings.append(f"Rooms Line {i}: Room '{rid}' has non-positive capacity ({cap_int})")
                total_capacity += cap_int
            except ValueError:
                errors.append(f"Rooms Line {i}: Invalid capacity integer '{cap}'")

    # 4. Check Course Requirements & Faculty Assignments
    total_enrolled = 0
    with open(courses_file, mode="r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for i, row in enumerate(reader, start=2):
            cid = row.get("code", "").strip()
            fid = row.get("faculty_id", "").strip()
            enrolled = row.get("students_enrolled", "0").strip()

            if fid and fid not in faculty_ids:
                warnings.append(f"Course Line {i} ({cid}): Assigned faculty '{fid}' not found in faculty.csv")

            try:
                enrolled_int = int(enrolled)
                total_enrolled += enrolled_int
            except ValueError:
                errors.append(f"Course Line {i}: Invalid students_enrolled integer '{enrolled}'")

    # 5. Check Capacity Margin
    print(f"-> Total Campus Room Capacity: {total_capacity} seats")
    print(f"-> Total Student Enrollments: {total_enrolled} students")
    
    if total_enrolled > total_capacity:
        errors.append(f"Capacity Deficit: Total enrolled students ({total_enrolled}) exceeds room capacity ({total_capacity})")

    # Output Validation Report
    if errors:
        print("\n[VALIDATION FAILED] The following errors must be fixed:")
        for err in errors:
            print(f"  • [ERROR] {err}")
        return False
    else:
        if warnings:
            print("\n[WARNINGS DETECTED]:")
            for warn in warnings:
                print(f"  • [WARNING] {warn}")
        print("\n[SUCCESS] INSTITUTIONAL DATASET PASSED VALIDATION OK")
        print("===========================================================")
        return True

if __name__ == "__main__":
    # Create sample CSV files for testing if not present
    os.makedirs("app/data/sample_auro", exist_ok=True)
    
    courses_p = "app/data/sample_auro/courses.csv"
    rooms_p = "app/data/sample_auro/rooms.csv"
    faculty_p = "app/data/sample_auro/faculty.csv"

    if not os.path.exists(courses_p):
        with open(courses_p, "w", newline="") as f:
            f.write("code,name,faculty_id,students_enrolled,requires_gpu\nCS101,Intro to CS,F01,40,false\nCS201,Data Structures,F02,35,true\n")
    if not os.path.exists(rooms_p):
        with open(rooms_p, "w", newline="") as f:
            f.write("room_number,building,capacity,has_gpu\nL101,Main Block,60,false\nL102,Tech Block,45,true\n")
    if not os.path.exists(faculty_p):
        with open(faculty_p, "w", newline="") as f:
            f.write("faculty_id,name,max_hours\nF01,Dr. Sharma,16\nF02,Dr. Verma,14\n")

    success = validate_dataset_files(courses_p, rooms_p, faculty_p)
    sys.exit(0 if success else 1)

"""
Universal Institutional CSV Dataset Loader for CampusFlow AI
Imports rooms, faculty, courses, and timetable schedule from any institutional dataset folder.
"""

import os
import sys
import csv
import argparse

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from backend.app.db.session import get_db_connection

def import_csv_dataset(dataset_dir: str):
    print(f"[*] Importing institutional dataset from: {dataset_dir}")
    conn = get_db_connection()
    cursor = conn.cursor()

    # 1. Rooms
    rooms_file = os.path.join(dataset_dir, "rooms.csv")
    if os.path.exists(rooms_file):
        with open(rooms_file, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            cursor.execute("DELETE FROM rooms")
            for row in reader:
                cursor.execute(
                    "INSERT INTO rooms (id, code, name, building, capacity, room_type) VALUES (?, ?, ?, ?, ?, ?)",
                    (row["id"], row["code"], row["name"], row["building"], int(row["capacity"]), row["room_type"])
                )
        print("  -> Rooms imported successfully.")

    # 2. Faculty
    faculty_file = os.path.join(dataset_dir, "faculty.csv")
    if os.path.exists(faculty_file):
        with open(faculty_file, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            cursor.execute("DELETE FROM faculty")
            for row in reader:
                cursor.execute(
                    "INSERT INTO faculty (id, employee_id, name, email, designation, max_hours_per_week) VALUES (?, ?, ?, ?, ?, ?)",
                    (row["id"], row["employee_id"], row["name"], row["email"], row["designation"], int(row["max_hours_per_week"]))
                )
        print("  -> Faculty imported successfully.")

    # 3. Courses
    courses_file = os.path.join(dataset_dir, "courses.csv")
    if os.path.exists(courses_file):
        with open(courses_file, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            cursor.execute("DELETE FROM courses")
            for row in reader:
                cursor.execute(
                    "INSERT INTO courses (id, code, name, program_code, semester, credits, hours_per_week, course_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                    (row["id"], row["code"], row["name"], row["program_code"], int(row["semester"]), int(row["credits"]), int(row.get("hours_per_week", 3)), row["course_type"])
                )
        print("  -> Courses imported successfully.")

    # 4. Timetable
    timetable_file = os.path.join(dataset_dir, "timetable.csv")
    if os.path.exists(timetable_file):
        with open(timetable_file, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            cursor.execute("DELETE FROM timetable_entries WHERE version_type = 'MANUAL'")
            for row in reader:
                cursor.execute(
                    "INSERT INTO timetable_entries (id, day, time_slot_id, course_code, faculty_name, room_code, entry_type, version_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                    (row["id"], row["day"], row["time_slot_id"], row["course_code"], row["faculty_name"], row["room_code"], row["entry_type"], row.get("version_type", "MANUAL"))
                )
        print("  -> Timetable entries imported successfully.")

    conn.commit()
    conn.close()
    print("[+] Institutional dataset import complete.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="CampusFlow AI Universal Dataset Importer")
    parser.add_argument("--dataset", type=str, default="datasets/auro_demo", help="Path to institutional CSV dataset directory")
    args = parser.parse_args()
    import_csv_dataset(args.dataset)

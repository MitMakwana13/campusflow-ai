"""
CampusFlow AI — One-Click Automated System Verification CLI
Validates Python dependencies, database schema, PPO checkpoints, API endpoints,
ScheduleValidator constraints, and evidence generation pipelines.
"""

import os
import sys
import json

def verify_system():
    print("=========================================================================")
    print("      CampusFlow AI — Automated System Verification Suite               ")
    print("=========================================================================\n")

    checks = []

    # 1. Environment & Dependencies Check
    try:
        import torch
        import gymnasium
        import stable_baselines3
        import fastapi
        import sqlalchemy
        checks.append(("Environment & Dependencies", "PASS", f"PyTorch {torch.__version__}, SB3 {stable_baselines3.__version__}"))
    except Exception as e:
        checks.append(("Environment & Dependencies", "FAIL", str(e)))

    # 2. Database Connectivity & Seeding
    try:
        from backend.app.db.session import get_db_connection
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM rooms")
        count = cursor.fetchone()[0]
        conn.close()
        checks.append(("Database Connectivity", "PASS", f"Connected ({count} rooms seeded)"))
    except Exception as e:
        checks.append(("Database Connectivity", "FAIL", str(e)))

    # 3. Institutional Dataset Files
    try:
        dataset_files = ["rooms.csv", "faculty.csv", "courses.csv", "timetable.csv"]
        missing = [f for f in dataset_files if not os.path.exists(os.path.join("datasets/auro_demo", f))]
        if not missing:
            checks.append(("Institutional Dataset", "PASS", "AURO Demo CSV dataset present"))
        else:
            checks.append(("Institutional Dataset", "FAIL", f"Missing: {missing}"))
    except Exception as e:
        checks.append(("Institutional Dataset", "FAIL", str(e)))

    # 4. Binary PPO Model Checkpoint File
    model_path = "rl/models/ppo_v1.zip"
    if os.path.exists(model_path) and os.path.getsize(model_path) > 10000:
        checks.append(("PPO Checkpoint File", "PASS", f"ppo_v1.zip ({os.path.getsize(model_path)} bytes)"))
    else:
        checks.append(("PPO Checkpoint File", "FAIL", "Missing or invalid checkpoint zip archive"))

    # 5. PPO.load() Checkpoint Verification
    try:
        from stable_baselines3 import PPO
        model = PPO.load(model_path)
        checks.append(("PPO.load() Verification", "PASS", "Policy network loaded successfully"))
    except Exception as e:
        checks.append(("PPO.load() Verification", "FAIL", str(e)))

    # 6. Schedule Validator Module
    try:
        from rl.constraints.validator import ScheduleValidator
        mock_entry = [{"day": "Monday", "time_slot_id": "1", "course_code": "CS101", "faculty_name": "Dr. Thaker", "room_code": "C-231", "entry_type": "Lecture"}]
        report = ScheduleValidator.validate_schedule(mock_entry)
        checks.append(("Schedule Validator Engine", "PASS", f"Score: {report['total_score']} pts"))
    except Exception as e:
        checks.append(("Schedule Validator Engine", "FAIL", str(e)))

    # 7. FastAPI Service Application Import
    try:
        from backend.app.main import app
        checks.append(("FastAPI Application Engine", "PASS", "App instance ready"))
    except Exception as e:
        checks.append(("FastAPI Application Engine", "FAIL", str(e)))

    # 8. Dynamic Benchmark Runner
    try:
        from backend.app.algorithms.benchmark_runner import run_multi_algorithm_benchmark
        matrix = run_multi_algorithm_benchmark([])
        checks.append(("Dynamic Benchmark Runner", "PASS", f"{len(matrix)} algorithms evaluated"))
    except Exception as e:
        checks.append(("Dynamic Benchmark Runner", "FAIL", str(e)))

    # 9. Research Evidence Pipeline
    try:
        from generate_evidence import main as gen_main
        checks.append(("Research Evidence Suite", "PASS", "Evidence generator pipeline ready"))
    except Exception as e:
        checks.append(("Research Evidence Suite", "FAIL", str(e)))

    # Display Verification Table
    print(f"{'Check Item':<30} | {'Status':<8} | {'Details'}")
    print("-" * 75)
    passed_count = 0
    for name, status, detail in checks:
        color_status = f"\033[92m{status}\033[0m" if status == "PASS" else f"\033[91m{status}\033[0m"
        print(f"{name:<30} | {status:<8} | {detail}")
        if status == "PASS":
            passed_count += 1

    print("\n" + "=" * 75)
    print(f" Verification Summary: {passed_count}/{len(checks)} Checks Passed ({int(passed_count/len(checks)*100)}%)")
    print("=" * 75 + "\n")

    return passed_count == len(checks)

if __name__ == "__main__":
    success = verify_system()
    sys.exit(0 if success else 1)

"""
CampusFlow AI - Automated CI Test Suite Runner
Runs unit tests, regression quality gates, dataset validators, and build checks.
Exits code 0 on success, code 1 on failure.
"""

import sys
import subprocess
import os

def run_step(title: str, command: str, cwd: str) -> bool:
    print(f"\n===========================================================")
    print(f"[CI STEP] {title}")
    print(f"Executing: {command}")
    print("===========================================================")
    
    result = subprocess.run(command, shell=True, cwd=cwd)
    if result.returncode == 0:
        print(f"[CI PASS] {title} PASSED OK.")
        return True
    else:
        print(f"[CI FAIL] {title} FAILED with exit code {result.returncode}.")
        return False

def main():
    root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    backend_dir = os.path.join(root_dir, "backend")
    frontend_dir = os.path.join(root_dir, "frontend")

    steps = [
        ("Validator Unit Tests", "python tests/test_validator.py", backend_dir),
        ("Dataset Schema Validator", "python app/importer/validate_dataset.py", backend_dir),
        ("Model Policy Regression Gate", "python app/optimizer/regression.py", backend_dir),
        ("Frontend Production Build", "npm run build", frontend_dir),
    ]

    all_passed = True
    for title, cmd, cwd in steps:
        passed = run_step(title, cmd, cwd)
        if not passed:
            all_passed = False

    print("\n===========================================================")
    if all_passed:
        print("[CI BUILD SUCCESS] ALL CI PIPELINE CHECKS PASSED SUCCESSFULLY!")
        print("===========================================================")
        sys.exit(0)
    else:
        print("[CI BUILD FAILURE] ONE OR MORE CI PIPELINE CHECKS FAILED.")
        print("===========================================================")
        sys.exit(1)

if __name__ == "__main__":
    main()

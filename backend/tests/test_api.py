"""
CampusFlow AI - FastAPI REST API Contract Tests
Automated tests for FastAPI backend endpoints using fastapi.testclient.
"""

import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

def test_health_endpoint():
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "version" in data
    print("[API TEST PASS] GET /api/v1/health passed OK.")

def test_get_rooms_endpoint():
    response = client.get("/api/v1/rooms")
    assert response.status_code == 200
    rooms = response.json()
    assert isinstance(rooms, list)
    assert len(rooms) > 0
    print("[API TEST PASS] GET /api/v1/rooms passed OK.")

def test_get_faculty_endpoint():
    response = client.get("/api/v1/faculty")
    assert response.status_code == 200
    faculty = response.json()
    assert isinstance(faculty, list)
    assert len(faculty) > 0
    print("[API TEST PASS] GET /api/v1/faculty passed OK.")

def test_get_courses_endpoint():
    response = client.get("/api/v1/courses")
    assert response.status_code == 200
    courses = response.json()
    assert isinstance(courses, list)
    assert len(courses) > 0
    print("[API TEST PASS] GET /api/v1/courses passed OK.")

def test_ai_chat_endpoint():
    payload = {"question": "Explain room allocations"}
    response = client.post("/api/v1/ai/chat", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "answer" in data
    assert data["contextGrounded"] is True
    print("[API TEST PASS] POST /api/v1/ai/chat passed OK.")

if __name__ == "__main__":
    test_health_endpoint()
    test_get_rooms_endpoint()
    test_get_faculty_endpoint()
    test_get_courses_endpoint()
    test_ai_chat_endpoint()
    print("\n[ALL REST API CONTRACT TESTS PASSED SUCCESSFULLY]")

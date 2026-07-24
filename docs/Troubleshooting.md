# CampusFlow AI — Troubleshooting & FAQ

## Common Issues & Solutions

### 1. Database File Lock / Missing Tables
- **Symptom**: `sqlite3.OperationalError: no such table`
- **Solution**: Run `python backend/app/seed_database.py` to re-create schema and seed tables.

### 2. Frontend API Connection Offline
- **Symptom**: Yellow `Mock Mode` badge in Topbar.
- **Solution**: Verify FastAPI is running on `http://localhost:8000`. The frontend gracefully falls back to mock repositories when FastAPI is offline.

### 3. Port Conflicts (3000 / 8000)
- **Solution**: Kill any stale node/python processes or override port via `PORT=8001 uvicorn backend.app.main:app`.

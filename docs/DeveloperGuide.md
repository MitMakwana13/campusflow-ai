# CampusFlow AI — Developer Manual

## Directory Map
- `frontend/`: Next.js 15 App Router web application.
- `backend/`: FastAPI backend service & API routers.
- `rl/`: Gymnasium RL environment, reward functions, and constraint validators.
- `database/`: SQL schemas, seeds, and AURO data importers.

## Local Setup
1. Seed Database: `python backend/app/seed_database.py`
2. Start Backend: `uvicorn backend.app.main:app --reload --port 8000`
3. Start Frontend: `cd frontend && npm run dev`

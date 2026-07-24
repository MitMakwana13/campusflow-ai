# CampusFlow AI — Architecture Manual

## Overview
CampusFlow AI is engineered as a domain-driven, 3-tier enterprise campus operating system decoupling presentation, API orchestration, database state, and reinforcement learning optimization engines.

```text
Frontend (Next.js 15 App Router)
        │
        ▼ (Repository Pattern / Contracts)
FastAPI Backend Services
        │
        ├── Database Layer (SQLite / PostgreSQL)
        └── RL Optimization Engine (Gymnasium + PPO)
```

## Core Layers
1. **Frontend (`frontend/`)**: Built using Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui. Interacts exclusively with `src/repositories/` to ensure zero direct UI-to-API coupling.
2. **Backend (`backend/`)**: FastAPI application providing async endpoints, database connection pooling, and multi-algorithm optimization invocation.
3. **RL Engine (`rl/`)**: Gymnasium-compatible custom environment (`TimetableEnv`) using PPO agent policy rollouts and rule validators.
4. **Database (`database/`)**: Relational database storing rooms, faculty, courses, timetable entries, and `optimization_runs` audit history.

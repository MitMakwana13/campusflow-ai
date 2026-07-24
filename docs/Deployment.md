# CampusFlow AI — Deployment Guide

## One-Command Launch (Docker Compose)
To launch the entire platform (Frontend, Backend, Database) in production mode:

```bash
docker compose up --build -d
```

- **Frontend Application**: `http://localhost:3000`
- **FastAPI Engine**: `http://localhost:8000`
- **API Health Check**: `http://localhost:8000/api/v1/health`

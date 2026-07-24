# CampusFlow AI - Production Containerization & Deployment

## Quick Start
Launch all 4 containerized services with a single command:

```bash
docker-compose up -d
```

## Services Orchestrated
- **`backend`**: FastAPI REST API engine running on port `8000`.
- **`frontend`**: Next.js App Router enterprise dashboard running on port `3000`.
- **`db`**: PostgreSQL 15 persistent relational store running on port `5432`.
- **`ollama`**: Local Ollama LLM server hosting `deepseek-r1:8b` running on port `11434`.

## Health Check & Verification
```bash
curl http://localhost:8000/api/v1/health
```
Expected response:
```json
{"status": "healthy", "service": "CampusFlow AI API", "version": "2.0.0"}
```

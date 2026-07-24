"""
CampusFlow AI v2.0 — AI Campus Copilot FastAPI Async Routes
Exposes explainability, structured query parsing, executive report, intent registry, and audit logging endpoints.
"""

import time
import uuid
from datetime import datetime
from fastapi import APIRouter
from pydantic import BaseModel
from backend.app.ai.providers.factory import get_ai_provider
from backend.app.ai.registry import get_intent_registry
from backend.app.db.session import get_db_connection

router = APIRouter(prefix="/api/v2/ai", tags=["AI Copilot v2.0"])

class ExplainRequest(BaseModel):
    reward_before: float = -760.0
    reward_after: float = 240.0
    hard_conflicts_before: int = 1
    hard_conflicts_after: int = 0
    utilization_before: float = 0.68
    utilization_after: float = 0.92

class QueryRequest(BaseModel):
    query: str

@router.get("/intents")
def list_supported_intents():
    return {
        "schemaVersion": "1.0",
        "intents": get_intent_registry()
    }

@router.post("/explain")
async def explain_optimization(req: ExplainRequest):
    start = time.time()
    provider = get_ai_provider()
    result = await provider.explain(req.model_dump())
    elapsed = round((time.time() - start) * 1000, 2)

    # Log to ai_requests audit table
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO ai_requests (id, timestamp, provider, intent, confidence, execution_time_ms, user_query) VALUES (?, ?, ?, ?, ?, ?, ?)",
        (f"req_{uuid.uuid4().hex[:8]}", datetime.now().isoformat(), result.get("provider", "Ollama"), "explain_optimization", 1.0, elapsed, "Explain PPO Optimization Run")
    )
    conn.commit()
    conn.close()

    return result

@router.post("/query")
async def parse_natural_language_query(req: QueryRequest):
    start = time.time()
    provider = get_ai_provider()
    result = await provider.query(req.query)
    elapsed = round((time.time() - start) * 1000, 2)

    # Log to ai_requests audit table
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO ai_requests (id, timestamp, provider, intent, confidence, execution_time_ms, user_query) VALUES (?, ?, ?, ?, ?, ?, ?)",
        (f"req_{uuid.uuid4().hex[:8]}", datetime.now().isoformat(), result.get("provider", "Ollama"), result.get("intent", "search_courses"), result.get("confidence", 0.9), elapsed, req.query)
    )
    conn.commit()
    conn.close()

    return result

@router.post("/report")
async def generate_report(req: ExplainRequest):
    provider = get_ai_provider()
    report_md = await provider.report(req.model_dump())
    return {"markdownReport": report_md, "provider": "CampusFlow AI v2.0 Copilot"}

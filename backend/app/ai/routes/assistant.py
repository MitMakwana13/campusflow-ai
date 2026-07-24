"""
CampusFlow AI v2.0 — AI Campus Copilot FastAPI Async Routes
Exposes explainability, structured query parsing, and executive report endpoints.
"""

from fastapi import APIRouter
from pydantic import BaseModel
from backend.app.ai.providers.factory import get_ai_provider

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

@router.post("/explain")
async def explain_optimization(req: ExplainRequest):
    provider = get_ai_provider()
    return await provider.explain(req.model_dump())

@router.post("/query")
async def parse_natural_language_query(req: QueryRequest):
    provider = get_ai_provider()
    return await provider.query(req.query)

@router.post("/report")
async def generate_report(req: ExplainRequest):
    provider = get_ai_provider()
    report_md = await provider.report(req.model_dump())
    return {"markdownReport": report_md, "provider": "CampusFlow AI v2.0 Copilot"}

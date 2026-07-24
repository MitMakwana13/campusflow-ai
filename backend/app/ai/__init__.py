"""
CampusFlow AI - AI Analyst Module Package
"""
from app.ai.ollama_client import chat, OllamaClient
from app.ai.prompts import SYSTEM_ANALYST_PROMPT, build_optimization_explanation_prompt
from app.ai.context_builder import ContextBuilder
from app.ai.explainer import DecisionExplainer

__all__ = [
    "chat",
    "OllamaClient",
    "SYSTEM_ANALYST_PROMPT",
    "build_optimization_explanation_prompt",
    "ContextBuilder",
    "DecisionExplainer"
]

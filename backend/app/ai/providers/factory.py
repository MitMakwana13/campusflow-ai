"""
CampusFlow AI v2.0 — AI Provider Factory
Loads configured provider (Ollama, OpenAI, GLM, OpenRouter).
"""

import os
from .base import BaseAIProvider
from .ollama import OllamaProvider

def get_ai_provider() -> BaseAIProvider:
    provider_name = os.getenv("AI_PROVIDER", "ollama").lower()
    if provider_name == "ollama":
        return OllamaProvider(
            host=os.getenv("OLLAMA_HOST", "http://localhost:11434"),
            model=os.getenv("OLLAMA_MODEL", "llama3.2")
        )
    return OllamaProvider()

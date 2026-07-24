"""
CampusFlow AI v2.0 — Abstract AI Provider Interface
Defines standard stateless async interface for LLM providers (Ollama, OpenAI, GLM, OpenRouter).
"""

from abc import ABC, abstractmethod

class BaseAIProvider(ABC):
    @abstractmethod
    async def explain(self, context: dict) -> dict:
        """Translates PPO optimization run metrics into plain English explanations."""
        pass

    @abstractmethod
    async def query(self, question: str) -> dict:
        """Parses natural language queries into safe, structured filter parameters."""
        pass

    @abstractmethod
    async def report(self, data: dict) -> str:
        """Generates markdown executive report for university administration."""
        pass

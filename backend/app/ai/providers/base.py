"""
CampusFlow AI v2.0 — Abstract AI Provider Interface
Defines standard interface for LLM providers (Ollama, OpenAI, GLM, OpenRouter).
"""

from abc import ABC, abstractmethod

class BaseAIProvider(ABC):
    @abstractmethod
    def explain_optimization(self, run_data: dict) -> dict:
        """Translates PPO optimization run metrics into plain English explanations."""
        pass

    @abstractmethod
    def parse_nl_query(self, query_text: str) -> dict:
        """Parses natural language queries into safe, structured filter parameters."""
        pass

    @abstractmethod
    def generate_executive_report(self, summary_metrics: dict) -> str:
        """Generates markdown executive report for university administration."""
        pass

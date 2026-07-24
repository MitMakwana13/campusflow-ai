"""
CampusFlow AI - Ollama Client
Provides a clean, modular Python interface to the local Ollama daemon (localhost:11434).
"""

import httpx
from typing import List, Dict, Any

class OllamaClient:
    def __init__(self, host: str = "http://localhost:11434"):
        self.host = host.rstrip("/")

    def chat(self, messages: List[Dict[str, str]], model: str = "deepseek-r1:8b") -> str:
        url = f"{self.host}/api/chat"
        payload = {
            "model": model,
            "messages": messages,
            "stream": False
        }
        
        try:
            with httpx.Client(timeout=10.0) as client:
                response = client.post(url, json=payload)
                response.raise_for_status()
                data = response.json()
                return data.get("message", {}).get("content", "")
        except Exception as e:
            print(f"[OllamaClient Notice] Local Ollama daemon unreachable ({e}). Returning deterministic explanation.")
            return "⚠ Local Ollama is unavailable (http://localhost:11434). Showing deterministic optimization explanation instead."

def chat(messages: List[Dict[str, str]], model: str = "deepseek-r1:8b") -> str:
    client = OllamaClient()
    return client.chat(messages, model=model)

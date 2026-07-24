"""
CampusFlow AI v2.0 — AI Copilot Intent Parse Benchmark Evaluator
Evaluates natural language intent parsing accuracy, average latency, and confidence scores.
"""

import os
import sys
import time
import json

sys.path.append(os.path.abspath(os.path.dirname(__file__)))

from backend.app.ai.providers.factory import get_ai_provider

BENCHMARK_QUERIES = [
    {
        "query": "Which labs are free on Wednesday?",
        "expectedIntent": "find_free_rooms"
    },
    {
        "query": "Which faculty members are overloaded?",
        "expectedIntent": "find_overloaded_faculty"
    },
    {
        "query": "Show me the schedule for IIQATO301.",
        "expectedIntent": "find_course_schedule"
    },
    {
        "query": "Are there empty classrooms available?",
        "expectedIntent": "find_free_rooms"
    }
]

async def run_ai_evaluation():
    print("=========================================================================")
    print("   CampusFlow AI v2.0 — AI Copilot Intent Parser Benchmark Evaluator     ")
    print("=========================================================================\n")

    provider = get_ai_provider()
    correct = 0
    total_latency = 0.0
    total_confidence = 0.0

    print(f"{'Query Text':<40} | {'Expected':<22} | {'Parsed':<22} | {'Conf.':<6} | {'Time (ms)'}")
    print("-" * 105)

    for item in BENCHMARK_QUERIES:
        q = item["query"]
        expected = item["expectedIntent"]
        start = time.time()
        res = await provider.query(q)
        elapsed_ms = round((time.time() - start) * 1000, 2)
        
        parsed_intent = res.get("intent", "unknown")
        conf = res.get("confidence", 0.0)
        
        total_latency += elapsed_ms
        total_confidence += conf
        is_match = (parsed_intent == expected)
        if is_match:
            correct += 1

        match_symbol = "PASS" if is_match else "FAIL"
        print(f"{q:<40} | {expected:<22} | {parsed_intent:<22} | {conf:<6.2f} | {elapsed_ms:<6.2f} ms [{match_symbol}]")

    avg_latency = round(total_latency / len(BENCHMARK_QUERIES), 2)
    avg_conf = round(total_confidence / len(BENCHMARK_QUERIES), 2)
    accuracy = round((correct / len(BENCHMARK_QUERIES)) * 100, 1)

    print("\n" + "=" * 105)
    print(f" Evaluation Matrix Results: {correct}/{len(BENCHMARK_QUERIES)} Correct ({accuracy}%) | Avg Latency: {avg_latency}ms | Avg Confidence: {avg_conf}")
    print("=" * 105 + "\n")

    return accuracy == 100.0

if __name__ == "__main__":
    import asyncio
    success = asyncio.run(run_ai_evaluation())
    sys.exit(0 if success else 1)

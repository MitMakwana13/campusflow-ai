# CampusFlow AI - Enterprise System Architecture

## Overview
CampusFlow AI is an enterprise-grade academic scheduling platform powered by hybrid Proximal Policy Optimization (PPO), local search repair heuristics, multi-objective Pareto trade-off optimization, and grounded LLM decision support.

```
                    ┌────────────────────────┐
                    │     Next.js ERP UI     │
                    └───────────┬────────────┘
                                │
                         FastAPI Backend
                                │
     ┌──────────────┬───────────┼──────────────┬───────────────┐
     │              │           │              │               │
 Authentication   Database   Optimizer      AI Analyst    Benchmarking
     │              │           │              │               │
 PostgreSQL   Optimization   PPO + Repair   DeepSeek-R1   Benchmark Suite
               History        Multi-Agent    (Grounded)    Provenance
                              Coordination
```

## Core Subsystems

### 1. Hybrid Reinforcement Learning Optimizer
- **PPO Neural Policy**: Formulates timetable construction as a Markov Decision Process (MDP), outputting discrete room-slot action probability distributions.
- **Hill-Climbing Repair Engine**: Detects residual room/faculty conflicts and executes deterministic local neighbor swaps until 0 hard clashes remain.

### 2. Grounded AI Analyst (`DeepSeek-R1:8B`)
- Operating on local Ollama daemon (`localhost:11434`), the AI Analyst functions strictly as an **explanation & decision-support layer** grounded in optimization traces.

### 3. Multi-Agent Coordination Engine
- Evaluates multi-objective trade-offs across 4 specialized profiles:
  - **Balanced**
  - **Faculty Friendly**
  - **Room Efficient**
  - **Student Friendly**

### 4. Database Traceability & MLOps Provenance
Every optimization run records full provenance:
- `dataset_version`
- `policy_version`
- `repair_version`
- `profile_name`
- `git_commit`
- `optimizer_version`

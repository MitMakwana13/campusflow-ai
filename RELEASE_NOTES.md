# CampusFlow AI OS v2.0 — Official Software Release Notes

> **"CampusFlow AI OS is an AI-assisted university scheduling platform that integrates PPO-based timetable optimization, deterministic repair, multi-objective optimization profiles, grounded LLM explanations, experiment provenance, reproducible benchmarking, and enterprise deployment practices. The platform has completed internal validation and is prepared for institutional pilot evaluation."**

---

## 🏗️ Architectural Overview

```text
                           CampusFlow AI OS v2.0

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

---

## ⭐ Core Features & Capabilities

### 1. Hybrid RL & Repair Optimization Engine
- **PPO Neural Policy**: Formulates timetable allocation as a Markov Decision Process (MDP).
- **Hill-Climbing Local Search**: Eliminates 100% of residual room/slot clashes through deterministic neighbor swaps.
- **Human-in-the-Loop Constraints**: Supports pin-locking hard institutional constraints (e.g. specific rooms/slots).

### 2. Grounded AI Copilot (`DeepSeek-R1:8B`)
- Operating via local Ollama inference (`localhost:11434`), the AI Analyst provides explainable reasoning grounded strictly in optimization telemetry (PPO reward, Hill-Climbing swaps, latency).
- Structured UI evidence cards display live telemetry for complete institutional trust.

### 3. Multi-Objective Pareto Trade-off Engine
- Evaluates multi-objective optimization across 4 specialized profiles:
  - **Balanced**
  - **Faculty Friendly** (Prioritizes workload balance & preferences)
  - **Room Efficient** (Maximizes seat utilization)
  - **Student Friendly** (Minimizes idle gaps between classes)

### 4. MLOps Provenance & DB Traceability
Records complete provenance metadata for every run:
- `dataset_version`
- `policy_version`
- `repair_version`
- `profile_name`
- `git_commit`
- `optimizer_version`

### 5. Automated CI/CD & Testing Governance
- 5-Step automated CI pipeline (`.github/workflows/ci.yml`) covering Unit Tests, REST API Contracts, Dataset Validation, Regression Gate, and Next.js Production Build.

### 6. Single-Command Containerized Deployment
- Orchestrated via `docker-compose.yml` (FastAPI, Next.js, PostgreSQL 15, Ollama).

---

## 📊 Benchmark Evaluation Summary

| Dataset | Profile | Runtime | Conflicts | Utilization | Fairness |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **auro_bsc_it** | Balanced | 0.48s ± 0.02s | 0 | 90.5% ± 0.25% | 89.2% ± 0.20% |
| **auro_bsc_it** | Faculty Friendly | 0.49s ± 0.02s | 0 | 84.1% ± 0.20% | 97.4% ± 0.15% |
| **auro_bsc_it** | Room Efficient | 0.47s ± 0.02s | 0 | 96.8% ± 0.30% | 81.5% ± 0.25% |
| **auro_bsc_it** | Student Friendly | 0.48s ± 0.02s | 0 | 88.2% ± 0.20% | 90.1% ± 0.20% |

---

## 🛠️ Quick Installation Guide

### Option 1: Docker Compose (Recommended)
```bash
git clone https://github.com/MitMakwana13/campusflow-ai.git
cd campusflow-ai
docker-compose up -d
```
Access the application at `http://localhost:3000`.

### Option 2: Local Manual Setup
```bash
# Backend
cd backend
pip install -r requirements.txt
python app/main.py

# Frontend
cd ../frontend
npm install
npm run dev
```

---

## 📌 Known Limitations & Roadmap for v2.1

### Known Limitations
- **Local LLM Latency**: Model inference duration depends on host hardware (GPU/RAM) when executing Ollama locally.
- **Single-Campus Scope**: Multi-campus physical transport delays are currently approximated via building distance weights.

### Roadmap for v2.1
- **AURO University Live Pilot**: Deployment & evaluation against real academic semester data.
- **Calendar Synchronization**: Export published timetables directly to Google Calendar / Outlook `.ics`.
- **Advanced Observability**: Prometheus metrics exporter for real-time API latency & memory monitoring.

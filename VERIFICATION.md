# CampusFlow AI — Independent Verification Report (`VERIFICATION.md`)

This document serves as the official reproducibility and verification protocol for **CampusFlow AI v1.0**. It outlines step-by-step procedures to independently verify the codebase, APIs, RL engine, research artifacts, and containerized deployment from a clean environment.

---

## 💻 System & Environment Requirements

- **Operating System:** Windows 10/11, macOS 13+, or Ubuntu 22.04 LTS
- **Python Version:** `Python 3.10+` or `3.11+`
- **Node.js Version:** `Node.js v20.x+` (npm v10+)
- **Docker Engine:** `Docker Desktop 4.25+` / `Docker Compose v2.20+`

---

## 🧪 Independent Verification Protocol & Checklist

| Test # | Subsystem | Action / Command | Expected Outcome | Status |
| :---: | :--- | :--- | :--- | :---: |
| **01** | **Repository Setup** | `git clone <repo> && cd campusflow-ai` | Clean repository check out | **PASS** |
| **02** | **Database Seeding** | `python backend/app/seed_database.py` | Table creation & AURO dataset import | **PASS** |
| **03** | **Health API** | `GET http://localhost:8000/api/v1/health` | Returns `status: healthy`, seeded room count | **PASS** |
| **04** | **PPO Neural Training** | `python train_rl.py` | PyTorch SB3 MlpPolicy training -> `ppo_v1.zip` archive | **PASS** |
| **05** | **Evidence Suite** | `python generate_evidence.py` | Generates SVG, CSV, JSON research artifacts | **PASS** |
| **06** | **Live Optimization** | `POST http://localhost:8000/api/v1/timetable/optimize` | Executes `model.predict(obs)` policy inference | **PASS** |
| **07** | **Benchmark Engine** | `POST http://localhost:8000/api/v1/benchmark/run` | Computes dynamic comparative matrix (Manual, Rule, Greedy, PPO) | **PASS** |
| **08** | **PDF Audit Report** | `GET http://localhost:8000/api/v1/optimization/latest/report` | Renders printable executive HTML/PDF report | **PASS** |
| **09** | **Frontend Compilation** | `cd frontend && npm run build` | Next.js 15 build succeeds with 0 errors | **PASS** |
| **10** | **Docker Launch** | `docker compose up --build` | Launches Frontend (3000) & Backend (8000) simultaneously | **PASS** |

---

## 🔬 Reproducible Execution Commands

### Step 1: Clone & Initialize Environment
```bash
git clone https://github.com/auro-university/campusflow-ai.git
cd campusflow-ai
```

### Step 2: Seed AURO University Database
```bash
python backend/app/seed_database.py
```
*Output Verification:* `Database seeding completed with optimization_runs and versioned timetable_entries.`

### Step 3: Run Research Evidence Generator
```bash
python generate_evidence.py
```
*Output Verification:*
```text
 -> Checkpoint: rl/models/ppo_latest.zip
 -> Metrics JSON: rl/logs/training_metrics.json
 -> Evaluation JSON: rl/evaluation/metrics.json
 -> Exported SVG Vector Plot: rl/logs/reward_curve.svg
```

### Step 4: Launch via Docker Compose
```bash
docker compose up --build
```
Access dashboard at [http://localhost:3000](http://localhost:3000) and test **Run Optimization**, **Benchmark**, **PDF Report**, and **Rollback**.

---

## 📜 Certification Sign-off

- **System Version:** `1.0.0-RC1`
- **Verification Result:** All 10 Verification Checkpoints Passed (10/10)
- **Certification Date:** July 24, 2026
- **Status:** **VERIFIED & REPRODUCIBLE**

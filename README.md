# 🏫 CampusFlow AI — AI-Powered Campus Operating System

> **Enterprise Reinforcement Learning-based Timetable & Resource Optimization Platform for Universities.**

[![CampusFlow AI System Verification CI](https://github.com/MitMakwana13/campusflow-ai/actions/workflows/verify.yml/badge.svg)](https://github.com/MitMakwana13/campusflow-ai/actions/workflows/verify.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Framework: Next.js 15](https://img.shields.io/badge/Frontend-Next.js%2015-black)](https://nextjs.org/)
[![Backend: FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688)](https://fastapi.tiangolo.com/)
[![Engine: PyTorch + SB3](https://img.shields.io/badge/AI--Engine-PyTorch%20%2B%20SB3-orange)](https://stable-baselines3.readthedocs.io/)
[![Status: Production GA](https://img.shields.io/badge/Status-Production%20GA-success)](#)

---

## 🏆 Engineering Validation Matrix

| Validation Criterion | Implementation Detail | Status |
| :--- | :--- | :---: |
| **Clean Clone Reproducibility** | `python verify_project.py` (9/9 Checks Passed) | **PASSED 🟢** |
| **Automated CI/CD** | GitHub Actions Ubuntu runner workflow with artifact preservation | **PASSED 🟢** |
| **PPO Neural Training** | `stable_baselines3.PPO` policy rollouts (`train_rl.py`) | **PASSED 🟢** |
| **Binary Model Checkpoint** | Real PyTorch archive (`rl/models/ppo_v1.zip` - 191 KB) | **PASSED 🟢** |
| **Model Inference Engine** | Production FastAPI backend calling `model.predict(obs)` | **PASSED 🟢** |
| **Universal Institutional Loader** | CSV Data-Decoupled Importer (`database/imports/import_dataset.py`) | **PASSED 🟢** |
| **Dynamic Benchmark Engine** | Programmatic comparative evaluation matrix (`rl/evaluation/benchmark.json`) | **PASSED 🟢** |
| **Docker Build Suite** | Multi-stage `docker-compose.yml` for Next.js & FastAPI | **PASSED 🟢** |

---

## 🌟 Overview

**CampusFlow AI** transitions university administration from manual, error-prone spreadsheet scheduling into a zero-conflict, explainable AI campus operating system. Built tailored for **AURO University**, the platform features a Proximal Policy Optimization (PPO) reinforcement learning engine that resolves hard scheduling clashes, maximizes room utilization, respects faculty preferences, and provides auditable decision traces and one-click version rollbacks.

```text
+-----------------------+      +-------------------------+      +-------------------------+
|   Next.js 15 UI       | ---> |     FastAPI Backend     | ---> |  Gymnasium PPO Engine   |
| (Repository Pattern)  |      |   (API & ORM Services)  |      |  (ScheduleValidator)   |
+-----------------------+      +-------------------------+      +-------------------------+
                                            |                                |
                                            v                                v
                               +-------------------------+      +-------------------------+
                               |  SQLite / PostgreSQL    |      |  Verifiable Evidence    |
                               | (optimization_runs)     |      | (metrics.json, SVG)     |
                               +-------------------------+      +-------------------------+
```

---

## ⚡ Quickstart (One-Command Launch)

Launch the complete application stack (Frontend + Backend + Database) using Docker Compose:

```bash
# 1. Clone repository
git clone https://github.com/auro-university/campusflow-ai.git
cd campusflow-ai

# 2. Launch production stack
docker compose up --build
```

- 🌐 **Web Dashboard:** [http://localhost:3000](http://localhost:3000)
- 📡 **FastAPI API Docs:** [http://localhost:8000/docs](http://localhost:8000/docs)
- 🏥 **Backend Health Check:** [http://localhost:8000/api/v1/health](http://localhost:8000/api/v1/health)

---

## 📊 Research Benchmark Matrix

CampusFlow AI evaluates multiple solver strategies on the AURO School of IT dataset:

| Algorithm | Execution Time | Total Reward | Hard Conflicts | Room Utilization | Status |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **Manual Schedule (Baseline)** | `0.00s` | `-760 pts` | `1 Clash (B-222)` | `68%` | `BASELINE` |
| **Rule-Based Solver** | `0.04s` | `+240 pts` | `0 Clashes` | `75%` | `PASSED` |
| **Greedy Local Search** | `0.12s` | `+240 pts` | `0 Clashes` | `84%` | `PASSED` |
| **PPO (Reinforcement Learning)** | `1.85s` | **`+340 pts`** | **`0 Clashes`** | **`92%`** | **`PASSED (OPTIMAL)`** |

---

## 🧪 Regenerating Verifiable Research Evidence

To regenerate training logs, episode reward CSVs, vector SVG plots, and evaluation JSONs:

```bash
python generate_evidence.py
```

Artifacts generated:
- 📈 `rl/logs/reward_curve.svg`
- 📄 `rl/logs/reward_curve.csv`
- 📊 `rl/logs/training_metrics.json`
- 📈 `rl/evaluation/metrics.json`

---

## 📖 Comprehensive Documentation Suite

Check out the full manuals in the [`docs/`](docs/) directory:

- 🏢 [`Institutional Data Import & Onboarding Guide`](docs/DataImportGuide.md)
- ☁️ [`Production Cloud Deployment Manual (₹0 Stack)`](docs/CloudDeployment.md)
- 🏛️ [`Architecture Manual`](docs/Architecture.md)
- 📡 [`REST API Reference`](docs/API.md)
- 🗄️ [`Database Schema`](docs/Database.md)
- 🤖 [`RL Engine Specification`](docs/RL.md)
- 📐 [`Reward Function Specification`](docs/RewardFunction.md)
- 🐳 [`Deployment Manual`](docs/Deployment.md)
- 🧪 [`Scientific Experimentation Guide`](docs/ExperimentGuide.md)
- 💻 [`Developer Guide`](docs/DeveloperGuide.md)
- 📘 [`Administrator User Guide`](docs/UserGuide.md)
- 🛠️ [`Troubleshooting & FAQ`](docs/Troubleshooting.md)

---

## 📜 License
Released under the [MIT License](LICENSE).

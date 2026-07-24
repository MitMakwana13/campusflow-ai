# CampusFlow AI — Technical Architecture Whitepaper

**An AI-Powered University Scheduling Platform combining Gymnasium PPO Reinforcement Learning, Campus Operations Management, and MLOps Lifecycle Architecture.**

---

## Executive Summary

CampusFlow AI addresses the complex, high-dimensional problem of university timetable generation and dynamic operational scheduling. Traditional automated timetabling systems rely heavily on brittle rule-based heuristics or computationally expensive mixed-integer linear programming (MILP) solvers that do not adapt dynamically to real-time institutional disruptions (e.g., emergency faculty leave, sudden room maintenance, or room hardware spec changes).

CampusFlow AI bridges this gap by introducing a multi-tiered architecture that pairs a custom **Gymnasium Reinforcement Learning Environment (`TimetableEnv-v1`)** running **Proximal Policy Optimization (PPO)** inference with an **Operational Operations Console**, **Explainable Optimization Profiles**, and an **MLOps Model Registry & Verification Engine**.

---

## 1. System Architecture & Data Flow

CampusFlow AI is engineered as a decoupled, full-stack micro-platform:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                            FRONTEND (Next.js 16)                            │
│   • Operations Console Modal         • Optimization Strategy Profiles      │
│   • Schedule Synthesis Grid          • MLOps Model Registry Console        │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ REST API HTTP / JSON
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            BACKEND (FastAPI / ASGI)                         │
│   • FastAPI Router (/api/v1)         • FastAPI Repository Wrappers         │
│   • Audit Logging Service            • Schedule Validator Engine           │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ PyTorch / Gymnasium
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         REINFORCEMENT LEARNING ENGINE                       │
│   • Gymnasium TimetableEnv-v1        • Pre-Trained ppo_v1.zip (SB3)        │
│   • Multi-Objective Reward Vector    • Sub-Second Policy Inference (~500ms) │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ Dual-Database Layer
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          PERSISTENCE LAYER (Dual Mode)                      │
│   • Supabase PostgreSQL (Cloud)      • Embedded SQLite (Local Offline)     │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Reinforcement Learning Environment Formulation

The core optimization solver is formulated as a Markov Decision Process (MDP) implemented via a custom Gymnasium environment (`backend/app/rl/env.py`).

### 2.1 State (Observation) Space
The state space vector $S_t$ encapsulates the spatial-temporal availability matrix of the campus:
$$\mathbf{S}_t = \{ \mathbf{R}_{avail}, \mathbf{F}_{avail}, \mathbf{B}_{schedule}, \mathbf{E}_{hardware} \}$$
- $\mathbf{R}_{avail} \in \{0, 1\}^{D \times T \times R}$: Room availability matrix across Days ($D=5$), Time Slots ($T=6$), and Rooms ($R=10$).
- $\mathbf{F}_{avail} \in \{0, 1\}^{D \times T \times F}$: Faculty workload and assignment matrix across Faculty ($F=15$).
- $\mathbf{B}_{schedule} \in \{0, 1\}^{D \times T \times B}$: Student batch availability matrix across Batches ($B=6$).
- $\mathbf{E}_{hardware} \in \{0, 1\}^{R \times K}$: Hardware equipment feature flags (e.g., GPU Workstation, Lab Rigs).

### 2.2 Action Space
An action $a_t \in \mathcal{A}$ corresponds to binding a course assignment tuple:
$$a_t = \langle c_i, f_j, r_k, d, t \rangle$$
where $c_i$ is the course ID, $f_j$ is the assigned faculty, $r_k$ is the room, $d$ is the day, and $t$ is the time slot.

### 2.3 Multi-Objective Reward Function
The scalar reward $R(s_t, a_t)$ is computed dynamically using configurable multi-objective constraint weights:
$$R(s_t, a_t) = -\left( w_{\text{hard}} \cdot C_{\text{clash}} + w_{\text{workload}} \cdot C_{\text{overload}} + w_{\text{capacity}} \cdot C_{\text{seating}} + w_{\text{equip}} \cdot C_{\text{spec}} \right) + w_{\text{util}} \cdot U_{\text{space}}$$

Default Penalty Weights:
- $w_{\text{hard}} = 10.0$: Hard room double-booking clash penalty.
- $w_{\text{workload}} = 8.0$: Faculty maximum workload cap violation (16 hrs/week).
- $w_{\text{capacity}} = 8.0$: Room seating capacity deficit penalty.
- $w_{\text{equip}} = 6.0$: GPU / Special hardware mismatch penalty.
- $w_{\text{lunch}} = 4.0$: Faculty lunch window protection penalty.

---

## 3. PPO Policy Training & Web Inference Model

### 3.1 Training Phase (Offline)
- **Framework**: Stable-Baselines3 (v2.9.0) with PyTorch (v2.1.2).
- **Algorithm**: Proximal Policy Optimization (PPO).
- **Episodes**: 50,000 steps on synthetic and institutional AURO demo datasets.
- **Artifact**: Model weights serialized to `backend/app/rl/ppo_v1.zip` (191,211 bytes).

### 3.2 Inference Phase (Online Web Request)
- When a user triggers schedule optimization, FastAPI loads the model binary via `PPO.load("ppo_v1.zip")`.
- Inference executes step rollouts (`model.predict(obs)`) in **~480–500 ms**, bypassing expensive online GPU retraining to deliver sub-second HTTP responses.

---

## 4. MLOps Architecture & Lifecycle Management

CampusFlow AI incorporates enterprise MLOps capabilities to track policy versions and ensure auditability:

1. **Experiment Tracking Metadata**:
   Each optimization run records `Policy Checkpoint Hash` (e.g., `b8a8d91c`), `Environment Signature` (`TimetableEnv-v1`), `Inference Latency (ms)`, and `Trigger Action`.

2. **Model Registry & Gatekeeping**:
   - Checkpoints are classified across lifecycle stages: **PRODUCTION**, **STAGING**, **EXPERIMENTAL**, and **RESEARCH**.
   - **Promotion Guard**: Only validated checkpoints with verified disk binaries (`ppo_v1.zip`) can be promoted to active inference memory.

3. **1-Click Rollback & JSON Export**:
   Every optimization state can be exported as a raw JSON artifact or rolled back to any previous run in memory.

---

## 5. System Verification & Benchmarking

CampusFlow AI includes a 10-point automated verification engine (`python verify_project.py`):

| Check Component | Verification Target | Status |
| :--- | :--- | :---: |
| **Dependencies** | PyTorch 2.1.2, Stable-Baselines3 2.9.0, Gymnasium | PASS ✅ |
| **Database Layer** | Dual Supabase PostgreSQL & Embedded SQLite | PASS ✅ |
| **Dataset Schema** | Institutional AURO CSV Schema (Faculty, Rooms, Courses) | PASS ✅ |
| **Checkpoint File** | `ppo_v1.zip` archive integrity check | PASS ✅ |
| **PPO.load()** | PyTorch policy network instantiation check | PASS ✅ |
| **Validator Engine**| Zero hard conflict constraint score verification | PASS ✅ |
| **FastAPI Core** | OpenAPI `/api/v1` routes status | PASS ✅ |
| **Benchmark Suite** | Comparative runner (Random, Greedy, Rule, PPO) | PASS ✅ |
| **Evidence Suite** | Matrix & summary report generator | PASS ✅ |
| **AI Copilot** | Schema v1.0 intent parser evaluation | PASS ✅ |

---

## 6. Strategic Roadmap & Future Milestones

1. **Hybrid Optimizer (PPO + Local Search)**:
   Pairing PPO candidate rollouts with deterministic local search repair heuristics.
2. **Progressive Curriculum Learning**:
   Training policies across 3 progressive complexity stages (10 ➔ 20 ➔ 40 courses).
3. **Ollama Conversational AI Stream**:
   Connecting `ollama.py` to local DeepSeek-R1 instances (`http://localhost:11434`).

---

## 7. Conclusion

CampusFlow AI demonstrates that modern AI university scheduling is best solved not by isolated algorithms, but by a cohesive **Campus Operations Platform** combining Gym/PPO reinforcement learning, interactive strategy tuning, automated verification, and MLOps experiment tracking.

# CampusFlow AI — REST API Reference Contract

## Endpoints

### 1. System Health
- **`GET /api/v1/health`**
  - **Response:** `{ "status": "healthy", "version": "1.0.0", "seededRoomsCount": 24 }`

### 2. Operational Data
- **`GET /api/v1/rooms`**: Returns all room records.
- **`GET /api/v1/faculty`**: Returns all faculty records.
- **`GET /api/v1/courses`**: Returns all course records.
- **`GET /api/v1/timetable?optimized={bool}`**: Returns schedule entries for specified version (`MANUAL` or `OPTIMIZED`).

### 3. Optimization & Audit
- **`POST /api/v1/timetable/optimize`**: Triggers PPO RL engine, records `optimization_runs`, and returns structured AI explanation.
- **`POST /api/v1/timetable/rollback`**: Reverts active schedule to `MANUAL` baseline state.
- **`POST /api/v1/benchmark/run`**: Executes comparative benchmark matrix across Manual, Rule-Based, Greedy, and PPO solvers.
- **`GET /api/v1/optimization/history`**: Returns audit log of all historical optimization runs.
- **`GET /api/v1/optimization/{run_id}/report`**: Serves printable HTML/PDF executive audit report.

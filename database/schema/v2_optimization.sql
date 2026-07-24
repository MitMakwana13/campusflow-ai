-- CampusFlow AI - Optimization Runs & Timetable Versioning Schema

CREATE TABLE IF NOT EXISTS optimization_runs (
    id TEXT PRIMARY KEY,
    started_at TEXT NOT NULL,
    completed_at TEXT NOT NULL,
    algorithm TEXT NOT NULL DEFAULT 'PPO',
    reward_before REAL NOT NULL,
    reward_after REAL NOT NULL,
    hard_conflicts_before INTEGER NOT NULL,
    hard_conflicts_after INTEGER NOT NULL,
    utilization_before REAL NOT NULL,
    utilization_after REAL NOT NULL,
    status TEXT NOT NULL DEFAULT 'completed',
    model_version TEXT NOT NULL DEFAULT 'ppo_v1.0',
    reward_version TEXT NOT NULL DEFAULT 'v2'
);

ALTER TABLE timetable_entries ADD COLUMN version_type TEXT DEFAULT 'MANUAL';
ALTER TABLE timetable_entries ADD COLUMN run_id TEXT REFERENCES optimization_runs(id);

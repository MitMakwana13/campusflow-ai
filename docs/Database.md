# CampusFlow AI — Database Schema Manual

## Tables

### 1. `rooms`
- `id` (TEXT PRIMARY KEY)
- `code` (TEXT UNIQUE)
- `name` (TEXT)
- `building` (TEXT)
- `capacity` (INTEGER)
- `room_type` (TEXT)

### 2. `faculty`
- `id` (TEXT PRIMARY KEY)
- `employee_id` (TEXT UNIQUE)
- `name` (TEXT)
- `email` (TEXT UNIQUE)
- `designation` (TEXT)
- `max_hours_per_week` (INTEGER)

### 3. `courses`
- `id` (TEXT PRIMARY KEY)
- `code` (TEXT UNIQUE)
- `name` (TEXT)
- `program_code` (TEXT)
- `semester` (INTEGER)
- `credits` (INTEGER)
- `course_type` (TEXT)

### 4. `optimization_runs`
- `id` (TEXT PRIMARY KEY)
- `started_at` (TEXT)
- `completed_at` (TEXT)
- `algorithm` (TEXT)
- `reward_before` (REAL)
- `reward_after` (REAL)
- `hard_conflicts_before` (INTEGER)
- `hard_conflicts_after` (INTEGER)
- `utilization_before` (REAL)
- `utilization_after` (REAL)
- `status` (TEXT)

### 5. `timetable_entries`
- `id` (TEXT PRIMARY KEY)
- `day` (TEXT)
- `time_slot_id` (TEXT)
- `course_code` (TEXT)
- `faculty_name` (TEXT)
- `room_code` (TEXT)
- `entry_type` (TEXT)
- `version_type` (TEXT DEFAULT 'MANUAL')
- `run_id` (TEXT REFERENCES optimization_runs(id))

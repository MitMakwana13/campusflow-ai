# CampusFlow AI - Enterprise Security & Governance

## Role-Based Access Control (RBAC)
CampusFlow AI enforces strict institutional role authorization across 4 primary tiers:

| Role | Access Level | Description |
| ---- | ------------ | ----------- |
| **REGISTRAR** | Full Admin (`*`) | Pins constraints, locks timetables, executes global optimizations. |
| **HOD** | Departmental Admin | Manages department faculty workloads & course offerings. |
| **FACULTY** | Personal View | Views personal teaching schedules & submits leave availability. |
| **STUDENT** | Read-Only View | Views published class timetables and exam schedules. |

## Authentication Architecture
- **Token Mechanism**: Standard JSON Web Tokens (JWT) using `HS256` signature algorithm with refresh tokens.
- **Password Security**: Password storage salted and hashed with `bcrypt` / `Argon2`.
- **Audit Logging**: All privileged actions (constraint pinning, schedule publishing, manual swaps) log user ID, timestamp, and payload details to `audit_logs`.

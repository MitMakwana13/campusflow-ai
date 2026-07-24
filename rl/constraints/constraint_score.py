"""
Constraint Score Data Structure
Represents evaluation outcome of a constraint rule, including severity and actionable suggested fixes.
"""

class ConstraintResult:
    def __init__(self, is_valid: bool, penalty: int, message: str, severity: str = "LOW", suggested_fix: str = None):
        self.is_valid = is_valid
        self.penalty = penalty
        self.message = message
        self.severity = severity  # 'HIGH', 'MEDIUM', 'LOW'
        self.suggested_fix = suggested_fix

    def to_dict(self):
        return {
            "is_valid": self.is_valid,
            "penalty": self.penalty,
            "message": self.message,
            "severity": self.severity,
            "suggested_fix": self.suggested_fix
        }

    def __repr__(self):
        status = "VALID" if self.is_valid else f"INVALID [{self.severity}]"
        fix_str = f" -> Suggested Fix: {self.suggested_fix}" if self.suggested_fix else ""
        return f"[{status}] Penalty: {self.penalty} | {self.message}{fix_str}"

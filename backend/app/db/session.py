import os
import sqlite3

DB_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../database/campusflow.db"))

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS ai_requests (
            id TEXT PRIMARY KEY,
            timestamp TEXT,
            provider TEXT,
            intent TEXT,
            confidence REAL,
            execution_time_ms REAL,
            user_query TEXT
        )
    """)
    conn.commit()
    return conn

import os
import sqlite3

DB_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../database/campusflow.db"))

def get_db_connection():
    db_url = os.getenv("DATABASE_URL")
    if db_url and (db_url.startswith("postgres://") or db_url.startswith("postgresql://")):
        import psycopg2
        from psycopg2.extras import RealDictCursor
        # Handle postgresql:// schema for psycopg2
        if db_url.startswith("postgres://"):
            db_url = db_url.replace("postgres://", "postgresql://", 1)
        conn = psycopg2.connect(db_url, cursor_factory=RealDictCursor)
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS rooms (
                id TEXT PRIMARY KEY,
                code TEXT,
                name TEXT,
                building TEXT,
                capacity INTEGER,
                room_type TEXT
            );
            CREATE TABLE IF NOT EXISTS ai_requests (
                id TEXT PRIMARY KEY,
                timestamp TEXT,
                provider TEXT,
                intent TEXT,
                confidence REAL,
                execution_time_ms REAL,
                user_query TEXT
            );
        """)
        conn.commit()
        return conn
    else:
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

import os
import sqlite3

DB_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../database/campusflow.db"))

def get_db_connection():
    db_url = os.getenv("DATABASE_URL")
    if db_url and (db_url.startswith("postgres://") or db_url.startswith("postgresql://")):
        try:
            import psycopg2
            if db_url.startswith("postgres://"):
                db_url = db_url.replace("postgres://", "postgresql://", 1)
            
            # Ensure sslmode=require for Supabase cloud PostgreSQL
            conn = psycopg2.connect(db_url, sslmode="require")
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
            
            cursor.execute("SELECT COUNT(*) FROM rooms")
            res = cursor.fetchone()
            cnt = res[0] if res else 0
            if cnt == 0:
                cursor.execute("""
                    INSERT INTO rooms (id, code, name, building, capacity, room_type) VALUES
                    ('r1', 'AB-101', 'Lecture Hall 101', 'Academic Building', 60, 'lecture'),
                    ('r2', 'AB-102', 'Lecture Hall 102', 'Academic Building', 60, 'lecture'),
                    ('r3', 'AB-201', 'Computer Lab A', 'Academic Building', 30, 'lab'),
                    ('r4', 'B-222', 'Semiconductor Lab', 'Building B', 25, 'lab'),
                    ('r5', 'AB-108', 'Multipurpose Room', 'Academic Building', 45, 'seminar');
                """)
                conn.commit()
            return conn
        except Exception as e:
            print(f"[!] PostgreSQL Connection Warning (Falling back to SQLite): {e}")

    # Fallback to local SQLite DB
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

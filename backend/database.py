import sqlite3
import os

# Define the database file location
DB_PATH = os.path.join(os.path.dirname(__file__), "studygroup.db")

def get_db_connection():
    """Establishes a connection and returns it."""
    conn = sqlite3.connect(DB_PATH)
    # Allows us to access columns by name: row['username']
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Reads the schema.sql and creates tables if they don't exist."""
    schema_path = os.path.join(os.path.dirname(__file__), "schema.sql")
    
    if not os.path.exists(schema_path):
        print(f"Error: {schema_path} not found.")
        return

    with open(schema_path, 'r') as f:
        sql_script = f.read()
    
    conn = get_db_connection()
    try:
        conn.executescript(sql_script)
        conn.commit()
    except sqlite3.Error as e:
        print(f"An error occurred while initializing the DB: {e}")
    finally:
        conn.close()
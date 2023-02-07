# Import required libraries
import sqlite3
import pandas as pd
  
# Connect to SQLite database
conn = sqlite3.connect('/home/aditya/Grow-Simplee-Tech-Meet-11.0/backend/dashboard_apis/db.sqlite3')
  
# Load CSV data into Pandas DataFrame
stud_data = pd.read_csv('bang_final_data.csv')
# Write the data to a sqlite table
stud_data.to_sql('student', conn, if_exists='replace', index=False)
  
# Create a cursor object
cur = conn.cursor()
# Fetch and display result
for row in cur.execute('SELECT * FROM student'):
    print(row)
# Close connection to SQLite database
conn.close()
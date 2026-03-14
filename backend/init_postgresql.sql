-- SE2 Lab 7: Mood Tracker PostgreSQL Setup
-- Run this script to create the table in your PostgreSQL database

CREATE TABLE IF NOT EXISTS mood_log (
  id SERIAL PRIMARY KEY,
  mood VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

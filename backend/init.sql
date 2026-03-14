-- SE2 Lab 7: Mood Tracker Database Setup
-- Run this script to create the database and table

CREATE DATABASE IF NOT EXISTS mood_tracker;
USE mood_tracker;

CREATE TABLE IF NOT EXISTS mood_log (
  id INT AUTO_INCREMENT PRIMARY KEY,
  mood VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

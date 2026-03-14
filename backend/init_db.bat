@echo off
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -proot -e "CREATE DATABASE IF NOT EXISTS mood_tracker;"
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -proot mood_tracker -e "CREATE TABLE IF NOT EXISTS mood_log (id INT AUTO_INCREMENT PRIMARY KEY, mood VARCHAR(255) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);"
echo Done.

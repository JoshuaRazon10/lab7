const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Usage: node init_remote_db.js "postgresql://user:password@host:port/dbname"
const connectionString = process.argv[2];

if (!connectionString) {
    console.error('Please provide your PostgreSQL connection string as an argument.');
    console.error('Example: node init_remote_db.js "postgresql://mood_user:password@host/mood_db"');
    process.exit(1);
}

const pool = new Pool({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false }
});

async function init() {
    try {
        const sql = fs.readFileSync(path.join(__dirname, 'init_postgresql.sql'), 'utf8');
        console.log('Connecting to database...');
        await pool.query(sql);
        console.log('✅ Database initialized successfully!');
    } catch (err) {
        console.error('❌ Error initializing database:', err.message);
    } finally {
        await pool.end();
    }
}

init();

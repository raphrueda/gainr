import { config } from 'dotenv';
import { Pool } from 'pg';

config();

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
});

(async () => {
    console.log('Creating tables...');

    //#region Users
    console.log('Creating users table...');
    await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(30) UNIQUE,
        email VARCHAR(255) UNIQUE,
        pw_hash TEXT
    );`);
    //#endregion
})();

import 'dotenv/config'
import pg from 'pg'

const { Pool } = pg.Pool

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

async function testConnection() {
  const result = await pool.query('SELECT 1')
  console.log(result.rows)
  process.exit(0)
}

testConnection()

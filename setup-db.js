import postgres from 'postgres'

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  console.error('❌ DATABASE_URL não encontrada nas variáveis de ambiente')
  process.exit(1)
}

const sql = postgres(databaseUrl, {
  ssl: 'require'
})

async function setupDatabase() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS videos(
        id          TEXT PRIMARY KEY,
        title       TEXT NOT NULL,
        description TEXT NOT NULL,
        duration    INTEGER NOT NULL
      );
    `
    console.log('✅ Tabela videos verificada/criada com sucesso!')
  } catch (error) {
    console.error('❌ Erro ao criar tabela:', error)
    throw error
  } finally {
    await sql.end()
  }
}

setupDatabase()

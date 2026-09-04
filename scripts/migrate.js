require('dotenv').config();

const { connectDB, pool } = require('../src/config/postgres');
const { createTables } = require('../src/database/schema');
const m002 = require('./migrations/002_add_alert_constraints');

async function migrate() {
  await connectDB();
  // 001: Bootstrap (creates tables if they don't exist)
  await createTables();
  console.log('✅ 001: Tables created (idempotent)');

  // 002: Add CHECK constraints for severity + verification_level,
  //     add radius_km column, performance indexes
  await m002.up();
  console.log(`✅ 002: ${m002.MIGRATION_NAME} applied`);

  console.log('\n✅ All PostgreSQL migrations completed.');
}

migrate()
  .catch((error) => {
    console.error('❌ PostgreSQL migration failed:', error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
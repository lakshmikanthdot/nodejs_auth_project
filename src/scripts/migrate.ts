// custom migration script

import path from "node:path";
import { pool } from "../lib/db";
import fs from "node:fs";
import { logger } from "../lib/logger";

const MIGRATIONS_DIR = path.join(process.cwd(), "migrations");

// this migration table track which all file(user, banner etc..) we already migrated
const CREATE_MIGRATIONS_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS migrations (
id SERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL UNIQUE,
executed_at TIMESTAMP NOT NULL DEFAULT NOW()
)`;

type MigrationRow = {
  name: string;
};

// get the list of executed migrations from the database
// it will return the migrated file names
async function getExecutedMigrations(): Promise<string[]> {
  const result = await pool.query<MigrationRow>(
    "SELECT name FROM migrations ORDER BY name",
  );
  return result.rows.map((row: MigrationRow) => row.name);
}

// get the list of migration files from the migrations directory
// it will return the list of files in alphabetical order, so that we can run them in order
function getMigrationFiles(): string[] {
  return fs
    .readdirSync(MIGRATIONS_DIR)
    .filter((file) => file.endsWith(".sql"))
    .sort();
}

// run a single migration file
// it will read the sql file and execute the sql statements in a transaction
async function runMigration(fileName: string): Promise<void> {
  const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, fileName), "utf-8");
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    await client.query(sql);
    await client.query("INSERT INTO migrations (name) values ($1)", [fileName]);
    await client.query("COMMIT");

    logger.info(`migration completed: ${fileName}`);
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

// check the migration table exists or not, if not create it
// get the list of executed migrations from the database
// get the list of migration files from the migrations directory
// run the pending migrations in order
async function migrate(): Promise<void> {
  await pool.query(CREATE_MIGRATIONS_TABLE_SQL);

  const executed = new Set(await getExecutedMigrations());
  const pending = getMigrationFiles().filter((file) => !executed.has(file));

  if (pending.length === 0) {
    logger.info("no pending migration");
    return;
  }

  for (const fileName of pending) {
    // actually migration is done here,
    // we read the sql file and execute the sql statements in a transaction
    await runMigration(fileName);
  }

  logger.info("all migrations completed");
}

// run the migration script
migrate()
  .catch((error) => {
    logger.error({ err: error }, "Migrations failed");
    process.exit(1);
  })
  .finally(() => pool.end());

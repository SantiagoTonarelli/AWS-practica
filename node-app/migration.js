const pg = require("pg");
require("dotenv").config();

const client = new pg.Client({
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
  host: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
client.connect();

const createTableText = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL
);
`;

async function createTable() {
  try {
    await client.query(createTableText);
    console.log('Tabla "users" creada exitosamente.');
    await client.end();
  } catch (err) {
    console.error('Error al crear la tabla "users":', err);
    await client.end();
  }
}

async function dropTable() {
  try {
    await client.query("DROP TABLE IF EXISTS users;");
    console.log('Tabla "users" eliminada exitosamente.');
    await client.end();
  } catch (err) {
    console.error('Error al eliminar la tabla "users":', err);
    await client.end();
  }
}

const migrationProcess = () => {
  switch (process.env.MIGRATION_NUMBER) {
    case "1":
      createTable();
      break;
    case "2":
      dropTable();
      break;
    default:
      console.error("Número de migración no válido");
      break;
  }
};

migrationProcess();

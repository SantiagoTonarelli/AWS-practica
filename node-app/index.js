require("dotenv").config();
const express = require("express");
const pg = require("pg");
const cors = require("cors");

const app = express();

app.use(cors());
const port = process.env.PORT || 3000;

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

app.use(express.json());

app.get("/registrar-usuario", async (req, res) => {
  const nombre = `Usuario ${Math.floor(Math.random() * 100)}`;
  const email = `${nombre.replace(" ", "").toLowerCase()}@gmail.com`;

  try {
    const { rows } = await client.query(
      "INSERT INTO users(nombre, email) VALUES($1, $2) RETURNING *",
      [nombre, email]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al insertar el usuario en la base de datos");
  }
});

app.get("/usuarios", async (req, res) => {
  try {
    const { rows } = await client.query("SELECT * FROM users");
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los usuarios de la base de datos");
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

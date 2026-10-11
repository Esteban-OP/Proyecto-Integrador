// 1. Importar las librerías instaladas
require('dotenv').config({ path: '.env.development' }); // Leemos el archivo de desarrollo
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

// 2. Inicializar la aplicación y definir el puerto
const app = express();
const port = process.env.PORT || 3000;

// 3. Configurar los Middlewares (Intermediarios)
app.use(cors()); // Permite peticiones de otros puertos
app.use(express.json()); // Traduce las peticiones entrantes a formato JSON automáticamente

// 4. Configurar la conexión a PostgreSQL usando las variables de entorno
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// 5. Crear nuestro primer "Endpoint" de la API REST (Método GET)
app.get('/api/productos', async (req, res) => {
  try {
    // Pedimos a la base de datos todos los productos
    const resultado = await pool.query('SELECT * FROM productos ORDER BY id ASC');
    // Enviamos la respuesta al cliente en formato JSON
    res.json(resultado.rows);
  } catch (error) {
    console.error('Error en la base de datos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Crear un nuevo producto (Método POST)
app.post('/api/productos', async (req, res) => {
  try {
    // Extraemos los datos que enviará el cliente (Postman o React)
    const { nombre, cantidad, precio } = req.body;
    
    // Ejecutamos la consulta INSERT con parámetros ($1, $2, etc.) por seguridad
    const nuevoProducto = await pool.query(
      'INSERT INTO productos (nombre, cantidad, precio) VALUES ($1, $2, $3) RETURNING *',
      [nombre, cantidad, precio]
    );
    
    // Respondemos con el producto recién creado y un código 201 (Creado)
    res.status(201).json(nuevoProducto.rows[0]);
  } catch (error) {
    console.error('Error al insertar:', error);
    res.status(500).json({ error: 'Error al guardar el producto' });
  }
});

// 6. Encender el servidor
app.listen(port, () => {
  console.log(`Servidor de desarrollo corriendo en http://localhost:${port}`);
});
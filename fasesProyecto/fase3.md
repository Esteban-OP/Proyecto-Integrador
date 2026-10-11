# Construccion del servidor y API REST

Entrar a la carpeta del Backend.

## Inicializar el proyecto Node.js

En la terminal, ejecutar el comando `npm init -y`.

**¿Por qué hacemos esto?**

Node.js es el entorno que permite ejecutar JavaScript en una computadora (fuera del navegador). El comando npm init -y crea un archivo llamado package.json. Este archivo es como el "acta de nacimiento" del backend; allí se registrarán todas las librerías de terceros que instales para que tu proyecto funcione.

## Instalar las dependencias (Librerías)

En ocasiones necesitamos instalar librerias especificas dependiendo de lo que necesitemos en nuestro proyecto.

Ejecutar el comando `npm install express pg dotenv cors` para descargar las herramientas que necesitamos.

**¿Por qué estos paquetes específicos?**

- **express:** Es el marco de trabajo (framework) que facilita enormemente la creación de APIs REST y el manejo de solicitudes HTTP (GET, POST, etc.).

- **pg:** Es el "driver" o conductor que le enseña a Node.js cómo hablar el idioma específico de PostgreSQL.

- **dotenv:** Permite que tu código lea las variables secretas que guardaste en el archivo .env.development.

- **cors:** Es una medida de seguridad. Por defecto, los navegadores bloquean las peticiones que van de un puerto a otro (ej. del frontend en el puerto 5173 al backend en el 3000). CORS le da permiso al frontend para comunicarse con la API.

## Escribir la lógica del Servidor

Dentro de la carpeta backend, crear un archivo llamado `server.js`. Abrir el archivo en el editor de código y pegar el siguiente contenido:

```javascript

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

// 6. Encender el servidor
app.listen(port, () => {
  console.log(`Servidor de desarrollo corriendo en http://localhost:${port}`);
});
```

## Encender el servidor

Volver a la terminal (dentro de la carpeta backend) y ejecutar:

`node server.js`

Si todo está correcto, se mostrara el mensaje: **Servidor de desarrollo corriendo en http://localhost:3000.**

## ¿Qué acabamos de lograr con este código?

Hemos creado una API REST funcional. Cuando alguien haga una solicitud HTTP (específicamente un GET) a la ruta /api/productos, el servidor ejecutará la consulta SQL que aprendimos, extraerá los datos de PostgreSQL y los transformará en un JSON.
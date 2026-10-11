# Pruebas de API y estructuración JSON con Postman

La API de momento solo procesa peticiones GET, por lo que agregaremos el método POST para llenar la tabla y verificar la comunicacion.

- En el archivo `server.js` justo debajo del bloque de código del método app.get(...) y antes de app.listen(...), agregar el siguiente código:

```javascript

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

```

- Iniciar el servidor `node server.js`

## Insertar datos usando Postman (Método POST)

Postman simulará ser una aplicación o un navegador enviando información.

- Abrir Postman y hacer clic en el botón "+" o en "New" para crear una nueva solicitud HTTP (HTTP Request).

- Cambiar el método desplegable de GET a POST.

- En la barra de URL, escribir: `http://localhost:3000/api/productos`

- Justo debajo de la URL, seleccionar la pestaña Body.

- Seleccionar la opción raw y, en el menú desplegable que aparece al final de esa misma fila (donde suele decir Text), elegir JSON.

- En el cuadro de texto principal, escribir este formato JSON:

```JSON
{
  "nombre": "Teclado Mecánico",
  "cantidad": 15,
  "precio": 45.99
}
```

- Hacer clic en el botón Send.

- **Verificación:** En la parte inferior (sección Response), se deberia ver un código de estado 201 Created y el JSON del producto recién guardado, ahora incluyendo automáticamente su id y fecha_creacion generados por PostgreSQL.

## Leer los datos usando Postman (Método GET)

Ahora comprobaremos que la base de datos realmente guardó la información y que nuestro método original funciona.

- En la misma pestaña de Postman, cambiar el método de POST a GET.

- No se necesita modificar la URL, sigue siendo `http://localhost:3000/api/productos`.

- Hacer clic en Send.

- **Verificación:** La respuesta en la parte inferior ahora será un código 200 OK y mostrará un array de JSON (entre corchetes [ ]) con el producto adentro. 
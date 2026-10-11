# Creacion del Frontend

## Configurar el entorno de React

- Abrir una nueva terminal (dejar la terminal del backend corriendo para que la API y base de datos sigan activas) en la carpeta del `frontend`.

- Inicializar el proyecto ejecutando: `npm create vite@latest . -- --template react` (el punto indica que los archivos se instalarán directamente en la carpeta actual).

- Instalar las dependencias necesarias ejecutando: `npm install`

## Consumir la API desde la interfaz

React utiliza "componentes" (funciones que devuelven una mezcla de HTML y JavaScript llamada JSX) y "estados" para gestionar los datos visuales. Escribiremos un componente que consuma la API y procese su respuesta en JavaScript.

- En un editor de código, abrir el archivo src/App.jsx.

- Borrar todo su contenido y reemplázarlo con el siguiente código:

```javascript
import { useState, useEffect } from 'react';

function App() {
  // Estados para almacenar la lista de productos y los datos del formulario
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: '', cantidad: 0, precio: 0 });

  // GET: Cargar productos automáticamente al abrir la página
  useEffect(() => {
    fetch('http://localhost:3000/api/productos')
      .then(respuesta => respuesta.json())
      .then(datos => setProductos(datos))
      .catch(error => console.error('Error al cargar la API:', error));
  }, []);

  // POST: Enviar un nuevo producto a la base de datos
  const guardarProducto = async (evento) => {
    evento.preventDefault(); // Evita que el navegador recargue la página
    try {
      const respuesta = await fetch('http://localhost:3000/api/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoProducto)
      });
      
      if (respuesta.ok) {
        const productoCreado = await respuesta.json();
        // Actualizamos la pantalla agregando el nuevo producto a la lista existente
        setProductos([...productos, productoCreado]);
        // Limpiamos el formulario
        setNuevoProducto({ nombre: '', cantidad: 0, precio: 0 });
      }
    } catch (error) {
      console.error('Error al guardar el producto:', error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
      <h1>Gestor de Inventario</h1>
      
      {/* Formulario para enviar datos (Método POST) */}
      <form onSubmit={guardarProducto} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          placeholder="Nombre del producto" 
          value={nuevoProducto.nombre}
          onChange={(e) => setNuevoProducto({...nuevoProducto, nombre: e.target.value})}
          required 
        />
        <input 
          type="number" 
          placeholder="Cantidad" 
          value={nuevoProducto.cantidad}
          onChange={(e) => setNuevoProducto({...nuevoProducto, cantidad: Number(e.target.value)})}
          required 
        />
        <input 
          type="number" 
          step="0.01" 
          placeholder="Precio" 
          value={nuevoProducto.precio}
          onChange={(e) => setNuevoProducto({...nuevoProducto, precio: Number(e.target.value)})}
          required 
        />
        <button type="submit">Agregar Producto</button>
      </form>

      {/* Tabla para mostrar los datos recibidos (Método GET) */}
      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'left' }}>
        <thead style={{ backgroundColor: '#f4f4f4' }}>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(producto => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>{producto.nombre}</td>
              <td>{producto.cantidad}</td>
              <td>${producto.precio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
```

## Iniciar el servidor Frontend

- En la terminal (dentro de la carpeta frontend), ejecutar: `npm run dev`

- La consola mostrará una URL local (generalmente http://localhost:5173). Abrir en el navegador.

- Si todo está conectado correctamente, al enviar los datos estos viajarán desde React al puerto 3000 de la API Node.js, se guardarán en la base de datos PostgreSQL, y la tabla de React se actualizará en tiempo real.
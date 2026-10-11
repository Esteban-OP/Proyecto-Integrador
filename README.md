# Proyecto integrador para gestion de inventarios

Este proyecto funciona como practica de los siguientes temas:
- Python
- HTML
- CSS
- JavaScript
- APIs (API REST)
- Bases de datos relacionales PostgreSQL (Uso de Dbeaver)
- Uso de REACT
- Node.js
- Uso de postman
- JSON
- Estructuracion de carpetas
- Git
- Variables de entorno para desarrollo y produccion

## Fases

Ejecutaremos el proyecto dividiéndolo en seis fases consecutivas.

| Fase | Enfoque | Tecnologías a Usar |	Acción Principal |
|---|---|---|---|
| 1. Configuración Base | Estructura, Git y Entorno | Consola, Git | Crear las carpetas backend y frontend, inicializar Git, configurar gitignore y el archivo .env.|
| 2. Base de Datos | Almacenamiento Relacional | SQLite, DBeaver, SQL | Crear un archivo de base de datos local y diseñar una tabla sencilla (ej. productos) usando consultas SQL.|
| 3. Backend (API REST) | Lógica del Servidor | Node.js, JSON | Levantar un servidor en el puerto 3000 que se conecte a SQLite y exponga datos en formato JSON mediante métodos HTTP.|
| 4. Pruebas de API | Validación | Postman | Realizar peticiones GET y POST al puerto 3000 para verificar que la API responde correctamente sin necesidad de una interfaz web.|
| 5. Frontend | Interfaz de Usuario | React, HTML, CSS, JS | Crear la interfaz visual en un puerto distinto (ej. 5173). Usaremos JavaScript para consumir la API y mostrar los datos en pantalla.|
| 6. Script Externo | Integración Multi-lenguaje | Python | Escribir un script de Python que se conecte a la misma API para demostrar cómo otro sistema puede consumir los mismos datos JSON.|
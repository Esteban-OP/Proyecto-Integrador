# Construccion del servidor y API REST

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
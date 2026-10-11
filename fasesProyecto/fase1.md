# Configuracion Base

En esta fase se realiza:
1. Estructuracion de carpetas principales.
    - **Carpeta principal:** Gestor-de-inventario
    - **Subcarpetas:** 
        - backend 
        - frontend 
2. Inicializar Control de versiones (Git).
    - Iniciar repositorio: `git init`
3. Crear archivo de exclusion (.gitignore).

    Automaticamente Git intenta rastrear todos los archivos para posteriormente subirlos al repositorio. El archivo `.gitignore` le dice a Git que ignore los archivos que estan especificados dentro.
    - **node_modules/:** Aquí se descargarán miles de archivos de código de terceros cuando instalemos Node.js y React. Es una carpeta pesadísima que nunca se sube a un repositorio porque se puede regenerar automáticamente.
    - **.env:\*** Protege las variables sensibles (contraseñas, puertos locales). Al usar **.env\*** en el `.gitingore`, le decimos a Git que ignore cualquier archivo que empiece con `.env` (como `.env.development` o `.env.production`).
4. Variables de entorno (.env)
    En la carpeta `backend` creamos 3 archivos.
    - **.env.development:**
        - PORT=3000
        - DB_HOST=localhost
        - DB_PORT=5432
        - DB_USER=postgres
        - DB_PASSWORD=pswDB123
        - DB_NAME=inventario_dev
    - **.env.production:**
        - PORT=3000
        - DB_HOST=localhost
        - DB_PORT=5432
        - DB_USER=postgres
        - DB_PASSWORD=pswDB123
        - DB_NAME=inventario_prod
    - **example.env:**
        - PORT=3000
        - DB_HOST=localhost
        - DB_PORT=5432
        - DB_USER=
        - DB_PASSWORD=
        - DB_NAME=
    
    ¿Por qué estos archivos y este puerto? 
    
    El archivo `.env.production/development` almacena la configuración real del servidor. Elegimos el puerto `3000` porque es el estándar convencional para desarrollo en **Node.js**. Asignamos el puerto 3000 al backend para que, cuando el frontend corra en el puerto 5173, no choquen entre sí. El puerto por defecto de **PostgreSQL** suele ser el `5432`.
    
    El archivo `example.env` es una plantilla sin datos sensibles la cual se puede subir a Git, para que cualquier usuario u otros desarrolladores sepan qué variables necesita el proyecto para funcionar.
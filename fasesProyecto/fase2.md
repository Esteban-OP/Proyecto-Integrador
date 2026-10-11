# Conectar DBeaver al servidor PostgreSQL

- Abrir DBeaver y hacer clic en el ícono de **Nueva Conexión** (suele ser un enchufe en la esquina superior izquierda).

- Seleccionar **PostgreSQL** en la lista de bases de datos y hacer clic en Siguiente.

- En la pestaña principal, dejar el **Host** como **localhost** y el **Port** como 5432. En Database, dejarlo en postgres (esta es la base de datos de sistema que viene por defecto).

- En **Username**, escribir postgres y en Password colocar la contraseña elegida al instalar PostgreSQL en la computadora.

- Hacer clic en el botón Probar conexión (Test Connection).

- Verificación: Mensaje de éxito ("Connected").

## Paso 2: Crear los entornos de Desarrollo y Producción

Ahora le daremos instrucciones al motor de PostgreSQL para crear dos bases de datos.

- En el panel izquierdo de DBeaver, hacer clic derecho sobre la nueva conexión y c.

- Escribir los siguientes comandos y ejecútarlos (presionando Ctrl + Enter o el botón de "play" naranja a la izquierda del editor):

```SQL
CREATE DATABASE inventario_dev;
```

Segundo comando:

```SQL
CREATE DATABASE inventario_prod;
```

> [!NOTE]
> Verificación: En el panel izquierdo, hacer clic derecho sobre la carpeta Databases y seleccionar Actualizar (Refresh). Deberían estar ```inventario_dev``` e ```inventario_prod``` listadas.

## Paso 3: Crear la tabla de productos

Vamos a crear la estructura donde guardaremos la información, utilizando una clave primaria (id) como dictan los fundamentos de bases de datos relacionales.

En el panel izquierdo, desplegar la carpeta de bases de datos y hacer click derecho sobre ```inventario_dev```, despues seleccionar Editor SQL > Nuevo Editor/script SQL.

Crear la o las tablas:

```SQL
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    cantidad INTEGER NOT NULL DEFAULT 0,
    precio DECIMAL(10, 2) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Ejecutar el código.

> [!NOTE]
> Verificación: Expandir la ruta inventario_dev > Schemas > public > Tables en el panel izquierdo. Al actualizar, se vera la nueva tabla.
# Prueba-CRUD Usuarios

Este proyecto es una aplicación de gestión de usuarios utilizando **Laravel** para el backend y **React** para el frontend. Implementa operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre un modelo de usuario.

## Estructura del Modelo de Usuario

El modelo de usuario utilizado en este proyecto tiene la siguiente estructura:

```json
{
  "id": 24,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address_city": "Kulas Light - Apt. 556 - Gwenborough",
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company_name": "Romaguera-Crona",
  "company_bs": "harness real-time e-markets"
}
```

Se implementaron las migraciones en Laravel para poder crear las tablas de la base de datos de manera sencilla.

## Flujo de los Datos en la Aplicación

![flujo de datos](flujo_de_datos.drawio.png)

## Flujo de Peticiones de la Aplicación

![flujograma app](flujograma_app.drawio.png)

## Guía de Instalación

### Requisitos

- PHP >= 8.0
- Composer
- Node.js
- Laravel >= 9.x
- React >= 18.x
- MySQL o cualquier otra base de datos relacional compatible con Laravel

### Instalación

1. **Clonar el Repositorio**

   Abre una consola de comandos (cmd o bash) y ejecuta:
   ```bash
   git clone https://github.com/usuario/prueba-crud-usuarios.git
   cd prueba-crud-usuarios
   ```

2. **Instalación de Dependencias en Laravel**

   Navega al directorio de Laravel y ejecuta:
   ```bash
   cd back-prueba-api/
   composer install
   ```

3. **Instalación de Dependencias en React**

   Desde la raíz del proyecto, navega al directorio de React y ejecuta:
   ```bash
   cd crud-frontend/
   npm install
   ```

4. **Configurar el Archivo `.env` en Laravel**

   En el directorio `back-prueba-api/`, modifica el archivo `.envExample`, cámbiale el nombre a `.env` y configura los parámetros de la base de datos, incluyendo el puerto, el nombre de la base de datos y la contraseña del motor de base de datos utilizado.

## Ejecución del Proyecto

1. **Migrar la Base de Datos**

   Si aún no se han creado las bases de datos mediante el script SQL, ejecuta las migraciones de Laravel. Desde la raíz del proyecto:
   ```bash
   cd back-prueba-api/
   php artisan migrate
   ```

2. **Ejecutar el Backend**

   Una vez que la migración esté lista, ejecuta el backend con:
   ```bash
   php artisan serve
   ```

3. **Ejecutar el Frontend**

   Abre otra consola (cmd o bash) y navega al directorio del frontend:
   ```bash
   cd crud-frontend/
   npm start
   ```

El proyecto debería estar en funcionamiento.

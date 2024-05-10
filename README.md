# Aplicación To-Do

La aplicación To-Do es una herramienta que permite a los usuarios registrar y autenticarse utilizando Firebase para gestionar sus tareas personales. Los usuarios pueden crear tareas con título y descripción, así como manipularlas en una lista personal que se guarda en el Local Storage del navegador. Además, los usuarios pueden acceder a una lista de tareas de la comunidad almacenadas en una API creada con Django y PostgreSQL.

## Requisitos de la Aplicación

1. **Registro y Autenticación de Usuarios**
   - Los usuarios pueden registrarse utilizando su correo electrónico y contraseña a través del servicio de autenticación de Firebase.
   - Los usuarios pueden iniciar sesión utilizando sus credenciales registradas.

2. **Gestión de Tareas Personales**
   - Los usuarios pueden crear tareas con título y descripción.
   - Las tareas creadas por un usuario se guardan en el Local Storage del navegador.
   - Las tareas pendientes se demarcan en color gris y son editables, más no podrían ser eliminadas hasta completarse.
   - Las tareas completadas de la comunidad se pueden eliminar, pero no editar.

3. **Gestión de Tareas de la Comunidad**
   - Los usuarios pueden ver y manipular tareas de la comunidad almacenadas en una API Django y PostgreSQL.
   - Las tareas pendientes se demarcan en color gris y son editables, más no podrían ser eliminadas hasta completarse.
   - Las tareas completadas de la comunidad se pueden eliminar, pero no editar.

## Tecnologías Utilizadas

- **Frontend:**
  - Framework de desarrollo: React
  - Manejo del estado: Redux Toolkit
  - Estilizado: Tailwind CSS
  - Servicio de Autenticación: Firebase

- **Backend:**
  - Framework de desarrollo: Django
  - Base de Datos: PostgreSQL
  - API RESTful: Django REST Framework

## Flujo de la Aplicación

1. **Registro y Autenticación de Usuarios**
   - La página de registro permite a los usuarios crear una cuenta proporcionando un correo electrónico y una contraseña a través del servicio de autenticación de Firebase.
   - La página de inicio de sesión permite a los usuarios iniciar sesión utilizando sus credenciales registradas.

2. **Dashboard**
   - Después de iniciar sesión, los usuarios son redirigidos al dashboard donde pueden ver todas sus tareas personales y las tareas de la comunidad.
   - Los usuarios tienen la opción de crear nuevas tareas personales a través de un formulario.
   - Las tareas personales se muestran en una lista donde las pendientes están demarcadas en gris y las completadas en verde.
   - Las tareas de la comunidad se muestran en otra lista donde los usuarios pueden gestionarlas si lo desean.

## Configuración del Entorno de Desarrollo

1. **Frontend**
   - Clonar el repositorio del frontend desde Git.
   - Instalar las dependencias utilizando npm o yarn.
   - Configurar las variables de entorno para la integración con Firebase.

2. **Backend**
   - Configurar y ejecutar la API Django junto con la base de datos PostgreSQL.

## API Django para Tareas de la Comunidad

- Endpoint para OBTENER todas las tareas de la comunidad: `GET /api/tasks/`
- Endpoint para ELIMINAR una tarea de la comunidad: `DELETE /api/tasks/<task_id>/`
- Endpoint para ACTUALIZAR una tarea de la comunidad: `UPDATE /api/tasks/<task_id>/`
- Endpoint para CREAR una tarea de la comunidad: `POST /api/tasks/`

## Consideraciones de Seguridad

- Firebase se encarga de la autenticación segura de usuarios.
- Las comunicaciones entre el frontend y el backend se realizan a través de HTTPS para garantizar la seguridad de los datos.
- Se aplican medidas de seguridad adicionales en el backend para prevenir ataques como CSRF y SQL Injection.




# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



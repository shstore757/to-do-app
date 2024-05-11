# Aplicación To-Do

La aplicación To-Do es una herramienta que permite a los usuarios gestionar sus tareas personales y de la comunidad de forma eficiente.

## Sobre la Aplicación ℹ️

La aplicación permite a los usuarios:

- Registrar y autenticarse utilizando Firebase.
- Crear, editar y eliminar tareas personales.
- Ver y gestionar tareas de la comunidad almacenadas en una API Django y PostgreSQL.

## Requisitos de la Aplicación 📋

### Registro y Autenticación de Usuarios

- Registro con correo electrónico y contraseña.
- Inicio de sesión con credenciales registradas.

### Gestión de Tareas Personales

- Creación de tareas con título y descripción.
- Guardado en Local Storage del navegador.
- Edición de tareas pendientes (gris).
- Eliminación de tareas completadas de la comunidad.

### Gestión de Tareas de la Comunidad

- Visualización y manipulación de tareas de la comunidad.
- Edición de tareas pendientes (gris).
- Eliminación de tareas completadas.

## Tecnologías Utilizadas 💻

### Frontend

- Framework: React
- Estado: Redux Toolkit
- Estilizado: Tailwind CSS
- Autenticación: Firebase

### Backend

- Framework: Django
- Base de Datos: PostgreSQL
- API: Django REST Framework

## Flujo de la Aplicación 🔄

### Registro y Autenticación de Usuarios

- Registro y inicio de sesión.

### Dashboard

- Visualización de tareas personales y de la comunidad.
- Creación de nuevas tareas personales.
- Edición y eliminación de tareas personales.
- Gestión de tareas de la comunidad.

## Configuración del Entorno de Desarrollo ⚙️

### Frontend

1. Clonar el repositorio.
2. Instalar dependencias.
3. Configurar variables de entorno para Firebase.

### Backend

- Configurar y ejecutar la API Django con PostgreSQL.

## API Django para Tareas de la Comunidad 📡

- **Obtener Todas las Tareas:** GET /api/tasks/
- **Eliminar Tarea:** DELETE /api/tasks/<task_id>/
- **Actualizar Tarea:** UPDATE /api/tasks/<task_id>/
- **Crear Tarea:** POST /api/tasks/

## Consideraciones de Seguridad 🔐

- Autenticación segura con Firebase.
- Comunicaciones seguras entre frontend y backend.
- Medidas adicionales de seguridad en el backend (CSRF, SQL Injection).
#   t o - d o - b a s i c  
 
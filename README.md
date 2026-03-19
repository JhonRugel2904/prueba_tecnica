# Documentacion de requerimientos y como ejecutar en un entorno local

# Backend 

Este es el servidor Backend de la aplicación, construido con Node.js y Express. Se encarga de exponer los endpoints (API REST) para gestionar el carrito de compras y persistir de forma segura los datos transaccionales en una base de datos PostgreSQL.

## Tecnologías y Dependencias

El proyecto utiliza las siguientes herramientas principales :
* **Express (`^5.2.1`):** Framework minimalista para la creación de las rutas y manejo de peticiones HTTP.
* **pg (`^8.20.0`):** Cliente de PostgreSQL para Node.js. Elegido para asegurar la integridad referencial de los datos transaccionales del carrito.
* **CORS (`^2.8.6`):** Middleware para permitir las peticiones de origen cruzado desde nuestra aplicación Frontend (React).
* **Dotenv (`^17.3.1`):** Para cargar variables de entorno (credenciales de base de datos, puertos) desde un archivo `.env` y no exponer datos sensibles en el código fuente.
* **Axios (`^1.13.6`):** Cliente HTTP para realizar peticiones a servicios externos si es requerido por la lógica de negocio.
* **Nodemon (`^3.1.14`):** Dependencia de desarrollo (`devDependencies`) para reiniciar automáticamente el servidor al detectar cambios en el código.

## Instalación y Ejecución Local

Sigue estos pasos para levantar el entorno de desarrollo en tu máquina:

### 1. Clonar e Instalar
Posiciónate en la carpeta del backend e instala los paquetes necesarios:
```bash
git clone <url-del-repositorio>
```
```bash
cd proyecto_apis/backend
```
Instalar depdencias necesarias
```bash
npm install
```

### 2. Variables de Entorno
Crea un archivo llamado `.env` en la raíz de esta carpeta (puedes guiarte de el `.env.example`) y configura tu conexión a PostgreSQL y el puerto:

### 3. Base de Datos
Copia el script que se encuentra en el archivo (`init sql` ,ya incluye el usuario)

### 4. Iniciar el Servidor
Para iniciar el servidor ejecuta:
```bash
npm run dev
```
El servidor indicará en la consola que está corriendo y conectado a la base de datos (por defecto en `http://localhost:3000`).

---

# Frontend - Catálogo y Carrito de Compras

Esta es la interfaz de usuario construida con React para el reto técnico de E-Commerce. Se encarga de mostrar un catálogo dinámico consumiendo una API externa (`dummyjson`) y gestionar el estado del carrito de compras comunicándose con nuestro propio Backend.

## Tecnologías y Dependencias

**Dependencias Principales (`dependencies`):**
* **React & React DOM (`^19.2.4`):** Core de la aplicación para construir la interfaz basada en componentes.
* **Tailwind CSS (`^4.2.2`) + PostCSS:** Framework utility-first para un diseño responsive, rápido y escalable.
* **Axios (`^1.13.6`):** Cliente HTTP basado en promesas utilizado para estandarizar las peticiones (tanto a la API pública como al Backend propio) y manejar respuestas/errores eficientemente.
* **SweetAlert2 (`^11.26.23`):** Librería para proveer retroalimentación visual al usuario (Toasts y Alertas) sin bloquear la navegación nativa del navegador.
* **Lucide React (`^0.577.0`):** Sistema de íconos SVG ligeros y modernos (usado para el ícono del carrito, basurero, cerrar panel, etc.).

**Dependencias de Desarrollo (`devDependencies`):**
* **ESLint & Plugins:** Configuración estricta para mantener un código limpio y evitar bugs comunes en React.
* **Vite (`^8.0.0`):** Herramienta de build y servidor de desarrollo local.

## Instalación y Ejecución Local

Sigue estos pasos para levantar el entorno de desarrollo en tu máquina:

### 1. Clonar e Instalar
Posiciónate en la carpeta del frontend e instala los módulos de Node:
```bash
cd proyecto_apis/frontend
```
```bash
npm install
```
### 2. Configuración (Opcional)
Si el Backend está corriendo en un puerto distinto al `3000`, asegúrate de actualizar la URL base en la configuración de Axios (`src/api/api.js` o donde lo tengas centralizado). Por defecto apunta a `http://localhost:3000/api`.

### 3. Iniciar el Servidor de Desarrollo
Ejecuta el siguiente comando para levantar la aplicación usando Vite:
```bash
npm run dev
```
La aplicación se abrirá en tu navegador (generalmente en `http://localhost:5173`).

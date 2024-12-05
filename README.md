
# AsistenciaD

AsistenciaD es una aplicación móvil desarrollada con Ionic y Angular, diseñada para registrar la asistencia de alumnos y docentes. La aplicación utiliza funcionalidades como la cámara del dispositivo para tomar fotos y la geolocalización para registrar la ubicación de los usuarios.

## Características

- **Inicio de sesión**: Autenticación mediante correo electrónico y contraseña.
- **Geolocalización**: Obtención de la ubicación actual del usuario (alumno).
- **Cámara**: Permite tomar fotos para registrar asistencia de manera visual.
- **Gestión de cursos y alumnos**: Los profesores pueden gestionar los cursos y alumnos a través de la aplicación.

## Tecnologías utilizadas

- **Frontend**:
  - **Angular**: Framework para desarrollar aplicaciones web de una sola página (SPA).
  - **Ionic**: Framework para desarrollar aplicaciones móviles híbridas.
  - **Capacitor**: Framework para acceder a funcionalidades nativas del dispositivo, como la cámara y la geolocalización.
  
- **Backend**:
  - **Node.js**: Entorno de ejecución de JavaScript en el lado del servidor.
  - **Sequelize y SQLite3**: Usados para interactuar con la base de datos.

## Instalación

### Requisitos previos

Asegúrate de tener las siguientes herramientas instaladas:

- [Node.js](https://nodejs.org/) - Plataforma para ejecutar JavaScript en el servidor.
- [Ionic CLI](https://ionicframework.com/docs/cli) - Herramienta de línea de comandos para desarrollar aplicaciones móviles con Ionic.
- [Angular CLI](https://angular.io/cli) - Herramienta de línea de comandos para trabajar con Angular.

### Paso 1: Clonar el repositorio

```bash
git clone https://github.com/Tquilaleo/AsistenciaD1
```

### Paso 2: Instalar dependencias

Accede al directorio del proyecto y ejecuta el siguiente comando para instalar las dependencias necesarias:

```bash
npm install
```

### Paso 3: Iniciar el servidor backend

Para ejecutar el backend (API), navega al directorio backend y ejecuta el servidor:

```bash
cd backend
node index.js
```

### Paso 4: Iniciar la aplicación frontend

Para ejecutar la aplicación en modo desarrollo, navega al directorio src y ejecuta:

```bash
cd src
ionic serve
```

La aplicación estará disponible en http://localhost:8100.

## Uso

Accede a la aplicación desde un navegador o instala la versión APK en tu dispositivo móvil.
Inicia sesión con las credenciales correspondientes (correo y contraseña).
Usa la cámara para registrar la asistencia mediante fotos.
Utiliza la geolocalización para obtener la ubicación actual y registrar la asistencia.

## Comandos disponibles

- `ng serve`: Inicia el servidor de desarrollo de Angular.
- `ng build`: Construye la aplicación para producción.
- `ionic serve`: Sirve la aplicación con Ionic.
- `ng test`: Ejecuta las pruebas unitarias.
- `ng lint`: Realiza la comprobación de estilo y calidad de código.

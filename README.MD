# Sistema Hospitalario – Gestión de Internaciones – Integrador WEB 2

## 🎯 Objetivo

El objetivo principal de esta primera etapa es centrarse en la gestión y admisión de una persona en un hospital para su internación.

Actualmente el sistema permite:

* Registro de personas.  
* Registro de profesionales.  
* Listado de personas y profesionales registrados.  
* Admisión de una persona y asignación de una cama para comenzar el proceso de internación.  
* Mediante un botón en todas las vistas, admisión automática de una emergencia.  
* Listado de todas las admisiones e internaciones activas.  
* Actualización de los datos de las personas que llegan sin información por emergencia.

Funcionalidades que se desarrollarán en la segunda etapa:

* Autenticación de usuarios.  
* Alta médica del paciente.  
* Registro de las evaluaciones de enfermeros y médicos sobre los pacientes internados.  
* Registro y actualización del historial médico del paciente.  
* Gestión de medicamentos y tratamientos administrados al paciente.  
* Otras características necesarias para cumplir el proyecto.

## 📂 Estructura del proyecto
```
├── app.js          # Punto de entrada de la aplicación
├── config/         # Configuración de Sequelize y base de datos
├── controller/     # Lógica de controladores (Internaciones, Admisiones, Personas, etc.)
├── models/         # Modelos Sequelize para las tablas de la BD
│ └── sequelize/    # Definición de esquemas y asociaciones
├── routes/         # Definición de rutas Express
├── public/         # Archivos estáticos (CSS, JS, imágenes)
├── views/          # Plantillas Pug para renderizar vistas
├── package.json    # Dependencias y scripts
```

## 🛠 Tecnologías

* **Node.js**  
* **Express**  
* **Sequelize**  
* **MySQL**  
* **Pug**  
* **Bootstrap**  
* **CSS**  
* **JavaScript**  
* **SweetAlert2**

## 🔗 Endpoints principales

| Ruta                         | Descripción                                                |
| ---------------------------- | ---------------------------------------------------------- |
| `/`                          | Vista principal de la aplicación                           |
| `/persona/nuevo`             | Formulario de registro de una persona                      |
| `/persona/listar`            | Listado de personas en el sistema                          |
| `/profesional/nuevo`         | Búsqueda de la persona para asignarle su rol               |
| `/profesional/listar`        | Listado de todos los profesionales en el sistema           |
| `/medico/listar`             | Listado de médicos en el sistema                           |
| `/enfermero/listar`          | Listado de enfermeros en el sistema                        |
| `/admisiones`                | Formulario de búsqueda para comenzar la admisión           |
| `/admisiones/listar`         | Listado de admisiones activas del sistema                  |
| `/internaciones`             | Listado de internaciones activas del sistema               |
| `/internaciones/internados`  | Listado de personas internadas en el sistema               |


## 🚀 Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/RafaCod0011/Sistema-Hospitalario.git
   cd Sistema-Hospitalario
   ```

2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Crear archivo `.env` en la raíz con las siguientes variables (ejemplo):

   ```dotenv
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=sis_hospital
   DB_USER=root
   DB_PASS=
   PORT=3000
   ```

4. Iniciar el servidor:

   ```bash
   npm start
   ```

6. Abrir en el navegador:

   ```
   http://localhost:3000

   ```
## 👨‍🎓 Reflexión final

Para mí, lo más complicado al desarrollar esta primera etapa fue diseñar la base de datos con todas las consideraciones necesarias para mantener un flujo sin problemas, así como gestionar las rutas, sus vistas y sus controles.

A medida que comenzaba a programar este proyecto, me iba dando cuenta de los errores que podria llegar a tener
a futuro la base de datos y creo que he podido crear una que cumpla con el objetivo final del mismo.

Respecto a rutas, controles y vistas, una vez que entendí cómo se relacionaban entre sí y comprobé que funcionaban al ejecutar la aplicación, pude desarrollar el resto con mayor rapidez.

Comencé esta carrera el año pasado y, a pesar de no contar con conocimientos previos de programación, he disfrutado mucho los desafíos. Con la ayuda de profesores y compañeros, he podido plasmar este aprendizaje en este proyecto.
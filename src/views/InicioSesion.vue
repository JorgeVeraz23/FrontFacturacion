<template>
  <div class="login-container">
    <div class="login-form">
      <h2>Iniciar Sesión</h2>
      <label for="usuario">Usuario:</label>
      <input v-model="usuario" type="text" id="usuario" required />

      <label for="contrasena">Contraseña:</label>
      <input v-model="contrasena" type="password" id="contrasena" required />

      <button @click="login">Iniciar Sesión</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      usuario: "tu_usuario",
      contrasena: "tu_contraseña",
      intentosFallidos: 0,
      bloqueado: false,
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(
          "https://localhost:7083/api/Usuario/login",
          {
            usuario1: this.usuario,
            contraseña: this.contrasena,
          }
        );

        if (response.data.statusCode === 200) {
          this.intentosFallidos = 0;
          this.bloqueado = false;
          alert("Inicio de sesión exitoso");
        } 
          
      } catch (error) {
        console.error("Error al autenticar:", error);

        if (error.response && error.response.status === 401) {
          this.intentosFallidos += 1;
          alert("Credenciales inválidas");

          if (this.intentosFallidos >= 3) {
            this.bloqueado = true;
            alert("Usuario bloqueado. Contacte al administrador o espere un minuto para volver a intentarlo");
          }
        } else {
          alert("Error al conectar con la API");
        }
      }
    },
  },
};
</script>

<style>
/* Fondo general azul claro */
body, html {
  margin: 0;
  padding: 0;
  background-color: #3498db;
  font-family: sans-serif; /* Fuente más moderna */
}

/* Sección de login */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Altura mínima para cubrir la pantalla */
  background-image: linear-gradient(to top, #3498db, #e6f7ff); /* Gradiente azul claro y blanco */
  margin: 0 auto; /* Centrar el div */
}

/* Formulario de login */
.login-form {
  width: 360px; /* Ancho ligeramente mayor */
  padding: 30px; /* Más espacio interior */
  background-color: #ffffff; /* Blanco */
  border-radius: 10px; /* Bordes más redondeados */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25); /* Sombra más suave */
  text-align: center; /* Centrar el contenido */
}

/* Cambios solicitados */

.login-form h2 {
  color: #3498db; /* Azul claro */
  font-weight: bold; /* Título más llamativo */
  margin-bottom: 20px; /* Más espacio debajo del título */
}

label {
  display: block;
  margin-bottom: 10px;
  color: #333;
  font-weight: 600; /* Texto ligeramente más grueso */
}

input {
  width: calc(100% - 20px); /* Ancho del botón - espacio entre inputs */
  padding: 12px 15px; /* Más espacio interior */
  margin-bottom: 15px;
  border: 1px solid #3498db; /* Azul claro */
  border-radius: 5px;
  font-size: 16px; /* Fuente más grande */
  text-align: center; /* Centrar el texto en los inputs */
  margin-right: 10px; /* Desplazamiento hacia la derecha */
}

button {
  width: calc(100% - 20px); /* Ancho del botón - espacio entre inputs */
  padding: 12px 15px; /* Más espacio interior */
  background-color: #ff8c00; /* Naranja */
  color: #ffffff; /* Letras blancas */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out; /* Transición suave en el hover */
  margin-left: 10px; /* Desplazamiento hacia la izquierda */
}

button:hover {
  background-color: #e07e00; /* Naranja más oscuro al pasar el ratón */
}
</style>





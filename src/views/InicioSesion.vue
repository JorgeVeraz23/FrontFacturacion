<template>
 
  <div class="login-container">
   
    <img src="https://i.ibb.co/F7HJRPs/logo-violeta.png" alt="Logo Violeta" class="logo" />
    <div class="glassmorphic login-form">
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
      usuario: "",
      contrasena: "",
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

          // Redirigir al menú principal después del inicio de sesión exitoso
          this.$router.push('/menu-principal/crear-editar-factura');
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

<style scoped>
/* Formulario de inicio de sesión */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.glassmorphic {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  text-align: center;
  width: 360px;
}

.glassmorphic h2 {
  color: #080808;
  font-weight: bold;
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 10px;
  color: #040404;
  font-weight: 600;
}

input {
  width: calc(100% - 20px);
  padding: 12px 15px;
  margin-bottom: 15px;
  border: 1px solid #800080;
  border-radius: 5px;
  font-size: 16px;
  text-align: center;
  margin-right: 10px;
}

button {
  width: calc(100% - 20px);
  padding: 12px 15px;
  background-color: #6a5acd; /* SlateBlue, un color que combina con púrpura */
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  margin-left: 10px;
}

button:hover {
  background-color: #483d8b; /* DarkSlateBlue, color más oscuro al pasar el ratón */
}
img {
    max-width: 20%;
    height: auto;
    margin-bottom: 20px;
    border-top-left-radius: 100px; /* Ajusta el valor según sea necesario */
    border-bottom-left-radius: 100px; /* Ajusta el valor según sea necesario */
  }
</style>

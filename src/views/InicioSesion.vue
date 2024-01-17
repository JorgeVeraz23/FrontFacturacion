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

<style>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-form {
  width: 300px;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.login-form h2 {
  text-align: center;
  color: #333;
}

label {
  display: block;
  margin-top: 10px;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}
</style>

<script>
import axios from "axios";

export default {
  data() {
    return {
      usuario: "tu_usuario",
      contrasena: "tu_contraseña",
      intentosFallidos: 0,
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
          alert("Inicio de sesión exitoso");
        } else {
          this.intentosFallidos += 1;

          if (this.intentosFallidos >= 3) {
            alert("Usuario bloqueado. Contacte al administrador.");
          } else {
            alert("Credenciales inválidas");
          }
        }
      } catch (error) {
        console.error("Error al autenticar:", error);
      }
    },
  },
};
</script>

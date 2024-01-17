<template>
    <div class="inicio-sesion-container">
      <div class="inicio-sesion-form">
        <h2>Iniciar Sesión</h2>
        <form @submit.prevent="login">
          <label for="username">Usuario:</label>
          <input type="text" id="username" v-model="username" required>
  
          <label for="password">Contraseña:</label>
          <input type="password" id="password" v-model="password" required>
  
          <button type="submit">Iniciar Sesión</button>
        </form>
  
        <div v-if="error" class="error-message">
          {{ errorMessage }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: "",
        password: "",
        error: false,
        errorMessage: "",
      };
    },
    methods: {
      login() {
        // Aquí puedes agregar la lógica de autenticación si es necesario
        // Por ahora, simplemente muestra un mensaje de error si no se ingresa un usuario y contraseña
        if (!this.username || !this.password) {
          this.error = true;
          this.errorMessage = "Por favor, ingrese un usuario y contraseña.";
        } else {
          // Aquí podrías realizar una solicitud de autenticación a tu API
          // Por ejemplo, podrías usar Axios para hacer la solicitud HTTP
          // axios.post('tu_url_de_autenticacion', { username: this.username, password: this.password })
          //   .then(response => {
          //     // Manejar la respuesta de la API
          //   })
          //   .catch(error => {
          //     // Manejar el error de la API
          //   });
          console.log("Simulación de inicio de sesión");
          console.log("Usuario:", this.username);
          console.log("Contraseña:", this.password);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .inicio-sesion-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  
  .inicio-sesion-form {
    width: 300px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  label {
    margin-bottom: 5px;
  }
  
  input {
    margin-bottom: 10px;
    padding: 8px;
  }
  
  button {
    background-color: #4caf50;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  .error-message {
    color: red;
    margin-top: 10px;
  }
  </style>
  
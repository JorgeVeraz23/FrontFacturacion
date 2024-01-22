<template>
    <div id="app">
      <!-- Otras partes de tu aplicación si las tienes -->
      <router-view></router-view>
    </div>
  </template>
  
  <script>
  export default {
    name: 'App',
  };
  </script>
  
  <style>
body, html {
  margin: 0;
  padding: 0;
  background-color: #9400D3; /* Púrpura */
  font-family: sans-serif;
}
button {
  padding: 10px 15px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #2980b9;
}
  /* Estilos específicos del componente aquí... */
  input {
    padding: 10px;
    border: 1px solid #3498db;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
  }

  input:focus {
    outline: none;
    border-color: #2980b9;
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.8);
  }

  button {
    padding: 10px 15px;
    background-color: #3498db;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #2980b9;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 20px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  th, td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }
  th {
  background-color: #f0f0f0; /* Gris claro o cualquier otro color */
  color: #333; /* Color de texto para contraste */
}


 
</style>

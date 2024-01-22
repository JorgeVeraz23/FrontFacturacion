<template>
  <div class="container glassmorphism">
    <div class="menu">
      <div class="menu-header glassmorphism">
        <h2>Menú Principal</h2>
      </div>
      <div class="menu-section">
        <h3>Productos</h3>
        <router-link class="menu-link" to="/menu-principal/listar-productos">Mostrar Productos</router-link>
        <router-link class="menu-link" to="/menu-principal/crear-editar-producto">Administrar Productos</router-link>
      </div>
      <div class="menu-section">
        <h3>Familias de Productos</h3>
        <router-link class="menu-link" to="/menu-principal/listar-familias-productos">Mostrar Familias de Productos</router-link>
        <router-link class="menu-link" to="/menu-principal/crear-editar-familia-producto">Administrar Familias de Productos</router-link>
      </div>
      <div class="menu-section">
        <h3>Facturas</h3>
        <router-link class="menu-link" to="/menu-principal/listar-facturas">Mostrar Facturas</router-link>
        <router-link class="menu-link" to="/menu-principal/crear-editar-factura">Administrar Facturas</router-link>
      </div>
    </div>

    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: flex-end;
  height: 100vh;
}

.glassmorphism {
  background: rgba(255, 255, 255, 0.1); /* Fondo con transparencia */
  border: 1px solid rgba(255, 255, 255, 0.2); /* Borde con transparencia */
  border-radius: 8px;
  backdrop-filter: blur(10px); /* Desenfoque */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.menu {
  display: flex;
  flex-direction: column;
  width: 250px;
  background: rgba(255, 255, 255, 0.1); /* Fondo con transparencia */
  color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra suave */
  margin-right: 20px; /* Añadido espacio entre el menú y el contenido */
}

.menu-header {
  background: rgba(255, 255, 255, 0.2); /* Fondo con transparencia */
  color: white;
  padding: 15px;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra suave */
}

.menu-section {
  padding: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2); /* Borde con transparencia */
}

.menu-section h3 {
  margin-bottom: 15px;
  font-size: 18px;
  color: white;
}

.menu-link {
  display: block;
  padding: 10px 16px;
  margin-bottom: 10px;
  background: rgba(255, 255, 255, 0.2); /* Fondo con transparencia */
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra suave */
}

.menu-link:hover {
  background: rgba(255, 255, 255, 0.3); /* Cambio de color al pasar el ratón */
}

.router-link-exact-active {
  background: rgba(255, 255, 255, 0.3); /* Color activo */
}

.content {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  margin-left: 20px;
  margin-top: 20px;
}
</style>

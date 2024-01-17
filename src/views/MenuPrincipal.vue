<template>
  <div class="container">
    <div class="menu">
      <div class="menu-header">
        <h2 style="color: white;">Menú Principal</h2> <!-- Texto blanco -->
      </div>
      <div class="menu-section">
        <h3>Productos</h3>
        <router-link class="menu-link" to="/menu-principal/listar-productos">Listar Productos</router-link>
        <router-link class="menu-link" to="/menu-principal/crear-editar-producto">Crear/Editar Producto</router-link>
      </div>
      <div class="menu-section">
        <h3>Familias de Productos</h3>
        <router-link class="menu-link" to="/menu-principal/listar-familias-productos">Listar Familias de Productos</router-link>
        <router-link class="menu-link" to="/menu-principal/crear-editar-familia-producto">Crear/Editar Familia de Producto</router-link>
      </div>
      <div class="menu-section">
        <h3>Facturas</h3>
        <router-link class="menu-link" to="/menu-principal/listar-facturas">Listar Facturas</router-link>
        <router-link class="menu-link" to="/menu-principal/crear-editar-factura">Crear/Editar Factura</router-link>
      </div>
    </div>

    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuPrincipal',
};
</script>

<style>
.container {
  display: flex;
  height: 100vh;
}

.menu {
  display: flex;
  flex-direction: column;
  width: 250px;
  background-color: #ff8c00; /* Naranja */
  color: white;
}

.menu-header {
  background-color: #3498db; /* Azul claro */
  color: white;
  padding: 10px;
  text-align: center;
}

.menu-section {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.menu-section h3 {
  margin-bottom: 10px;
  font-size: 16px;
  color: white;
}

.menu-link {
  display: block;
  padding: 8px 16px;
  margin-bottom: 8px;
  background-color: #ffaf5f; /* Naranja claro */
  color: #333;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.menu-link:hover {
  background-color: #ff9b3d; /* Naranja más oscuro al pasar el ratón */
}

.router-link-exact-active {
  background-color: #ff9b3d; /* Naranja más oscuro cuando la ruta está activa */
}

.content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px; /* Ajusta el margen según tus preferencias */
}
</style>

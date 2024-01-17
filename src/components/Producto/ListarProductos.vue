<template>
  <div>
    <h2>Listar Productos</h2>
    <table>
      <thead>
        <tr>
          <th>ID Producto</th>
          <th>Código</th>
          <th>Nombre</th>
          <th>ID Familia</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Activo</th>
          <th>Fecha de Creación</th>
          <th>ID Usuario</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="producto in productos" :key="producto.idProducto">
          <td>{{ producto.idProducto }}</td>
          <td>{{ producto.codigo }}</td>
          <td>{{ producto.nombre }}</td>
          <td>{{ producto.idFamilia }}</td>
          <td>{{ producto.precio }}</td>
          <td>{{ producto.stock }}</td>
          <td>{{ producto.activo ? 'Sí' : 'No' }}</td>
          <td>{{ producto.fechaCreacion }}</td>
          <td>{{ producto.idUsuario }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ListarProductos',
  data() {
    return {
      productos: [],
    };
  },
  methods: {
    async obtenerProductos() {
      try {
        const response = await fetch('https://localhost:7083/api/Producto');
        const data = await response.json();
        console.log('Datos de productos:', data);
        this.productos = data.resultado;
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    },
  },
  mounted() {
    this.obtenerProductos();
  },
};
</script>

<style>
/* Estilos para la tabla */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #3498db; /* Azul claro */
  color: white;
}

tr:hover {
  background-color: #f5f5f5; /* Fondo gris claro al pasar el ratón sobre la fila */
}
</style>

<template>
  <div class="table-container">
    <h2>Productos</h2>
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
          <td :class="{'low-stock': producto.stock < 10, 'normal-stock': producto.stock >= 10}">
            {{ producto.stock }}
          </td>
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
/* Estilos mejorados para la tabla con glassmorfismo */
.table-container {
  margin: 20px;
  background: rgba(255, 255, 255, 0.1); /* Fondo con transparencia */
  border: 1px solid rgba(255, 255, 255, 0.2); /* Borde con transparencia */
  border-radius: 8px;
  backdrop-filter: blur(10px); /* Desenfoque */
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid rgba(255, 255, 255, 0.2); /* Borde con transparencia */
  padding: 12px; /* Aumentar el espacio interno */
  text-align: left;
  font-size: 14px; /* Tamaño de fuente ajustado */
}

th {
  background-color: rgba(52, 152, 219, 0.8); /* Azul claro con transparencia */
  color: white;
  font-weight: bold;
}

tr {
  transition: background-color 0.3s ease;
}

tr:hover {
  background-color: #f0f0f0; /* Fondo gris claro al pasar el ratón sobre la fila */
}

/* Estilo para las celdas de "Activo" */
td:nth-child(6) {
  color: #010201; /* Verde para "Sí" */
}

td:nth-child(6):before {
  content: '\2022'; /* Punto Unicode para el símbolo de viñeta */
  color: #e74c3c; /* Rojo para "No" */
  display: inline-block;
  margin-right: 5px;
}

/* Estilo para las celdas de "Fecha de Creación" */
td:nth-child(8) {
  font-style: italic;
}

/* Estilo para las celdas de "Stock" */
.low-stock, .normal-stock {
  color: #000; /* Color negro para el stock */
  font-weight: bold; /* Texto en negrita */
}

.low-stock {
  color: #e74c3c; /* Rojo para inventario bajo */
}

.normal-stock {
  color: #060606; /* Verde para inventario normal */
}
</style>

<template>
  <div>
    <h2>Familias de Productos</h2>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>ID Familia</th>
            <th>Código</th>
            <th>Nombre</th>
            <th>Activo</th>
            <th>Fecha de Creación</th>
            <th>ID Usuario</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="familia in familias" :key="familia.idFamilia">
            <td>{{ familia.idFamilia }}</td>
            <td>{{ familia.codigo }}</td>
            <td>{{ familia.nombre }}</td>
            <td>{{ familia.activo ? 'Sí' : 'No' }}</td>
            <td>{{ familia.fechaCreacion }}</td>
            <td>{{ familia.idUsuario }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListarFamiliasProductos',
  data() {
    return {
      familias: [],
    };
  },
  methods: {
    async obtenerFamilias() {
      try {
        const response = await fetch('https://localhost:7083/api/FamiliaProducto');
        const data = await response.json();
        console.log('Datos de familias de productos:', data);
        this.familias = data.resultado;
      } catch (error) {
        console.error('Error al obtener familias de productos:', error);
      }
    },
  },
  mounted() {
    this.obtenerFamilias();
  },
};
</script>

<style>
/* Estilos mejorados para la tabla con glassmorfismo */
.table-container {
  background: rgba(255, 255, 255, 0.1); /* Fondo con transparencia */
  border: 1px solid rgba(255, 255, 255, 0.2); /* Borde con transparencia */
  border-radius: 8px;
  backdrop-filter: blur(10px); /* Desenfoque */
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid rgba(255, 255, 255, 0.2); /* Borde con transparencia */
  padding: 8px;
  text-align: left;
}

th {
  background-color: rgba(52, 152, 219, 0.8); /* Azul claro con transparencia */
  color: white;
}

tr:hover {
  background-color: #f5f5f5; /* Fondo gris claro al pasar el ratón sobre la fila */
}
</style>
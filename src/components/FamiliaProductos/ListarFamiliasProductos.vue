<template>
  <div>
    <h2>Listar Familias de Productos</h2>
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

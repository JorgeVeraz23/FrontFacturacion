<template>
  <div>
    <h2>Listar Facturas</h2>
    <table>
      <thead>
        <tr>
          <th>ID Factura</th>
          <th>Número de Factura</th>
          <th>RUC Cliente</th>
          <th>Razón Social Cliente</th>
          <th>Subtotal</th>
          <th>Porcentaje IGV</th>
          <th>IGV</th>
          <th>Total</th>
          <th>ID Usuario</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="factura in facturas" :key="factura.idFactura">
          <td>{{ factura.idFactura }}</td>
          <td>{{ factura.numeroFactura }}</td>
          <td>{{ factura.rucCliente }}</td>
          <td>{{ factura.razonSocialCliente }}</td>
          <td>{{ factura.subtotal }}</td>
          <td>{{ factura.porcentajeIgv }}</td>
          <td>{{ factura.igv }}</td>
          <td>{{ factura.total }}</td>
          <td>{{ factura.idUsuario }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ListarFacturas',
  data() {
    return {
      facturas: [],
    };
  },
  methods: {
    async obtenerFacturas() {
      try {
        const response = await fetch('https://localhost:7083/api/Factura');
        const data = await response.json();
        console.log('Datos de facturas:', data);
        this.facturas = data.resultado;
      } catch (error) {
        console.error('Error al obtener facturas:', error);
      }
    },
  },
  mounted() {
    this.obtenerFacturas();
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

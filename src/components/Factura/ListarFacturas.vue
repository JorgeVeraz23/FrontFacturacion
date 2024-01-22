<template>
  <div class="glassmorphism">
    <h2>Facturas</h2>
    <table>
      <thead>
        <tr>
          <th>id Factura</th>
          <th>numero Factura</th>
          <th>ruc Cliente</th>
          <th>razonSocialCliente</th>
          <th>subtotal</th>
          <th>porcentaje Igv</th>
          <th>igv</th>
          <th>total</th>
          <th>ID Usuario</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="facturita in facturitas" :key="facturita.idFactura">
          <td>{{ facturita.idFactura }}</td>
          <td>{{ facturita.numeroFactura }}</td>
          <td>{{ facturita.rucCliente }}</td>
          <td>{{ facturita.razonSocialCliente }}</td>
          <td>{{ facturita.subtotal }}</td>
          <td>{{ facturita.porcentajeIgv }}</td>
          <td>{{ facturita.igv }}</td>
          <td>{{ facturita.total }}</td>
          <td>{{ facturita.idUsuario }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="glassmorphism">
    <h2>Detalles de Facturas</h2>
    <table>
      <thead>
        <tr>
          <th>ID Item</th>
          <th>ID Factura</th>
          <th>ID Usuario</th>
          <th>Codigo Producto</th>
          <th>Nombre Producto</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>SubTotal</th>
          <th>ID Usuario</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="detallito in detallitos" :key="detallito.idFactura">
          <td>{{ detallito.idItem }}</td>
          <td>{{ detallito.idFactura }}</td>
          <td>{{ detallito.idUsuario }}</td>
          <td>{{ detallito.codigoProducto }}</td>
          <td>{{ detallito.nombreProducto }}</td>
          <td>{{ detallito.precio }}</td>
          <td>{{ detallito.cantidad }}</td>
          <td>{{ detallito.subtotal }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      facturitas: [],
      detallitos: []
    };
  },
  methods: {
    async mostrarFactura() {
      try {
        const response = await axios.get('https://localhost:7083/api/Factura/');
        console.log('Código de estado HTTP:', response.status);

        const data = response.data;
        console.log('Datos de facturas:', data);

        this.facturitas = data.resultado;
      } catch (error) {
        console.error('Error al obtener facturas:', error.message);
      }
    },
    async obtenerDetallesFactura() {
      try {
        const response = await axios.get('https://localhost:7083/api/DetalleFactura');
        const data = response.data.resultado;
        this.detallitos = data;
      } catch (error) {
        console.error('Error al obtener detalles de factura:', error);
      }
    },
  },
  mounted() {
    console.log('Componente montado');
    this.mostrarFactura();
    this.obtenerDetallesFactura();
  },
};
</script>

<style scoped>
.glassmorphism {
  background: rgba(255, 255, 255, 0.1); /* Fondo con transparencia */
  border: 1px solid rgba(255, 255, 255, 0.2); /* Borde con transparencia */
  border-radius: 8px;
  backdrop-filter: blur(10px); /* Desenfoque */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;
}

h2 {
  color: #090909; /* Cambiar el color del título si lo deseas */
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid rgba(255, 255, 255, 0.2); /* Borde con transparencia */
  padding: 10px;
  text-align: left;
}

th {
  background: #3498dbcc; /* Fondo con transparencia */
}

tr:nth-child(even) {
  background: rgba(255, 255, 255, 0.1); /* Fondo con transparencia */
}
</style>

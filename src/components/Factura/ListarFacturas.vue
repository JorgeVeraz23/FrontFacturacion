<template>
  <div>
    <h2>Listar Facturas</h2>
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
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      facturitas: [],
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
  },
  mounted() {
    console.log('Componente montado');
    this.mostrarFactura();
  },
};
</script>

<style scoped>
  /* Estilos específicos del componente aquí... */
</style>

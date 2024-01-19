<template>
  <div>
    <!-- Cabecera de la factura -->
    <div>
      <label>Id Usuario:</label>
      <input v-model="factura.idUsuario" />
      <label>Id Factura:</label>
      <input v-model="factura.idFactura" disabled />
      <label>Número de Factura:</label>
      <input v-model="factura.numeroFactura" />
      <label>Ruc del cliente:</label>
      <input v-model="factura.rucCliente" />
      <label>Razón social del cliente:</label>
      <input v-model="factura.razonSocialCliente" />
      <label>Subtotal:</label>
      <input v-model="factura.subtotal" />
      <label>Porcentaje de IGV:</label>
      <input v-model="factura.porcentajeIGV" />
      <label>IGV:</label>
      <input v-model="factura.igv" disabled />
      <label>Total:</label>
      <input v-model="factura.total" disabled />
    </div>

    <!-- Detalle de la factura -->
    <div>
      <table>
        <thead>
          <tr>
            <th>Id Item</th>
            <th>Código de Producto</th>
            <th>Nombre del Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in factura.detalle" :key="index">
            <td>{{ item.idItem }}</td>
            <td><input v-model="item.codigoProducto" /></td>
            <td><input v-model="item.nombreProducto" /></td>
            <td><input v-model="item.precio" /></td>
            <td><input v-model="item.cantidad" /></td>
            <td><input v-model="item.subtotal" disabled /></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Botones para LISTAR, CREAR, ELIMINAR -->
    <div>
      <button @click="listarFacturas">Listar Facturas</button>
      <button @click="crearFactura">Crear Factura</button>
      <button @click="eliminarFactura">Eliminar Factura</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      factura: {
        idUsuario: null,
        idFactura: null,
        numeroFactura: '',
        rucCliente: '',
        razonSocialCliente: '',
        subtotal: null,
        porcentajeIGV: null,
        igv: null,
        total: null,
        detalle: [
          {
            idItem: null,
            codigoProducto: '',
            nombreProducto: '',
            precio: null,
            cantidad: null,
            subtotal: null
          }
        ]
      }
    };
  },
  methods: {
    listarFacturas() {
      // Lógica para listar facturas
    },
    crearFactura() {
      // Lógica para crear factura
    },
    eliminarFactura() {
      // Lógica para eliminar factura
    }
  }
};
</script>


<style scoped>
/* Estilos específicos del componente aquí... */
</style>


<style scoped>
/* Estilos específicos del componente aquí... */
</style>

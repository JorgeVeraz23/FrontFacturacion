<template>
  <div>
    <!-- Sección para ingresar datos de la factura -->
    <div>
      <label for="numeroFactura">Número de Factura:</label>
      <input v-model="numeroFactura" type="number" id="numeroFactura" />

      <label for="rucCliente">RUC del Cliente:</label>
      <input v-model="rucCliente" type="text" id="rucCliente" />

      <label for="razonSocialCliente">Razón Social del Cliente:</label>
      <input v-model="razonSocialCliente" type="text" id="razonSocialCliente" />

      <label for="subtotal">Subtotal:</label>
      <input v-model="subtotal" type="number" id="subtotal" />

      <label for="porcentajeIgv">Porcentaje IGV:</label>
      <input v-model="porcentajeIgv" type="number" id="porcentajeIgv" />

      <label for="idUsuarioFactura">ID Usuario Factura:</label>
      <input v-model="idUsuarioFactura" type="number" id="idUsuarioFactura" />

      <button @click="iniciarFacturacion">Iniciar Facturación</button>
    </div>

    <!-- Sección para mostrar productos y detalles de la factura -->
    <label for="productId">ID del Producto:</label>
    <input v-model="productId" type="number" id="productId" />
    
    <button @click="getProduct">Obtener Producto</button>

    <!-- Tabla para mostrar productos -->
    <table v-if="productsToShow.length > 0">
      <!-- Cabecera de la tabla -->
      <thead>
        <tr>
          <th>#</th>
          <th>ID Producto</th>
          <th>Código</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Cantidad</th>
          <th>Acción</th>
        </tr>
      </thead>
      <!-- Cuerpo de la tabla -->
      <tbody>
        <tr v-for="(product, index) in productsToShow" :key="product.idProducto">
          <td>{{ index + 1 }}</td>
          <td>{{ product.idProducto }}</td>
          <td>{{ product.codigo }}</td>
          <td>{{ product.nombre }}</td>
          <td>{{ product.precio }}</td>
          <td>{{ product.stock }}</td>
          <td>
            <input v-model="product.cantidad" type="number" />
          </td>
          <td>
            <button @click="addItemToFactura(product)">Agregar a Carrito</button>
          </td>
        </tr>
      </tbody>
    </table>
    
    <table>
  <thead>
    <tr>
      <th>Código</th>
      <th>Nombre</th>
      <th>Cantidad</th>
      <th>Precio/u</th>
      <th>SubTotal</th>
      <th>IdItem</th>
      <!-- Agrega más columnas según sea necesario -->
    </tr>
  </thead>
  <tbody>
    <tr v-for="(producto, index) in productosEnCarrito" :key="index">
      <td>{{ producto.codigo }}</td>
      <td>{{ producto.nombre }}</td>
      <td>{{ producto.cantidad }}</td>
      <td>{{ producto.precio }}</td>
      <td>{{ producto.subtotal }}</td>
      <td>{{ producto.idItem }}</td>
      <td>
        <button @click="eliminarDetalleFactura(producto.idItem, index)" v-if="producto && producto.idItem">Eliminar Producto</button>
</td>
    

      <!-- Agrega más columnas según sea necesario -->
    </tr>
  </tbody>
</table>
<div>
  <p>Total Subtotal: {{ formatCurrency(totalSubtotal) }}</p>
</div>

    <!-- Sección para generar factura -->
    <div>
      <!-- Botón para generar la factura -->
      <button @click="generarFactura">Generar Factura</button>
    </div>

    <div>
    <label for="idFacturaMostrar">ID de la Factura a Mostrar:</label>
    <input v-model="idFacturaMostrar" type="number" id="idFacturaMostrar" />

    <!-- Botón para mostrar la factura y detalles de factura -->
    <button @click="mostrarFacturaYDetalles">Mostrar Factura y Detalles</button>
  </div>

  <!-- Tabla para mostrar factura y detalles de factura -->
  <table v-if="facturaMostrada && detallesFacturaMostrados.length > 0">

    <thead>
      <tr>
        <th>ID Factura</th>
        <th>Número de Factura</th>
        <th>RUC Cliente</th>
        <th>Razón Social Cliente</th>
        <th>Subtotal</th>
        <th>IGV</th>
        <th>Total</th>
        <!-- Agrega más columnas según sea necesario -->
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{{ facturaMostrada.idFactura }}</td>
        <td>{{ facturaMostrada.numeroFactura }}</td>
        <td>{{ facturaMostrada.rucCliente }}</td>
        <td>{{ facturaMostrada.razonSocialCliente }}</td>
        <td>{{ facturaMostrada.subtotal }}</td>
        <td>{{ facturaMostrada.igv }}</td>
        <td>{{ facturaMostrada.total }}</td>
        <!-- Agrega más columnas según sea necesario -->
      </tr>
      <tr v-for="(detalle, index) in detallesFacturaMostrados" :key="index">
        <td>{{ detalle.codigo }}</td>
        <td>{{ detalle.nombre }}</td>
        <td>{{ detalle.cantidad }}</td>
        <td>{{ detalle.precio }}</td>
        <td>{{ detalle.subtotal }}</td>
        <td>{{ detalle.idItem }}</td>
        <!-- Agrega más columnas según sea necesario -->
      </tr>
    </tbody>
  </table>


    <!-- Tabla para mostrar factura -->
    <table v-if="facturaMostrada">
      <thead>
        <tr>
          <th>ID Factura</th>
          <th>Número de Factura</th>
          <th>RUC Cliente</th>
          <th>Razón Social Cliente</th>
          <th>Subtotal</th>
          <th>IGV</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ facturaMostrada.idFactura }}</td>
          <td>{{ facturaMostrada.numeroFactura }}</td>
          <td>{{ facturaMostrada.rucCliente }}</td>
          <td>{{ facturaMostrada.razonSocialCliente }}</td>
          <td>{{ facturaMostrada.subtotal }}</td>
          <td>{{ facturaMostrada.igv }}</td>
          <td>{{ facturaMostrada.total }}</td>
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
      facturaId: null,
      productId: null,
      products: [],
      productsToShow: [],
      numeroFactura: null,
      rucCliente: '',
      razonSocialCliente: '',
      subtotal: 0,
      porcentajeIgv: 12,
      idUsuarioFactura: null,
      idFacturaMostrar: null,
      facturaMostrada: null,
      productosEnCarrito: [],
      detallesFacturaMostrados: [],
      totalSubtotal: 0,
      ultimaFactura: {
        idFactura: 1,
      },
    };
  },
  methods: {
    async iniciarFacturacion() {
      try {
        // Realizar la petición POST a la API
        const response = await fetch('https://localhost:7083/api/Factura', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            NumeroFactura: this.numeroFactura,
            RucCliente: this.rucCliente,
            RazonSocialCliente: this.razonSocialCliente,
            Subtotal: 0,
            PorcentajeIgv: this.porcentajeIgv,
            IdUsuario: this.idUsuarioFactura,
          }),
        });

        if (response.ok) {
          const facturaData = await response.json();
          this.facturaId = facturaData.idFactura;
          this.products = [];
          this.subtotal = 0;
        } else {
          console.error('Error en la petición:', response.statusText);
          const errorData = await response.json().catch(() => null);
          console.error('Detalles del error:', errorData);
        }
      } catch (error) {
        console.error('Error al iniciar la facturación:', error);
      }
    },

    async ultimaFactura1() {
      try {
        const response = await axios.get("https://localhost:7083/api/Factura/ultimaFactura");
        if (response.status === 200) {
          const facturaData = response.data;
          console.log('Respuesta completa:', response);
          console.log('idFactura:', facturaData.item1);
          console.log('idUsuario:', facturaData.item2);
          return [facturaData.item1, facturaData.item2];
        }
        return [-1, -1];
      } catch (error) {
        console.error('Error al obtener la última factura:', error);
        return [-1, -1];
      }
    },

    async ultimoDetalleFacturaId() {
      try {
        const response = await axios.get("https://localhost:7083/api/DetalleFactura/ultimoDetalleFacturaId");
        if (response.status === 200) {
          const detalleFacturaId = response.data;
          console.log('Respuesta completa:', response);
          console.log('Ultimo DetalleFacturaId:', detalleFacturaId);
          return detalleFacturaId;
        }
        return -1;
      } catch (error) {
        console.error('Error al obtener el último DetalleFacturaId:', error);
        return -1;
      }
    },

    async getProduct() {
      try {
        const response = await fetch(`https://localhost:7083/api/Producto/${this.productId}`);
        if (response.ok) {
          const productData = await response.json();
          this.productsToShow = [productData.resultado];
        } else {
          console.error('Error al obtener el producto:', response.statusText);
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    },

    async addItemToFactura() {
      try {
        const [idFactura, idUsuario] = await this.ultimaFactura1();
        const detalleFacturaId = await this.ultimoDetalleFacturaId();

        if (this.productsToShow.length > 0) {
          const productToAdd = this.productsToShow[0];
          const response = await axios.post(`https://localhost:7083/api/DetalleFactura/AddItem/${idFactura}`, {
            idFactura: idFactura,
            idUsuario: idUsuario,
            codigoProducto: productToAdd.codigo,
            nombreProducto: productToAdd.nombre,
            cantidad: productToAdd.cantidad || 1,
          });

          if (response.status === 201) {
            console.log('Producto agregado al carrito correctamente');

            if (detalleFacturaId !== -1) {
              try {
                const detalleFacturaResponse = await axios.get(`https://localhost:7083/api/DetalleFactura/${detalleFacturaId + 1}`);
                const detalleFactura = detalleFacturaResponse.data.resultado;

                const subtotal = detalleFactura.subtotal;
                productToAdd.subtotal = subtotal;

                const idItem = detalleFactura.idItem;
                productToAdd.idItem = idItem;

                this.productosEnCarrito.push(productToAdd);
                this.totalSubtotal += subtotal;

              } catch (error) {
                console.error('Error al obtener el detalle de factura:', error);
              }
            } else {
              console.error('No se pudo encontrar el detalle de factura.');
            }

            this.productsToShow = [];
          } else {
            console.error('Error al agregar el producto al carrito:', response.statusText);
          }
        } else {
          console.error('No hay productos para agregar al carrito.');
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    },

    async eliminarDetalleFactura(idItem, index) {
      try {
        const response = await fetch(`https://localhost:7083/api/DetalleFactura/${idItem}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          console.log('Producto eliminado correctamente del carrito');
          const precioProductoEliminado = this.productosEnCarrito[index].subtotal;
          this.totalSubtotal -= precioProductoEliminado;
          this.productosEnCarrito.splice(index, 1);

          this.$nextTick(() => {
            // No es necesario hacer nada aquí, pero $nextTick asegura que la vista se ha actualizado.
          });
        } else {
          console.error('Error al eliminar el producto del carrito:', response.statusText);
        }
      } catch (error) {
        console.error('Error al eliminar el producto del carrito:', error);
      }
    },

    async generarFactura() {
  try {
    const [idFactura, idUsuario] = await this.ultimaFactura1();
    //const productToPut = this.productsToShow[0];

    const { data: { resultado: factura } } = await axios.get(`https://localhost:7083/api/Factura/${idFactura}`);
    
    //productToPut.numeroFactura = factura.numeroFactura;
    let igv = 0;
    const { data: response } = await axios.put(`https://localhost:7083/api/Factura/${idFactura}`, {
      idFactura,
      numeroFactura: factura.numeroFactura,
      rucCliente: factura.rucCliente,
      razonSocialCliente: factura.razonSocialCliente,
      Subtotal: this.totalSubtotal,
      porcentajeIgv: factura.porcentajeIgv,
      igv: this.subtotal * (factura.porcentajeIgv/100),
      total: this.subtotal + igv, 
      idUsuario,
    });

    if (response.ok) {
      console.log('Factura generada correctamente');
    } else {
      console.error('Error al generar la factura:', response.statusText);
    }
  } catch (error) {
    console.error('Error al generar la factura:', error);
  }
},


    async mostrarFactura() {
      try {
        const response = await fetch(`https://localhost:7083/api/Factura/${this.idFacturaMostrar}`);
        if (response.ok) {
          const facturaData = await response.json();
          this.facturaMostrada = facturaData;
        } else {
          console.error('Error al obtener la factura:', response.statusText);
        }
      } catch (error) {
        console.error('Error al mostrar la factura:', error);
      }
    },
    async mostrarFacturaYDetalles() {
      try {
        // Realiza una petición para obtener la factura por el ID
        const responseFactura = await fetch(`https://localhost:7083/api/Factura/${this.idFacturaMostrar}`);
        const facturaData = await responseFactura.json();
        this.facturaMostrada = facturaData;

// Realiza una petición para obtener los detalles de factura por el ID de la factura
        const responseDetalles = await fetch(`https://localhost:7083/api/DetalleFactura/${this.idFacturaMostrar}`);
        const detallesData = await responseDetalles.json();
        this.detallesFacturaMostrados = detallesData.resultado;

      } catch (error) {
        console.error('Error al mostrar la factura y detalles:', error);
      }
    },

    formatCurrency(value) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    },
  },
};
</script>

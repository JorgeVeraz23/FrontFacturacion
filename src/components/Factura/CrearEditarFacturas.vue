<template>
  <div class="glassmorphism">
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
    <table v-if="productsToShow.length > 0" class="glassmorphism">
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

    <table class="glassmorphism">
      <thead>
        <tr>
          <th>Código</th>
          <th>Nombre</th>
          <th>Cantidad</th>
          <th>Precio/u</th>
          <th>SubTotal</th>
          <th>IdItem</th>
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
        </tr>
      </tbody>
    </table>

    <div class="glassmorphism">
      <p>Total Subtotal: {{ formatCurrency(totalSubtotal) }}</p>
    </div>

    <!-- Sección para generar factura -->
    <div class="glassmorphism">
      <!-- Botón para generar la factura -->
      <button @click="generarFactura">Generar Factura</button>
    </div>

    
    </div>
    <div class="glassmorphism" v-if="facturaMostrada">
      <h2>Factura</h2>
      <div>
        <p>id Factura: {{ facturaMostrada.idFactura }}</p>
        <p>Numero Factura: {{ facturaMostrada.numeroFactura }}</p>
        <p>RUC: {{ facturaMostrada.rucCliente }}</p>
        <p>Razon Social Cliente: {{ facturaMostrada.razonSocialCliente }}</p>
        <p>Total Subtotal: {{ formatCurrency(facturaMostrada.subtotal) }}</p>
        <p>Porcentaje IGV: {{ facturaMostrada.porcentajeIgv }}%</p>
        <p>Total IGV: {{ formatCurrency(facturaMostrada.igv) }}</p>
        <p>Total Factura: {{ formatCurrency(facturaMostrada.total) }}</p>
      </div>
      <div>
        <!--<table>
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
        </tr>
      </thead>
      <tbody>
        <tr v-for="detalle in detallesFacturaMostrada" :key="detalle.idItem">
          <td>{{ detalle.idItem }}</td>
          <td>{{ detalle.idFactura }}</td>
          <td>{{ detalle.idUsuario }}</td>
          <td>{{ detalle.codigoProducto }}</td>
          <td>{{ detalle.nombreProducto }}</td>
          <td>{{ detalle.precio }}</td>
          <td>{{ detalle.cantidad }}</td>
          <td>{{ detalle.subtotal }}</td>
        </tr>
      </tbody>
    </table>-->
      </div>
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
      productsToShow2: [],
      numeroFactura: null,
      rucCliente: '',
      razonSocialCliente: '',
      subtotal: 0,
      porcentajeIgv: 12,
      idUsuarioFactura: null,
      idFacturaMostrar: null,
      facturaMostrada: null,
      facturitas: [],
      productosEnCarrito: [],
      detallesFacturaMostrada: null,
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
      // Actualizar los datos de detallesFacturaMostrada
      await this.obtenerDetallesFactura();
      
    } else {
      console.error('Error al generar la factura:', response.statusText);
      location.reload();
    }
  } catch (error) {
    console.error('Error al generar la factura:', error);
    
  }
},

async obtenerFacturaPorUltimoId() {
  try {
    const [idFactura, idUsuario] = await this.ultimaFactura1();
    console.log(idUsuario);
    const response = await axios.get(`https://localhost:7083/api/Factura/${idFactura}`);

    if (response.status === 200) {
      this.facturaMostrada = response.data.resultado;
      // Si tienes detalles de factura que deseas mostrar, puedes cargarlos aquí
      // Ejemplo: this.detallesFacturaMostrados = await this.obtenerDetallesFactura(idFactura);
    } else {
      console.error('Error al obtener factura:', response.statusText);
    }
  } catch (error) {
    console.error('Error al obtener factura:', error);
  }
},
async obtenerDetallesFactura() {
  try {
    const [idFactura, idUsuario] = await this.ultimaFactura1();
    console.log(idUsuario);
    console.log(idFactura)
    
    const response = await axios.get(`https://localhost:7083/api/DetalleFactura/BuscarPorIdFactura/${77}`)
    if (response.status === 200) {
      this.detallesFacturaMostrada = response.data.resultado;
    } else {
      console.error('Error al obtener detalles de factura:', response.statusText);
      this.detallesFacturaMostrada = [];
    }
  } catch (error) {
    console.error('Error al obtener detalles de factura:', error);
    this.detallesFacturaMostrada = [];
  }
}

,



    formatCurrency(value) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    },
  },
  mounted() {
    console.log('Componente montado');
    this.obtenerFacturaPorUltimoId();
    this.obtenerDetallesFactura();
  }
 
};
</script>
<style scoped>
  .glassmorphism {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-top: 20px;
  }

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  input {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  button {
    padding: 10px 15px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #f0f0f0; /* Gris claro o cualquier otro color */
  color: #333; /* Color de texto para contraste */
  }

  button:hover {
    background-color: #45a049;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #3498dbcc;
    color: white;
    background-color: #f0f0f0; /* Gris claro o cualquier otro color */
  color: #333; /* Color de texto para contraste */
    
  }

  h2, h3 {
    margin-bottom: 10px;
  }

  p {
    margin: 5px 0;
  }

  .glassmorphism button {
    background-color: #f0f0f0; /* Gris claro o cualquier otro color */
  color: #333; /* Color de texto para contraste */
    border: none;
    padding: 5px 10px;
    cursor: pointer;
  }

  .glassmorphism button:hover {
    background-color: #3498db;
  }

  .glassmorphism div > div {
    margin: 10px 0;
  }
</style>

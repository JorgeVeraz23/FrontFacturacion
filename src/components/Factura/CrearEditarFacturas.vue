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

    <!-- Tabla para mostrar productos seleccionados -->
    <table v-if="products.length > 0">
      <!-- Cabecera de la tabla --> 
      <thead>
        <tr>
          <th>#</th>
          <th>ID Producto</th>
          <th>ID Factura</th>
          <th>Código</th>
          <th>Nombre</th>
          <th>ID Familia</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Activo</th>
          <th>Fecha de Creación</th>
          <th>ID Usuario</th>
          <th>Cantidad</th>
          <th>Acción</th>
        </tr>
      </thead>
      <!-- Cuerpo de la tabla -->
      <tbody>
        <tr v-for="(product, index) in products" :key="product.idProducto">
          <td>{{ index + 1 }}</td>
          <td>{{ product.idProducto }}</td>
          <td>{{ ultimaFactura.idFactura }}</td>
          <td>{{ product.codigo }}</td>
          <td>{{ product.nombre }}</td>
          <td>{{ product.idFamilia }}</td>
          <td>{{ product.precio }}</td>
          <td>{{ product.stock }}</td>
          <td>{{ product.activo }}</td>
          <td>{{ product.fechaCreacion }}</td>
          <td>{{ product.idUsuario }}</td>
          <td><span>{{ product.cantidad }}</span></td>
          <td>
            <button @click="eliminarProducto(index)">Eliminar Producto</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Sección para generar factura -->
    <div>
      <!-- Botón para generar la factura -->
      <button @click="generarFactura">Generar Factura</button>
    </div>

    <!-- Sección para mostrar factura -->
    <div>
      <label for="idFacturaMostrar">ID de la Factura a Mostrar:</label>
      <input v-model="idFacturaMostrar" type="number" id="idFacturaMostrar" />

      <!-- Botón para mostrar la factura -->
      <button @click="mostrarFactura">Mostrar Factura</button>
    </div>

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
      ultimaFactura: {
        idFactura: 1,
      }
    };},
  methods: {
    async ultimaFactura1() {
  try {
    // Realizar la petición GET
    const response = await axios.get("https://localhost:7083/api/Factura/ultimaFactura");

    // Verificar el estado de la respuesta
    if (response.status === 200) {
      // Obtener el cuerpo de la respuesta
      const facturaData = response.data;

      // Imprimir la respuesta completa en la consola
      console.log('Respuesta completa:', response);

      // Imprimir los valores obtenidos en la consola
      console.log('idFactura:', facturaData.item1);
      console.log('idUsuario:', facturaData.item2);

      // Devolver los valores
      return [facturaData.item1, facturaData.item2];
    }

    // Devolver un valor predeterminado si la respuesta no es exitosa
    return [-1, -1];
  } catch (error) {
    // Manejar errores de la petición
    console.error('Error al obtener la última factura:', error);

    // Devolver un valor predeterminado en caso de error
    return [-1, -1];
  }
}
,

    async getProduct() {
      try {
        // Realizar la petición GET a la API de productos para obtener detalles
        const response = await fetch(`https://localhost:7083/api/Producto/${this.productId}`);

        // Verificar si la petición fue exitosa
        if (response.ok) {
          // Obtener la respuesta en formato JSON
          const productData = await response.json();

          // Asignar los detalles del producto a productsToShow
          this.productsToShow = [productData.resultado];
        } else {
          // Manejar errores de la petición
          console.error('Error al obtener el producto:', response.statusText);
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    },

    async agregarADetalleFactura() {
      try {
        // Verificar si hay productos para agregar al detalle de factura
        if (this.productsToShow.length > 0) {
          const productToAdd = this.productsToShow[0];

          // Realizar la petición POST a la API de DetalleFactura/AddItem
          const response = await fetch(`https://localhost:7083/api/DetalleFactura/AddItem/${this.facturaId}`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              idFactura: this.facturaId,
              idUsuario: this.idUsuarioFactura,
              codigoProducto: productToAdd.codigo,
              cantidad: productToAdd.cantidad || 1,
            }),
          });

          // Verificar si la petición fue exitosa
          if (response.ok) {
            console.log('Producto agregado al carrito correctamente');

            // Limpiar la lista de productosToShow
            this.productsToShow = [];
          } else {
            // Manejar errores de la petición
            console.error('Error al agregar el producto al carrito:', response.statusText);
          }
        } else {
          console.error('No hay productos para agregar al carrito.');
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    },

    async eliminarProducto(index) {
      try {
        // Obtener el ID del producto a eliminar
        const productIdToDelete = this.products[index].idProducto;

        // Realizar la petición DELETE a la API de DetalleFactura por ID
        const response = await fetch(`https://localhost:7083/api/DetalleFactura/${productIdToDelete}`, {
          method: 'DELETE',
        });

        // Verificar si la petición fue exitosa
        if (response.ok) {
          console.log('Producto eliminado correctamente del carrito');

          // Restar el precio del producto eliminado al subtotal
          this.subtotal -= this.products[index].precio;

          // Eliminar el producto de la lista
          this.products.splice(index, 1);
        } else {
          // Manejar errores de la petición
          console.error('Error al eliminar el producto del carrito:', response.statusText);
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    },

    async generarFactura() {
      try {
        // Calcular el IGV y el total
        const igv = (this.subtotal * this.porcentajeIgv) / 100;
        const total = this.subtotal + igv;

        // Realizar la petición PUT a la API para actualizar la factura
        const response = await fetch(`https://localhost:7083/api/Factura/${this.facturaId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Subtotal: this.subtotal,
            Igv: igv,
            Total: total,
          }),
        });

        // Verificar si la petición fue exitosa
        if (response.ok) {
          console.log('Factura generada correctamente');

          // Formatear montos como moneda
          this.subtotal = this.formatCurrency(this.subtotal);
          this.porcentajeIgv = this.formatCurrency(igv);

          // Asignar los datos de la factura generada a facturaMostrada
          this.facturaMostrada = {
            idFactura: this.facturaId,
            numeroFactura: this.numeroFactura,
            rucCliente: this.rucCliente,
            razonSocialCliente: this.razonSocialCliente,
            subtotal: this.formatCurrency(this.subtotal),
            igv: this.formatCurrency(igv),
            total: this.formatCurrency(total),
          };
        } else {
          // Manejar errores de la petición
          console.error('Error al generar la factura:', response.statusText);
        }
      } catch (error) {
        console.error('Error al generar la factura:', error);
      }
    },

    async mostrarFactura() {
      try {
        // Realizar la petición GET a la API para obtener detalles de la factura por ID
        const response = await fetch(`https://localhost:7083/api/Factura/${this.idFacturaMostrar}`);

        // Verificar si la petición fue exitosa
        if (response.ok) {
          // Obtener la respuesta en formato JSON
          const facturaData = await response.json();

          // Asignar los detalles de la factura a facturaMostrada
          this.facturaMostrada = facturaData;
        } else {
          // Manejar errores de la petición
          console.error('Error al obtener la factura:', response.statusText);
        }
      } catch (error) {
        console.error('Error al mostrar la factura:', error);
      }
    },
    
    async addItemToFactura() {
  try {
    // Obtener los valores primitivos de la última factura
    const [idFactura, idUsuario] = await this.ultimaFactura1();

    // Verificar si hay productos para agregar al detalle de factura
    if (this.productsToShow.length > 0) {
      const productToAdd = this.productsToShow[0];
      console.log('codigoProducto:', productToAdd.codigo);
console.log('cantidad:', productToAdd.cantidad || 1);

      // Realizar la petición POST a la API de DetalleFactura/AddItem
      const response = await axios.post(`https://localhost:7083/api/DetalleFactura/AddItem/${idFactura}`, {
        idFactura: idFactura,
        idUsuario: idUsuario,
        codigoProducto: productToAdd.codigo,
        nombreProducto: productToAdd.nombre,
        cantidad: productToAdd.cantidad || 1,
      });

      // Verificar si la petición fue exitosa
      if (response.status === 201) {
        console.log('Producto agregado al carrito correctamente');

        // Limpiar la lista de productsToShow
        this.productsToShow = [];
      } else {
        // Manejar errores de la petición
        console.error('Error al agregar el producto al carrito:', response.statusText);
      }
    } else {
      console.error('No hay productos para agregar al carrito.');
    }
  } catch (error) {
    console.error('Error de red:', error);
  }
}


   ,



    formatCurrency(value) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    },
  },
};
</script>
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
      ultimaFactura: {
        idFactura: null,
        numeroFactura: null,
        rucCliente: null,
        razonSocialCliente: null,
        subtotal: null,
        igv: null,
        total: null,
      }
    }
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
        Subtotal: this.subtotal,
        PorcentajeIgv: this.porcentajeIgv,
        IdUsuario: this.idUsuarioFactura,
      }),
    });

    // Verificar si la petición fue exitosa
    if (response.ok) {
      // Obtener la respuesta en formato JSON
      const facturaData = await response.json();

      // Asignar el ID de la factura devuelto por la API a la variable facturaId
      this.facturaId = facturaData.idFactura;

      // Resto del código según tus necesidades
      // Puedes realizar otras acciones según la respuesta de la API

    } else {
      // Manejar errores de la petición
      console.error('Error en la petición:', response.statusText);

      // Agregar más información del error si está disponible
      const errorData = await response.json().catch(() => null);
      console.error('Detalles del error:', errorData);
    }
  } catch (error) {
    console.error('Error al iniciar la facturación:', error);
  }
}
,

    async getProduct() {
      try {
        const product = {
          idProducto: this.productId,
          codigo: 'Código Producto',
          nombre: 'Nombre Producto',
          precio: 10,
          stock: 20,
        };

        this.productsToShow = [product];
      } catch (error) {
        console.error('Error de red:', error);
      }
    },

    agregarADetalleFactura() {
      const productToAdd = this.productsToShow[0];
      this.products.push({
        idProducto: productToAdd.idProducto,
        facturaId: this.facturaId,
        codigo: productToAdd.codigo,
        nombre: productToAdd.nombre,
        idFamilia: 'ID Familia Producto',
        precio: productToAdd.precio,
        stock: productToAdd.stock,
        activo: true,
        fechaCreacion: 'Fecha de Creación Producto',
        idUsuario: this.idUsuarioFactura,
        cantidad: productToAdd.cantidad || 1,
      });

      this.subtotal += productToAdd.precio;
    },

    eliminarProducto(index) {
      this.subtotal -= this.products[index].precio;
      this.products.splice(index, 1);
    },

    generarFactura() {
      const igv = (this.subtotal * this.porcentajeIgv) / 100;
      const total = this.subtotal + igv;

      this.subtotal = this.formatCurrency(this.subtotal);
      this.porcentajeIgv = this.formatCurrency(igv);
      this.facturaMostrada = {
        idFactura: this.facturaId,
        numeroFactura: this.numeroFactura,
        rucCliente: this.rucCliente,
        razonSocialCliente: this.razonSocialCliente,
        subtotal: this.formatCurrency(this.subtotal),
        igv: this.formatCurrency(igv),
        total: this.formatCurrency(total),
      };
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

    addItemToFactura(product) {
      this.products.push({
        idProducto: product.idProducto,
        facturaId: this.facturaId,
        codigo: product.codigo,
        nombre: product.nombre,
        idFamilia: 'ID Familia Producto',
        precio: product.precio,
        stock: product.stock,
        activo: true,
        fechaCreacion: 'Fecha de Creación Producto',
        idUsuario: this.idUsuarioFactura,
        cantidad: product.cantidad || 1,
      });

      this.subtotal += product.precio;
    },
    

    formatCurrency(value) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    },
  },
};
</script>
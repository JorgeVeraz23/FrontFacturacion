<template>
  <div>
    <h2>Menú de Acciones</h2>

    <div class="button-container">
      <button v-for="(item, index) in menuItems" :key="index" @click="selectMenuItem(index)">
        {{ item.label }}
      </button>
    </div>

    <div v-if="selectedItem !== null">
      <h3>{{ menuItems[selectedItem].content.title }}</h3>
      <p>{{ menuItems[selectedItem].content.description }}</p>

      <div v-if="selectedItem === 0" class="form-container glassmorphism">
        <!-- Formulario para Crear Producto -->
        <label>Código:</label>
        <input v-model="producto.codigo" type="text" />

        <label>Nombre:</label>
        <input v-model="producto.nombre" type="text" />

        <label>ID Familia:</label>
        <input v-model="producto.idFamilia" type="number" />

        <label>Precio:</label>
        <input v-model="producto.precio" type="number" />

        <label>Stock:</label>
        <input v-model="producto.stock" type="number" />

        <label>Activo:</label>
        <input v-model="producto.activo" type="checkbox" />

        <label>ID Usuario:</label>
        <input v-model="producto.idUsuario" type="number" />

        <button @click="guardarProducto">Guardar Producto</button>
      </div>

      <div v-if="selectedItem === 1" class="form-container glassmorphism">
        <!-- Formulario para Editar Producto -->
        <label>ID Producto a Editar:</label>
        <input v-model="idProductoEditar" type="text" />

        <label>Nombre:</label>
        <input v-model="producto.nombre" type="text" />

        <label>ID Familia:</label>
        <input v-model="producto.idFamilia" type="number" />

        <label>Precio:</label>
        <input v-model="producto.precio" type="number" />

        <label>Stock:</label>
        <input v-model="producto.stock" type="number" />

        <label>Activo:</label>
        <input v-model="producto.activo" type="checkbox" />

        <label>Fecha de Creación:</label>
        <input v-model="producto.fechaCreacion" type="datetime-local" />

        <label>ID Usuario:</label>
        <input v-model="producto.idUsuario" type="number" />

        <button @click="actualizarProducto">Actualizar Producto</button>
      </div>

      <div v-if="selectedItem === 2" class="form-container glassmorphism">
        <!-- Formulario para Eliminar Producto -->
        <label>ID Producto a Eliminar:</label>
        <input v-model="idProductoEliminar" type="text" />

        <button @click="eliminarProducto">Eliminar Producto</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuItems: [
        { label: 'Crear Producto', content: { title: 'Crear Producto', description: 'Formulario para crear un nuevo producto' } },
        { label: 'Editar Producto', content: { title: 'Editar Producto', description: 'Seleccione un producto para editar' } },
        { label: 'Eliminar Producto', content: { title: 'Eliminar Producto', description: 'Seleccione un producto para eliminar' } },
      ],
      selectedItem: null,
      idProductoEliminar: '', // Nueva propiedad para almacenar el ID del producto a eliminar
      idProductoEditar: '',   // Nueva propiedad para almacenar el ID del producto a editar
      producto: {
        codigo: '',
        nombre: '',
        idFamilia: 0,
        precio: 0,
        stock: 0,
        activo: true,
        fechaCreacion: '',  // Asegúrate de inicializar la propiedad fechaCreacion
        idUsuario: 0,
      },
    };
  },
  methods: {
    selectMenuItem(index) {
      this.selectedItem = index;
    },
    guardarProducto() {
      // Aquí debes realizar la llamada a la API para guardar el producto
      // Utiliza this.producto para obtener los datos del producto
      // Puedes usar la función fetch o axios para realizar la llamada a la API
      // Ejemplo usando fetch:
      fetch('https://localhost:7083/api/Producto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.producto),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Producto guardado con éxito', data);
          // Limpiar los inputs después de guardar el producto
          this.producto = {
            codigo: '',
            nombre: '',
            idFamilia: 0,
            precio: 0,
            stock: 0,
            activo: true,
            idUsuario: 0,
          };
        })
        .catch(error => {
          console.error('Error al guardar el producto', error);
        });
    },
    eliminarProducto() {
      // Validar que el ID del producto a eliminar no esté vacío
      if (!this.idProductoEliminar.trim()) {
        console.error('Por favor, ingrese un ID de producto válido.');
        return;
      }

      // Realizar la llamada a la API para eliminar el producto
      fetch(`https://localhost:7083/api/Producto/${this.idProductoEliminar}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (response.ok) {
            console.log('Producto eliminado con éxito');
            // Limpiar el input después de eliminar el producto
            this.idProductoEliminar = '';
          } else {
            console.error('Error al eliminar el producto');
          }
        })
        .catch(error => {
          console.error('Error al comunicarse con la API', error);
        });
    },
    actualizarProducto() {
      // Validar que el ID del producto a editar no esté vacío
      if (!this.idProductoEditar.trim()) {
        console.error('Por favor, ingrese un ID de producto válido.');
        return;
      }

      // Asignar el ID del producto a la propiedad producto
      this.producto.idProducto = parseInt(this.idProductoEditar);

      // Realizar la llamada a la API para actualizar el producto
      fetch(`https://localhost:7083/api/Producto/${this.idProductoEditar}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.producto),
      })
        .then(response => {
          if (response.ok) {
            console.log('Producto actualizado con éxito');
            // Limpiar los inputs después de actualizar el producto
            this.idProductoEditar = '';
            this.producto = {
              codigo: '',
              nombre: '',
              idFamilia: 0,
              precio: 0,
              stock: 0,
              activo: true,
              idUsuario: 0,
            };
          } else {
            console.error('Error al actualizar el producto');
          }
        })
        .catch(error => {
          console.error('Error al comunicarse con la API', error);
        });
    },
  },
};
</script>
<style scoped>
/* Estilos opcionales para el componente */
h2 {
  text-align: center;
}

.button-container {
  text-align: center;
  margin-bottom: 20px;
  display: flex; /* Agrega esta línea para utilizar flexbox */
  justify-content: center; /* Alinea los botones en el centro horizontalmente */
}

button {
  margin-right: 10px;
}

/* Estilos de glassmorfismo para el formulario */
.form-container {
  background: rgba(255, 255, 255, 0.1); /* Fondo con transparencia */
  border: 1px solid rgba(255, 255, 255, 0.2); /* Borde con transparencia */
  border-radius: 8px;
  backdrop-filter: blur(10px); /* Desenfoque */
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  margin-bottom: 10px;
}

button {
  background-color: rgba(52, 152, 219, 0.8); /* Azul claro con transparencia */
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #f0f0f0; /* Gris claro o cualquier otro color */
  color: #333;
}

button:hover {
  background-color: #3498db; /* Cambio de color al pasar el ratón */
}
</style>

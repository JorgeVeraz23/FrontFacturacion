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

      <div v-if="selectedItem === 0">
        <!-- Formulario para Crear Familia de Producto -->
        <div class="form-container">
          <label>Código:</label>
          <input v-model="familiaproducto.codigo" type="text" />

          <label>Nombre:</label>
          <input v-model="familiaproducto.nombre" type="text" />

          <label>Activo:</label>
          <input v-model="familiaproducto.activo" type="checkbox" />

          <label>ID Usuario:</label>
          <input v-model="familiaproducto.idUsuario" type="number" />

          <button @click="guardarFamiliaProducto">Guardar Familia de Producto</button>
        </div>
      </div>

      <div v-if="selectedItem === 1">
        <!-- Formulario para Editar Familia de Producto -->
        <div class="form-container">
          <label>ID Familia de Producto a Editar:</label>
          <input v-model="idFamiliaProductoEditar" type="text" />

          <label>Código:</label>
          <input v-model="familiaproducto.codigo" type="text" />

          <label>Nombre:</label>
          <input v-model="familiaproducto.nombre" type="text" />

          <label>Activo:</label>
          <input v-model="familiaproducto.activo" type="checkbox" />

          <label>Fecha de Creación:</label>
          <input v-model="familiaproducto.fechaCreacion" type="datetime-local" />

          <label>ID Usuario:</label>
          <input v-model="familiaproducto.idUsuario" type="number" />

          <button @click="actualizarFamiliaProducto">Actualizar Familia de Producto</button>
        </div>
      </div>

      <div v-if="selectedItem === 2">
        <!-- Formulario para Eliminar Familia de Producto -->
        <div class="form-container">
          <label>ID Familia de Producto a Eliminar:</label>
          <input v-model="idFamiliaProductoEliminar" type="text" />

          <button @click="eliminarFamiliaProducto">Eliminar Familia de Producto</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuItems: [
        { label: 'Crear Familia de Producto', content: { title: 'Crear Familia Producto', description: 'Formulario para crear una nueva familia de producto' } },
        { label: 'Editar Familia de Producto', content: { title: 'Editar Familia de Producto', description: 'Seleccione una familia de producto para editar' } },
        { label: 'Eliminar Familia de Producto', content: { title: 'Eliminar Familia de Producto', description: 'Seleccione una familia de producto para eliminar' } },
      ],
      selectedItem: null,
      idFamiliaProductoEliminar: '', // Nueva propiedad para almacenar el ID de la familia de producto a eliminar
      idFamiliaProductoEditar: '',   // Nueva propiedad para almacenar el ID de la familia de producto a editar
      familiaproducto: {
        codigo: '',
        nombre: '',
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
    guardarFamiliaProducto() {
      fetch('https://localhost:7083/api/FamiliaProducto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.familiaproducto),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Familia de Producto guardada con éxito', data);
          this.familiaproducto = {
            codigo: '',
            nombre: '',
            activo: true,
            idUsuario: 0,
          };
        })
        .catch(error => {
          console.error('Error al guardar la familia de producto', error);
        });
    },
    eliminarFamiliaProducto() {
      if (!this.idFamiliaProductoEliminar.trim()) {
        console.error('Por favor, ingrese un ID de familia de producto válido.');
        return;
      }
      fetch(`https://localhost:7083/api/FamiliaProducto/${this.idFamiliaProductoEliminar}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (response.ok) {
            console.log('Familia de Producto eliminada con éxito');
            this.idFamiliaProductoEliminar = '';
          } else {
            console.error('Error al eliminar la familia de producto');
          }
        })
        .catch(error => {
          console.error('Error al comunicarse con la API', error);
        });
    },
    actualizarFamiliaProducto() {
      if (!this.idFamiliaProductoEditar.trim()) {
        console.error('Por favor, ingrese un ID de familia de producto válido.');
        return;
      }
      this.familiaproducto.idFamilia = parseInt(this.idFamiliaProductoEditar);

      fetch(`https://localhost:7083/api/FamiliaProducto/${this.idFamiliaProductoEditar}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.familiaproducto),
      })
        .then(response => {
          if (response.ok) {
            console.log('Familia de Producto actualizada con éxito');
            this.idFamiliaProductoEditar = '';
            this.familiaproducto = {
              codigo: '',
              nombre: '',
              activo: true,
              idUsuario: 0,
            };
          } else {
            console.error('Error al actualizar la familia de producto');
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
  cursor: pointer;
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
}

button:hover {
  background-color: #3498db; /* Cambio de color al pasar el ratón */
}
</style>
<!-- Menu.vue -->
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
      producto: {
        codigo: '',
        nombre: '',
        idFamilia: 0,
        precio: 0,
        stock: 0,
        activo: true,
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

/* Agrega estilos para los inputs y el botón del formulario */
label {
  display: block;
  margin-bottom: 5px;
}

input {
  margin-bottom: 10px;
}

</style>

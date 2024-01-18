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
    };
  },
  methods: {
    selectMenuItem(index) {
      this.selectedItem = index;
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
}

button {
  margin-right: 10px;
  cursor: pointer;
}
</style>

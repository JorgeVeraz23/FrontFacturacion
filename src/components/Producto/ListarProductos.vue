<template>
  <div>
    <h1>Listar Productos</h1>
    <ul>
      <li v-for="producto in productos" :key="producto.id">
        <a :href="producto.url">Producto #{{ producto.id }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ListarProductos',
  data() {
    return {
      productos: [],
    };
  },
  mounted() {
    this.getProductos();
  },
  methods: {
    getProductos() {
      // Obtener los productos de una API o de una base de datos
      this.productos = [
        {
          id: 1,
          nombre: "Producto 1",
          precio: 100,
          familia: "Electrónica",
        },
        {
          id: 2,
          nombre: "Producto 2",
          precio: 200,
          familia: "Moda",
        },
        {
          id: 3,
          nombre: "Producto 3",
          precio: 300,
          familia: "Deportes",
        },
      ];
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 1rem;
}

a {
  text-decoration: none;
  color: #000;
}
</style>

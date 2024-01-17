<template>
  <div>
    <h1>List of Invoices</h1>
    <ul>
      <li v-for="invoice in invoices" :key="invoice.id">
        <a :href="invoice.url">Invoice #{{ invoice.id }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      invoices: [
        {
          id: 1,
          url: "/invoices/1",
          title: "Invoice 1",
          amount: 100.00,
        },
        {
          id: 2,
          url: "/invoices/2",
          title: "Invoice 2",
          amount: 200.00,
        },
      ],
    };
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
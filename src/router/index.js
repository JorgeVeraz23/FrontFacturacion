// router/index.js
import { createRouter, createWebHistory } from 'vue-router';

import InicioSesion from '@/views/InicioSesion.vue';
import MenuPrincipal from '@/views/MenuPrincipal.vue';
import CrearEditarFactura from '@/components/Factura/CrearEditarFacturas.vue';
import ListarFacturas from '@/components/Factura/ListarFacturas.vue';

import ListarFamiliasProductos from '@/components/FamiliaProductos/ListarFamiliasProductos.vue';
import CrearEditarFamiliaProducto from '@/components/FamiliaProductos/CrearEditarFamiliaProducto.vue';

import ListarProductos from '@/components/Producto/ListarProductos.vue';
import CrearEditarProducto from '@/components/Producto/CrearEditarProducto.vue';

const routes = [
  { path: '/', component: InicioSesion },
  {
    path: '/menu-principal',
    component: MenuPrincipal,
    children: [
      { path: 'listar-familias-productos', component: ListarFamiliasProductos },
      { path: 'crear-editar-familia-producto', component: CrearEditarFamiliaProducto },
      { path: 'listar-productos', component: ListarProductos },
      { path: 'crear-editar-producto', component: CrearEditarProducto },
      { path: 'crear-editar-factura', component: CrearEditarFactura },
      { path: 'listar-facturas', component: ListarFacturas },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

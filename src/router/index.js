import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store/index.js'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/Bodas',
    name: 'Bodas',
    component:  () => import( '../views/Bodas/Bodas.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    component:  () => import( '../views/Login.vue')
  },
  {
    path: '/BodaEva',
    name: 'BodaEva',
    component:  () => import( '../views/Bodas/BodaEva.vue')
  },
  {
    path: '/Usuarios',
    name: 'List',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( '../views/Usuarios/List.vue')
  },

  {
    path: '/Contacto',
    name: 'Contacto',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Usuarios/Contacto.vue')
  },
  {
    path: '/Testimonios',
    name: 'Testimonios',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Testimonios/ListTestimonios.vue')
  },
  {
    path: '/AddPresets',
    name: 'AddPresets',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Presets/AddPresets.vue')
  },
  {
    path: '/ListPresets',
    name: 'ListPresets',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Presets/ListPresets.vue')
  },
  {
    path: '/ListOrders',
    name: 'ListOrders',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Orders/ListOrders.vue')
  },
  {
    path: '/ListEventos',
    name: 'ListEventos',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Eventos/ListEventos.vue')
  },
  {
    path: '/AddEventos',
    name: 'AddEventos',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Eventos/AddEventos.vue')
  },
  {
    path: '/AddReservas',
    name: 'AddReservas',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Eventos/AddReservas.vue')
  },
  {
    path: '/ListReservas',
    name: 'ListReservas',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Eventos/ListReservas.vue')
  },
  
]

const router = new VueRouter({
  routes
})

export default router

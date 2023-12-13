
<template>
  <v-app>
    <v-app class="”head”">
      <!--header---->
      <Header>
      </Header>
      <!--Vistas-->
      <Vistas>
      </Vistas>
    </v-app>
    <!--footer-->
    <Footer>
    </Footer>
  </v-app>
</template>

<script>
import Header from '@/components/Especificas/Header.vue';
import Footer from './components/Especificas/Footer.vue';
import Vistas from './components/Especificas/Vistas.vue';
import store from "@/store";
export default {
  created() {
    store.dispatch("fetchUsuarios")
    store.dispatch("fetchPresets")
    store.dispatch("fetchOrders")
    store.dispatch("fetchPagos")
    store.dispatch("fetchEventos")
    store.dispatch("fetchReservas")
  
    this.$store.dispatch('initializeStore');
  },


  components: {
    Header,
    Footer,
    Vistas
},
};
</script>


   
<template>
  <div>
    <nav class="menu-navegacion contenedor">
      <div class="enlaces">
        <li><router-link to="/" class="enlace-negro">INICIO</router-link></li>

        <!-- Desplegable para Bodas y Comuniones -->
        <li class="desplegable">
          <span>GALERIA</span>
          <ul class="submenu">
            <li><router-link to="/bodas" class="enlace-negro">BODAS</router-link></li>
            <li><router-link to="/comuniones" class="enlace-negro">COMUNIONES</router-link></li>
          </ul>
        </li>
        <!-- Fin del Desplegable -->

        <li><router-link to="/testimonios" class="enlace-negro"> TESTIMONIOS</router-link></li>
        

        <li><router-link to="/ListPresets" class="enlace-negro">PRESETS</router-link></li>
          <li class="imagen-en-medio">
          <img src="@/assets/image.png" alt="Flor" class="flor-icono-medio" />
        </li>
        <li><router-link to="/ListEventos" class="enlace-negro">CAMPAÑAS</router-link></li>

        <li><router-link to="/contacto" class="enlace-negro">CONTACTO</router-link></li>
        <li><router-link  v-if="$store.state.role==='admin'" to="/usuarios" class="enlace-negro">USUARIOS</router-link></li>
       <li><router-link v-if="$store.state.role==='admin'" to="/ListReservas" class="enlace-negro">RESERVAS</router-link></li>
       
        <li><router-link to="/Login" class="enlace-negro">LOGIN </router-link></li>
        
        <li><span class="separador"></span></li>
        <li> <button @click="logout">LOGOUT</button></li>

        <li>
         
          <router-link to="/ListOrders" class="carrito-link enlace-negro" @click="redirectToOrders">
            <div class="carrito-icono">
              <v-icon>mdi-cart</v-icon>
            </div>
          </router-link>
        </li>
        
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    redirectToOrders() {
      this.$router.push({ name: 'ListOrders' });
    },
    logout() {
      // Llama a la acción de Vuex para cerrar sesión
      this.$store.dispatch('logout');

      // Redirige a la página de inicio de sesión u otra página deseada
      this.$router.push('/login'); // Ajusta la ruta según tu configuración
    },
  },
};
</script>

<style scoped>
 .separador {
    margin-left: 20px; /* Ajusta la cantidad de espacio según tus preferencias */
  }
  .contenedor {
    width: 90%;
    max-width: 1100px;
    margin: auto;
    overflow: hidden;
    padding: var(--paddingSecciones);
  }

  .menu-navegacion {
    z-index: 9999;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150px;
    left: -40px;
  }

  .enlaces li {
    list-style: none;
    display: inline-block;
  }

  .enlace-negro,
  .submenu a.enlace-negro {
    color: black; /* Color negro para los enlaces */
    text-decoration: none;
    margin-left: 20px;
  }

  .enlace-negro:hover,
  .submenu a.enlace-negro:hover {
    color: maroon; /* Cambiar a color granate al pasar el ratón sobre el enlace */
    text-decoration: underline;
  }

  .desplegable {
    list-style: none;
    display: inline-block;
    position: relative;
  }

  .desplegable span {
    color: var(--colorFondo);
    text-decoration: none;
    margin-left: 20px;
    cursor: pointer;
  }

  .submenu {
    position: fixed;
    display: none;
    background-color: var(--colorFondo);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    padding: 10px;
    z-index: 9999;
  }

  .desplegable:hover .submenu {
    display: block;
  }

  .submenu li {
    list-style: none;
    margin: 10px 0;
  }

  .submenu a {
    color: var(--colorFondo);
    text-decoration: none;
  }

  .submenu a:hover {
    text-decoration: underline;
  }

  .carrito-icono {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .carrito-link {
    display: inline-block;
    margin-left: 20px;
  }
  .flor-icono-medio {
    width: 90px; /* Ajusta el tamaño según tus preferencias */
    height: auto; /* Mantén la proporción original de la imagen */
    margin: 20px;
  }
  .header-fijo {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: white; /* Cambia el color de fondo según tus preferencias */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Agrega sombra si lo deseas */
  z-index: 1000;
}

</style>

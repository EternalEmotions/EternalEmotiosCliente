<template>
    <div>
      <div style="background-color: pink;">
       <h1 style="text-align:center">
        {{ $t("header.search.caption5") }}
      </h1> 
      </div>
  

    <v-sheet width="400" class="mx-auto">
     <!--<router-link  v-if="$store.state.role==='Usuarios'" to="/Usuarios" id="bUsuarios">
            <v-btn variant="success" color="pink">{{ $t("header.search.button4") }}</v-btn>
          </router-link>--> 

      <!-- Params especificar un parámetro de método que toma un número variable de argumentos-->
      <h1 style="color: brown;">Detalles del usuario {{ $route.params.id }}</h1>
      <v-img
                    src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                    height="200px"
                    cover
                  ></v-img>
        
        <v-list-group v-if="selectedUsuarios" >
          <v-list-item><td>Name={{ selectedUsuarios.name }}</td></v-list-item>
          <v-list-item><td>Apellido={{ selectedUsuarios.apellido }}</td></v-list-item>
          <v-list-item><td>grado={{ selectedUsuarios.email }}</td></v-list-item>
          <v-list-item><td>genero={{ selectedUsuarios.descripcion }}</td></v-list-item>
          
        </v-list-group>
    </v-sheet>
    </div>
  </template>
  
  <script>
  
  import { mapState } from "vuex";
  export default {

    computed: {
      ...mapState(["Usuarios"]),
      selectedUsuarios() {
        return this.Usuarios.filter((Usuarios) => Usuarios.id === this.id)[0];
      },
    },
    created() {
      this.id = parseInt(this.$route.params.id, 10);
    },
    data() {
      return {
        id: 0,
      };
    },
  };
  </script>
  
  <style>
  #bUsuarios{
     
  display: block;
  padding: 0.5rem 1rem;
  width: 200px;
  margin: 0 auto;
  }
  </style>
  
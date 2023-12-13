<template>
    <div id="app" class="app-container">
      <v-app id="inspire">
        <v-container>
          <!-- Carrusel -->
          <v-carousel>
            <v-carousel-item v-for="(item, i) in newTestimonio.items" :key="i" :src="item.src">
              <!-- Contenedor para la imagen y el botón "Me gusta" -->
            </v-carousel-item>
          </v-carousel>
  
          <!-- Texto adicional -->
          <v-card class="additional-text">
            <v-card-text>
              <p style= "font-size: 2em;font-family: 'Tangerine', cursive">
                Hola a tod@s! Todas las opiniones que tenéis escritas aquí debajo .Podeis añadirlas. Agradecer
                infinitamente a todas las parejas que nos dejan su más sincera opinión. Os queremos!
              </p>
            </v-card-text>
          </v-card>
  
          <!-- Margen entre el texto y el formulario para agregar testimonios -->
          <div class="margin-between-add"></div>
  
          <!-- Formulario para agregar testimonios -->
          <v-card  class="custom-card">
            <v-form @submit.prevent="onAddTestimonios">
              <v-text-field  style= "font-size: 3em;font-family: 'Tangerine', cursive" class="custom-name" v-model="newTestimonio.name" label="Nombre" dense></v-text-field>
              <v-text-field style= "font-size: 3em;font-family: 'Tangerine', cursive"
                class="custom-description"
                v-model="newTestimonio.descripcion"
                label="Descripción"
                multi-line
                rows="3"
                dense
                maxlength="400" 

              ></v-text-field>
              <v-btn  type="submit" dark :style="{ 'background-color': '#800000', 'color': 'white' }">
                Agregar Testimonio
              </v-btn>
            </v-form>
          </v-card>
  
          <!-- Margen entre el formulario para agregar testimonios y el formulario para buscar por fecha -->
          <div class="margin-between"></div>
  
          <!-- Formulario para buscar por fecha -->
          <v-card v-if="$store.state.role === 'admin'" class="custom-card">
            <v-form @submit.prevent="launchQuery">
              <v-text-field  class="custom-date" v-model="datePost" label="Buscar por fecha" dense></v-text-field>
              <v-btn  type="submit" icon>
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </v-form>
          </v-card>
  
          <!-- Lista de testimonios existentes -->
          <v-timeline>
            <v-timeline-item v-for="item in Testimonios" :key="item.id" color="red lighten-2" large>
              <template v-slot:opposite>
                <v-btn v-if="$store.state.role==='admin'" @click="onDeleteTestimonios(item.id)" icon>
  <v-icon color="red">mdi-delete</v-icon>
</v-btn>
              </template>
              <v-card class="elevation-2">
                <v-card-title style= "font-size: 2em;font-family: 'Tangerine', cursive" class="custom-name">{{ item.name }}</v-card-title>
                <v-card-text class="custom-description-container">
                  <div style= "font-size: 1.5em;font-family: 'Tangerine', cursive" class="custom-description">{{ item.descripcion }}</div>
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-container>
      </v-app>
    </div>
  </template>
  
  <script>
  import { mapActions, mapState } from "vuex";
  import { BCarousel } from "bootstrap-vue";
  
  export default {
  components: {
    BCarousel,
  },
  data() {
    return {
      newTestimonio: {
        name: "",
        descripcion: "",
        items: [
          {
            src: require("@/assets/20.jpg"),
          },
        ],
      },
      datePost: "", // Agrega esta línea para declarar datePost en data
    };
  },
  computed: {
    ...mapState(["Testimonios"]),
  },
  created() {
    this.fetchTestimonios();
  },
  methods: {
    ...mapActions({
      deleteTestimonios: "deleteTestimonios",
      fetchTestimonios: "fetchTestimonios",
      addTestimonios: "addTestimonios",
      searchTestimonios: "searchTestimonios",
    }),

  
      onDeleteTestimonios(id) {
        this.deleteTestimonios(id);
      },
  
      onAddTestimonios() {
        this.addTestimonios(this.newTestimonio);
        // Limpiar el formulario después de agregar
        this.newTestimonio = { name: "", descripcion: "", items: [] };
      },
  
      launchQuery() {
        if (this.datePost) {
          this.searchTestimonios(this.datePost);
          return;
        }
        this.fetchTestimonios();
      },
    },
  };
  </script>
  
  <style scoped>
  .app-container {
    margin: 0 200px;
  }
  
  .custom-name,
  .custom-description {
    font-family: "Parisienne", cursive;
  }
  
  .custom-card {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .additional-text {
    margin-top: 20px;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
  }
  
  .margin-between-add {
    margin-bottom: 20px;
  }
  
  .margin-between {
    margin-bottom: 40px; /* Ajusta el margen según tus preferencias */
  }
  
  .additional-text p {
    font-size: 18px;
    font-weight: bold;
  }
  
  .custom-description-container {
    display: flex;
    justify-content: space-between;
  }
  
  .custom-description {
    font-size: 18px;
  }
  @import url('https://fonts.googleapis.com/css2?family=Tangerine:wght@700&display=swap');

  </style>
  
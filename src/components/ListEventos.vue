<template>
    <v-container>
      <!-- Enlace para ir a la página de agregar eventos -->
      <router-link v-if="$store.state.role==='admin'" to="/AddEventos" class="boton-agregar-evento">Añadir campaña</router-link>
      <p style="font-weight: bold; font-size: 3em; font-family: 'Tangerine', cursive;">Reserva tu fecha especial:</p>
    <p style= "font-size: 1.5em;font-family: 'Tangerine', cursive">Ahora, ¡puedes asegurar tu sesión perfecta! Ofrecemos la opción de reserva de fechas para que puedas planificar con anticipación y garantizar que capturemos esos momentos preciosos en el tiempo que más te convenga.</p>
    <p style= "font-size: 1.5em;font-family: 'Tangerine', cursive">Contáctanos hoy mismo para conocer más detalles, discutir tus ideas y reservar tu sesión. Estamos ansiosos por ser parte de tu historia visual</p>

      <!-- Lista de Eventos -->
      <v-row>
        <v-col v-for="evento in Eventos" :key="evento.id" cols="12" md="4">
          <div class="evento-link">
            <!-- Utiliza router-link para redirigir a ListReservas al hacer clic en el evento -->
            <v-card class="evento-card">
                <div :class="[getBackgroundClassEvento(evento.id), 'zoomable-container']">
                <v-img class="white--text align-end" height="200px" :src="evento.imageUrl">
                  <v-card-title class="gold-text font-weight-bold"></v-card-title>
                </v-img>
              </div>              
              <v-card-title style= "font-size: 1.5em;font-family: 'Tangerine', cursive" class="evento-title">{{ evento.título }}</v-card-title>
              <v-card-subtitle class="evento-subtitle">{{ evento.precio }} €</v-card-subtitle>
              <v-card-text style= "font-size: 1.5em;font-family: 'Tangerine', cursive" class="evento-description">{{ evento.descripción }}</v-card-text>
  
              <!-- Agrega más detalles según tus necesidades -->
  
              <!-- Botón Reservar -->
              <v-btn @click="onReservar(evento.id)" color="maroon" dark>
                Reservar
              </v-btn>
  
              <!-- Botón Eliminar -->
              <v-btn v-if="$store.state.role==='admin'" @click="onDeleteEventos(evento.id)" icon color="red darken-4">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
                <!-- Formulario/modal de edición -->
                <v-btn v-if="$store.state.role==='admin'" @click="onEditEvento(evento)" icon>
    <v-icon color="blue">mdi-pencil</v-icon>
  </v-btn>

            </v-card>
            <v-dialog v-model="showEditModal">
  <v-card>
    <v-card-title>Editar Evento</v-card-title>
    <v-card-text>
      <v-text-field v-if="editingEvento" v-model="editingEvento.título" label="Titulo"></v-text-field>
      <v-text-field v-if="editingEvento" v-model="editingEvento.precio" label="Precio"></v-text-field>
      <v-text-field v-if="editingEvento" v-model="editingEvento.descripción" label=" Descripcion"></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="saveEditedEvento">Guardar</v-btn>
      <v-btn @click="cancelEdit">Cancelar</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
          </div>
        </v-col>
      </v-row>
      
    </v-container>
  </template>
  
  <script>
  import { mapState, mapActions } from 'vuex';
  
  export default {
    data: () => ({

  editingEvento: {}, // Inicializado como un objeto vacío
  showEditModal: false,
  }),
    computed: {
      ...mapState(['Eventos']),
    },
    methods: {
      ...mapActions(['fetchEventos', 'deleteEventos',"updateEventos"]),

      getBackgroundClassEvento(eventoId) {
      return `evento-background-${eventoId}`;
    },

      onDeleteEventos(id) {
        this.deleteEventos(id)
          .catch(error => {
            console.error("Error deleting eventos:", error);
          });
      },
      onReservar(eventoId) {
        // Add logic to handle reservation and redirection to ListReservas
        // For example, navigate to "/ListReservas" after making the reservation
        this.$router.push('/AddReservas');
      },



      onEditEvento(evento) {
    // Puedes almacenar el usuario que se está editando en el estado del componente
    this.editingEvento = evento;
    // Abre un formulario/modal de edición
    this.showEditModal = true;
  },
  saveEditedEvento() {
    // Realiza la llamada a la acción de Vuex para actualizar el usuario
    this.$store.dispatch('updateEventos', this.editingEvento);
    // Cierra el formulario/modal de edición
    this.showEditModal = false;
  },
  cancelEdit() {
    // Restablece el estado del usuario en edición y cierra el formulario/modal
    this.editingEvento = null;
    this.showEditModal = false;
  },
    },
  };
  </script>
  
  <style scoped>
  .boton-agregar-evento {
    display: inline-block;
    padding: 10px 20px;
    background-color: maroon;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-size: 1rem;
    transition: background-color 0.3s ease-in-out;
  }
  
  .boton-agregar-evento:hover {
    background-color: #800000; /* Cambia el color al hacer hover según tus preferencias */
  }
  .v-btn.maroon {
  background-color: maroon;
  color: white;
}
  .evento-card {
    margin-bottom: 20px;
    transition: transform 0.3s ease-in-out;
  }
  
  .evento-card:hover {
    transform: scale(1.05);
  }
  
  .evento-img {
    height: 200px; /* Ajusta la altura según tus necesidades */
    object-fit: cover; /* Ajusta el modo de ajuste de la imagen */
  }
  
  .evento-title {
    font-size: 1.2rem;
    color: #333;
  }
  
  .evento-subtitle {
    font-size: 1rem;
    color: #666;
  }
  
  .evento-description {
    font-size: 0.9rem;
    color: #999;
  }
  
  .evento-link {
    text-decoration: none;
    color: inherit;
  }
  
  .evento-link:hover {
    text-decoration: none;
    color: inherit;
  }
  @import "@/assetsEventos/styles.css";
  @import url('https://fonts.googleapis.com/css2?family=Tangerine:wght@700&display=swap');


  </style>
  
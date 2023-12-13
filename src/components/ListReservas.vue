<template>
  <v-container fluid>
    <v-list>
      <v-list-item-group v-if="Reservas.length > 0">
        <v-list-item
          v-for="(reserva, index) in Reservas"
          :key="index"
        >
          <v-list-item-content>
            <v-list-item-title>{{ reserva.fecha }} - {{ reserva.hora }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ reserva.evento.título }}  - Precio: {{ reserva.evento.precio }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn @click="onEditReservas(reserva)" icon class="edit-button">
              <v-icon color="blue">mdi-pencil</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
      <v-list-item v-else>
        <v-list-item-content>No hay reservas disponibles.</v-list-item-content>
      </v-list-item>
    </v-list>

    <!-- Formulario/modal de edición -->
    <v-dialog v-model="showEditModal">
      <v-card>
        <v-card-title>Editar Reservas</v-card-title>
        <v-card-text>
          <v-text-field v-if="editingReservas" v-model="editingReservas.fecha" label="Fecha"></v-text-field>
          <v-text-field v-if="editingReservas" v-model="editingReservas.hora" label="Hora"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="saveEditReservas" outlined>Guardar</v-btn>
          <v-btn @click="cancelEdit">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      editingReservas: {}, // Inicializado como un objeto vacío
      showEditModal: false,
    };
  },
  computed: {
    ...mapState(["Reservas"]),
  },
  methods: {
    ...mapActions(["fetchReservas", "updateReservas"]),


   




    onEditReservas(reserva) {
      this.editingReservas = { ...reserva }; // Copia de la reserva para evitar mutaciones directas
      this.showEditModal = true;
    },

    saveEditReservas() {
    this.$store.dispatch('updateReservas', this.editingReservas)
      .then(() => {
 return this.fetchReservas();   
      }) 
       .then(() => {
            this.showEditModal = false;
           
          });
    
  },
 
    cancelEdit() {
      this.editingReservas = {};
      this.showEditModal = false;
    },
  },
  created() {
    this.fetchReservas();
  },
};
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí */
</style>

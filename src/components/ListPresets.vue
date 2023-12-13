<template>
  <v-container fluid class="fill-height background-container">
    <v-row>
      <v-col v-if="$store.state.role==='admin'" cols="12">
        <router-link to="/AddPresets">
          <v-btn class="add-presets-button" variant="success" color="#800000" text-color="#ffffff">
            Añadir Presets
          </v-btn>
        </router-link>
      </v-col>
      <v-col cols="12">
        <div class="dropdown-container">
          <v-menu offset-y v-model="sortByDropdown">
            <template v-slot:activator="{ on }">
              <v-btn class="dropdown-button" v-on="on">Filtrar por  <v-icon>mdi-menu-down</v-icon></v-btn>
            </template>
            <v-list>
              <v-list-item @click="sortByPrice('asc')">Ascendente</v-list-item>
              <v-list-item @click="sortByPrice('desc')">Descendente</v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-col>
    </v-row>

    <v-row v-for="preset in Presets" :key="preset.id">
      <v-col cols="12">
        <v-row>
          <!-- Imagen en el lado izquierdo -->
          <v-col cols="6">
            <v-card class="mx-auto" max-width="400">
              <div :class="[getBackgroundClass(preset.id), 'zoomable-container']" @click="buyPreset(preset)">
                <v-img class="white--text align-end" height="200px" :src="preset.imageUrl">
                  <v-card-title class="gold-text font-weight-bold"></v-card-title>
                </v-img>
              </div>
            </v-card>
          </v-col>

          <!-- Título, Descripción, Precio y Botón en el lado derecho -->
          <v-col cols="6">
            <div class="preset-description">
              <v-card-subtitle class="pb-2">
                <span style= "font-size: 3em;font-family: 'Tangerine', cursive" class="preset-title gold-text font-weight-bold">{{ preset.titulo }}</span>
              </v-card-subtitle>
              <v-card-subtitle style= "font-size: 1.5em;font-family: 'Tangerine', cursive" class="pb-2">{{ preset.descripcion }}</v-card-subtitle>
              <v-card-text class="text--primary" style="font-size: 18px; margin-bottom: 10px;">
                <div style= "font-size: 1.5em;font-family: 'Tangerine', cursive" >Precio: {{ preset.precio }} €</div>
              </v-card-text>
              <v-card-actions class="justify-end">
  <v-btn v-if="$store.state.role==='admin'" @click="onDeletePreset(preset.id)" icon color="red darken-4">
    <v-icon>mdi-delete</v-icon>
  </v-btn>
  <v-btn v-if="$store.state.role==='admin'" @click="onEditPreset(preset)" icon color="orange">
    <v-icon>mdi-pencil</v-icon>
  </v-btn>
  <v-btn  @click="buyPreset(preset)" color="#800000" text-color="white" large>
    Comprar
  </v-btn>
</v-card-actions>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Formulario/modal para editar -->
    <v-dialog v-model="showEditModal" max-width="600">
      <v-card>
        <v-card-title class="headline">Editar Preset</v-card-title>
        <v-card-text>
          <v-form ref="editForm" v-model="valid" lazy-validation>
            <v-text-field v-model="editingPreset.titulo" label="Nombre" required></v-text-field>
            <v-text-field v-model="editingPreset.descripcion" label="Descripción" required></v-text-field>
            <v-text-field v-model="editingPreset.precio" label="Precio" required></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="cancelEdit">Cancelar</v-btn>
          <v-btn @click="saveEditedPreset" :disabled="!valid">Guardar</v-btn>
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
      sortByDropdown: false,
      editingPreset: {}, // Inicializado como un objeto vacío
      showEditModal: false,
      valid: true,
    };
  },

  computed: {
    ...mapState(["Presets"]),
   
  },

  created() {
    this.fetchPresets();
  },

  methods: {
    ...mapActions(["deletePresets", "fetchPresets", "addOrders", "presetPrecioDesc", "presetPrecioAsc", "updatePreset"]),

    onEditPreset(preset) {
      this.editingPreset = { ...preset }; // Clonar para evitar modificar el original directamente
      this.showEditModal = true;
    },

    saveEditedPreset() {
  // Realiza la llamada a la acción de Vuex para actualizar el preset
  this.$store.dispatch('updatePreset', this.editingPreset)
    .then(() => {
      // Después de actualizar el preset, vuelve a cargar la lista de presets
      console.log('Preset actualizado. Llamando a fetchPresets...');
      return this.fetchPresets();
    })
    .then(() => {
      // Cierra el formulario/modal de edición
      this.showEditModal = false;
    })
    .catch(error => {
      console.error("Error al actualizar el preset:", error);
    });
},

    cancelEdit() {
      // Restablece el estado del preset en edición y cierra el formulario/modal
      this.editingPreset = {};
      this.showEditModal = false;
    },

    onDeletePreset(id) {
  this.deletePresets(id)
    .catch(error => {
      console.error("Error deleting preset:", error);
    });
  },

    getBackgroundClass(presetId) {
      return `preset-background-${presetId}`;
    },

    buyPreset(preset) {
      this.addOrders({ presetId: preset.id })
        .then(() => {
          this.$router.push({ name: 'ListOrders' });
          setTimeout(() => {
            window.location.reload();
          }, 0);
        })
        .catch(error => {
          console.error("Error al realizar la compra:", error);
        });
    },

    sortByPrice(order) {
      if (order === 'asc') {
        this.presetPrecioAsc();
      } else if (order === 'desc') {
        this.presetPrecioDesc();
      }
    },
  },
};
</script>

<style scoped>


.fill-height {
  min-height: 100vh;
  
}

.gold-text {
  color: #D8B16B;
}

.preset-title {
  font-weight: bold;
  font-size: 24px;
}

.add-presets-button.v-btn,
.dropdown-button.v-btn {
  background-color: #800000 !important;
  color: #ffffff !important;
}

.dropdown-container {
  text-align: right;
  margin-right: 20px;
}

/* Define la regla CSS para la clase zoomable-container */
.zoomable-container {
  overflow: hidden;
}

/* Define la regla CSS para la clase zoomable-container:hover */
.zoomable-container:hover {
  transform: scale(1.2);
  transform-origin: 100% 0%;
}

@import "@/assets/styles.css";
@import url('https://fonts.googleapis.com/css2?family=Tangerine:wght@700&display=swap');

</style>

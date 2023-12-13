<template>
  <v-container fluid>
    <div>
      <!-- Campo de búsqueda por nombre -->
      <v-row>
        <v-col>
          <v-text-field v-model="name" label="Buscar por nombre" />
        </v-col>
   
      </v-row>

      <!-- Desplegable para filtrar -->
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" class="custom-text-color" variant="success" color="#800000">
            Filtrar por
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="usuariosNoSocios">
            <v-list-item-title>No Socios</v-list-item-title>
          </v-list-item>
          <v-list-item @click="usuariosSocios">
            <v-list-item-title>Socios</v-list-item-title>
          </v-list-item>
          <v-list-item @click="launchQuery">
            <v-list-item-title>Restablecer</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <table class="user-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Email</th>
            <th>Descripción</th>
            <th>Estado Socio</th>
            <th>Fecha Inscripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id" class="user-row">
            
            <td>{{ user.name }}</td>
            <td>{{ user.apellidos }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.descripcion }}</td>
            <td>{{ user.esSocio ? 'Socio' : 'No Socio' }}</td>
            <td>{{ formatDate(user.dateInscription) }}</td>
          <td>
              
              <v-btn @click="onDeleteUsuariosById(user.id)" icon>
                <v-icon color="red">mdi-delete</v-icon>
              </v-btn>
  <v-btn @click="onEditUser(user)" icon>
    <v-icon color="blue">mdi-pencil</v-icon>
  </v-btn>
            </td>
          </tr>
        </tbody>
        
      </table>
    <!-- Formulario/modal de edición -->
<v-dialog v-model="showEditModal">
  <v-card>
    <v-card-title>Editar Usuario</v-card-title>
    <v-card-text>
      <v-text-field v-if="editingUser" v-model="editingUser.name" label="Nombre"></v-text-field>
      <v-text-field v-if="editingUser" v-model="editingUser.apellidos" label="Apellidos"></v-text-field>
      <v-checkbox v-if="editingUser" v-model="editingUser.esSocio" label="Es Socio"></v-checkbox>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="saveEditedUser">Guardar</v-btn>
      <v-btn @click="cancelEdit">Cancelar</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>

    </div>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data: () => ({
    name: "",
  esSocio: false,
  editingUser: {}, // Inicializado como un objeto vacío
  showEditModal: false,
  }),
  computed: {
    ...mapState(["Usuarios"]),
    filteredUsers() {
  const searchTerm = this.name.toLowerCase();
  return this.Usuarios.filter((user) => {
    const lowerCaseName = user.name ? user.name.toLowerCase() : '';
    const lowerCaseApellidos = user.apellidos ? user.apellidos.toLowerCase() : '';
    const lowerCaseEmail = user.email ? user.email.toLowerCase() : '';

    return (
      lowerCaseName.includes(searchTerm) ||
      lowerCaseApellidos.includes(searchTerm) ||
      lowerCaseEmail.includes(searchTerm)
    );
  });
},
  },
  methods: {
    ...mapActions(["deleteUsuarios", "fetchUsuarios", "usuariosSocios", "usuariosSociosFalse", "fetchUsuariosName","updateUsuarios"]),
    
    
    
    formatDate(dateString) {
      // Formatear la fecha en el formato día/mes/año
      const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },

    
    onEditUser(user) {
    // Puedes almacenar el usuario que se está editando en el estado del componente
    this.editingUser = user;
    // Abre un formulario/modal de edición
    this.showEditModal = true;
  },
  saveEditedUser() {
    // Realiza la llamada a la acción de Vuex para actualizar el usuario
    this.$store.dispatch('updateUsuarios', this.editingUser);
    // Cierra el formulario/modal de edición
    this.showEditModal = false;
  },
  cancelEdit() {
    // Restablece el estado del usuario en edición y cierra el formulario/modal
    this.editingUser = null;
    this.showEditModal = false;
  },



    onDeleteUsuariosById(id) {
      this.deleteUsuarios(id);
    },
    launchQuery() {
      if (this.esSocio) {
        this.usuariosSocios(this.esSocio);
        return;
      }

      this.fetchUsuarios();
    },
  
    usuariosNoSocios() {
      this.usuariosSociosFalse();
    },
    buscarPorNombre() {
      // Llamar a la acción para buscar usuarios por nombre
      this.fetchUsuariosName();
    },
  },
};
</script>

<style scoped>
.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.user-table th, .user-table td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

.user-row {
  background-color: #f9f9f9;
}

/* Clase de estilo personalizado para el color del texto */
.custom-text-color {
  color: white !important;
}
</style>

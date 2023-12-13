<template>
  <div>
    <div style="background-color: #EF9A9A;">
      <h1 style="text-align:center"></h1>
    </div>

    <v-sheet width="340" class="mx-auto">
      <v-layout align-end fill-height pa-10>
        <div class="title font-weight-light" style="color: brown;"></div>
      </v-layout>

      <!-- Agregar botón para ir a AddPresets -->
      <router-link v-if="$store.state.role === 'admin'" to="/ListPresets">
  <v-btn class="elegant-button" color="maroon" dark>Go to Presets</v-btn>
</router-link>

      

      <v-form @submit="onSubmit" @reset="onReset">
        <v-text-field
          id="input-1"
          v-model="form.titulo"
          :counter="20"
          type="text"
          placeholder="Enter titulo"
          required
        ></v-text-field>

        <v-text-field
          id="input-3"
          v-model="form.descripcion"
          type="text"
          placeholder="Enter descripcion"
          maxlength="400" 

        ></v-text-field>

        <v-text-field
          id="input-3"
          v-model="form.precio"
          placeholder="precio"
          required
        ></v-text-field>

       

        <v-btn type="submit" color="success" variant="primary">Submit</v-btn>
        <v-btn type="reset" color="error" variant="danger">Reset</v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      form: {
        titulo: '',
        descripcion: '',
        precio: '',
      },
     
      
      precio: [
        value => {
          if (value) return true;

          return 'You must enter precio.';
        },
      ],
    };
  },
  methods: {
    onSubmit() {
      this.addPresets({
        titulo: this.form.titulo,
        descripcion: this.form.descripcion,
        precio: this.form.precio,
      });
    },
    onReset() {},
    ...mapActions(['addPresets']),
  },
};
</script>

<style>
.elegant-button {
    background-color: maroon !important;
    color: white !important;
    border-radius: 8px; /* Adjust the border-radius for a more elegant design */
    /* Add any other styling you want for the button */
  }
.h1 {
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
</style>

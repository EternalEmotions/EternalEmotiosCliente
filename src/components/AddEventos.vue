<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card color="white" class="elevation-12">
            <v-card-title class="text-h5" style="text-align: center; color: #8B0000">
              Formulario de Eventos
            </v-card-title>
            <v-card-text>
              <v-form @submit.prevent="onSubmit" @reset.prevent="onReset">
                <v-text-field
                  v-model="form.título"
                  label="Nombre"
                  required
                  outlined
                ></v-text-field>

                <v-text-field
                  v-model="form.precio"
                  label="precio"
                
                  required
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="form.descripción"
                  label="Descripción"
                  required
                  outlined
                ></v-text-field>
   
                <v-btn type="submit" color="accent" dark>Enviar</v-btn>
                <v-btn type="reset" color="error" dark>Restablecer</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        form: {
            título: '',
          precio: '',
          descripción: '',
        
        }
      };
    },
    methods: {
      ...mapActions(['addEventos']),
      onSubmit() {
  console.log('Formulario enviado:', this.form);
  this.addEventos({
    título: this.form.título,
    precio: this.form.precio,
    descripción: this.form.descripción,
  });  
      },
      onReset() {},
    ...mapActions(['addEventos']),
    },
  };
  </script>
  
  <style scoped>
  /* Puedes agregar estilos específicos para este formulario si es necesario */
  </style>
  
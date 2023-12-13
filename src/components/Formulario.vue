<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card color="white" class="elevation-12">
            <v-card-title class="text-h5" style="text-align: center; color: #8B0000">
              Formulario de Usuario
            </v-card-title>
            <v-card-text>
              <v-form @submit.prevent="onSubmit" @reset.prevent="onReset">
                <v-text-field
                  v-model="form.name"
                  label="Nombre"
                  required
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="form.apellidos"
                  label="Apellidos"
                  required
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="form.email"
                  label="Correo Electrónico"
                  type="email"
                  required
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="form.descripcion"
                  label="Descripción"
                  required
                  outlined
                ></v-text-field>
                <v-checkbox
                  v-model="form.esSocio"
                  label="¿Quieres ser socio?"
                  
                  outlined
                ></v-checkbox>
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
          name: '',
          apellidos: '',
          email: '',
          descripcion: '',
        }
      };
    },
    methods: {
      ...mapActions(['addUsuarios']),
      onSubmit() {
        this.addUsuarios({
          name: this.form.name,
          apellidos: this.form.apellidos,
          email: this.form.email,
          descripcion: this.form.descripcion,
          esSocio: this.form.esSocio,
        });
  
        // Restablecer los valores del formulario a su estado inicial
        this.resetForm();
      },
      onReset() {
        // Restablecer los valores del formulario a su estado inicial
        this.resetForm();
        this.fetchUsuarios
      },
      resetForm() {
        this.form = {
          name: '',
          apellidos: '',
          email: '',
          descripcion: '',
          esSocio: '',
        };
      },
    },
  };
  </script>
  
  <style scoped>
  /* Puedes agregar estilos específicos para este formulario si es necesario */
  </style>
  
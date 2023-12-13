<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-form ref="form" class="larger-form">
          <v-text-field
            v-model="username"
            type="text"
            label="Username"
            outlined
            solo
            required
            color="deep-purple lighten-2"
          ></v-text-field>

          <v-text-field
            v-model="password"
            type="password"
            label="Password"
            outlined
            solo
            required
            color="deep-purple lighten-2"
          ></v-text-field>

          <v-btn
            class="mt-4"
            @click.prevent="doLogin"
            color="dark-red"
            dark
            block
          >
            Login
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      drawer: false,
      group: null,
    };
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
  methods: {
    doLogin() {
      this.$store
        .dispatch('login', { username: this.username, password: this.password })
        .then((ret) => {
          if (!ret) {
            alert(this.$t(errors.invalidLogin));
          } else {
            // Limpiar los campos después del inicio de sesión exitoso
            this.username = '';
            this.password = '';
          }
        });
    },
  },
};
</script>

<style>
/* Custom Bohemian Colors */
.v-application {
  background-color: rgba(244, 231, 220, 0.8);
}

.larger-form {
  background-color: rgba(139, 69, 19, 0.7);
  padding: 30px; /* Ajusta el espacio interno según tus necesidades */
  border-radius: 15px; /* Ajusta el radio del borde según tus necesidades */
  position: relative;
}
</style>

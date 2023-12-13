<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card color="white" class="elevation-12">
          <v-card-title class="text-h5" style="text-align: center; color: #8B0000">
            Formulario de Reservas
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="onSubmit">
              <v-select
                v-model="form.eventoId"
                :items="Eventos"
                item-text="título"
                item-value="id"
                label="Seleccionar Evento"
                required
                outlined
                @change="onEventoChange"
              ></v-select>

              <v-date-picker
                v-model="form.fecha"
                label="Fecha"
                required
                outlined
                @change="onFechaChange"
              ></v-date-picker>

              <v-select
                v-model="form.hora"
                label="Hora"
                required
                outlined
                :items="horasOptions"
              ></v-select>

              <v-btn type="submit" color="accent" dark>Enviar</v-btn>
              <router-link to="/ListOrders">
  <v-btn class="elegant-button" color="maroon" dark>Carrito </v-btn>
</router-link>
            </v-form>
          </v-card-text>
        </v-card>
        <v-snackbar v-model="mostrarConfirmacion" color="success" timeout="3000">
          ¡Su reserva ha sido realizada con éxito!
        </v-snackbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      form: {
        eventoId: '',
        fecha: null,
        hora: '',
      },
      horasOptions: [],
      mostrarConfirmacion: false,
    };
  },
  methods: {
    ...mapActions(['addReservas', 'fetchEventos', 'fetchReservas', 'fetchReservasId',"addOrders"]),

  /*  buyReserva(reserva) {
      this.addOrders({ reservaId: reserva.id })
        .then(() => {
          this.$router.push({ name: 'ListOrders' });
          setTimeout(() => {
            window.location.reload();
          }, 0);
        })
        .catch(error => {
          console.error("Error al realizar la compra:", error);
        });
    },*/

    onSubmit() {
  const nuevaReserva = {
    eventoId: this.form.eventoId,
    fecha: this.form.fecha,
    hora: this.form.hora,
  };

  // Agregar la reserva
  this.addReservas(nuevaReserva)
    .then(reservaAgregada => {
      if (reservaAgregada && reservaAgregada.id) {
        console.log('Reserva agregada con éxito:', reservaAgregada);

        // Luego, agregar la reserva a las órdenes directamente
        this.addOrders({ reservaId: reservaAgregada.id })
          .then(() => {
            console.log('Orden de reserva agregada con éxito');
            this.mostrarConfirmacionMessage();
           
      
          })
 
          .catch(error => {
            console.error('Error al agregar la orden de reserva:', error);
          });
      } else {
        console.error('La reserva agregada no tiene la propiedad "id":', reservaAgregada);
      }
    })
    .catch(error => {
      console.error('Error al agregar la reserva:', error);
    });
    
    
},


    mostrarConfirmacionMessage() {
      this.mostrarConfirmacion = true;
      setTimeout(() => {
        this.mostrarConfirmacion = false;
      }, 3000);
    },

    onEventoChange() {
      if (this.form.eventoId && this.form.fecha) {
        this.fetchReservasId({
          eventoId: this.form.eventoId,
          fecha: this.form.fecha,
        })
          .then(horasDisponibles => {
            this.horasOptions = horasDisponibles;
          })
          .catch(error => {
            console.error('Error al obtener las horas disponibles:', error);
          });
      }
    },

    onFechaChange() {
      if (this.form.eventoId && this.form.fecha) {
        this.fetchReservasId({
          eventoId: this.form.eventoId,
          fecha: this.form.fecha,
        })
          .then(horasDisponibles => {
            this.horasOptions = horasDisponibles;
          })
          .catch(error => {
            console.error('Error al obtener las horas disponibles:', error);
          });
      }
    },
  },
  computed: {
    ...mapState(['Eventos', 'Reservas']),
  },
  mounted() {
    this.fetchEventos();
  },
};
</script>

<style scoped>
</style>

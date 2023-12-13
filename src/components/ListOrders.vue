<template>
  <v-container class="d-flex align-center justify-center">
    <v-row align="center" justify="center">
      <v-col cols="12" md="4" class="order-list">
        <v-card outlined>
          <v-card-title class="text-center">Carrito de compra</v-card-title>
          <v-col v-for="order in Orders" :key="order.id" cols="12">
            <v-card max-width="344" outlined>
              <v-list-item three-line>
                <v-btn
                  @click="onDeletePresetOrder(order.id)"
                  color="red"
                  outlined
                  icon
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
                <div
                  :class="getPresetBackgroundClass(order.presetId)"
                  class="preset-background-container"
                ></div>
                <div
                  :class="getBackgroundClassEvento(order.reservaId)"
                  class="evento-background-container"
                ></div>
                <v-list-item-content>
                  <v-list-item-title class="text-h5 mb-1">{{
                    order.titulo
                  }}</v-list-item-title>
                  <v-list-item-subtitle>{{ order.total }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>

          <div>Total: {{ sumaDeOrdenes }}</div>
        </v-card>
      </v-col>

      <v-col cols="12" md="4" class="notification-form">
        <v-card outlined class="elegant-form">
          <h5>Antes de pagar te enviaremos una notificacion</h5>
            
          
          <v-form @submit.prevent="submitPayment">
            <v-text-field
              v-model="name"
              label="Nombre"
              :rules="[(v) => !!v || 'Nombre es requerido']"
            ></v-text-field>
            <v-text-field
              v-model="email"
              label="Correo Electrónico"
              :rules="[
                (v) => !!v || 'Correo electrónico es requerido',
                (v) =>
                  /.+@.+\..+/.test(v) ||
                  'Debe ser un correo electrónico válido',
              ]"
            ></v-text-field>

            <v-text-field
              v-model="sumaDeOrdenes"
              label="Total"
              type="number"
              readonly
            ></v-text-field>

            <!--<v-btn type="submit" color="primary">Enviar Notificación</v-btn>-->
            <v-btn type="button" color="primary" @click="processPayment"
              >Pagar</v-btn
            >
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { required, email } from "vuelidate/lib/validators";
import { loadStripe } from "@stripe/stripe-js";

export default {
  computed: {
    ...mapState(["Orders", "Pagos"]),
    sumaDeOrdenes() {
      return this.$store.state.ordersTotal;
    },

    emailErrors() {
      const errors = [];
      if (this.$v && this.$v.email) {
        if (!this.$v.email.$dirty) return errors;
        !this.$v.email.email &&
          errors.push("Debe ser un correo electrónico válido");
        !this.$v.email.required &&
          errors.push("Correo electrónico es requerido");
      }
      return errors;
    },
  },

  validations: {
    email: { required, email },
  },

  data() {
    return {
      name: "",
      email: "",
      total: "",
    };
  },

  created() {
    // Extract the order ID from the query parameters
    const orderId = this.$route.query.orderId;

    if (orderId) {
      // Fetch order details based on the order ID
      // Use the orderId to fetch specific order details
      // Replace the fetchOrderDetails method with your actual method to fetch order details
      this.fetchOrderDetails(orderId);
    } else {
      // If no order ID is provided, fetch all orders
      this.fetchOrders();
    }

    this.ordersTotal();
    this.fetchPagos(); // Agrega la llamada para obtener los pagos
  },

  methods: {
    ...mapActions({
      fetchOrders: "fetchOrders",
      deleteOrders: "deleteOrders",
      ordersTotal: "ordersTotal",
      pagosTotal: "pagosTotal",
      fetchPagos: "fetchPagos", // Agrega la acción para obtener los pagos
    }),

    viewOrderDetails(orderId) {
      this.selectedOrderId = orderId;
    },

    async sendNotification() {
      try {
        const paymentInfo = {
          name: this.name,
          email: this.email,
          total: this.sumaDeOrdenes,
        };

        // Llama a la acción pagosTotal directamente
        await this.pagosTotal(paymentInfo);
        console.log("Payment submitted successfully");
      } catch (error) {
        console.error("Error submitting payment:", error);
        // Optionally, handle the error in the component
      }
    },

    getPresetBackgroundClass(presetId) {
      return `preset-background-${presetId}`;
    },
    getBackgroundClassEvento(reservaId) {
      return `evento-background-${reservaId}`;
    },

    

    onDeletePresetOrder(id) {
      this.deleteOrders(id).then(() => {
        window.location.reload();
      });
    },

    async processPayment() {
      try {
        // Carga la librería de Stripe
        const stripe = await loadStripe(
          "pk_test_51OKO1bLkVoGrpMmaK3Fe02eWUa8lekesqoimB8CZ4xXONuBe5cW7JVl39DjUifxLQyS26apczZQbcI7oZM6SiUCy00RJmnUj7G"
        );

        // Verifica que se hayan proporcionado todos los campos necesarios
        if (!this.name || !this.email) {
          console.error("Todos los campos son obligatorios.");
          return;
        }

        // Realiza la solicitud al servidor con los datos del formulario y la suma de las órdenes
        const response = await fetch(
          "https://localhost:7043/Pagos/CreateStripeSession",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              total: this.sumaDeOrdenes,
              name: this.name,
              email: this.email,
              numCuenta: "",
              StripeSessionId: "", // Deja esto vacío por ahora
              StripeCustomerId: "",
            }),
          }
        );

        const responseData = await response.json();
        console.log("Respuesta del servidor:", responseData);

        // Suponiendo que la respuesta contiene una propiedad 'sessionId'
        if (responseData && responseData.sessionId) {
          // Redirige al usuario a la página de pago de Stripe
          const stripe = await loadStripe(
            "pk_test_51OKO1bLkVoGrpMmaK3Fe02eWUa8lekesqoimB8CZ4xXONuBe5cW7JVl39DjUifxLQyS26apczZQbcI7oZM6SiUCy00RJmnUj7G"
          );

          const { error } = await stripe.redirectToCheckout({
            sessionId: responseData.sessionId,
          });

          if (error) {
            console.error("Error al redirigir a Checkout:", error);
          } else {
            console.log("Redirigido a Checkout exitosamente");
            // Redirige al usuario a la página de éxito de tu elección
            window.location.href = "http://localhost:8080/#/";
          }
        }
      } catch (error) {
        console.error("Error al procesar el pago:", error);
      }
    },
  },
};
</script>
  
  <style scoped>
.rounded-input {
  border-radius: 0;
}

/* Contenedor adicional para la imagen de fondo */
.preset-background-container {
  height: 80px; /* Altura del avatar */
  width: 80px; /* Ancho del avatar */
  background-size: cover;
  background-position: center;
}
.evento-background-container {
  height: 80px; /* Altura del avatar */
  width: 80px; /* Ancho del avatar */
  background-size: cover;
  background-position: center;
}
.order-list {
  order: 1;
}

.notification-form {
  order: 2;
}

.payment-list {
  order: 3;
}

.elegant-form {
  margin-top: 20px; /* Espaciado superior para separar del elemento anterior */
  padding: 20px;
}
/* Importa el archivo de estilos global */
@import "@/assets/styles.css";
@import "@/assetsEventos/styles.css";
</style>
  
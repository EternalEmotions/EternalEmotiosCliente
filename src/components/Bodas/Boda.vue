<template>
  <div id="cuerpo" class="carousel-container">
    <!-- Carrusel sin efecto de sobreposición -->
    <div class="image-container" style="margin-bottom: 300px;">
      <!-- Elimina o comenta la siguiente línea para quitar el fondo rojo -->
      <!-- <div class="carousel-overlay"></div> -->
      <img :src="currentCarouselImage" alt="Header Image">
      <!-- Tarjeta de texto estática encima del carrusel -->
      
    </div>
    <div class="text-card">
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <div>
                Si hay algo presente en una boda, son los sentimientos y emociones. Es lo que las hace tan especiales. Las fotos y el vídeo del enlace no solo están ahí para hacernos recordar, sino para transmitirnos cada uno de los sentimientos que vivimos en un día tan importante.
              </div>
            </v-col>
            <!-- Nueva columna para la imagen "flor2.png" -->
            <v-col cols="12" md="6" class="text-right">
              <img src="@/assets/flor1.png" alt="Flower Image" class="flor-image">
            </v-col>
          </v-row>
        </v-container>
      </div>
    <v-container>
      <!-- Imágenes con enlaces -->
      <router-link to="/BodaEva">
        <img src="@/assets/25.jpg" alt="Imagen 1" class="imagen-enlace color-image" style="max-width: 400px; margin-right: 20px;">
      </router-link>
      <router-link to="/BodaMila">
        <img src="@/assets/18.jpg" alt="Imagen 2" class="imagen-enlace bw-image" style=" max-width: 400px; margin-right: 20px;">
      </router-link>
      <router-link to="/bodas">
        <img src="@/assets/14.jpg" alt="Imagen 3" class="imagen-enlace color-image" style="max-width: 400px;">
      </router-link>
    </v-container>
  </div>
</template>




<script>
import { VImg, VContainer, VRow, VCol } from "vuetify/lib";

export default {
  data() {
    return {
      currentCarouselIndex: 0,
      carouselImages: ["/24.jpg", "/19.jpg"],
      fadeInIndex: 0,
    };
  },
  computed: {
    currentCarouselImage() {
      return require(`@/assets${this.carouselImages[this.currentCarouselIndex]}`);
    },
  },
  methods: {
    fadeIn() {
      this.fadeInIndex += 1;
    },
  },
  components: {
    VImg,
    VContainer,
    VRow,
    VCol,
  },
  watch: {
    fadeInIndex() {
      // Cargar más imágenes al hacer scroll (puedes ajustar la lógica según tus necesidades)
      // En este ejemplo, cargamos imágenes cada vez que el índice de fadeIn cambia
      // Puedes ajustar esto para que se carguen imágenes según el scroll o de otras maneras
      this.gridImages.push(`/nueva_imagen_${this.gridImages.length + 1}.jpg`);
    },
  },
  mounted() {
    setInterval(() => {
      this.currentCarouselIndex = (this.currentCarouselIndex + 1) % this.carouselImages.length;
    }, 10000); // Cambia la imagen del carrusel cada 10 segundos
  },
};
</script>

<style scoped>
.image-container {
  position: relative;
  margin-bottom: 300px; /* Ajusta el margen inferior según tus necesidades */
}

.text-card {
  position: absolute;
  bottom: 20px; /* Ajusta el margen inferior según tus necesidades */
  left: 200px; /* Ajusta el margen izquierdo según tus necesidades */
  background: #8b4513b3; /* Fondo con opacidad en color granate marroncito */
  padding: 20px; /* Ajusta el espaciado interno según tus necesidades */
  color: white; /* Color del texto */
  z-index: 1; /* Asegura que la tarjeta esté en un nivel superior */
  margin-bottom: 350px; /* Ajusta según sea necesario para que sobresalga más */
  max-width: 800px; /* Establece un ancho máximo para la tarjeta */
  height: auto; /* Ajusta la altura automáticamente según el contenido */
  font-family: 'Verdana', sans-serif; /* Cambia a la tipografía deseada */
  font-size: 20px; /* Ajusta el tamaño de la letra según tus necesidades */
  line-height: 1.5; /* Ajusta el espaciado entre líneas según tus necesidades */
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Agrega un efecto de sombra */
}

.flor-image {
  max-width: 160px; /* Ajusta el ancho máximo según tus necesidades */
  max-height: 300px; /* Ajusta la altura máxima según tus necesidades */
  /* Puedes agregar más estilos según tus necesidades */
}

.fade-in-up-aggressive-enter-active, .fade-in-up-aggressive-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.fade-in-up-aggressive-enter, .fade-in-up-aggressive-leave-to {
  opacity: 0;
  transform: translateY(30px); /* Ajusta la cantidad de desplazamiento vertical */
}
</style>

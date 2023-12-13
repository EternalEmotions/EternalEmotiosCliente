<template>
    <div id="cuerpo" class="carousel-container">
      <!-- Título -->
      <h1 class="image-title">Bea y Angel</h1>
  
      <!-- Imagen fija en lugar del carrusel -->
      <img src="@/assets/23.jpg" alt="Bea y Angel" class="fixed-image">
  
      <!-- Resto del contenido -->
      <v-container>
        <v-row>
          <v-col v-for="(image, index) in gridImages" :key="index" cols="12" md="4">
            <v-img
              :src="require(`@/assets${image}`)"
              alt="Grid Image"
              @click="selectImage(image)"
              class="clickable-image"
            ></v-img>
          </v-col>
        </v-row>
      </v-container>
  
      <!-- Imagen seleccionada en grande -->
      <div v-if="selectedImage" class="selected-image-container" @click="deselectImage">
        <img :src="require(`@/assets${selectedImage}`)" :alt="selectedImage" class="selected-image">
      </div>
    </div>
  </template>
  
  <script>
  import { VContainer, VRow, VCol, VImg } from "vuetify/lib";
  
  export default {
    data() {
      return {
        gridImages: ["/24.jpg", "/19.jpg", "/20.jpg", "/21.jpg", "/22.jpg", "/23.jpg", "/19.jpg"],
        selectedImage: null,
      };
    },
    components: {
      VContainer,
      VRow,
      VCol,
      VImg,
    },
    methods: {
      selectImage(image) {
        this.selectedImage = image;
      },
      deselectImage() {
        this.selectedImage = null;
      },
    },
  };
  </script>
  
  <style scoped>
  .fixed-image {
    width: 90%;
    height: 700px; /* Ajusta la altura según tus necesidades */
  }
  
  .image-title {
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 60px;
    color: rgb(177, 160, 33);
    z-index: 1; /* Asegura que el texto esté encima de la imagen */
  }
  
  .clickable-image {
    cursor: pointer;
  }
  
  .selected-image-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }
  
  .selected-image {
    max-width: 80%;
    max-height: 80%;
  }
  </style>
  
<template>
    <div id="app" >
      <b-carousel
        id="carousel-fade"
        style="text-shadow: 0px 0px 2px #000; position: relative"
        fade
        indicators
        img-width="1024"
        img-height="480"
      >
        <!-- Imágenes del carrusel -->
        <b-carousel-slide
          caption="First Slide"
          img-src="https://picsum.photos/1024/480/?image=10"
        ></b-carousel-slide>
        <b-carousel-slide
          caption="Second Slide"
          img-src="https://picsum.photos/1024/480/?image=12"
        ></b-carousel-slide>
        <b-carousel-slide
          caption="Third Slide"
          img-src="https://picsum.photos/1024/480/?image=22"
        ></b-carousel-slide>
  
        <!-- Botón debajo de las imágenes -->
        <div
          style="
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1;
          "
        >
          <b-button variant="primary">Primary</b-button>
        </div>
      </b-carousel>
      <div id="cuerpo">
        <v-img class="imgheader" src="../assets/emociones.jpg"></v-img>
        <h2>REPORTAJES DE FOTOGRAFÍA</h2>
        <h3>LA RIOJA, ZARAGOZA, MADRID</h3>
      
      <b-container  class="page-container">
        <b-row>
          <!-- Primera columna con la primera imagen -->
          <v-col md="4">
            <v-img src="../assets/2.jpg" alt="Primera Imagen" fluid></v-img>
            
          </v-col>
  
          <!-- Segunda columna con la segunda imagen -->
          <v-col md="5">
            <v-img src="../assets/3.jpg" alt="Segunda Imagen" fluid></v-img>
          </v-col>
        </b-row>
      </b-container>
  
      <!--boton-->
      <div>
        <b-button>I am a Button</b-button>
        <b-button href="#">I am a Link</b-button>
      </div>
      <b-container  class="page-container">
        <b-row>
          <!-- Primera columna con la primera imagen -->
          <v-col md="5">
            <v-img src="../assets/4.jpg" alt="Primera Imagen" fluid></v-img>
          </v-col>
  
          <!-- Segunda columna con la segunda imagen -->
          <v-col md="5">
            <v-img src="../assets/5.jpg" alt="Segunda Imagen" fluid></v-img>
            <v-img src="../assets/6.jpg" alt="Segunda Imagen" fluid></v-img>
          </v-col>
      
        </b-row>
      </b-container>
      <div>
        <b-button>COMUNIONES Y FAMILIA</b-button>
        <b-button href="#">I am a Link</b-button>
      </div>
      <v-col class="page-container" md="4">
            <v-img src="../assets/7.jpg" alt="Segunda Imagen" fluid></v-img>
          </v-col>
    </div>
  </div>
  </template>
  
  
  <script>
  //import ListGrado from '@/components/ListGrado.vue'
  import { BCarousel, BCarouselSlide, BButton, BImg } from "bootstrap-vue";
  
  import Vistas from "@/components/Especificas/Vistas.vue";
  export default {
    data() {
      return {
        slide: 0,
        sliding: null,
      };
    },
    components: {
      BCarousel,
      BCarouselSlide,
      BButton,
      BImg,
      //ListGrado,
      Vistas,
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true;
      },
      onSlideEnd(slide) {
        this.sliding = false;
      },
    },
  };
  </script>
  
  <style>
  #app {
    text-align: center;
  }
  
  .centered-content {
    display: inline-block;
    text-align: left;
    max-width: 800px;
    width: 100%;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  #cuerpo{
    margin-left: 80px;
    margin-right:80px ;
  }
  
  .page-container {
  
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto; /* Centrar la imagen horizontalmente */
  
  
  }
  </style>
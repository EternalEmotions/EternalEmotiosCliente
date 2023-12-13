<template>
    <div id="cuerpo">


        <div class="image-container">
          <img :src="currentImage" alt="Header Image">
            
            <!-- Agrega más enlaces según sea necesario -->
        </div>


      <v-img class="imgheader" src="../assets/emociones.jpg"></v-img>
      <h2>REPORTAJES DE FOTOGRAFÍA</h2>
      <h3>LA RIOJA, ZARAGOZA, MADRID</h3>

      <v-app id="inspire">
        <v-container grid-list-md text-xs-center>
          <v-layout row wrap>
            <v-flex xs6><router-link to="/bodas" class="botonB-link">
              <v-img src="../assets/2.jpg" alt="Primera Imagen" fluid></v-img></router-link>
            </v-flex>
           
            <v-flex xs6 > <router-link to="/bodas" class="botonB-link">
              <v-img src="../assets/3.jpg" alt="Segunda Imagen" fluid></v-img></router-link>
            </v-flex>
          </v-layout>
          <router-link to="/bodas" class="botonB-link">
      <button class="botonB">REPORTAJE DE BODAS</button>
    </router-link>

          <v-layout row wrap>
            <v-flex xs6>
              <v-img src="../assets/4.jpg" alt="Primera Imagen" fluid></v-img>
            </v-flex>

            <v-flex xs6>
              <v-img src="../assets/5.jpg" alt="Segunda Imagen" fluid></v-img>
              <v-img src="../assets/6.jpg" alt="Segunda Imagen" fluid></v-img>
            </v-flex>
          </v-layout>
          <!--Boton-->
          <div>
            <button class="botonB" href="../Comuniones">
              COMUNIONES,BEBES Y FAMILIA
            </button>
          </div>

          <v-layout row wrap>
            <v-flex xs12>
              <v-img src="../assets/7.jpg" alt="Segunda Imagen" fluid></v-img>
            </v-flex>
          </v-layout>
        </v-container>
        
      </v-app>
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


      images: ["/9L1A5426.jpg", "/9L1A5463.jpg"],
        centerImage:["/logo1.png"], // Ruta de la imagen en el centro
        currentIndex: 0,
        linkHovered: false,
    };
  },
  computed: {
    currentImage() {
  return require(`../assets${this.images[this.currentIndex]}`);
}

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


    changeColor() {
        this.linkHovered = true;
      },
      resetColor() {
        this.linkHovered = false;
      },
  },


  mounted() {
      setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
      }, 10000); // Cambia la imagen cada 10 segundos
    },
};
</script>

<style>
#app {
  text-align: center;
}




.botonB {
  background-color: #783131; /* Puedes cambiar este color según tus preferencias */
  color: #fff; /* Color del texto */
  border: none; /* Elimina el borde si lo deseas */
  padding: 10px 20px; /* Ajusta el espaciado según sea necesario */
  border-radius: 5px; /* Agrega bordes redondeados si lo deseas */
  font-size: 16px; /* Ajusta el tamaño del texto según sea necesario */
}







header {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  
  .image-container {
  position: relative;
  max-height: 85vh;
  display: flex;
  align-items: center;
  overflow: hidden; /* Agrega overflow: hidden para recortar la parte superior de la imagen */
}

img {
  width: 100%;
  height: auto;
  object-fit: contain;
  object-position: top; /* Recorta por la parte superior */
  margin: 0;
  padding: 0;
}
  
  .image-links {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between; /* Alinea los enlaces a los lados */
    background-color: rgba(255, 255, 255, 0.8); /* Color blanco con opacidad */
    padding: 60px; /* Ajusta el padding para un marco más grande */
    transition: background-color 0.3s ease;
  }
  
  .image-links.hovered {
    background-color: rgba(255, 255, 255, 0.95); /* Color con mayor opacidad al hacer hover */
  }
  
  .image-link {
    text-decoration: none;
    color: #000; /* Color negro del enlace */
    transition: color 0.3s ease;
  }
  
  .image-link.left {
    margin-right: auto; /* Mueve el enlace izquierdo a la izquierda */
  }
  
  .image-link.right {
    margin-left: auto; /* Mueve el enlace derecho a la derecha */
  }
  
  .center-image {
    max-width: 60%; /* Ajusta el ancho de la imagen en el centro según sea necesario */
    max-height: 80vh; /* Ajusta la altura de la imagen en el centro según sea necesario */
  }

</style>
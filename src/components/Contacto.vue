<template>
  <v-container>
    <div class="custom-carousel-container">
      <v-carousel>
        <v-carousel-item v-for="(item, i) in form.items" :key="i">
          <v-img :src="item.src" alt="Carousel Image" class="custom-carousel-image"></v-img>
        </v-carousel-item>
      </v-carousel>
    </div>
    <div>
      <Formulario></Formulario>
    </div>

    <v-row>
      <v-col v-for="(image, index) in form.images" :key="index" cols="12" md="4">
        <div class="image-container">
          <v-btn @click="likeImage(index)" class="like-btn" :class="{ 'red--text': isLiked(index) }">
            <v-icon>mdi-heart</v-icon>
          </v-btn>
          <v-img :src="image.src" alt="Image"></v-img>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Formulario from "@/components/Formulario.vue";

export default {
  components: {
    Formulario
  },
  computed: {
    ...mapState(['Likes']),
  },
  data() {
    return {
      form: {
        name: '',
        apellidos: '',
        email: '',
        descripcion: '',
        esSocio: '',
        items: [
          { src: require('@/assets/19.jpg') }
        ],
        images: [
          { src: require('@/assets/20.jpg') },
          { src: require('@/assets/21.jpg') },
          { src: require('@/assets/22.jpg') },
          { src: require('@/assets/23.jpg') },
          { src: require('@/assets/24.jpg') },
          { src: require('@/assets/25.jpg') },
        ],
      }
    };
  },
  methods: {
    ...mapActions(['addUsuarios', 'addLikes']),
    isLiked(index) {
      const likes = this.Likes.filter(like => like.imageId === this.form.images[index].src);
      return likes.length > 0;
    },
    likeImage(index) {
      console.log("Like image called with index:", index);

      if (this.isLiked(index)) {
        console.log("Image is already liked. Implement logic to unlike here.");
      } else {
        console.log("Adding like for image with src:", this.form.images[index].src);

        this.addLikes({
          imageId: this.form.images[index].src,
          userId: this.form.id, // Note: Make sure to have a user id here
        });
      }
    },
  },
};
</script>

<style scoped>
.image-container {
  position: relative;
  width: 100%;
}
.custom-carousel-container {
  overflow: hidden;
  height: 600px; /* Ajusta la altura según tus necesidades */
}

.custom-carousel-image {
  width: 100%;
}

.like-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
  border: 2px solid red;
}
</style>

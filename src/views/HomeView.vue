<template>
  
  <Menu>
    <Contacto></Contacto>
    
</Menu>

</template>

<script>

import Menu from '@/components/Menu.vue'
import Contacto from "@/components/Contacto.vue";

export default {
  name: "Home",
  

  components: {
    Contacto,
    Menu,
  },
};
</script>

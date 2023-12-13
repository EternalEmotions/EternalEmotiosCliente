import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import {i18n} from '@/i18n/index'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'vuetify/dist/vuetify.min.css';


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')


// Importar archivos CSS Bootstrap y BootstrapVue (el orden es importante) 
import  'bootstrap/dist/css/bootstrap.css' 
import  'bootstrap-vue/dist/bootstrap-vue.css'

// Haz que BootstrapVue esté disponible en todo tu proyecto

// Haz que BootstrapVue esté disponible en todo tu proyecto
Vue.use(BootstrapVue)

// Opcionalmente, instala el complemento de componentes de íconos BootstrapVue
Vue.use(IconsPlugin)
Vue.config.productionTip = false
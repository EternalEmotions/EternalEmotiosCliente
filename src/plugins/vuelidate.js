// plugins/vuelidate.js
import Vue from 'vue';
import { required, email } from 'vuelidate';

Vue.use(required);
Vue.use(email);

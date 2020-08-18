import Vue from 'vue';
import App from './App.vue';
import '@/assets/css/tailwind.css';
import vuetify from './plugins/vuetify';
import VueHtml2Canvas from 'vue-html2canvas';

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount('#app');

Vue.use(VueHtml2Canvas);

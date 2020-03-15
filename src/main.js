import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import { routes } from './routes';
import VModal from 'vue-js-modal';
import Snotify from 'vue-snotify';

Vue.use(VModal, { dialog: true })
Vue.use(VueRouter);
Vue.use(Snotify);

const router = new VueRouter({
  routes,
  mode: 'history',
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
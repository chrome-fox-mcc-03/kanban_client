import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import { routes } from './routes';
import VModal from 'vue-js-modal';
import Toasted from 'vue-toasted';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import GSignInButton from 'vue-google-signin-button';

Vue.use(GSignInButton)
Vue.use(VModal, { dialog: true })
Vue.use(VueRouter);
Vue.use(Toasted);
Vue.use(Loading);

const router = new VueRouter({
  routes,
  mode: 'history',
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
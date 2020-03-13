import Vue from "vue";
import App from "./App.vue";
import GSignInButton from "vue-google-signin-button";
import VueToastify from "vue-toastify";

Vue.use(GSignInButton);
Vue.use(VueToastify);

new Vue({
  render: h => h(App)
}).$mount("#app");

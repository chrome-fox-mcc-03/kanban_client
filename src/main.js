import Vue from 'vue';
import App from './App.vue';
import Snotify from 'vue-snotify';


Vue.use(Snotify)
new Vue({
  render: h => h(App),
}).$mount('#app');
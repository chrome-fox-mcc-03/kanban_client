import Vue from 'vue';
import App from './App.vue';
import SuiVue from 'semantic-ui-vue';
import '../assets/style/style.css'
import axios from 'axios'

Vue.use(SuiVue);
Vue.use(axios)

new Vue({
  render: h => h(App),
}).$mount('#app');
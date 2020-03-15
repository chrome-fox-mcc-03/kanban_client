import Vue from 'vue';
import App from './App.vue';
import GSignInButton from 'vue-google-signin-button';
import VueSocketIO from 'vue-socket.io';

Vue.use(new VueSocketIO({
    debug: true,
    connection: 'https://kanbanize.herokuapp.com'
}));

Vue.use(GSignInButton)


new Vue({
    render: h => h(App),
}).$mount('#app');
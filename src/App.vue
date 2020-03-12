<template>
  <div>
    <landing-page v-show="!isLogin" @login="login" @register="register"></landing-page>
    <kanban v-show="isLogin" @logout="logout"></kanban>
  </div>
</template>

<script>
  import LandingPage from './views/LandingPage.vue'
  import Kanban from './views/Kanban.vue'
  import Axios from 'axios';
  export default {
    name: 'App',
    data() {
      return {
        isLogin: false,
        tasks: []
      }
    },
    components: {
      LandingPage,
      Kanban
    },
    methods: {
      login(data) {
        Axios({
            method: 'POST',
            url: 'http://localhost:3000/login',
            data
          })
          .then(response => {
            localStorage.setItem('token', response.data.token)
            this.isLogin = true
          })
          .catch(err => {
            console.log(err.response.data);
          })
        // .finally()
      },

      register(data) {
        Axios({
            method: 'POST',
            url: 'http://localhost:3000/register',
            data
          })
          .then(response => {
            localStorage.setItem('token', response.data.token)
            this.isLogin = true
          })
          .catch(err => {
            console.log(err.response.data);
          })
      },
      logout() {
        localStorage.removeItem('token')
        this.isLogin = false
      },
      fetchTask() {
        Axios({
          method: 'GET',
          url: 'http://localhost:3000/tasks',
          headers: {
            token: localStorage.token
          }
        })
          .then(response => {
            console.log(response);
            // this.tasks.push()
          })
      }
    },
    created() {
      if (localStorage.token) {
        this.isLogin = true
        this.fetchTask()
      }
    }
  };
</script>

<style scoped>
</style>
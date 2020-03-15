<template>
  <div>
    <landing-page
      v-if="currentPage === 'landing'"
      @changeCurrentPage="changeCurrentPage"
      @changeForm="changeForm"
      @register="register"
      @login="login"
      :showForm="showForm"
    ></landing-page>
    <main-page
      v-else
      @changeCurrentPage="changeCurrentPage"
    ></main-page>
  </div>
</template>

<script>
import Axios from 'axios'
import LandingPage from './views/LandingPage'
import MainPage from './views/MainPage'

export default {
  name: 'App',
  components: {
    LandingPage,  
    MainPage
  },
  data () {
    return {
      currentPage: 'landing',
      showForm: 'login'
    }
  },

  methods: {
    changeCurrentPage (newPage) {
      this.currentPage = newPage
    },

    changeForm (formName) {
      this.showForm = formName
    },

    login (payload) {
      const { email, password } = payload
      console.log(email, password)
      Axios({
        url: 'http://localhost:3000/login',
        method: 'POST',
        data: { email, password }
      })
        .then(({ data }) => {
          console.log(data)
          localStorage.setItem('token', data.token)
          localStorage.setItem('username', data.username)
          this.changeCurrentPage('main')
        })
        .catch(err => {
          console.log(err)
        })
    },

    register (payload) {
      console.log(payload)
      const { username, email, password } = payload
      Axios({
        url: 'http://localhost:3000/register',
        method: 'POST',
        data: { username, email, password }
      })
        .then(({ data }) => {
          console.log(data)
          this.changeForm('login')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },

  created () {
    if (!localStorage.token) this.currentPage = 'landing'
    else this.currentPage = 'main'
  }

}
</script>

<style>
  html {
    background-color: #f8f5e4;
    background-size: cover;
  }
</style>
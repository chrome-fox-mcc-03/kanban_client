<template>
  <div>
    <LandingPage
      v-if="currentPage === 'landingPage'"
      @registerProcess="registerProcess"
      @loginProcess="loginProcess"
      @loginSuccess="loginSuccess"
      ></LandingPage>

    <Dashboard
      v-else-if="currentPage === 'dashboard'"
      @addMember="addMember"
      :members="members"
      @logout="logout"
      @logoutFromBoard="logoutFromBoard"
      ></Dashboard>
  </div>
</template>

<script>
import Toastify from 'toastify-js'
import axios from 'axios'
import LandingPage from './components/LandingPage.vue'
import Dashboard from './components/Dashboard.vue'

export default {
  name: 'App',
  data() {
    return {
      currentPage: 'landingPage',
      registerSuccess: '',
      tasks: [],
      statusDashboardPage : '',
      members : []
    };
  },
  components : {
    LandingPage,
    Dashboard
  },
  methods: {
    checkLogin () {
      if (!localStorage.access_token ) {
        this.currentPage = 'landingPage'
      } else {
        this.currentPage = 'dashboard'
      }
    },
    registerProcess (payload) {
      axios({
        url: 'http://localhost:3000/register',
        method: 'POST',
        data: {
          name: payload.name,
          email: payload.email,
          password: payload.password
        }
      })
        .then(({data}) => {
          this.$bvModal.hide(`register`)
          Toastify({
            text: 'Register is successfully',
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            className: "info",
          }).showToast();
        })
        .catch(err => {
          Toastify({
            text: err.response.data.errors[0],
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            className: "warning",
          }).showToast();
        })
    },
    loginProcess (payload) {
      axios({
        url: 'http://localhost:3000/login',
        method: 'POST',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('nameUser', data.name)
          this.checkLogin()
          this.fetchTeams()
          Toastify({
            text: 'Login is successfully',
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            className: "info",
          }).showToast();
        })
        .catch(err => {
          Toastify({
            text: err.response.data.errors[0],
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            className: "warning",
          }).showToast();
        })
    },
    loginSuccess () {
      this.currentPage = 'dashboard'
    },
    logout () {
      localStorage.clear()
      this.currentPage = 'landingPage'
    },
    logoutFromBoard () {
      localStorage.clear()
      this.currentPage = 'landingPage'
    },
    
    
    addMember (payload) {
      axios({
        url: 'http://localhost:3000/invite',
        method: 'POST',
        data : payload,
        headers : {
          access_token : localStorage.access_token
        }
      })
        .then(({ data }) => {
          this.$bvModal.hide(`invite-member`)
        })
    },
    fetchMember () {
      axios({
        url: 'http://localhost:3000/members/' + localStorage.TeamId,
        method: 'GET',
        headers: {
          access_token : localStorage.token
        }
      })
        .then(({ data }) => {
          console.log(data)
          this.members = data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.checkLogin()
  },
  watch : {
    currentPage (val) {
      this.currentPage = val
    }
  }
};
</script>

<style scoped>
</style>
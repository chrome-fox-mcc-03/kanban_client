<template>
  <div>
      <Dashboard
        v-if="currentPage === 'dashboard'"
        @changePage="changePage"
      ></Dashboard>

      <LoginPanel
        v-if="currentPage === 'login'"
        @changePage="changePage"
        ></LoginPanel>

      <RegisterPanel
        v-if="currentPage === 'register'"
        @changePage="changePage"
        ></RegisterPanel>
  </div>
</template>

<script>
import axiosKanban from './config/index'
import Dashboard from './components/Dashboard'
import LoginPanel from './components/LoginPanel'
import RegisterPanel from './components/RegisterPanel'

export default {
    name: "App",
    data() {
        return {
            currentPage : 'login'
        }
    },
    components: {
        Dashboard,
        LoginPanel,
        RegisterPanel
    },
    methods: {
      changePage(status) {
        this.currentPage = status
      },
      fetchData(){
        // console.log('MASUK NIH FECTH DATANAY')
        axiosKanban({
          method: 'GET',
          url: '/tasks',
          headers: {
            access_token: localStorage.access_token
          }
        })
          .then(tasks => {
            console.log(tasks)
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    created(){
      if(localStorage.access_token){
        this.fetchData()
        this.currentPage = 'dashboard'
      }
    }
}
</script>

<style>

</style>
<template>
  <div>
      <Dashboard
        v-if="currentPage === 'dashboard'"
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
      }
    }
}
</script>

<style>

</style>
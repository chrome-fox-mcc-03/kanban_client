<template>
  <div>
      <Dashboard
        v-if="currentPage === 'dashboard'"
      ></Dashboard>

      <LoginPanel
        v-if="currentPage === 'login'"
        ></LoginPanel>
      <RegisterPanel
        v-if="currentPage === 'register'"
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
            currentPage : 'dashboard'
        }
    },
    components: {
        Dashboard,
        LoginPanel,
        RegisterPanel
    }
}
</script>

<style>

</style>
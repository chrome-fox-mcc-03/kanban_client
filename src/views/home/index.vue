<template>
  <div id="main_container">
      <navbar @logout="logout" @showTask="showTask"></navbar>
      <main-page :taskData="taskData" @showTask="showTask"></main-page>
  </div>
</template>

<script>
import Navbar from './components/navbar';
import MainPage from './components/main-page';

export default {
    name: 'Home',
    components: {
        Navbar,
        MainPage
    },
    methods: {
        logout(logout) {
            this.$emit('logout', logout);
            localStorage.clear();
        },
        showTask() {
            this.$emit('showTask')
        }
    },
    props : [
        "taskData"
        // "showTask"
    ]
}
</script>

<style>

#main_container {
    /* background-color: rgb(243, 189, 189); */
    display: grid;
    grid-template-rows: 20vh 1fr;
}


</style>
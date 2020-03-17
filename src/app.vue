<template>
    <div>
        <Navbar 
        :login="login"
        @logoutSuccess='logoutSuccess'
        ></Navbar>
        <Login 
            v-if="currentPage == 'loginPage'" 
            @loginSuccess='loginSuccess'
            ></Login>
        <project-vue
            v-else-if="currentPage == 'dashboardPage'"
            @projectId='project'></project-vue>
        <kanbanBoardVue v-else-if="currentPage == 'taskPage'"></kanbanBoardVue>
    </div>
</template>
<script>
import axios from 'axios'
import Navbar from './components/navbar.vue'
import Login from './components/login.vue'
import projectVue from './components/project.vue'
import kanbanBoardVue from './components/kanbanBoard.vue'
export default {
    name: 'App',
  data(){
      return {
          currentPage : 'loginPage',
          login : false
          };
  },
  components: {
    Navbar,
    Login,
    projectVue,
    kanbanBoardVue
  },
  methods: {
      checkLogin(){
          if (localStorage.getItem('token') && localStorage.getItem('projectId')){
              this.currentPage = 'taskPage'
          } else if (localStorage.getItem('token')){
              this.currentPage = 'dashboardPage'
          }else {
              this.currentPage = 'loginPage'
          }
      },
      loginSuccess(){
          this.currentPage = 'dashboardPage'
          this.login = true
      },
      project(){
          this.currentPage = 'taskPage'
      },
      logoutSuccess(){
          this.currentPage= 'loginPage'
          this.login = false
      }
  },
  created() {
      this.checkLogin()
  }
}
</script>

<style>
</style>
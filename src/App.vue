<template>
  <div class="body">
    <!-- :login="login" @changeStatus="test" -->
    <login v-if="page == 'login'" @changePage="changingPage">  </login>
    <register v-else-if="page == 'register'" @changingPage="changingPage"> </register>
    <dashboard 
      v-else-if="page == 'dashboard'"
      :tasks='tasks'
      :categories='categories'
      @changingPage="changingPage"
      @commands="commands"
      > 
    </dashboard>
    <create v-else-if="page == 'create'" @changingPage="changingPage"> </create>
    <update v-else-if="page == 'update'" @changingPage="changingPage" ></update>
  </div>
</template>

<script>

import LoginFormVue from './components/LoginForm.vue';
import DashboardVue from './components/Dashboard.vue';
// import NavbarVue from './components/Navbar.vue';
import RegisterFormVue from './components/RegisterForm.vue';
import CreateVue from './components/Create.vue';
import UpdateVue from './components/Update.vue';


import Axios from 'axios';
export default {
  name: 'App',
  components: {
    register: RegisterFormVue,
    login: LoginFormVue,
    dashboard: DashboardVue,
    create: CreateVue,
    update: UpdateVue
  },
  data() {
    return {
      page: 'login',
      tasks: [],
      categories: []
      
    };
  },
  methods: {
    changeStatus(event){
      this.login = event
    },
    changingPage(page) {
      console.log(page, 696969669)
      this.page = page
      if (this.page == 'dashboard') {
        this.fetchingData()
        this.fetchingDataCategory()
      }
    },
    commands(data) {
      if (data == 'fetchData') {
        this.fetchingData()
        this.fetchingDataCategory()
      } //else if (data ==)
      
    },
    updating(data) {
      
    },
    fetchingData() {
      console.log(localStorage.getItem('token'))
      Axios({
        method: 'GET',
        url: 'http://localhost:3000/task',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          // console.log(data)
          this.tasks = data
        })
        .catch(err => console.log(err))
    },
    fetchingDataCategory() {
      console.log(localStorage.getItem('token'))
      Axios({
        method: 'GET',
        url: 'http://localhost:3000/task/category',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          // console.log(data)
          this.categories = data
        })
        .catch(err => console.log(err))
    }

  },
  created() {
    if (localStorage.getItem('token')) {
      this.page = 'dashboard'
      this.fetchingData()
      this.fetchingDataCategory()
    } else {
      this.page = 'login'
    }
  }
}
</script>

<style lang="scss">


$appbar-height: 40px;
$navbar-height: 50px;
$list-width: 300px;
$gap: 10px;
$scrollbar-thickness: 17px;
$list-header-height: 36px;
$list-footer-height: 36px;
// Misc
$list-border-radius: 5px;
$card-border-radius: 3px;
// Colors
$board-bg-color: #0079bf;
$appbar-bg-color: #0067a3;
$list-bg-color: #e2e4e6;


.body {
  margin: 0;

  font-family: sans-serif;
  font-size: 14px;
  line-height: 1.3em;
  height: 100vh;

  display: grid;
  grid-template-rows: $appbar-height $navbar-height 1fr;
  //grid-template-columns: 100%;

  background-color: $board-bg-color;
  color: #eee;
}
</style>
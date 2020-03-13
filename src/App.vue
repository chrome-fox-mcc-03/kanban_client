<template>
  <div>
    <landing-page
      @changeCurrentPage="changeCurrentPage"
      @changeStatus="changeStatus"
      :currentPage="currentPage"
    ></landing-page>
    <dashboard
    @logout="logout"
    :currentPage="currentPage"></dashboard>
  </div>
</template>

<script>
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";

export default {
  name: "App",
  data(){
    return{
      currentPage: 'landingPage',
      isLogin: false
    }
  },
  components: {
    LandingPage,
    Dashboard
  },
  methods: {
    changeCurrentPage: function(page) {
      this.currentPage = page
    },

    changeStatus: function(status) {
      this.isLogin = status
    },

    checkLogin: function() {
      let token = localStorage.getItem('token')
      if(token) {
        this.currentPage = 'dashboard'
      }
      else {
        this.currentPage = 'landingPage'
      }
    },

    logout: function() {
      localStorage.clear()
      this.currentPage = 'landingPage'
    }
  },
  created() {
    this.checkLogin()
  },
  mounted() {
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container");

    signUpButton.addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
    });
  },
  watch: {
    currentPage(val) {
      this.currentPage = val
    }
  }
  
};
</script>
<style>
</style>
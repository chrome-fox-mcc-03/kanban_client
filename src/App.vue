<template>
  <div>
    <landing
      v-show="!isLogin"
      id="landing-page"
      @loginSubmit="loginCheck"
      :password2="password2"
      @regSubmit="registerSubmit"
    ></landing>

    <dashboard v-show="isLogin" id="dashboard" @logoutBtn="logout()"></dashboard>
  </div>
</template>

<script>
import Landing from "./views/Landing.vue";
import Dashboard from "./views/Dashboard.vue";

export default {
  name: "App",
  components: {
    Landing,
    Dashboard
  },
  data() {
    return {
      msg: "halo vue",
      isLogin: false,
      password2: "123456"
    };
  },
  methods: {
    loginCheck(email, password) {
      console.log(email);
      console.log(password);

      if (email == "hilmi@mail.com") {
        this.isLogin = true;
      }
    },
    logout() {
      this.isLogin = false;
    },
    registerSubmit(data) {
      console.log(data);
    }
  }
};
</script>

<style>
</style>
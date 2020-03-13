<template>
  <div>
    <landing
      v-show="!isLogin"
      id="landing-page"
      @loginSubmit="loginCheck"
      @regSubmit="registerSubmit"
    ></landing>
    <dashboard
      v-show="isLogin"
      id="dashboard"
      @logoutBtn="logout()"
      @getTasks="getTasks()"
      :tasks="tasks"
    ></dashboard>
  </div>
</template>

<script>
import axios from "axios";
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
      tasks: []
    };
  },
  methods: {
    loginCheck(email, password) {
      axios({
        method: "post",
        url: "http://localhost:3000/users/login",
        data: {
          email,
          password
        }
      })
        .then(result => {
          console.log(result.data);
          localStorage.setItem("token", result.data);
          this.isLogin = true;
        })
        .catch(err => {
          let error = err.response.data;
          console.log(error);
        });
    },
    logout() {
      localStorage.removeItem("token");
      this.isLogin = false;
      this.getTasks();
    },
    registerSubmit(data) {
      let { name, email, password } = data;
      axios({
        method: "post",
        url: "http://localhost:3000/users/register",
        data: {
          name,
          email,
          password
        }
      })
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    getTasks() {
      axios({
        method: "get",
        url: "http://localhost:3000/tasks",
        headers: {
          token: localStorage.getItem("token")
        }
      }).then(({ data }) => {
        this.tasks = data;
        console.log(data);
      });
    }
  },
  created() {
    if (localStorage.getItem("token")) {
      this.isLogin = true;
      this.getTasks();
    }
  }
};
</script>

<style>
</style>
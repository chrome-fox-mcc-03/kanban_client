<template>
  <div>
    <app-header
      @onRegister="onRegister"
      @onLogin="onLogin"
      :appStatus="appStatus"
      @onLogout="onLogout"
    ></app-header>
    <app-main :appStatus="appStatus" :listData="listData" :taskData="taskData"></app-main>
    <app-footer></app-footer>
  </div>
</template>

<script>
import axios from "./config/axios";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
export default {
  name: "app",
  data() {
    return {
      appStatus: false,
      listData: [],
      taskData: []
    };
  },
  components: {
    "app-header": Header,
    "app-main": Main,
    "app-footer": Footer
  },
  methods: {
    onRegister(payload) {
      axios({
        method: "POST",
        url: "/register",
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(response => {
          this.appStatus = false;
        })
        .catch(err => {
          console.log(err);
        });
    },

    onLogin(payload) {
      this.appStatus = "";
      axios({
        method: "POST",
        url: "/login",
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(response => {
          localStorage.setItem("access_token", response.data.access_token);
          this.appStatus = true;
        })
        .catch(err => {
          console.log(err);
        });
    },

    onLogout(value) {
      this.appStatus = value;
    },

    onAddList(payload) {
      axios({
        method: "POST",
        url: "/lists/addCategory"
      })
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
    },

    onFetchAllList() {
      axios({
        method: "GET",
        url: "/lists"
      })
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
    },

    onCreateList(payload) {
      axios({
        method: "POST",
        url: "/lists/create"
      })
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
    },

    onCreateTask(payload) {
      axios({
        method: "POST",
        url: "/lists/create"
      })
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    if (localStorage.access_token) {
      this.appStatus = true;
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Raleway:600");
@import url("https://fonts.googleapis.com/css?family=Raleway:400,800");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Raleway", Arial, sans-serif;
}

html {
  font-size: 16px;
}

body {
  min-width: 100%;
  background: url("https://cdn.shopify.com/s/files/1/0879/0542/products/pc1478_da4bcba9-c02d-40bd-88c6-8b32119d8933@2x.jpg?v=1513990783")
    no-repeat center;
  background-size: cover;
  background-attachment: fixed;
}
</style>

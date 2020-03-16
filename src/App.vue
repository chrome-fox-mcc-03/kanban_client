<template>
  <div>
    <div class="loading-container" v-if="isLoading">
      <div class="loading-screen">
        <lottie-player
          src="https://assets7.lottiefiles.com/datafiles/WKqC5QWz9GiZnlm/data.json"
          background="transparent"
          speed="1"
          style="width: 300px; height: 300px;"
          loop
          autoplay
        ></lottie-player>
      </div>
    </div>

    <login @showTask="showTask" @login="login" @signup="showSignup" v-if="page == 'login'"></login>
    <signup @showTask="showTask" @signup="login" @showLogin="showLogin" v-else-if="page == 'signup'"></signup>
    <home @logout="logout" :taskData="taskData" @showTask="showTask" v-else></home>
  </div>
</template>

<script>
import axios from "axios";
import Login from "./views/login";
import Signup from "./views/signup";
import Home from "./views/home";

export default {
  name: "App",
  data() {
    return {
      page: "login",
      taskData: [],
      isLoading: false
    };
  },
  components: {
    Login,
    Signup,
    Home
  },
  methods: {
    login(page) {
      this.page = page;
    },
    showSignup(page) {
      this.page = page;
    },
    showLogin(page) {
      this.page = page;
    },
    logout(page) {
      this.page = page;
    },
    showTask() {
      this.isLoading = true
      axios({
        method: "GET",
        url: "https://polar-dusk-39759.herokuapp.com/tasks",
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.taskData = data;
        })
        .catch(error => {
          this.$toasted.error("MASUK");
        })
        .finally(_ => {
          this.isLoading = false
        });
    }
  },
  created: function() {
    if (localStorage.token) {
      this.page = "home";
      this.showTask();
    } else {
      this.page = "login";
    }
  }
};
</script>

<style scoped>
.loading-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  margin: auto;
  top: 0%;
  width: 300px;
  /* background-color: rgba(255, 255, 255, 0.5); */
  border-radius: 300px;
}
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.loading-screen lottie-player {
  margin: auto;
}
</style>
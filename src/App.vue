<template>
  <div>
    <landing
      v-show="!isLogin"
      id="landing-page"
      @loginSubmit="loginCheck"
      @regSubmit="registerSubmit"
      @loginGoogle="loginGoogle"
    ></landing>
    <dashboard
      v-show="isLogin"
      id="dashboard"
      @logoutBtn="logout()"
      @getTasks="getTasks()"
      :tasks="tasks"
    ></dashboard>
    <div class="loading-container" v-if="isLoading">
      <div class="loading-screen">
        <lottie-player
          src="https://assets2.lottiefiles.com/datafiles/WKqC5QWz9GiZnlm/data.json"
          background="transparent"
          speed="1"
          style="width: 300px; height: 300px;"
          loop
          autoplay
        ></lottie-player>
      </div>
    </div>
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
      isLoading: false,
      isLogin: false,
      tasks: []
    };
  },
  methods: {
    loginCheck(email, password) {
      this.isLoading = true;
      axios({
        method: "post",
        url: "http://localhost:3000/users/login",
        data: {
          email,
          password
        }
      })
        .then(result => {
          localStorage.setItem("token", result.data);
          this.isLogin = true;
          this.getTasks();
          this.$toasted.success("You are already logged in");
        })
        .catch(err => {
          let error = err.response.data;
          this.$toasted.error(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    logout() {
      localStorage.removeItem("token");
      this.$toasted.success("You have successfully logged out!");
      this.isLogin = false;
    },
    registerSubmit(data) {
      let { name, email, password } = data;
      this.isLoading = true;
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
          localStorage.setItem("token", result.data);
          this.isLogin = true;
          this.$toasted.success("You are already Joined & logged in");
        })
        .catch(err => {
          let error = err.response.data;
          for (let i = 0; i < error.length; i++) {
            this.$toasted.error(error[i].message);
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    getTasks() {
      this.isLoading = true;
      axios({
        method: "get",
        url: "http://localhost:3000/tasks",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.tasks = data;
        })
        .catch(err => {
          let error = err.response.data;
          for (let i = 0; i < error.length; i++) {
            this.$toasted.error(error[i].message);
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    loginGoogle() {
      this.isLogin = true;
      this.getTasks();
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
.loading-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  margin: auto;
  top: 35%;
  width: 300px;
  background-color: rgba(255, 255, 255, 0.5);
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
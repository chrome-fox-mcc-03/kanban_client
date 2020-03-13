<template>
  <div>
    <LandingPage
      v-show="!isLoggedIn"
      @create-new-user="createNewUser"
      @login-user="loginUser"
      @google-signin="gSignIn"
      @reset-register="resetRegister"
      :isRegistered="isRegistered"
    ></LandingPage>
    <main v-show="isLoggedIn">
      <Navbar @log-out="logOut"></Navbar>
      <KanbanBoard
        :tasks="tasks"
        :categories="categories"
        @delete-task="deleteTask"
        @next-task="nextTask"
        @back-task="backTask"
        @create-task="createTask"
        @edit-task="editTask"
      ></KanbanBoard>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "./components/Navbar";
import KanbanBoard from "./components/KanbanBoard";
import LandingPage from "./components/LandingPage";

export default {
  name: "App",
  data() {
    return {
      tasks: [],
      categories: [],
      isLoggedIn: false,
      isRegistered: false
    };
  },
  components: {
    Navbar,
    KanbanBoard,
    LandingPage
  },
  methods: {
    fetchData() {
      axios({
        method: "GET",
        url: "http://localhost:3000/tasks",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.tasks = data.data;
        })
        .catch(err => console.log(err.response));
    },
    fetchCategories() {
      axios({
        method: "GET",
        url: "http://localhost:3000/categories",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.categories = data.data;
        })
        .catch(err => console.log(err.response));
    },
    deleteTask(id) {
      axios({
        method: "DELETE",
        url: `http://localhost:3000/tasks/${id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.$vToastify.success(data.msg);
          this.fetchData();
        })
        .catch(err => {
          this.$vToastify.error(
            `${err.response.data.msg}`,
            `Error: ${err.response.data.status}`
          );
        });
    },
    nextTask(id) {
      axios({
        method: "POST",
        url: `http://localhost:3000/tasks/${id}/next`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.fetchData();
          this.$vToastify.success(data.msg);
        })
        .catch(err => {
          this.$vToastify.error(
            `${err.response.data.msg}`,
            `Error: ${err.response.data.status}`
          );
        });
    },
    backTask(id) {
      axios({
        method: "POST",
        url: `http://localhost:3000/tasks/${id}/back`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.fetchData();
          this.$vToastify.success(data.msg);
        })
        .catch(err => {
          this.$vToastify.error(
            `${err.response.data.msg}`,
            `Error: ${err.response.data.status}`
          );
        });
    },
    createTask(data) {
      let { title, description, CategoryId } = data;
      axios({
        method: "POST",
        url: `http://localhost:3000/tasks`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          title,
          description,
          CategoryId
        }
      })
        .then(({ data }) => {
          this.fetchData();
          this.$vToastify.success(data.msg);
        })
        .catch(err => {
          this.$vToastify.error(
            `${err.response.data.msg}`,
            `Error: ${err.response.data.status}`
          );
        });
    },
    editTask(data) {
      let { id, title, description } = data;
      axios({
        method: "PUT",
        url: `http://localhost:3000/tasks/${id}`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          title,
          description
        }
      })
        .then(({ data }) => {
          this.fetchData();
          this.$vToastify.success(data.msg);
        })
        .catch(err => {
          this.$vToastify.error(
            `${err.response.data.msg}`,
            `Error: ${err.response.data.status}`
          );
        });
    },
    createNewUser(data) {
      let { username, email, password } = data;
      axios({
        method: "POST",
        url: "http://localhost:3000/register",
        data: {
          email,
          password,
          username
        }
      })
        .then(({ data }) => {
          this.$vToastify.success("Proceed to Login");
          this.isRegistered = true;
        })
        .catch(err => {
          this.$vToastify.error(
            `${err.response.data.msg}`,
            `Error: ${err.response.data.status}`
          );
        });
    },
    loginUser(data) {
      let { email, password } = data;
      axios({
        method: "POST",
        url: "http://localhost:3000/login",
        data: {
          email,
          password
        }
      })
        .then(({ data }) => {
          this.$vToastify.success("Successfully logged in");
          localStorage.setItem("token", data.token);
          this.isLoggedIn = true;
          this.fetchData();
          this.fetchCategories();
        })
        .catch(err => {
          this.$vToastify.error(
            `${err.response.data.msg}`,
            `Error: ${err.response.data.status}`
          );
        });
    },
    logOut() {
      this.isLoggedIn = false;
      let auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function() {});
      this.$vToastify.success("Please come back soon");
    },
    gSignIn(data) {
      let { google_token } = data;
      axios({
        method: "POST",
        url: "http://localhost:3000/gsignin",
        headers: {
          google_token
        }
      })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          this.isLoggedIn = true;
          this.fetchData();
          this.fetchCategories();
          this.$vToastify.success("Google sign-in success");
        })
        .catch(err => {
          this.$vToastify.error(
            `${err.response.data.msg}`,
            `Error: ${err.response.data.status}`
          );
        });
    },
    resetRegister() {
      this.isRegistered = false;
    }
  },
  created: function() {
    if (localStorage.getItem("token")) {
      this.fetchData();
      this.fetchCategories();
      this.isLoggedIn = true;
    }
  }
};
</script>

<style>
body {
  background: url("/assets/rpgbackground.gif") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
  -o-background-size: cover;
}

main {
  margin-top: 80px;
}
</style>

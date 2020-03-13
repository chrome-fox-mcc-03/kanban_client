<template>
  <div>
    <LandingPage
      v-show="!isLoggedIn"
      @create-new-user="createNewUser"
      @login-user="loginUser"
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
      isLoggedIn: false
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
          this.fetchData();
        })
        .catch(err => console.log(err.response));
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
        })
        .catch(err => console.log(err.response));
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
        })
        .catch(err => console.log(err.response));
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
        })
        .catch(err => console.log(err.response));
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
        })
        .catch(err => console.log(err.response));
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
        .then(({ data }) => {})
        .catch(err => console.log(err.response));
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
          localStorage.setItem("token", data.token);
          this.isLoggedIn = true;
          this.fetchData();
          this.fetchCategories();
        })
        .catch(err => console.log(err.response));
    },
    logOut() {
      this.isLoggedIn = false;
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

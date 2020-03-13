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
        url: "https://lit-peak-87737.herokuapp.com/tasks",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.tasks = data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    fetchCategories() {
      axios({
        method: "GET",
        url: "https://lit-peak-87737.herokuapp.com/categories",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.categories = data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteTask(id) {
      axios({
        method: "DELETE",
        url: `https://lit-peak-87737.herokuapp.com/tasks/${id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.$vToastify.success(data.msg);
          this.fetchData();
        })
        .catch(err => {
          console.log(err);
        });
    },
    nextTask(id) {
      axios({
        method: "POST",
        url: `https://lit-peak-87737.herokuapp.com/tasks/${id}/next`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.fetchData();
        })
        .catch(err => {
          console.log(err);
        });
    },
    backTask(id) {
      axios({
        method: "POST",
        url: `https://lit-peak-87737.herokuapp.com/tasks/${id}/back`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.fetchData();
        })
        .catch(err => {
          console.log(err);
        });
    },
    createTask(data) {
      let { title, description, CategoryId } = data;
      axios({
        method: "POST",
        url: `https://lit-peak-87737.herokuapp.com/tasks`,
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
        .catch(err => {
          console.log(err);
        });
    },
    editTask(data) {
      let { id, title, description } = data;
      axios({
        method: "PUT",
        url: `https://lit-peak-87737.herokuapp.com/tasks/${id}`,
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
        .catch(err => {
          console.log(err);
        });
    },
    createNewUser(data) {
      let { username, email, password } = data;
      axios({
        method: "POST",
        url: "https://lit-peak-87737.herokuapp.com/register",
        data: {
          email,
          password,
          username
        }
      })
        .then(({ data }) => {
          this.isRegistered = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    loginUser(data) {
      let { email, password } = data;
      axios({
        method: "POST",
        url: "https://lit-peak-87737.herokuapp.com/login",
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
        .catch(err => {
          console.log(err);
        });
    },
    logOut() {
      this.isLoggedIn = false;
      let auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function() {});
    },
    gSignIn(data) {
      let { google_token } = data;
      axios({
        method: "POST",
        url: "https://lit-peak-87737.herokuapp.com/gsignin",
        headers: {
          google_token
        }
      })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          this.isLoggedIn = true;
          this.fetchData();
          this.fetchCategories();
        })
        .catch(err => {
          console.log(err);
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

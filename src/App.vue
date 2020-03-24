<template>
  <div>
    <Loading v-if="isLoading"></Loading>
    <div>
      <LandingPage
        v-show="!isLoggedIn"
        @create-new-user="createNewUser"
        @login-user="loginUser"
        @google-signin="gSignIn"
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
  </div>
</template>

<script>
import hitAPI from "./helpers/axios";
import Navbar from "./components/Navbar";
import KanbanBoard from "./components/KanbanBoard";
import LandingPage from "./components/LandingPage";
import Loading from "./components/Loading";
import Swal from "sweetalert2";

export default {
  name: "App",
  data() {
    return {
      tasks: [],
      categories: [],
      isLoggedIn: false,
      isRegistered: false,
      isLoading: false,
      Toast: Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: toast => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        }
      })
    };
  },
  components: {
    Navbar,
    KanbanBoard,
    LandingPage,
    Loading
  },
  methods: {
    fetchData() {
      this.isLoading = true;
      hitAPI
        .get("/tasks", {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          this.tasks = data.data;
        })
        .catch(() => {
          this.Toast.fire({
            icon: "error",
            title: "Fetching data failed"
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    fetchCategories() {
      this.isLoading = true;
      hitAPI
        .get("/categories", {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          this.categories = data.data;
        })
        .catch(() => {
          this.Toast.fire({
            icon: "error",
            title: "Fetching categories failed"
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    deleteTask(id) {
      this.isLoading = true;
      hitAPI
        .delete(`/tasks/${id}`, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          this.Toast.fire({
            icon: "success",
            title: data.msg
          });
          this.fetchData();
        })
        .catch(({ response }) => {
          if (response.data.msg.length > 0) {
            response.data.msg.forEach(el => {
              this.Toast.fire({
                icon: "error",
                title: el
              });
            });
          } else {
            this.Toast.fire({
              icon: "error",
              title: response.data.msg
            });
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    nextTask(id) {
      this.isLoading = true;
      hitAPI
        .post(
          `/tasks/${id}/next`,
          {},
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          this.Toast.fire({
            icon: "success",
            title: data.msg
          });
          this.fetchData();
        })
        .catch(({ response }) => {
          this.Toast.fire({
            icon: "error",
            title: response.data.msg
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    backTask(id) {
      this.isLoading = true;
      hitAPI
        .post(
          `/tasks/${id}/back`,
          {},
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          this.Toast.fire({
            icon: "success",
            title: data.msg
          });
          this.fetchData();
        })
        .catch(({ response }) => {
          this.Toast.fire({
            icon: "error",
            title: response.data.msg
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    createTask(data) {
      this.isLoading = true;
      let { title, description, CategoryId } = data;
      hitAPI
        .post(
          `/tasks`,
          {
            title,
            description,
            CategoryId
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          this.Toast.fire({
            icon: "success",
            title: data.msg
          });
          this.fetchData();
        })
        .catch(({ response }) => {
          if (response.data.msg.length > 0) {
            response.data.msg.forEach(el => {
              this.Toast.fire({
                icon: "error",
                title: el
              });
            });
          } else {
            this.Toast.fire({
              icon: "error",
              title: response.data.msg
            });
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    editTask(data) {
      this.isLoading = true;
      let { id, title, description } = data;
      hitAPI
        .put(
          `/tasks/${id}`,
          {
            title,
            description
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          this.Toast.fire({
            icon: "success",
            title: data.msg
          });
          this.fetchData();
        })
        .catch(({ response }) => {
          if (response.data.msg.length > 0) {
            response.data.msg.forEach(el => {
              this.Toast.fire({
                icon: "error",
                title: el
              });
            });
          } else {
            this.Toast.fire({
              icon: "error",
              title: response.data.msg
            });
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    createNewUser(data) {
      this.isLoading = true;
      let { username, email, password } = data;
      hitAPI
        .post(`/register`, {
          email,
          password,
          username
        })
        .then(({ data }) => {
          this.Toast.fire({
            icon: "success",
            title: "Successfully created a new account"
          });
          this.loginUser({
            email,
            password
          });
        })
        .catch(({ response }) => {
          response.data.msg.forEach(el => {
            this.Toast.fire({
              icon: "error",
              title: el
            });
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    loginUser(data) {
      this.isLoading = true;
      let { email, password } = data;
      hitAPI
        .post(`/login`, {
          email,
          password
        })
        .then(({ data }) => {
          this.Toast.fire({
            icon: "success",
            title: "Successfully logged in "
          });
          localStorage.setItem("token", data.token);
          this.isLoggedIn = true;
          this.fetchData();
          this.fetchCategories();
        })
        .catch(({ response }) => {
          this.Toast.fire({
            icon: "error",
            title: response.data.msg
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    logOut() {
      this.Toast.fire({
        icon: "success",
        title: "Successfully logged out"
      });
      this.isLoggedIn = false;
      let auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function() {});
    },
    gSignIn(data) {
      this.isLoading = true;
      let { google_token } = data;
      hitAPI
        .post(
          `/gsignin`,
          {},
          {
            headers: {
              google_token
            }
          }
        )
        .then(({ data }) => {
          this.Toast.fire({
            icon: "success",
            title: "Successfully logged in through google"
          });
          localStorage.setItem("token", data.token);
          this.isLoggedIn = true;
          this.fetchData();
          this.fetchCategories();
        })
        .catch(({ response }) => {
          this.Toast.fire({
            icon: "error",
            title: response.data.msg
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
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
  background: url("../assets/rpgbackground.gif") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
  -o-background-size: cover;
}
</style>

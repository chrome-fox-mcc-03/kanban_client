<template>
  <div>
    <LandingPage
      @onSignInSuccess="onSignInSuccess"
      @userLogin1="login"
      @userSignup1="signup"
      v-if="isLogin === false"
    ></LandingPage>

    <Navbar
      :token="token"
      :isLogin="isLogin"
      @addNewTask="createTask"
      @dropTaskFromList="deleteTask"
      @logout="logout"
    ></Navbar>

    <Dashboard
      :categories="categories"
      :tasks="sortedTasks"
      @editTaskById="editTask"
      v-if="isLogin === true"
      @deleteTaskById5="deleteTask"
    ></Dashboard>
  </div>
</template>

<script>
const URL = "http://localhost:3000";
import Navbar from "./components/Navbar.vue";
import LandingPage from "./components/LandingPage.vue";
import Dashboard from "./components/Dashboard.vue";
export default {
  name: "App",
  data() {
    return {
      // token: "",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJ0ZXN0QG1haWwuY29tIiwiaWF0IjoxNTg0MDkyOTI0fQ.bc0sRTcQrgurWTe3g5JN-5tPKZfHRfaUs9B05vZGVcY",
      taskCreds: {
        id: 0,
        title: "",
        category: "requested",
        due_date: new Date(),
        UserId: 0
      },
      userCreds: {
        email: "",
        password: ""
      },
      sortedTasks: {
        backlog: [],
        requested: [],
        wip: [],
        done: []
      },
      tasks: [],
      task: [],
      isLogin: false,
      categories: ["backlog", "requested", "wip", "done"]
    };
  },
  components: {
    Navbar,
    Dashboard,
    LandingPage
  },
  methods: {
    login(dataFromChild) {
      const email = dataFromChild.email;
      const password = dataFromChild.password;

      axios({
        method: "post",
        url: `${URL}/users/login`,
        data: {
          email: email,
          password: password
        }
      })
        .then(response => {
          console.log("MASUK LOGIN CLIENT");
          console.log("RESPONSE IS");
          console.log(response);
          console.log("RESPONSE TOKEN IS");
          console.log(response.data.token);
          localStorage.setItem("token", response.data.token); // GENERATE TOKEN
          this.token = response.data.token;
          this.isLogin = true;
          this.fetchTasks();
        })
        .catch(err => {
          // arr = JSON.parse(err.responseText).message
          console.log(err.response.data);
          this.$toasted.error(err.response.data.message, {
            position: "bottom-center"
          });
        });
    },

    signup(dataFromChild) {
      const email = dataFromChild.email;
      const password = dataFromChild.password;

      axios({
        method: "post",
        url: `${URL}/users/signup`,
        data: {
          email: email,
          password: password
        }
      })
        .then(response => {
          console.log("MASUK SIGNUP CLIENT");
          console.log("RESPONSE IS");
          console.log(response);
          // this.$toasted.success(`Welcome to Kanban, ${email}`)
        })
        .catch(err => {
          // arr = JSON.parse(err.responseText).message
          console.log(err.response.data);
          this.$toasted.error(err.response.data.message, {
            position: "bottom-center"
          });
        });
    },

    fetchTasks() {
      console.log(">>ENTERING APP.VUE FETCH TASKS<<");
      axios({
        method: "get",
        url: `${URL}/tasks/`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(response => {
          console.log("FETCHING SUCCESS");
          console.log(response);
          this.sortedTasks = response.data.data;
          this.tasks = response.allData;
        })
        .catch(err => {
          console.log(err);
          console.log("FETCHING FAILS");
          console.log(err.response.data);
          this.$toasted.error(err.response.data.message, {
            position: "bottom-center"
          });
        });
    },

    createTask(dataFromChild) {
      console.log(">>ENTERING APP.VUE CREATE TASK<<");
      console.log("CHILD EMITS");
      console.log(dataFromChild);
      axios({
        method: "post",
        url: `${URL}/tasks/`,
        headers: {
          // token : localStorage.getItem('token')
          token: this.token
        },
        data: dataFromChild
      })
        .then(response => {
          console.log("CREATE SUCCESS");
          this.task = response.data;
          console.log(this.task);
          this.fetchTasks();
        })
        .catch(err => {
          console.log("CREATE FAILS");
          console.log(err.response);
          // console.log(error.response.data.errorMessage);
          this.$toasted.error(err.response.data.message, {
            position: "bottom-center"
          });
        });
    },

    editTask(dataFromChild) {
      console.log(">>ENTERING APP.VUE EDIT TASK<<");
      console.log("CHILD EMITS");
      console.log(dataFromChild);
      axios({
        method: "put",
        url: `${URL}/tasks/${dataFromChild.id}`,
        headers: {
          // token : localStorage.getItem('token')
          token: this.token
        },
        data: dataFromChild
      })
        .then(response => {
          console.log("EDIT SUCCESS");
          this.task = response.data;
          console.log(this.task);
          this.fetchTasks();
        })
        .catch(err => {
          console.log("EDIT FAILS");
          // console.log(error.response.data.errorMessage);
          console.log(err.response.data);
          // this.$toasted.error(err.response.data.errorMessage, {
          //     position: 'bottom-center'
          // })
          this.$toasted.error(err.response.data.message, {
            position: "bottom-center"
          });
        });
    },

    deleteTask(dataFromChild) {
      console.log(">>ENTERING APP.VUE DELETE TASK<<");
      console.log("CHILD EMITS");
      console.log(dataFromChild);
      axios({
        method: "delete",
        url: `${URL}/tasks/${dataFromChild}`,
        headers: {
          // token : localStorage.getItem('token')
          token: this.token
        },
        data: dataFromChild
      })
        .then(({ data }) => {
          console.log("DELETE SUCCESS");
          this.fetchTasks();
        })
        .catch(err => {
          console.log("DELETE FAILS");
          // console.log(error.response.data.errorMessage);
          console.log(err.response.data);
          this.$toasted.error(err.response.data.message, {
            position: "bottom-center"
          });
        });
    },

    logout(dataFromChild) {
      this.isLogin = false;
      localStorage.clear();
    },

    onSignInSuccess(id_token) {
      console.log("ENTERING GOOGLE AUTH");
      axios({
        method: "post",
        url: `${URL}/users/googleLogin`,
        headers: {
          token: id_token
        }
      })
      .then(response => {
          console.log("GOOGLE OAUTH SUCCESS");
          localStorage.setItem('token', response.token)
          this.isLogin = true
          this.fetchTasks()

      })
      .catch(err => {
          console.log("GOOGLE OAUTH FAILS");
          // console.log(error.response.data.errorMessage);
          console.log(err.response.data);
          this.$toasted.error(err.response.data.message, {
            position: "bottom-center"
          });
      })
    }
  },
  created() {
    // if(localStorage.getItem("token")) {
    //     this.isLogin = true
    //     this.fetchTasks()
    // } else {
    //     this.isLogin = false
    // }
    this.fetchTasks();
  }
};
</script>

<style>
</style>
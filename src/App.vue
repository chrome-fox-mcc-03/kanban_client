<template>
  <div class="container-fluid pt-3 custom-margin">
    <div class="hm-gradient">
      <main>
        <!--Navbar -->
        <nav class="mb-4 navbar navbar-expand-lg navbar-dark cyan">
          <a class="navbar-brand font-bold" href="#">Kanban</a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent-4"
            aria-controls="navbarSupportedContent-4"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent-4">
            <ul class="navbar-nav ml-auto">
              <li v-if="!isLogin" class="nav-item">
                <a class="nav-link" href="#" @click="changePage('signup')">
                  <i class="fas fa-user-plus"></i> Sign Up
                  <span class="sr-only">(current)</span>
                </a>
              </li>
              <li v-if="!isLogin" class="nav-item">
                <a class="nav-link" href="#" @click="changePage('login')">
                  <i class="fa fa-user"></i> Login
                  <span class="sr-only">(current)</span>
                </a>
              </li>
              <li v-if="isLogin" class="nav-item">
                <a class="nav-link" href="#" @click="changePage('project')">
                  Project
                  <span class="sr-only">(current)</span>
                </a>
              </li>

              <li v-if="isLogin" class="nav-item">
                <a class="nav-link" href="#" @click="logout()">
                  Logout
                  <span class="sr-only">(current)</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <!--/.Navbar -->
      </main>
    </div>
    <CategoryPage
      @editTask="editTask"
      :projectId="projectId"
      @changeCategoryId="changeCategoryId"
      v-if="page === 'category'"
      @showCollaboration="showCollaboration"
    ></CategoryPage>
    <CollaborationPage :projectId="projectId" v-else-if="page === 'collaboration'"></CollaborationPage>
    <LoginPage v-else-if="page === 'login'" @login="login" @loginWithGoogle="loginWithGoogle"></LoginPage>
    <ProjectPage
      @changeProjectId="changeProjectId"
      v-else-if="page === 'project'"
      @showCollaboration="showCollaboration"
    ></ProjectPage>
    <SignUpPage v-else-if="page === 'signup' " @signup="signup" @loginWithGoogle="loginWithGoogle"></SignUpPage>
    <AddTask
      @changePage="changePage"
      :projectId="projectId"
      :categoryId="categoryId"
      v-else-if="page === 'addtask'"
    ></AddTask>
    <EditTask @changePage="changePage" :task="dataEditTask" v-else-if="page === 'edittask'"></EditTask>
    <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="fullPage"></loading>
  </div>
</template>

<script>
import axios from "axios";
import CategoryPage from "./components/CategoryPage";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import ProjectPage from "./components/ProjectPage";
import AddTask from "./components/AddTask";
import EditTask from "./components/EditTask";
import CollaborationPage from "./components/CollaborationPage";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "App",
  components: {
    CategoryPage,
    LoginPage,
    SignUpPage,
    ProjectPage,
    AddTask,
    EditTask,
    CollaborationPage,
    Loading
  },
  data() {
    return {
      page: "project",
      projectId: null,
      categoryId: null,
      dataEditTask: {},
      isLogin: false,
      isLoading: false,
      fullPage: true
    };
  },
  created: function() {
    this.isLogin = !!localStorage.getItem("access_token");
    if (this.isLogin) {
      this.changePage("project");
    } else {
      this.changePage("login");
    }
  },
  methods: {
    changePage: function(page) {
      this.page = page;
    },
    login(data) {
      this.isLoading = true;
      axios
        .post("https://still-basin-93678.herokuapp.com/users/login", data)
        .then(result => {
          localStorage.setItem("access_token", result.data.access_token);
          this.isLogin = true;
          this.isLoading = false;

          let status = {
            title: "Logged in!",
            body: "You're successfully logged in.",
            type: "success",
            canTimeout: true,
            duration: 2000
          };
          this.$vToastify.success(status);
          this.changePage("project");
        })
        .catch(err => {
          let status = {
            title: "Failed!",
            body: err.response.data.error,
            type: "error",
            canTimeout: true,
            duration: 2000
          };
          this.$vToastify.error(status);
          this.isLoading = false;
        });
    },

    signup(data) {
      this.isLoading = true;
      axios
        .post("https://still-basin-93678.herokuapp.com/users/register", data)
        .then(result => {
          localStorage.setItem("access_token", result.data.access_token);
          this.isLogin = true;
          this.isLoading = false;
          let status = {
            title: "Registered!",
            body: "You're successfully registered.",
            type: "success",
            canTimeout: true,
            duration: 2000
          };
          this.$vToastify.success(status);
          this.changePage("project");
        })
        .catch(err => {
          let status = {
            title: "Failed!",
            body: "Error registering.",
            type: "error",
            canTimeout: true,
            duration: 2000
          };
          this.$vToastify.error(status);
        });
    },
    loginWithGoogle(page) {
      this.page = page;
      this.isLogin = true;
    },
    logout() {
      this.isLogin = false;
      this.isLoading = false;
      localStorage.removeItem("access_token");
      this.changePage("login");
    },
    changeProjectId(projectId) {
      this.projectId = projectId;
      this.page = "category";
    },
    changeCategoryId(categoryId) {
      this.categoryId = categoryId;
      this.page = "addtask";
    },
    editTask(task) {
      this.dataEditTask = task;
      this.changePage("edittask");
    },
    showCollaboration(projectId) {
      this.projectId = projectId;
      this.changePage("collaboration");
    }
  }
};
</script>


 <style>
* {
  margin: 0;
  padding: 0;
}

@import url(https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css);
@import url(https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.4.3/css/mdb.min.css);

.hm-gradient {
  background-image: linear-gradient(
    to top,
    #c25d6e 0%,
    #c25d6e 99%,
    #e3eeff 100%
  );
}
.darken-grey-text {
  color: #2e2e2e;
}

.navbar .dropdown-menu a:hover {
  color: #616161 !important;
}
.darken-grey-text {
  color: #2e2e2e;
}
</style>
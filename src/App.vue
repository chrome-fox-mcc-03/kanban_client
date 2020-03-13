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
              <li class="nav-item active">
                <a class="nav-link" href="#" @click="changePage('signup')">
                  <i class="fas fa-user-plus"></i> Sign Up
                  <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" @click="changePage('login')">
                  <i class="fa fa-user"></i> Login
                  <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" @click="changePage('project')">
                  Project
                  <span class="sr-only">(current)</span>
                </a>
              </li>

              <li class="nav-item">
                <a class="nav-link" href="#" @click="logout()">
                  Logout
                  <span class="sr-only">(current)</span>
                </a>
              </li>
              <!-- <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink-4" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-user"></i> Profile </a>
                            <div class="dropdown-menu dropdown-menu-right dropdown-cyan" aria-labelledby="navbarDropdownMenuLink-4">
                                <a class="dropdown-item" href="#">My account</a>
                                <a class="dropdown-item" href="#">Log out</a>
                            </div>
              </li>-->
            </ul>
          </div>
        </nav>
        <!--/.Navbar -->
      </main>
    </div>

    <CategoryPage @editTask="editTask" :projectId="projectId" @changeCategoryId="changeCategoryId" v-if="page === 'category'"></CategoryPage>
    <LoginPage v-else-if="page === 'login'" @login="login"></LoginPage>
    <ProjectPage @changeProjectId="changeProjectId" v-else-if="page === 'project'"></ProjectPage>
    <SignUpPage v-else-if="page === 'signup' " @signup="signup"></SignUpPage>
    <AddTask :projectId="projectId" :categoryId="categoryId" v-else-if="page === 'addtask'"></AddTask>
    <EditTask :task="dataEditTask" v-else-if="page === 'edittask'"></EditTask>
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

export default {
  name: "App",
  components: {
    CategoryPage,
    LoginPage,
    SignUpPage,
    ProjectPage,
    AddTask,
    EditTask
  },
  data() {
    return {
      page: "project",
      projectId: null,
      categoryId: null,
      dataEditTask: {}
    };
  },
  created: function() {
    if (localStorage.getItem("access_token")) {
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
      axios
        .post("http://localhost:3000/users/login", data)
        .then(result => {
          localStorage.setItem("access_token", result.data.access_token);
          this.changePage("project");
        })
        .catch(err => {
          console.log(err);
        });
    },

    signup(data) {
      axios
        .post("http://localhost:3000/users/register", data)
        .then(result => {
          localStorage.setItem("access_token", result.data.access_token);
          // console.log("masuk dahan", result);
          this.changePage("project");
        })
        .catch(err => {
          console.log(err);
        });
    },

    logout() {
      localStorage.clear();
      this.changePage("login");
    },
    changeProjectId(projectId) {
      this.projectId = projectId;
      this.page = "category";
    },
    changeCategoryId(categoryId){
      this.categoryId =categoryId
      this.page = 'addtask'
    },
    editTask(task) {
      this.dataEditTask = task
      this.changePage('edittask')
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
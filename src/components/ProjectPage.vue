<template>
  <div>
    <h3 class="font-weight-light">Project Board Desi</h3>
    <!-- CONTAINER -->
    <div class="row flex-row flex-sm-nowrap py-3">
      <div
        class="col-sm-4 col-md-3"
        v-for="collaboration in collaborations"
        :key="collaboration.id"
      >
        <div class="card">
          <div class="card-body">
            <button class="close" @click="deleteProject(collaboration.Project.id)">×</button>
            <h6 class="card-title text-uppercase text-truncate py-2">{{collaboration.Project.name}}</h6>
            <!-- <button class="btn btn-primary">View</button> -->
            <button
              class="btn btn-primary"
              v-on:click="changeProjectId(collaboration.Project.id)"
            >View</button>
            <button
              class="btn btn-primary"
              v-on:click="showCollaboration(collaboration.Project.id)"
            >Collaborator</button>
          </div>
        </div>
      </div>
    </div>
    <!-- line -->
    <div class="row">
      <div class="col-sm-4 col-md-3">
        <h6>Add new Project</h6>
        <form @submit.prevent="formSubmit">
          <div class="form-group">
            <label>Project Name</label>
            <input type="text" class="form-control" placeholder="Enter project name" v-model="name" />
          </div>
          <button class="btn btn-primary">Save</button>
        </form>
      </div>
    </div>
    <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="fullPage"></loading>
  </div>
</template>

<script>
import axios from "axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  name: "ProjectPage",
  data: function() {
    return {
      name: "",
      collaborations: [],
      isLoading: false,
      fullPage: true
    };
  },
  components: {
    Loading
  },
  created: function() {
    this.loadProjects();
  },
  methods: {
    loadProjects() {
      this.isLoading = true;
      axios
        .get("https://still-basin-93678.herokuapp.com/projects", {
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        .then(({ data }) => {
          this.collaborations = data;
          this.isLoading = false;
        })
        .catch(err => {
          let status = {
            title: "Failed!",
            body: err.response,
            type: "error",
            canTimeout: true,
            duration: 2000
          };
          this.$vToastify.error(status);
        });
    },
    formSubmit: function() {
      this.isLoading = true;
      let data = {
        name: this.name
      };

      axios
        .post("https://still-basin-93678.herokuapp.com/projects", data, {
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        .then(result => {
          this.isLoading = false;

          let status = {
            title: "Project Created!",
            body: "Project successfully created.",
            type: "success",
            canTimeout: true,
            duration: 2000
          };
          this.$vToastify.success(status);
          this.loadProjects();
          this.name = "";
        })
        .catch(err => {
          this.isLoading = false;
          let status = {
            title: "Failed!",
            body: err.response,
            type: "error",
            canTimeout: true,
            duration: 2000
          };
          this.$vToastify.error(status);
        });
    },
    deleteProject(projectId) {
      this.isLoading = true;
      axios
        .delete(
          `https://still-basin-93678.herokuapp.com/projects/${projectId}`,
          {
            headers: {
              access_token: localStorage.getItem("access_token")
            }
          }
        )
        .then(result => {
          this.isLoading = false;
          this.loadProjects();

          let status = {
            title: "Project Deleted!",
            body: "Project successfully deleted.",
            type: "success",
            canTimeout: true,
            duration: 2000
          };
          this.$vToastify.success(status);
        })
        .catch(err => {
          this.isLoading = false;
          let status = {
            title: "Failed!",
            body: err.response,
            type: "error",
            canTimeout: true,
            duration: 2000
          };
          this.$vToastify.error(status);
        });
    },
    changeProjectId(projectId) {
      this.$emit("changeProjectId", projectId);
    },
    showCollaboration(projectId) {
      this.$emit("showCollaboration", projectId);
    }
  }
};
</script>

<style scoped>
.card.draggable {
  margin-bottom: 1rem;
  cursor: grab;
}

.items {
  padding: 1rem;
  background: whitesmoke;
}

.droppable:hover {
  background-color: var(--secondary);
}

.custom-margin {
  padding: 0 100px;
}
</style>
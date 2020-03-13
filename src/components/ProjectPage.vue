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
            <button class="btn btn-primary" v-on:click="changeProjectId(collaboration.Project.id)">View</button>
          </div>
        </div>
      </div>
    </div>
    <!-- line -->
    <div class="row">
      <div class="col-sm-4 col-md-3">
        <h6>Add new Project</h6>
        <form @submit.prevent="formSubmit">
          <label>Project Name</label>
          <input type="text" v-model="name" />
          <button class="btn btn-secondary">Save</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ProjectPage",
  data: function() {
    return {
      name: "",
      collaborations: []
    };
  },
  created: function() {
    axios
      .get("http://localhost:3000/projects", {
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
      .then(({ data }) => {
        this.collaborations = data;
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    formSubmit: function() {
      let data = {
        name: this.name
      };

      axios
        .post("http://localhost:3000/projects", data, {
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        .then(result => {
          console.log("Project Created!");
          // console.log(result);
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteProject(projectId) {
      axios
        .delete(`http://localhost:3000/projects/${projectId}`, {
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        .then(result => {
          console.log("berhasil", result);
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeProjectId(projectId) {
      this.$emit('changeProjectId', projectId)
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
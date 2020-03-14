<template>
  <div>
    <h3 class="font-weight-light">Collaborator</h3>
    <!-- CONTAINER -->
    <div class="row flex-row flex-sm-nowrap py-3">
      <div
        class="col-sm-4 col-md-3"
        v-for="collaboration in collaborations"
        :key="collaboration.id"
      >
        <div class="card">
          <div class="card-body">
            <button class="close" @click="deleteCollaborator(collaboration.UserId, collaboration.ProjectId)">×</button>
            <h6 class="card-title text-uppercase text-truncate py-2">{{collaboration.User.name}}</h6>
            <h6 class="card-subtitle text-truncate py-2">{{collaboration.User.email}}</h6>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-3">
        <h6>Add Collaborator</h6>
        <form @submit.prevent="formSubmit">
          <label>Collaborator Email</label>
          <input type="text" v-model="email" />
          <button class="btn btn-secondary">Add</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CollaborationPage",
  data: function() {
    return {
      email: "",
      collaborations: []
    };
  },
  props: ["projectId"],
  created: function() {
    axios
      .get(`http://localhost:3000/collaborations/${this.projectId}`, {
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
        ProjectId: this.projectId,
        email: this.email
      };

      axios
        .post("http://localhost:3000/collaborations", data, {
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        .then(result => {
          console.log("Collaboration Created!");
          console.log(result);
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteCollaborator(userId, projectId) {

      axios
        .delete(`http://localhost:3000/collaborations?UserId=${userId}&ProjectId=${projectId}`, {
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        .then(result => {
          console.log("berhasil didelete", result);
        })
        .catch(err => {
          console.log(err);
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
<template>
  <div>
    <div class="card draggable" draggable="true" v-for="task in tasks" :key="task.id">
      <div class="card">
        <div class="card-body p-2 border-left border-success">
          <div class="card-title">
            <a href class="lead font-weight-light">{{task.title}}</a>
          </div>
          <p>{{task.description}}</p>
          <button @click="editTask(task)" class="btn btn-secondary">Edit</button>
          <button @click="deleteTask(task.id)" class="btn btn-secondary">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Card",
  data: function() {
    return {
      tasks: []
    };
  },
  props: ["projectId", "categoryId"],
  created: function() {
    axios
      .get(
        `http://localhost:3000/tasks?ProjectId=${this.projectId}&CategoryId=${this.categoryId}`,
        {
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        }
      )

      .then(({ data }) => {
        this.tasks = data.tasks;
        console.log(this.tasks);
      });
  },
  methods: {
    editTask(task) {
      this.$emit("editTask", task);
    },
    deleteTask(id) {
      axios
        .delete(`http://localhost:3000/tasks/${id}`, {
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        .then(response => {
          console.log(response.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>
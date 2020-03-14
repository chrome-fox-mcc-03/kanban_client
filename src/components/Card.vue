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
          <div class="card-title">
            
            <i
              v-if="!firstPosition"
              @click="changeCategory(prevCategoryId, task.id)"
              class="fa fa-angle-left button-arrow"
            ></i>
            <i
              v-if="!lastPosition"
              @click="changeCategory(nextCategoryId, task.id)"
              class="fa fa-angle-right float-right button-arrow"
            ></i>
          </div>
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
  props: [
    "projectId",
    "categoryId",
    "firstPosition",
    "lastPosition",
    "prevCategoryId",
    "nextCategoryId"
  ],
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
    changeCategory(categoryId, taskId) {
      console.log(categoryId)
      axios
        .patch(
          `http://localhost:3000/tasks/${taskId}`,
          { CategoryId: categoryId },
          {
            headers: {
              access_token: localStorage.getItem("access_token")
            }
          }
        )
        .then(response => {
          console.log(response.data);
        })
        .catch(err => {
          console.log(err);
        });
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
.button-arrow {
  cursor: pointer;
}
</style>
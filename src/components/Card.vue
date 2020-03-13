<template>
  <div class="box">
    <div class="media-content">
      <div class="content">
        <div class="delete-div">
          <span>{{filterTask.title}}</span>
          <button v-on:click="deleteTask(filterTask.id)" class="delete" aria-label="delete"></button>
        </div>
      </div>
    </div>
    <div class="footer-todo">
      <span>
        <!-- <i class="fas fa-pen fa-lg tombol"></i> -->
      </span>
      <span v-on:click="moveLeft(filterTask)">
        <i class="fas fa-caret-square-left fa-lg tombol"></i>
      </span>
      <span v-on:click="moveRight(filterTask)">
        <i class="fas fa-caret-square-right fa-lg tombol"></i>
      </span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Card",
  props: ["filterTask", "category"],
  methods: {
    getTasks() {
      this.$emit("getTasks");
    },
    deleteTask(taskId) {
      axios({
        url: `https://limitless-fjord-07254.herokuapp.com/tasks/delete/${taskId}`,
        method: "delete",
        headers: {
          token: localStorage.getItem("token")
        }
      }).then(result => {
        this.getTasks();
        this.$toasted.success(`You have successfully delete a task`);
      });
    },
    moveRight(filterTask) {
      let taskId = filterTask.id;

      let category = "";
      if (filterTask.category == "BACKLOG") {
        category = "TODO";
      } else if (filterTask.category == "TODO") {
        category = "ON PROGRESS";
      } else if (filterTask.category == "ON PROGRESS") {
        category = "COMPLETED";
      } else {
        category = "COMPLETED";
      }
      axios({
        url: `https://limitless-fjord-07254.herokuapp.com/tasks/update/${taskId}`,
        method: "put",
        data: {
          category
        },
        headers: {
          token: localStorage.getItem("token")
        }
      }).then(result => {
        this.getTasks();
        this.$toasted.success(`You have successfully move task to ${category}`);
      });
    },
    moveLeft(filterTask) {
      let taskId = filterTask.id;
      console.log("masukk");
      let category = "";
      if (filterTask.category == "COMPLETED") {
        category = "ON PROGRESS";
      } else if (filterTask.category == "ON PROGRESS") {
        category = "TODO";
      } else if (filterTask.category == "TODO") {
        category = "BACKLOG";
      } else {
        category = "BACKLOG";
      }

      axios({
        url: `https://limitless-fjord-07254.herokuapp.com/tasks/update/${taskId}`,
        method: "put",
        data: {
          category
        },
        headers: {
          token: localStorage.getItem("token")
        }
      }).then(result => {
        this.getTasks();
        this.$toasted.success(`You have successfully move task to ${category}`);
      });
    }
  }
};
</script>

<style>
</style>
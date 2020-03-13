<template>
  <section>
    <div class="nav-menu">
      <navbar @logoutBtn="logout()"></navbar>
    </div>
    <div class="form-addTask">
      <form v-on:submit.prevent="addTask">
        <input v-model="newTask" class="input" type="text" placeholder="Add Todo" />
        <button class="button">Add Todo</button>
      </form>
    </div>
    <div class="container list-content">
      <div class="columns">
        <card-layout
          v-for="(category, index) in categories"
          :key="index"
          :category="category"
          :tasks="tasks"
          @getTasks="getTasks()"
        ></card-layout>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import Navbar from "../components/Navbar";
import CardLayout from "../components/CardLayout";
export default {
  name: "Dashboard",
  props: ["tasks"],
  data: function() {
    return {
      newTask: "",
      categories: ["BACKLOG", "TODO", "ON PROGRESS", "COMPLETED"]
    };
  },
  components: {
    Navbar,
    CardLayout
  },
  methods: {
    logout() {
      this.$emit("logoutBtn");
    },
    getTasks() {
      this.$emit("getTasks");
    },
    addTask() {
      console.log(this.newTask);
      axios({
        url: "http://localhost:3000/tasks/add",
        method: "post",
        data: {
          title: this.newTask
        },
        headers: {
          token: localStorage.getItem("token")
        }
      }).then(result => {
        this.getTasks();
        this.newTask = "";
        this.$toasted.success("Success add new task");
      });
    }
  }
};
</script>

<style>
</style>
<template>
  <section>
    <div class="nav-menu">
      <navbar @logoutBtn="logout()"></navbar>
    </div>
    <div class="form-addTask">
      <form>
        <input class="input" type="text" placeholder="Add Todo" />
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
        ></card-layout>
      </div>
    </div>
  </section>
</template>

<script>
import Navbar from "../components/Navbar";
import CardLayout from "../components/CardLayout";
export default {
  name: "Dashboard",
  props: ["tasks"],
  data: function() {
    return {
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
    }
  }
};
</script>

<style>
</style>
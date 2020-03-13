<template>
  <div class="column layout-column">
    <div class="header">{{category}}</div>
    <div class="layout-box">
      <card
        v-for="filterTask in filterCategory"
        :key="filterTask.id"
        :filterTask="filterTask"
        :category="category"
      ></card>
    </div>
  </div>
</template>

<script>
import Card from "./Card";
export default {
  name: "CardLayout",
  props: ["category", "tasks"],
  computed: {
    filterCategory: function() {
      return this.tasks.filter(
        filterTask => filterTask.category == this.category
      );
    }
  },
  components: {
    Card
  }
};
</script>

<style>
</style>
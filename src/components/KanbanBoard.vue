<template>
  <div class="container-fluid row mt-5">
    <KanbanColumn
      v-for="category in categories"
      :key="category.id"
      :data="tasks"
      :category="category.name"
      :categoryId="category.id"
      @delete-task="deleteTask"
      @next-task="nextTask"
      @back-task="backTask"
      @create-task="createTask"
      @edit-task="editTask"
    ></KanbanColumn>
  </div>
</template>

<script>
import KanbanColumn from "./KanbanColumn";

export default {
  name: "KanbanBoard",
  components: {
    KanbanColumn
  },
  props: ["tasks", "categories"],
  methods: {
    deleteTask(id) {
      this.$emit("delete-task", id);
    },
    nextTask(id) {
      this.$emit("next-task", id);
    },
    backTask(id) {
      this.$emit("back-task", id);
    },
    createTask(data) {
      this.$emit("create-task", data);
    },
    editTask(data) {
      this.$emit("edit-task", data);
    }
  }
};
</script>
<style scoped></style>

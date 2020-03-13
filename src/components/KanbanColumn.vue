<template>
  <div
    class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12 justify-content-start d-flex flex-column"
  >
    <div class="card column">
      <div
        class="card-header d-flex justify-content-between"
        style="background-color:#f67575; opacity: 0.85;"
      >
        <h5>{{ category }}</h5>
      </div>
      <div class="card-body d-flex flex-column column-body px-2 py-1">
        <!-- a single kanban is this -->
        <KanbanCard
          v-for="(element, i) in tasks"
          :key="i"
          :data="element"
          @delete-task="deleteTask"
          @next-task="nextTask"
          @back-task="backTask"
          @edit-task="editTask"
        ></KanbanCard>
        <!-- a single kanban is this -->
        <KanbanAdd
          v-show="isAdding"
          @close-add="closeAdd"
          @create-task="createTask"
        ></KanbanAdd>
      </div>
    </div>
    <button
      type="button"
      style="width: 380px; background-color: #f67575; border-color: #f67575; opacity: 0.85;"
      @click="showAdd"
    >
      <i class="fas fa-plus"></i>
    </button>
  </div>
</template>

<script>
import KanbanCard from "./KanbanCard";
import KanbanAdd from "./KanbanAdd";

export default {
  name: "KanbanColumn",
  data() {
    return {
      isAdding: false
    };
  },
  components: {
    KanbanCard,
    KanbanAdd
  },
  props: ["data", "category", "categoryId"],
  computed: {
    tasks() {
      return this.data.filter(e => e.CategoryId === this.categoryId);
    }
  },
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
    showAdd() {
      this.isAdding = true;
    },
    closeAdd() {
      this.isAdding = false;
    },
    createTask(data) {
      this.$emit("create-task", {
        title: data.title,
        description: data.description,
        CategoryId: this.categoryId
      });
      this.isAdding = false;
    },
    editTask(data) {
      this.$emit("edit-task", data);
    }
  }
};
</script>

<style>
.column {
  width: 380px;
  height: min-content;
  max-height: 85vh;
  background-color: rgba(30, 178, 166, 0.5);
}

.column-body {
  overflow: scroll;
}
</style>

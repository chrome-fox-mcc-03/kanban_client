<template>
  <div class="card kanban">
    <div class="card-header">
      <div class="row justify-content-between d-flex px-2">
        <div>
          <h5>Add a new task</h5>
        </div>
        <div>
          <i class="fas fa-times" @click="closeAdd"></i>
        </div>
      </div>
    </div>
    <div class="card-body pt-1 pb-2">
      <form @submit.prevent="createTask">
        <div class="form-group">
          <label for="add-title">Title</label>
          <input
            type="text"
            class="form-control"
            id="add-title"
            placeholder="Enter title"
            v-model="title"
          />
        </div>
        <div class="form-group">
          <label for="add-description">Desciption</label>
          <textarea
            v-model="description"
            class="form-control"
            id="add-description"
            placeholder="Enter description"
            rows="3"
          ></textarea>
        </div>
        <input
          type="submit"
          class="btn btn-primary btn-block"
          value="Add"
        >
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "KanbanAdd",
  data() {
    return {
      title: "",
      description: ""
    };
  },
  methods: {
    closeAdd() {
      this.$emit("close-add");
    },
    createTask() {
      this.$emit("create-task", {
        title: this.title,
        description: this.description
      });
      this.title = null,
      this.description = null
    }
  }
};
</script>

<style scoped>
.kanban {
  margin-top: 4px;
  margin-bottom: 4px;
  border-left: 10px #ffa34d solid;
  background-color: white;
}

.avatar {
  border-radius: 50%;
}

p {
  text-align: right;
}

i {
  cursor: pointer;
}
</style>

<template>
  <div>
    <div v-if="!isEditing" class="card kanban">
      <div class="card-header">
        <div class="row justify-content-between d-flex pl-2">
          <div>
            <h5>{{ data.title }}</h5>
          </div>
        </div>
      </div>
      <div class="card-body pt-1 pb-0">
        <p class="card-text">
          {{ data.description }}
        </p>
        <div
          class="d-flex justify-content-end my-auto mt-0 py-1"
          style="border-top: 1px solid black;"
        >
          <div class="pr-2">
            <p class="card-text">{{ data.User.username }}</p>
          </div>
          <img
            :src="data.User.url"
            alt="Avatar"
            class="avatar"
            width="30"
            height="30"
          />
        </div>
      </div>
      <div
        class="btn-group btn-group-sm pd-0"
        role="group"
        aria-label="Basic example"
        style="width: 100%;"
      >
        <button type="button" @click="backTask">
          <i class="fas fa-backward"></i>
        </button>
        <button type="button" @click="showEdit">
          <i class="fas fa-edit"></i>
        </button>
        <button type="button" @click="deleteTask">
          <i class="fas fa-trash-alt"></i>
        </button>
        <button type="button" @click="nextTask">
          <i class="fas fa-forward"></i>
        </button>
      </div>
    </div>
    <KanbanEdit
      v-else
      :data="data"
      @close-edit="closeEdit"
      @edit-task="editTask"
    ></KanbanEdit>
  </div>
</template>

<script>
import KanbanEdit from "./KanbanEdit";

export default {
  name: "KanbanCard",
  data() {
    return {
      isEditing: false
    };
  },
  props: ["data"],
  methods: {
    deleteTask() {
      this.$emit("delete-task", this.data.id);
    },
    nextTask() {
      this.$emit("next-task", this.data.id);
    },
    backTask() {
      this.$emit("back-task", this.data.id);
    },
    showEdit() {
      this.isEditing = true;
    },
    closeEdit() {
      this.isEditing = false;
    },
    editTask(data) {
      this.$emit("edit-task", data);
      this.closeEdit();
    }
  },
  components: {
    KanbanEdit
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

button {
  width: 25%;
  background-color: #d4f8e8;
}
</style>

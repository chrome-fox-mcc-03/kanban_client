<template>
  <form @submit.prevent="editTask">
    <div class="card kanban">
      <div class="card-header">
        <div class="row justify-content-between d-flex px-2">
          <div>
            <input type="text" v-model="title" />
          </div>
          <div>
            <i class="fas fa-times" @click="closeEdit"></i>
          </div>
        </div>
      </div>
      <div class="card-body pt-1 pb-0">
        <textarea
          v-model="description"
          class="form-control"
          id="add-description"
          placeholder="Enter description"
          rows="3"
          style="text-align:right"
        ></textarea>
        <br />
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
      <button class="btn btn-primary btn-block" type="submit">
        <i class="fas fa-edit"></i>
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "KanbanEdit",
  props: ["data"],
  data() {
    return {
      title: this.data.title,
      description: this.data.description
    };
  },
  methods: {
    closeEdit() {
      this.$emit("close-edit");
    },
    editTask() {
      this.$emit("edit-task", {
        id: this.data.id,
        title: this.title,
        description: this.description
      });
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

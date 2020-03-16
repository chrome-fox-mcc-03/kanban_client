<template>
  <div>
    <form @submit.prevent="formAddTask">
      <div class="form-group">
        <label>Title</label>
        <input
          type="text"
          class="form-control"
          placeholder="Enter title"
          v-model="title"
        />
      </div>
      <div class="form-group">
        <label>Description</label>
        <input
          type="text"
          class="form-control"
          placeholder="Enter description"
          v-model="description"
        />
      </div>
      <button type="submit" class="btn btn-primary">Add Task</button>
    </form>
    <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="fullPage"></loading>
  </div>
</template>

<script>
import axios from "axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  name: "AddTask",
  props: ["projectId", "categoryId"],
  data: function() {
    return {
      title: "",
      description: "",
      isLoading: false,
      fullPage: true
    };
  },
  components: {
    Loading
  },
  methods: {
    formAddTask: function() {
      this.isLoading = true;
      let data = {
        title: this.title,
        description: this.description,
        ProjectId: this.projectId,
        CategoryId: this.categoryId
      };
      axios
        .post("https://still-basin-93678.herokuapp.com/tasks", data, {
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        .then(result => {
          let status = {
            title: "Task Created!",
            body: "Task successfully created.",
            type: "success",
            canTimeout: true,
            duration: 2000
          };
          this.$vToastify.success(status);
          this.$emit("changePage", "category");
          this.isLoading = false;
        })
        .catch(err => {
          this.isLoading = false;
          let status = {
            title: "Failed!",
            body: err.response,
            type: "error",
            canTimeout: true,
            duration: 2000
          };
          this.$vToastify.error(status);
        });
    }
  }
};
</script>

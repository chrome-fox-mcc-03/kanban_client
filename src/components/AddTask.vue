<template>
  <div>
    <form @submit.prevent="formAddTask">
      <label for>Title</label>
      <input type="text" v-model="title" />
      <br />
      <label for>Description</label>
      <input type="text" v-model="description" />
      <br />
      <button>Add</button>
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
        .post("http://localhost:3000/tasks", data, {
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        .then(result => {
          this.$emit('changePage', 'category')
          this.isLoading = false;
        })
        .catch(err => {
          this.isLoading = false;
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>
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
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddTask",
  props: ["projectId", "categoryId"],
  data: function() {
    return {
      title:"",
      description: ""
    };
  },
  methods: {
    formAddTask: function() {
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
          console.log("Task Created!");
          console.log(result);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>
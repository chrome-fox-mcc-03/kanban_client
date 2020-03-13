<template>
  <div class="create">
    <div class="create-form">
      <form class="box" @submit.prevent="updating()">
        <!-- registering -->
        <h1>Create Kanban</h1>
        <input type="text" v-model="task" placeholder="Card Title"> 
        <input type="text" v-model="description" placeholder="Your description">
        <input type="submit" value="POST!">
    </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      task: '',
      description: ''
    }
  },
  methods: {
    updating(id) {
      Axios({
        method: "PUT",
        url: `http://localhost:3000/task/${id}`,
        headers: {token: localStorage.getItem('token')},
        data: {task: this.task, }
      })
    }
  }

}
</script>

<style>

</style>
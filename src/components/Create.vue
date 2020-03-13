<template>
  <div class="create">
    <div class="create-form">
      <form class="box" @submit.prevent="postTask">
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
import Axios from 'axios'
export default {
  name: 'create',
  data() {
    return {
      task: '',
      description: ''
    }
  },
  methods: {
    postTask() {
      // const task = Task.task
      // const description = Task.description
      Axios({
        method: 'POST',
        url: 'http://localhost:3000/task',
        data: {task: this.task, description: this.description},
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(data => {
          console.log(5555)
          this.$emit('changingPage', 'dashboard')
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style lang="scss" scoped>

.create {
  .create-form{
    .box {
      width: 300px;
      padding: 40px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #191919;
      text-align: center;
      h1 {
        color: white;
        text-transform: uppercase;
        font-weight: 500;
      };
      input[type="text"],
      input[type="password"] {
        border: 0;
        background: none;
        display: block;
        margin: 20px auto;
        text-align: center;
        border: 2px solid cadetblue;
        padding: 14px 10px;
        width: 200px;
        outline: none;
        color: white;
        border-radius: 24px;
        transition: 0.25s;
        &:focus{
          width: 280px;
          border-color: cadetblue;
        };
      };
      input[type="submit"]{
        border: 0;
        background: none;
        display: block;
        margin: 20px auto;
        text-align: center;
        border: 2px solid rgb(4, 88, 84);
        padding: 14px 40px;
        outline: none;
        color: white;
        border-radius: 24px;
        transition: 0.25s;
        cursor: pointer;
        &:hover{
          background: cadetblue;
        }
      }
    }
  }
}



</style>
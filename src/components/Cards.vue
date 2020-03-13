<template>
  <div class="card">
    <div class="card-body">
      <h3>{{ task.title }}</h3>
      <hr />
      <p>{{ task.description }}</p>
    </div>
    <div id="card-bar">
      <div>
        <i @click="moveLeft(task.id)" class="far fa-arrow-alt-circle-left fa-2x"></i>
      </div>
      <div>
        <i @click="deleteTask(task.id)" class="far fa-trash-alt fa-2x"></i>
      </div>
      <div>
        <i @click="moveRight(task.id)" class="far fa-arrow-alt-circle-right fa-2x"></i>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Card',
  props: ['category', 'task'],
  methods: {
    deleteTask: function(id) {
      axios({
        method: "DELETE",
        url: `http://localhost:3000/task/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(() => {
        this.$emit('fetch')
      })
    },

    moveLeft: function(id) {
      let taskId = id
      let data = {
        id: taskId,
        category: this.category
      }
      this.$emit('moveLeft', data)
    },

    moveRight: function(id) {
      let taskId = id
      let data = {
        id: taskId,
        category: this.category
      }
      this.$emit('moveRight', data)
    }
  }
};
</script>

<style>
</style>
<template>
  <ul class="list-items">
    <li v-show="showInput" @click="inputToggle">{{ task.title }}</li>
    <li v-show="!showInput">
     <input type="text" placeholder="Edit title..."  
              @blur="inputBlur"  
              @keyup.enter="editTitle(task.id, task.CategoryId)" 
              v-model="taskTitle"
              >
    </li>
      {{ task }}
  </ul>
</template>

<script>
import axios from 'axios';
export default {
  name: 'task',
  props: ['task'],
  data() {
    return {
      showInput: true,
      taskTitle: '',
    };
  },
  methods: {
    inputToggle() {
      this.showInput = false;
    },
    inputBlur() {
      this.showInput = true;
    },
    editTitle(taskId, categoryId) {
      console.log(taskId, categoryId, '<<<<<<<<<<<<<');
      axios({
        url: `http://localhost:3000/task/${taskId}`,
        method: 'PUT',
        headers: {
          access_token: localStorage.getItem('access_token'),
        },
        data: {
          title: this.taskTitle,
          CategoryId: categoryId,
        }
      })
        .then(result => {
          this.$emit('changeTaskTitle', result.data.title)
          this.showInput = true;
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
}
</script>

<style scoped>
input {
  border: none;
  margin: 0;
  width: 100%;
  height: 100%
}
</style>
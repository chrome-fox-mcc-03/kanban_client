<template>
  <div class="list">

        <h3 class="list-title" @click="hideInput" v-show="!showInput"> {{ category.name }} </h3>
        <input ref="inputTitle" type="text" placeholder="Edit category name..."  
              @blur="hideTitle" v-show="showInput" v-model="categoryName" 
              @keyup.enter="editCategoryName(category.id)" 
              class="list-title list-title-edit">
        <task v-for="(el, id) in taskList" :key="id" :task="el"></task>
        <input class="add-card-btn btn addCardInput" placeholder="Add a card..." 
              @keyup.enter="addTask(category.id)" 
              v-model="title">
      </div>
</template>

<script>
import task from './task';
import axios from 'axios';
export default {
  name: 'CategoryList',
  components: {
    task,
  },
  props: ['category'],
  data() {
    return {
      title: '',
      id: '',
      categoryName: '',
      showInput: false,
      taskList: this.category.Tasks
    }
  },
  methods: {
    addTask(id) {
      axios({
        url: 'http://localhost:3000/task',
        method: 'POST',
        headers: {
          access_token: localStorage.getItem('access_token'),
        },
        data: {
          title: this.title,
          CategoryId: id,
        }
      })
        .then(result => {
          this.taskList.push(result.data);
          this.title = '';
        })
        .catch(err => {
          console.log(err);
          this.title = '';
        })
    },
    editCategoryName(id) {
      axios({
        url: `http://localhost:3000/category/${id}`,
        method: 'PUT',
        headers: {
          access_token: localStorage.getItem('access_token'),
        },
        data: {
          name: this.categoryName,
        }
      })
        .then(result => {
          console.log(result.data);
          this.categoryName = '';
          this.showInput = false;
        })
        .catch(err => {
          console.log(err.response);
        })
    },
    hideInput() {
      this.showInput = true;
    },
    hideTitle() {
      this.showInput = false;
    }
  },
}
</script>

<style scoped>
  .addCardInput {
    color: #3b3b3b;
  }

  ::placeholder {
  color: #9e9e9e;
}
</style>
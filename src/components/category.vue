<template>
   <section class="lists-container">
     <category-list v-for="(el, i) in category" :key="i" :category="el"></category-list>
      <!-- <div class="list">

        <h3 class="list-title"> </h3>
        <input type="text" value="Tasks to Do" class="list-title list-title-edit">

     
        <task></task>
        <button class="add-card-btn btn">Add a card</button>
        <input class="add-card-btn btn" placeholder="Add a card">
      </div> -->

      <input class="add-list-btn btn" placeholder="Add new category..." v-model="categoryName" @keyup.enter="addCategory">
    </section>
  
</template>

<script>
import axios from 'axios';
import CategoryList from './categoryList';
export default {
  name: 'CategoryBoard',
  components: {
    CategoryList,
  },
  data() {
    return {
      category: '',
      categoryName: '',
    }
  },
  methods: {
    addCategory() {
      axios({
        url: 'http://localhost:3000/category',
        method: 'POST',
        headers: {
          access_token: localStorage.getItem('access_token'),
        },
        data: {
          name: this.categoryName,
        }
      })
        .then(result => {
          this.category.push(result.data)
          this.categoryName = '';
        })
        .catch(err => {
          console.log(err.response);
        })
    }
  },
  created() {
    axios({
      method: 'GET',
      url: 'http://localhost:3000/category',
      headers: {
        access_token: localStorage.getItem('access_token'),
      }
    })
      .then(result => {
        this.category = result.data;
      })
  }
}
</script>

<style scoped>
::placeholder {
  color: #cfcfcf;
}

input {
  box-shadow: 0 2px 6px 0 rgba(117, 114, 114, 0.2);
  color: #ffffff
}
</style>
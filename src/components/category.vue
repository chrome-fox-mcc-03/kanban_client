<template>
   <section class="lists-container">
     <category-list v-for="(el, i) in category" :key="el.id" :categoryId="el.id" :category="el" 
        @changeCategoryName="category[i].name = $event"
        @addedNewTask="category[i].Tasks.push($event)"
        @deleteCategory="category.splice(i, 1)"
        ></category-list>
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
        console.log(result.data);
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
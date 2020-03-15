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
      let loader = this.$loading.show({
                  // Optional parameters
                  container: this.fullPage ? null : this.$refs.formContainer,
                  canCancel: true,
                  onCancel: this.onCancel,
                });
      axios({
        url: 'https://secure-mountain-34530.herokuapp.com/category',
        method: 'POST',
        headers: {
          access_token: localStorage.getItem('access_token'),
        },
        data: {
          name: this.categoryName,
        }
      })
        .then(result => {
          loader.hide();
          this.category.push(result.data)
          this.categoryName = '';
        })
        .catch(err => {
          loader.hide();
           this.$toasted.show(err.response.data.errors[0], { 
                              theme: "bubble", 
                              position: "top-right", 
                              duration : 3000
                            });
        })
    }
  },
  created() {
    let loader = this.$loading.show({
                  // Optional parameters
                  container: this.fullPage ? null : this.$refs.formContainer,
                  canCancel: true,
                  onCancel: this.onCancel,
                });
    axios({
      method: 'GET',
      url: 'https://secure-mountain-34530.herokuapp.com/category',
      headers: {
        access_token: localStorage.getItem('access_token'),
      }
    })
      .then(result => {
        loader.hide();
        this.category = result.data;
      })
      .catch(err => {
        loader.hide();
        this.$toasted.show(err.response.data.errors[0], { 
                              theme: "bubble", 
                              position: "top-right", 
                              duration : 3000
                            });
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
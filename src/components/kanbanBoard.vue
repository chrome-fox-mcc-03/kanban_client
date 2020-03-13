<template>
  <div class="container-fluid">
      <h1> Kanban Board </h1>
      <div class="row">
        <div v-for="category in categoryList" :key="category.id"  class="col-md-2 category">
              <categoryVue :category="category"/>
            </div>
      </div>
  </div>
</template>
<script>
import Axios from 'axios'
import categoryVue from './category.vue'
export default {
  name : 'KanbanBoard',
  components : {
    categoryVue
  },
  data : () => {
    return {
      categoryList : []
    }
  },
  methods : {
    fetchData(){
      Axios({
        url : "http://localhost:3000/board",
        method : 'GET',
        headers : {
          token : localStorage.getItem('token')
        }
      })
        .then(({data})=> {
          this.categoryList = data
        })
        .catch(({err})=> {
          console.log(err)
        })
    }
  },
  created(){
    this.fetchData()
    // console.log('di kanban', this.categoryList)
  }
}
</script>
<style>
.category {
  color: black;
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 10px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
</style>
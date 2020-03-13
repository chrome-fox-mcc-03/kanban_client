<template>
  <div>
    <nav>
    <navbar :currentPage="currentPage" @changePage="changePage" ></navbar> 
    </nav>
    <div >
      <login v-if="currentPage == 'login'" @changePage="changePage"></login>
      <regitser v-else-if="currentPage == 'register'" @changePage="changePage"></regitser>
      <add v-else-if="currentPage == 'add'" @changePage="changePage"></add>
      <edit v-else-if="currentPage == 'edit'" :edit="edit" @changePage="changePage"></edit>
      <frame v-else-if="currentPage == 'frame'" @changePage="changePage" @edited="edited"></frame>
    </div>
  </div>
</template>

<script>
import navbar from './components/navbar'
import login from './components/login'
import regitser from './components/register'
import frame from './components/frame'
import add from './components/add'
import edit from './components/edit'
import test from './components/testDragable'
export default {
  name: "app",
  components: {
    navbar,
    login,
    regitser,
    frame,
    add,
    edit,
    test
  },
  data : () => {
    return{
      currentPage : 'login',
      edit : {}
    }
  },
  methods: {
    changePage (event) {
      this.currentPage = event
    },
    edited (data) {
      this.edit = data
    }
  },
  created () {
    if(localStorage.token) {
      this.currentPage = 'frame'
    }else{
      this.currentPage = 'login'
    }
  }
}
</script>

<style>

</style>
<template>
    <div id="main">
        <nav class="navbar navbar-light bg-light">
            <button class="btn btn-primary navbar-brand home" v-if="!checklogin">Home</button>
            <button class="btn btn-danger navbar-brand logout" @click="logout" v-else-if="checklogin">Logout</button>
        </nav>
    </div>
</template>

<script>
export default {
  name: 'Navbar',
  props: [
      'login'
  ],
  data(){
      return { 
        projectId : localStorage.getItem('projectId'),
        checklogin : this.login
      }
  },
  methods: {
    logout(){
        this.login = false
        localStorage.clear()
        this.$emit('logoutSuccess')
    },
    changeProject(){
        localStorage.clear('projectId')
    },
    check (){
        if(localStorage.getItem('token')) {
          this.checklogin = true
      }else{
          this.checklogin = false
      }
    }
  },
  created() {
      this.check()
  }
}
</script>

<style scoped>
    .home{
        color: aliceblue !important
    }

</style>
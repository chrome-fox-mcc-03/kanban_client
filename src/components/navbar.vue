<template>
    <div id="main">
        <nav v-if="!login" class="navbar navbar-light bg-light">
            <button class="btn btn-primary navbar-brand home">Home</button>
        </nav>
        <nav v-else class="navbar navbar-light bg-light">
            <button class="btn btn-primary navbar-brand home">Home</button>
            <button class="btn btn-danger navbar-brand logout" @click="logout">Logout</button>
        </nav>
    </div>
</template>

<script>
export default {
  name: 'Navbar',
  props: { 

  },
  data(){
      return {
        login: false
      }
  },
  methods: {
    loginProcess(){
        this.login = true
    },
    logout(){
        this.login = false
        this.$emit('logout')
    }
  }
}
</script>

<style scoped>
    .home{
        color: aliceblue !important
    }

</style>
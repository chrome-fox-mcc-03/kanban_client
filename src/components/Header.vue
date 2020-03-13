<template>
  <nav id="navbar-land">
    <div class="right-nav-land">
      <a class="title">SweatBan</a>
      <a>Home</a>
    </div>
    <div class="left-nav-land">
      <button 
        @click="showFormLogin"
        >Login</button>

    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      
    }
  },
  methods : {
    showFormLogin() {
      this.$emit('showFormLogin')
    }
  }
}
</script>

<style>

</style>
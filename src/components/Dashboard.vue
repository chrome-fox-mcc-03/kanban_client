<template>
  <div  v-if="currentPage==='dashboard'">
    <!-- dashboard -->
    <section id="main-body">
      <nav-bar 
      @logout='logout'
      ></nav-bar>
      <main-page></main-page>
    </section>
  </div>
</template>

<script>
import NavBar from './NavBar'
import MainPage from './MainPage'

export default {
  name: 'Dashboard',
  props: ['currentPage'],
  data() {
    return {

    }
  },
  components: {
    NavBar,
    MainPage
  },
  methods: {
    logout: function() {
      this.$emit('logout')
    }
  }
}
</script>

<style>

</style>
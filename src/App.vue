<template>
  <div>
    <LandingPage></LandingPage>
    <MainPage></MainPage>
  </div>
</template>

<script>
import LandingPage from './views/LandingPage'
import MainPage from './views/MainPage'

export default {
  name: 'App',
  data () {
    return {
      currentPage: 'Landing Page'
    }
  },

  components: {
    LandingPage,
    MainPage
  }
}
</script>

<style>
  html {
    background-color: #f8f5e4;
    background-size: cover;
  }
</style>
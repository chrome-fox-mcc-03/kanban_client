<template>
  <section id="landing-page">

    <Header 
      @showFormLogin="showFormLogin"
      ></Header>
    
    <div id="hero">
      <img src="../../assets/img/undraw_scrum_board_cesn.png" class="hero-image">
      <div class="topi">

      </div>
      <Login
        :class="animate ? 'animated fadeInRight delay-0.5s' : ''"
        @registerProcess="registerProcess"
        @loginProcess="loginProcess"
        @loginSuccess="loginSuccess"
        ></Login>
        
    </div>

      
      
  </section>
</template>

<script>
import Header from './Header.vue'
import Login from './Login.vue'

export default {
  name: 'LandingPage',
  components : {
    Header,
    Login
  },
  data () {
    return {
      animate : false
    }
  },
  methods: {
    showFormLogin() {
      this.animate = !this.animate
      setTimeout(() => {
        this.animate = false
      }, 1000)
    },
    registerProcess (payload) {
      this.$emit('registerProcess', payload)
    },
    loginProcess (payload) {
      this.$emit('loginProcess', payload)
    },
    loginSuccess () {
      this.$emit('loginSuccess')
    }
  }
}
</script>

<style>

</style>
<template>
  <section id="landing">
    <div id="bg">
    </div>
    <div id="bg-pic" class="grid-welcome">
      <div id="welcome">
        <h1>CatBan</h1>
        <h3>Welcome to Cat Kanban</h3>
        <Login 
          v-if="showForm === 'login'"
          @login="login"
          @changeCurrentPage="changeCurrentPage"
          @changeForm="changeForm"
        ></Login>
        <register
          v-else
          @register="register"
          @changeForm="changeForm"
        ></register>
      </div>
    </div>
  </section>
</template>

<script>
import Login from './components/Login'
import Register from './components/Register'

export default {
  name: 'LandingPage',
  components: {
    Login,
    Register
  },
  props: {
    showForm: String
  },
  data () {
    return {

    }
  },

  methods: {
    changeCurrentPage (newPage) {
      this.$emit('changeCurrentPage', newPage)
    },

    changeForm (formName) {
      this.$emit('changeForm', formName)
    },

    login (payload) {
      this.$emit('login', payload)
    },

    register (payload) {
      this.$emit('register', payload)
    }
  }
}
</script>

<style scoped>

  .grid-welcome {
    display: flex;
    justify-content: flex-end;
  }

  #bg {
    padding: 8vh 0;
    background-color: #f8f5e4;
  }

  #bg-pic {
    background: url(../../assets/undraw_welcome_cats_thqn.svg) no-repeat;
    background-color: #f8f5e4;
    background-size:auto;
    height: 50vh;
  }

  #welcome {
    text-align: center;
    padding: 5vw 20vh 0 0;
  }
</style>
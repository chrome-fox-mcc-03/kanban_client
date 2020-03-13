<template>
  <section id="landing">
    <div id="bg">
    </div>
    <div id="bg-pic" class="grid-welcome">
      <div id="welcome">
        <h1>CatBan</h1>
        <h3>Welcome to Cat Kanban</h3>
        <b-button pill variant="warning">Button</b-button>
        <Login :data="data"></Login>
      </div>
    </div>
  </section>
</template>

<script>
import Login from './components/Login'

export default {
  name: 'LandingPage',
  components: {
    Login
  },
  props: {
    data: Object
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
<template>
  <div>
    <nav>
      <Navbar />
    </nav>
    <div>
      <!-- <Register /> -->
      <!-- <Login /> -->
      <Card />
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar/Navbar'
import Register from './components/User/Register'
import Login from './components/User/Login'
import Card from './components/Card/Card'

export default {
  name: 'App',
  data() {
    return {
    };
  },
  components: {
    Navbar,
    Register,
    Login,
    Card
  }
};
</script>

<style scoped>
</style>
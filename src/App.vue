<template>
  <div>
    <nav>
      <Navbar />
    </nav>
    <div >
      <!-- <Register /> -->
      <!-- <Login /> -->
      <!-- <Card /> -->
      <!-- <Create /> -->
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar/Navbar'
import Register from './components/Form/Register'
import Login from './components/Form/Login'
import Card from './components/Card/Card'
import Create from './components/Form/Create'

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
    Card,
    Create
  }
};
</script>

<style scoped>
</style>
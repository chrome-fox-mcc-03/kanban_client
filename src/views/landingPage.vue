<template>
  <div id="landing-page">
    <div class="row">
      <div class="col-4"></div>
      <div class="col-4">
        <router-view></router-view>
      </div>
      
    </div>
  </div>
</template>

<script>
import LoginForm from '../components/loginForm';
export default {
  name: 'LandingPage',
  components: {
    LoginForm,
  }
}
</script>

<style>
</style>
<template>
  <form class="form-signin col-4" @submit.prevent="login">
    <div class="row">
      <div class="col-4"></div>
      <i class="fab fa-vuejs fa-5x col-4" style="color: #2bb0ed"></i>
      <div class="col-4"></div>
    </div>
    <h1 class="h5 mb-3 font-weight-normal">Please sign in</h1>
    <label for="inputEmail" class="sr-only">Email address</label>
    <input type="email" v-model="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
    <label for="inputPassword" class="sr-only">Password</label>
    <input type="password" v-model="password" id="inputPassword" class="form-control" placeholder="Password" required="">
    <div class="checkbox mb-3">
      <label>
        <input type="checkbox" value="remember-me"> Remember me
      </label>
    </div>
    <button class="btn btn-lg btn-block" type="submit">Login</button>
    <p class="mt-5 mb-3 text-muted">© 2020</p>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      axios({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: {
          email: this.email,
          password: this.password,
        }
      })
        .then(result => {
          localStorage.setItem('access_token', result.data.token);
          this.email = '';
          this.password = '';
          this.$router.push('board');
        })
        .catch(err => {
          console.log(err);
          this.email = '';
          this.password = '';
        })
    }
  }
}
</script>

<style>

</style>
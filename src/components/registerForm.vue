<template>
  <form class="form-signin col-4" @submit.prevent="register">
    <div class="row">
      <div class="col-4"></div>
      <i class="fab fa-vuejs fa-5x col-4" style="color: #2bb0ed"></i>
      <div class="col-4"></div>
    </div>
    <h1 class="h5 mb-3 font-weight-normal">Please fill all the input field</h1>
    <label for="inputEmail" class="sr-only">Email address</label>
    <input type="email" v-model="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus=""><br>
    <label for="inputPassword" class="sr-only">Password</label>
    <input type="password" v-model="password" id="inputPassword" class="form-control" placeholder="Password" required="">
  
    <br>
    <button class="btn btn-lg btn-block" type="submit">
      <h5>

      Register
      </h5>
      </button>
    <br>
    <div class="row">
      <div class="col-4"></div>
      <!-- <div class="col-4"> -->
        <router-link to="/">
          <h5>
          Already have an account?
          </h5>
        </router-link>
      <!-- </div> -->
    </div>
    <p class="mt-5 mb-3 text-muted">© 2020</p>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegisterForm',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    register() {
      let loader = this.$loading.show({
                  // Optional parameters
                  container: this.fullPage ? null : this.$refs.formContainer,
                  canCancel: true,
                  onCancel: this.onCancel,
                });
      axios({
        method: 'POST',
        url: 'https://secure-mountain-34530.herokuapp.com/register',
        data: {
          email: this.email,
          password: this.password,
        }
      })
        .then(result => {
          loader.hide();
          this.$router.push('/');
          this.email = '';
          this.password = '';
        })
        .catch(err => {
          loader.hide();
           this.$toasted.show(err.response.data.errors[0], { 
                              theme: "bubble", 
                              position: "top-right", 
                              duration : 3000
                            });
          this.email = '';
          this.password = '';
        })
    }
  }
}
</script>

<style>

</style>
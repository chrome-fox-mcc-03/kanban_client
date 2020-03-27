<template>
  <section>
    <b-container class="md">
        <b-card title="Login" border-variant="warning" sub-title="Login here to start your CatBan">
          
          <b-form id="login-form" @submit.prevent="login">
            <b-form-group
              label="Email"
              label-for="email-login"
            >
              <b-form-input
                id="email-login"
                v-model="form.email"
                type="email"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group 
              label="Password" 
              label-for="password-login"
            >
              <b-form-input
                id="password-login"
                v-model="form.password"
                type="password"
                required
              ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="warning" pill>Login</b-button>
          </b-form>
          <div class="g-signin2" data-onsuccess="onSignIn"></div>
        </b-card>
        <b-card class="mx-auto">
          <h3>Don't have an account?</h3>
          <b-button @click.prevent="changeForm('register')" size="lg" variant="warning" pill>Register</b-button>
        </b-card>
    </b-container>
  </section>
</template>

<script>
import Axios from 'axios'
export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },

  methods: {
    login () {
      this.$emit('login', this.form)
      this.form.email = ''
      this.form.password = ''
    },

    //google sign in
    onSignIn (googleUser) {
    // const profile = googleUser.getBasicProfile();
    const id_token = googleUser.getAuthResponse().id_token
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    //sending to server through api
    Axios({
      url: 'http://localhost:3000/google', 
      method: 'POST',
      headers: {
        id_token
      }
    })
      .then(({data}) => {
        console.log(data)
        localStorage.token = data.token
        localStorage.username = data.username
        this.$emit('changeCurrentPage', 'main')

      })
      .catch(err => {
        console.log(err);
      })
    },

    changeForm (formName) {
      this.$emit('changeForm', formName)
    }
  }
}
</script>

<style>

</style>
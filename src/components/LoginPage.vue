<template>
  <div id="login-page">
        <h1 class="logo">KANBAN-CHAN</h1><br><br>
        <h1>Login/Register</h1><br><br>
        <form id="login/register">
            <input type="text" id="email" v-model="email" placeholder="E-mail"><br>
            <input type="password" id="password" v-model="password" placeholder="Password"><br><br>
            <button v-on:click.prevent="register()">Register</button>          <button v-on:click.prevent="login()">Login</button>
        </form><br>
        <g-signin-button
            :params="googleSignInParams"
            @success="onSignInSuccess"
            @error="onSignInError">
            Sign in with Google
        </g-signin-button>
    </div>
</template>

<script>
// import axios from 'axios'


export default {
    name: "LoginPage",
    data() {
        return {
            email: '',
            password: '',
            logStatus: true,
            googleSignInParams: {
                client_id: "509743617150-nb3g135j53hnv6bdjk3rl7e384tcbqmb.apps.googleusercontent.com"
            }
        }
    },
    methods: {
        register: function() {
            this.$emit('post-register', {email: this.email, password: this.password})
        },
        login: function() {
            this.$emit('get-login', {email: this.email, password: this.password})
        },
        onSignInSuccess: function(googleUser) {
            // `googleUser` is the GoogleUser object that represents the just-signed-in user.
            // See https://developers.google.com/identity/sign-in/web/reference#users
            const profile = googleUser.getBasicProfile() // etc etc
            let gtoken = googleUser.getAuthResponse().id_token;
            this.$emit('google-sign', {token: gtoken})
        },
        onSignInError: function(error) {
        // `error` contains any error occurred.
        console.log('OH NOES', error)
        }
    }

}
</script>

<style>
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
</style> 
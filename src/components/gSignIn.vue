<template>
  <g-signin-button
    :params="googleSignInParams"
    @success="onSignInSuccess"
    @error="onSignInError"
  >Sign in with Google</g-signin-button>
</template>

<script>
import axios from 'axios';
export default {
  name: "GoogleSigninButton",
  data() {
    return {
      googleSignInParams: {
        client_id:
          "365546043597-f37cvb11qe1md0mjpu6mkf53br4sro37.apps.googleusercontent.com"
      }
    };
  },
  methods: {
    onSignInSuccess(user) {
      const token = user.getAuthResponse().id_token;
      axios({
        method: "POST",
        url: "https://secure-mountain-34530.herokuapp.com/googleSignIn",
        headers: {
          token
        }
      })
        .then(response => {
          localStorage.setItem('access_token', response.data);
          this.$router.push('board');
        })
        .catch(err => {
          this.$toasted.show(err.response.data.errors[0], { 
                              theme: "bubble", 
                              position: "top-right", 
                              duration : 3000
                            });
        });
    },
    onSignInError(error) {
      this.$toasted.show(error, { 
                              theme: "bubble", 
                              position: "top-right", 
                              duration : 3000
                            });
    }
  }
};
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
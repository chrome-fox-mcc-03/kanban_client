<template>
  <g-signin-button
    :params="googleSignInParams"
    @success="onSignInSuccess"
    @error="onSignInError"
  >
    Sign in with Google
  </g-signin-button>
</template>

<script>
export default {
  name: "GSignIn",
  data() {
    return {
      googleSignInParams: {
        client_id:
          "556364779457-rcc4q8gkitjuelog8iggh6o4qia17jnu.apps.googleusercontent.com"
      }
    };
  },
  methods: {
    onSignInSuccess(googleUser) {
      //   let id_token = googleUser.getAuthResponse().id_token;

      const profile = googleUser.getBasicProfile();
      let email = profile.zu;
      let username = profile.vW + profile.wU;
      let google_token = googleUser.getAuthResponse().id_token;
      this.$emit("google-signin", {
        google_token
      });
    },
    onSignInError(err) {
      console.log("OH NOES", err);
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
  cursor: pointer;
}
</style>

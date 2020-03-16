<template>
  <div id="sign_up_left">
    <div id="sign_up_text">Welcome</div>
    <div id="sign_up_description">please sign-up to start</div>
    <div id="signup_container">
      <div style="margin-right: 0.5vw;">or</div>
      <div id="signup_button" @click.prevent="showLogin">sign in</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignupText",
  methods: {
    showLogin(page) {
      this.$emit('showLogin', 'login')
    }
  }
};
</script>

<style>
</style>
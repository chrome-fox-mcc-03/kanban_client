<template>
  <div id="login_left">
    <div id="login_text">Welcome Back</div>
    <div id="login_description">please sign-in to catch up</div>
    <div id="signup_container">
      <div style="margin-right: 0.5vw;">or</div>
      <div id="signup_button" @click.prevent="signup">sign up</div>
    </div>
  </div>
</template>

<script>

export default {
  name: "LoginText",
  methods: {
    signup(page) {
      this.$emit("signup", "signup");
    }
  }
};
</script>

<style>
</style>
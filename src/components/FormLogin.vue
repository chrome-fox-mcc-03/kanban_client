<template>
  <div>
    <div class="field">
      <img src="../../img/logo1.svg" />
      <h2>Welcome Back</h2>
      <p class="control has-icons-left has-icons-right">
        <input v-model="email" class="input" type="email" placeholder="Email" />
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
        <span class="icon is-small is-right">
          <i class="fas fa-check"></i>
        </span>
      </p>
    </div>
    <div class="field">
      <p class="control has-icons-left">
        <input v-model="password" class="input" type="password" placeholder="Password" />
        <span class="icon is-small is-left">
          <i class="fas fa-lock"></i>
        </span>
      </p>
    </div>
    <div class="field field-btn">
      <p class="control">
        <button v-on:click="loginCheck()" class="button">Login</button>
      </p>
      <p class="control">
        Don't You Have Account?
        <a v-on:click="registerBtn()" class="tombol">
          Register
          Now!
        </a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormLogin",
  data() {
    return {
      email: "",
      password: this.password2
    };
  },
  props: {
    password2: String
  },
  methods: {
    registerBtn() {
      this.$emit("methodButton");
    },
    loginCheck() {
      this.$emit("loginSubmit", this.email, this.password);
    }
  }
};
</script>

<style>
</style>
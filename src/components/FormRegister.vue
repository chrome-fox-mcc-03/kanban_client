<template>
  <div>
    <form v-on:submit.prevent="registerSubmit()">
      <div class="field">
        <img src="../../img/logo1.svg" />
        <h2>Register</h2>
        <p class="control has-icons-left has-icons-right">
          <input v-model="name" class="input" type="name" placeholder="Name" />
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </p>
      </div>
      <div class="field">
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
          <button type="submit" class="button">Register</button>
        </p>
        <p class="control">
          Do You Have Account?
          <a v-on:click="loginBtn()" class="tombol">
            Login
            Now!
          </a>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "FormRegister",
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    loginBtn() {
      this.$emit("methodButton");
    },
    registerSubmit() {
      let data = {
        name: this.name,
        email: this.email,
        password: this.password
      };
      this.$emit("regSubmit", data);
    }
  }
};
</script>

<style>
</style>
<template>
  <section>
    <div class="container">
      <div class="landing-items columns">
        <form-login
          v-show="!registerView"
          class="kiri column"
          @methodButton="registerBtn"
          @loginSubmit="loginCheck"
          :password2="password2"
          @loginGoogle="loginGoogle"
        ></form-login>
        <form-register
          v-show="registerView"
          class="kiri column"
          @methodButton="loginBtn"
          @regSubmit="registerSubmit"
        ></form-register>
        <div class="kanan column is-hidden-mobile">
          <img src="../../img/Asset2.svg" alt />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import FormLogin from "../components/FormLogin";
import FormRegister from "../components/FormRegister";
export default {
  name: "Landing",
  components: {
    FormLogin,
    FormRegister
  },
  data() {
    return {
      registerView: false
    };
  },
  props: {
    password2: String
  },
  methods: {
    registerBtn() {
      this.registerView = true;
    },
    loginBtn() {
      this.registerView = false;
    },
    loginCheck(email, password) {
      this.$emit("loginSubmit", email, password);
    },
    registerSubmit(data) {
      this.$emit("regSubmit", data);
    },
    loginGoogle() {
      this.$emit("loginGoogle");
    }
  }
};
</script>

<style>
</style>
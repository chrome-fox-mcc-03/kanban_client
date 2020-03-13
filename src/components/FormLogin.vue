<template>
  <div>
    <form v-on:submit.prevent="loginCheck()">
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
          <button type="submit" class="button">Login</button>
          <g-signin-button
            :params="googleSignInParams"
            @success="onSignInSuccess"
            @error="onSignInError"
          >Sign in with Google</g-signin-button>
        </p>
        <p class="control">
          Don't You Have Account?
          <a v-on:click="registerBtn()" class="tombol">
            Register
            Now!
          </a>
        </p>
      </div>
    </form>
    <div class="loading-container" v-if="isLoading">
      <div class="loading-screen">
        <lottie-player
          src="https://assets2.lottiefiles.com/datafiles/WKqC5QWz9GiZnlm/data.json"
          background="transparent"
          speed="1"
          style="width: 300px; height: 300px;"
          loop
          autoplay
        ></lottie-player>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "FormLogin",
  data() {
    return {
      email: "",
      password: "",
      isLoading: false,
      googleSignInParams: {
        client_id:
          "710794205152-a4sqdmsdpbiatftarv2m883vog211i34.apps.googleusercontent.com"
      }
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
    },
    loginGoogle() {
      this.$emit("loginGoogle");
    },
    onSignInSuccess(googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      const profile = googleUser.getBasicProfile(); // etc etc
      let token = googleUser.getAuthResponse().id_token;
      let name = profile.getName();
      this.isLoading = true;
      axios({
        url: "https://limitless-fjord-07254.herokuapp.com/users/goosignin",
        data: {
          name
        },
        method: "post",
        headers: {
          token: token
        }
      })
        .then(result => {
          localStorage.setItem("token", result.data);
          this.loginGoogle();
          this.$toasted.success("You are already logged in");
        })
        .catch(err => {})
        .finally(() => {
          this.isLoading = false;
        });
    },
    onSignInError(error) {
      // `error` contains any error occurred.
      console.log("OH NOES", error);
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
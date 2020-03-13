<template>
  <div id="login-right">
    <!-- <div v-if="isLoading" class="loading-screen">
      <lottie-player
        src="https://assets10.lottiefiles.com/datafiles/kRbrlEbvgAezJ8q/data.json"
        background="transparent"
        speed="1"
        style="width: 300px; height: 300px;"
        loop
        autoplay
      ></lottie-player>
    </div> -->
    <form @submit.prevent="login" id="sign_in_form">
      <div id="sign_in_header">Sign In</div>
      <input type="email" id="sign_in_email" placeholder="email" v-model="sign_in_email" />
      <br />
      <br />
      <input
        type="password"
        id="sign_in_password"
        placeholder="password"
        v-model="sign_in_password"
      />
      <br />
      <br />
      <button type="submit" id="signin_button">Sign in</button>
    </form>
    <g-signin-button
      :params="googleSignInParams"
      @success="onSignInSuccess"
      @error="onSignInError"
    >Sign in with Google</g-signin-button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "FormLogin",
  data() {
    return {
      sign_in_email: "",
      sign_in_password: "",
      googleSignInParams: {
        client_id: process.env.CLIENT_ID
      },
      // isLoading: false
    };
  },
  methods: {
    onSignInSuccess(googleUser) {
      // this.isLoading = true;
      let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      axios({
        method: "POST",
        url: "https://polar-dusk-39759.herokuapp.com/googleLogin",
        headers: {
          token
        }
      })
        .then(result => {
          this.$emit("login", "home");
          this.$toasted.success("congratulation youve been signed in");

          localStorage.setItem("token", result.data.token);
        })
        .catch(error => {
          this.$toasted.error(error);
        })
        .finally(_ => {
          // this.isLoading = false;
        });
    },
    onSignInError(error) {
      this.$toasted.error(error);
    },

    login() {
      this.isLoading = true;
      axios({
        method: "post",
        url: "https://polar-dusk-39759.herokuapp.com/users/login",
        data: {
          email: this.sign_in_email,
          password: this.sign_in_password
        }
      })
        .then(result => {
          if (result) {
            // console.log(result);

            this.$toasted.success(`congratulations, you've been logged in `);
            localStorage.setItem("token", result.data.token);
            this.$emit("login", "home");
            this.$emit("showTask");
          } else {
            this.$toasted.error(error.response.data);
          }
        })
        .catch(error => {
          this.$toasted.error(error.response.data);
        })
        .finally(_ => {
          // this.isLoading = false;
        });
    }
  }
};
</script>

<style>
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  padding: 4px 8px;
  border-radius: 3px;
  background-color: rgb(200, 175, 125);
  color: #fff;
  box-shadow: 0 3px 0 rgb(241, 211, 150);
  cursor: pointer;
  width: 10vw;
  margin-top: 2vh;
}


.loading-screen {
    height: 100vh;
    width: 100%;
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    
}
</style>
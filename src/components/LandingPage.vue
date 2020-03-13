<template>
  <div v-if="currentPage === 'landingPage'">
    <!-- login -->
    <section id="landing-page">
      <div class="container" id="container">
        <!-- SIGNUP -->
        <div class="form-container sign-up-container" @submit.prevent="register">
          <form action="#">
            <h1>Create Account</h1>
            <span>or use your email for registration</span>
            <input v-model="name" type="text" placeholder="Name" />
            <input v-model="email" type="email" placeholder="Email" />
            <input v-model="password" type="password" placeholder="Password" />
            <button>Sign Up</button>
          </form>
        </div>
        <!-- SIGNIN -->
        <div class="form-container sign-in-container" @submit.prevent="login">
          <form>
            <h1>Sign in</h1>
            <div class="social-container">
              <g-signin-button
                :params="googleSignInParams"
                @success="onSignInSuccess"
                @error="onSignInError"
              >Sign in with Google</g-signin-button>
            </div>
            <span>or use your account</span>
            <input v-model="email" type="email" placeholder="Email" />
            <input v-model="password" type="password" placeholder="Password" />
            <button>Sign In</button>
          </form>
        </div>
        <!-- OVERLAY -->
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button class="ghost" id="signIn">Sign In</button>
            </div>
            <div class="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button class="ghost" id="signUp">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "landingPage",
  props: ["currentPage"],
  data() {
    return {
      name: "",
      email: "",
      password: "",
      googleSignInParams: {
        client_id:
          "97289359183-4skbvlpmn2lpg5p3bgu7oo09d4km5i8n.apps.googleusercontent.com"
      }
    };
  },
  methods: {
    login: function() {
      axios({
        method: "POST",
        url: "http://localhost:3000/login",
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(result => {
          // console.log(result.data);
          localStorage.setItem("token", result.data);
          this.$emit("changeCurrentPage", "dashboard");
          this.$emit("changeStatus", true);
        })
        .catch(err => {
          console.log(err);
        });
      // console.log('masuk method login');
    },

    register: function() {
      axios({
        method: "POST",
        url: "http://localhost:3000/register",
        data: {
          name: this.name,
          email: this.email,
          password: this.password
        }
      })
        .then(user => {
          localStorage.setItem("token", user.data);
          this.$emit("changeCurrentPage", "dashboard");
          this.$emit("changeStatus", true);
        })
        .catch(err => {
          console.log(err);
        });
    },

    onSignInSuccess(googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      const profile = googleUser.getBasicProfile(); // etc etc
      const token = googleUser.getAuthResponse().id_token;      
      axios({
        method: "POST",
        url: "http://localhost:3000/google",
        headers: {
          token
        }
      })
      .then(result => {
        console.log(result.data);
        
        localStorage.setItem("token", result.data);
        this.$emit("changeCurrentPage", "dashboard");
      })
      .catch((err) => {
        console.log(err);
      })
    },

    onSignInError(error) {
      // `error` contains any error occurred.
      console.log("OH NOES", error.details);
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
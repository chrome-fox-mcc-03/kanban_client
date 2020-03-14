<template>
  <div id="login-page">
    <div class="container" id="container">
      <div class="form-container sign-up-container">
        <form class="log-form" @submit.prevent="createNewUser()">
          <h1>Create Account</h1>
          <input v-model="userData.regName" type="text" placeholder="Name" />
          <input v-model="userData.regEmail" type="email" placeholder="Email" />
          <input v-model="userData.regPassword" type="password" placeholder="Password" />
          <input class="sign-button" type="submit" value="Sign Up" />
        </form>
      </div>
      <div class="form-container sign-in-container">
        <form class="log-form" @submit.prevent="signIn()">
          <h1>Kanbanium</h1>
          <div class="social-container">
            <g-signin-button
              :params="googleSignInParams"
              @success="onSignInSuccess"
              @error="onSignInError"
            >Sign in with Google</g-signin-button>
          </div>
          <span>or use your account</span>
          <input v-model="userData.logEmail" type="email" placeholder="Email" />
          <input v-model="userData.logPassword" type="password" placeholder="Password" />
          <input class="sign-button" type="submit" value="Sign In" />
        </form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button class="ghost" id="signIn">Sign In</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>Get Started!</h1>
            <p>Start journey with us and level up your way of organizing tasks</p>
            <button class="ghost" id="signUp">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
    <lottie-player
      class="loading"
      v-if="isLoading"
      src="https://assets8.lottiefiles.com/datafiles/67bae0ddb57b26679d10e9ce7c1d445f/data.json"  background="transparent"  speed="1"  style="width: 100px; height: 100px;"  loop autoplay >
    </lottie-player>
  </div>
</template>

<script>
export default {
  name: "LandingPage",
  data: function() {
    return {
      userData: {
        regName: "",
        regEmail: "",
        regPassword: "",
        logEmail: "",
        logPassword: ""
      },
      isLoading: false,
      googleSignInParams: {
        client_id: "134045794633-fu5sb70f9sp07k27um4r15ikjvdbmucf.apps.googleusercontent.com"
      }
    };
  },
  props: [
    "message",
    "currentPage",
  ],
  methods: {
    changeLoadingState(state) {
        this.isLoading = state
    },
    createNewUser: function() {
      const name = this.userData.regName;
      const email = this.userData.regEmail;
      const password = this.userData.regPassword;
      this.isLoading = true
      axios
        .post("https://salty-sierra-49064.herokuapp.com/signup", {
          name,
          email,
          password
        })
        .then(access_token => {
          console.log("successfully sign up", access_token.data.access_token);
          localStorage.setItem("access_token", access_token.data.access_token);
          localStorage.setItem('current_user', access_token.data.name);
          this.$emit("changePage", "mainPage");
          this.$toasted.show("Welcome! Create your first activity!", { 
            theme: "bubble", 
            position: "bottom-center", 
            duration : 2000
          })
        })
        .catch(err => {
          this.$toasted.show(`${err.response.data.message}`, { 
            theme: "bubble", 
            position: "bottom-center", 
            duration : 2000
          })
          console.log(err);
        })
        .finally(_ => {
          this.isLoading = false
        });
    },
    signIn: function() {
      const email = this.userData.logEmail;
      const password = this.userData.logPassword;

      this.isLoading = true
      axios
        .post("https://salty-sierra-49064.herokuapp.com/signin", {
          email,
          password
        })
        .then(access_token => {
          console.log("successfully sign in", access_token.data.access_token);
          console.log("check this out ---> ", access_token.data.name);
          localStorage.setItem("access_token", access_token.data.access_token);
          localStorage.setItem('current_user', access_token.data.name);
          this.$emit("changePage", "mainPage");
          this.$toasted.show("Welcome back!", { 
            theme: "bubble", 
            position: "bottom-center", 
            duration : 2000
          })
        })
        .catch(err => {
          this.$toasted.show(`${err.response.data.message}`, { 
            theme: "bubble", 
            position: "bottom-center", 
            duration : 2000
          })
          console.log(err.response.data.message);
        })
        .finally(_ => {
          this.isLoading = false
        });
    },
    onSignInSuccess (googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      const profile = googleUser.getBasicProfile() // etc etc
      const token = googleUser.getAuthResponse().id_token;
      this.isLoading = true

      axios({
          method: 'post',
          url: 'https://salty-sierra-49064.herokuapp.com/googleSignIn',
          headers: {
              token
          }
      })
        .then(result => {
            console.log(result);
            localStorage.setItem("access_token", result.data.access_token);
            localStorage.setItem('current_user', result.data.name);
            this.$emit("changePage", "mainPage");
            this.$toasted.show("Welcome back!", { 
              theme: "bubble", 
              position: "bottom-center", 
              duration : 2000
            })
        })
        .catch(err => {
            console.log(err);
        })
        .finally(_ => {
          this.isLoading = false
        });
    },
    onSignInError (error) {
      // `error` contains any error occurred.
      console.log('OH NOES', error)
    }
  },
  mounted() {
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container");

    signUpButton.addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
    });
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
    .loading {
      margin-top: 2rem;
      position: absolute;
      left: 2rem;
      top: 2rem
    }
</style>
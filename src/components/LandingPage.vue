<template>
  <div id="pg-landing" v-show="!isLogin">
    <h1>看板ページ</h1>
    <form id="form-login">
      <h3>PLEASE LOGIN TO CONTINUE</h3>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          v-model="userCreds.email"
          type="email"
          class="form-control"
          id="email-login"
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />
        <small
          id="emailHelp"
          class="form-text text-muted"
        >We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          v-model="userCreds.password"
          type="password"
          class="form-control"
          id="password-login"
          placeholder="Password"
        />
      </div>
      <div class="btn-actions">
        <button
          type="submit"
          class="btn btn-primary"
          form="form-login"
          v-on:click.prevent="userLogin0()"
        >Submit</button>
        <!-- Button trigger modal -->
        <button
          type="button"
          class="btn btn-secondary"
          data-toggle="modal"
          data-target="#signupModal"
        >SIGNUP</button>
        <g-signin-button
          :params="googleSignInParams"
          @success="onSignInSuccess"
          @error="onSignInError"
        > Sign in with Google</g-signin-button>
        <!-- <div class="g-signin2" data-onsuccess="onSignIn"></div> -->
      </div>
    </form>

    <!-- REGISTER Modal -->
    <div
      class="modal fade"
      id="signupModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">NEW USER? LET'S SIGNUP!</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="signup-form">
              Email
              <br />
              <input
                v-model="userCreds.email"
                type="email"
                class="form-control"
                id="email-signup"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
              <br />Password
              <br />
              <input
                v-model="userCreds.password"
                type="password"
                class="form-control"
                id="password-signup"
                placeholder="Password"
              />
              <br />
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button
              type="button"
              class="btn btn-primary"
              form="signup-form"
              v-on:click.prevent="userSignup0()"
            >SIGNUP</button>
          </div>
        </div>
      </div>
      <!-- <span v-model="printSuccessMsg(event)" class="msg-success"> {{msgSuccess}} </span>
      <span v-model="printErrorMsg(event)" class="msg-error"> {{msgError}} </span>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "LandingPage",
  data() {
    return {
      userCreds: {
        email: "",
        password: "",
      },
      googleSignInParams: {
        client_id: "983929968666-kbp86jo4o6053em2ioo0u6hbspvpnm4e.apps.googleusercontent.com"
      }
    };
  },
  props: ["isLogin"],
  methods: {
    userSignup0() {
      const email = this.userCreds.email;
      const password = this.userCreds.password;
      const userCreds = {
        email,
        password
      };
      this.$emit("userSignup1", userCreds);
    },

    userLogin0() {
      const email = this.userCreds.email;
      const password = this.userCreds.password;
      const userCreds = {
        email,
        password
      };
      this.$emit("userLogin1", userCreds);
    },

    onSignInSuccess (googleUser) {
      console.log("GOOGLE SIGNIN STEP 1");
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      var id_token = googleUser.getAuthResponse().id_token;
      this.$emit("onSignInSuccess", id_token)
    },
    onSignInError (error) {
      // `error` contains any error occurred.
      console.log('OH NOES', error)
      this.$toasted.error(error.response.data, {
            position: "bottom-center"
      });
    }
  }
};
</script>

<style scoped>
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
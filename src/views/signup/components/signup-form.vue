<template>

  <div id="sign_up_right">
    <!-- <div v-if="isLoading" class="loading-screen">
        <lottie-player
            src="https://assets10.lottiefiles.com/datafiles/kRbrlEbvgAezJ8q/data.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay >
        </lottie-player>
    </div> -->
    <form id="sign_up_form" @submit.prevent="signup">
      <div id="sign_up_header">Sign Up</div>
      <input type="text" id="sign_up_name" placeholder="name" v-model="sign_up_name"/>
      <br />
      <br />
      <input type="email" id="sign_up_email" placeholder="email" v-model="sign_up_email"/>
      <br />
      <br />
      <input type="password" id="sign_up_password" placeholder="password" v-model="sign_up_password"/>
      <br />
      <br />
      <button type="submit" id="signin_button">Sign up</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SignupForm",
  data() {
      return {
          sign_up_name: "",
          sign_up_email: "",
          sign_up_password: "",
          // isLoading: false
      }
  },
  methods: {
    signup() {        
        this.isLoading = true;
        axios.post('https://polar-dusk-39759.herokuapp.com/users/register', {
            name: this.sign_up_name,
            email: this.sign_up_email,
            password: this.sign_up_password
        })
        .then(result => {
            this.$emit('signup', 'home');
            this.$toasted.success(`congratulations, you've been signed up`);
            localStorage.setItem('token', result.data.token);
            this.$emit('showTask');
        })
        .catch(error => {
            this.$toasted.error(error.response.data)
        })
        .finally(_=> {
          // this.isLoading = false;
        })
    }
  }
};
</script>

<style>
.loading-screen {
    height: 100vh;
    width: 100%;
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    
}
</style>
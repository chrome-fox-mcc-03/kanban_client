<template>

    <div class="form-login">
        <p class="title">SweatBan</p>
        <p>Login</p>
        <form @submit.prevent="loginProcess">
            <label for="email">Email address</label>
            <input type="email" class="form-control" id="login-email" aria-describedby="emailHelp" v-model="login.email">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="login-password" aria-describedby="emailHelp" v-model="login.password">
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        <p class="notif-register">Don't have an account?</p>
        <button type="submit" class="btn btn-primary register-nav" @click="showFormRegister">Create Account</button>

      <b-modal id="register" hide-footer>
        <div class="image-modal">

        </div>
            <div class="d-block text-center">
              
                <center>
                    <form @submit.prevent="registerProcess">
                        <h2>Register</h2>
                        <br>
                        <div class="form-group">
                            <label for="title">Name</label>
                            <input type="text" id="name" class="form-control" v-model="register.name" required>
                        </div>
                        <div class="form-group">
                            <label for="description">Email Address</label>
                            <input type="text" id="email" class="form-control" v-model="register.email" required>
                        </div>
                        <div class="form-group">
                            <label for="description">Password</label>
                            <input type="password" id="password" class="form-control" v-model="register.password" required>
                        </div>
                        <br><br>
                        <b-button class="mt-3 btn btn-primary" block type="submit" style="background-color:blue">Submit</b-button>
                    </form>
                </center>
            </div>
            <!-- <b-button class="mt-3" block @click="$bvModal.hide(`register`)" style="background-color:red">Cancel</b-button> -->
        </b-modal>

    </div>
    <!-- Modal Register -->
    
</template>

<script>
export default {
  name: 'Login',
  props: ['showFormLogin', 'registerSuccess'],
  data() {
    return {
      register : {
        name: '',
        email: '',
        password: ''
      },
      login: {
        email: '',
        password: ''
      }
    }
  },
  watch: {
    registerSuccess(val) {
      if(val) {
        this.register = {
          name: '',
          email: '',
          password: ''
        }
        this.$emit('clearRegister')
      }
    }
  },
  methods : {
    showFormRegister () {
      this.$bvModal.show(`register`)
    },
    registerProcess() {
      let payload = {
        name: this.register.name,
        email: this.register.email,
        password: this.register.password
      }
      this.$emit('registerProcess', payload)
    },
    loginProcess() {
      let payload = {
        email: this.login.email,
        password: this.login.password
      }
      console.log(payload, '>>>>>>>>>>>>>>> CLIENT')
      this.$emit('loginProcess', payload)
    }
  }
}
</script>

<style>

</style>
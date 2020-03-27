<template>
   <section>
    <b-container class="md">
        <b-card title="Register" border-variant="warning" sub-title="Make new account">
          
          <b-form id="login-form" @submit.prevent="register">
             <b-form-group
              label="Username"
              label-for="username-register"
            >
              <b-form-input
                id="username-register"
                v-model="form.username"
                type="text"
                required
              ></b-form-input>
            </b-form-group>
            
            <b-form-group
              label="Email"
              label-for="email-register"
              description="Your Email must be unique"
            >
              <b-form-input
                id="email-register"
                v-model="form.email"
                type="email"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group 
              label="Password" 
              label-for="password-register"
            >
              <b-form-input
                id="password-register"
                v-model="form.password"
                minlength="3"
                type="password"
                required
                description="Your password must be 3 characters or more"
              ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="warning" pill>Register</b-button>
          </b-form>
          <a @click.prevent="changeForm('login')" href="#">back to login</a>
        </b-card>
    </b-container>
  </section>
</template>

<script>
export default {
   data () {
    return {
      form: {
        username: '',
        email: '',
        password: ''
      }
    }
  },

  methods: {
    register () {
      this.$emit('register', this.form)
      this.form.username = ''
      this.form.email=''
      this.form.password=''
    },

    changeForm(formName) {
      this.$emit('changeForm', formName)
    }
  }
}
</script>

<style>

</style>
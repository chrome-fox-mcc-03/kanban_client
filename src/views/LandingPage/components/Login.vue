<template>
  <section>
    <b-container class="md">
        <b-card title="Login" border-variant="warning" sub-title="Login here to start your CatBan">
          
          <b-form id="login-form" @submit.prevent="onSubmit" @reset.prevent="onReset">
            <b-form-group
              id="email-login-input"
              label="Email"
              label-for="email-login"
              description="Your Email must be unique"
            >
              <b-form-input
                id="email-login-input"
                v-model="form.email"
                type="email"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group 
              id="password-login" 
              label="Password" 
              label-for="password-login-input"
            >
              <b-form-input
                id="password-login-input"
                v-model="form.password"
                minlength="3"
                type="password"
                required
                description="Your password must be more than 3 characters"
              ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="warning" pill>Submit</b-button>
          </b-form>
        </b-card>
    </b-container>
  </section>
</template>

<script>
export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },

  methods: {
      onSubmit() {
        console.log(this.form.email)
        
      },
  }
}
</script>

<style>

</style>
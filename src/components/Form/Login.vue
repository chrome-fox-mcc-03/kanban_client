<template>
  <div class="login">
    <div class="column">
      <transition name="fade">
        <sui-message
          v-if="visible"
          :header=title
          :content=message
          dismissable
          @dismiss="handleDismiss"
          id="message"
          style=":color:color"
        />
      </transition>
      <sui-form class="ui large form" method="post">
        <h1 class="ui teal header">
          <div class="content">
            Login into QanbaN
          </div>
        </h1>
        <sui-form-field>
          <label>Email</label>
          <div class="ui left icon input">
            <i class="envelope icon"></i>
            <input type="email" name="email" v-model="email" placeholder="Email">
          </div>
        </sui-form-field>
        <sui-form-field>
          <label>Password</label>
          <div class="ui left icon input">
            <i class="user secret icon"></i>
            <input type="password" name="password" v-model="password" placeholder="Password">
          </div>
        </sui-form-field>
        <div class="ui fluid large teal submit button" type="submit" @click="login">Login</div>
      </sui-form>
    </div>
    <sui-dimmer :active="active">
      <sui-loader indeterminate>Please wait...</sui-loader>
    </sui-dimmer>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      active: false,
      title: '',
      message: '',
      visible: false
    }
  },
  methods: {
    login () {
      this.active = true
      axios({
        method: 'post',
        url: 'http://localhost:3000/login',
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({data}) => {
          console.log(data, 'masuk login')
          this.email = ''
          this.password = ''
          localStorage.setItem('token', data.token)
          this.changePage('group')
        })
        .catch(err => {
          this.visible = true
          this.title = 'ERROR!'
          this.message = err.response.data.message
          console.log(err.response.data.message, 'error register')
        })
        .finally(_ => {
          this.active = false
        })
    },
    handleDismiss() {
      this.visible = false
    },
    changePage (page) {
      this.$emit('changePage', page)
    }
  },
  props: {
    input: String
  }
}
</script>

<style>

</style>
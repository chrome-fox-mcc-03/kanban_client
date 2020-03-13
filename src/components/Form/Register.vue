<template>
  <div class="register">
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
            Register into QanbaN
          </div>
        </h1>
        <sui-form-field>
          <label>Username</label>
          <div class="ui left icon input">
            <i class="user icon"></i>
            <input type="text" max=10 name="username" v-model="username" placeholder="Username">
          </div>
        </sui-form-field>
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
            <input type="password" name="password"  v-model="password" placeholder="Password">
          </div>
        </sui-form-field>
        <div class="ui fluid large teal submit button" type="submit" @click="register">Register</div>
      </sui-form>
    </div>
    <sui-dimmer :active="active">
      <sui-loader indeterminate>Please wait...</sui-loader>
    </sui-dimmer>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      username: '',
      email: '',
      password: '',
      active: false,
      visible: false,
      title: '',
      message: ''
    }
  },
  methods: {
    changePage (page) {
      this.$emit('changePage', page)
    },
    register () {
      this.active = true
      axios({
        method: 'post',
        url: 'http://localhost:3000/register',
        data: {
          username: this.username,
          email: this.email,
          password: this.password
        }
      })
        .then(data => {
          console.log(data, 'masuk register')
          this.username = ''
          this.email = ''
          this.password = ''
          this.changePage('login')
          this.sendMessage(data.message)
        })
        .catch(err => {
          this.visible = true
          this.title = 'ERROR!'
          this.message = err.response.data.message
        })
        .finally(_ => {
          this.active = false
        })
    },
    handleDismiss() {
      this.visible = false
    },
    sendMessage (message) {
      this.$emit('sendMessage', message)
    }
  }
}
</script>

<style>
</style>
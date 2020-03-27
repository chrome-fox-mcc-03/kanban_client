<template>
  <div class="login">
    <img :src="img">
    <div class="column">
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
      visible: this.msg.action,
      title: this.msg.title,
      message: this.msg.message
    }
  },
  methods: {
    login () {
      this.active = true
      axios({
        method: 'post',
        url: 'https://ancient-dawn-78678.herokuapp.com/login',
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({data}) => {
          this.email = ''
          this.password = ''
          localStorage.setItem('token', data.token)
          this.changePage('group')
          this.notification(data.message)
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
      this.$emit('clearMsg')
    },
    changePage (page) {
      this.$emit('changePage', page)
    },
    notification(message) {
      this.$emit('notification', {
        action: true,
        title: 'Success',
        message
      })
    },
    gLogin(){
      this.active = true
      this.$gAuth.signIn()
        .then(authCode => {
          const token = authCode.getAuthResponse().id_token
          return axios({
            method:"POST",
            url:"http://localhost:3000/glogin",
            headers:{
              token
            }
          })
        })
        .then(({data})=>{
          localStorage.setItem('token',data.token)
          this.changePage('group')
          this.notification(data.message)
        })
        .catch(err=>{
          this.visible = true
          this.title = 'ERROR!'
          this.message = err.response.data.message
        })
        .finally(_ => {
          this.active = false
        })
    }
  },
  props: {
    input: String,
    msg: Object
  }
}
</script>

<style>

</style>
<template>
  <div class="login flex-center">
    <at-card style="width: 300px;">
      <h4 slot="title">Welcome</h4>
      <div class="form">
        <img src="/1487054017_1486301565_giphy.gif" style="width: 50%">
        <div class="email">
        <at-input v-model="email" placeholder="Email" style="margin-top: 30px;"></at-input>
        </div>
        <at-input v-model="password" type="password" placeholder="Password" class="password" style="margin-top: 30px;"></at-input>
        <at-button type="primary" style="width: 150px; margin-top: 30px;" @click="login">login</at-button>
      </div>
    </at-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'login',
  data () {
    return {
      email : '',
      password: ''
    }
  },
  props : {
    currentPage : String
  },
  methods : {
    login () {
      this.start()
      const email = this.email
      console.log(email)
      const password = this.password
      axios({
        url : "http://localhost:3000/login",
        method : "post",
        data: {
          email,
          password
        }
      })
        .then(({data}) => {
          localStorage.setItem('token',data.token)
          this.finish()
          this.changePage('frame')
          this.open("login succses",'success')
        })
        .catch(err => {
          this.error()
          this.open(err.response.data,'warning')
        })
    },
    open (title,type) {
      this.$Notify({
        title,
        type
      })
    },
    changePage (event) {
      this.$emit('changePage',event)
    },
    start () {
      this.$Loading.start()
    },
    finish () {
      this.$Loading.finish()
    },
    error () {
      this.$Loading.error()
    },
  }
}
</script>

<style>
  .login {
    margin-top: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
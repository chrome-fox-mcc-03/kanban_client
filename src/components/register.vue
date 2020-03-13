<template>
  <div class="login flex-center">
    <form>
      <at-card style="width: 300px;">
        <h4 slot="title">Register</h4>
        <div class="form">
          <img src="/Chibi Dota - Imgur.gif" style="width: 50%">
          <div class="register">
          <at-input v-model="email" placeholder="Email" style="margin-top: 30px;"></at-input>
          </div>
          <at-input v-model="password" type="password" placeholder="Password" class="password" style="margin-top: 30px;"></at-input>
          <at-button type="primary" style="width: 150px; margin-top: 30px;" @click.prevent="register">register</at-button>
        </div>
      </at-card>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'register',
  data () {
    return {
      email : '',
      password: ''
    }
  },
  methods : {
    register () {
      const email =  this.email
      const password = this.password
      axios({
        url : "http://localhost:3000/register",
        method: "post",
        data : {
          email,
          password
        }
      })
        .then(({data}) => {
          this.open("register succses",'success')
          this.changePage('login')
        })
        .catch(err => {
          this.open(err.response.data,"warning")
        })
    },
    open(title,type) {
      this.$Notify({
        title,
        type
      })
    },
    changePage (event) {
      this.$emit('changePage',event)
    }
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
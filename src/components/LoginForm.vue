<template>
  <!-- LOGIN FORM   -->
  <div class="login">
    <div class="login-form">
      <form class="box" @submit.prevent="loginTo">
        <h1>Login Form</h1>
        <input type="text" v-model="email" placeholder="Username"> 
        <input type="password" v-model="password" placeholder="Password">
        <input type="submit" value="Login">
        <a href="#" @click="changePage">Dont have an account?</a>
    </form>
    </div>
  </div>
  <!-- END LOGIN FORM   -->
</template>

<script>
import Axios from 'axios'
export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: ''

    }
  },
  // props:
  methods: {
    loginTo(){
      Axios({
        method: "POST",
        url: "http://localhost:3000/login",
        data: {email: this.email, password: this.password}
      })
        .then(({data}) => {
          console.log(data)
          localStorage.setItem('token', data.token)
          this.$emit('changePage', 'dashboard')
        })
        .catch(err => console.log(err))
    },
    changePage() {
      this.$emit('changePage', 'register')
    },


  }
}

</script>

<style lang="scss" scoped>
.login {
  .login-form{
    .box {
      width: 300px;
      padding: 40px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #191919;
      text-align: center;
      h1 {
        color: white;
        text-transform: uppercase;
        font-weight: 500;
      };
      input[type="text"],
      input[type="password"] {
        border: 0;
        background: none;
        display: block;
        margin: 20px auto;
        text-align: center;
        border: 2px solid cadetblue;
        padding: 14px 10px;
        width: 200px;
        outline: none;
        color: white;
        border-radius: 24px;
        transition: 0.25s;
        &:focus{
          width: 280px;
          border-color: cadetblue;
        };
      };
      input[type="submit"]{
        border: 0;
        background: none;
        display: block;
        margin: 20px auto;
        text-align: center;
        border: 2px solid rgb(4, 88, 84);
        padding: 14px 40px;
        outline: none;
        color: white;
        border-radius: 24px;
        transition: 0.25s;
        cursor: pointer;
        &:hover{
          background: cadetblue;
        }
      }
    }
  }
}
// END LOGIN FORM //


</style>
<template>
   <!-- REGISTER FORM   -->
  <div class="register">
    <div class="register-form">
      <form class="box" @submit.prevent="registering">
        <h1>Register Form</h1>
        <input type="text" v-model="email" placeholder="Email"> 
        <input type="password" v-model="password" placeholder="Password">
        <input type="submit" value="Register">
        <a href="#" @click.prevent="changing">Already registered?</a>
    </form>
    </div>
  </div>
  <!-- END REGISTER FORM   -->
</template>

<script>
import Axios from 'axios'
export default {
  name: 'RegisterForm',
  // props:
  data() {
    return  {
      email: '',
      password: ''
    }
  },
  methods: {
    registering() {
      Axios({
        method: "POST",
        url: "http://localhost:3000/register",
        data: {email: this.email, password: this.password}
      })
        .then(data => {
          console.log(data)
          this.changing()
        })
        .catch(err => console.log(err))

    },
    changing() {
      this.$emit('changingPage', 'login')
    }
  }
}

</script>

<style lang="scss" scoped>
// REGIST FORM
.register {
  .register-form{
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

// END REGIST FORM

</style>
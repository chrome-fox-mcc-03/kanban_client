<template>
  <div id="login-page">
        <h1 class="logo">KANBAN-CHAN</h1><br><br>
        <h1>Login/Register</h1><br><br>
        <form id="login/register">
            <input type="text" id="email" v-model="email" placeholder="E-mail"><br>
            <input type="password" id="password" v-model="password" placeholder="Password"><br><br>
            <button v-on:click.prevent="register()">Register</button>          <button v-on:click.prevent="login()">Login</button>
        </form>
    </div>
</template>

<script>
// import axios from 'axios'

export default {
    name: "LoginPage",
    data() {
        return {
            email: '',
            password: '',
            logStatus: true
        }
    },
    methods: {
        register: function() {
            this.$emit('post-register', {email: this.email, password: this.password})
        },
        login: function() {
            this.$emit('get-login', {email: this.email, password: this.password})
        }
    }

}
</script>

<style>

</style>
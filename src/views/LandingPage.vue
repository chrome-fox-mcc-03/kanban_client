<template>
    <div id="fullscreen_bg" class="fullscreen_bg">
        <div class="container">
            <form-login @login="login"
            @togleLoginRegister="togleLoginRegister"
            v-if="registerPage"
            ></form-login>
            <form-register @register="register"
            @togleLoginRegister="togleLoginRegister"
            v-else
            ></form-register>
        </div>
    </div>
</template>
<script>
    import FormLogin from '../components/FormLogin.vue'
    import FormRegister from '../components/FormRegister.vue'
    import Axios from 'axios';
    export default {
        name: 'LandingPage',
        data() {
            return {
                registerPage: true
            }
        },
        components: {
            FormLogin,
            FormRegister
        },
        methods: {
            login(data) {
                this.$emit('login', data)
            },
            register(data) {
                this.$emit('register', data)
            },
            togleLoginRegister(data) {
                this.registerPage = data
            }
        }
    }
</script>

<style>
    .btn {
        outline: 0;
        border: none;
        border-top: none;
        border-bottom: none;
        border-left: none;
        border-right: none;
        box-shadow: inset 2px -3px rgba(0, 0, 0, 0.15);
    }

    .btn:focus {
        outline: 0;
        -webkit-outline: 0;
        -moz-outline: 0;
    }

    .fullscreen_bg {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-size: cover;
        background-position: 50% 50%;
        background-image: url('../assets/background-login.jpg');
        background-repeat: repeat;
    }

    .form-signin {
        max-width: 320px;
        padding: 15px;
        margin: 0 auto;
        margin-top: 50px;
    }

    .form-signin .form-control {
        position: relative;
        font-size: 16px;
        height: auto;
        padding: 10px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .form-signin .form-control:focus {
        z-index: 2;
    }

    .form-signin input[type="text"] {
        margin-bottom: -1px;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        border-top-style: solid;
        border-right-style: solid;
        border-bottom-style: none;
        border-left-style: solid;
        border-color: #000;
    }

    .form-signin input[type="email"] {
        margin-bottom: -1px;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        border-top-style: none;
        border-right-style: solid;
        border-bottom-style: none;
        border-left-style: solid;
        border-color: #000;
        border-top: 1px solid rgba(0, 0, 0, 0.08);
    }

    .form-signin input[type="password"] {
        margin-bottom: 15px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        border-top-style: none;
        border-right-style: solid;
        border-bottom-style: solid;
        border-left-style: solid;
        border-color: rgb(0, 0, 0);
        border-top: 1px solid rgba(0, 0, 0, 0.08);
    }

    .form-signin-heading {
        color: cornsilk;
        text-align: center;
        padding-bottom: 20px;
    }
</style>
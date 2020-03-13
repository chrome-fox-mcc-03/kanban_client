<template>
<div class="login_container">
    <form-login @showTask="showTask" @login="login"></form-login>
    <login-text @signup="signup"></login-text>
</div>
</template>

<script>
import FormLogin from './components/form-login';
import LoginText from './components/login-text';

export default {
    name: 'Login',
    data() {
        return {
            message: `hello login`
        }
    },
    components: {
        FormLogin,
        LoginText
    },
    methods : {
        login (page) {
            this.$emit('login', page)
        },
        signup (page) {
            this.$emit('signup', page)
        },
        showTask () {
            this.$emit('showTask')
        }
    }
}
</script>

<style>
</style>
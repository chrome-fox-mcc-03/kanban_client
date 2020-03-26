<template>
<div class="bg-app-page vw-100 vh-100 register-form-container">
    <div class="bg-app-nav m-2 p-2 rounded text-center">
        <form id="login-form">
            <div class="form-group">
                <input v-model="logEmail" type="email" class="form-control" id="login-email">
                <small class="form-text text-white">Email</small>
            </div>
            <div class="form-group">
                <input v-model="logPass" type="password" class="form-control" id="login-password">
                <small class="form-text text-white">Password</small>
            </div>
            <div class="text-white" id="login-message">{{ message }}</div>
            <input @click.prevent="login" type="submit" class="btn status-green" value="Login">
        </form>
    </div>
</div>
</template>

<script>
export default {
    props: {
        message: String,
    },
    name: "login-page",
    data() {
        return {
            logEmail: '',
            logPass: '',
        }
    },
    methods: {
        login() {
            this.$emit('login', {email: this.logEmail, password: this.logPass})
            this.logEmail = ''
            this.logPass = ''
        }
    }
}
</script>

<style>

</style>
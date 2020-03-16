<template>
<div class="bg-app-page vw-100 vh-100 register-form-container">
    <div class="bg-app-nav m-2 p-2 rounded text-center">
        <form id="register-form">
            <div class="form-group">
                <input v-model="regEmail" type="email" class="form-control" id="register-email">
                <small class="form-text text-white">Email</small>
            </div>
            <div class="form-group">
                <input v-model="regPass" type="password" class="form-control" id="register-password">
                <small class="form-text text-white">Password</small>
            </div>
            <div class="text-white" id="register-message">{{ message }}</div>
            <input @click.prevent="register" type="submit" class="btn status-green" value="Register">
        </form>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            regEmail: '',
            regPass: '',
        }
    },
    props: {
        message: String,
    },
    name: "register-page",
    methods: {
        register() {
            this.$emit('register', {email: this.regEmail, password: this.regPass})
            this.regEmail = ''
            this.regPass = ''
        }
    }
}
</script>

<style>

</style>
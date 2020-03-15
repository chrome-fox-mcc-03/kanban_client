<template>
    <div id="register-page">
        <form class="form-signin" @submit.prevent="register">
            <h1 class="form-signin-heading">Sign Up</h1>
            <input v-model="name" type="text" class="form-control" placeholder="Username" autofocus="">
            <input v-model="email" type="email" class="form-control" placeholder="Email address" required=""
                autofocus="">
            <input v-model="password" type="password" class="form-control" placeholder="Password" required="">
            <button class="btn btn-lg btn-primary btn-block" type="submit">
                Sign Up
            </button>
        </form>
        <div>
            <h5 style="text-align: center; color: cornsilk; margin-top: 20px;">Have Account? <a style="cursor: pointer"
                @click="togleLoginRegister">Sign In</a></h5>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'FormRegister',
        data() {
            return {
                name: '',
                email: '',
                password: ''
            }
        },
        methods: {
            register() {
                let obj = {
                    name: this.name,
                    email: this.email,
                    password: this.password
                }
                this.$emit('register', obj)
                this.email = ''
                this.password = ''
                this.name = ''
            },
            togleLoginRegister() {
                this.$emit('togleLoginRegister', true)
            }
        }
    }
</script>

<style>

</style>
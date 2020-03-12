<template>
    <div id="login-page">
        <div>
            <h1 style="text-align: center; margin-top: 50px; color: cornsilk;">Welcome to Kanban</h1>
        </div>
        <form class="form-signin" @submit.prevent="login">
            <h1 class="form-signin-heading">Please Sign In</h1>
            <input v-model="email" type="text" class="form-control" placeholder="Email address" required=""
                autofocus="">
            <input v-model="password" type="password" class="form-control" placeholder="Password" required="">
            <button class="btn btn-lg btn-primary btn-block" type="submit">
                Sign In
            </button>
        </form>
        <div style="margin-top: 20px;">
            <h6 style="text-align: center; color: cornsilk;">OR</h6>
            <div align="center">
                <!-- <div class="g-signin2" data-onsuccess="onSignIn"></div> -->
            </div>
        </div>
        <div>
            <h5 style="text-align: center; color: cornsilk; margin-top: 20px;">Dont Have Account? <a
                @click="togleLoginRegister" style="cursor: pointer">Sign Up</a></h5>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'FormLogin',
        data() {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            login() {
                let obj = {
                    email: this.email,
                    password: this.password
                }
                this.$emit('login', obj)
                this.email = ''
                this.password = ''
            },
            togleLoginRegister() {
                this.$emit('togleLoginRegister', false)
            }
        }
    }
</script>

<style scoped>
    
</style>
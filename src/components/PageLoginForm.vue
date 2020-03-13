<template>
    <div class="col-md-center" style="padding-top: 5%;">
        <form class="border border-dark form-login-custom p-5">
            <p class="h4 mb-4 text-center text-white font-custom-roboto">LOGIN</p>
            <input type="email" class="form-control mb-4" id="email-login" placeholder="Email" v-model="email" /> <br/>
            <input type="password" class="form-control mb-4" id="password-login" placeholder="Password" v-model="password" /> <br/>
            <div class="d-flex justify-content-between">
                <div>
                    <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="defaultLoginFormRemember">
                        <label class="custom-control-label text-white" for="defaultLoginFormRemember">Remember me</label>
                    </div>
                </div>
            </div>
        
            <button class="btn btn-info btn-block my-4 font-custom-roboto" type="submit" id="btn-login" @click.prevent="login()">Login</button>
        
            <div class="text-center">
                <p class="text-white"> Not a member?
                    <a href="" class="register" >Register</a>
                </p>
                <p class="text-white">or Login with:</p>
                <div class="d-flex justify-content-center g-signin2" data-onsuccess="onSignIn"></div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name:'pageLoginForm',
    data() {
        return {
            email:'',
            password:''
        }
    },
    methods: {
        login () {
            let email = this.email
            let password = this.password
            let payload = {email,password}
            this.$emit('login',payload)
        }
    },
}
</script>

<style>

</style>
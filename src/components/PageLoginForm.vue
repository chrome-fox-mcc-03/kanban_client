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
                <g-signin-button
                    :params="googleSignInParams"
                    @success="onSignInSuccess"
                    @error="onSignInError">
                    Sign in with Google
                </g-signin-button>
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
            password:'',
            googleSignInParams: {
                client_id: "400509604664-e9s1kqol3878hjg5bmk8dn9kgnat34i1.apps.googleusercontent.com"
            }
        }
    },
    methods: {
        login () {
            let email = this.email
            let password = this.password
            let payload = {email,password}
            this.$emit('login',payload)
        },
        onSignInSuccess (googleUser) {
            // console.log(googleUser)
            const profile = googleUser.getBasicProfile() // etc etc
            let id_token = googleUser.getAuthResponse().id_token;
            // console.log(id_token)
            // console.log(profile)
            this.$emit('loginGoogle',id_token)
        },
        onSignInError (error) {
            // `error` contains any error occurred.
            console.log('OH NOES', error)
        }
    }
}
</script>

<style>
.g-signin-button {
    /* This is where you control how the button looks. Be creative! */
    display: inline-block;
    padding: 4px 8px;
    border-radius: 3px;
    background-color: #3c82f7;
    color: #fff;
    box-shadow: 0 3px 0 #0f69ff;
}
</style>
<template>
    <div id="login-page">
        <div align="center">
            <img src="../assets/logoKanban.png" alt="logoKanban" width="150px" height="150px" style="margin-top: 30px">
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
                <g-signin-button :params="googleSignInParams" @success="onSignInSuccess" @error="onSignInError">
                    Sign in with Google
                </g-signin-button>
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
                password: '',
                googleSignInParams: {
                    client_id: '294507013243-fsspjsp45hh1js3gncuopdks7n0djbh3.apps.googleusercontent.com'
                }
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
            },
            onSignInSuccess(googleUser) {
                const id_token = googleUser.getAuthResponse().id_token;
                this.$emit('onSignInSuccess', id_token)
            },
            onSignInError(error) {
                console.log('OH NOES', error)
            }
        }
    }
</script>

<style scoped>
    .g-signin-button {
        cursor: pointer;
        display: inline-block;
        padding: 4px 8px;
        border-radius: 3px;
        background-color: #3c82f7;
        color: #fff;
        box-shadow: 0 3px 0 #0f69ff;
    }
</style>
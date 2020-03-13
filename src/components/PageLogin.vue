<template>
    <section id="page-login">
        <h1>Login Form</h1>
        <div class="row">
            <form @submit.prevent="login()" class="col s12">
                <div class="row">
                    <div class="input-field col s6">
                        <i class="material-icons prefix">email</i>
                        <input v-model="userData.email" id="email-login" type="email" class="validate">
                        <label for="email-login">Email</label>
                    </div>
                    <div class="input-field col s6">
                        <i class="material-icons prefix">lock</i>
                        <input v-model="userData.password" id="password-login" type="password" class="validate">
                        <label for="password-login">Password</label>
                    </div>
                </div>
                <button class="btn waves-effect waves-light" type="submit" name="action">Login
                    <i class="material-icons right">send</i>
                </button>
                <br>
            </form>
        </div>
            <br>
            <p>-or-</p>
            <br>
            <p style="font-weight: bold;">Sign in with</p>
            <g-signin-button
                :params="googleSignInParams"
                @success="onSignInSuccess"
                @error="onSignInError">
                <a class="waves-effect waves-light btn-small"><img src="https://img.icons8.com/bubbles/30/000000/google-logo.png"/></a>
            </g-signin-button>

    </section>
</template>

<script>
export default {
    name : 'LoginPage',
    data () {
        return {
            userData : {
                email : '',
                password : '',
            },
            googleSignInParams: {
                client_id: '300212796737-706ht16fsvn19fsk18lieucrpmo9dni9.apps.googleusercontent.com'
            }
        }
    },
    methods : {
        login(){
            const email = this.userData.email;
            const password = this.userData.password;

            const userData = {
                email,
                password
            }

            this.$emit('login', userData) ;
        },
        onSignInSuccess (googleUser) {
            // `googleUser` is the GoogleUser object that represents the just-signed-in user.
            // See https://developers.google.com/identity/sign-in/web/reference#users
            const profile = googleUser.getBasicProfile() // etc etc
            // console.log('profile :' , profile);
            const token = googleUser.getAuthResponse().id_token ;

            this.$emit('googleSignin', token)


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
    cursor: pointer;
    /* background-color: #3c82f7; */
    color: #fff;
    /* box-shadow: 0 3px 0 #0f69ff; */
    }
</style>